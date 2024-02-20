import express from "express";
import http from "http";
import { Server } from "socket.io";

import { listenToSocketEvents } from "./socket/listenToSocketEvents";
import { EnvironmentHelper } from "./helpers/environment.helper";

const LOCAL_WEB_URL = "http://localhost:3000";

const app = express();
const server = http.createServer(app);
const socket = new Server(server, {
  cors: { origin: EnvironmentHelper.isLocal() ? LOCAL_WEB_URL : null },
});
listenToSocketEvents(socket);

const port = process.env.PORT || 3333;

const baseDir = `${__dirname}/public/`;

app.use(express.static(baseDir));

app.get("*", (_, res) => res.sendFile("index.html", { root: baseDir }));

server.listen(port, () => {
  console.log("Listening on port " + port);
});

export { socket };
