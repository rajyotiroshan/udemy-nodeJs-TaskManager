const mongoose = require('mongoose');
const validator = require('validator');

//connect to the db by passing URL(mongodb://127.0.0.1:27017) and databse name(task-manager-api)
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
    
})
/* 
//Create a User Model.

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email not valid");
            }
        }
        
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('age must be a positive number.');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('password must not include password');
            }
        }
    }
});

//Create an instance or field.
const user = new User({
    name: 'Arjun',
    email: 'arjun@gmail.com',
    password: '   mvnrinrnr123 '
});

//save rajan into the database.
user.save().then((inserted) => {
    console.log(inserted)
}).catch((error) => {
    console.log("Error", error);
})
 */
//Challenges.

// 1. Create a model for task.

const Task = mongoose.model('Task', {
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
}); 

/**
 * Data Validation And Data sanitization.
 */

