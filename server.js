import app from "./app.js";
import http from "http"
import dotenv from "dotenv"
import { dbConnection } from "./clint/dbconnection.js";
import {Server} from "socket.io"


process.on("uncaughtException", (err) => {
    console.log(err);
    console.log("UNCAUGHT Exception! Shutting down ...");
    process.exit(1); // Exit Code 1 indicates that a container shut down, either because of an application failure.
  });
  

dotenv.config({ path: "./config.env" });

dbConnection();


const server = http.createServer(app);

// socket.io server configuration

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});

// Listen for when the client connects via socket.io-client
io.on("connection", async (socket) => {
  console.log(JSON.stringify(socket.handshake.query));

  const user_id = socket.handshake.query["user_id"];

  console.log(`User connected ${socket.id}`);

  if (user_id != null && Boolean(user_id)) {
    try {
      User.findByIdAndUpdate(user_id, {
        socket_id: socket.id,
        status: "Online",
      });
    } catch (e) {
      console.log(e);
    }
  }

  // // We can write our socket event listeners in here...
  // socket.on("friend_request", async (data) => {
  //   const to = await User.findById(data.to).select("socket_id");
  //   const from = await User.findById(data.from).select("socket_id");

  //   // create a friend request
  //   await FriendRequest.create({
  //     sender: data.from,
  //     recipient: data.to,
  //   });
  //   // emit event request received to recipient
  //   io.to(to?.socket_id).emit("new_friend_request", {
  //     message: "New friend request received",
  //   });
  //   io.to(from?.socket_id).emit("request_sent", {
  //     message: "Request Sent successfully!",
  //   });
  // });
})

process.on("unhandledRejection", (err) => {
    console.log(err);
    console.log("UNHANDLED REJECTION! Shutting down ...");
    server.close(() => {
      process.exit(1); //  Exit Code 1 indicates that a container shut down, either because of an application failure.
    });
  });