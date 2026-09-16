import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KKButton} from '../../components/common/KKButton';
import {KKCard} from '../../components/common/KKCard';
import {Screen, ScreenBand} from '../../components/common/Screen';
import {KKGameCard} from '../../components/game/KKGameCard';
import {KKMascot} from '../../components/mascot/KKMascot';
import {AppConfig} from '../../config/AppConfig';
import {useTheme} from '../../design-system/ThemeProvider';
import {GameRegistry} from '../../games/engine/GameRegistry';
import {ProgressManager} from '../../games/engine/ProgressManager';
import {useAppState} from '../../store/AppStateContext';
import {Route} from '../../app/navigation';

export function HomeScreen({navigate}: {navigate: (route: Route) => void}) {
  const theme = useTheme();
  const {t, localize, progress, settings, setLanguage} = useAppState();
  const games = GameRegistry.all();
  const featured = games.slice(0, 3);
  const totalCoins = ProgressManager.getTotalCoins(progress);

  return (
    <Screen>
      <ScreenBand>
        <View style={styles.hero}>
          <View style={styles.brandBlock}>
            <Text style={[styles.logo, {color: theme.colors.textPrimary}]}>{AppConfig.appName}</Text>
            <Text style={[styles.tagline, {color: theme.colors.textSecondary}]}>
              {AppConfig.tagline[settings.language]}
            </Text>
            <KKButton label={t('home.play')} icon="▶" onPress={() => navigate({name: 'games'})} />
          </View>
          <KKMascot mood="excited" label={t('home.play')} />
        </View>
      </ScreenBand>

      <ScreenBand>
        <View style={styles.quickRow}>
          <KKButton
            label="हिंदी"
            variant={settings.language === 'hi' ? 'secondary' : 'ghost'}
            onPress={() => setLanguage('hi')}
          />
          <KKButton
            label="English"
            variant={settings.language === 'en' ? 'secondary' : 'ghost'}
            onPress={() => setLanguage('en')}
          />
          <KKButton label={t('home.settings')} variant="ghost" icon="⚙" onPress={() => navigate({name: 'settings'})} />
        </View>
      </ScreenBand>

      <ScreenBand>
        <KKCard style={styles.challenge}>
          <Text style={styles.challengeIcon}>🎯</Text>
          <View style={styles.challengeCopy}>
            <Text style={[styles.sectionTitle, {color: theme.colors.textPrimary}]}>
              {t('home.dailyChallenge')}
            </Text>
            <Text style={[styles.body, {color: theme.colors.textSecondary}]}>
              {t('home.challengeText')}
            </Text>
          </View>
          <Text style={styles.coin}>🪙 {totalCoins}</Text>
        </KKCard>
      </ScreenBand>

      <ScreenBand>
        <Text style={[styles.sectionTitle, {color: theme.colors.textPrimary}]}>
          {t('home.continue')}
        </Text>
        {featured.map(game => (
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
        <KKButton label={t('home.games')} icon="🎮" onPress={() => navigate({name: 'games'})} />
      </ScreenBand>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  brandBlock: {
    flex: 1,
    gap: 10,
  },
  logo: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: 0,
  },
  tagline: {
    fontSize: 17,
    fontWeight: '700',
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  challenge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  challengeIcon: {
    fontSize: 34,
  },
  challengeCopy: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    fontWeight: '700',
  },
  coin: {
    fontSize: 18,
    fontWeight: '800',
  },
});
