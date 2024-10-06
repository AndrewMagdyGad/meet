Feature: Event filtering by city

    Scenario: Display all upcoming events when no city has been searched
        Given the user has not searched for any specific city
        When the user opens the application
        Then the user should be presented with a list of all upcoming events

    Scenario: Show city suggestions as the user searches
        Given the homepage is visible
        When the user begins typing in the city input field
        Then the user should be provided with a list of matching city suggestions based on their input

    Scenario: User should see a list of suggestions when searching for a city
        Given the main page is open
        And user starts typing in the city textbox
        When the user selects a city (e.g., "Berlin, Germany") from the suggested list
        Then the selected city should be updated to that city (i.e., "Berlin, Germany")
        And the user should be shown a list of upcoming events in that city

    Scenario: User selects a city to filter events from the dropdown
        Given the user is on the homepage
        When they select a city from the dropdown menu
        Then the user should be shown a list of events happening in the selected city

