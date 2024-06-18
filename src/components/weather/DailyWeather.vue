<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
import { parseWeatherCode } from '@/utils/weatherCodes';

import CardItem from '@/components/CardItem.vue';

const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const weatherStore = useWeatherStore();
const { weather } = storeToRefs(weatherStore);

// format daily into an array of objects
const dailyWeather = computed(() => {
    let { daily } = weather.value;
    let organizedDaily = [];

    for (let i = 0; i < 14; i++) {
        organizedDaily.push({
            day: daysOfTheWeek[new Date(daily.time[i]).getUTCDay()],
            icon: parseWeatherCode({code: daily.weathercode[i]}).icon,
            minTemperature: Math.round(daily.temperature_2m_min[i]),
            maxTemperature: Math.round(daily.temperature_2m_max[i]),
        })
    }

    return organizedDaily;
})
</script>

<template>
    <CardItem
        v-if="weather.daily"
        header="14 Day Forecast"
        :full-width="true"
        :hollow="true"
        class="daily-weather__container"
    >
        <div class="daily-weather__list">
            <div
                v-for="(day, i) in dailyWeather"
                :key="i"
                class="daily-weather__list-item"
            >
                <p class="daily-weather__text">
                    {{ i == 0 ? "Today" : day.day }}
                </p>
                <i
                    class="daily-weather__icon wi"
                    :class="day.icon"
                />
                <div>
                    <p class="daily-weather__text">
                        {{ `${day.minTemperature}° - ${day.maxTemperature}°` }}
                    </p>
                </div>
            </div>
        </div>
    </CardItem>
</template>

<style scoped lang="scss">
    .daily-weather {
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

            background-color: #AAA2;
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