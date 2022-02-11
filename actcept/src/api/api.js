// const cors = require('cors')
// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// app.use(bodyParser.json()) // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
//   extended: true
// }))
// app.use(express.json()) // to support JSON-encoded bodies
// const fs = require('fs')

// app.post('/events', function (req, res){
//     const data = fs.readFileSync('events.json', 'utf8')
//     const events = JSON.parse(data)
//     res.send(events)

// })

const express = require('express');
const serverlessExpress = require('@vendia/serverless-express')
const app = express();

//stuff that Harry has pasted in 
// app.use(express.json())
// const cors = require('cors')
// const highscores = []
// const fs = require('fs')
// app.use(cors())
// const bodyParser = require('body-parser')
// app.use(bodyParser.json()) // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
//   extended: true
// }))
// app.use(express.json()) // to support JSON-encoded bodies
// app.use(express.static(__dirname + '/'))
//End of Harry spam


let fileData = JSON.parse(fs.readFileSync('events.json'))

// const fruits = ['apple', 'banana', 'cucumber', 'damson', 'elderberry', 'fig', 'grapefruit'];

app.get('/events', (req, res) => {
    // const randomIndex = Math.floor(Math.random() * fruits.length)
    const fs = require('fs')
    fs.readFile('events.json', (err, data) => {
      if (err) throw err
      const returnevent = (JSON.parse(data))
      res.json(returnevent)
      res.send(returnevent);
    })
    
})

//app.listen(3000, () => console.log('started'));

exports.handler = serverlessExpress({ app });

