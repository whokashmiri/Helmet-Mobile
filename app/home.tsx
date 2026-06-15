import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '../src/components/AppScreen';

import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { colors } from '../src/constants/colors';

export default function HomeScreen() {
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
});