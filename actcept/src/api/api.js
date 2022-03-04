export const fetchEvents = async () => {
  //  const results = await fetch("https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1/events");
  const results = await fetch('https://jt618wc5ik.execute-api.eu-west-2.amazonaws.com/prod/api/events')
  const data = await results.json();
  const filteredData = await data.filter(x => x.status === 'confirmed')
  return filteredData;
};

export const fetchEventData = async (id) => {
  // const url = `2/events`
  const results = await fetch('https://jt618wc5ik.execute-api.eu-west-2.amazonaws.com/prod/api/events')
  // console.log(results)
  const data = await results.json();
  // console.log(`My data ${data}`)
  const newID = Number(id)
  const filteredData = await data.filter((data) => data.event_id === newID)
  return filteredData;
};

export const getRegistrationInfo = async(id) => {
  console.log(`Reg ID ${id}`)
  const newID = Number(id)
  const url = `https://79elonzas5.execute-api.eu-west-2.amazonaws.com/prod/api/get-registration/${newID}`
  const results = await fetch(url)
  const data = await results.json();
  console.log(data)
  return data;
};

export const postRegistrationInfo = async (registrationInfo) => {
  const response = await fetch('https://79elonzas5.execute-api.eu-west-2.amazonaws.com/prod/api/send-registration', {
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
  const  response = await fetch('https://79elonzas5.execute-api.eu-west-2.amazonaws.com/prod/api/send-review', {
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
  const url = `https://79elonzas5.execute-api.eu-west-2.amazonaws.com/prod/api/getallreviews`
  const results = await fetch(url)
  const data = await results.json();
  console.log('getAllReviews has been called')
  console.log(data)
  return data;
}

export const fetchRegistrations = async (id) => {
  const newID = Number(id)
  const results = await fetch(`https://79elonzas5.execute-api.eu-west-2.amazonaws.com/prod/api/get-registration/${newID}`)
  const data = await results.json();
  return data;
};