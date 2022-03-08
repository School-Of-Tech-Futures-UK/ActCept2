import ShowEvents from "./event"
import { useEffect, useState } from "react";
import { fetchEvents } from "../api/api";
import Filtering from "./filtering"

const Home = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetchEvents().then(setEvents);
    }, []);

    return (<>
        <div class="heroHeader">
            <img id="heroImage" src="./Assets/Images/ActCept_Logo.png" alt="..."/>
            <br/>
            <br/>
            <p id="heroSubtitle"> See through the crowd and find your perfect event</p>
        </div>
        <div>
            <Filtering events={events}/>
        </div>
    </>)

}

export default Home;