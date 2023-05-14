
const User = require('../models/user');
const postRegister = async (req, res) =>{
    try{
        
        const registerEmployee = new User({
            name:req.body.name,
           
            email :req.body.email,
            password :req.body.password,
            
        })   

        const registered =await registerEmployee.save();
        console.log(registered);
       res.status(201).send("you are registered successfully");
        
    
 
      
       

    }catch(err){
        console.log(err.message);
    }
}


const getRegister = async (req, res) =>{
    try{
    
        res.status(200).render('signup');

    }catch(err){
        console.log(err.message);
    }
}


module.exports = {
    postRegister, getRegister
};