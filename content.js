document.addEventListener("DOMContentLoaded", function () {
  var trackBtn = document.getElementById("trackBtn");
  var timeSpent = document.getElementById("timeSpent");

  trackBtn.addEventListener("click", function () {
    var websiteInput = document.getElementById("website");
    var websiteUrl = websiteInput.value;

    // Add your logic to track the time spent on the website here
    var totalTimeSpent = getRandomTime(); // Default logic: Generate random time

    // Update the 'timeSpent' element with the calculated time
    timeSpent.textContent = formatTime(totalTimeSpent);

    // Save the time spent in storage
    saveTimeSpent(websiteUrl, totalTimeSpent);

    // Retrieve the time spent from storage and update the 'timeSpent' element
    retrieveTimeSpent(websiteUrl, function (time) {
      timeSpent.textContent = formatTime(time);
    });
  });

  // Function to generate a random time spent (example implementation)
  function getRandomTime() {
    var minTime = 30; // Minimum time in minutes
    var maxTime = 180; // Maximum time in minutes
    return Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  }

  // Function to format the time in a human-readable format (example implementation)
  function formatTime(totalTimeSpent) {
    var hours = Math.floor(totalTimeSpent / 60);
    var minutes = totalTimeSpent % 60;
    return hours + " hours and " + minutes + " minutes";
  }

  // Function to save the time spent for a website to storage
  function saveTimeSpent(websiteUrl, totalTimeSpent) {
    var websiteData = {};
    websiteData[websiteUrl] = totalTimeSpent;
    chrome.storage.sync.set(websiteData);
  }

  // Function to retrieve the time spent for a website from storage
  function retrieveTimeSpent(websiteUrl, callback) {
    chrome.storage.sync.get(websiteUrl, function (result) {
      var totalTimeSpent = result[websiteUrl] || 0;
      callback(totalTimeSpent);
    });
  }
  // After the retrieveTimeSpent function
  var thresholdTime = 120; // Threshold time in minutes

  function showNotification(websiteUrl, totalTimeSpent) {
    if (totalTimeSpent > thresholdTime) {
      var notificationOptions = {
        type: "basic",
        iconUrl: "icon.png",
        title: "Productivity Alert",
        message:
          "You have spent " +
          formatTime(totalTimeSpent) +
          " on " +
          websiteUrl +
          ". Consider taking a break!",
      };
      chrome.notifications.create(notificationOptions);
    }
  }

  trackBtn.addEventListener("click", function () {
    // Existing code...

    var totalTimeSpent = calculateTimeSpent(websiteUrl);

    // Save the time spent in storage
    saveTimeSpent(websiteUrl, totalTimeSpent);

    // Retrieve the time spent from storage and update the 'timeSpent' element
    retrieveTimeSpent(websiteUrl, function (time) {
      timeSpent.textContent = formatTime(time);

      // Show a notification if the time spent exceeds the threshold
      showNotification(websiteUrl, time);
    });
  });
});
