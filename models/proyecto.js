var mongoose = require('mongoose');

var ProyectoSchema = new mongoose.Schema({
    titulo: String,
    tareas: { type : Array , "default" : [] }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema)