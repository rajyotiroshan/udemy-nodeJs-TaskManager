const express = require('express');
const User = require('../models/User')
const authMiddleware = require('../middlewares/authMiddleware');
const router = new express.Router();
const multer = require('multer');

//configure multer
let upload = multer({
    dest:'avatars'
})

//listen for user creation request.
router.post('/users',async (req, res)=> {
    const user = new User(req.body);
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

router.post('/users/logout', authMiddleware , async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
});

router.post('/users/logoutAll', authMiddleware, async (req, res)=>{
   
    try{
            req.user.tokens = [];
            await req.user.save();
    }catch(e){
        res.status(500).send();
    }
})

//handle for user data request
router.get('/users/me', authMiddleware/*middleware*/,async (req, res)=>{//only runs when middleware calls the next function.
    res.send(req.user);
});


//delete a user of given id
router.delete('/users/me', authMiddleware ,async (req, res)=>{
    try {
        await req.user.remove();
        res.send(req.user)
    }catch(e){
        res.status(500).send();
    }
})

//patch: to update an existing request. (for user).

router.patch('/users/me',authMiddleware, async (req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidUpdateRequest = updates.every(update=> allowedUpdates.includes(update));

    if(!isValidUpdateRequest){
        return res.status(404).send('error: Invalid field reqest for update')
    }

    try {
        updates.forEach(update=> req.user[update] =req.body[update]);
        await req.user.save();
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});
        res.send(req.user);
    }catch(e){
        res.status(400).send(e);
    }
})

/**
 * @routes POST /users/me/avatar
 * @description let user upload profile picture
 */

 router.post('/users/me/avatar',upload.single('avatar'), (req, res)=>{
     res.status(200).send('upoaded');
 })

module.exports = router;