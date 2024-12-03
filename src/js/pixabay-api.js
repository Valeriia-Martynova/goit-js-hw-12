import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "47343859-71412f3a0c5519c6640fc8f75";

export async function fetchImages(query, page = 1, perPage = 30) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching images');
  }
}