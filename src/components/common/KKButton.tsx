import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {useTheme} from '../../design-system/ThemeProvider';

interface KKButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
  icon?: string;
}

export function KKButton({
  label,
  onPress,
  variant = 'primary',
  disabled,
  style,
  icon,
}: KKButtonProps) {
  const theme = useTheme();
  const background =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'secondary'
        ? theme.colors.secondary
        : theme.colors.surface;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: disabled ? theme.colors.disabled : background,
          borderColor: theme.colors.border,
          opacity: pressed ? 0.78 : 1,
          transform: [{scale: pressed ? 0.98 : 1}],
        },
        theme.shadows.soft,
        style,
      ]}>
      <Text style={[styles.text, {color: variant === 'ghost' ? theme.colors.textPrimary : '#FFFFFF'}]}>
        {icon ? `${icon} ` : ''}
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    minWidth: 54,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  text: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
});
