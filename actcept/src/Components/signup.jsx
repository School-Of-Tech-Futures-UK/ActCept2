import { useState } from "react";
import { useParams } from "react-router-dom";
import { postRegistrationInfo } from "../api/api";
import '../App.css';

function UserDetails() {
	const { id } = useParams()
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState("");

	const getName = (e) => {
		setName(e.target.value);
	}

	const getEmail = (e) => {
		setEmail(e.target.value);
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const res = await postRegistrationInfo({ name: name, user_email: email, event_id: id })
		if (res.status === 201) {
			setName('')
			setEmail('')
			setMessage("Successfully registered, thanks!")
		} else if(res.status === 301){
			setMessage("Looks like you've already registered for this event!")
		}
		else {
			setMessage("Oops! Some error occured")
		}
	}
	
return (
		<div className="App">
			<header className="App-header">
				<form onSubmit={handleSubmit}>
					<h3> Sign up for the event </h3>
					<label >
						Name:
					</label><br />
					<input type="text" value={name} required onChange={(e) => (getName(e))} /><br />
					<label>
						Email:
					</label><br />
					<input type="email" value={email} required onChange={(e) => (getEmail(e))} /><br />
					<input type="submit" value="Submit"/>
					<div className="message">{message ? <p>{message}</p> : null}</div>
				</form>
			</header>
		</div>
	);
}

export default UserDetails;
