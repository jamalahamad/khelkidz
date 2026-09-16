import React, {PropsWithChildren, createContext, useContext} from 'react';
import {AppTheme, defaultTheme} from './theme';

const ThemeContext = createContext<AppTheme>(defaultTheme);

export function ThemeProvider({children}: PropsWithChildren) {
  return (
    <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
