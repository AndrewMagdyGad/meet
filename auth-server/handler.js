const { google } = require("googleapis");

// Scopes required to access public calendar events with read-only permission
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
];

// Extracting configuration variables
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
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
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

//Function that generates the Access Token
module.exports.getAccessToken = async (event) => {
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /**
     *  Exchange authorization code for access token with a “callback” after the exchange,
     *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
     */

    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
