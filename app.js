const apiKey = "your_openweathermap_api_key"; // Replace with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

document.getElementById("searchBtn").addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error("City not found!");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
});

function displayWeather(data) {
    const weatherInfo = `
        <strong>City:</strong> ${data.name}<br>
        <strong>Temperature:</strong> ${data.main.temp}°C<br>
        <strong>Weather:</strong> ${data.weather[0].description}<br>
        <strong>Humidity:</strong> ${data.main.humidity}%<br>
        <strong>Wind Speed:</strong> ${data.wind.speed} m/s
    `;
    document.getElementById("weatherData").innerHTML = weatherInfo;
}

