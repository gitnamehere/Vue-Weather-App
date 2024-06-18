<script setup lang="ts">
import CardItem from '@/components/CardItem.vue';

defineProps<{
    humidity: number;
}>();
</script>

<template>
    <CardItem
        class="humidity-card"
        header="Humidity (WIP)"
        :square="true"
    >
        <div class="humidity-card__body">
            <h1 class="humidity-card__indicator">
                {{ humidity }}%
            </h1>
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
    }
</style>