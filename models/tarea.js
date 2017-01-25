var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TareaSchema   = new Schema({
        titulo: String,
    descripcion: String,
    responsable: Number,
    estado: Number
});

module.exports = mongoose.model('Tarea', TareaSchema);