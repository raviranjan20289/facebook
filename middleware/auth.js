const jwt = require('jsonwebtoken');
// const User = require('../models/user')


exports.authMiddleware= async (req, res, next) =>{


    try{
        console.log("hii");
  
         let token = req.cookies.jwt;

    console.log(token);
   //   if(token || Object.keys(req.params).length === 1){
      if (token) {
   
     console.log("neeewww");
        let user = jwt.verify(token, process.env.Secret_Key);
      //   console.log(user.id)
      //   if(Object.keys(req.params).length === 1)  {
                        // console.log("ankit")
            //   let token1 = jwt.sign({id: req.params.id}, process.env.Secret_Key);
            //   let user1 = jwt.verify(token1, process.env.Secret_Key)
            //   console.log(user1)

            // if(req.params.id !==user.id){
            //    return res.status(401).json({message: "unauthorized user"})
            // }
        req.userId = user.id ;
   //  }else{
   //      return res.status(401).json({message: "unauthorized user"})
   //   }

     }
     return next();
    
   }catch(error){
      console.log(error);
     return res.status(401).json({message: "anuthorized user"})
    }
   }
