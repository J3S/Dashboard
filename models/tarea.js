var mongoose = require('mongoose');

var TareaSchema = new mongoose.Schema({
	titulo: String,
	descripcion: String,
	responsable: String,
	estado: Number
});

module.exports = mongoose.model('Tarea', TareaSchema)