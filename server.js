import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import router from "./routes/message.js";
import Pusher from "pusher";
import cors from "cors";
// import path from 'path'

//configure env
dotenv.config();

const app = express();

//DB config
connectDB();
const db = mongoose.connection;

const pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: "eu",
  useTLS: true,
});

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const roomsCollection = db.collection("rooms");
  // console.log(msg Collection)
  const changeStream = msgCollection.watch();
  const changeStreamRooms = roomsCollection.watch();
  // console.log(changeStream);

  changeStream.on("change", (change) => {
    console.log("A Change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timeStamp: messageDetails.timeStamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });

  changeStreamRooms.on("change", (changeR) => {
    console.log("A Change occured", changeR);
    if (changeR.operationType === "insert") {
      const roomsDetails = changeR.fullDocument;
      pusher.trigger("rooms", "inserted", {
        name: roomsDetails.name,
        slug: roomsDetails.slug,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });

//middleware
app.use(morgan("dev"));
app.use(express.json());
var corsOptions = {
  origin: 'https://653c2bbd60ffbc25a7148c45--delicate-buttercream-18e55e.netlify.app/',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Alllow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
// app.use(express.static(path.join(__dirname, '../Whatsapp-frontend/dist')))

//api routes

//REST api
// app.use('/',function(req,res){
  // res.sendFile(path.join(__dirname, '../build/index.html'));
  // res.send("hello");
// });

app.use("/api/v1", router);

//listen
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is running on ${process.env.DEV} mode at port ${port}`);
});
