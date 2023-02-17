import sendgridmail from "@sendgrid/mail";

const SendEmailOTP = async (otp, email) => {
  sendgridmail.setApiKey(process.env.EMAIL_SENDING_API_KEY);

  const emailMessage = {
    to: `${email}`,
    from: {
      name: "Real Candid Feedback Admin App",
      email: "thetechdope.in@gmail.com",
    },
    subject: "Email Verfication OTP",
    text: `Your Email Verfication OTP is - ${otp}.\nPlease verify your email quickly.`,
    html: `<p>Your Email Verfication OTP is - ${otp}.\nPlease verify your email quickly.</p>`,
  };

  await sendgridmail.send(emailMessage);
};

export default SendEmailOTP;
