import {semanticColors} from './colors';
import {radius} from './radius';
import {shadows} from './shadows';
import {spacing} from './spacing';
import {typography} from './typography';

export const defaultTheme = {
  id: 'default',
  colors: semanticColors,
  spacing,
  radius,
  shadows,
  typography,
} as const;

export type AppTheme = typeof defaultTheme;
