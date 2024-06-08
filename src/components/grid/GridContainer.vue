<script setup lang="ts">

</script>

<template>
    <div class="grid-container grid-container--full-width">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.grid-container {
    background-color: red;
    display: grid;
    grid-template-columns: 4;

    &--full-width {
        width: 880px;

        @media (max-width: 768px) {
            width: 100%;
        }
    }
}
</style>