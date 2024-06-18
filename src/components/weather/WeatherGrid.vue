<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';

import GridContainer from '@/components/grid/GridContainer.vue';
import HumidityCard from '@/components/weather/HumidityCard.vue';
import WindCard from '@/components/weather/WindCard.vue';
import CardItem from '../CardItem.vue';

const weatherStore = useWeatherStore();

const { weather } = storeToRefs(weatherStore);
</script>

<!-- the CardItems are just placeholders, which will be populated in the future -->

<template>
    <GridContainer class="weather-grid">
        <WindCard
            class="weather-grid__grid-item"
            :direction="weather.current.wind_direction_10m"
            :speed="weather.current.wind_speed_10m"
            :unit="weather.current_units.wind_speed_10m"
        />
        <CardItem
            class="weather-grid__grid-item"
            header=""
            :square="true"
        />
        <HumidityCard
            class="weather-grid__grid-item"
            :humidity="weather.current.relative_humidity_2m"
        />
        <CardItem
            class="weather-grid__grid-item"
            header=""
            :square="true"
        />
    </GridContainer>
</template>

<style lang="scss"> 
    .weather-grid {
        margin-bottom: 16px;
        width: 960px;

        &__grid-item {
            grid-row: 1;

            @media (max-width: 767px) {
                &:nth-child(even) {
                    // grid-row: 2;

                    display: none; // temporary
                }
            }

            @media (max-width: 1024px) {
                &:nth-child(4) {
                    // grid-row: 2;

                    display: none; // temporary
                }
            }
        }
    }
</style>