const express = require('express');
const User = require('../models/User')
const authMiddleware = require('../middlewares/authMiddleware');
const router = new express.Router();

//listen for user creation request.
router.post('/users', async (req, res)=> {
    const user = new User(req.body);
    /*     user.save().then(()=>{
        res.status(201).send(user);
    }).catch((error)=>{
        res.status(400);
        res.send(error);
    }); */
    try {
      await user.save();
      //generate tokens.
      const token = await user.generateAuthToken();
      res.status(201).send({user, token});  
    }catch(e){
        res.status(400).send(e);
    }
    
})


//sign up router.

router.post('/users/login', async (req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        //generate jwt token
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch(e){
        res.status(400).send();
    }
});

//handle for user data request
router.get('/users', authMiddleware/*middleware*/,async (req, res)=>{//only runs when middleware calls the next function.
    try {
        const users = await User.find({});
        res.send(users);
    }catch(e) {
        res.status(500).send(e);
    }

/*     User.find({}).then((users)=>{
        res.send(users);
    }).catch((error)=>{
        res.status(500).send();
    }); */
});

//route for get req for user with id.
router.get('/users/?:id', async (req,res)=>{
    //req.params object has single property as id.
    const _id = req.params.id;//access id from url.
    try {
        const user = User.findById(_id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
/*     User.findById(_id).then((user)=>{
        if(!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch((e)=>{
        res.status(500).send();
    }); */
})

//delete a user of given id
router.delete('/users/:id', async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).send();
        }
        res.send(user)
    }catch(e){
        res.status(500).send();
    }
})

//patch: to update an existing request. (for user).

router.patch('/users/:id', async (req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidUpdateRequest = updates.every(update=> allowedUpdates.includes(update));

    if(!isValidUpdateRequest){
        return res.status(404).send('error: Invalid field reqest for update')
    }

    try {
        const user = await User.findById(req.params.id);
        updates.forEach(update=> user[update] =req.body[update]);
        await user.save();
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;