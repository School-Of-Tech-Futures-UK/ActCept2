
import { useEffect, useState } from "react";
// import { fetchCases, fetchCountries } from "../api";
// import { fetchEvents } from "../api/api";

// https://7xooqvfo8j.execute-api.eu-west-2.amazonaws.com/sprint1
// https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1
// https://api.covid19api.com/countries
// data.map((country) => country.Slug).sort()


const ShowEvents = ({events}) => { 
  return  events.map((e) => (
      <div class="flexWrapper">
      <Event event={e} />
      </div>
      ))
}

const Event = ({event}) => {
        return <>
        <div class="cardWrapper">
          <div class="card" style={{width: '18rem'}}>
            <img src="https://www.accenture.com/t00010101T000000Z__w__/gb-en/_acnmedia/Accenture/Redesign-Assets/Careers/Images/Marquee/8/Accenture-in-session-marquee.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{event.event_name}</h5>
              <p class="card-text">{event.artist_name} at {event.location} <br/> {event.date}</p>
              <a href="/" class="btn btn-primary">Sign up now </a>
            </div>
          </div>
        </div>
        </>;
    
};

// for (x of results) {
//   Event(x)
// }




export default ShowEvents;