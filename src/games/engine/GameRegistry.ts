import {GameDefinition} from '../../types/core';

class Registry {
  private games = new Map<string, GameDefinition>();

  register(game: GameDefinition) {
    if (this.games.has(game.id)) {
      throw new Error(`Game already registered: ${game.id}`);
    }
    this.games.set(game.id, game);
  }

  all() {
    return Array.from(this.games.values());
  }

  get(gameId: string) {
    const game = this.games.get(gameId);
    if (!game) {
      throw new Error(`Unknown game: ${gameId}`);
    }
    return game;
  }

  clearForTests() {
    this.games.clear();
  }
}

export const GameRegistry = new Registry();
