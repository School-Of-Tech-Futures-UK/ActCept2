const express = require('express');
const serverlessExpress = require('@vendia/serverless-express')
const cors = require('cors')
const app = express();
const postgres = require('pg-promise')();
app.use(cors())

const db = postgres({
  host: process.env.DB_HOSTNAME || '127.0.0.1',
  database: 'postgres',
  user: 'postgres',
  password: process.env.DB_PASSWORD,
})


const fruits = ['apple', 'banana', 'cucumber', 'damson', 'elderberry', 'fig', 'grapefruit'];

app.get('/fruits', (req, res) => {
    const randomIndex = Math.floor(Math.random() * fruits.length)
    res.send(fruits[randomIndex]);
})


app.get('/pupils/:id', async (req, res) => {
  const person = await db.query(`SELECT pupil_first_name, pupil_surname FROM pupils WHERE pupil_id=${req.params.id}`);
  res.send(person);
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

