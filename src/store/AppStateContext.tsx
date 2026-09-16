import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {AppConfig} from '../config/AppConfig';
import {AudioService} from '../services/audio/AudioService';
import {HapticService} from '../services/haptics/HapticService';
import {LocalizationService} from '../services/localization/LocalizationService';
import {StorageService} from '../services/storage/StorageService';
import {VoiceService} from '../services/voice/VoiceService';
import {AppProgress, AppSettings, LevelResult, SupportedLanguage} from '../types/core';
import {ProgressManager, emptyProgress} from '../games/engine/ProgressManager';
import {GameRegistry} from '../games/engine/GameRegistry';

const settingsKey = 'khelkidz.settings';
const progressKey = 'khelkidz.progress';

export const defaultSettings: AppSettings = {
  language: AppConfig.defaultLanguage,
  voiceEnabled: true,
  musicEnabled: true,
  soundEffectsEnabled: true,
  hapticsEnabled: true,
  reducedMotion: false,
  speechRate: 0.86,
};

interface AppStateContextValue {
  ready: boolean;
  settings: AppSettings;
  progress: AppProgress;
  t(key: string): string;
  localize<T extends Record<SupportedLanguage, string>>(text: T): string;
  updateSettings(next: Partial<AppSettings>): Promise<void>;
  setLanguage(language: SupportedLanguage): Promise<void>;
  saveLevelResult(result: LevelResult): Promise<void>;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({children}: PropsWithChildren) {
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [progress, setProgress] = useState<AppProgress>(emptyProgress);

  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      const storedSettings = await StorageService.getJson(settingsKey, defaultSettings);
      const storedProgress = await StorageService.getJson(progressKey, emptyProgress);
      if (!mounted) {
        return;
      }
      setSettings({...defaultSettings, ...storedSettings});
      setProgress(storedProgress);
      setReady(true);
    }
    bootstrap();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    AudioService.configure(settings);
    VoiceService.configure(settings.voiceEnabled);
    HapticService.configure(settings.hapticsEnabled);
  }, [settings]);

  const updateSettings = useCallback(async (next: Partial<AppSettings>) => {
    setSettings(current => {
      const updated = {...current, ...next};
      StorageService.setJson(settingsKey, updated);
      return updated;
    });
  }, []);

  const setLanguage = useCallback(
    async (language: SupportedLanguage) => updateSettings({language}),
    [updateSettings],
  );

  const saveLevelResult = useCallback(
    async (result: LevelResult) => {
      const game = GameRegistry.get(result.gameId);
      setProgress(current => {
        const updated = ProgressManager.applyLevelResult(current, game, result);
        StorageService.setJson(progressKey, updated);
        return updated;
      });
    },
    [],
  );

  const value = useMemo<AppStateContextValue>(
    () => ({
      ready,
      settings,
      progress,
      t: key => LocalizationService.translate(key, settings.language),
      localize: text => LocalizationService.localize(text, settings.language),
      updateSettings,
      setLanguage,
      saveLevelResult,
    }),
    [progress, ready, saveLevelResult, setLanguage, settings, updateSettings],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const value = useContext(AppStateContext);
  if (!value) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }
  return value;
}
