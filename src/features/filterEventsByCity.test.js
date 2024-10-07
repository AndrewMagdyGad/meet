import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../mock-data';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {

  // Test 1:
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    
    
    given('user hasn’t searched for any city', () => {
      // No specific action needed for this step
    });

    let AppComponent;
    
    when('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    
    then('the user should see the list of all upcoming events.', async () => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector('#event-list');
  
        await waitFor(() => {
          const EventListItems = within(EventListDOM).queryAllByRole('listitem');
          expect(EventListItems.length).toBe(32);
        });
  
      });
  });

  // Test 2: User should see a list of suggestions when they search for a city
  test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
    given('the main page is open', () => {
      // Code to verify main page is open
    });

    when('user starts typing in the city textbox', () => {
      // Simulate typing in city textbox
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
      // Verify that a list of city suggestions appears
    });
  });

  // Test 3: User can select a city from the suggested list
  test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
    given('user was typing “Berlin” in the city textbox', () => {
      // Simulate typing 'Berlin' in the textbox
    });

    and('the list of suggested cities is showing', () => {
      // Verify that the list of suggested cities is visible
    });

    when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
      // Simulate selecting 'Berlin, Germany' from the list
    });

    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      // Verify the city has been updated to 'Berlin, Germany'
    });

    and('the user should receive a list of upcoming events in that city', () => {
      // Verify the list of events for the selected city is displayed
    });
  });
});