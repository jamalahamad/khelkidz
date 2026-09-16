import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {KKButton} from '../../components/common/KKButton';
import {KKCard} from '../../components/common/KKCard';
import {Screen, ScreenBand} from '../../components/common/Screen';
import {useTheme} from '../../design-system/ThemeProvider';
import {useAppState} from '../../store/AppStateContext';
import {Route} from '../../app/navigation';

export function SettingsScreen({navigate}: {navigate: (route: Route) => void}) {
  const theme = useTheme();
  const {settings, updateSettings, setLanguage, t} = useAppState();

  return (
    <Screen>
      <ScreenBand>
        <KKButton label={t('action.home')} variant="ghost" icon="‹" onPress={() => navigate({name: 'home'})} />
        <Text style={[styles.title, {color: theme.colors.textPrimary}]}>{t('home.settings')}</Text>
        <KKCard style={styles.card}>
          <Text style={[styles.label, {color: theme.colors.textPrimary}]}>{t('settings.language')}</Text>
          <View style={styles.row}>
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
          </View>
        </KKCard>
        <ToggleRow
          label={t('settings.voice')}
          value={settings.voiceEnabled}
          onValueChange={voiceEnabled => updateSettings({voiceEnabled})}
        />
        <ToggleRow
          label={t('settings.music')}
          value={settings.musicEnabled}
          onValueChange={musicEnabled => updateSettings({musicEnabled})}
        />
        <ToggleRow
          label={t('settings.sound')}
          value={settings.soundEffectsEnabled}
          onValueChange={soundEffectsEnabled => updateSettings({soundEffectsEnabled})}
        />
        <ToggleRow
          label={t('settings.haptics')}
          value={settings.hapticsEnabled}
          onValueChange={hapticsEnabled => updateSettings({hapticsEnabled})}
        />
        <ToggleRow
          label={t('settings.reducedMotion')}
          value={settings.reducedMotion}
          onValueChange={reducedMotion => updateSettings({reducedMotion})}
        />
      </ScreenBand>
    </Screen>
  );
}

function ToggleRow({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  const theme = useTheme();
  return (
    <KKCard style={styles.toggleCard}>
      <Text style={[styles.label, {color: theme.colors.textPrimary}]}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </KKCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginVertical: 18,
  },
  card: {
    gap: 12,
    marginBottom: 12,
  },
  toggleCard: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '800',
  },
});
