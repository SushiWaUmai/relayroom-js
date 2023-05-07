export interface Lobby {
	joinCode: string;
}

export interface Client<T = any> {
	clientId: number;
	data: T;
}

export interface Message<T = any> {
	type: string;
	data: T;
	targets: number[] | null;
}
