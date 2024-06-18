<script setup lang="ts">

</script>

<template>
    <div class="grid-container">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.grid-container {
    display: grid;
    width: 100%;

    column-gap: 16px;
    row-gap: 16px;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    @media (min-width: 768px) {
        width: 716px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (min-width: 1024px) {
        width: 960px;
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}
</style>