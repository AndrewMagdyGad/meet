import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import './App.css';

// Main application component
const App = () => {
  return (
    <div className="App">
      {/* Render the CitySearch component */}
      <CitySearch />
      {/* Render the EventList component */}
      <EventList />
    </div>
  );
}

export default App;
