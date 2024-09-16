// Import the EventList component from the components directory
import EventList from './components/EventList';
// Import the main CSS file for styling the App component
import './App.css';

// Define the App component using an arrow function
const App = () => {
  // Return the JSX structure, with the EventList component inside a div with class "App"
  return (
    <div className="App">
      {/* Render the EventList component */}
      <EventList />
    </div>
  );
}

// Export the App component so it can be imported and used in other parts of the application
export default App;
