const apiKey = "409071638ad07cc2dfc17b2bb3edc78c"; // Replace with your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

document.getElementById("searchBtn").addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        console.log(`Fetching data for: ${city}`); // Debugging
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "City not found!");
        }

        const data = await response.json();
        console.log("API Response:", data); // Debugging
        displayWeather(data);
    } catch (error) {
        console.error("Error:", error); // Debugging
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
