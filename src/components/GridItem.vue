<script setup lang="ts">
defineProps<{
    header: string
    fullWidth?: boolean
}>();
</script>

<template>
    <div
        class="grid-card"
        :class="{ 'grid-card--full-width': fullWidth }"
    >
        <div class="card__title">
            <h3>{{ header }}</h3>
        </div>
        <slot />
    </div>
</template>

<style scoped lang="scss">
    .grid-card {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;

        border-radius: 16px;
        min-width: 208px;
        min-height: 208px;
        padding: 1rem;

        background-color: #4464;

        &__title {
            display: block;
            width: 100%;

            font-size: 16px;
        }

        &--full-width {
            width: 100%;
                    
            @media (min-width: 768px) {
                width: 640px;
            }

            @media (min-width: 1024px) {
                width: 900px;
            }
        }

        ::-webkit-scrollbar {
            height: 8px;
        }

        ::-webkit-scrollbar-thumb {
            background: #AAA2;
            border-radius: 8px;
        }
    }
</style>