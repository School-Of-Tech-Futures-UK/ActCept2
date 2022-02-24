export const fetchEvents = async () => {
  //  const results = await fetch("https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1/events");
  const results = await fetch('http://localhost:3001/events')
  const data = await results.json();
  return data;
};

export const fetchEventData = async (id) => {
  const url = `http://localhost:3001/events/${id}`
  const results = await fetch(url)
  const data = await results.json();
  console.log('fetcheventdata has been called')
  console.log(data)
  return data;
};