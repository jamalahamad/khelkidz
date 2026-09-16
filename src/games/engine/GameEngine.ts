import {GameDefinition, LevelDefinition} from '../../types/core';
import {GameSession} from './GameSession';

export class GameEngine {
  static createSession(game: GameDefinition, level: LevelDefinition) {
    return new GameSession(game.id, level);
  }
}
