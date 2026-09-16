# Adding A Game

1. Create a new game definition in `src/games/definitions`.
2. Provide `GameDefinition` metadata, learning objectives, age range, accent color, icon, and levels.
3. Keep questions as `QuestionDefinition` data with Hindi and English content.
4. Add the game to `Games` in `src/games/definitions/index.ts`.
5. Add any needed translations or audio assets.
6. Add tests for the new rules or question generator.

The Home, Game Library, Level Select, and Game Play screens load from `GameRegistry`, so unrelated screens do not need to change.
