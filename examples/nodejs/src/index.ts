import { RelayClient } from "game-relay-server";

const main = () => {
  const client = new RelayClient("ws://localhost:8080");
  console.log(client);
};

main();
