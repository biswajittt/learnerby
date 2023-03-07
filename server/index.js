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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

