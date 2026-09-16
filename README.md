# KhelKidz

KhelKidz is a React Native CLI educational game app for children aged 2-8. The app is designed around Hindi-first learning, English support, playful voice-guided games, positive feedback, and a reusable architecture for adding more educational content.

## What is built

- Professional kids home screen with mascot, language selector, daily challenge, coins, and continue learning.
- Game library loaded from a central `GameRegistry`.
- Ten initial game definitions: Color Quest, Shape Adventure, Number Safari, Math Magic, English ABC, Hindi Fun, Memory Match, Puzzle World, Word Builder, and Pattern Hero.
- Color Quest as the richer reference game with eight progressive levels.
- Level selection with locked/unlocked progression and star display.
- Playable game screen with question prompts, answer grid, voice replay, friendly wrong-answer handling, haptics/audio service calls, scoring, rewards, and next-level flow.
- Hindi default language with persistent settings through AsyncStorage.
- Central design system, localization service, audio service, voice service, haptic service, ad abstraction, reward manager, progress manager, and game engine.
- Unit tests for scoring, progress, registry coverage, and localization.

## Folder structure

```text
src/
  app/                  App providers and lightweight navigation
  components/           Reusable child-friendly UI
  config/               App and feature configuration
  design-system/        Theme, colors, spacing, radius, typography, shadows
  features/             Home, games, levels, settings screens
  games/engine/         Game sessions, scoring, rewards, progress, registry
  games/definitions/    Declarative game content
  locales/              Translation dictionaries
  services/             Storage, localization, audio, voice, haptics, ads
  store/                App settings and progress state
  types/                Shared TypeScript contracts
```

## Development

```sh
npm install
npm start
npm run android
npm run ios
npm test
npm run lint
npx tsc --noEmit
```

## Architecture principles

- Visible UI text should use `t("key")` or localized content objects.
- Games are data-driven through `GameDefinition`, `LevelDefinition`, and `QuestionDefinition`.
- Game screens never call native audio, TTS, haptic, storage, or ad SDKs directly.
- Progress is namespaced by game id so games can be added or removed safely.
- Rewards are calculated centrally and rendered through the shared reward popup.
- Theme tokens live in one place so product identity can change without rewriting screens.

## Adding a game

1. Create a game definition in `src/games/definitions`.
2. Add localized title, description, subject, learning metadata, accent color, icon, age range, and levels.
3. Keep all prompts, instructions, options, and hints in Hindi and English.
4. Add the game to `Games` in `src/games/definitions/index.ts`.
5. Add tests for any custom question generation or rules.

Screens load from `GameRegistry`, so Home, Game Library, Level Select, and Game Play do not need game-specific rewrites.

## Localization

Hindi is selected by default. The app persists language in AsyncStorage using `khelkidz.settings`.

- Dictionary copy lives in `src/locales`.
- Game content uses localized objects such as `{en, hi}`.
- Missing dictionary keys fall back to English or a visible safe marker.

## Audio and voice

`AudioService` and `VoiceService` are production-facing abstractions. The current app safely no-ops when native assets or TTS are unavailable. Add recorded audio, background music, sound effects, or platform TTS inside these services without changing game UI.

## Rewards and progress

`ScoreManager` calculates score and stars. `RewardManager` converts level results into stars, coins, XP, badges, and level completion rewards. `ProgressManager` saves best score, stars, achievements, coins, and XP.

## Ads and child safety

Ads are disabled by default in `FeatureConfig`. Future monetization should be policy-aware, parent-controlled where appropriate, and isolated behind `AdService`.

## Documentation

See `docs/` for architecture, adding games, localization, audio, voice, theming, rewards, ads, and testing notes.
