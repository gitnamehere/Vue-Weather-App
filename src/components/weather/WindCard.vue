<script setup lang="ts">
import CardItem from '@/components/CardItem.vue';

interface Props {
    direction: number;
    speed: number;
    unit: string;
}

defineProps<Props>();
</script>

<template>
    <CardItem
        class="wind-card"
        header="Wind (WIP)"
        :square="true"
    >
        <div class="wind-card__body">
            <h1 class="wind-card__indicator">
                {{ speed }}mph
                {{ direction }}°
            </h1>
        </div>
    </CardItem>
</template>

<style lang="scss">
    .wind-card {
        &__body {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100%;
        }
    }
</style>