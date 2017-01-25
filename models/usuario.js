var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
    nombre: String,
});

module.exports = mongoose.model('Usuario', UsuarioSchema)