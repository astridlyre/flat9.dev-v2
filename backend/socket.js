import http from "http";
import { Server } from "socket.io";
import User from "./user.js";

export default function createServer(app) {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://127.0.0.1:8080",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-secret-header"],
      credentials: true,
    },
  });
  const users = new Map();
  const messages = [];

  io.on("connection", socket => {
    console.log("A user connected");
    socket.on("created", data => {
      const userData = JSON.parse(data);
      const foundUser = [...users.values()].find(
        user => user.username === userData.username
      );
      if (foundUser) {
        return socket.emit("error", {
          error: `Username ${userData.username} already exists`,
        });
      }
      console.log(`Creating user ${userData.username}`);
      const newUser = new User(userData);
      users.set(socket, newUser);
      socket.emit("created", newUser.toJSON());
      socket.emit("messages", messages);
    });

    socket.on("message", data => {
      const user = users.get(socket);
      const message = {
        message: {
          text: JSON.parse(data).message,
          createdAt: new Date().getTime(),
        },
        user: user.toJSON(),
      };
      console.log("MESSAGE: ", message);
      messages.push(message);
      io.emit("message", message);
    });

    socket.on("logoff", data => {
      users.delete(socket);
      console.log(`${data.username} logged off`);
    });

    socket.on("disconnected", () => {
      users.delete(socket);
      console.log("User disconnected");
    });
  });

  return server;
}
