import {AppConfig} from '../../config/AppConfig';
import {AppProgress, GameDefinition, LevelDefinition} from '../../types/core';

export class LevelManager {
  static getLevel(game: GameDefinition, levelId: string): LevelDefinition {
    const level = game.levels.find(item => item.id === levelId);
    if (!level) {
      throw new Error(`Missing level "${levelId}" for ${game.id}`);
    }
    return level;
  }

  static isUnlocked(
    game: GameDefinition,
    level: LevelDefinition,
    progress: AppProgress,
  ) {
    if (level.levelNumber === 1) {
      return true;
    }
    const requirement = level.unlockRequirement;
    if (!requirement) {
      return true;
    }
    const completed = progress.games[game.id]?.completedLevels[requirement.levelId];
    return (completed?.stars ?? 0) >= Math.max(requirement.minStars, AppConfig.levelUnlockStars);
  }

  static getNextLevel(game: GameDefinition, level: LevelDefinition) {
    return game.levels.find(item => item.levelNumber === level.levelNumber + 1) ?? null;
  }
}
