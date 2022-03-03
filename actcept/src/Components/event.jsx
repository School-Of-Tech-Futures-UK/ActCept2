import { Link } from "react-router-dom";
// import { fetchCases, fetchCountries } from "../api";
// import { fetchEvents } from "../api/api";

// https://7xooqvfo8j.execute-api.eu-west-2.amazonaws.com/sprint1
// https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1
// https://api.covid19api.com/countries
// data.map((country) => country.Slug).sort()


const ShowEvents = ({events}) => { 
  console.log('REDNERING')
  return  events.map((e) => (
      <div class="flexWrapper">
      <Event event={e} />
      </div>
      ))
}

const Event = ({event}) => {
  const eventURL = `/event-page/${event.event_id}`
        return <>
        <div class="cardWrapper">
          <div class="card" style={{width: '18rem'}}>
            <img src={`${event.event_image}`} class="card-img-top roundedImage" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{event.event_name}</h5>
              <p class="card-text">{event.artist_name} <br/> {event.date}</p>
              {/* <a href={eventURL} class="btn btn-primary">See more </a> */}
              <Link to={eventURL} type="button" class="btn btn-primary">See more</Link>
            </div>
          </div>
        </div>
        </>;
    
};

// for (x of results) {
//   Event(x)
// }




export default ShowEvents;