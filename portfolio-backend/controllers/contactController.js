import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

export const sendMessage = async (req, res) => {
  try {
    //  Save message in MongoDB
    const savedMessage = await new Contact(req.body).save();

    //  Email notification
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

    return res.status(200).json({
      success: true,
      message: "Message saved & email sent successfully",
      data: savedMessage
    });
  } catch (err) {
    console.error("Send message error:", err);

    //  sabse important — response return kare
    return res.status(500).json({
      success: false,
      message: "Email service error — Message saved but email not sent"
    });
  }
};
