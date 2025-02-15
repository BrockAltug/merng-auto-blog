const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail or any other SMTP provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // App-specific password
  },
});

const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email - Registration',
    text: `Your verification code is: ${verificationCode}. Enter this code to verify your email.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent successfully!');
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
  }
};

module.exports = sendVerificationEmail;