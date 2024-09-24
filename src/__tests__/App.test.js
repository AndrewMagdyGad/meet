import { render, screen } from '@testing-library/react'; // Import necessary testing utilities
import App from '../App'; // Import the App component

describe('<App /> component', () => {
  // Test to check if the event list is rendered correctly
  test('renders list of events', () => {
    render(<App />); // Render the App component
    // Check if the event list is present in the document
    expect(screen.getByRole('list')).toBeInTheDocument(); // Use getByRole for the event list
  });

  // Test to check if the CitySearch component is rendered correctly
  test('renders CitySearch', () => {
    render(<App />); // Render the App component
    // Check if the CitySearch component is present in the document using data-testid
    expect(screen.getByTestId('city-search')).toBeInTheDocument(); // Check if CitySearch is in the document
  });

  // New test to check if the NumberOfEvents component is rendered correctly
  test('renders NumberOfEvents', () => {
    render(<App />); // Render the App component
    // Check if the NumberOfEvents component is present in the document using data-testid
    expect(screen.getByTestId('number-of-events')).toBeInTheDocument(); // Check if NumberOfEvents is in the document
  });
});
