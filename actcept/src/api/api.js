const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))
app.use(express.json()) // to support JSON-encoded bodies
const fs = require('fs')

app.post('/events', function (req, res){
    const data = fs.readFileSync('events.json', 'utf8')
    const events = JSON.parse(data)
    res.send(events)

})