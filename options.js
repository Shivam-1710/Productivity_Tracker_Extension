document.addEventListener('DOMContentLoaded', function() {
    var thresholdInput = document.getElementById('threshold');
    var saveBtn = document.getElementById('saveBtn');
  
    // Retrieve the saved threshold time from storage and update the input value
    chrome.storage.sync.get('thresholdTime', function(result) {
      var thresholdTime = result.thresholdTime || 120; // Default threshold time is 120 minutes
      thresholdInput.value = thresholdTime;
    });
  
    // Save the threshold time when the Save button is clicked
    saveBtn.addEventListener('click', function() {
      var newThresholdTime = parseInt(thresholdInput.value, 10);
      chrome.storage.sync.set({ thresholdTime: newThresholdTime }, function() {
        alert('Threshold time saved!');
      });
    });
  });
  