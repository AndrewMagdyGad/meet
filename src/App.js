import { useEffect, useState, useCallback } from 'react'; // Import React hooks
import CitySearch from './components/CitySearch'; // Import CitySearch component
import EventList from './components/EventList'; // Import EventList component
import NumberOfEvents from './components/NumberOfEvents'; // Import NumberOfEvents component
import { getEvents } from './api'; // Import the API function to fetch events
import './App.css'; // Import the main CSS file for styling

// Main application component
const App = () => {
  // State to store the list of events fetched from the API
  const [events, setEvents] = useState([]); // Initially an empty array of events
  
  // State to store the current number of events to display, default is 32
  const [currentNOE, setCurrentNOE] = useState(32); // Default number of events to show is 32

  /**
   * Function to fetch events data from the API.
   * Wrapped in useCallback to avoid re-creating the function on every render.
   * This function will fetch all events and then set only the first 'currentNOE' events.
   */
  const fetchData = useCallback(async () => {
    const allEvents = await getEvents(); // Fetch all events from the API
    setEvents(allEvents.slice(0, currentNOE)); // Set the events to display based on currentNOE
  }, [currentNOE]); // The function depends on 'currentNOE', so it will re-run when it changes

  /**
   * useEffect hook to call fetchData when the component is mounted or when 'currentNOE' changes.
   * This ensures that the list of events is fetched either on mount or when the user changes the number of events to display.
   */
  useEffect(() => {
    fetchData(); // Call fetchData to get the initial set of events
  }, [fetchData]); // Dependency array includes 'fetchData' to avoid the linting warning

  return (
    <div className="App">
      {/* Render the CitySearch component */}
      <CitySearch />

      {/* Render the NumberOfEvents component, passing the current number of events and the setter */}
      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />

      {/* Render the EventList component, passing the list of fetched events */}
      <EventList events={events} />
    </div>
  );
};

export default App;
