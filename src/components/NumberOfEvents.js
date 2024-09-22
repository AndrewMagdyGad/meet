import React, { useState } from 'react';

const NumberOfEvents = ({ onNumberChange }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32); // Default value of 32

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value); // Update state with new value
    if (onNumberChange) {
      onNumberChange(value); // Call onNumberChange if passed as prop
    }
  };

  return (
    <div>
      <input
        type="text" // Changed from "number" to "text" to match the role "textbox"
        id="number-of-events"
        value={numberOfEvents}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
