export interface Lobby {
  joinCode: string;
}

export interface Client<T> {
  clientId: number;
  data: T;
}
