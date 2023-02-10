import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addPerson = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const deletePerson = personId => {
  console.log("url to delete from: ", `${baseUrl}/${personId}`);
  const request = axios.delete(`${baseUrl}/${personId}`)
  return request.then(response => response.status)
}

export default { getPersons, addPerson, deletePerson }