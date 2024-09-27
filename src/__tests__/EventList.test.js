import { render, screen } from "@testing-library/react"; // Import testing utilities
import EventList from "../components/EventList"; // Import the EventList component
import App from "../App"; // Import the App component (resolvendo o erro de App não definido)
import { getEvents } from "../api"; // Import the function to fetch events

// Unit tests for EventList component
describe("<EventList /> component", () => {
  test('has an element with "list" role', () => {
    render(<EventList />); // Render the EventList component
    const list = screen.getByRole("list"); // Get the element with role "list"
    expect(list).toBeInTheDocument(); // Check if the list is in the document
  });

  test("renders correct number of events", async () => {
    const allEvents = await getEvents(); // Fetch all events
    render(<EventList events={allEvents} />); // Render the EventList with fetched events
    const listItems = screen.getAllByRole("listitem"); // Get all list items
    expect(listItems).toHaveLength(allEvents.length); // Check if the number of list items matches the number of events
  });
});

// Integration test for EventList in App
describe("<EventList /> integration", () => {
  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    render(<App />); // Render the App component

    // Use screen to access the event list by its role
    const eventList = screen.getByRole("list"); // Get the list element
    const eventItems = await screen.findAllByRole("listitem"); // Wait for all list items

    // Check if the list contains 32 items
    expect(eventItems.length).toBe(32);
  });
});
