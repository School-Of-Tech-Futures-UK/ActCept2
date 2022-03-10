export const fetchEvents = async () => {
  //  const results = await fetch("https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1/events");
  const results = await fetch('https://events.sotf2022-01.com/api/events')
  const data = await results.json();
  const filteredData = await data.filter(x => x.status === 'confirmed')
  return filteredData;
};

export const fetchEventData = async (id) => {
  // const url = `2/events`
  const results = await fetch('https://events.sotf2022-01.com/api/events')
  // console.log(results)
  const data = await results.json();
  // console.log(`My data ${data}`)
  const newID = Number(id)
  const filteredData = await data.filter((data) => data.event_id === newID)
  return filteredData;
};

export const fetchVenueData = async (id) => {
  // const url = `2/events`
  const results = await fetch('https://venues.sotf2022-01.com/api/venue_info')
  // console.log(results)
  const data = await results.json();
  // console.log(`My data ${data}`)
  const newID = Number(id)
  const filteredData = await data.filter((data) => data.venue_id === newID)
  return filteredData;
};

export const getRegistrationInfo = async() => {
  const url = `https://bookings.sotf2022-01.com/api/get-registration`
  const results = await fetch(url)
  const data = await results.json();
  console.log(`These are the reg ${data}`)
  return data;
};

export const postRegistrationInfo = async (registrationInfo) => {
  const response = await fetch('https://bookings.sotf2022-01.com/api/send-registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationInfo)
  })
  const resJSON = await response.text()
  return response
}

export const postReview = async (review) => {
  const  response = await fetch('https://bookings.sotf2022-01.com/api/send-review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  })
  const resJSON = await response.text()
  return response
}

export const getAllReviews = async () => {
  const url = `https://bookings.sotf2022-01.com/api/getallreviews`
  const results = await fetch(url)
  const data = await results.json();
  // console.log('getAllReviews has been called')
  // console.log(data)
  return data;
}

export const fetchRegistrations = async (id) => {
  const newID = Number(id)
  const results = await fetch(`https://bookings.sotf2022-01.com/api/get-registration/${newID}`)
  const data = await results.json();
  return data;
};



export const deleteRegistration = async (id) => {
  const newID = Number(id)
  const  response = await fetch(`https://bookings.sotf2022-01.com/api/delete-registration/${newID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const resJSON = await response.text()
  return response
}

export const deleteReview = async (id) => {
  const newID = Number(id)
  const  response = await fetch(`https://bookings.sotf2022-01.com/api/delete-review/${newID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const resJSON = await response.text()
  return response
}