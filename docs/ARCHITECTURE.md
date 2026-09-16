# KhelKidz Architecture

KhelKidz is organized around reusable product systems rather than screen-specific logic.

- `src/design-system` owns colors, spacing, radius, typography, shadows, animation timing, and the theme provider.
- `src/services` owns storage, localization, audio, voice, haptics, and ads abstractions.
- `src/games/engine` owns sessions, scoring, rewards, progress, level unlocks, and the registry.
- `src/games/definitions` owns declarative game content.
- `src/components` owns reusable child-friendly UI controls.
- `src/features` owns screens composed from those shared systems.

Current native integrations are intentionally behind services. Add native TTS, recorded audio, analytics, or ads by changing services, not game screens.
