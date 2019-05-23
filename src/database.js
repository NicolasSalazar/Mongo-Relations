const mongoose = require('mongoose');

const connecti = mongoose.connect('mongodb://localhost/notes-db-app',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db=> console.log('DB is coneccted'))
    .catch(err => console.error(err));
    
