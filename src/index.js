const express = require('express');
require('./db/mongoose');//connect to the db(task-manager-api)
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// router.
app.use(express.json());//parse incoming req as a json and store it in req.body field
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=> {
    console.log('Server is up on port' + port);
})

