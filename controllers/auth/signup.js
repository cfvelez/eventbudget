const User = require("../../models/User");
const uuid = require("uuid/v1");
//const mail = require('../../services/nodemailer');

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
    const user = new User();
    const hashPass = user.hashPaswword(password);
    const confirmationCode = uuid();
    
    //Asignamos los campos al objeto User
    user.code = confirmationCode;
    user.password = hashPass;
    user.email = email;
    user.name = name;
    user.lastname = lastname;

    let userDB = await user.save();

    if (!userDB)
      res.status(500).json({ error: "Error creando usuario."});

    //se activa en entorno de producciòn
    //const response =  mail.sendConfirmSignUp(user.email, user.name + ' '+ user.lastname,confirmationCode);

    res.status(200).json({ user, response });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
