const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const UserModelo = require('../models/user');
const { isAuthenticated } = require('../helpers/auth');

router.get('/task/add', isAuthenticated, (req, res) => {
    res.render('task/new-task');
})

router.post('/task/new-task', isAuthenticated, async (req, res) => {
    const { title, description, user_id } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Por favor ingrese el titulo de la tarea' })
    }
    if (!description) {
        errors.push({ text: 'Por favor ingrese la descripcion' });
    }
    if (!user_id) {
        errors.push({ text: 'Por favor ingrese el usuario a asignar tarea' });
    }
    if (errors.length > 0) {
        res.render('task/new-task', {
            errors,
            title,
            description
        });
    } else {
        console.log("Titulo");
        console.log(title);
        console.log("Descripcion");
        console.log(description);
        console.log("Usuario");
        console.log(user_id);

        const newTask = new Task({ title, description, user_id: user_id  });
        await newTask.save();
        console.log("Nueva tarea agregada:")
        console.log(newTask);

        for (let index = 0; index < user_id.length; index++) {
            const updateUser = await UserModelo.update({ cedula: user_id[index] },  {$push:{ task_id: newTask._id } } );
            console.log(updateUser);
        }




        req.flash('success_msg', 'Tarea agregada satisfactoriamente');
        res.redirect('/task');
    }
});

router.get('/task', isAuthenticated, async(req,res ) => {
    const arrayTask = await Task.find();
});
router.get('/task', isAuthenticated, async (req, res) => {
    console.log("Hola estas son las tareas");
    const task = await Task.find().sort({ date: 'desc' });
    res.render('task/all-task', { task });
});


module.exports = router;