<script setup lang="ts">
import { ref } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const weatherStore = useWeatherStore();

const location = ref('');
const locationsSearched = ref(false);
const { weather, locations } = storeToRefs(weatherStore);

let timer: number;

const router = useRouter();

const getLocations = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        weatherStore.getLocations(location.value);
        locationsSearched.value = true;
    }, 500);
}

const getWeather = () => {
    if (!location.value) return;

    clearTimeout(timer);
    locationsSearched.value = false;
    weatherStore.getWeatherByName(location.value);
    router.push({
        name: "weather",
        params: {
            location: location.value
        }
    });
};

const getWeatherByCoords = (location: any) => {
    locationsSearched.value = false;
    weatherStore.getWeatherFromGeocoding(location);
    router.push({
        name: "weather",
        params: {
            location: location.name
        }
    });
};
</script>

<template>
    <div>
        <div class="location-searchbar">
            <input
                v-model="location"
                class="location-searchbar__input"
                placeholder="Enter a city or zip code"
                @keyup.stop="getLocations"
                @keyup.enter="getWeather"
            >
            <button
                class="location-searchbar__button"
                :class="[weather?.current?.is_day ? 'location-searchbar__button--day' : 'location-searchbar__button--night' ]"
                @click="getWeather"
            >
                <font-awesome-icon 
                    :icon="['fas', 'magnifying-glass']" 
                    size="xl"
                />
            </button>
        </div>
        <div
            v-if="locationsSearched"
            class="location-searchbar__list"
        >
            <div 
                v-for="locationName in locations"  
                :key="locationName" 
                class="location-searchbar__list-item"
                @click="getWeatherByCoords(locationName)"
            >
                <p>
                    {{ locationName.name }}, {{ locationName.admin1 }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .location-searchbar {
        display: flex;
        align-items: center;
        justify-content: center;

        box-sizing: border-box;

        border: 1px solid #ccc;
        border-radius: 16px;
        height: 40px;
        width: 100%;
        padding: 8px;

        background-color: #fff;

        &__input {
            border: none;
            background-color: unset;
            height: 100%;
            width: 95%;

            outline: none;
            font-size: 1.2rem;
        }

        &__button {
            margin: auto;
            margin-right: 0;
            border: none;
            height: 100%;

            background-color: transparent;

            &--day {
                color: #2885dd;
            }

            &--night {
                color: #1d104b;
            }
        }

        &__list {
            position: absolute;

            margin-top: 16px;
            border-radius: 8px;

            background-color: white;
            color: #000;

            overflow: hidden;
        }

        &__list-item {
            border-bottom: 1px solid #000;
            width: 100%;
            height: 100%;
            padding: 8px 16px;

            &:last-of-type {
                border-bottom: none;
            }

            &:hover{
                background-color: #ccc;
                cursor: pointer;
            }
        }
    }
</style>
