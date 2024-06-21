<script setup lang="ts">
defineProps<{progress: string}>();
</script>

<template>
    <div class="raindrop">
        <div class="raindrop__water" />
    </div>
</template>

<style lang="scss">
    .raindrop {
        display: flex;
        background-color: #AAA2;
        mask-size: 100% 100%;
        mask-repeat: no-repeat;
        mask-image: url("@/assets/weather-icons/svg/wi-raindrop.svg");

        &__water {
            margin-top: auto;
            height: v-bind(progress);
            width: 100%;
            background-color: #FFF;

            transition: height 0.5s ease;
        }
    }
</style>