/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

import mockData from './mock-data';

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const encodeCode = encodeURIComponent(code);
      const response = await fetch(
        'https://8ojt5ejoff.execute-api.eu-central-1.amazonaws.com/dev/api/token'+ '/' + encodeCode
  
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code); // Ensure getToken is defined
  }
  return accessToken;
};

// Add the checkToken function to verify the access token
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result; // Return the token validation result
};
/**
 *
 * This function will fetch the list of all events
 */


export const getEvents = async () => {
  // Check if running on localhost and return mock data
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  const token = await getAccessToken(); // Check for an access token

  if (token) {
    removeQuery(); // Remove query from the URL
    const url =  `https://8ojt5ejoff.execute-api.eu-central-1.amazonaws.com/dev/api/get-events`; // Construct the API endpoint using template literals
    const response = await fetch(url); // Fetch events from the API
    const result = await response.json(); // Parse the JSON response
    if (result) {
      return result.events; // Return events from the result
    } else return null; 
  }
};

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};



// Function to remove the query parameters from the URL
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl); // Update the URL without the query
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl); // Update the URL without the query
  }
};

// Function to get the token from the code
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code); // Encode the code for URL
  const response = await fetch(`https://8ojt5ejoff.execute-api.eu-central-1.amazonaws.com/dev/api/token`); // Use template literals for URL
  const { access_token } = await response.json(); // Destructure access_token from response
  access_token && localStorage.setItem("access_token", access_token); // Store access token if it exists

  return access_token; // Return the access token
};