import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {KKButton} from '../../components/common/KKButton';
import {Screen, ScreenBand} from '../../components/common/Screen';
import {KKGameCard} from '../../components/game/KKGameCard';
import {useTheme} from '../../design-system/ThemeProvider';
import {GameRegistry} from '../../games/engine/GameRegistry';
import {ProgressManager} from '../../games/engine/ProgressManager';
import {useAppState} from '../../store/AppStateContext';
import {Route} from '../../app/navigation';

export function GameLibraryScreen({navigate}: {navigate: (route: Route) => void}) {
  const theme = useTheme();
  const {t, localize, progress} = useAppState();
  const games = GameRegistry.all();

  return (
    <Screen>
      <ScreenBand>
        <KKButton label={t('action.home')} variant="ghost" icon="‹" onPress={() => navigate({name: 'home'})} />
        <Text style={[styles.title, {color: theme.colors.textPrimary}]}>{t('home.games')}</Text>
        {games.map(game => (
          <KKGameCard
            key={game.id}
            game={game}
            title={localize(game.title)}
            subject={localize(game.subject)}
            progress={ProgressManager.getGameProgressPercent(progress, game)}
            stars={progress.games[game.id]?.completedLevels[game.levels[0].id]?.stars ?? 0}
            onPress={() => navigate({name: 'levels', gameId: game.id})}
          />
        ))}
      </ScreenBand>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginVertical: 18,
  },
});
