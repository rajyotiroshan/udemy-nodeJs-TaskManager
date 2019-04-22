const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req,res,next)=>{
    try {
        console.log(req.header('Authorization'));
        const token = req.header('Authorization').replace('Bearer ', '');
        //console.log(token);
        const decoded = jwt.verify(token, 'thisismynewcourse');
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token});

        if(!user) {
            throw new Error("");
        }

        req.token = token;
        //store user to req will be access by route handler.
        req.user = user;

        next();
    }catch(e){
        res.status(401).send("error: Invalid credentials.");
    }
}

module.exports = authMiddleware;