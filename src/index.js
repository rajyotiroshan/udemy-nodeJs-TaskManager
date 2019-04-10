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


app.listen(port, ()=> {
    console.log('Server is up on port' + port);
})