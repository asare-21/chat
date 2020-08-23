const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const dev = app.get("env") == "production";
const path = require("path");

require("dotenv").config();

const messageSchema = new mongoose.Schema({
  message: "String",
});
const message = mongoose.model("message", messageSchema);

io.on("connection", (socket) => {
  console.log("A user Connected");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
    console.log(msg);
    new message({
      message: msg,
    }).save();
  });
  io.on("disconnect", (msg) => {
    console.log("User disconnected");
  });
});

http.listen(process.env.PORT || 4000, () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.user}:${process.env.pass}@cluster0-a1p4q.mongodb.net/${process.env.db}?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Connection successful");
      if (dev) {
        app.use(express.static(path.resolve(__dirname, "build")));
        app.get("*", (req, res) => {
          res.sendFile(path.resolve(__dirname, "build", "index.html"));
        });
      }
      console.log("Server running on port 4000");
    })
    .catch((error) => {
      console.log(error.message);
    });
});
