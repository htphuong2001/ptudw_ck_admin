require("dotenv").config();
const transporter = require("../config/transporter");

const sendPassword = async (emailrReceived, username, password) => {
  try {
    await transporter.sendMail({
      from: `${process.env.MAIL_USER}`,
      to: `${emailrReceived}`,
      subject: "Password for your account",
      html: `<div><b>This is your account</b><br/><span>Username: ${username}</span><br/><span>Password: ${password}</span></div>`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendPassword,
};
