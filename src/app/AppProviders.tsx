import React, {PropsWithChildren} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeProvider} from '../design-system/ThemeProvider';
import {registerGames} from '../games/definitions';
import {StorageService} from '../services/storage/StorageService';
import {AppStateProvider} from '../store/AppStateContext';

StorageService.configure(AsyncStorage);
registerGames();

export function AppProviders({children}: PropsWithChildren) {
  return (
    <ThemeProvider>
      <AppStateProvider>{children}</AppStateProvider>
    </ThemeProvider>
  );
}
