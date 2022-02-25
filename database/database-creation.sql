CREATE TABLE venues (
venue_id SERIAL PRIMARY KEY,
venue_name VARCHAR(100) NOT NULL,
capacity INTEGER NOT NULL
);

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

CREATE TABLE registrations (
registration_id SERIAL PRIMARY KEY,
"name" VARCHAR(100) NOT NULL,
user_email VARCHAR(100) NOT NULL,
event_id INTEGER NOT NULL,
CONSTRAINT fk_event
		FOREIGN KEY (event_id)
		REFERENCES events(event_id)
);

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


INSERT INTO 
		venues (venue_name, capacity)
VALUES
		('Birmingham Utilita Arena',2000),
		('Wembley', 3000);


INSERT INTO 
		events (event_name, event_description, artist_name, artist_email, venue_id, "date", "location", type_of_event)
VALUES
		('Andre Ice Cold', 'OutKast show', 'OutKast', 'outkast@accenture.com', 1, '2022-02-28','Birmingham', 'Hip Hop'),
		('The Madness RETURNS', 'Madness SHOW', 'Madness', 'madness@accenture.com',2, '2022-04-23','London', 'Hip Hop');

INSERT INTO 
		registrations ("name", user_email, event_id)
VALUES
		('Yingying chen','yingying@accenture.com',1),
		('Hamza Saleem', 'hamza@accenture.com', 1),
		('Oishika Pradhan','oishika@accenture',2),
		('Harry Peter','harry@accenture.com',2),
		('Thomas Southern', 'thomas@accenture.com', 1)
		
INSERT INTO 
		reviews (registration_id, event_id, rating, review_text)
VALUES 
		(2,1,5,'Outkast are possibly the greatest men to ever walk this planet'),
		(4,2,4,'This show LITERALLY drove me mad');
