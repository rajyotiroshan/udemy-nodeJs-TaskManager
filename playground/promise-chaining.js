require('../src/db/mongoose');
const User = require('../src/models/User');

//5cade43fc3cb940c78f81716

/* User.findByIdAndUpdate('5cade43fc3cb940c78f81716', {age: 1}).then((user)=>{
    console.log(user);
    return User.countDocuments({age:1});
}).then((res)=>{
    console.log(res);
}).catch((e)=>{
    console.log(e);
})
 */
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count;
}

updateAgeAndCount('5cade43fc3cb940c78f81716',2).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})