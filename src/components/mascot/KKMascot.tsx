import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../design-system/ThemeProvider';
import {MascotMood} from '../../types/core';

const moodFace: Record<MascotMood, string> = {
  idle: '🙂',
  happy: '😊',
  excited: '🤩',
  thinking: '🤔',
  celebrating: '🥳',
  encouraging: '💪',
  'sad-but-friendly': '😌',
};

export function KKMascot({mood = 'happy', label}: {mood?: MascotMood; label?: string}) {
  const theme = useTheme();
  return (
    <View style={[styles.wrap, {backgroundColor: theme.colors.surface}, theme.shadows.soft]}>
      <Text style={styles.face}>{moodFace[mood]}</Text>
      {label ? <Text style={[styles.label, {color: theme.colors.textPrimary}]}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 28,
    minWidth: 104,
    minHeight: 104,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  face: {
    fontSize: 48,
  },
  label: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
});
