<template>
  <div class="container">
    <h1>WEATHER APP</h1>
    <div class="search-bar">
      <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
      <button @click="searchByCity" class="search-button">Search</button>
    </div>
  </div>
  <main>
    <div v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} C</p>
      </div>
    </div>
    <span v-if="weatherData">{{ weatherData.weather[0].description }}</span>
  </main>
</template>

<script>
import axios from 'axios'

const apikey = '51e3ccb66d5b7afbeb2ab6f69f6c8a4e'

export default {
  name: 'App',
  data() {
    return {
      city: '',
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: []
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273.15) : null
    },
    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    }
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
            await this.fetchWeatherData(url)
          },
          (error) => {
            console.error('Error getting location:', error)
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    },
    async searchByCity() {
      if (this.city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`
        await this.fetchWeatherData(url)
      } else {
        console.error('Please enter a city name')
      }
    }
  }
}
</script>
