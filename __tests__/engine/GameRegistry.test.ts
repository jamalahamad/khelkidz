import {Games} from '../../src/games/definitions';

describe('game definitions', () => {
  it('ships the ten required initial games with multiple levels', () => {
    expect(Games).toHaveLength(10);
    Games.forEach(game => {
      expect(game.levels.length).toBeGreaterThanOrEqual(8);
      expect(game.title.hi).toBeTruthy();
      expect(game.title.en).toBeTruthy();
      expect(game.learning.objective.en).toBeTruthy();
      expect(game.learning.objective.hi).toBeTruthy();
    });
  });
});
