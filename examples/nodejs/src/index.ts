import { RelayClient } from "relayroom";

const main = async () => {
  const client = new RelayClient("http://localhost:8080");

  client.on("hello", (data) => {
    console.log("Hello,", data);
  });

  const lobby = await client.createLobby();
  await client.joinLobby(lobby.joinCode);
  console.log(await client.getLobbies());
  console.log(await client.getClients(lobby.joinCode));

  client.send({ type: "hello", data: "Foo", targets: null });
};

main();
