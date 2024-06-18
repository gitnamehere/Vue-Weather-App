<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
import { parseWeatherCode } from '@/utils/weatherCodes';

import CardItem from '@/components/CardItem.vue';

const weatherStore = useWeatherStore();
const { weather } = storeToRefs(weatherStore);

// format hourly into an array of objects
const hourlyWeather = computed(() => {
    let { hourly } = weather.value;
    let organizedHourly = [];

    for (let i = 0; i < 24; i++) {
        organizedHourly.push({
            icon: parseWeatherCode({code: hourly.weather_code[i], isDay: hourly.is_day[i]}).icon,
            temperature: Math.round(hourly.temperature_2m[i]),
            time: new Date(hourly.time[i]).toLocaleTimeString([], { hour: "numeric" })
        })
    }

    return organizedHourly;
})
</script>

<template>
    <CardItem
        v-if="weather.hourly"
        header="Hourly Forecast"
        :full-width="true"
        class="hourly-weather__container"
    >
        <div class="hourly-weather__list">
            <div
                v-for="(hour, i) in hourlyWeather"
                :key="i"
                class="hourly-weather__list-item"
            >
                <p class="hourly-weather__text">
                    {{ i == 0 ? "Now" : `${hour.time}` }}
                </p>
                <i
                    class="hourly-weather__icon wi"
                    :class="hour.icon"
                />
                <div>
                    <p class="hourly-weather__text">
                        {{ `${hour.temperature}°` }}
                    </p>
                </div>
            </div>
        </div>
    </CardItem>
</template>

<style scoped lang="scss">
    .hourly-weather {
        &__container {
            flex-direction: column;
            margin-bottom: 16px;
        }

        &__icon {
            margin: 10px 0;
            font-size: 2rem;
        }
    
        &__list {
            display: flex;
            flex-direction: row;
            align-items: center;
            overflow-x: scroll;

            width: 100%;
        }

        &__list-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            margin: 8px 4px;
            padding: 4px 0;
            min-width: 80px;
            height: 112px;

            border: 2px solid #FFF2;
            border-radius: 8px;

            &:first-of-type {
                margin-left: 0;
            }

            &:last-of-type {
                margin-right: 0;
            }
        }

        &__title {
            display: block;
            width: 100%;
        }

        &__text {
            font-size: 16px;
            line-height: 24px;
        }
    }
</style>