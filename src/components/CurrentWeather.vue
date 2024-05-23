<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';

const weatherStore = useWeatherStore();
const { weather, geocoding, weatherConditions } = storeToRefs(weatherStore);
</script>

<template>
    <div class="current-weather">
        <div class="current-weather__location">
            <h1>{{ geocoding.name }} {{ geocoding.admin1 }}</h1>
            <h2>{{ geocoding.country }}</h2>
        </div>
        <div class="current-weather__weather-container">
            <div class="current-weather__conditions">
                <i
                    class="current-weather__conditions-text current-weather__conditions-icon wi"
                    :class="weatherConditions?.icon"
                />
                <p class="current-weather__conditions-text">
                    {{ weatherConditions?.description }}
                </p>
            </div>
            <div class="current-weather__temperature">
                <h2 class="current-weather__temperature-text">
                    {{ weather.current_weather.temperature }}
                </h2>
                <p class="current-weather__temperature-unit">
                    {{ weather.daily_units.temperature_2m_min }}
                </p>
            </div>
            <div
                v-if="weather.daily"
                class="current-weather__data"
            >
                <p class="current-weather__data-text">
                    H: {{ `${weather.daily.temperature_2m_max[0]}${weather.daily_units.temperature_2m_max}` }}
                </p>
                <p class="current-weather__data-text">
                    L: {{ `${weather.daily.temperature_2m_min[0]}${weather.daily_units.temperature_2m_min}` }}
                </p>
                <p class="current-weather__data-text">
                    <font-awesome-icon :icon="['fas', 'wind']" />: {{ weather.current_weather.windspeed }}mph {{ weather.current_weather.winddirection }}°
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .current-weather {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 80%;
        margin-bottom: 2rem;

        &__location {
            display: flex;
            flex-direction: column;
            align-items: center;

            margin-bottom: 1rem;

            text-align: center;
        }

        &__weather-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);

            @media (max-width: 767px) {
                display: flex;
                flex-direction: column;
            }
        }

        &__conditions,
        &__temperature,
        &__data {
            display: flex;
        }

        &__conditions,
        &__data {
            box-sizing: content-box;
        }

        &__conditions {
            flex-direction: column;
            align-items: center;

            padding: 1rem 0;
            padding-left: 80px;

            @media (max-width: 767px) {
                flex-direction: row;
                justify-content: center;
                padding-left: unset;
                width: 100%;
            }
        }

        &__conditions-text {
            text-align: center;
            font-size: 24px;
            font-weight: 500;
        }

        &__conditions-icon {
            font-size: 2rem;

            @media (max-width: 767px) {
                margin-right: 1rem;
                font-size: 3rem;
            }
        }


        &__temperature {
            flex-direction: row;
            align-items: center;
            justify-content: center;

            margin: 0 2rem 1rem;
        }

        &__temperature-text {
            font-size: 5rem;
            font-weight: 500;
            line-height: 4rem;
        }

        &__temperature-unit {
            margin-top: -1.7rem;
            font-size: 2rem;
            font-weight: 200;
        }

        &__data {
            flex-direction: column;
            justify-content: center;

            height: 60%;
            padding: 1rem 0;
            
            text-wrap: nowrap;

            @media (max-width: 767px) {
                flex-direction: row;

                width: 95%;
            }
        }

        &__data-text {
            font-weight: 500;

            @media (max-width: 767px) {
                &:not(:last-of-type) {
                    margin-right: 1rem;
                }
            }
        }
    }
</style>