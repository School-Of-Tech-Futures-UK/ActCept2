import ShowEvents from "./event"
import { useEffect, useState } from "react";
import { fetchEvents } from "../api/api";

const Home = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetchEvents().then(setEvents);
    }, []);


    return (<>
        <div class="bgImage">
            <h1> Welcome to ActCept </h1>
            <p> See through the crowd and find your perfect event</p>
            <div class="eventWrapper">
                <ShowEvents events={events}/>
            </div>
        </div>
    </>)

}

export default Home;