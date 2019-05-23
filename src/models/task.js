const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskScheme = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    idTask: {type: Number},
    user_id: { type: [Number], required: true }
})


module.exports = mongoose.model('Task', taskScheme);