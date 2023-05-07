import WebSocket from "ws";
import axios from "axios";
import type { Client, Lobby, Message } from "./types";
import EventEmitter from "events";

export class RelayClient extends EventEmitter {
	url: string;
	connection: WebSocket;

	constructor(url: string) {
		super();
		this.url = url;
	}

	async getLobbies() {
		const lobbiesUrl = new URL("lobby", this.url).href;
		const res = await axios.get<Lobby[]>(lobbiesUrl);
		const lobbies = res.data;
		return lobbies;
	}

	async createLobby() {
		const lobbiesUrl = new URL("lobby", this.url).href;
		const res = await axios.post<Lobby>(lobbiesUrl);
		const lobby = res.data;
		return lobby;
	}

	async getClients<T = any>(joinCode: string) {
		const clientsUrl = new URL(`./lobby/${joinCode}/clients`, this.url).href;
		const res = await axios.get<Client<T>[]>(clientsUrl);
		const clients = res.data;
		return clients;
	}

	async getClient<T = any>(joincode: string, clientId: number) {
		const clientsurl = new URL(
			`./lobby/${joincode}/clients/${clientId}`,
			this.url
		).href;
		const res = await axios.get<Client<T>>(clientsurl);
		const client = res.data;
		return client;
	}

	joinLobby(joinCode: string): Promise<void> {
		return new Promise((resolve) => {
			const joinUrl = new URL(
				`./lobby/${joinCode}`,
				this.url.replace("http://", "ws://").replace("https://", "wss://")
			).href;
			this.connection = new WebSocket(joinUrl);

			this.connection.on("close", () => {
				this.removeAllListeners();
			});

			this.connection.on("open", () => {
				this.connection.on("message", (msgData) => {
					const msg = JSON.parse(msgData.toString()) as Message;
					this.emit(msg.type, msg.data);
				});

				resolve();
			});
		});
	}

	send<T = any>(msg: Message<T>) {
		if (this.connection.readyState != WebSocket.OPEN) {
			console.error("Failed to send msg. Connection has not been established. Make sure to await the joinLobby call");
			return;
		}

		this.connection.send(JSON.stringify(msg));
	}
}
