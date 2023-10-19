import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import HomePage from './HomePage';
import ContactForm from './pages/contactForm/ContactForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contact" component={ContactForm} />
        <Route path="/" component={HomePage} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
