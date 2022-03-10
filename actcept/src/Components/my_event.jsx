import { useState } from "react";
import { Link } from "react-router-dom";
import { getRegistrationInfo, fetchEvents, getAllReviews, deleteRegistration, deleteReview } from "../api/api";
import star from "../Rating.png";

const getRegisteredEventsInfo = async (email) => {
    const allRegistrations = await getRegistrationInfo()
    const eventRegistered = allRegistrations.filter(e => e.user_email === email)
    const allEvents = await fetchEvents()
    const allReviews = await getAllReviews()
    const registeredEventsInfo = allEvents.filter(e1 => eventRegistered.some(e2 => e2.event_id === e1.event_id))
    registeredEventsInfo.map(e => {
        const registerID = eventRegistered.find(x => x.event_id === e.event_id).registration_id
        e.registration_id = registerID
        return e
    })
    const pastEvents = registeredEventsInfo.filter(e => {
        const eventDate = new Date(e.date)
        const nowDate = new Date()
        return eventDate < nowDate
    })
    const futureEvents = registeredEventsInfo.filter(e => !pastEvents.includes(e))
    const userReviews = allReviews.filter(e1 => eventRegistered.some(e2 => e2.registration_id === e1.registration_id))
    console.log(`userreviews: ${userReviews}`)
    userReviews.map(e => {
        const eventName = allEvents.find(x => x.event_id === e.event_id).event_name
        e.event_name = eventName
        return e
    })
    return [eventRegistered[0], pastEvents, futureEvents, userReviews]
}

const DeleteReviewButton = ({ id }) => {
    const [message, setMessage] = useState('')
    const handleClick = async () => {
        const res = await deleteReview(id)
        if (res.status !== 500) {
            setMessage('We have delete your review. Thank you!')
        }
    }
    return (
        <>
            <button type="button" class="btn btn-primary" onClick={handleClick}>Delete</button>
            <div className="message">{message ? <p>{message}</p> : null}</div>
        </>
    )
}

// const EditReviewComponent = () => {


//     return (
//         <form onSubmit={(e) => (handleSubmit(e))}>
// 						<h3> Leave a review for </h3>
// 						<h1>{eventData[0].event_name}</h1>
// 						<label>
// 							Name:
// 						</label><br />
// 						<input type="text" value={name} required onChange={(e) => (getName(e))} /><br />
// 						<label>
// 							Email:
// 						</label><br />
// 						<input type="email" value={email} required onChange={(e) => (getEmail(e))} /><br />
// 						<label>
// 							Rating:
// 						</label> <br />
// 						<select name="rating" id="rating" value={rating} required onChange={(e) => (getRating(e))}>
// 							<option value="1">1</option>
// 							<option value="2">2</option>
// 							<option value="3">3</option>
// 							<option value="4">4</option>
// 							<option value="5">5</option>
// 						</select> <br />
// 						<label> Review </label><br />
// 						<textarea type="text" value={review} required onChange={(e) => (getReview(e))} /><br /> <br />
// 						<input type="submit" value="Leave a review" />
// 						<div className="message">{message ? <p>{message}</p> : null}</div>
// 					</form>
//     )
// }

const EventReviewComponent = ({ reviewComponent }) => {
    return (<>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <div id="rating"> <span><strong>{reviewComponent.name} </strong></span> &emsp;<span id="reviewRating"><img id="reviewStar" src={star} alt="Rating:" height="20px" /> {reviewComponent.rating} </span> {reviewComponent.event_name}</div>
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    {reviewComponent.review_text} <DeleteReviewButton id={reviewComponent.review_id} />
                </div>
            </div>
        </div>
    </>)
}

const ShowReviews = ({ reviewData }) => {
    if (reviewData.length === 0) {
        return <div>There are no reviews</div>
    } else {
        console.log(`registrations should be filled: ${reviewData}`)
        return reviewData.map((e) => {
            return (
                <EventReviewComponent reviewComponent={e} />
            )
        })
    }

}

const CancelButton = ({ id }) => {
    const [message, setMessage] = useState('')
    const handleClick = async () => {
        const res = await deleteRegistration(id)
        if (res.status !== 500) {
            setMessage('We have canceled your registration. Thank you!')
        }
    }
    return (
        <>
            <button type="button" class="btn btn-primary" onClick={handleClick}>Cancel</button>
            <div className="message">{message ? <p>{message}</p> : null}</div>
        </>
    )
}

