// Creamos un objeto llamado weather con una apiKey y dos métodos
const weather = {
  apiKey: "77d16fbd4a158de046bf36567211164d",

  // Método para hacer una petición a la API y mostrar los datos de la respuesta
  fetchWeather: async function (city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
      );

      if (response.status !== 200) {
        throw new Error("City not found");
      }

      const data = await response.json();

      this.displayWeather(data);
    } catch (error) {
      console.error(error);
      alert("City not found");
    }
  },

  // Método para mostrar los datos del clima en el DOM
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    console.log(name, icon, description, temp, humidity, speed);

    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${Math.floor(temp)}°C`;
    document.querySelector(".humidity").innerText = `humidity: ${humidity}%`;
    document.querySelector(".wind").innerText = `wind speed: ${speed}km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
  },

  // Método para buscar el clima de una ciudad ingresada por el usuario
  search: function () {
    const city = document.querySelector(".search-bar").value;
    if (city) {
      this.fetchWeather(city);
    }
  },
};

// Evento al hacer clic en el botón de búsqueda
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// Evento al presionar la tecla Enter en el input de búsqueda
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

// Mostrar el clima por defecto al cargar la página
weather.fetchWeather("Dominican Republic");

