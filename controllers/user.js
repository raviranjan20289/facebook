const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


exports.postRegister = async (req, res) => {
  try {
   
   const {name, email, password} = req.body;

   const exitingUser = await User.findOne({email});

   if(exitingUser){
    res.send("user already exists");
   }
   
   const registerEmployee = new User ({
    name, email, password
   })

    const salt = await bcrypt.genSalt(10);

    registerEmployee.password = await bcrypt.hash(
      registerEmployee.password,
      salt
    );
   
    
    const registeredUser = await registerEmployee.save();

    // const token = jwt.sign({email: registeredUser.email, id: registeredUser._id}, 'secret_key');
    //  res.status(201).json({user:registeredUser, token:token});
    res.status(201).render('login');

   

  } catch (err) {
    console.log(err.message);
  }
};

exports.getRegister = async (req, res) => {
  try {
    res.status(200).render("signup");
  } catch (err) {
    console.log(err.message);
  }
};



exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'secret_key');
    res.cookie('jwt', token)
    // return res.status(201).json({user:existingUser, token:token});
    res.redirect('/api/user/dashboard');


  } catch (err) {
    console.log(err.message);
  }
 
};


exports.login = async ( req, res) =>{
    res.render('login');
}

exports.getDashboard = async (req, res) =>{
  res.status(201).render('dashboard');
}

exports.logout = async ( req, res) =>{
  try{

    res.clearCookie('jwt');
   
    res.status(201).redirect('/api/user/getRegister');

  }catch(error){
    console.log(error.message);
  }
}

// module.exports = {
//   postRegister,
//   getRegister,
//   postLogin,
//   login
// };
