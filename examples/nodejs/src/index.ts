import { RelayClient } from "game-relay-server";

const main = async () => {
  const client = new RelayClient("http://localhost:8080");
  console.log(await client.getLobbies());
};

main();
