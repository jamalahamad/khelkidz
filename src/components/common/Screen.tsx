import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../design-system/ThemeProvider';

export function Screen({children}: PropsWithChildren) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <ScrollView
      style={[styles.screen, {backgroundColor: theme.colors.background}]}
      contentContainerStyle={[
        styles.content,
        {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 28},
      ]}>
      {children}
    </ScrollView>
  );
}

export function ScreenBand({children}: PropsWithChildren) {
  return <View style={styles.band}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    gap: 18,
  },
  band: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
  },
});
