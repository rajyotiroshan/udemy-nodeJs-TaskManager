require('../src/db/mongoose');
const Task = require('../src/models/Task');

//insert 
/* Task.create([{
    "description":"library 4/10 5 10",
    "completed": true
},{
    "description":"library 4/11 7 12",
    "completed": false
},{
    "description":"library 4/11 5 10",
    "completed": false
}]); */

//remove task with given id.
/* Task.findByIdAndDelete('5cadf4ffce7e1b0a280dc579').then((task)=>{
    console.log(task);
    return  Task.countDocuments({completed: false});
}).then((res)=>{
    console.log(res);
}).catch((e)=>{
    console.log(e);
})
 */
//chalenges.

const deleteTaskAndCount = async (id)=>{
    await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: true});
    return count;
}
deleteTaskAndCount('5cacad10b5110213ac02078b').then((count)=>{
    console.log(count);
}) ;