const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task  = require('./Task');

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
    },
    tokens:[{/*array of object*//* always with single field token and required*/
        token:{
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});


//virtual data/attribute
//relationship betweeen two entities.
//not actual data stored in the collection database
//<name for virtula field>
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//before sending user as a response 
//res.send()=>user.toStringify()=>user.toJSON()=> and then send
//the user back as a json response.
//hence no  need to call toJSON explicitely 
//but below method get called before sending res. 
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject  = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}


/**
 * 
 */
/* userSchema.methods.getPublicProfile = function() {
    const user = this;
    const userObject=user.toObject();
    delete userObject.password
    delete userObject.tokens
    return userObject;
}  */
//find a user from usermodel using email and password.
// and return the user if found else log an error
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

//generate jwt token

userSchema.methods.generateAuthToken = async function(){
    const user = this;//ref to current user.
    const token = jwt.sign({_id: user._id.toString()},'thisismynewcourse' )
    //add token to tokens.
    user.tokens = user.tokens.concat({token});
    //save user to the db.
    await user.save();
    return token;
}

//hash the plain text password before saving.
//set the midlleware up.
userSchema.pre('save', async function(next){//need to be std function not arrow.
    //this refs to the doc being save.
    const user = this;

    if(user.isModified('password')) {//password field is modified.
        user.password = await bcrypt.hash(user.password,8);
    }
    //console.log('just before saving');
    next();
})

//Delete user task when user is removed
userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({ owner: user._id});
    next();

})
//Create a User Model
const User = mongoose.model('User',userSchema);



module.exports = User;
