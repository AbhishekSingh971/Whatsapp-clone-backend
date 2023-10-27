import messagecontent from "../model/dbMessages.js";

export const createMessage = async (req, res) => {
  try {
    const { message, name, timeStamp, received } = await req.body;
    const {RID} =await req.params;

    switch (true) {
      case !message:
        return res.status(500).send("Message please type the message");
      case !name:
        return res.status(500);
      case !timeStamp:
        return res.status(500);
      case received === null:
        return res.status(500);
      default:
    }

    const messages = await messagecontent({
      message,
      name,
      timeStamp,
      received,
      roomId: RID
    }).save();

    res.status(201).send({
      success: true,
      msg: "message created successfully",
      messages,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "message not send",
      err,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const {RID} = await req.params;
    const messages = await messagecontent.find({roomId: RID});
    const totalData = await messagecontent.find({roomId: RID}).estimatedDocumentCount();

    if (messages) {
      res.status(201).send({
        success: true,
        totalData,
        msg: `get All messages successfully from ${RID}`,
        messages,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "message not send",
      err,
    });
  }
};

export const deleteMessage = async (req, res)=>{
  try {
    const {id} = await req.params;
    await messagecontent.findByIdAndDelete(id);

      res.status(201).send({
        success: true,
        msg: `Message Deleted successfully from ${id}`,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "message not deleted",
      error,
    });
  }
}
