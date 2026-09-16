import React from 'react';
import {StyleSheet, Text} from 'react-native';

export function KKStarRating({stars, size = 20}: {stars: number; size?: number}) {
  return (
    <Text accessibilityLabel={`${stars} stars`} style={[styles.stars, {fontSize: size}]}>
      {'★'.repeat(stars)}
      {'☆'.repeat(Math.max(0, 3 - stars))}
    </Text>
  );
}

const styles = StyleSheet.create({
  stars: {
    color: '#FAB005',
    letterSpacing: 0,
  },
});
