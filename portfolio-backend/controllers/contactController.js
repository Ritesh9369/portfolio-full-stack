import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  try {
    // Save message to Database
    const savedMessage = await new Contact(req.body).save();

    // <-- Yaha email EmailJS karega (Frontend se) — Backend kuch nahi bhejega

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
