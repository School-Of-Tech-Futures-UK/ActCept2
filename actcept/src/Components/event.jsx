
import { useEffect, useState } from "react";

const fetchEvents = async () => {
    const results = await fetch("https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1/fruits");
    const data = await results.text();
    return data;
};

// https://7xooqvfo8j.execute-api.eu-west-2.amazonaws.com/sprint1
// https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1
// https://api.covid19api.com/countries
// data.map((country) => country.Slug).sort()

const Event = () => {
        const [events, setEvents] = useState('');
        useEffect(() => {
          fetchEvents().then(setEvents);
        }, []);
        return <>{events}</>;
    
};





export default Event;