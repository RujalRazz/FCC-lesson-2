let express = require('express');
let app = express();
require('dotenv').config()
const port = 3000

app.use("/public", express.static(__dirname + "/public"))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})
app.get('/json', (req, res) => {
    let message = "Hello json"

    if(process.env.MESSAGE_STYLE === "uppercase"){
        message = message.toUpperCase();
    }
  res.json({"message": message})
})
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})  

app.get('/:word/echo', (req, res) => {
    const word = req.params.word
  res.json({echo: word})

})

app.get('/name', (req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;

  
  if (firstName && lastName) {
    const fullName = `${firstName} ${lastName}`;
    
    res.json({ name: 'firstname lastname'});
  } else {
    
    res.status(400).json({ error: 'Missing first or last name query parameters.' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next();
}, (req, res) => {
    res.json({time: req.time})
})
module.exports = app;