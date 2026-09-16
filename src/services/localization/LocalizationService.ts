import {AppConfig} from '../../config/AppConfig';
import {dictionaries} from '../../locales';
import {LocalizedText, SupportedLanguage} from '../../types/core';

export class LocalizationService {
  static translate(key: string, language: SupportedLanguage): string {
    const selectedDictionary: Record<string, string> = dictionaries[language];
    const englishDictionary: Record<string, string> = dictionaries.en;
    return selectedDictionary[key] ?? englishDictionary[key] ?? `[${key}]`;
  }

  static localize(text: LocalizedText, language: SupportedLanguage): string {
    return text[language] ?? text.en ?? text[AppConfig.defaultLanguage];
  }
}
