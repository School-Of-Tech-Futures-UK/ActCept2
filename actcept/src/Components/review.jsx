import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import { postReview } from "../api/api";
import '../App.css';

function Review() {
	const { id } = useParams()
	const [name , setName] = useState('');
	const [email , setEmail] = useState('');
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState('');
	const [message, setMessage] = useState("");


	const getName =(e)=>{
	setName(e.target.value);
	}

	const getEmail =(e)=>{
	setEmail(e.target.value);
	}

    const getRating = (e) => {
        setRating(e.target.value);
    }

    const getReview = (e) => {
        setReview(e.target.value);
    }
	//e.preventDefault();

	const handleSubmit = async (e) => {
		e.preventDefault()
		const res = await postReview({event_id: id, email: email, rating: rating, review_text: review})
		if (res.status === 201) {
			setName('')
			setEmail('')
			setRating(1)
			setReview('')
			setMessage("Your review has been submitted!")
		} else {
			setMessage("Oops, you haven't registered for this event!")
		}
	}

	
return (
	<div className="App">
	<header className="App-header">
	<form onSubmit={(e) => (handleSubmit(e))}>
	<h3> Tell us how it was! </h3>
		<label >
		Name:
		</label><br/>
		<input type="text" value={name} required onChange={(e) => (getName(e))} /><br/>
		<label>
		Email:
		</label><br/>
		<input type="email" value={email} required onChange={(e)=> (getEmail(e))} /><br/>
        <label>
            Rating:
        </label> <br/>
        <select name="rating" id="rating" value={rating} required onChange={(e) => (getRating(e))} >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select> <br/>
        <label> Review </label><br/>
        <textarea type="text" value={review} required onChange={(e) => (getReview(e))} /><br/> <br/>
		<input type="submit" value="Submit"/>
		<div className="message">{message ? <p>{message}</p> : null}</div>
	</form>
	</header>
	</div>
);
}

export default Review;
