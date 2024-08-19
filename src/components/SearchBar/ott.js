// ottApi.js

import axios from 'axios';

const fetchOttDetails = async (imdbId) => {
  try {
    const response = await axios.get('https://ott-details.p.rapidapi.com/gettitleDetails', {
      params: { imdbid: imdbId },
      headers: {
        'x-rapidapi-key': 'ddd234b609msh1b2b7ed8a04c2c8p13f898jsna0f3045171cd',
        'x-rapidapi-host': 'ott-details.p.rapidapi.com'
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching OTT details for IMDB ID ${imdbId}:`, error);
    return null;
  }
};

export default fetchOttDetails;