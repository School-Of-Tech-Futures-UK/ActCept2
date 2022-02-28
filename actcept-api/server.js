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


// const createVenuesTableQuery = `
//   CREATE TABLE venues (
//   venue_id SERIAL PRIMARY KEY,
//   venue_name VARCHAR(100) NOT NULL,
//   capacity INTEGER NOT NULL
//   );
// `

// const createEventsTableQuery = `
//   CREATE TABLE events (
//   event_id SERIAL PRIMARY KEY,
//   event_name VARCHAR(100) NOT NULL,
//   event_description VARCHAR(255),
//   artist_name VARCHAR(100) NOT NULL,
//   artist_email VARCHAR(100) NOT NULL,
//   venue_id INTEGER NOT NULL,
//   "date" DATE NOT NULL,
//   "location" VARCHAR(100) NOT NULL,
//   type_of_event VARCHAR(100) NOT NULL,
//   CONSTRAINT fk_venue
//       FOREIGN KEY (venue_id)
//       REFERENCES venues(venue_id)
//   );
// `

// const createRegistrationsTableQuery = `
//   CREATE TABLE registrations (
//     registration_id SERIAL PRIMARY KEY,
//     user_name VARCHAR(100) NOT NULL,
//     user_email VARCHAR(100) NOT NULL,
//     event_id INTEGER NOT NULL,
//     CONSTRAINT fk_event
//         FOREIGN KEY (event_id)
//         REFERENCES events(event_id)
//     );
// `

// const createReviewsTableQuery = `
//     CREATE TABLE reviews (
// review_id SERIAL PRIMARY KEY,
// registration_id INTEGER NOT NULL,
// event_id INTEGER NOT NULL,
// rating INTEGER,
// review_text VARCHAR(255),
// CONSTRAINT fk_event
// 		FOREIGN KEY (event_id)
// 		REFERENCES events(event_id),
// CONSTRAINT fk_registration
// 		FOREIGN KEY (registration_id)
// 		REFERENCES registrations(registration_id)
// );
// `

// const insertToVenuesQuery = `INSERT INTO 
// venues (venue_name, capacity)
// VALUES
// ('Birmingham Utilita Arena',2000),
// ('Wembley', 3000);`

// const insertToEventsQuery = `INSERT INTO 
// events (event_name, event_description, artist_name, artist_email, venue_id, "date", "location", type_of_event)
// VALUES
// ('Andre Ice Cold', 'OutKast show', 'OutKast', 'outkast@accenture.com', 1, '2022-02-28','Birmingham', 'Hip Hop'),
// ('The Madness RETURNS', 'Madness SHOW', 'Madness', 'madness@accenture.com',2, '2022-04-23','London', 'Hip Hop');`


// const createTables = async () => {
//   const venuesTable = await db.query(createVenuesTableQuery)
//   const eventsTable = await db.query(createEventsTableQuery)
//   const registrationsTable = await db.query(createRegistrationsTableQuery)
//   const reviewsTable = await db.query(createReviewsTableQuery)
//   const insertVenuesInfo = await db.query(insertToVenuesQuery)
//   const insertEventsInfo = await db.query(insertToEventsQuery)
// }

// createTables();

app.get('/events', async (req, res) => {
  // const person = await db.query(`SELECT pupil_first_name, pupil_surname FROM pupils WHERE pupil_id=${req.params.id}`);
  const events = await db.query('SELECT * FROM events')
  res.send(events);
})

app.get('/events/:id', async (req, res) => {
  const id = req.params.id
  const events = await db.query(`SELECT * FROM events WHERE event_id=${id}`)
  res.send(events);
})


app.post('/send-registration', (req, res) => {
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

app.post('/send-review', async (req, res) => {
  // sample data:
  // {
  //   registration_id: 2, 
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


app.listen(3000, () => console.log('started'));

// exports.handler = serverlessExpress({ app });

