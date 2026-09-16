# Localization

Hindi is the default language. UI copy lives in `src/locales`, and game copy lives inside localized game definitions.

Use `t("key")` for dictionary text and `localize(game.title)` for localized content objects. Missing translations fall back safely to English or a visible marker.

To add a language, extend `SupportedLanguage`, add locale files, and provide localized game content.
