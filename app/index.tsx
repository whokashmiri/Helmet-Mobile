// app/index.tsx

import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';

import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { colors } from '../src/constants/colors';

const DEMO_ID = '123456';
const DEMO_PASSWORD = '123456';

export default function LoginScreen() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!id.trim() || !password.trim()) {
      Alert.alert('Missing Information', 'Please enter ID and password.');
      return;
    }

    setLoading(true);

    try {
      // Fake API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (id === DEMO_ID && password === DEMO_PASSWORD) {
        Alert.alert('Success', 'Login successful.');

        // Navigate to verification screen
        router.replace('/home');
      } else {
        Alert.alert(
          'Invalid Credentials',
          'ID or password is incorrect.'
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🏍️</Text>

        <Text style={styles.title}>
          Rider Safety Verification
        </Text>

        <Text style={styles.subtitle}>
          Sign in to begin helmet and bike verification.
        </Text>
      </View>

      <Card>
        <View style={styles.form}>
          <Text style={styles.label}>Employee ID</Text>

          <TextInput
            value={id}
            onChangeText={setId}
            placeholder="Enter ID"
            placeholderTextColor={colors.muted}
            style={styles.input}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor={colors.muted}
            style={styles.input}
            secureTextEntry
          />

          <Button
            title="Login"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </Card>

      <Card>
        <Text style={styles.demoTitle}>
          Demo Credentials
        </Text>

        <Text style={styles.demoText}>
          ID: {DEMO_ID}
        </Text>

        <Text style={styles.demoText}>
          Password: {DEMO_PASSWORD}
        </Text>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 20,
    justifyContent: 'center',
    gap: 16,
  },

  header: {
    alignItems: 'center',
    marginBottom: 10,
  },

  logo: {
    fontSize: 60,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },

  form: {
    gap: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    color: colors.text,
    fontSize: 16,
  },

  demoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },

  demoText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
});