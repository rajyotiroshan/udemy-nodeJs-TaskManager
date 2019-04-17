const express = require('express');
require('./db/mongoose');//connect to the db(task-manager-api)
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

//middlewares.
/* app.use((req,res,next)=>{
    //console.log(req.method,req.path);
    //call next in chain.
    if(req.method === 'GET'){
        res.send('GET ')
    }else {
        next();//handle next route handler.//done with middleware.
    }
   
}); */

//Challenge
/***middleware for maintenance mode. */
/* app.use((req,res,next)=>{
    res.status(503).send('Site is under maintenance.')
}); */

// router.
app.use(express.json());//parse incoming json to an object 
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=> {
    console.log('Server is up on port' + port);
})
/* 
const bcrypt = require('bcryptjs');

const myFunction = async ()=>{
    const password = 'rajan@123';
    const hashPassword = await bcrypt.hash(password, 8);

    console.log(password);
    console.log(hashPassword);

    const isMatch = await bcrypt.compare('Rajan@123', hashPassword);
    console.log(isMatch);
}

myFunction() */


const jwt = require('jsonwebtoken');

const myFunction = async ()=>{
    const token = jwt.sign({_id:'abc123'}, 'thisismynewcourse', {expiresIn:'7 seconds'});
    console.log(token);

    const data = jwt.verify(token,'thisismynewcourse' );
    console.log(data);
}

myFunction();
