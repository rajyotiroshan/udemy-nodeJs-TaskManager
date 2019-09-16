// Create a model for task.
const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        completed: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

module.exports = Task;

