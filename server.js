import app from "./app.js";
import http from "http"
import dotenv from "dotenv"
import { dbConnection } from "./clint/dbconnection.js";


process.on("uncaughtException", (err) => {
    console.log(err);
    console.log("UNCAUGHT Exception! Shutting down ...");
    process.exit(1); // Exit Code 1 indicates that a container shut down, either because of an application failure.
  });
  

dotenv.config({ path: "./config.env" });

dbConnection();


const server = http.createServer(app);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});

process.on("unhandledRejection", (err) => {
    console.log(err);
    console.log("UNHANDLED REJECTION! Shutting down ...");
    server.close(() => {
      process.exit(1); //  Exit Code 1 indicates that a container shut down, either because of an application failure.
    });
  });