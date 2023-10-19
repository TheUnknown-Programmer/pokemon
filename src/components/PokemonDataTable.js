import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./styles.css";
import getType from "./GetType";
import CatchingPokemonOutlinedIcon from "@mui/icons-material/CatchingPokemonOutlined";
import Link from "next/link";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "height", headerName: "Height", width: 150 },
  { field: "weight", headerName: "Weight", width: 150 },
  { field: "abilities", headerName: "Abilities", width: 175 },
  {
    field: "types",
    headerName: "Types",
    width: 150,
    renderCell: (params) => params.value.map(changePokemonColorTypes),
  },
  {
    field: "image",
    headerName: <CatchingPokemonOutlinedIcon className="centerIcon" />,
    width: 150,
    renderCell: (params) => (
      <img
        src={
          params.value ||
          "https://thenounproject.com/api/private/icons/640375/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0"
        }
        alt="Pokemon"
        style={{ width: 50, height: 50 }}
      />
    ),
  },
];

function changePokemonColorTypes(type, index, array) {
  const endOfText = index === array.length - 1 ? "" : " ,";
  return <div className={`type-${type.toLowerCase()}`}>{type + endOfText}</div>;
}

const PokemonDataTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const offset = (pageNumber - 1) * 10;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=1292&offset=${offset}`
      );
      const results = response.data.results;
      setTotalRows(response.data.count);
      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          const abilities = detailResponse.data.abilities
            .map((ability) => ability.ability.name)
            .join(", ");
          const typeIdsOrNames = detailResponse.data.types.map(
            (type) => type.type.name
          );
          const types = await Promise.all(
            typeIdsOrNames.map((typeIdOrName) => getType(typeIdOrName))
          );

          return {
            id: detailResponse.data.id,
            name: detailResponse.data.name,
            height: detailResponse.data.height,
            weight: detailResponse.data.weight,
            abilities: abilities,
            types: types,
            image: detailResponse.data.sprites.front_default,
          };
        })
      );
      setPokemonData(pokemonDetails);
    };

    fetchData();
  }, [pageNumber]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(1); // Reset to the first page when searching
  };

  const filteredPokemonData = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />

      <div
        className="pokemon-grid"
        style={{ height: 800, width: "fit-content" }}
      >
        <DataGrid
          rows={filteredPokemonData}
          columns={columns}
          pagination
          checkboxSelection
          onPageChange={(newPageNumber) => setPageNumber(newPageNumber)}
          rowCount={totalRows}
        />
      </div>
      <div className="container-button">
        <Link href="/contact">
          <button className="contact-button">Contact Us</button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonDataTable;
