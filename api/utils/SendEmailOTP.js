import sendgridmail from "@sendgrid/mail";

const SendEmailOTP = async (message, toEmail) => {
  sendgridmail.setApiKey(process.env.SENDGRID_EMAIL_SENDING_API_KEY);

  const emailMessage = {
    to: toEmail,
    from: {
      name: "Real Candid Feedback Admin App",
      email: process.env.SENDGRID_VERIFIED_ACCOUNT_EMAIL,
    },
    subject: "Email Verification / Password Recovery OTP",
    text: `${message}`,
    html: `<p>${message}</p>`,
  };

  await sendgridmail.send(emailMessage);
};

export default SendEmailOTP;
