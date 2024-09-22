import { render, screen } from '@testing-library/react'; // Import testing utilities
import EventList from '../components/EventList'; // Import the EventList component
import { getEvents } from '../api'; // Import the function to fetch events

describe('<EventList /> component', () => {
  test('has an element with "list" role', () => {
    render(<EventList />); // Render the EventList component
    const list = screen.getByRole("list"); // Get the element with role "list"
    expect(list).toBeInTheDocument(); // Check if the list is in the document
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents(); // Fetch all events
    render(<EventList events={allEvents} />); // Render the EventList with fetched events
    const listItems = screen.getAllByRole("listitem"); // Get all list items
    expect(listItems).toHaveLength(allEvents.length); // Check if the number of list items matches the number of events
  });
});
