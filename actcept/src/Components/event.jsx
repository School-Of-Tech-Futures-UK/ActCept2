
import { useEffect, useState } from "react";
// import { fetchCases, fetchCountries } from "../api";
// import { fetchEvents } from "../api/api";

// https://7xooqvfo8j.execute-api.eu-west-2.amazonaws.com/sprint1
// https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1
// https://api.covid19api.com/countries
// data.map((country) => country.Slug).sort()
const fetchEvents = async (number) => {
   
  const results = await fetch(`https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1/events`);
  //const results = await fetch('http://localhost:3001/pupils/1')
  const data = await results.text();
  return data;
};

const Event = () => {
        const [events, setEvents] = useState('');
        useEffect(() => {
          fetchEvents().then(setEvents);
        }, []);
        return <>{events}</>;
    
};





export default Event;