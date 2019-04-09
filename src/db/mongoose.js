const mongoose = require('mongoose');

//connect to the db by passing URL(mongodb://127.0.0.1:27017) and databse name(task-manager-api)
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
    
})

//Challenges.

// 1. Create a model for task.

/* const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,

    },
    completed: {
        type: Boolean,
        completed: true
    }
});

//2. create an instance.
const task = new Task({
    description: 'Eat Lunch'
});

//3. save into the databse.

task.save().then((insertedTask)=>{
    console.log(insertedTask);
}).catch((error)=>{
    console.log("Error::", error);
});  */

/**
 * Data Validation And Data sanitization.
 */

