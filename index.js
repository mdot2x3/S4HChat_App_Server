const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //allows you to send data from front-end to back-end

const server = app.listen("https://s4hchat-app.herokuapp.com/" || "3001", () => {
  console.log("Server Running on Port 3001...");
});

io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => { //.on receives the data from front-end
    socket.join(data);
    console.log("User Joined Room: " + data); //data is name of room input by user
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});