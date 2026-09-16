# Audio

Game screens call `AudioService.playMusic`, `AudioService.stopMusic`, and `AudioService.playSfx`.

The service currently acts as a safe abstraction until native packages and assets are connected. Recorded music and sound effects should be mapped inside the service so screens remain unchanged.
