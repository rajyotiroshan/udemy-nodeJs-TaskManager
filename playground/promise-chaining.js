require('../src/db/mongoose');
const User = require('../src/models/User');

//5cade43fc3cb940c78f81716

User.findByIdAndUpdate('5cade43fc3cb940c78f81716', {age: 1}).then((user)=>{
    console.log(user);
    return User.countDocuments({age:1});
}).then((res)=>{
    console.log(res);
}).catch((e)=>{
    console.log(e);
})