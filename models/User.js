const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
//var passportLocalMongoose = require('passport-local-mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const Schema = mongoose.Schema;

const userSchema = new Schema({
  code: {
    type:String,
    required: [true, "code es un campo requerido."]
  },
  name: {
    type: String,
    required: [true, "Nombre es un campo requerido."]
  },
  lastname: {
    type: String,
    required: [true, "Apellido es un campo requerido."]
  },
  email: {
    type: String,
    required: [true, "Email es un campo requerido."],
    unique: [true, "El Email se encuentra en uso."],
    validate: [validateEmail, 'Por favor ingrese un email valido.']
  },
  password: {
    type: String,
    required: [true, "Password es un campo requerido."]
  },
  status : {
     type: Boolean,
     default: false
  }
}, { 
    timeStamps: true,
    createdAt: true 
    });

//validación de campos
userSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único. " });

//Generamos hash de la contraseña
userSchema.methods.hashPassword = (password)=> {
  return bcrypt.hashSync(password, 10);
}

//Verificamos contraseña
userSchema.methods.comparePassword = (password,hash)=>{
  return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model("User", userSchema);