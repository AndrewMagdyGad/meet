// Import the main CSS file for the App component
import './App.css';

// Define the App component as a functional component using an arrow function
const App = () => {
  // Return the JSX that describes the UI structure
  return (
    <div className="App">
      {/* This div will contain the list of events */}
      <div id="event-list"></div>
    </div>
  );
};

// Export the App component to make it available for import in other files
export default App;
