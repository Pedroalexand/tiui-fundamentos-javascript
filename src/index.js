import axios, { AxiosResponse } from 'axios';

const API = 'https://rickandmortyapi.com/api/character/';

interface Character {
  id: number;
  name: string;
  origin: {
    url: string;
  };
}

interface ApiResponse {
  info: {
    count: number;
  };
  results: Character[];
}

const fetchData = async (url: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
};

const main = async () => {
  try {
    console.log('Primer Llamado...');
    const firstResponse: ApiResponse = await fetchData(API);
    const characterId: number = firstResponse.results[0].id;

    console.log('Segundo Llamado...');
    const secondResponse: Character = await fetchData(`${API}${characterId}`);

    console.log('Tercer Llamado...');
    const thirdResponse: { dimension: string } = await fetchData(secondResponse.origin.url);

    console.log(`Personajes: ${firstResponse.info.count}`);
    console.log(`Primer Personaje: ${secondResponse.name}`);
    console.log(`Dimensión: ${thirdResponse.dimension}`);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
};

main();

