const User = require("../models/user");
const bcrypt = require("bcrypt");
const postRegister = async (req, res) => {
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

    const registered = await registerEmployee.save();
    console.log(registered);
    res.status(201).render('login');
  } catch (err) {
    console.log(err.message);
  }
};

const getRegister = async (req, res) => {
  try {
    res.status(200).render("signup");
  } catch (err) {
    console.log(err.message);
  }
};

const postLogin = async (req, res) => {
    try{
    
        const email = req.body.email;
        const password= req.body.password;

        const user = await User.findOne({email: email});

        if(!user){
             res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

      const MatchPassword = await bcrypt.compareSync(password, user.password)

      if (!MatchPassword) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }else{
        
          res.send("login successful")
      }

    }catch(err){
        console.log(err.message);
    }
}

const login = async ( req, res) =>{
    res.render('login');
}

module.exports = {
  postRegister,
  getRegister,
  postLogin,
  login
};
