const weather = {
  apiKey: "77d16fbd4a158de046bf36567211164d",
  
  // método para obtener el clima
  fetchWeather: async function(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
      );
      const data = await response.json();
      this.displayWeather(data);
    } catch (error) {
      console.log(error);
      alert('Error al obtener el clima.');
    }
  },
  
  // método para mostrar el clima
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main; 
    const { speed } = data.wind;

    document.querySelector(".city").textContent =  name;
    document.querySelector(".icon").setAttribute("src", `https://openweathermap.org/img/wn/${icon}.png`);
    document.querySelector(".description").textContent = description ;
    document.querySelector(".temp").textContent = `${Math.floor(temp)}°C`;
    document.querySelector(".humidity").textContent = `Humedad: ${humidity}%`;
    document.querySelector(".wind").textContent = `Velocidad del viento: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
  },
  
  // método para buscar el clima
  search: function() {
    const searchInput = document.querySelector(".search-bar");
    const searchValue = searchInput.value.trim();
    if (searchValue) {
      this.fetchWeather(searchValue);
      searchInput.value = '';
    } else {
      alert('Ingrese una ciudad para buscar el clima.');
    }
  },
  
  // método para borrar el buscador
  clearSearch: function() {
    document.querySelector(".search-bar").value = '';
  }
};

// evento para buscar el clima al hacer click en el botón
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// evento para buscar el clima al presionar la tecla Enter
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

// evento para borrar el buscador al hacer click en el botón de borrar
document.querySelector(".search .clear").addEventListener("click", function () {
  weather.clearSearch();
});

// obtiene el clima de República Dominicana al cargar la página
weather.fetchWeather("Dominican Republic");
