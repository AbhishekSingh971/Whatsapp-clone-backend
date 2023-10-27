import mongoose from 'mongoose';

const whatsappSchema = mongoose.Schema({
    message: {
        type: String
    },
    name: {
        type: String
    },
    timeStamp: {
        type: String
    },
    received: {
        type: Boolean
    },
    roomId:{
        type: mongoose.ObjectId,
        ref: "rooms"
    }
});

export default mongoose.model('messagecontent', whatsappSchema);