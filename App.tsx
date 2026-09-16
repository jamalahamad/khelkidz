import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppRoot} from './src/app/AppRoot';
import {AppProviders} from './src/app/AppProviders';

function App() {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <StatusBar barStyle="dark-content" />
        <AppRoot />
      </AppProviders>
    </SafeAreaProvider>
  );
}

export default App;

