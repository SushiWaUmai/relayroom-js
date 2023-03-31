import WebSocket from "ws";

export class RelayClient {
  connection: WebSocket;

  constructor(url: string) {
    this.connection = new WebSocket(url);
  }
}
