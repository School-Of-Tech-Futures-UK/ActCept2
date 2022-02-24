const express = require('express');
const serverlessExpress = require('@vendia/serverless-express')
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express();
const postgres = require('pg-promise')();
app.use(cors())
app.use(bodyParser.json())

const db = postgres({
  host: process.env.DB_HOSTNAME || '127.0.0.1',
  database: 'postgres',
  user: 'postgres',
  password: process.env.DB_PASSWORD,
})

const createVenuesTableQuery = `
  CREATE TABLE venues (
  venue_id SERIAL PRIMARY KEY,
  venue_name VARCHAR(100) NOT NULL,
  capacity INTEGER NOT NULL
  );
`

const createEventsTableQuery = `
  CREATE TABLE events (
  event_id SERIAL PRIMARY KEY,
  event_name VARCHAR(100) NOT NULL,
  event_description VARCHAR(255),
  artist_name VARCHAR(100) NOT NULL,
  artist_email VARCHAR(100) NOT NULL,
  venue_id INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "location" VARCHAR(100) NOT NULL,
  type_of_event VARCHAR(100) NOT NULL,
  CONSTRAINT fk_venue
      FOREIGN KEY (venue_id)
      REFERENCES venues(venue_id)
  );
`

const createRegistrationsTableQuery = `
  CREATE TABLE registrations (
    registration_id SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    event_id INTEGER NOT NULL,
    CONSTRAINT fk_event
        FOREIGN KEY (event_id)
        REFERENCES events(event_id)
    );
`

const createReviewsTableQuery = `
    CREATE TABLE reviews (
review_id SERIAL PRIMARY KEY,
registration_id INTEGER NOT NULL,
event_id INTEGER NOT NULL,
rating INTEGER,
review_text VARCHAR(255),
CONSTRAINT fk_event
		FOREIGN KEY (event_id)
		REFERENCES events(event_id),
CONSTRAINT fk_registration
		FOREIGN KEY (registration_id)
		REFERENCES registrations(registration_id)
);
`

const insertToVenuesQuery = `INSERT INTO 
venues (venue_name, capacity)
VALUES
('Birmingham Utilita Arena',2000),
('Wembley', 3000);`

const insertToEventsQuery = `INSERT INTO 
events (event_name, event_description, artist_name, artist_email, venue_id, "date", "location", type_of_event)
VALUES
('Andre Ice Cold', 'OutKast show', 'OutKast', 'outkast@accenture.com', 1, '2022-02-28','Birmingham', 'Hip Hop'),
('The Madness RETURNS', 'Madness SHOW', 'Madness', 'madness@accenture.com',2, '2022-04-23','London', 'Hip Hop');`


const createTables = async () => {
  const venuesTable = await db.query(createVenuesTableQuery)
  const eventsTable = await db.query(createEventsTableQuery)
  const registrationsTable = await db.query(createRegistrationsTableQuery)
  const reviewsTable = await db.query(createReviewsTableQuery)
  const insertVenuesInfo = await db.query(insertToVenuesQuery) 
  const insertEventsInfo = await db.query(insertToEventsQuery)
}

createTables();


const fruits = ['apple', 'banana', 'cucumber', 'damson', 'elderberry', 'fig', 'grapefruit'];

app.get('/fruits', (req, res) => {
    const randomIndex = Math.floor(Math.random() * fruits.length)
    res.send(fruits[randomIndex]);
})


app.get('/events', async (req, res) => {
  // const person = await db.query(`SELECT pupil_first_name, pupil_surname FROM pupils WHERE pupil_id=${req.params.id}`);
  const events = await db.query ('SELECT * FROM events')
  res.send(events);
})

app.post('/send-registration', function (req, res) {
  // {
  //   name: 'Yingying', 
  //   user_email: 'yingying@accenture.com', 
  //   event_id: 2
  // }
  const registrationInfo = req.body
  const query = {
    text: 'INSERT INTO registrations("name", "user_email", event_id) VALUES($1, $2, $3) RETURNING *',
    values: [registrationInfo.name, registrationInfo.user_email, registrationInfo.event_id]
  }
  db.query(query).then(() => {
    res.status(201).send(query.values)
  })
  
})

app.listen(3001, () => console.log('started'));




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

