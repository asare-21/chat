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

const user = new mongoose.Schema({
  name: "String",
  phone: "String",
  friends: [
    {
      name: "String",
      phone: "String",
    },
  ],
});

const message = mongoose.model("message", messageSchema);
const User = mongoose.model("user", user);

io.on("connection", (socket) => {
  console.log("A user Connected");
  User.find().then((result) => {
    socket.emit("users", result);
    let newEvent = [];
    result.forEach((result) => {
      let id = result.friends;
      id.forEach((friend) => {
        newEvent.push(friend.phone);
      });
    });
    socket.on("users", (user) => {
      console.log(user);
      User.findOne({ phone: user }).then((result) => {
        console.log(result);
        socket.emit("found", result.phone);
      });
    });
    if (newEvent.length !== 0) {
      console.log("greater than 0");
      newEvent.forEach((event) => {
        socket.on(event, (message) => {
          console.log(message);
        });
      });
    }
    // socket.on("message", (msg) => {
    //   socket.broadcast.emit("message", msg);
    //   console.log(msg);
    //   new message({
    //     message: msg,
    //   }).save();
    //   new User({
    //     name: "Joseph Asare",
    //     phone: "0202737487",
    //     friends: {
    //       name: "Elizabeth Nsiah",
    //       phone: "0501658927",
    //     },
    //   }).save();
    // });
  });

  io.on("disconnect", (msg) => {
    console.log("User disconnected");
  });
});

// http.get(
//   {
//     path: "/",
//   },
//   (res) => {
//     console.log(res);
//   }
// );

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

app.get("/", (request, response) => {
  console.log(request.body);
  User.find().then((result) => {
    console.log(result);
    response.json(result);
  });
});
