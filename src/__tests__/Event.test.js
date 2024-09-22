import { render, screen } from '@testing-library/react'; // Import necessary testing utilities
import userEvent from '@testing-library/user-event'; // Import userEvent for simulating user interactions
import Event from '../components/Event'; // Import the Event component to test
import mockData from '../mock-data'; // Import mock event data

describe('Event Component', () => {
  const event = mockData[0]; // Mock data for a single event

  test('renders event title correctly', () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.summary)).toBeInTheDocument(); // Use getByText to check presence
  });

  test('renders event start time correctly', () => {
    const startTime = new Date(event.start.dateTime).toLocaleString('en-US', {
      timeZone: event.start.timeZone,
    });

    render(<Event event={event} />);
    expect(screen.getByText(startTime)).toBeInTheDocument(); // Use getByText to check presence
  });

  test('renders event location correctly', () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.location)).toBeInTheDocument(); // Use getByText to check presence
  });

  test('renders event details button with the title "Show details"', () => {
    render(<Event event={event} />);
    expect(screen.getByText('Show details')).toBeInTheDocument(); // Use getByText to check presence
  });

  test("by default, event's details section should be hidden", () => {
    render(<Event event={event} />);
    expect(screen.queryByText('About the event:')).not.toBeInTheDocument(); // Keep queryByText for absence
  });

  test("shows details section when user clicks on 'Show details' button", async () => {
    render(<Event event={event} />);
    await userEvent.click(screen.getByText('Show details')); // Use userEvent for async click
    expect(screen.getByText('About the event:')).toBeInTheDocument(); // Use getByText to check presence
  });

  test("hides details section when user clicks on 'Hide details' button", async () => {
    render(<Event event={event} />);
    await userEvent.click(screen.getByText('Show details')); // Show details first
    await userEvent.click(screen.getByText('Hide details')); // Then hide them
    expect(screen.queryByText('About the event:')).not.toBeInTheDocument(); // Keep queryByText for absence
  });
});
