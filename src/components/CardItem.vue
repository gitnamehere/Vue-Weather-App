<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    header: string;
    collapsible?: boolean;
    fullWidth?: boolean;
    hollow?: boolean;
    square?: boolean;
}>();

const collapsed = ref(false);

function toggleCollapsed() {
    collapsed.value = !collapsed.value;
}

</script>

<template>
    <div
        class="card"
        :class="{ 'card--full-width': fullWidth, 'card--hollow': hollow, 'card--square': square }"
    >
        <div class="card__header">
            <h3>{{ header }}</h3>
            <div
                v-if="collapsible"
                class="card__header-button"
                @click="toggleCollapsed"
            >
                {{ collapsed ? "+" : "-" }}
            </div>
        </div>
        <Transition name="card__collapse">
            <slot v-if="!collapsed" />
        </Transition>
    </div>
</template>

<style scoped lang="scss">
    .card {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;

        border-radius: 16px;
        min-width: 152px;
        min-height: 24px;
        padding: 16px;
        background-color: #3382;

        &--hollow {
            border: 2px solid #FFF2;
            padding: 12px;

            background-color: unset;
        }

        &--full-width {
            width: 100%;
                    
            @media (min-width: 768px) {
                width: 716px;
            }

            @media (min-width: 1024px) {
                width: 960px;
            }
        }

        &--square {
            aspect-ratio: 1;
        }

        &__header {
            display: flex;
            width: 100%;
            height: 24px;
            justify-content: space-between;
            font-size: 16px;
        }

        &__header-button {
            width: 24px;
            border-radius: 8px;
            background-color: #FFF2;
            text-align: center;

            cursor: pointer;
            -webkit-user-select: none;
            user-select: none;
        }

        &__collapse {
            &-enter-active {
                transition: max-height 0.25s ease, opacity 0.25s 0.25s ease;
                overflow: hidden;
            }

            &-leave-active {
                transition: max-height 0.25s 0.25s ease, opacity 0.25s ease;
                overflow: hidden;
            }

            &-enter-from,
            &-leave-to {
                max-height: 0;
                opacity: 0;
            }

            &-enter-to,
            &-leave-from {
                max-height: calc(140px);
                opacity: 1;
            }
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