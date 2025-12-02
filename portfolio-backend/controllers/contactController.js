import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  try {
    // Save message to Database
    const savedMessage = await new Contact(req.body).save();

    return res.status(200).json({
      success: true,
      message: "Message saved successfully",
      data: savedMessage
    });

  } catch (err) {
    console.error("Send message error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const data = await Contact.find().sort({ createdAt: -1 });
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error loading messages"
    });
  }
};
