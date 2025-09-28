import express from "express";
import http from "http";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from "socket.io";
import { app } from "./app";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const customEnv = {};
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
  processEnv: customEnv,
  quiet: true
});
const PORT = customEnv.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

export { io };

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});