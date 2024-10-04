const locations = [
    { name: 'Oslo', latitude: 59.9139, longitude: 10.7522 },
    { name: 'Bergen', latitude: 60.393, longitude: 5.3242},
    { name: 'Stavanger', latitude: 58.9701, longitude: 5.733},
    { name: 'Gjøvik', latitude: 60.7957, longitude: 10.6915},
    { name: 'Hosle', latitude: 59.9356, longitude: 10.5906},
    { name: 'Fucking', latitude: 48.0674, longitude: 12.8631}
];

    // første innlasting av koden
    getWeather();

    // Sørger for å oppdatere siden jevnlig
    setInterval(getWeather, 300000);


function getWeather(){
    const weatherContainer = document.querySelector('.weather-container');
          weatherContainer.innerHTML = '';


    locations.forEach(location => {
      
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`)
        .then(response => response.json())
        .then(data => {
            const temperature = data.current_weather.temperature;
            const windSpeed = data.current_weather.windspeed;

            const weather = document.createElement('div');

                  weather.classList.add('weather-data');

            weather.innerHTML = `
                <h3>${location.name}</h3>
                <p>Very much temperatur: ${temperature}C</p>
                <p>How much windy: ${windSpeed}km/h</p>`;

                weatherContainer.appendChild(weather);
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    });
}






