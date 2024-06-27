<script setup lang="ts">
import CardItem from '@/components/CardItem.vue';
import HumidityGauge from '@/components/HumidityGauge.vue';

defineProps<{
    humidity: number;
}>();
</script>

<template>
    <CardItem
        class="humidity-card"
        header="Humidity"
        :square="true"
    >
        <div class="humidity-card__body">
            <HumidityGauge
                class="humidity-card__raindrop"
                :progress="`${humidity}%`"
            />
            <h2 class="humidity-card__indicator">
                {{ humidity }}%
            </h2>
        </div>
    </CardItem>
</template>

<style lang="scss">
    .humidity-card {
        &__body {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100%;
        }

        &__raindrop {
            margin: 8px;
            height: 42%;
            max-height: 64px;
            width: 50%;
        }
    }
</style>
