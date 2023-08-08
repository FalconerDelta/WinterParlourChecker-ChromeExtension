let isNotificationPaused = false;
let previous_temp = 0;

// Set up the initial alarm when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('temperatureCheck', { periodInMinutes: 1 }); // Set interval to 1 minutes
  fetchTemperatureAndCheck() // First run after install
});

function fetchTemperatureAndCheck() {
  fetch('https://reg.bom.gov.au/fwo/IDV60901/IDV60901.94866.json')
    .then(response => response.json())
    .then(data => {
      const temperature = parseFloat(data.observations.data[0].air_temp);
	  console.log(temperature);

      if (!isNaN(temperature) && temperature <= 5.0 && temperature != previous_temp) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'images/icon48.png',
          title: '$5 Winter Parlour Time!!! ❄️',
          message: `Current Temperature: ${temperature}°C`,
        });
		isNotificationPaused = false
      } else if (!isNaN(temperature) && temperature > 5.0 && temperature != previous_temp && isNotificationPaused == false) {
		  chrome.notifications.create({
          type: 'basic',
          iconUrl: 'images/icon48.png',
          title: '$5 Winter Parlour is no longer available. ❄️',
          message: `Current Temperature: ${temperature}°C`,
        });
		isNotificationPaused = true
		}
		// Pause if same temp
		previous_temp = temperature;
    })
    .catch(error => {
      console.error('Error fetching temperature:', error);
    });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'temperatureCheck') {
      fetchTemperatureAndCheck();
  }
});

