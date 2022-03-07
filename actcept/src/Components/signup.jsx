import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { postRegistrationInfo, getRegistrationInfo, fetchEventData } from "../api/api";
import '../App.css';

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
		const duplicate = await getRegistrationInfo(id)
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

	return (
		<>
			<div style={{ backgroundColor: '#282c34' }}>
				<Link type="button" to={`/event-page/${id}`} class="btn btn-primary"> ← Back </Link>
			</div>
			<div className="App">
				<header className="App-header">

					<h3>Sign up for</h3>
					<h1> {eventData[0].event_name} </h1>
					<form class="form-group" onSubmit={handleSubmit}>
						<label >
							Name:
						</label><br />
						<input type="text" class="form-control input-sm" value={name} required onChange={(e) => (getName(e))} />
						<label>
							Email:
						</label><br />
						<input type="email" class="form-control input-sm" value={email} required onChange={(e) => (getEmail(e))} />
						<input class="btn btn-primary" type="submit" value="Book Now" />
						<div className="message">{message ? <p>{message}</p> : null}</div>
					</form>
				</header>
			</div>
		</>
	);
}

export default UserDetails;
