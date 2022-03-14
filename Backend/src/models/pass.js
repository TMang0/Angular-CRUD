const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

let Pass = new Schema({
  url: String,
  email: String,
  password: String,
  fecha:String,
  detalles: String
});

module.exports = mongoose.model("CRUDContraseña", Pass);