const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });

require("./database/db.js");

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));


//

app.use(require("body-parser").json({ extended: true }));

//

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//

app.use(require("./routes/route.js"));

// const fileUpload = require("express-fileupload");
// app.use(fileUpload({
//     useTempFiles: true
// }))


const PORT = process.env.PORT

// real listen*******
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// //socket****
// const io = require("socket.io")(server, {
//     pingTimeOut: 60000,
//     cors: {
//         origin: "http://localhost:3000",
//     }
// });


// // mentor model
// const Mentor = require("./model/mentorSchema.js");
// const User = require("./model/userSchema.js");

// // io connection
// let users = [];
// io.on("connection", (socket) => {
//     console.log("connected to socket.io")


//     // socket.on("addUser", (accountHolderId, accountHolderEmail) => {
//     //     // socket.accountHolderId = accountHolderId;
//     //     const isUserExist = User.findOne({ email: accountHolderEmail });
//     //     // console.log("isUserExist")
//     //     // console.log(isUserExist)
//     //     if (!isUserExist) {
//     //         const user = { accountHolderId, accountHolderEmail, socketId: socket.id }
//     //         users.push(user);
//     //         io.emit("getUsers", users);
//     //     } else {
//     //         console, log("jhjhhjh")
//     //         const user = { accountHolderId, accountHolderEmail, socketId: socket.id }
//     //         users.push(user);
//     //         io.emit("getUsers", users);
//     //     }
//     // })



//     // socket.on('sendConnection', ({ id, studentDetails, studentQuery }) => {
//     //     const reciever = Mentor.find({ '_id': id });
//     //     if (reciever) {
//     //         io.to(id).emit("getConnection", {
//     //             studentDetails,
//     //             studentQuery
//     //         })
//     //     }
//     // })


// })




