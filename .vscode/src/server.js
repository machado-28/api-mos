import { createServer } from "http";
import app from "./app"
import "dotenv/config";
import { setupSocket } from "./socketio"

const PORT = process.env.PORT || 4400;

const server = createServer(app);

setupSocket(server)

server.listen(PORT, () => console.log(" SERVER RUNNING ON PORT ", PORT));

["uncaughtException", "unhandledRejection"].forEach((event) => {
  process.on(event, (err) => {
    console.error(
      `something bad happened! event: ${event}, msg:${err.stak || err}`
    );
  });
});
