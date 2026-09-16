import {common as enCommon} from './en/common';
import {games as enGames} from './en/games';
import {common as hiCommon} from './hi/common';
import {games as hiGames} from './hi/games';
import {SupportedLanguage} from '../types/core';

export const dictionaries = {
  en: {...enCommon, ...enGames},
  hi: {...hiCommon, ...hiGames},
} as const satisfies Record<SupportedLanguage, Record<string, string>>;

export type TranslationKey = keyof typeof dictionaries.en | keyof typeof dictionaries.hi;
