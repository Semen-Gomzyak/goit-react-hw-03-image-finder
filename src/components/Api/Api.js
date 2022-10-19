import axios from 'axios';
const API_KEY = '29686062-6a845a2f1faff990e4be6d419';

export const fetchImages = async (queryString, page) => {
  const respons = await axios(
    `https://pixabay.com/api/?q=${queryString}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return respons.data.hits;
};
