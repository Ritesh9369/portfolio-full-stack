import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

export const sendMessage = async (req, res) => {
  try {
    // 1️⃣ Save message in MongoDB
    await new Contact(req.body).save();

    // 2️⃣ Email notification (when someone fills contact form)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Message" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: "📩 New Contact Message Received",
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${req.body.message}</p>
        <br/>
        <small>⏱ Time: ${new Date().toLocaleString()}</small>
      `
    });

    res.json({ success: true, message: "Message saved & notification sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const data = await Contact.find().sort({ createdAt: -1 }); // Latest first
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error loading messages" });
  }
};
