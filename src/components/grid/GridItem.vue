<script setup lang="ts">
defineProps<{
    header: string
    fullWidth?: boolean
    hollow?: boolean
}>();
</script>

<template>
    <div
        class="grid-card"
        :class="{ 'grid-card--full-width': fullWidth, 'grid-card--hollow': hollow }"
    >
        <div class="grid-card__title">
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
        min-width: 160px;
        min-height: 160px;
        padding: 16px;
        background-color: #6683;

        &--hollow {
            border: 2px solid #FFF2;
            padding: 12px;

            background-color: unset;
        }

        &--full-width {
            width: 100%;
                    
            @media (min-width: 768px) {
                width: 640px;
            }

            @media (min-width: 1024px) {
                width: 960px;
            }
        }

        &__title {
            display: block;
            width: 100%;

            font-size: 16px;
        }

        ::-webkit-scrollbar {
            height: 8px;
        }

        ::-webkit-scrollbar-thumb {
            background: #FFF2;
            border-radius: 8px;
        }
    }
</style>