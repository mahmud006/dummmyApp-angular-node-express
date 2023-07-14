const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Post = require('./models/post')

const app = express();
// const cors = require('cors');
// app.use(cors())

mongoose.connect('mongodb+srv://mahmud006:a3XK2ls6x10yXkeY@dummyapp-mongodb.v6krln7.mongodb.net/')
.then(()=>{
  console.log('connected to db');
})
.catch(()=>{
  console.log('connection failed');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next();
})

app.post('/api/posts', (req,res,next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added succesfully'
  })
})

app.get('/api/posts',(req, res, next)=>{
  const posts = [
    {
      id: 'fadf12421l',
      title: 'first server-side post',
      content: 'this is coming from the server'
    },
    {
      id: 'wadwda2421l',
      title: 'sec server-side post',
      content: 'this is coming from the server'
    }
  ]
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
})
module.exports = app;

//a3XK2ls6x10yXkeY
