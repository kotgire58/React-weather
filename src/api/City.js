import axios from "axios";

export async function SearchCity(text) {
    const options = {
  method: 'GET',
  url: 'https://ai-weather-by-meteosource.p.rapidapi.com/find_places',
  params: {
    text,
    language: 'en'
  },
  headers: {
    'x-rapidapi-key': 'a5dc29c8a0msh85cc0a0b75f90ffp11e411jsn4bcb4c68924a',
    'x-rapidapi-host': 'ai-weather-by-meteosource.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	return response.data ;
} catch (error) {
	console.error(error);
}
}

export default SearchCity