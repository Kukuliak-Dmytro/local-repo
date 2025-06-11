import axios from 'axios'

export default async function getJoke() {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke',
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
    )
    return response.data;
  } catch (error) {
    console.error('Error fetching joke:', error);
    throw error; // rethrow so the caller can handle it
  }
}