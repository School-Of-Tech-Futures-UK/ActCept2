const express = require('express');
const serverlessExpress = require('@vendia/serverless-express')
const cors = require('cors')
const app = express();
app.use(cors())



const fruits = ['apple', 'banana', 'cucumber', 'damson', 'elderberry', 'fig', 'grapefruit'];

app.get('/fruits', (req, res) => {
    const randomIndex = Math.floor(Math.random() * fruits.length)
    res.send(fruits[randomIndex]);
})

app.listen(3000, () => console.log('started'));

// const express = require('express');
// const serverlessExpress = require('@vendia/serverless-express')
// const app = express();



// let fileData = JSON.parse(fs.readFileSync('events.json'))


// app.get('/events', (req, res) => {
//     const fs = require('fs')
//     fs.readFile('events.json', (err, data) => {
//       if (err) throw err
//       const returnevent = (JSON.parse(data))
//       res.json(returnevent)
//       res.send(returnevent);
//     })
    
// })

// //app.listen(3000, () => console.log('started'));

// exports.handler = serverlessExpress({ app });

