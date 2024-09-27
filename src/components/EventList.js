import React from 'react';

const EventList = ({ events }) => {
  return (
    <ul id="event-list" aria-label="event list"> {/* Add aria-label here */}
      {events.map((event) => (
        <li key={event.id} role="listitem">
          {event.name}
        </li>
      ))}
    </ul>
  );
};

export default EventList;
