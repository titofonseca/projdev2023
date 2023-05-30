// Define UI elements
const urlField = document.getElementById('apiUrl');
const fetchDataBtn = document.getElementById('fetchData');
const accountSelector = document.getElementById('accountSelector');
const tableBody = document.getElementById('tableBody');

let selectedAccountId;

// Add click event listener to fetchData button
fetchDataBtn.addEventListener('click', fetchData);

// Add change event listener to account selector
accountSelector.addEventListener('change', function() {
  selectedAccountId = this.value;
});

// Initialize Google Sign-In
function initGoogleSignIn() {
  gapi.load('auth2', function() {
    gapi.auth2.init({
      client_id: '431217157687-qng9j24m9v30lk7005m0ads2r2crkicp.apps.googleusercontent.com',
      scope: 'profile email'
    });
  });
}

// Google sign in function
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('Full Name: ' + profile.getName());
  console.log('Email: ' + profile.getEmail());

  // Load Analytics client library
  gapi.load('client:analytics', function() {
    console.log('Loaded client:analytics');

    // Get list of Google Analytics accounts
    gapi.client.analytics.management.accounts.list().then(function(response) {
      var accounts = response.result.items;
      console.log('Google Analytics Accounts:', accounts);

      // Enable account selector dropdown
      accountSelector.disabled = false;

      // Add accounts to dropdown
      accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id; // Use account ID as option value
        option.textContent = account.name; // Use account name as option text
        accountSelector.appendChild(option);
      });
    });
  });
}

// Fetch data function
function fetchData() {
  fetchDataBtn.textContent = 'Loading...';
  fetchDataBtn.disabled = true;

  // Make sure a Google Analytics Account ID is selected
  if (!selectedAccountId) {
    console.error('Error: No Google Analytics Account ID selected');
    fetchDataBtn.textContent = 'Fetch Data';
    fetchDataBtn.disabled = false;
    return;
  }

  // Define the request
  let request = {
    'reportRequests': [
      {
        'viewId': selectedAccountId,
        'dateRanges': [{'startDate': '7daysAgo', 'endDate': 'today'}],
        'metrics': [{'expression': 'ga:sessions'}],
        'dimensions': [{'name': 'ga:source'}]
      }
    ]
  };

  // Fetch data from Google Analytics API
  gapi.client.analyticsreporting.reports.batchGet(request)
    .then(response => {
      // Handle the response
      let rows = response.result.reports[0].data.rows;

      // Clear the table
      tableBody.innerHTML = '';

      // Populate the table
      rows.forEach(row => {
        const newRow = document.createElement('tr');
        const sourceCell = document.createElement('td');
        sourceCell.textContent = row.dimensions[0];
        const sessionsCell = document.createElement('td');
        sessionsCell.textContent = row.metrics[0].values[0];
        newRow.appendChild(sourceCell);
        newRow.appendChild(sessionsCell);
        tableBody.appendChild(newRow);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      fetchDataBtn.textContent = 'Fetch Data';
      fetchDataBtn.disabled = false;
    });
}

// Load the Google API client and initialize Google Sign-In
function loadClient() {
  gapi.load('client:auth2', initGoogleSignIn);
}

// Load the Google Analytics client library
function loadAnalyticsClient() {
  gapi.load('client:analytics', fetchData);
}

// Load the necessary APIs and libraries
gapi.load('client', function() {
  gapi.client.init({
    apiKey: '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',
    clientId: '431217157687-qng9j24m9v30lk7005m0ads2r2crkicp.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/analytics/v4/rest'],
    scope: 'https://www.googleapis.com/auth/analytics.readonly'
  }).then(function() {
    // Listen for sign-in state changes
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);

    // Handle the initial sign-in state
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }).catch(function(error) {
    console.log('Error initializing Google API client:', error);
  });
});

// Update sign-in status
function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    // User is signed in, load the Analytics client library
    loadAnalyticsClient();
  } else {
    // User is not signed in, show the sign-in button
    loadClient();
  }
}

