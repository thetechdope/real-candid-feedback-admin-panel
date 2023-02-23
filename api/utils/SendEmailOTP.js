import sendgridmail from "@sendgrid/mail";

const SendEmailOTP = async (message, email) => {
  sendgridmail.setApiKey(process.env.EMAIL_SENDING_API_KEY);

  const emailMessage = {
    to: `${email}`,
    from: {
      name: "Real Candid Feedback Admin App",
      email: "thetechdope.in@gmail.com",
    },
    subject: "Email Verfication OTP",
    text: `${message}`,
    html: `<p>${message}</p>`,
  };

  await sendgridmail.send(emailMessage);
};

export default SendEmailOTP;
