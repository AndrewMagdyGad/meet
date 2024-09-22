import { render, screen } from '@testing-library/react'; // Import testing utilities
import userEvent from '@testing-library/user-event'; // Import userEvent for simulating user actions
import NumberOfEvents from '../components/NumberOfEvents'; // Import the NumberOfEvents component

describe('<NumberOfEvents /> component', () => {
  // Test to ensure the input has the role of "textbox"
  test('contains an element with role "textbox"', () => {
    render(<NumberOfEvents />); // Render the component
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // Check if there's an input with the textbox role
  });

  // Test to ensure the default value of the input field is 32
  test('default value of input is 32', () => {
    render(<NumberOfEvents />); // Render the component
    const input = screen.getByRole('textbox'); // Get the input element with the role "textbox"
    expect(input.value).toBe('32'); // Ensure the default value is 32
  });

  // Test to ensure the value of the input changes when the user types
  test('input value changes when user types', async () => {
    const user = userEvent.setup(); // Setup user event simulation
    render(<NumberOfEvents />); // Render the component
    const input = screen.getByRole('textbox'); // Get the input element with the role "textbox"

    // Simulate typing: delete the current value and replace with '10'
    await user.type(input, '{backspace}{backspace}10');
    expect(input.value).toBe('10'); // Check if the value was updated to '10'
  });
});
