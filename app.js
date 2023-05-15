const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000
require('./utility/database')
const userRoutes = require('./routes/user');
const User = require('./models/user')
app.use(express.json())
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use('/api/user', userRoutes)



const start = async() => {
   
         try{
         app.listen(PORT, () =>{
             console.log(`${PORT} yes you are connected now`);
         })
     }catch(error) {
         console.log(error);
     }
  }
start()