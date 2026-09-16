export type Route =
  | {name: 'home'}
  | {name: 'games'}
  | {name: 'levels'; gameId: string}
  | {name: 'play'; gameId: string; levelId: string}
  | {name: 'settings'};
