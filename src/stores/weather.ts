import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { parseWeatherCode, type WeatherConditions } from '@/utils/weatherCodes';

import { API_URL, GEOCODING_API_URL, TemperatureUnits } from '@/utils/constants';

// create weather store with setup syntax
export const useWeatherStore = defineStore('weather', () => {
  // state
  const location = ref("");
  const longitude = ref();
  const latitude = ref();
  const temperatureUnit = ref<TemperatureUnits>(TemperatureUnits.FAHRENHEIT);
  const geocoding = ref(); // This will be a JSON object based on the API's geocoding response, or error
  const weather = ref(); // This will be a JSON object based on the API's current_weather response, or error
  const weatherConditions = ref<WeatherConditions>(); // This will be a JSON object for the current weather conditions, using parseWeatherCode()
  const locations = ref();

  const toggleTemperatureUnit = () => {
    temperatureUnit.value = temperatureUnit.value === TemperatureUnits.FAHRENHEIT
      ? TemperatureUnits.CELSIUS 
      : TemperatureUnits.FAHRENHEIT;

    if (weather.value) fetchWeatherData(latitude.value, longitude.value);
  }

  const setLocation = (locationSearch: string) => {
    location.value = locationSearch;
  };

  const getLocations = async (locationSearch: string) => {
    axios
      .get(`${GEOCODING_API_URL}search?name=${locationSearch}&count=10&language=en&format=json`)
      .then((res) => {
        locations.value = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getWeather = async () => {
    axios
      .get(`${GEOCODING_API_URL}search?name=${location.value}&count=1&language=en&format=json`)
      .then((res) => {
        longitude.value = res.data.results[0].longitude;
        latitude.value = res.data.results[0].latitude;
        geocoding.value = res.data.results[0];
        fetchWeatherData(latitude.value, longitude.value);
      })
      .catch((err) => {
        console.log(err);
        geocoding.value = {};
        weather.value = {};
      })
    };

  const getWeatherFromGeocoding = (location: any) => {
    longitude.value = location.longitude;
    latitude.value = location.latitude;
    geocoding.value = location;
    fetchWeatherData(latitude.value, longitude.value);
  };

  const fetchWeatherData = (latitude: number, longitude: number) => {
    const requestUrl = `${API_URL}forecast` + 
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current_weather=true` +
      `&hourly=temperature_2m,weather_code,is_day` + 
      `&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
      `&temperature_unit=${temperatureUnit.value}` +
      `&windspeed_unit=mph` + 
      `&precipitation_unit=inch` +
      `&timezone=auto` +
      `&forecast_days=14`;

    axios
      .get(requestUrl)
      .then((res) => {
        console.log(requestUrl);
        weather.value = res.data;
        weatherConditions.value = parseWeatherCode({ code: res.data.current_weather.weathercode, isDay: res.data.current_weather.is_day });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { 
    location,
    locations,
    longitude,
    latitude,
    temperatureUnit,
    weather,
    geocoding,
    weatherConditions,
    toggleTemperatureUnit,
    getWeather,
    getWeatherFromGeocoding,
    getLocations,
    fetchWeatherData,
    setLocation
  }
})
