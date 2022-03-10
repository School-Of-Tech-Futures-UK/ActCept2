import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventData, fetchVenueData, fetchRegistrations } from "../api/api";
import { getAllReviews } from "../api/api";
import ShowReviews from "./event_review";
import { BsChevronLeft } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { BsCalendar2 } from "react-icons/bs";
import { BsMap } from "react-icons/bs";

const checkCapacity = (capacity, numRegistered) => {
    if (numRegistered < capacity) {
        return false
    } else {
        return true
    }
}

const fetchData = async (id) => {
    const eventData = await fetchEventData(id)
    const venueID = eventData[0].venue_id
    const registrationsData = await fetchRegistrations(id)
    const venueData = await fetchVenueData(venueID)
    const capacity = venueData[0].venue_capacity
    const numRegistered = registrationsData.length
    console.log(`capacity ${capacity} numberRegistered ${numRegistered}`)
    const isFull = checkCapacity(capacity, numRegistered)
    return [eventData, isFull]
}

const EventPage = () => {
    const { id } = useParams()
    console.log(id)

    const [eventData, setEventData] = useState([]);
    const [capacityCheck, setCapacityCheck] = useState(false);

    useEffect(() => {
        fetchData(id).then((returnedValue) => {
            setEventData(returnedValue[0])
            setCapacityCheck(returnedValue[1])
        });
    }, [id]);
    console.log("Hello")

    const event = eventData[0]
    console.log(event)
    console.log(`capacity ${capacityCheck}`)
    if (!event) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <EventPageComponent event={event} capacityCheck={capacityCheck} />
        )
    }


}

const ButtonTriggeredModal = ({buttonText, message}) => {
    return (<>
        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModal" id="eventButtonFlex">
            {buttonText}
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        {message}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

const BookNowButton = ({ event, capacityCheck }) => {
    const eventDate = new Date(event.date)
    const nowDate = new Date()
    nowDate.setHours(0, 0, 0, 0)
    if (eventDate < nowDate) {
        return (<ButtonTriggeredModal buttonText={"Book Now"} message={"Sorry! Cannot book for a past event."}/>)
    }
    if (capacityCheck) {
        return (<ButtonTriggeredModal buttonText={"Book Now"} message={"Sorry! This event has been fully booked."}/>)
    }

    return (<Link type="button" to={`/signup/${event.event_id}`} class="btn btn-primary" id="eventButtonFlex">Book Now</Link>)

}

const LeaveReviewButton = ({ event }) => {
    const eventDate = new Date(event.date)
    const nowDate = new Date()
    nowDate.setHours(0, 0, 0, 0)
    //console.log(`capacityCheck ${capacityCheck}`)
    if (eventDate > nowDate) {
        return (<ButtonTriggeredModal buttonText={"Leave a Review"} message={"Sorry! You cannot leave a review for a future event."}/>)
    } else {
        return (<Link type="button" to={`/reviews/${event.event_id}`} class="btn btn-primary" id="eventButtonFlex">Leave a Review</Link>)
    }
}


const EventPageComponent = ({ event, capacityCheck }) => {
    let eventImage = `${event.event_image}`
    const eventDate = `${event.date}`
    const eventDateYear = eventDate.substring(0, 4)
    const eventDateMonth = eventDate.substring(5, 7)
    const eventDateDay = eventDate.substring(8, 10)
    if (eventImage.includes('http://')) {
    } else if (eventImage.includes('https://')) {
    } else {
        eventImage = 'https://media.istockphoto.com/photos/we-are-going-to-party-as-if-theres-no-tomorrow-picture-id1279483477?k=20&m=1279483477&s=612x612&w=0&h=xRMcRmn81eX5pJ0J_zIQJUgh1ZrrSiW1q83B3VbeGkw='
    }
    return (<>
        <div class="backgroundProperties">
            <Link type="button" to='/' class="returnButton"><BsChevronLeft /> Home</Link>
            <div class="eventFlex">
                <div id="eventHeader">
                    <img id="eventImage" src={eventImage} class="card-img-top" alt="..." />
                    <div id="eventTitle">
                        <p> {event.event_name}</p>
                    </div>
                </div>
                <div class="detailsCard">
                    <div class="eventCardFlex">
                        <div class="eventDetailsFlex" id="childFlex" >
                            <div class="card mainDetails card-event-page">
                                <div class="card-body">
                                    <h6 class="Date"> <BsCalendar2/> &ensp;{eventDateDay}-{eventDateMonth}-{eventDateYear} at {event.venue_name}</h6>
                                    <h3 class="card-title card-graphik-bold"><BsPeople/>&ensp;{event.artist_name}</h3>
                                    <h5 class="card-title">{event.event_description}</h5>
                                    <button type="button" class="btn btn-primary btn-lg disabled" id="genreIcon"> {event.genre} </button>
                                    <p class="card-text"><BsMap/>&ensp;{event.venue_address} </p>
                                </div>
                            </div>
                            <div class="eventButtonsFlex">
                                {/* <button type="button" class="btn btn-primary" id="eventButtonFlex"> Book Now </button> */}
                                <BookNowButton event={event} capacityCheck={capacityCheck} />
                                <button type="button" class="btn btn-primary" id="eventButtonFlex"> Add to Shortlist </button>
                                <LeaveReviewButton event={event} />
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
                        <h5 style = {{ paddingLeft:1 }}><strong> Reviews </strong></h5>
                        <div class="accordion" id="accordionExample">
                            <ShowReviews id={event.event_id} />
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
        </div>
    </>)

}

export default EventPage;