import React from "react";
import PokemonDataTable from "../components/PokemonDataTable";
import Logo from "../assets/pokemon.png";
import Image from "next/image";

function HomePage() {
  return (
    <div>
      <div className="logo-container">
        <Image src={Logo} alt="Pokémon" className="logo-image" />
      </div>
      <PokemonDataTable />
    </div>
  );
}

export default HomePage;
