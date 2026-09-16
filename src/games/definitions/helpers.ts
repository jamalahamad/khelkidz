import {GameCategory, GameDefinition, LevelDefinition, LocalizedText} from '../../types/core';

const levelTitle = (levelNumber: number): LocalizedText => ({
  en: `Level ${levelNumber}`,
  hi: `स्तर ${levelNumber}`,
});

export function makeOption(
  id: string,
  en: string,
  hi: string,
  value: string | number,
  visual?: string,
  color?: string,
) {
  return {
    id,
    label: {en, hi},
    value,
    visual,
    color,
  };
}

export function createChoiceLevel(
  gameId: string,
  levelNumber: number,
  difficulty: number,
  prompt: LocalizedText,
  instruction: LocalizedText,
  options: ReturnType<typeof makeOption>[],
  answer: string | number,
  visual?: string,
): LevelDefinition {
  return {
    id: `${gameId}-level-${levelNumber}`,
    levelNumber,
    title: levelTitle(levelNumber),
    difficulty,
    questions: [
      {
        id: `${gameId}-level-${levelNumber}-q1`,
        prompt,
        instruction,
        options,
        answer,
        visual,
      },
    ],
    lives: 3,
    scoreMultiplier: 1 + difficulty * 0.15,
    unlockRequirement:
      levelNumber === 1
        ? undefined
        : {levelId: `${gameId}-level-${levelNumber - 1}`, minStars: 1},
  };
}

export function createPlaceholderGame(input: {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  subject: LocalizedText;
  category: GameCategory;
  icon: string;
  accentColor: string;
  objective: LocalizedText;
  question: LocalizedText;
  instruction: LocalizedText;
  correct: ReturnType<typeof makeOption>;
  options: ReturnType<typeof makeOption>[];
}): GameDefinition {
  return {
    id: input.id,
    title: input.title,
    description: input.description,
    subject: input.subject,
    category: input.category,
    icon: input.icon,
    accentColor: input.accentColor,
    ageRange: {min: 2, max: 8},
    learning: {
      objective: input.objective,
      skills: [
        {en: 'Recognition', hi: 'पहचान'},
        {en: 'Listening', hi: 'सुनना'},
        {en: 'Problem solving', hi: 'समस्या हल करना'},
      ],
      expectedOutcome: input.objective,
    },
    levels: Array.from({length: 8}, (_, index) =>
      createChoiceLevel(
        input.id,
        index + 1,
        index + 1,
        input.question,
        input.instruction,
        input.options,
        input.correct.value,
        input.correct.visual,
      ),
    ),
  };
}
