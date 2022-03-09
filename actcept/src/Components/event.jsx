import { Link } from "react-router-dom";
// import { fetchCases, fetchCountries } from "../api";
// import { fetchEvents } from "../api/api";
// import XXX from '../../public/Assets/Images/Generic_Event.jpg'

// https://7xooqvfo8j.execute-api.eu-west-2.amazonaws.com/sprint1
// https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1
// https://api.covid19api.com/countries
// data.map((country) => country.Slug).sort()


const ShowEvents = ({events}) => { 
  console.log('REDNERING')
  if(events.length === 0){
    return <><br/> <p id="noMatchingEvents"> No matching events</p></>
  }
  return  events.map((e) => (
      <div class="flexWrapper">
      <Event event={e} />
      </div>
      ))
}

const Event = ({event}) => {
  const eventURL = `/event-page/${event.event_id}`
  let eventImage = `${event.event_image}`
  if (eventImage.includes('http://')) {
  }else if (eventImage.includes('https://')){
  } else {
    eventImage = 'https://media.istockphoto.com/photos/we-are-going-to-party-as-if-theres-no-tomorrow-picture-id1279483477?k=20&m=1279483477&s=612x612&w=0&h=xRMcRmn81eX5pJ0J_zIQJUgh1ZrrSiW1q83B3VbeGkw='
  }
  const eventDate = `${event.date}`
  console.log(eventDate)
  const eventDateYear = eventDate.substring(0,4)
  const eventDateMonth = eventDate.substring(5,7)
  const eventDateDay = eventDate.substring(8,10)
        return <>
        <div class="cardWrapper">
          <div class="card" style={{width: '18rem'}}>
            <img src={`${eventImage}`} class="card-img-top roundedImage" alt="..." onerror="standby()" />
            <div class="card-body" id="cardFlex">
              <h5 class="card-title"><strong>{event.event_name}</strong></h5>
              <p class="card-text"><strong>{event.artist_name}</strong> at <strong>{event.venue_name}</strong><br/> {event.genre} <br/> {eventDateDay}-{eventDateMonth}-{eventDateYear}</p>
              {/* <a href={eventURL} class="btn btn-primary">See more </a> */}
              <div id="seeMore">
                <Link to={eventURL} type="button" class="btn btn-primary">See more</Link>
              </div>
            </div>
          </div>
        </div>
        </>;
    
};





export default ShowEvents;