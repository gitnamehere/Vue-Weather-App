<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
import { TemperatureUnits } from '@/utils/constants';

import Searchbar from '@/components/LocationSearchbar.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import DailyWeather from '@/components/DailyWeather.vue';
import HourlyWeather from '@/components/HourlyWeather.vue';
const weatherStore = useWeatherStore();

const { weather, temperatureUnit } = storeToRefs(weatherStore);
</script>

<!--TODO: refactor code into seperate components-->

<template>
    <div
        class="weather"
        :class="weather?.current_weather.is_day ? 'weather--day' : 'weather--night'"
    >
        <div
            class="weather__top-bar"
            :class="{ 'weather__top-bar--day': weather?.current_weather.is_day }"
        >
            <a href="/">
                <h1>A Vue Weather App</h1>
            </a>
            <Searchbar class="weather__search-bar" />
            <button
                class="weather__menu-button"
                @click="weatherStore.toggleTemperatureUnit"
            >
                {{ temperatureUnit === TemperatureUnits.FAHRENHEIT ? 'F' : 'C' }}
            </button>
        </div>

        <div
            v-if="weather"
            class="weather__container"
        >
            <CurrentWeather />
            <HourlyWeather />
            <DailyWeather />
        </div>

        <div
            v-else
            class="weather__container"
        >
            <h1>404 Not Found</h1>
            <p>
                This means you either reloaded the page, the location you searched could not be found, or an
                error occured.
            </p>
        </div>
        <footer class="footer">
            <p>This is the weather page. (under development)</p>
            <a
                href="https://open-meteo.com/"
                style="color: #f8f8f8"
            ><u>Weather data by Open-Meteo.com</u></a>
        </footer>
    </div>
</template>

<style scoped lang="scss">
    .weather {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: calc(100vw - (100vw - 100%)); // subtract viewport by scrollbar width

        padding: 96px 0 16px;

        color: #f8f8f8;
        text-shadow: 0px 2px 8px #0004;

        animation: fadein 0.5s;
        transition: background-color 0.25s ease;

        &__top-bar {
            display: flex;
            position: fixed;
            inset: 0;
            flex-direction: row;
            align-items: center;

            margin-bottom: 2rem;
            height: 72px;
            padding: 8px 64px;

            background: linear-gradient(#1d104b, transparent);

            animation: all 0.5s ease;

            &--day {
                background: linear-gradient(#89c6ff, #2885dd, transparent);
            }

            h1 {
                font-weight: 500;
                font-size: 24px;
                color: #f8f8f8;
            }
        }

        &__menu-button {
            margin-left: 16px;

            height: 40px;
            width: 40px;
            border-radius: 16px;
            border: none;
        }

        &__container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            width: 100%;

            @media (max-width: 767px) {
                padding: 0 2rem;
            }
        }

        &--day {
            background-color: #2885dd;
        }

        &--night {
            background-color: #111128;
        }
    }

    .footer {
        padding-top: 16px;
        text-align: center;
    }

    @media (max-width: 767px) {
        .weather__top-bar {
            padding: 1rem;

            h1 {
                display: none;
            }
        }

        .weather__search-bar {
            width: 100%;
        }
    }

    @media (min-width: 769px) {
        .weather__search-bar {
            flex-grow: 1;
            margin-left: 16px;
        }
    }

    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
