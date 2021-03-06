const Tarea = require('../Models/Tarea');

const Proyecto = require('../Models/Proyecto');

const { validationResult } = require('express-validator');

// Crea una nueva tarea 


exports.crearTarea = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() })
    }

    try {
        // Extraer proyecto y comprobar si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        // Revisa si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }
        // Crear la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un fuck error!')
    }

}

// Obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    // Extraemos el proyecto
    try {
        const { proyecto } = req.query;

        // Extraer el proyecto y comprobar si existe
        const existeProyecto = await Proyecto.findById(proyecto)
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no Encontrado' });
        }
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No Autorizado' })
        }
        // Obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
        res.json({ tareas })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un got damm error!');
    }
}

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;

        // Revisar si el tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }

        // Extraer proyecto

        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'Usuario NO Autorizado' })
        }


        // Crear un objeto con la nueva información
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;


        // Guardar la tarea

        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea,
            {
                new: true
            });
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un ...Error');
    }
}

// Elimina una tarea
exports.eliminarTarea = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;

        // Revisar si el tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }

        // Extraer proyecto

        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'Usuario NO Autorizado' })
        }

        // Eliminar 
        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea Eliminada...!' });


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un ...Error');
    }
}   
