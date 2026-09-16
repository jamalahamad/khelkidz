# Voice

Game screens call `VoiceService.speak` and `VoiceService.repeat`.

Question content supports optional language-specific recorded audio. If recorded audio is absent, the service is designed to fall back to TTS. Native TTS should be connected inside `VoiceService`.
