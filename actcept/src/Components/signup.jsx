import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import '../App.css';

function UserDetails() {
	const [name , setName] = useState('');
	const [email , setEmail] = useState('');


	const getName =(e)=>{
	setName(e.target.value);
	}

	const getEmail =(e)=>{
	setEmail(e.target.value);
	}

	//e.preventDefault();

	
return (
	<div className="App">
	<header className="App-header">
	<form >
        {/* <onSubmit={(e) => {handleSubmit(e)}}> */}

	<h3> Sign up for the event </h3>
		<label >
		Name:
		</label><br/>
		<input type="text" value={name} required onChange={(e) => (getName(e))} /><br/>
		<label>
		Email:
		</label><br/>
		<input type="email" value={email} required onChange={(e)=> (getEmail(e))} /><br/>
		<input type="submit" value="Submit"/>
	</form>
	</header>
	</div>
);
}

export default UserDetails;
