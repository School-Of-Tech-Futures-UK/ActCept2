import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import { postReview, fetchRegistrations, getAllReviews, fetchEventData } from "../api/api";
import '../App.css';
import { BsChevronLeft } from "react-icons/bs";


function Review() {
	const { id } = useParams()
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [rating, setRating] = useState(1);
	const [review, setReview] = useState('');
	const [message, setMessage] = useState("");
	const [eventData, setEventData] = useState('');

	const navigate = useNavigate();

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


	return (<>
	<div class="backgroundProperties">
			<Link type="button" to={`/event-page/${id}`} class="returnButton"><BsChevronLeft/>Return to event</Link>
			<div id="eventTicketFlex">
				<div id="eventTicketInput">
				<h3>What did you think of<strong> {eventData[0].event_name}</strong>?</h3>
				<h5>{eventData[0].artist_name} at {eventData[0].venue_name}</h5>
					<form onSubmit={(e) => (handleSubmit(e))}>
							<label>
								Name:
							</label><br />
							<input type="text" class="form-control input-sm" value={name} required onChange={(e) => (getName(e))} />
							<label>
								Email:
							</label><br />
							<input type="email" class="form-control input-sm" value={email} required onChange={(e) => (getEmail(e))} />
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
							<textarea type="text" class="form-control input-sm" value={review} required onChange={(e) => (getReview(e))} />
							<input type="submit" class="btn btn-primary" value="Leave a review" />
							<div className="message">{message ? <p>{message}</p> : null}</div>
						</form>
				</div>
			</div>
			<div><br/><br/></div>
	</div>
	</>
	);
}

export default Review;
