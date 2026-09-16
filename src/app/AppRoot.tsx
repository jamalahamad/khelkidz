import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useTheme} from '../design-system/ThemeProvider';
import {HomeScreen} from '../features/home/HomeScreen';
import {GameLibraryScreen} from '../features/games/GameLibraryScreen';
import {LevelSelectScreen} from '../features/levels/LevelSelectScreen';
import {GamePlayScreen} from '../features/games/GamePlayScreen';
import {SettingsScreen} from '../features/settings/SettingsScreen';
import {useAppState} from '../store/AppStateContext';
import {Route} from './navigation';

export function AppRoot() {
  const {ready} = useAppState();
  const theme = useTheme();
  const [route, setRoute] = useState<Route>({name: 'home'});

  if (!ready) {
    return (
      <View style={[styles.loading, {backgroundColor: theme.colors.background}]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (route.name === 'games') {
    return <GameLibraryScreen navigate={setRoute} />;
  }
  if (route.name === 'levels') {
    return <LevelSelectScreen gameId={route.gameId} navigate={setRoute} />;
  }
  if (route.name === 'play') {
    return (
      <GamePlayScreen
        gameId={route.gameId}
        levelId={route.levelId}
        navigate={setRoute}
      />
    );
  }
  if (route.name === 'settings') {
    return <SettingsScreen navigate={setRoute} />;
  }
  return <HomeScreen navigate={setRoute} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
