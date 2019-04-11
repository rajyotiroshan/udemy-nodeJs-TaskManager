const express = require('express');
require('./db/mongoose');
const User = require('./models/User');
const Task = require('./models/Task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());//parse incoming json to an object 
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=> {
    console.log('Server is up on port' + port);
})