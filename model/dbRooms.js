import mongoose from 'mongoose';

const roomsSchema = mongoose.Schema({
    name: {
        type: String
    },
    slug:{
        type: String,
        lowercase: true
    }
});

export default mongoose.model("rooms",roomsSchema);