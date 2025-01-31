const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
require("dotenv").config();
const User = require('./schema')


const app = express();
const port = 3010;
mongoose.connect(process.env.db_url)
.then(() => console.log("Connected to MongoDB"))
.catch(()=> console.log("Error connecting to database: "))


app.use(express.json());
app.use(express.static('static'));




app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/api/users', async(req,res) =>{
  // const { username, email, password,createdAt } = req.body;
  // if(!username || !email || !password){
  //   res.status(400).json("please fill all the fields");
  // }
  // const user = new User({ username, email, password, createdAt });
  // user.save();
  // res.json(user);
 

  try{
    const {name,email,password,createdAt} = req.body

    if(!name || !email || !password){
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = new User({name,email,password,createdAt})
    await newUser.save()

    res.status(201).json({message:"Successful"})
  }
  catch{
    res.status(500).json({message:error.message})
  }

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
