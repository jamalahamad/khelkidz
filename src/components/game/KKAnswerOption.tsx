import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../design-system/ThemeProvider';
import {QuestionOption} from '../../types/core';

interface Props {
  option: QuestionOption;
  label: string;
  selected?: boolean;
  correct?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export function KKAnswerOption({option, label, selected, correct, disabled, onPress}: Props) {
  const theme = useTheme();
  const borderColor = selected
    ? correct
      ? theme.colors.success
      : theme.colors.error
    : theme.colors.border;

  return (
    <Pressable disabled={disabled} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      {({pressed}) => (
        <View
          style={[
            styles.option,
            {
              borderColor,
              backgroundColor: selected ? '#FFFFFF' : '#FFFDF8',
              opacity: pressed ? 0.78 : 1,
            },
            theme.shadows.soft,
          ]}>
          <View style={[styles.visualBubble, {backgroundColor: option.color ?? theme.colors.primary}]}>
            <Text style={styles.visual}>{option.visual ?? label.slice(0, 1)}</Text>
          </View>
          <Text style={[styles.label, {color: theme.colors.textPrimary}]}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    minHeight: 132,
    borderRadius: 24,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginBottom: 12,
  },
  visualBubble: {
    width: 62,
    height: 62,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  visual: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  label: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
});
