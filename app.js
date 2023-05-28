require('dotenv').config();
const express = require('express');
const app = express();
const nocache = require("nocache");
app.use(nocache())

const cookies = require('cookie-parser');
app.use(cookies());


const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000; 
require('./utility/database')
const userRoutes = require('./routes/user');
const User = require('./models/user')
const Sent = require('./models/sent');
const Pending = require('./models/pending');
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