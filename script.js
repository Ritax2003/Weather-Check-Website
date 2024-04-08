document.getElementById('location-form').addEventListener('submit', getWeather);

function getWeather(e) {
  e.preventDefault(); // Prevent default form submission

  const city = document.getElementById('location-input').value;
  const apiKey = '77f285ed9c8dd8f181fe79f9e7c9b039'; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error: City not found');
      }
      return response.json();
    })
    .then(data => {
      // Display weather information
      const weatherInfo = `
      <h2>${data.name}</h2>
      <p><button>Temperature</button>: ${data.main.temp}°C</p>
      <p><button>Feels like</button>: ${data.main.feels_like}°C</p>
      <p><button>Min Temperature</button>: ${data.main.temp_min}°C</p>
      <p><button>Max Temperature</button>: ${data.main.temp_max}°C</p>
      <p><button>Weather</button>: ${data.weather[0].main}</p>
      <p><button>Description</button>: ${data.weather[0].description}</p>
      <p><button>Wind Speed</button>: ${data.wind.speed} m/s</p>
      <p><button>Wind Direction</button>: ${data.wind.deg}°</p>
      <p><button>Humidity</button>: ${data.main.humidity}%</p>
      <p><button>Pressure</button>: ${data.main.pressure} hPa</p>
      <p><button>Visibility</button>: ${data.visibility} meters</p>
      <p><button>Cloudiness</button>: ${data.clouds.all}%</p>
      <p><button>Sunrise</button>: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p><button>Sunset</button>: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    `;
      document.getElementById('weather-data').innerHTML = weatherInfo;
      document.getElementById('location-form').reset();
    })
    .catch(error => {
      document.getElementById('weather-data').innerHTML = error.message;
    });
}
