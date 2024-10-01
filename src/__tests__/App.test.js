import React, { useState, useEffect } from 'react';
import { getEvents, extractLocations } from './api';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventList from './EventList';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities"
        ? allEvents
        : allEvents.filter(event => event.location === currentCity);
      
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));
    };

    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} /> {/* Agora usando setCurrentNOE */}
      <EventList events={events} />
    </div>
  );
}

export default App;
