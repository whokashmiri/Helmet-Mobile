import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { colors } from '../constants/colors';

export function Button({
  title,
  onPress,
  loading,
  variant = 'primary',
}: {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  variant?: 'primary' | 'danger' | 'ghost';
}) {
  return (
    <Pressable
      disabled={loading}
      onPress={onPress}
      style={[
        styles.btn,
        variant === 'ghost' && styles.ghost,
        variant === 'danger' && styles.danger,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'ghost' && styles.ghostText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  danger: {
    backgroundColor: colors.danger,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  ghostText: {
    color: colors.text,
  },
});