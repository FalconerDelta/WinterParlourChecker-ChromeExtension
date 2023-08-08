// popup.js
chrome.runtime.sendMessage({ action: "fetchTemperature" }, response => {
  const temperature = response.temperature;
  document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;

  if (parseFloat(temperature) <= 5.0) {
    // Show a pop-up if temperature is 5.0 or below
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon48.png',
      title: 'Temperature Alert',
      message: `Winter Parlour Time: ${temperature}°C`,
    });
  }
});
