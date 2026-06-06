import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Card } from '../src/components/Card';
import { Button } from '../src/components/Button';
import { colors } from '../src/constants/colors';

const sosOptions = [
  'Accident',
  'Vehicle Issue',
  'Medical Emergency',
  'Security Issue',
];

export default function SosScreen() {
  const [visible, setVisible] = useState(false);

  function handleSOS(type: string) {
    setVisible(false);

    Alert.alert(
      'SOS Sent',
      `${type} emergency has been reported to support.`
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.title}>Emergency / SOS</Text>
        <Text style={styles.muted}>
          Use this screen to report urgent rider safety issues.
        </Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Emergency Options</Text>

        {sosOptions.map((item) => (
          <Pressable
            key={item}
            style={styles.option}
            onPress={() => handleSOS(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
            <Text style={styles.optionArrow}>›</Text>
          </Pressable>
        ))}
      </Card>

      <Pressable
        style={styles.floatingSOS}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.floatingText}>SOS</Text>
      </Pressable>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalTitle}>Send SOS</Text>
            <Text style={styles.muted}>
              Select the type of emergency.
            </Text>

            <View style={styles.modalOptions}>
              {sosOptions.map((item) => (
                <Button
                  key={item}
                  title={item}
                  variant="danger"
                  onPress={() => handleSOS(item)}
                />
              ))}

              <Button
                title="Cancel"
                variant="ghost"
                onPress={() => setVisible(false)}
              />
            </View>
          </Card>
        </View>
      </Modal>
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
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
  },
  muted: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
  },
  option: {
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  optionArrow: {
    color: colors.muted,
    fontSize: 26,
    fontWeight: '800',
  },
  floatingSOS: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  floatingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 22,
  },
  modalCard: {
    gap: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
  },
  modalOptions: {
    gap: 10,
    marginTop: 10,
  },
});