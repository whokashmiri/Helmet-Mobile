import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { colors } from '../constants/colors';

export function Card(props: ViewProps) {
  return (
    <View
      {...props}
      style={[styles.card, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
});