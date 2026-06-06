import React from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';

import { colors } from '../constants/colors';
import { useOrders } from '../store/orderStore';

export function AppScreen({ children }: { children: React.ReactNode }) {
  const { addOrder } = useOrders();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable
          style={styles.menuButton}
          onPress={() => Alert.alert('Coming Soon')}
        >
          <Text style={styles.menuText}>☰</Text>
        </Pressable>

        <Pressable
  style={styles.addButton}
  onPress={() => {
    addOrder();
    router.push('/order');
  }}
>
  <Text style={styles.addButtonText}>
    Add Order
  </Text>
</Pressable>
      </View>

      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  topBar: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  addButton: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 13,
  },
});