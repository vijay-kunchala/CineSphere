// ottApi.js

import axios from 'axios';

const fetchOttDetails = async (imdbId) => {
  try {
    const response = await axios.get('https://ott-details.p.rapidapi.com/gettitleDetails', {
      params: { imdbid: imdbId },
      headers: {
        'x-rapidapi-key': '2ae1ca44e6msh5bc7c263525f03ep1cc412jsnb2b27dec86d0',
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