import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendLoginEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "New Login Detected - Raksha App",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #9333ea; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Raksha Alerts</h1>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #333333; margin-top: 0;">Hello ${name},</h2>
            <p style="color: #555555; line-height: 1.6;">
              We detected a new login to your Raksha account on <strong>${new Date().toLocaleString()}</strong>.
            </p>
            <p style="color: #555555; line-height: 1.6;">
              If this was you, no further action is required. If you did not authorize this login, please contact support immediately or change your password.
            </p>
            <div style="margin-top: 30px; padding: 15px; background-color: #fca5a5; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #991b1b; font-weight: bold;">
                For emergencies, use the Raksha SOS feature.
              </p>
            </div>
          </div>
          <div style="background-color: #f9fafb; padding: 15px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              &copy; ${new Date().getFullYear()} Raksha App. All rights reserved.
            </p>
          </div>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
