import sendgridmail from "@sendgrid/mail";

const SendEmailOTP = async (message) => {
  // sendgridmail.setApiKey(process.env.EMAIL_SENDING_API_KEY);
  sendgridmail.setApiKey("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");
 
  const emailMessage = {
    to: "manisharmore1299@gmail.com",
    from: {
      name: "Real Candid Feedback Admin App",
      email: "manishamore1299@gmail.com",
    },
    subject: "Email Verification OTP",
    text: `${message}`,
    html: `<p>${message}</p>`,
  };

  await sendgridmail.send(emailMessage);
};

export default SendEmailOTP;
