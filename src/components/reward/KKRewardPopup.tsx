import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {KKButton} from '../common/KKButton';
import {KKStarRating} from '../common/KKStarRating';
import {useTheme} from '../../design-system/ThemeProvider';

interface Props {
  visible: boolean;
  title: string;
  earned: string;
  stars: number;
  coins: number;
  xp: number;
  nextLabel: string;
  homeLabel: string;
  onNext: () => void;
  onHome: () => void;
}

export function KKRewardPopup({
  visible,
  title,
  earned,
  stars,
  coins,
  xp,
  nextLabel,
  homeLabel,
  onNext,
  onHome,
}: Props) {
  const theme = useTheme();
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.backdrop}>
        <View style={[styles.panel, {backgroundColor: theme.colors.surface}, theme.shadows.lifted]}>
          <Text style={styles.confetti}>🎉</Text>
          <Text style={[styles.title, {color: theme.colors.textPrimary}]}>{title}</Text>
          <KKStarRating stars={stars} size={34} />
          <Text style={[styles.earned, {color: theme.colors.textSecondary}]}>{earned}</Text>
          <View style={styles.rewardRow}>
            <Text style={styles.reward}>🪙 {coins}</Text>
            <Text style={styles.reward}>⚡ {xp}</Text>
          </View>
          <KKButton label={nextLabel} icon="▶" onPress={onNext} />
          <KKButton label={homeLabel} variant="ghost" icon="⌂" onPress={onHome} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(36, 48, 74, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  panel: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    gap: 14,
  },
  confetti: {
    fontSize: 58,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  earned: {
    fontSize: 16,
    fontWeight: '700',
  },
  rewardRow: {
    flexDirection: 'row',
    gap: 18,
  },
  reward: {
    fontSize: 22,
    fontWeight: '800',
  },
});
