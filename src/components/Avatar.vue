<script setup>
import { ref, onMounted, watch } from 'vue';

const image = ref(null);
const props = defineProps({
    src: {
        type: String,
    },
    width: {
        type: Number,
        default: 50,
    },
    name: {
        type: String,
        required: true,
    },
});
</script>
<template>
    <img v-if="props.src" :ref="image" :src="props.src" :alt="props.name" class="avatar__image" :width="props.width" />
    <div v-else :style="{width: `${props.width}px`}" class="avatar__placeholder">{{ props.name[0] }}</div>
</template>
<style scoped>
.avatar__image,
.avatar__placeholder {
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: var(--gray-200);
}

.avatar__image {
    display: block;
    object-fit: cover;
    object-position: center;
}

.avatar__placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: var(--white);
    background-color: var(--gray-400);
}
</style>