import {AppProgress, GameDefinition, LevelResult} from '../../types/core';

export const emptyProgress: AppProgress = {
  games: {},
  achievements: [],
  streakDays: 0,
};

export class ProgressManager {
  static applyLevelResult(
    progress: AppProgress,
    game: GameDefinition,
    result: LevelResult,
  ): AppProgress {
    const previousGame = progress.games[game.id] ?? {
      gameId: game.id,
      completedLevels: {},
      coins: 0,
      xp: 0,
    };
    const previousLevel = previousGame.completedLevels[result.levelId];
    const coins = result.rewards
      .filter(reward => reward.type === 'coins')
      .reduce((total, reward) => total + reward.amount, 0);
    const xp = result.rewards
      .filter(reward => reward.type === 'xp')
      .reduce((total, reward) => total + reward.amount, 0);
    const badges = result.rewards
      .filter(reward => reward.type === 'badge' && reward.id)
      .map(reward => reward.id as string);

    return {
      ...progress,
      achievements: Array.from(new Set([...progress.achievements, ...badges])),
      games: {
        ...progress.games,
        [game.id]: {
          ...previousGame,
          coins: previousGame.coins + coins,
          xp: previousGame.xp + xp,
          completedLevels: {
            ...previousGame.completedLevels,
            [result.levelId]: {
              completed: true,
              stars: Math.max(previousLevel?.stars ?? 0, result.stars),
              bestScore: Math.max(previousLevel?.bestScore ?? 0, result.score),
            },
          },
        },
      },
    };
  }

  static getGameProgressPercent(progress: AppProgress, game: GameDefinition) {
    const completed = Object.keys(progress.games[game.id]?.completedLevels ?? {}).length;
    return Math.round((completed / game.levels.length) * 100);
  }

  static getTotalCoins(progress: AppProgress) {
    return Object.values(progress.games).reduce((sum, game) => sum + game.coins, 0);
  }
}
