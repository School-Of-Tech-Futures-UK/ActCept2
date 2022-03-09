import e from "cors";
import { useEffect, useState } from "react";
import { getRegistrationInfo, fetchEvents } from "../api/api";
import ShowEvents from "./event";

const getRegisteredEventsInfo = async (email) => {
    const allRegistrations = await getRegistrationInfo()
    const eventRegistered = allRegistrations.filter(e => e.user_email === email)
    const allEvents = await fetchEvents()
    const registeredEventsInfo = allEvents.filter(e1 => eventRegistered.some(e2 => e2.event_id === e1.event_id))
    return registeredEventsInfo
}

const MyEventPage = () => {
    const [email, setEmail] = useState('');
    const [registeredEventsInfo, setRegisteredEventsInfo] = useState([])

    // useEffect(() => {
    //     getRegisteredEventsInfo(email).then(setRegisteredEventsInfo)
    // }, [email])


    const handleSubmit = (e) => { 
        e.preventDefault()
        getRegisteredEventsInfo(email).then(setRegisteredEventsInfo)
        
     }
    const getEmail = (e) => { setEmail(e.target.value) }
    return (
        <>
            <form class="form-group" onSubmit={handleSubmit}>
                <label>
                    Email:
                </label>
                <input type="email" class="form-control input-sm" value={email} required onChange={(e) => (getEmail(e))} />
                <input class="btn btn-primary" type="submit" value="Search" />
            </form>
            <ShowEvents events={registeredEventsInfo} />
        </>
    )
}

export default MyEventPage;