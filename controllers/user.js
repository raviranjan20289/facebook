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
    
    const token = jwt.sign({id: existingUser._id}, process.env.Secret_Key);
    res.cookie('jwt', token)
    // return res.status(201).json({user:existingUser, token:token});
    // res.redirect(`/api/user/dashboard/${existingUser.name}`);
    res.render('dashboard', {data: existingUser.name});

  } catch (err) {
    console.log(err.message);
  }
 
};


exports.login = async ( req, res) =>{
    res.render('login');
}

exports.getDashboard = async (req, res) =>{
  // const data = req.params.name;

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

exports.myprofile = async (req, res) => {
  try {
  const userId = req.userId;
  console.log(userId) 
    const user = await User.findById(userId);
     if (!user) {
      return res.status(404).send('User not found');
    }
    
    res.render('myprofile', { user });
  } catch (error) {
    console.error( error);
    res.send('Internal Server Error');
  }
};


// exports.searchUser = async (req, res) => {
//   try {
//     const search = req.query.search;
//     const data = await User.find({ "name": { $regex: ".*" +search+".*", $options: 'i' } });
//     res.send(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred');
//   }
// };

exports.otherUser = async (req, res) =>{
  try {
    const search = req.query.search;
   
    const user = await User.findOne({ "name": { $regex: ".*" +search+".*", $options: 'i' } });
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('otherUser', {user})
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}


