import axios from 'axios';

const getType = async (idOrName) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${idOrName}/`);
    return response.data.name;
  } catch (error) {
    console.error('Error fetching type data: ', error);
    return 'Unknown Type';
  }
};

export default getType;
