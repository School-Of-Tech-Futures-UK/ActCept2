const express = require('express');
const serverlessExpress = require('@vendia/serverless-express')
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express();
const postgres = require('pg-promise')();
app.use(cors())
app.use(bodyParser.json())

// const db = postgres({
//   host: process.env.DB_HOSTNAME || '127.0.0.1',
//   database: 'postgres',
//   user: 'postgres',
//   password: process.env.DB_PASSWORD,
// })


const db = postgres({
  host: 'gigstr-db-container' || '127.0.0.1',
  database: 'gigstr',
  user: 'gigstr',
  password: 'gigstr',
  port: 5432,

})

// app.get('/events', async (req, res) => {
//   const events = await db.query('SELECT * FROM events')
//   res.send(events);
// })

// app.get('/events/:id', async (req, res) => {
//   const id = req.params.id
//   const events = await db.query(`SELECT * FROM events WHERE event_id=${id}`)
//   res.send(events);
// })

app.post('/send-registration', async (req, res) => {
  // sample data:
  // {
  //   name: 'Yingying', 
  //   user_email: 'yingying@accenture.com', 
  //   event_id: 2
  // }
  const registrationInfo = req.body
  const query = {
    text: 'INSERT INTO registrations(name, user_email, event_id) VALUES($1, $2, $3) RETURNING *',
    values: [registrationInfo.name, registrationInfo.user_email, registrationInfo.event_id]
  }
  db.query(query).then((results) => {
    res.status(201).send(`A registration has been added with ID ${results[0].registration_id} to Event ${results[0].event_id}`)
  })

})

app.get('/get-registration/:id', async (req, res) => {
  const id = req.params.id
  const data = await db.query(`SELECT * FROM registrations WHERE event_id=${id}`)
  res.send(data)
})

app.put('/edit-registration/:id', async (req, res) => {
  const id = req.params.id
  const data = await req.body
  try {
    await db.query(`UPDATE registrations SET name='${data.name}', user_email='${data.user_email}' WHERE registration_id=${id}`)
    res.json('Registration updated successfully')
  } catch (err) {
    res.status(500).json(`Error in updating the registration ${err.message}`)
  }
})

app.delete('/delete-registration/:id', async (req, res) => {
  const id = req.params.id
  try {
    await db.query(`DELETE FROM registrations WHERE registration_id=${id}`)
    res.json('Registration deleted successfully')
  } catch (err) {
    res.status(500).json(`Error while deleting review ${err.message}`)
  }
})

app.post('/send-review', async (req, res) => {
  // sample data from req:
  // {
  //   email: 'yingying@gigstr.com', 
  //   event_id: 1, 
  //   rating: 5, 
  //   review_text: 'Outkast are possibly the greatest men to ever walk this planet'
  // }
  const review = await req.body
  console.log('review:')
  console.log(review)
  const registration_id = await db.query(`SELECT registration_id FROM registrations WHERE user_email='${review.email}' AND event_id=${review.event_id}`)
  console.log('reID')
  console.log(registration_id)
  if (registration_id === []) {
    res.status(501).send(`Invalid registration ID`)
  } else {
    const query = {
      text: 'INSERT INTO reviews (registration_id, event_id, rating, review_text) VALUES($1, $2, $3, $4) RETURNING *',
      values: [registration_id[0].registration_id, review.event_id, review.rating, review.review_text]
    }
    db.query(query).then((results) => {
      res.status(201).send(`A review has been added with ID ${results[0].review_id} by the user with ID ${results[0].registration_id} to Event ${results[0].event_id}`)
    })

  }
})

app.get('/getallreviews', async (req, res) => {
  const reviews = await db.query(`SELECT * FROM reviews`)
  // LEFT JOIN registrations ON reviews.registration_id = registrations.registration_id`)
  res.send(reviews)
})


app.put('/edit-review/:id', async (req, res) => {
  const id = req.params.id
  const data = await req.body
  try {
    await db.query(`UPDATE reviews SET rating=${data.rating}, review_text='${data.text}' WHERE review_id=${id}`)
    res.json('Review updated successfully')
  } catch (err) {
    res.status(500).json(`Error in updating the review ${err.message}`)
  }
})


app.delete('/delete-review/:id', async (req, res) => {
  const id = req.params.id
  try {
    await db.query(`DELETE FROM reviews WHERE review_id=${id}`)
    res.json('Review deleted successfully')
  } catch (err) {
    res.status(500).json(`Error while deleting review ${err.message}`)
  }
})


app.listen(3000, () => console.log('started'));

// exports.handler = serverlessExpress({ app });

