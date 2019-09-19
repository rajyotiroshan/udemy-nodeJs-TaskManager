const express = require('express');
const sharp = require('sharp');
const User = require('../models/User')
const authMiddleware = require('../middlewares/authMiddleware');
const router = new express.Router();
const multer = require('multer');



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
 * @access Private
 */

 //configure multer
let upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        //validate file type
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('Upload a .jpg or .jpeg file '));
        }
        //successfully uploaded
        cb(undefined, true);
    }
})
 router.post('/users/me/avatar',authMiddleware, upload.single('avatar'), async (req, res)=>{
    //req.user.avatar = req.file.buffer;
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.status(200).send({"msg":"successfully uploaded"});
 }, (error, req, res, next)=>{
     res.status(401).send({error: error.message});
 })

 /**
  * @routes DELETE /users/me/avatar
  * @descripiton DELETE profile pics
  * @access Private
  */

  router.delete('/users/me/avatar', authMiddleware, async(req, res)=>{
    try {
        req.user.avatar = undefined;
        await req.user.save();
    } catch (error) {
        res.status(401).send({msg:"error in deleting"});
    }  
    res.status(200).send({msg:"deleted"});
    
  })

  /**
   * @routes GET /users/:user_id/avatar
   * @description 
   * @access Private
   */

   router.get('/users/:id/avatar', async (req, res)=>{
       try {
           const user = await User.findById(req.params.id);
           if(!user || !user.avatar){
               throw new Error()
           }
           res.set('Content-Type','image/png');
           res.send(user.avatar);
       } catch (error) {
           res.status(404).send();
       }
   })

module.exports = router;