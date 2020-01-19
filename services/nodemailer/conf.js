require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_NODEMAILER,
      pass: process.env.PASSWORD_NODEMAILER
    }
  });

  /* Linea para validar la configuración del email
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  */
  module.exports = transporter;