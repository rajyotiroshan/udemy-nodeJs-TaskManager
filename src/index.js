const express = require('express');
require('./db/mongoose');//connect to the db(task-manager-api)
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;


const multer = require('multer');

//config to upload
upload = multer({
    dest: 'images',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        //name of the file upload
        //to find out the extension
        if (!file.originalname.match(/\.(doc|docx)$/)) {
          return cb(new Error('Please upload a word document(.doc or docx)'));
        }

        cb(undefined, true);

        
/*         //error
        cb(new Error('File must be pdf'))
        //successfully uploaded
        cb(undefined, true);
        //reject the upload
        cb(undefined, false); */
    }
})
app.post('/upload', upload.single('upload'), (req, res)=>{
    res.send({"msg": "uploaded"});
})

// router.
app.use(express.json());//parse incoming req as a json and store it in req.body field
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=> {
    console.log('Server is up on port' + port);
})

