import React from 'react';
import PokemonDataTable from '../components/PokemonDataTable';
import ContactForm from './contactForm/ContactForm';

function HomePage() {
  return (
    <div>
      <div className="logo-container">
        <img src='https://assets.stickpng.com/images/612ce4761b9679000402af1c.png' alt="Pokémon" className="logo-image" />
      </div>
      <PokemonDataTable />
      <ContactForm />
      
    </div>
  );
}

export default HomePage;
