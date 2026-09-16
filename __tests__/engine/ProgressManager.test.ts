import {ColorQuest} from '../../src/games/definitions/colorQuest';
import {ProgressManager, emptyProgress} from '../../src/games/engine/ProgressManager';
import {LevelResult} from '../../src/types/core';

describe('ProgressManager', () => {
  it('saves best score, stars, coins, xp, and achievements by game id', () => {
    const result: LevelResult = {
      gameId: ColorQuest.id,
      levelId: ColorQuest.levels[0].id,
      totalQuestions: 1,
      correctAnswers: 1,
      score: 150,
      stars: 3,
      rewards: [
        {type: 'stars', amount: 3},
        {type: 'coins', amount: 20},
        {type: 'xp', amount: 150},
        {type: 'badge', amount: 1, id: 'perfect'},
      ],
    };

    const updated = ProgressManager.applyLevelResult(emptyProgress, ColorQuest, result);

    expect(updated.games[ColorQuest.id].completedLevels[result.levelId]).toEqual({
      completed: true,
      stars: 3,
      bestScore: 150,
    });
    expect(updated.games[ColorQuest.id].coins).toBe(20);
    expect(updated.games[ColorQuest.id].xp).toBe(150);
    expect(updated.achievements).toContain('perfect');
  });
});
