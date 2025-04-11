import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter with SMTP settings
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // SMTP host (e.g., smtp.gmail.com)
    port: process.env.EMAIL_PORT, // SMTP port (e.g., 587 for Gmail)
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS // Your email password or app-specific password
    }
});

// Route to handle sending emails
app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;

    // Email options for the message sent to you
    const mailOptions = {
        from: email, // Sender address
        to: process.env.EMAIL_USER, // Your email address
        subject: `New Message from ${name}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Client Inquiry</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2c3e50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 30px;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .field-value {
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }
        .message {
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Client Inquiry</h1>
        </div>
        <div class="content">
            <div class="field">
                <div class="field-label">Name:</div>
                <div class="field-value">${name}</div>
            </div>
            <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">${email}</div>
            </div>
            <div class="field">
                <div class="field-label">Message:</div>
                <div class="field-value message">${message}</div>
            </div>
        </div>
    </div>
</body>
</html>`
    };

    // Email options for the thank-you email to the user
    const thankYouMailOptions = {
        from: process.env.EMAIL_USER, // Your email address
        to: email, // User's email address
        subject: "Thank You for Reaching Out",
        html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Inquiry</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2c3e50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 30px;
        }
        .signature {
            margin-top: 20px;
        }
        .contact-details {
            margin-top: 20px;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Thank You for Your Inquiry!</h2>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out. I've received your inquiry and will get back to you as soon as possible, typically within one business day.</p>
            <p>I look forward to discussing how I can assist you with your needs.</p>
            <div class="signature">
                Best regards,<br>
                Erick Opiyo Olando<br>
                Software developer/Meteorologist
            </div>
            <div class="contact-details">
                Nairobi, 30297-00100<br>
                Phone: <a href="tel:+254710897101">+254710897101</a><br />
Email: <a href="mailto:Olandoerick98@gmail.com">Olandoerick98@gmail.com</a><br />
Website: <a href="https://erickolando.up.railway.app" target="_blank" rel="noopener noreferrer">
  https://erickolando.up.railway.app
</a>

            </div>
        </div>
    </div>
</body>
</html>
  `
    };

    // Send the email to you
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ success: false, message: "Failed to send message." });
        }
        console.log("Email sent:", info.response);

        // Send the thank-you email to the user
        transporter.sendMail(thankYouMailOptions, (error, info) => {
            if (error) {
                console.error("Error sending thank-you email:", error);
                return res.status(500).json({ success: false, message: "Failed to send thank-you message." });
            }
            console.log("Thank-you email sent:", info.response);
            res.status(200).json({ success: true, message: "Message sent successfully!" });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
