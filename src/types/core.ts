export type SupportedLanguage = 'hi' | 'en';

export type AgeGroup = '2-4' | '4-6' | '6-8';

export type GameCategory =
  | 'english'
  | 'hindi'
  | 'math'
  | 'colors'
  | 'shapes'
  | 'memory'
  | 'puzzle'
  | 'pattern';

export type LocalizedText = Record<SupportedLanguage, string>;

export type MascotMood =
  | 'idle'
  | 'happy'
  | 'excited'
  | 'thinking'
  | 'celebrating'
  | 'encouraging'
  | 'sad-but-friendly';

export type RewardType = 'stars' | 'coins' | 'xp' | 'badge' | 'level-complete';

export type AnswerValue = string | number;

export interface AgeRange {
  min: number;
  max: number;
}

export interface AudioAsset {
  hi?: string;
  en?: string;
}

export interface QuestionOption {
  id: string;
  label: LocalizedText;
  value: AnswerValue;
  visual?: string;
  color?: string;
  audio?: AudioAsset;
}

export interface QuestionDefinition {
  id: string;
  prompt: LocalizedText;
  instruction: LocalizedText;
  options: QuestionOption[];
  answer: AnswerValue;
  hint?: LocalizedText;
  visual?: string;
  audio?: AudioAsset;
}

export interface LevelDefinition {
  id: string;
  levelNumber: number;
  title: LocalizedText;
  difficulty: number;
  questions: QuestionDefinition[];
  timeLimitSeconds?: number;
  lives: number;
  scoreMultiplier: number;
  unlockRequirement?: {
    levelId: string;
    minStars: number;
  };
}

export interface LearningMetadata {
  objective: LocalizedText;
  skills: LocalizedText[];
  expectedOutcome: LocalizedText;
}

export interface GameDefinition {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  subject: LocalizedText;
  category: GameCategory;
  ageRange: AgeRange;
  icon: string;
  accentColor: string;
  levels: LevelDefinition[];
  learning: LearningMetadata;
}

export interface LevelProgress {
  completed: boolean;
  stars: number;
  bestScore: number;
}

export interface GameProgress {
  gameId: string;
  completedLevels: Record<string, LevelProgress>;
  coins: number;
  xp: number;
}

export interface AppProgress {
  games: Record<string, GameProgress>;
  achievements: string[];
  streakDays: number;
}

export interface AppSettings {
  language: SupportedLanguage;
  voiceEnabled: boolean;
  musicEnabled: boolean;
  soundEffectsEnabled: boolean;
  hapticsEnabled: boolean;
  reducedMotion: boolean;
  speechRate: number;
}

export interface RewardGrant {
  type: RewardType;
  amount: number;
  id?: string;
  label?: LocalizedText;
}

export interface LevelResult {
  gameId: string;
  levelId: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  stars: number;
  rewards: RewardGrant[];
}
