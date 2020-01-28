const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const uuid = require("uuid/v1");
const mail = require('../../services/nodemailer');

module.exports = async (req, res) => {
  const { password, email, name,lastname } = req.body;

  if (password.length < 5){
    return res.status(404).json({ message: "Contraseña insegura." });
  }

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(409).json({ error: "El usuario ya existe" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error" });
  }

  try {
    console.log("Creando usuario");
    const hashPass = bcrypt.hashSync(password, 10);

    const confirmationCode = uuid();

    const user = new User({
        code:confirmationCode,
        password: hashPass,
        email,
        name,
        lastname
    });

    let userDB = await user.save();

    if (!userDB)
      res.status(500).json({ error: "Error creando usuario."});

    //se activa en entorno de producciòn
    //const response =  mail.sendConfirmSignUp(user.email, user.name + ' '+ user.lastname,confirmationCode);

    res.status(200).json({ user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
