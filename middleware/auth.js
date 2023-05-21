const jwt = require('jsonwebtoken');
// const User = require('../models/user')


exports.authMiddleware= async (req, res, next) =>{


    try{
        console.log("hii");
     let token = req.cookies.jwt;

    console.log(token);
     if(token){
   
     console.log("neeewww");
        let user = jwt.verify(token, 'secret_key');
        req.userId = user.id ;
     }else{
        return res.status(401).json({message: "unauthorized user"})
     }

     return next();
    
    }catch(error){
      console.log(error);
     return res.status(401).json({message: "anuthorized user"})
    }
}