const LeaveReviewButton = ({ id }) => {
    return (
        <Link type="button" to={`/reviews/${id}`} class="btn btn-primary" id="eventButtonFlex">Leave a Review</Link>
    )
}

const ShowPastEvents = ({ events }) => {
    console.log('REDNERING')
    if (events.length === 0) {
        return <><br /> <p id="noMatchingEvents"> No matching events</p></>
    }
    return events.map((e) => (
        <div class="flexWrapper">
            <Event event={e} footerButton={<LeaveReviewButton id={e.event_id} />} />
        </div>
    ))
}

const ShowFutureEvents = ({ events }) => {
    console.log('REDNERING')
    if (events.length === 0) {
        return <><br /> <p id="noMatchingEvents"> No matching events</p></>
    }
    return events.map((e) => (
        <div class="flexWrapper">
            <Event event={e} footerButton={<CancelButton id={e.registration_id} />} />
        </div>
    ))
}


const Event = ({ event, footerButton }) => {
    const eventURL = `/event-page/${event.event_id}`
    let eventImage = `${event.event_image}`
    if (eventImage.includes('http://')) {
    } else if (eventImage.includes('https://')) {
    } else {
        eventImage = 'https://media.istockphoto.com/photos/we-are-going-to-party-as-if-theres-no-tomorrow-picture-id1279483477?k=20&m=1279483477&s=612x612&w=0&h=xRMcRmn81eX5pJ0J_zIQJUgh1ZrrSiW1q83B3VbeGkw='
    }
    const eventDate = `${event.date}`
    console.log(eventDate)
    const eventDateYear = eventDate.substring(0, 4)
    const eventDateMonth = eventDate.substring(5, 7)
    const eventDateDay = eventDate.substring(8, 10)
    return <>
        <div class="cardWrapper">
            <div class="card" style={{ width: '18rem' }}>
                <img src={`${eventImage}`} class="card-img-top roundedImage" alt="..." onerror="standby()" />
                <div class="card-body" id="cardFlex">
                    <h5 class="card-title"><strong>{event.event_name}</strong></h5>
                    <p class="card-text"><strong>{event.artist_name}</strong> at <strong>{event.venue_name}</strong><br /> {event.genre} <br /> {eventDateDay}-{eventDateMonth}-{eventDateYear}</p>
                    {/* <a href={eventURL} class="btn btn-primary">See more </a> */}
                    <div id="seeMore">
                        {footerButton}
                    </div>
                </div>
            </div>
        </div>
    </>;

};

const MyEventPage = () => {
    const [email, setEmail] = useState('');
    const [userInfo, setUserInfo] = useState({})
    const [pastEvents, setPastEvents] = useState([])
    const [futureEvents, setFutureEvents] = useState([])
    const [reviews, setReviews] = useState([])
    const [message, setMessage] = useState('Welcome! Please enter your email. ')
    const handleSubmit = (e) => {
        e.preventDefault()
        getRegisteredEventsInfo(email).then((e) => {
            if (!e[0]) {
                setMessage('Sorry! We cannot find your information. Please try an other email or go to the homepage and book an event.')
                setEmail('')
                setUserInfo({})
                setPastEvents([])
                setFutureEvents([])
                setReviews([])
            } else {
                setUserInfo(e[0])
                setPastEvents(e[1])
                setFutureEvents(e[2])
                setReviews(e[3])
                setMessage(`Welcome!`)
                setEmail('')
            }
        })
        console.log(`userInfo ${userInfo}`)
        console.log(`email ${email}`)
    }
    const getEmail = (e) => { setEmail(e.target.value) }
    return (
        <>
            <div>{message} </div>
            <form class="form-group" onSubmit={handleSubmit}>
                <label>
                    Email:
                </label>
                <input type="email" class="form-control input-sm" value={email} required onChange={(e) => (getEmail(e))} />
                <input class="btn btn-primary" type="submit" value="Search" />
            </form>
            <h3>{userInfo.name}</h3>
            <h3>Upcoming Events</h3>
            <div class="eventWrapper">
                <ShowFutureEvents events={futureEvents} />
            </div>
            <h3>Past Events</h3>
            <div class="eventWrapper">
                <ShowPastEvents events={pastEvents} />
            </div>
            <div>
                <h3>Your Reviews</h3>
                <ShowReviews reviewData={reviews} />
            </div>
        </>
    )
}

export default MyEventPage;