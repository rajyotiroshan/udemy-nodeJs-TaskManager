const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//Schema for User collection.
const userSchema = new mongoose.Schema( {
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
        unique: true,
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


//
userSchema.statics.findByCredentials = async (email, password)=> {
    const user = await User.findOne({email});

    if(!user) {
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

//hash the plain text password before saving.
//set the midlleware up.
userSchema.pre('save', async function(next){//need to be std function not arrow.
    //this refs to the doc being save.
    const user = this;

    if(user.isModified('password')) {//password field is modified.
        user.password = await bcrypt.hash(user.password,8);
    }
    console.log('just before saving');
    next();
})

//Create a User Model
const User = mongoose.model('User',userSchema);



module.exports = User;
