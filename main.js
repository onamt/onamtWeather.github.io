// Creamos un objeto "weather" con métodos para obtener y mostrar el clima
const weather = {
  apiKey: "77d16fbd4a158de046bf36567211164d",

  // Método para buscar el clima en una ciudad específica y mostrarlo en la página
  fetchWeather: function(city) {
    // Hacemos una petición fetch a la API del clima
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
      .then(response => {
        // Si la respuesta no es exitosa, mostramos un mensaje de error en la consola
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then(data => {
        // Si la respuesta es exitosa, mostramos los datos del clima en la página
        this.displayWeather(data);
      })
      .catch(error => {
        console.error(error);
      });
  },

  // Método para mostrar los datos del clima en la página
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").textContent = name;
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").textContent = description;
    document.querySelector(".temp").textContent = `${Math.floor(temp)}°C`;
    document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
    document.querySelector(".wind").textContent = `Wind speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
  },

  // Método para buscar el clima en la ciudad especificada por el usuario
  search: function() {
    const city = document.querySelector(".search-bar").value;
    // Si no se ha ingresado una ciudad, no hacemos nada
    if (!city) {
      return;
    }
    // Borramos el campo de búsqueda automáticamente
    this.clearSearchBar();
    this.fetchWeather(city);
  },

  // Método para borrar el campo de búsqueda
  clearSearchBar: function() {
    document.querySelector(".search-bar").value = "";
  }
};

// Agregamos un event listener al botón de búsqueda para buscar el clima cuando se hace clic
document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
});

// Agregamos un event listener al campo de búsqueda para buscar el clima cuando se presiona la tecla Enter
document.querySelector(".search-bar").addEventListener("keyup", event => {
  if (event.key === "Enter") {
    weather.search();
  }
});

// Mostramos el clima en la ciudad especificada al cargar la página
weather.fetchWeather("Dominican Republic");
