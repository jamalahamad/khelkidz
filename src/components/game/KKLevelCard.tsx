import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {KKCard} from '../common/KKCard';
import {KKStarRating} from '../common/KKStarRating';
import {useTheme} from '../../design-system/ThemeProvider';

interface Props {
  title: string;
  stars: number;
  locked: boolean;
  onPress: () => void;
}

export function KKLevelCard({title, stars, locked, onPress}: Props) {
  const theme = useTheme();
  return (
    <Pressable disabled={locked} onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      {({pressed}) => (
        <KKCard
          style={[
            styles.card,
            {
              opacity: locked ? 0.48 : pressed ? 0.82 : 1,
              backgroundColor: locked ? '#F3F0EB' : theme.colors.surface,
            },
          ]}>
          <Text style={styles.levelIcon}>{locked ? '🔒' : '🏁'}</Text>
          <Text style={[styles.title, {color: theme.colors.textPrimary}]}>{title}</Text>
          <KKStarRating stars={stars} />
        </KKCard>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 142,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  levelIcon: {
    fontSize: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 8,
    textAlign: 'center',
  },
});
