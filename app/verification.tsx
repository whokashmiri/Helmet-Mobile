import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import {
  verifyBike,
  verifyHelmet,
  ScanResponse,
} from '../src/api/verificationApi';
import { colors } from '../src/constants/colors';

type Step = 'helmet' | 'bike' | 'done';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [step, setStep] = useState<Step>('helmet');
  const [sessionId, setSessionId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [lastImage, setLastImage] = useState<string>();
  const [result, setResult] = useState<ScanResponse>();

  const facing = step === 'helmet' ? 'front' : 'back';

  async function capture() {
    try {
      setLoading(true);

      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.75,
        skipProcessing: false,
      });

      if (!photo?.uri) {
        throw new Error('Could not capture photo');
      }

      setLastImage(photo.uri);

      const res =
        step === 'helmet'
          ? await verifyHelmet(photo.uri, sessionId)
          : await verifyBike(photo.uri, sessionId!);

      setResult(res);
      setSessionId(res.sessionId);

      if (step === 'helmet') {
        if (res.nextStep === 'scan_bike') {
          setStep('bike');
        } else {
          Alert.alert(
            'Helmet not detected',
            'Please wear your helmet and try again.'
          );
        }
      } else {
        if (res.nextStep === 'done') {
          setStep('done');
        } else {
          Alert.alert(
            'Motorcycle not detected',
            'Flip to the bike and scan again.'
          );
        }
      }
    } catch (e: any) {
      Alert.alert(
        'Scan failed',
        e?.response?.data?.message || e.message || 'Please try again'
      );
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep('helmet');
    setSessionId(undefined);
    setResult(undefined);
    setLastImage(undefined);
  }

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Loading camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Card>
          <Text style={styles.title}>Camera permission required</Text>
          <Text style={styles.muted}>
            We need camera access to verify helmet and bike.
          </Text>
          <Button
            title="Allow Camera"
            onPress={requestPermission}
          />
        </Card>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rider Safety Verification</Text>

      <Text style={styles.muted}>
        {step === 'helmet'
          ? 'Step 1: scan your helmet using the front camera.'
          : step === 'bike'
            ? 'Step 2: flip to the bike and scan motorcycle.'
            : 'Verification complete.'}
      </Text>

      {step !== 'done' ? (
        <CameraView
          ref={cameraRef}
          facing={facing}
          style={styles.camera}
        />
      ) : (
        <Card>
          <Text style={styles.success}>Ready to work ✅</Text>
          <Text style={styles.muted}>
            Completed at:{' '}
            {result?.verifiedAt
              ? new Date(result.verifiedAt).toLocaleString()
              : new Date().toLocaleString()}
          </Text>
        </Card>
      )}

      {lastImage && (
        <Image
          source={{ uri: lastImage }}
          style={styles.thumb}
        />
      )}

      <Card style={{ gap: 10 }}>
        <Text style={styles.status}>
          Current step: {step.toUpperCase()}
        </Text>

        {!!result?.helmet && (
          <Text>
            Helmet: {result.helmet.detected ? 'Detected' : 'Not detected'} (
            {Math.round((result.helmet.confidence || 0) * 100)}%)
          </Text>
        )}

        {!!result?.bike && (
          <Text>
            Bike: {result.bike.detected ? 'Detected' : 'Not detected'} (
            {Math.round((result.bike.confidence || 0) * 100)}%)
          </Text>
        )}

        {step !== 'done' ? (
          <Button
            title={step === 'helmet' ? 'Scan Helmet' : 'Scan Bike'}
            onPress={capture}
            loading={loading}
          />
        ) : (
          <Button
            title="New Verification"
            onPress={reset}
          />
        )}
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 18,
    gap: 14,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
  },
  muted: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  camera: {
    height: 390,
    borderRadius: 26,
    overflow: 'hidden',
  },
  thumb: {
    height: 80,
    width: 80,
    borderRadius: 16,
    alignSelf: 'flex-end',
  },
  status: {
    fontWeight: '800',
    color: colors.text,
  },
  success: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.success,
  },
});