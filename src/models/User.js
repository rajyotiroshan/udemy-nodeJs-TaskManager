const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = User;
