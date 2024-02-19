import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { listenToSocketEvents } from "./socket/listenToSocketEvents";

const app = express();
const server = http.createServer(app);
const socket = new Server(server, { cors: { origin: "*" } });
listenToSocketEvents(socket);
const port = process.env.PORT || 3333;

app.use(
  cors({
    origin: process.env.WEB_URL || "http://localhost:3000",
    credentials: true,
  })
);

const baseDir = `${__dirname}/public/`;

app.use(express.static(baseDir));

app.get("*", (_, res) => res.sendFile("index.html", { root: baseDir }));

server.listen(port, () => {
  console.log("Listening on port " + port);
});

export { socket };
