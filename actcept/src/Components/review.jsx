import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import { postReview, fetchRegistrations, getAllReviews, fetchEventData } from "../api/api";
import '../App.css';

function Review() {
	const { id } = useParams()
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [rating, setRating] = useState(1);
	const [review, setReview] = useState('');
	const [message, setMessage] = useState("");
	const [eventData, setEventData] = useState('');


	const getName = (e) => {
		setName(e.target.value);
	}

	const getEmail = (e) => {
		setEmail(e.target.value);
	}

	const getRating = (e) => {
		setRating(e.target.value);
	}

	const getReview = (e) => {
		setReview(e.target.value);
	}
	//e.preventDefault();
	useEffect(() => {
		fetchEventData(id).then(setEventData);
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault()
		const registrations = await fetchRegistrations(id)
		const newData = registrations.filter((data) => data.user_email === email)
		const review_data = await getAllReviews()
		let regID, alreadyReviewed
		if (newData.length !== 0) {
			regID = newData[0].registration_id
			alreadyReviewed = review_data.filter((data) => data.registration_id === regID)
			if (alreadyReviewed.length !== 0) {
				setName('')
				setEmail('')
				setRating(1)
				setReview('')
				setMessage(`Looks like you have already reviewed this event!`)
			}
			const res = await postReview({ event_id: id, email: email, rating: rating, review_text: review })
			if (res.status === 201) {
				setName('')
				setEmail('')
				setRating(1)
				setReview('')
				setMessage("Your review has been submitted!")
			}
			else {
				setMessage("Oops, there is some error!")
			}
		}

		else {
			setName('')
			setEmail('')
			setRating(1)
			setReview('')
			setMessage(`Looks like you haven't registered for this event!`)

		}


	}
	if (eventData.length === 0) {
		return (
			<div>Loading...</div>
		)
	}


	return (
		<><div style={{ backgroundColor: '#282c34' }}>
			<Link type="button" to={`/event-page/${id}`} class="btn btn-primary"> ← Back </Link>
		</div><div className="App">
				<header className="App-header">
					<form onSubmit={(e) => (handleSubmit(e))}>
						<h3> Leave a review for </h3>
						<h1>{eventData[0].event_name}</h1>
						<label>
							Name:
						</label><br />
						<input type="text" value={name} required onChange={(e) => (getName(e))} /><br />
						<label>
							Email:
						</label><br />
						<input type="email" value={email} required onChange={(e) => (getEmail(e))} /><br />
						<label>
							Rating:
						</label> <br />
						<select name="rating" id="rating" value={rating} required onChange={(e) => (getRating(e))}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select> <br />
						<label> Review </label><br />
						<textarea type="text" value={review} required onChange={(e) => (getReview(e))} /><br /> <br />
						<input type="submit" value="Leave a review" />
						<div className="message">{message ? <p>{message}</p> : null}</div>
					</form>
				</header>
			</div></>
	);
}

export default Review;
