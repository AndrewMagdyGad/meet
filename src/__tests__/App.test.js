import React, { useState, useEffect } from 'react'; // Import React and hooks
import { getEvents } from './api'; // Import API function to get events
import CitySearch from './CitySearch'; // Import CitySearch component
import NumberOfEvents from './NumberOfEvents'; // Import NumberOfEvents component
import EventList from './EventList'; // Import EventList component
import { extractLocations } from './api'; // Import function to extract locations

const App = () => {
  // State for all event locations
  const [allLocations, setAllLocations] = useState([]);
  // State for the number of events to display
  const [currentNOE, setCurrentNOE] = useState(32);
  // State for the events to be displayed
  const [events, setEvents] = useState([]);
  // State for the currently selected city
  const [currentCity, setCurrentCity] = useState("See all cities"); // Default value for currentCity

  // Fetch data from the API and filter events based on currentCity
  const fetchData = async () => {
    const allEvents = await getEvents(); // Get all events from API
    // Filter events based on currentCity; if it's "See all cities", show all events
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity);
    
    // Set events to display, limiting by currentNOE
    setEvents(filteredEvents.slice(0, currentNOE));
    // Set allLocations based on all events (not filtered)
    setAllLocations(extractLocations(allEvents));
  }

  // Use useEffect to fetch data whenever currentCity changes
  useEffect(() => {
    fetchData(); // Call fetchData function
  }, [currentCity]); // Dependency on currentCity state

  return (
    <div className="App">
      {/* Pass allLocations and setCurrentCity as props to CitySearch component */}
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents /> {/* Render NumberOfEvents component */}
      <EventList events={events} /> {/* Render EventList component with filtered events */}
    </div>
  );
}

export default App; // Export the App component
