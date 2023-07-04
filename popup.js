// popup.js

document.addEventListener("DOMContentLoaded", function () {
    var trackBtn = document.getElementById("trackBtn");
    var timeSpent = document.getElementById("timeSpent");
  
    // Handle the track button click event
    trackBtn.addEventListener("click", function () {
      // Send a message to the background script to track the time spent
      chrome.runtime.sendMessage({ action: "trackTimeSpent" });
    });
  
    // Function to update the time spent in the popup
    function updateTimeSpent() {
      // Communicate with the background script to retrieve the time spent
      chrome.runtime.sendMessage({ action: "getTimeSpent" }, function (response) {
        // Update the 'timeSpent' element with the retrieved time
        timeSpent.textContent = response.timeSpent;
      });
    }
  
    // Initialize the time spent in the popup
    updateTimeSpent();
  
    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      if (message.action === "updateTimeSpent") {
        // Update the time spent in the popup
        updateTimeSpent();
      }
    });
  });
  
  