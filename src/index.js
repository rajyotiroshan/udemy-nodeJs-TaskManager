const express = require('express');
require('./db/mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());//parse incoming json to an object 

//listen for user creation request.
app.post('/users', async (req, res)=> {
    const user = new User(req.body);
    /*     user.save().then(()=>{
        res.status(201).send(user);
    }).catch((error)=>{
        res.status(400);
        res.send(error);
    }); */
    try {
      await user.save();
      res.status(201).send(user);  
    }catch(e){
        res.status(400).send(e);
    }
    
})

//hand;er for user data request
app.get('/users', async (req, res)=>{

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

app.get('/users/?:id', async (req,res)=>{
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

//listen for task creation req.
app.post('/tasks', async  (req, res)=> {
    //create new task from upcoming data.

    const task = new Task(req.body);
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
app.get('/tasks',async (req,res)=>{
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

app.get('/tasks/?:id', async (req, res)=>{
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

app.listen(port, ()=> {
    console.log('Server is up on port' + port);
})