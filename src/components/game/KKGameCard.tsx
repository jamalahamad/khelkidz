import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {KKCard} from '../common/KKCard';
import {KKProgressBar} from '../common/KKProgressBar';
import {KKStarRating} from '../common/KKStarRating';
import {useTheme} from '../../design-system/ThemeProvider';
import {GameDefinition} from '../../types/core';

interface Props {
  game: GameDefinition;
  title: string;
  subject: string;
  progress: number;
  stars: number;
  onPress: () => void;
}

export function KKGameCard({game, title, subject, progress, stars, onPress}: Props) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      {({pressed}) => (
        <KKCard style={[styles.card, {opacity: pressed ? 0.82 : 1}]}>
          <View style={styles.row}>
            <View style={[styles.iconBubble, {backgroundColor: game.accentColor}]}>
              <Text style={styles.icon}>{game.icon}</Text>
            </View>
            <View style={styles.copy}>
              <Text style={[styles.title, {color: theme.colors.textPrimary}]}>{title}</Text>
              <Text style={[styles.subject, {color: theme.colors.textSecondary}]}>{subject}</Text>
            </View>
            <KKStarRating stars={stars} />
          </View>
          <KKProgressBar value={progress} color={game.accentColor} />
          <Text style={[styles.progressText, {color: theme.colors.textSecondary}]}>
            {progress}% complete
          </Text>
        </KKCard>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBubble: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 30,
  },
  copy: {
    flex: 1,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
  },
  subject: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
