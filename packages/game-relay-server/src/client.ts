import WebSocket from "ws";
import axios from "axios";
import type { Lobby } from "./types";

export class RelayClient {
  url: string;
  connection: WebSocket;

  constructor(url: string) {
    this.url = url;
  }

  async getLobbies() {
    const lobbiesUrl = new URL("lobby", this.url).href;
    const res = await axios.get<Lobby[]>(lobbiesUrl);
    const lobbies = res.data;
    return lobbies;
  }

  joinLobby(joinCode: string) {
    const joinUrl = new URL(
      `./lobby/${joinCode}`,
      this.url.replace("http://", "ws://").replace("https://", "wss://")
    ).href;
    this.connection = new WebSocket(joinUrl);
  }
}
