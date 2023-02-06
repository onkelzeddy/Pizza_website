const express = require('express')
const pug = require('pug')
const app = express()
const path = require('path');
const urlencodedParser = express.urlencoded({extended: false});
const pizzaRoutes = require('./public/javascripts/pizzaRoutes');
const userService = require('./public/javascripts/userService');
const userRoutes = require('./public/javascripts/userRoutes');
const jwt = require('jsonwebtoken');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static(path.join(__dirname + '/public')));
app.use("/main", pizzaRoutes);
app.use("/main",urlencodedParser, userRoutes);
app.use(express.json());

const pizzaDataService = require('./public/javascripts/pizzaDataService');

process.env.TOKEN_SECRET = 'Hello'

const port = 3000

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

app.get('/', (req, res) => {
  res.redirect('/login')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/main', async (req, res) => { 
  
  pizzaData = await pizzaDataService.getPizzaData()

  res.render('main',{pizzaData : pizzaData}) 
})

app.post('/auth',authenticateToken,(req, res) => {
  res.send('/main')
})

app.get('/order',(req, res) =>{
  res.render('order')
})

app.get('/user',authenticateToken,(req,res)=>{
  res.send(req.user.toString())
})

app.post('/login',urlencodedParser, async (req, res) => {
  if(!req.body) return res.sendStatus(400);
  var answ = await userService.login(req.body.username,req.body.password);
  res.send(answ);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})