// popup.js
document.addEventListener('DOMContentLoaded', () => {
  // Get the content container
  const temperatureContainer = document.getElementById('temperature');

  // Fetch the JSON data and update the temperature
  fetch('https://reg.bom.gov.au/fwo/IDV60901/IDV60901.94866.json')
    .then(response => response.json())
    .then(data => {
      const temperature = parseFloat(data.observations.data[0].air_temp);
      
      // Update the temperature container with the fetched temperature
      temperatureContainer.textContent = `Current Temperature: ${temperature}°C`;
    })
    .catch(error => {
      console.error('Error fetching temperature:', error);
      temperatureContainer.textContent = 'Error fetching temperature';
    });
});
