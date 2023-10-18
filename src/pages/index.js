import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'height', headerName: 'Height', width: 150 },
  { field: 'weight', headerName: 'Weight', width: 150 },
];

const PokemonDataTable = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100') // Limiting to 100 for demo purposes
      .then(response => {
        const results = response.data.results;
        const fetchData = async () => {
          const data = await Promise.all(results.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return {
              id: pokemonDetails.data.id,
              name: pokemonDetails.data.name,
              height: pokemonDetails.data.height,
              weight: pokemonDetails.data.weight,
            };
          }));
          setPokemonData(data);
        };
        fetchData();
      })
      .catch(error => {
        console.error('Error fetching Pokemon data: ', error);
      });
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={pokemonData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        pagination
        checkboxSelection
      />
    </div>
  );
};

export default PokemonDataTable;
