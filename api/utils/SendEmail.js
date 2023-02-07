import nodemailer from "nodemailer";

const SendEmail = async (otp, email) => {
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "alford.lubowitz@ethereal.email",
      pass: "28gV2v6DUzQN9HFp5u",
    },
  });

  const message = {
    from: "alford.lubowitz@ethereal.email",
    to: "thetechdope.trainings@gmail.com",
    subject: "Email Verfication OTP",
    text: `Your OTP is ${otp}`,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return nodemailer.getTestMessageUrl(info);
  });
};

export default SendEmail;
