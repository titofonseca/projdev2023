## Google Analytics Reporting API Integration Project
This project is a web application that integrates with Google Analytics Reporting API to fetch and display analytics data.

## Project Structure
The project is composed of three main files:

# index.html: Contains the structure of the web page.
# styles.css: Contains all the styles for the web page.
# script.js: Contains all the logic of the application, including fetching data from Google Analytics API.

# Setup and Installation
To setup the project, follow these steps:

# Client-side Setup
Clone the repository to your local machine.
Open the index.html file in a web browser.

# Server-side Setup (assuming you're using Node.js and Express)
Navigate to the root directory of the project.
Run npm install to install all dependencies.
Replace YOUR_CLIENT_ID in the meta tag within index.html with your actual Google client ID.
Place your service account credentials in a credentials.json file in your project root directory.
Replace YOUR_VIEW_ID in server.js (or wherever you have placed your server-side code) with your actual View ID from Google Analytics.

# Usage
Open the application in a web browser. Sign in with Google when prompted. Choose an account from the dropdown, and then click the "Fetch Data" button to get data from Google Analytics Reporting API.

## Dependencies
# The client-side code has dependencies on:

Google Platform Library
Font Awesome

# The server-side code (assuming you're using Node.js and Express) has dependencies on:

googleapis

Make sure to run npm install to install all server-side dependencies.

## Note
This project is meant for educational purposes and does not come with any guarantees or warranties.

Remember to replace placeholders such as YOUR_CLIENT_ID with your actual client ID, and the same goes for other placeholders within your server-side code.
