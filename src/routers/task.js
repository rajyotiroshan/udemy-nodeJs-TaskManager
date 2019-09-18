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

});

/**
 * @routes GET /tasks?completed=false/true
 * @description returns all tasks for a user
 * @access private
 * 
 */
router.get('/tasks', authMiddleware,async (req,res)=>{
    try {
        //const tasks = await Task.find({owner: req.user._id});
        const match  = {};
        if(req.query.completed){
            match.completed = req.query.completed === 'true';
        }
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate();
        res.send(req.user.tasks);
    }catch(e){
        res.send(e);
    }

/*     Task.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((e)=>{
        res.send(e);
    }) */
})

/**
 * @routes /tasks/:task_id
 * @description GET a task by it's id
 */

router.get('/tasks/:task_id',authMiddleware ,async (req, res)=>{
    const task_id = req.params.task_id;
    try{
        const task = await Task.findOne({task_id, owner: req.user._id})
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }

})



/**
 * @route /tasks/:task_id
 * @description Update a task 
 */

router.patch('/tasks/:task_id', authMiddleware, async (req, res)=>{
    const allowedUpdates = ['description', 'completed'];
    const reqUpdates = Object.keys(req.body);
    const isValidReqForUpdate = reqUpdates.every(update => allowedUpdates.includes(update));
    
    if(!isValidReqForUpdate){
        return res.status(400).send('error: invalid field request for update');
    }

    try {
        const task = await Task.findOne({_id: req.params.task_id, owner: req.user._id});
        if(!task) {
            res.status(404).send({"msg":"task not found"});
        }        
        
        reqUpdates.forEach(update=> task[update] = req.body[update]);
        await task.save();
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.send(task);
    }catch(e){
        res.status(400).send(e);
    }

});

/**
 * @route DELETE a task 
 * @access Private
 * @description Delete a task with id
 */

router.delete('/tasks/:task_id', authMiddleware, async (req, res)=>{
    try {
     const task = await Task.findOneAndDelete({_id: req.params.task_id, owner: req.user._id });
     if(!task) {
         return res.status(404).send('error: Task not found');
     }
     res.send(task);        
    }catch(e){
        res.status(500).send();
    }

})

module.exports = router;