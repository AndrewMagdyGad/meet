import { render, screen } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event'; 
import Event from '../components/Event'; 
import mockData from '../mock-data'; 

describe('Event Component', () => {
  const event = mockData[0]; 

  test('renders event title correctly', () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.summary)).toBeInTheDocument(); 
  });

  test('renders event start time correctly', () => {
    const startTime = new Date(event.start.dateTime).toLocaleString('en-US', {
      timeZone: event.start.timeZone,
    });

    render(<Event event={event} />);
    
    expect(screen.getByText((content, element) => {
      return element?.textContent.includes(startTime);
    })).toBeInTheDocument(); 
  });

  test('renders event location correctly', () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.location)).toBeInTheDocument(); 
  });

  test('renders event details button with the title "Show details"', () => {
    render(<Event event={event} />);
    expect(screen.getByText('Show details')).toBeInTheDocument(); 
  });

  test("by default, event's details section should be hidden", () => {
    render(<Event event={event} />);
    expect(screen.queryByText('About the event:')).not.toBeInTheDocument(); 
  });

  test("shows details section when user clicks on 'Show details' button", async () => {
    render(<Event event={event} />);
    await userEvent.click(screen.getByText('Show details')); 
    expect(screen.getByText('About the event:')).toBeInTheDocument(); 
  });

  test("hides details section when user clicks on 'Hide details' button", async () => {
    render(<Event event={event} />);
    await userEvent.click(screen.getByText('Show details')); 
    await userEvent.click(screen.getByText('Hide details')); 
    expect(screen.queryByText('About the event:')).not.toBeInTheDocument(); 
  });
});
