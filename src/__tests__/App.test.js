import { render } from '@testing-library/react'; // Import render from testing-library
import App from '../App'; // Import the App component

describe('<App /> component', () => {
  let AppDOM;

  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild; // Render the App component and get the first child
  });

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument(); // Check if the event list is in the document
  });

  test('renders CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument(); // Check if CitySearch is in the document
  });

  // New test to check if the NumberOfEvents component is rendered correctly
  test('renders NumberOfEvents', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument(); // Check if NumberOfEvents is in the document
  });
});
