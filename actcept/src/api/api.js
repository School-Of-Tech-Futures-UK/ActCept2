export const fetchEvents = async () => {
  // const results = await fetch("https://zuttio2meg.execute-api.eu-west-2.amazonaws.com/sprint1/fruits");
  const results = await fetch('http://localhost:3000/pupils/1')
  const data = await results.text();
  return data;
};