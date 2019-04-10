const express = require('express');
require('./db/mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());//parse incoming json to an object 

//listen for user creation request.
app.post('/users', (req, res)=> {
    const user = new User(req.body);
    user.save().then(()=>{
        res.send(user);
    }).catch((error)=>{
        res.status(400);
        res.send(error);
    });
})

//hand;er for user data request
app.get('/users', (req, res)=>{
    User.find({}).then((users)=>{
        res.send(users);
    }).catch((error)=>{
        res.status(500).send();
    });
});

app.get('/users/?:id', (req,res)=>{
    //req.params object has single property as id.
    const _id = req.params.id;//access id from url.
    User.findById(_id).then((user)=>{
        if(!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch((e)=>{
        res.status(500).send();
    });
})

//listen for task creation req.
app.post('/tasks', (req, res)=> {
    //create new task from upcoming data.
    const task = new Task(req.body);
    //save task to db.
    task.save().then(()=>{
        res.status(201).send(task);
    }).catch((error)=>{
        res.status(400).send(error);
    })

});

//fetch task.
app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((e)=>{
        res.send(e);
    })
})

//fetch a task of provided id.

app.get('/tasks/?:id',(req, res)=>{
    const _id = req.params.id;
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }).catch((e)=>{
        res.status(500).send();
    });
})

app.listen(port, ()=> {
    console.log('Server is up on port' + port);
})