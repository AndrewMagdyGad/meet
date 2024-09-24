import React, { useState } from 'react';

// Component to select the number of events
const NumberOfEvents = ({ onNumberChange }) => {
  // State to keep track of the number of events, defaulting to 32
  const [numberOfEvents, setNumberOfEvents] = useState(32); 

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value; // Get the new value from the input
    setNumberOfEvents(value); // Update state with new value
    if (onNumberChange) {
      onNumberChange(value); // Call onNumberChange if passed as prop
    }
  };

  return (
    <div>
      <input
        type="text" //matches the role "textbox"
        id="number-of-events"
        data-testid="number-of-events" // Added data-testid for testing purposes
        value={numberOfEvents} // Bind the input value to the state
        onChange={handleInputChange} // Call handleInputChange on input change
      />
    </div>
  );
};

export default NumberOfEvents; // Export the component for use in other parts of the app
