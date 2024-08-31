This project is the backend for a Spotify clone. It's built with Node.js and Express, and it handles authentication with the Spotify API using the "Authorization Code" flow. It also provides endpoints for accessing music preview URL.

**Authorization Flow:**
![auth-code-flow](https://github.com/user-attachments/assets/a7d2ac33-865e-4251-82ef-88a419c8f9d4)


1. The client (frontend) redirects the user to the Spotify authorization page.
2. The user logs into Spotify and authorizes the application to access their data.
3. Spotify redirects the user back to the application with an authorization code.
4. The backend exchanges the authorization code for an access token using a POST request to the Spotify API.
5. The access token is used to make subsequent requests to the Spotify API on behalf of the user.

**Getting Started:**

1. Clone the repository
2. Install dependencies ```npm install```\
3. Create a .env file based on .env.template file
4. Fill in the .env file with your Spotify API credentials, [Spotify Apps](https://developer.spotify.com/dashboard):
```
PORT=3000

SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret

SPOTIFY_API_URL=https://accounts.spotify.com

SPOTI_APP_SERVER_URL=http://localhost:3000
SPOTI_APP_CLIENT_URL=http://localhost:4200
```
5. Run the development server: ```npm run dev```

## Dependencies:
- Express: Web framework for Node.js.
- axios: Promise-based HTTP client for the browser and node.js.
- dotenv: Loads environment variables from a .env file.
- cookie-parser: Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
- cors: Enable CORS with various options.
- query-string: Parse and stringify URL query strings.
- jsdom: A JavaScript implementation of various web standards, for server-side testing and scraping.
- env-var: Lightweight runtime environment variable configuration.
