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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


 module.exports = app;
