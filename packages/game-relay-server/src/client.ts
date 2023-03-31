import WebSocket from "ws";
import axios from "axios";
import type { Client, Lobby } from "./types";

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

  async getClients<T>(joinCode: string) {
    const clientsUrl = new URL(`./lobby/${joinCode}/clients`, this.url).href;
    const res = await axios.get<Client<T>[]>(clientsUrl);
    const clients = res.data;
    return clients;
  }

	async getClient<T>(joincode: string, clientId: number) {
    const clientsurl = new URL(`./lobby/${joincode}/clients/${clientId}`, this.url).href;
    const res = await axios.get<Client<T>>(clientsurl);
    const client = res.data;
    return client;
  }

  joinLobby(joinCode: string) {
    const joinUrl = new URL(
      `./lobby/${joinCode}`,
      this.url.replace("http://", "ws://").replace("https://", "wss://")
    ).href;
    this.connection = new WebSocket(joinUrl);
  }
}
