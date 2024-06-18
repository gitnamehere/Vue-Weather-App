<script setup lang="ts">
import Searchbar from '@/components/LocationSearchbar.vue';
</script>

<template>
    <div class="landing">
        <h1 class="landing__title">
            A Vue Weather App
        </h1>
        <Searchbar class="landing__search-bar" />
        <div class="landing__api-link">
            <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .landing {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        inset: 0;

        &__title {
            margin-bottom: 16px;
            font-weight: 500;
            font-size: 36px;
            text-align: center;
        }

        &__search-bar {
            margin-bottom: 16px;

            @media (min-width: 768px) {
                width: 480px;
            }

            @media (min-width: 1024px) {
                width: 768px;
            }
        }

        &__api-link {
            height: 36px;
            font-size: 0.8rem;
            text-align: center;
        }
    }
</style>
