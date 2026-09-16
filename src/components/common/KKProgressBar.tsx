import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../design-system/ThemeProvider';

export function KKProgressBar({value, color}: {value: number; color?: string}) {
  const theme = useTheme();
  return (
    <View style={[styles.track, {backgroundColor: '#F0E4D2'}]}>
      <View
        style={[
          styles.fill,
          {
            backgroundColor: color ?? theme.colors.success,
            width: `${Math.max(0, Math.min(100, value))}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
