const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });

require("./database/db.js");

const app = express();

const PORT = process.env.PORT

// real listen*******
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

//socket****
const io = require("socket.io")(server, {
    pingTimeOut: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
});

// io connection
io.on("connection", (socket) => {
    console.log("connected to socket.io")

    // socket.on('setup', (userData) => {
    //     socket.join(userData._id);
    //     socket.emit('connected')
    // })

    // socket.on('send connection request', (data) => {
    //     // socket.join(data)
    //     console.log("sent" + data)

    // })
    socket.on('sendConnection', ({ id, studentDetails, studentQuery }) => {

    })


})