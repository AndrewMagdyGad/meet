const { google } = require("googleapis");

// Scopes required to access public calendar events with read-only permission
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];

// Extracting configuration variables
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uris = ["https://crrenatacr.github.io/meet/"];

// Creating the OAuth2 client with credentials and redirect URI
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// Function that generates the authentication URL for Google OAuth2
module.exports.getAuthURL = async () => {
  // Generating the authentication URL with the required scope
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  // Returning the authentication URL in JSON format
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};
