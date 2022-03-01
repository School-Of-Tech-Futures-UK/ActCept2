import { useEffect, useState } from "react";
import ShowEvents  from "./event";

const Filtering = ({events}) => { 
  const [sortingCategory, setSort] = useState('artist_name')
    
    function sortSelect(e){
        setSort(e.target.value)
        console.log('SORTSELECT CALLED')
    }

    const sortEvent = (a, b) => {
        console.log('SORTING')
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
        console.log('SORTING')
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
        console.log('SORTING')
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
        console.log('SORTING')
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

    const sortDate = (a, b) => {
        console.log('SORTING')
        let fa = a.date,
            fb = b.date;

        if (fa < fb) {
                return -1;
        }
            if (fa > fb) {
            return 1;
        }
            return 0;
    };

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
    else if (sortingCategory === 'date'){
        events.sort(sortDate)
        console.log(events)
        }

    // const { id } = useParams()
    const [search , setSearch] = useState('');
    
    const getSearch =(e)=>{
        setSearch(e.target.value);
        }

    
    const filtered = events.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.toLowerCase().includes(search.toLowerCase())));
    events = filtered
    
        // useEffect(() => {
        //     console.log(search)
        //     }, [search]);

    return (
        <div class="flexWrapper">
                <p>Search</p>
                <input type="text" value={search} required onChange={(e) => (getSearch(e))} />
                <p>Sort by:</p>
                <select onChange={sortSelect}>
                    <option value = 'artist_name'>Artist Name</option>
                    <option value = 'event_name'>Event Name</option>
                    <option value = 'type_of_event'>Genre</option>
                    <option value = 'location'>Location</option>
                    <option value = 'date'>Date</option>
                </select>
                <div> 
                <ShowEvents events={events}/>
                </div>
        </div>
    )

  }


export default Filtering;

