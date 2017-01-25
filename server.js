// BASE SETUP
// =============================================================================
var mongoose   = require('mongoose');
mongoose.connect('mongodb://daw:daw@ds019746.mlab.com:19746/dashboard'); 
var Tarea     = require('./models/tarea');
var Proyecto     = require('./models/proyecto');
var Usuario     = require('./models/usuario');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/tareas')

    // create a tarea (accessed at POST http://localhost:8080/api/tareas)
    .post(function(req, res) {
        
        var tarea = new Tarea();      // create a new instance of the tarea model
        // tarea.titulo = req.body.name;  // set the tareas name (comes from the request)
        tarea.titulo = req.body.titulo;  // set the tareas name (comes from the request)
        tarea.descripcion = req.body.descripcion;  // set the tareas name (comes from the request)
        tarea.responsable = req.body.responsable;  // set the tareas name (comes from the request)
        tarea.estado = req.body.estado;  // set the tareas name (comes from the request)

        // save the tarea and check for errors
        tarea.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'tarea created!' });
        });
        
    })

    .get(function(req, res) {
        Tarea.find(function(err, tareas) {
            if (err)
                res.send(err);

            res.json(tareas);
        });
    });


router.route('/tareas/:tarea_id')

    .get(function(req, res) {
        Tarea.findById(req.params.tarea_id, function(err, tarea) {
            if (err)
                res.send(err);
            res.json(tarea);
        });
    })

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Tarea.findById(req.params.tarea_id, function(err, tarea) {

            if (err)
                res.send(err);

            tarea.titulo = req.body.titulo;  // set the tareas name (comes from the request)
            tarea.descripcion = req.body.descripcion;  // set the tareas name (comes from the request)
            tarea.responsable = req.body.responsable;  // set the tareas name (comes from the request)
            tarea.estado = req.body.estado;  // set the tareas name (comes from the request)


            // save the bear
            tarea.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Tarea updated!' });
            });

        });
    })

    .delete(function(req, res) {
        Tarea.remove({
            _id: req.params.tarea_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



router.route('/proyectos')

    .get(function(req, res) {
        Proyecto.find(function(err, proyectos) {
            if (err)
                res.send(err);

            res.json(proyectos);
        });
    });


router.route('/proyectos/:proyecto_id')

    .get(function(req, res) {
        Proyecto.findById(req.params.proyecto_id, function(err, proyecto) {
            if (err)
                res.send(err);
            res.json(proyecto);
        });
    });


router.route('/usuarios')

    .get(function(req, res) {
        Usuario.find(function(err, usuarios) {
            if (err)
                res.send(err);

            res.json(usuarios);
        });
    });

router.route('/usuarios/:usuario_id')

    .get(function(req, res) {
        Usuario.findById(req.params.usuario_id, function(err, usuario) {
            if (err)
                res.send(err);
            res.json(usuario);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);