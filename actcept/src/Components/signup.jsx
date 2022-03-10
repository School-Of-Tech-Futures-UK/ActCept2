import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { postRegistrationInfo, fetchRegistrations, fetchEventData} from "../api/api";
import '../App.css';
import { BsChevronLeft } from "react-icons/bs";

function UserDetails() {
	const { id } = useParams();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [eventData, setEventData] = useState('');

	const getName = (e) => {
		setName(e.target.value);
	}

	const getEmail = (e) => {
		setEmail(e.target.value);
	}

	useEffect(() => {
		fetchEventData(id).then(setEventData);
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault()
		const duplicate = await fetchRegistrations(id)
		console.log(`this is my ${id}`)
		console.log(duplicate)
		const newData = duplicate.filter((data) => data.user_email === email)
		if (newData.length === 0) {
			const res = await postRegistrationInfo({ name: name, user_email: email, event_id: id })
			if (res.status === 201) {
				setName('')
				setEmail('')
				setMessage("Successfully registered, thanks!")
			}
		}
		else {
			setName('')
			setEmail('')
			setMessage("Looks like you've already registered for this event!")
		}
	}
	if (eventData.length === 0) {
		return (
			<div>Loading...</div>
		)
	}

	return (<>
		<div class="backgroundProperties">
			<Link type="button" to={`/event-page/${id}`} class="returnButton"><BsChevronLeft /> Return to event</Link>
			<div id="eventTicketFlex">
				<div id="eventTicketInput">
				<h3>Your ticket to <strong> {eventData[0].event_name} </strong> </h3>
				<h5>{eventData[0].artist_name} at {eventData[0].venue_name}</h5>
						<form class="form-group" onSubmit={handleSubmit}>
							<label >
								Name:
							</label>
							<input type="text" class="form-control input-sm" value={name} required onChange={(e) => (getName(e))} />
							<label>
								Email:
							</label>
							<input type="email" class="form-control input-sm" value={email} required onChange={(e) => (getEmail(e))} />
							<input class="btn btn-primary" type="submit" value="Book Now" />
							<div className="message">{message ? <p>{message}</p> : null}</div>
						</form>
				</div>
				{/* <div id="eventTicketImage" media="screen and (max-width: 800px)"></div> */}
				<div id="eventTicketImage" media="screen and (min-width: 800px)"></div>
			</div>
			<div><br/><br/></div>
		</div>
		</>
	);
}

export default UserDetails;
			// <div className="App">
			// 	<header className="App-header">

			// 		<h3>Sign up for</h3>
			// 		<h1> {eventData[0].event_name} </h1>
			// 		<form class="form-group" onSubmit={handleSubmit}>
			// 			<label >
			// 				Name:
			// 			</label><br />
			// 			<input type="text" class="form-control input-sm" value={name} required onChange={(e) => (getName(e))} />
			// 			<label>
			// 				Email:
			// 			</label><br />
			// 			<input type="email" class="form-control input-sm" value={email} required onChange={(e) => (getEmail(e))} />
			// 			<input class="btn btn-primary" type="submit" value="Book Now" />
			// 			<div className="message">{message ? <p>{message}</p> : null}</div>
			// 		</form>
			// 	</header>
			// </div>