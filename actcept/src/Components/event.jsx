
import { useEffect, useState } from "react";
// import { fetchCases, fetchCountries } from "../api";
// import { fetchEvents } from "../api/api";

// https://7xooqvfo8j.execute-api.eu-west-2.amazonaws.com/sprint1
// https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1
// https://api.covid19api.com/countries
// data.map((country) => country.Slug).sort()
const fetchEvents = async () => {
  const results = await fetch("https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1/events");
  //const results = await fetch('http://localhost:3001/pupils/1')
  const data = await results.text();
  return data;
};

const Event = () => {
        const [events, setEvents] = useState('');
        useEffect(() => {
          fetchEvents().then(setEvents);
        }, []);
        return <>
        <div class="bgImage">
          <h1> Events Page</h1>
          <p> Find events near you</p>
        </div>
        <div class="cardWrapper">
          <div class="card" style={{width: '18rem'}}>
            <img src="https://www.accenture.com/t00010101T000000Z__w__/gb-en/_acnmedia/Accenture/Redesign-Assets/Careers/Images/Marquee/8/Accenture-in-session-marquee.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Title Name</h5>
              <p class="card-text">{events}</p>
              <a href="/" class="btn btn-primary">Go somewhere </a>
            </div>
          </div>
        </div>
        {events}
        </>;
    
};





export default Event;