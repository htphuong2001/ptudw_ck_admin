require("dotenv").config();
const transporter = require("../config/transporter");

const btnStyle =
  "background: coral; padding: 8px 16px; color: #fff; text-decoration: none; line-height: 40px; height: 40px; display: inline-block;";

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

const sendLinkResetPassword = async (emailrReceived, link) => {
  try {
    await transporter.sendMail({
      from: `${process.env.MAIL_USER}`,
      to: `${emailrReceived}`,
      subject: "Code for reset password",
      html: `<div><p>Click button to reset password</p> <a href="${link}" style="${btnStyle}">Reset password</a></div>`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendPassword,
  sendLinkResetPassword,
};
