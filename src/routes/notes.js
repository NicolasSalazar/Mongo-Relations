const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req,res) =>{
    res.render('notes/new-note');
})

router.post('/notes/new-note',isAuthenticated, async (req, res) =>{
    const  {title, description} = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Por favor ingrese el titulo de la nota'})
    }
    if(!description){
        errors.push({text: 'Por favor ingrese la descripcion'});
    }
    if(errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }else{
       const newNote= new Note({title, description});
       newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg','Nota agregada satisfactoriamente');
       res.redirect('/notes')
    }
});

router.get('/notes', isAuthenticated, async (req, res)=>{
    const notes = await Note.find({user: req.user.id}).sort({date:'desc'});
    res.render('notes/all-notes',{notes});
    console.log(notes);
});
router.get('/notes/edit/:id', isAuthenticated, async (req,res)=>{
    const notes = await Note.findById(req.params.id);  
    res.render('notes/edit-note', {notes});
}); 

router.put('/notes/edit-note/:id',  isAuthenticated, async (req,res)=>{
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description});
    req.flash('success_msg', 'Nota actualizada satisfacoriamente');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id',isAuthenticated, async(req, res)=>{
    await Note.findByIdAndRemove(req.params.id);
        req.flash('success_msg', 'Nota eliminada satisfacoriamente');
        res.redirect('/notes');
} );

module.exports = router;