import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { parseWeatherCode, type WeatherConditions } from '@/utils/weatherCodes';

import { API_URL, GEOCODING_API_URL, TemperatureUnits } from '@/utils/constants';

// create weather store with setup syntax
export const useWeatherStore = defineStore('weather', () => {
  // state
  const longitude = ref();
  const latitude = ref();
  const temperatureUnit = ref<TemperatureUnits>(TemperatureUnits.FAHRENHEIT);
  const geocoding = ref();
  const weather = ref();
  const weatherConditions = ref<WeatherConditions>(); // This will be a JSON object for the current weather conditions, using parseWeatherCode()
  const locations = ref();
  const error = ref(false);

  const toggleTemperatureUnit = () => {
    temperatureUnit.value = temperatureUnit.value === TemperatureUnits.FAHRENHEIT
      ? TemperatureUnits.CELSIUS 
      : TemperatureUnits.FAHRENHEIT;

    if (weather.value) fetchWeatherData(latitude.value, longitude.value);
  }

  const getLocations = (locationSearch: string) => {
    axios
      .get(`${GEOCODING_API_URL}search?name=${locationSearch}&count=10&language=en&format=json`)
      .then((res) => {
        locations.value = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getWeatherByName = (location: string) => {
    error.value = false;
    axios
      .get(`${GEOCODING_API_URL}search?name=${location}&count=1&language=en&format=json`)
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
        error.value = true;
      })
    };

  const getWeatherFromGeocoding = (location: any) => {
    error.value = false;
    longitude.value = location.longitude;
    latitude.value = location.latitude;
    geocoding.value = location;
    fetchWeatherData(latitude.value, longitude.value);
  };

  const fetchWeatherData = (latitude: number, longitude: number) => {
    const requestUrl = `${API_URL}forecast` + 
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m` +
      `&hourly=temperature_2m,weather_code,is_day` + 
      `&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
      `&temperature_unit=${temperatureUnit.value}` +
      `&wind_speed_unit=mph` + 
      `&precipitation_unit=inch` +
      `&timezone=auto` +
      `&forecast_days=14` + 
      `&forecast_hours=24`;

    axios
      .get(requestUrl)
      .then((res) => {
        console.log(requestUrl);
        weather.value = res.data;
        weatherConditions.value = parseWeatherCode({ code: res.data.current.weather_code, isDay: res.data.current.is_day });
      })
      .catch((err) => {
        console.log(err);
        error.value = true;
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
    getWeatherByName,
    getWeatherFromGeocoding,
    getLocations,
    fetchWeatherData,
    error,
  }
})
