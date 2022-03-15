import { useEffect, useState } from "react";
import ShowEvents  from "./event";

const Filtering = ({events}) => { 
  const [sortingCategory, setSort] = useState('artist_name')
    
    function sortSelect(e){
        setSort(e.target.value)
        console.log('SORTSELECT CALLED')
    }

    const sortEvent = (a, b) => {
        let fa = a.event_name.toLowerCase(),
            fb = b.event_name.toLowerCase();

        if (fa < fb) {
                return -1;
        }
            if (fa > fb) {
            return 1;
        }
            return 0;
    };

    const sortArtist = (a, b) => {
        let fa = a.artist_name.toLowerCase(),
            fb = b.artist_name.toLowerCase();
        
        if (fa < fb) {
                return -1;
        }
            if (fa > fb) {
                return 1;
        }
            return 0;
    };
        
    const sortGenre = (a, b) => {
        let fa = a.genre.toLowerCase(),
            fb = b.genre.toLowerCase();

        if (fa < fb) {
            return -1;
        }
            if (fa > fb) {
            return 1;
        }
            return 0;
    };

    const sortVenue = (a, b) => {
        let fa = a.venue_name.toLowerCase(),
            fb = b.venue_name.toLowerCase();

        if (fa < fb) {
                return -1;
        }
            if (fa > fb) {
            return 1;
        }
            return 0;
    };

    const sortDate = (a, b) => {
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
    else if (sortingCategory === 'genre'){
        events.sort(sortGenre)
        console.log(events)
        }
    else if (sortingCategory === 'venue'){
        events.sort(sortVenue)
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

    
    const sortedEvents = events.filter(entry => Object.values(entry).some(val => typeof val === "string" && !val.includes('https') && val.toLowerCase().includes(search.toLowerCase())));
    events = sortedEvents
    
        // useEffect(() => {
        //     console.log(search)
        //     }, [search]);

    return (<>
        <div class="searchWrapper">
            <div class="searchChildWrapper">
                <p>Search  </p>
                <input id="searchBar" type="text" placeholder="" value={search} required onChange={(e) => (getSearch(e))} />
            </div>
            <div class="searchChildWrapper">
                <p>Sort by:</p>
                    <select onChange={sortSelect}>
                        <option value = 'artist_name'>Artist Name</option>
                        <option value = 'event_name'>Event Name</option>
                        <option value = 'genre'>Genre</option>
                        <option value = 'venue'>Venue Name</option>
                        <option value = 'date'>Date</option>
                    </select>
            </div>
        </div>
            <div class="eventWrapper"> 
            <ShowEvents events={events}/>
            </div>
        </>)

  }


export default Filtering;

