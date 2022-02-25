import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventData } from "../api/api";

const EventPage = () => {
    const { id } = useParams()
    console.log(id)

    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        fetchEventData(id).then(setEventData);
    }, [id]);
    console.log("Hello")

    const event = eventData[0]
    console.log(event)

    if (!event) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <EventPageComponent event={event} />
    )
}


const EventPageComponent = ({ event }) => {
    return (<>
        <Link to='/' type="button" class="btn btn-primary"> ← Home</Link>
        <div class="eventFlex">
            <div id="eventHeader">
                <img id="eventImage" src="https://www.accenture.com/t00010101T000000Z__w__/gb-en/_acnmedia/Accenture/Redesign-Assets/Careers/Images/Marquee/8/Accenture-in-session-marquee.jpg" class="card-img-top" alt="..." height="250px" />
                <div id="eventReview">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
                <div id="eventTitle">
                    <p> {event.event_name}</p>
                </div>
            </div>
            <div class="eventCardFlex">
                <div class="eventDetailsFlex" id="childFlex" >
                    <div class="card mainDetails">
                        <div class="card-body">
                            <h5 class="card-title">{event.event_description}</h5>
                            <p class="card-text">{event.artist_name} at {event.location} <br /> {event.date}</p>
                        </div>
                    </div>
                    <div class="eventButtonsFlex">
                        {/* <button type="button" class="btn btn-primary" id="eventButtonFlex"> Book Now </button> */}
                        <Link to={`/signup/${event.event_id}`} class="btn btn-primary" id="eventButtonFlex">Book Now</Link>
                        <button type="button" class="btn btn-primary" id="eventButtonFlex"> Add to Shortlist </button>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Additional Info</h5>
                            <p class="card-text">Additional details about the event</p>
                        </div>
                    </div>
                </div>
                <div id="mapFlex">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Map Here</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)

}

export default EventPage;