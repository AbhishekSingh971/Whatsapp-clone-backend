import dbRooms from '../model/dbRooms.js';
import slugify from 'slugify'

export const createRooms = async(req,res)=>{
    try{
        const {name, slugName} = req.body;

    if(!name){
        return res.status(500).send("name can't be empty");
    }

    const rooms = await new dbRooms({name, slug: slugify(name)}).save();

    res.status(201).send({
        success: true,
        msg: 'Room created successfully',
        rooms
    });
    }catch(err){
        res.status(500).send({
            success: true,
            msg: 'Something went wrong',
            err
        });
    }
}

export const getRooms = async (req,res)=>{
    try {
        const rooms = await dbRooms.find();
    const totalData = await dbRooms.find().estimatedDocumentCount();

    if (rooms) {
      res.status(200).send({
        success: true,
        totalData,
        msg: "get All messages successfully",
        rooms,
      });
    }
    } catch (error) {
        res.status(500).send({
            success: true,
            msg: 'Something went wrong',
            err
        });
    }
}

export const getRoom = async (req,res)=>{
    try {
        const {RID} = req.params;
        const room = await dbRooms.findById(RID);

    if (room) {
      res.status(200).send({
        success: true,
        msg: "get Room successfully",
        room,
      });
    }
    } catch (error) {
        res.status(500).send({
            success: true,
            msg: 'Something went wrong',
            error
        });
    }
}