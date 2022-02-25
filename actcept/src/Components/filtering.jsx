import { useEffect, useState } from "react";
import ShowEvents  from "./event";


let counter = 0
const Filtering = ({events}) => { 
  
  const [sortingCategory, setSort] = useState('artist_name')

  function sortSelect(e){
    setSort(e.target.value)
    console.log(sortingCategory)
    counter++
  }

useEffect(() => {
    if (sortingCategory === 'artist_name'){
        events.sort(sortArtist)
        console.log(events)
        }
    else if (sortingCategory === 'type_of_event'){
        events.sort(sortGenre)
        console.log(events)
        }
    else if (sortingCategory === 'location'){
        events.sort(sortLocation)
        console.log(events)
        }
    else if (sortingCategory === 'event_name'){
        events.sort(sortEvent)
        console.log(events)
        }
    console.log('trying to re render')
},[counter])

const sortEvent = (a, b) => {
    let fa = a.event_name,
        fb = b.event_name;

if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
    return 1;
    }
    return 0;
    };
const sortArtist = (a, b) => {
let fa = a.artist_name,
    fb = b.artist_name;
    
     if (fa < fb) {
             return -1;
         }
         if (fa > fb) {
             return 1;
         }
         return 0;
         };
    
const sortGenre = (a, b) => {
    let fa = a.type_of_event,
        fb = b.type_of_event;

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
    return 1;
}
    return 0;
    };

const sortLocation = (a, b) => {
    let fa = a.location,
        fb = b.location;

if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
    return 1;
    }
    return 0;
    };

  return (
    <div>
    <div class="flexWrapper">
    <p>Sort by:</p>
    <select onChange={sortSelect}>
        <option value = 'artist_name'>artist_name</option>
        <option value = 'event_name'>event_name</option>
        <option value = 'type_of_event'>type_of_event</option>
        <option value = 'location'>location</option>
        <option>date</option>
  </select>
  </div> 
  <ShowEvents events={events}/>
  </div>     
  )
  }


export default Filtering;

