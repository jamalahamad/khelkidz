import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KKButton} from '../../components/common/KKButton';
import {Screen, ScreenBand} from '../../components/common/Screen';
import {KKLevelCard} from '../../components/game/KKLevelCard';
import {useTheme} from '../../design-system/ThemeProvider';
import {GameRegistry} from '../../games/engine/GameRegistry';
import {LevelManager} from '../../games/engine/LevelManager';
import {useAppState} from '../../store/AppStateContext';
import {Route} from '../../app/navigation';

export function LevelSelectScreen({
  gameId,
  navigate,
}: {
  gameId: string;
  navigate: (route: Route) => void;
}) {
  const theme = useTheme();
  const {localize, progress, t} = useAppState();
  const game = GameRegistry.get(gameId);

  return (
    <Screen>
      <ScreenBand>
        <KKButton label={t('home.games')} variant="ghost" icon="‹" onPress={() => navigate({name: 'games'})} />
        <View style={[styles.header, {backgroundColor: game.accentColor}]}>
          <Text style={styles.icon}>{game.icon}</Text>
          <Text style={styles.title}>{localize(game.title)}</Text>
          <Text style={styles.description}>{localize(game.description)}</Text>
        </View>
        <View style={styles.grid}>
          {game.levels.map(level => {
            const levelProgress = progress.games[game.id]?.completedLevels[level.id];
            const locked = !LevelManager.isUnlocked(game, level, progress);
            return (
              <KKLevelCard
                key={level.id}
                title={`${t('game.level')} ${level.levelNumber}`}
                stars={levelProgress?.stars ?? 0}
                locked={locked}
                onPress={() => navigate({name: 'play', gameId: game.id, levelId: level.id})}
              />
            );
          })}
        </View>
        <Text style={[styles.objective, {color: theme.colors.textSecondary}]}>
          {localize(game.learning.objective)}
        </Text>
      </ScreenBand>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 28,
    padding: 22,
    marginTop: 16,
    marginBottom: 18,
  },
  icon: {
    fontSize: 44,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginTop: 8,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  objective: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
});
