const transporter = require('./conf');
const emailConfirmSignUpTemplate = require("./templates/signup");

module.exports = {
        sendConfirmSignUp: async (to,name, confirmationCode) => {
            var to = 'cfvelez9@gmail.com';
            try{
                await transporter.sendMail({
                from: process.env.USER_NODEMAILER,
                to: to,
                subject: "Confirmación de email",
                text:"Pincha Clic sobre la siguiente url para confirmar tu registro.",
                html: emailConfirmSignUpTemplate({ name, confirmationCode })
                });
            }catch(error){
                console.log(error);
            }
            }
        };