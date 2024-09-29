import { render, screen, within } from '@testing-library/react'; // Import testing utilities
import userEvent from '@testing-library/user-event'; // Import userEvent for simulating user actions
import CitySearch from '../components/CitySearch'; // Import the CitySearch component
import { getEvents, extractLocations } from '../api';
import App from '../App'; // Import the App component for integration tests

describe('<CitySearch /> component', () => {
  let allLocations; // Variable to hold all location names

  beforeEach(() => {
    allLocations = ['Berlin', 'Paris', 'Madrid']; // Sample locations
  });

  test('renders text input', () => {
    render(<CitySearch allLocations={allLocations} />); // Render the component with locations
    const cityTextBox = screen.getByRole('textbox'); // Get the input element
    expect(cityTextBox).toBeInTheDocument(); // Check if the input is in the document
    expect(cityTextBox).toHaveClass('city'); // Verify the input has the correct class
  });

  test('suggestions list is hidden by default', () => {
    render(<CitySearch allLocations={allLocations} />);
    const suggestionList = screen.queryByRole('list'); // Get the suggestion list
    expect(suggestionList).not.toBeInTheDocument(); // Check that it is not in the document
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup(); // Setup user event simulation
    render(<CitySearch allLocations={allLocations} />);

    const cityTextBox = screen.getByRole('textbox');
    await user.click(cityTextBox); // Simulate click on the input
    const suggestionList = screen.getByRole('list'); // Check if the suggestion list is rendered
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions'); // Verify the class of the list
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    render(<CitySearch allLocations={allLocations} />);

    const cityTextBox = screen.getByRole('textbox');
    await user.type(cityTextBox, "Berlin"); // Simulate typing "Berlin"

    const suggestions = allLocations.filter(location => 
      location.toUpperCase().includes(cityTextBox.value.toUpperCase())
    ); // Filter suggestions

    const suggestionListItems = screen.getAllByRole('listitem'); // Get all list items
    expect(suggestionListItems).toHaveLength(suggestions.length + 1); // Check length (+1 for "See all cities")
    suggestions.forEach((suggestion, index) => {
      expect(suggestionListItems[index].textContent).toBe(suggestion); // Verify each suggestion
    });
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup(); // Setup for simulating user actions
    const allEvents = await getEvents(); // Fetch all events from the API
    allLocations = extractLocations(allEvents); // Extract unique locations from the events

    render(<CitySearch allLocations={allLocations} />); // Render the CitySearch component with the fetched locations

    const cityTextBox = screen.getByRole('textbox'); // Get the text box by its role
    await user.type(cityTextBox, "Berlin"); // Simulate typing 'Berlin' in the textbox

    const BerlinGermanySuggestion = screen.getAllByRole('listitem')[0]; // Find the first suggestion
    await user.click(BerlinGermanySuggestion); // Simulate a click on the suggestion

    // Assert that the textbox value now matches the clicked suggestion's text
    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />); // Render the App component
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox); // Simulate clicking on the city text box

    const allEvents = await getEvents(); // Fetch all events
    const allLocations = extractLocations(allEvents); // Extract locations

    const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); // Get all suggestion items
    expect(suggestionListItems.length).toBe(allLocations.length + 1); // Check if the number of suggestions matches
  });
});
