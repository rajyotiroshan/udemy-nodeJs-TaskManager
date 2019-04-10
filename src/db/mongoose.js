const mongoose = require('mongoose');

//connect to the db by passing URL(mongodb://127.0.0.1:27017) and databse name(task-manager-api)
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true   
})


