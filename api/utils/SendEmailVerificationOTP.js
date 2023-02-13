import sendgridmail from "@sendgrid/mail";

const SendEmailVerificationOTP = async (otp, email) => {
  // Getting API Key from .env file
  sendgridmail.setApiKey(process.env.EMAIL_SENDING_API_KEY);

  const message = {
    to: `${email}`,
    from: {
      name: "Real Candid Feedback Admin App",
      email: "thetechdope.in@gmail.com",
    },
    subject: "Email Verfication OTP",
    text: `Your Email Verfication OTP is - ${otp}.\nPlease verify your email quickly.`,
    html: `<h3>Your Email Verfication OTP is - ${otp}.\nPlease verify your email quickly.</h3>`,
  };

  sendgridmail
    .send(message)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err.message));
};

export default SendEmailVerificationOTP;
