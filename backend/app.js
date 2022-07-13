const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const userRoutes=require('./routes/user');
const authRoutes=require(`./routes/auth`)
const primarySkillsRoutes = require('./routes/primarySkills');
const expertiseRoutes = require('./routes/expertise');
const skillRoutes = require('./routes/skill');
const educationRoutes = require('./routes/education');
const experienceRoutes = require('./routes/experience');
const projectRoutes = require('./routes/project');
const contactRoutes = require('./routes/contact');


const app=express();
mongoose.
connect("mongodb+srv://harshit:"+process.env.MONGO_ATLAS_PW+"@myportfoliocluster0.iadm056.mongodb.net/myPortfolioDatabase?retryWrites=true&w=majority")
.then(()=>{
  console.log('connected to database');
})
.catch(()=>{
  console.log(`connection failed`)
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join('images')))

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
    )
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
      )
      next();
    })



app.use('/api/users',userRoutes);
app.use('/api/primarySkills',primarySkillsRoutes);
app.use('/api/expertise',expertiseRoutes);
app.use('/api/skill',skillRoutes);
app.use('/api/education',educationRoutes);
app.use('/api/experience',experienceRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/contact',contactRoutes);

app.use('/api/auth',authRoutes);

module.exports=app;
