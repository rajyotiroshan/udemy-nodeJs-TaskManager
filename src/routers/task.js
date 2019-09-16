const express = require('express');
const Task   = require('../models/Task');
const authMiddleware = require('../middlewares/authMiddleware');
const router = new express.Router();



//listen for task creation req.
router.post('/tasks', authMiddleware, async  (req, res)=> {
    //create new task from upcoming data.
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
       await task.save(); 
       res.status(201).send(task);
    }catch(e){
        res.status(400).send(error);
    }
    
/*     const task = new Task(req.body);
    //save task to db.
    task.save().then(()=>{
        res.status(201).send(task);
    }).catch((error)=>{
        res.status(400).send(error);
    }) */

});

//fetch task.
router.get('/tasks',async (req,res)=>{
    try {
        const tasks = await Task.find({});
        res.send(tasks)
    }catch(e){
        res.send(e);
    }

/*     Task.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((e)=>{
        res.send(e);
    }) */
})

//fetch a task of provided id.

router.get('/tasks/?:id', async (req, res)=>{
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }

/*     Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }).catch((e)=>{
        res.status(500).send();
    }); */
})



//update an existing task field.

router.patch('/tasks/:id', async (req, res)=>{
    const allowedUpdates = ['description', 'completed'];
    const reqUpdates = Object.keys(req.body);
    const isValidReqForUpdate = reqUpdates.every(update => allowedUpdates.includes(update));
    
    if(!isValidReqForUpdate){
        return res.status(400).send('error: invalid field request for update');
    }

    try {
        const task = await Task.findById(req.params.id);
        reqUpdates.forEach(update=> task[update] = req.body[update]);
        await task.save();
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!task) {
            res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(400).send(e);
    }

});

//delete an existing task of given id.

router.delete('/tasks/:id', async (req, res)=>{
    try {
     const task = await Task.findByIdAndDelete(req.params.id);
     if(!task) {
         return res.status(404).send('error: not found');
     }
     res.send(task);        
    }catch(e){
        res.status(500).send();
    }

})

module.exports = router;