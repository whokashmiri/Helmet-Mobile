import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Modal
} from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '../src/components/AppScreen';

import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { colors } from '../src/constants/colors';
import { useState } from 'react';

export default function HomeScreen() {
  const [showProfile, setShowProfile] = useState(false);
const [location, setLocation] = useState('Riyadh, Saudi Arabia');
  return (
        <AppScreen>

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🏍️</Text>

        <Text style={styles.title}>
          Welcome Rider
        </Text>

        <Text style={styles.subtitle}>
          Select an option to continue
        </Text>
      </View>

      <Card>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>TR</Text>
          </View>

          <View>
            <Text style={styles.name}>Test Rider</Text>
            <Text style={styles.info}>
              Rider ID: 123456
            </Text>
            <Text style={styles.info}>
              Logistics Rider
            </Text>
          </View>
        </View>
      </Card>

      <Card>
        <View style={styles.actions}>
          <Button
            title="🚚 Start Work"
            onPress={() => router.push('/order')}
          />

          <Button
            title="📊 Dashboard"
            variant="ghost"
            onPress={() => router.push('/dashboard')}
          />
           <Button
            title=" Demand"
            variant="ghost"
            onPress={() => router.push('/demand')}
          />
           <Button
            title=" SOS"
            variant="ghost"
            onPress={() => router.push('/sos')}
          />
        </View>
      </Card>


      <Pressable style={styles.profileFab} onPress={() => setShowProfile(true)}>
  <Text style={styles.profileFabText}>Profile</Text>
</Pressable>

<Modal visible={showProfile} transparent animationType="slide">
  <View style={styles.modalOverlay}>
    <View style={styles.profileCard}>
      <Text style={styles.profileTitle}>Profile</Text>

      <Text style={styles.profileText}>National ID: 123456</Text>
      <Text style={styles.profileText}>Name: Test Rider</Text>

      <Text style={styles.label}>Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Set your location"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      <Pressable
        style={styles.mapButton}
        onPress={() => setLocation('Current Location: Riyadh, Saudi Arabia')}
      >
        <Text style={styles.mapButtonText}>Use Current Location 📍</Text>
      </Pressable>

      <Button title="Close" onPress={() => setShowProfile(false)} />
    </View>
  </View>
</Modal>
    </SafeAreaView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 15,
    justifyContent: 'center',
    gap: 10,
  },

  header: {
    alignItems: 'center',
    marginBottom: 10,
  },

  emoji: {
    fontSize: 80,
    marginBottom: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },

  subtitle: {
    marginTop: 8,
    color: colors.muted,
    textAlign: 'center',
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },

  name: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },

  info: {
    color: colors.muted,
    marginTop: 2,
    fontSize: 8,
  },

  actions: {
    gap: 10,
  },

  profileFab: {
  position: 'absolute',
  right: 20,
  bottom: 24,
  backgroundColor: colors.primary,
  paddingHorizontal: 18,
  paddingVertical: 14,
  borderRadius: 999,
  elevation: 6,
},

profileFabText: {
  color: '#FFF',
  fontSize: 12,
  fontWeight: '600',
},

modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.35)',
  justifyContent: 'flex-end',
},

profileCard: {
  backgroundColor: colors.bg,
  padding: 20,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  gap: 12,
},

profileTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: colors.text,
},

profileText: {
  fontSize: 12,
  color: colors.text,
},

mapButton: {
  height: 48,
  borderRadius: 16,
  backgroundColor: '#FFF',
  borderWidth: 1,
  borderColor: colors.border,
  alignItems: 'center',
  justifyContent: 'center',
},

mapButtonText: {
  fontSize: 12,
  color: colors.text,
  fontWeight: '500',
},

 input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    color: colors.text,
    fontSize: 10,
  },

    label: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.text,
  },

});