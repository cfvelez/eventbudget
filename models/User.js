const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

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
    type: String
  },
  status : {
     type: Boolean,
     default: false
  },
  provider :{
    type:String,
    enum:{
        values:['I','G','F'],
        message: "{VALUE} no es un estado valido"
    },
    default: 'I'  
  },
  createdAt:{
    type:Date,
        default: Date.now()
  }
});

userSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico. " });

module.exports = mongoose.model("User", userSchema);