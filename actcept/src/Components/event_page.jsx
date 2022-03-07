import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventData } from "../api/api";
import { getAllReviews } from "../api/api";
import ShowReviews from "./event_review";

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

const BookNowButton = ({ event }) => {
    const eventDate = new Date(event.date)
    const nowDate = new Date()
    nowDate.setHours(0,0,0,0)
    if (eventDate < nowDate) {
        return (<button type="button" class="btn btn-secondary" id="eventButtonFlex" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Sorry! Cannot book for a past event.">Book Now</button>)
    } else {
        return (<Link type="button" to={`/signup/${event.event_id}`} class="btn btn-primary" id="eventButtonFlex">Book Now</Link>)
    }
}


const EventPageComponent = ({ event }) => {
    let eventImage = `${event.event_image}`
    if (eventImage.includes('http://')) {
    }else if (eventImage.includes('https://')){
    } else {
    eventImage = 'https://media.istockphoto.com/photos/we-are-going-to-party-as-if-theres-no-tomorrow-picture-id1279483477?k=20&m=1279483477&s=612x612&w=0&h=xRMcRmn81eX5pJ0J_zIQJUgh1ZrrSiW1q83B3VbeGkw='
    }
    return (<>
        <Link type="button" to='/' class="btn btn-primary"> ← Home</Link>
        <div class="eventFlex">
            <div id="eventHeader">
                <img id="eventImage" src={eventImage} class="card-img-top" alt="..." />
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
                    <div class="card mainDetails card-event-page">
                        <div class="card-body">
                            <h5 class="card-title">{event.event_description}</h5>
                            <p class="card-text">{event.artist_name} at {event.location} <br /> {event.date}</p>
                        </div>
                    </div>
                    <div class="eventButtonsFlex">
                        {/* <button type="button" class="btn btn-primary" id="eventButtonFlex"> Book Now </button> */}
                        <BookNowButton event={event} />
                        <button type="button" class="btn btn-primary" id="eventButtonFlex"> Add to Shortlist </button>
                        <Link to={`/reviews/${event.event_id}`} class="btn btn-primary" id="eventButtonFlex">Leave a Review</Link>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Additional Info</h5>
                            <p class="card-text">Additional details about the event</p>
                        </div>
                    </div>
                </div>
                <div id="mapFlex">
                    <div class="card card-event-page">
                        <div class="card-body">
                            <h5 class="card-title">Map Here</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="eventReview">
                <div class="accordion" id="accordionExample">
                    <ShowReviews id={event.event_id} />
                </div>
            </div>
        </div>
    </>)

}

export default EventPage;