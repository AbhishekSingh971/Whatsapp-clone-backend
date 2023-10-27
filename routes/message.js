import express from "express";
import messagecontent from "../model/dbMessages.js";
import { createMessage, getMessage, deleteMessage } from "../controller/messages.js";
import { createRooms, getRooms,getRoom } from "../controller/rooms.js";
const router = express.Router();

router.get("/messages/sync/:RID", getMessage);
router.post("/messages/new/:RID", createMessage);
router.delete("/messages/delete/:id", deleteMessage);

router.get("/rooms/sync", getRooms);
router.post("/rooms/new", createRooms);
router.get("/room/:RID", getRoom);

// router.get("/rooms/:slug", getSingleRoom);

export default router;
