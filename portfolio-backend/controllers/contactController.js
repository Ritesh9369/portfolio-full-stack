import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

// Send Message (Save + Email)
export const sendMessage = async (req, res) => {
  try {
    // 1) Save message in MongoDB
    const savedMessage = await new Contact(req.body).save();

    // 2) Send email notification
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

    // ⭐ Response bhejna zaroori hai (spinner stop + success toast)
    return res.status(200).json({
      success: true,
      message: "Message saved & email sent successfully",
      data: savedMessage
    });
  } catch (err) {
    console.error("Send message error:", err);

    // ⭐ Error ke time par bhi response dena zaroori (nahi to spinner infinite chalega)
    return res.status(500).json({
      success: false,
      message: "Email service error — message saved but email not sent"
    });
  }
};

// Get All Messages (Admin panel ke liye)
export const getMessages = async (req, res) => {
  try {
    const data = await Contact.find().sort({ createdAt: -1 }); // Latest first
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error loading messages"
    });
  }
};
