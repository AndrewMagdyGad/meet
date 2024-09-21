import { render, screen, fireEvent } from '@testing-library/react'; // Import necessary testing utilities
import Event from '../components/Event'; // Import the Event component to test
import mockData from '../mock-data'; // Import mock event data

describe('Event Component', () => {
  const event = mockData[0]; // Mock data for a single event

  // Test to check if the event title renders correctly
  test('renders event title correctly', () => {
    render(<Event event={event} />); // Render the Event component with mock data
    expect(screen.queryByText(event.summary)).toBeInTheDocument(); // Check for event title in the document
  });

  // Test to check if the event start time renders correctly
  test('renders event start time correctly', () => {
    // Use the same logic as in the component to get the start time
    const startTime = new Date(event.start.dateTime).toLocaleString('en-US', {
      timeZone: event.start.timeZone, // Use the time zone from the event
    });

    render(<Event event={event} />); // Render the Event component
    // Check if the formatted start time is in the document
    expect(screen.queryByText(startTime)).toBeInTheDocument(); 
  });

  // Test to check if the event location renders correctly
  test('renders event location correctly', () => {
    render(<Event event={event} />); // Render the Event component
    expect(screen.queryByText(event.location)).toBeInTheDocument(); // Check for event location in the document
  });

  // Test to check if the details button renders with the correct text
  test('renders event details button with the title "Show details"', () => {
    render(<Event event={event} />); // Render the Event component
    expect(screen.queryByText('Show details')).toBeInTheDocument(); // Check for details button in the document
  });

  // Test to ensure that the event details section is hidden by default
  test("by default, event's details section should be hidden", () => {
    render(<Event event={event} />); // Render the Event component
    const details = screen.queryByText('About the event:'); // Query for the details section
    expect(details).not.toBeInTheDocument(); // Expect details to be hidden initially
  });

  // Test to check that details are shown when the button is clicked
  test("shows details section when user clicks on 'Show details' button", () => {
    render(<Event event={event} />); // Render the Event component
    fireEvent.click(screen.getByText('Show details')); // Simulate click to show details
    expect(screen.getByText('About the event:')).toBeInTheDocument(); // Check if details are now visible
  });

  // Test to ensure that details are hidden again when the button is clicked
  test("hides details section when user clicks on 'Hide details' button", () => {
    render(<Event event={event} />); // Render the Event component
    fireEvent.click(screen.getByText('Show details')); // First, show the details
    fireEvent.click(screen.getByText('Hide details')); // Then, hide them
    const details = screen.queryByText('About the event:'); // Query for the details section
    expect(details).not.toBeInTheDocument(); // Check if details are hidden again
  });
});
