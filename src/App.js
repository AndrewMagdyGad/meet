import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'; // Importando o componente
import './App.css';

// Main application component
const App = () => {
  return (
    <div className="App">
      {/* Render the NumberOfEvents component */}
      <NumberOfEvents /> 
      {/* Render the CitySearch component */}
      <CitySearch />
      {/* Render the EventList component */}
      <EventList />
    </div>
  );
}

export default App;
