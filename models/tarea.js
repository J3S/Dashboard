var mongoose = require('mongoose');

var tareaSchema = new mongoose.Schema({
	titulo: String,
	descripcion: String,
	responsable: String,
	estado: Number
});

mongoose.model('Tarea', tareaSchema)