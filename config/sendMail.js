const nodeMailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

let mailTransporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASS,
  },
});

const sendMail = async (email, url) => {
  const templatePath = path.join(__dirname, "../Views/ConfirmEmail.ejs");
  console.log(email);
  const data = await ejs.renderFile(templatePath, {
    email,
    url,
  });
  try {
    await mailTransporter.sendMail({
      from: `"Magic Link" ${process.env.SENDER_EMAIL}`,
      to: email,
      subject: "Log in to Project",

      html: data,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
