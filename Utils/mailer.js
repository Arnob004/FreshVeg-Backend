import nodemailer from "nodemailer";

export const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true, // SSL ব্যবহার করলে এটা দিতে হয়
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("✅ Backend OTP sent: " + otp);

    const mailOptions = {
      from: '"Arnob Pandit 👨‍💻" <arnobpandit2023@gmail.com>',
      to: email,
      subject: "🔐 Your OTP for Password Reset",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Forgot your password?</h2>
          <p>Your OTP code is:</p>
          <h1 style="color: #007BFF;">${otp}</h1>
          <p>This code will expire in <strong>10 minutes</strong>.</p>
          <br/>
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("❌ Failed to send OTP:", error.message);
    throw new Error("Email sending failed");
  }
};
