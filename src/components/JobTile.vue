<template>
    <Card class="job-tile" :style="{ width: tileWidth + 'px' }" @click="onClick">
        <template #header>
            <img :src="job.images[0]" alt="Job Image" />
        </template>
        <template #title>{{ job.name }}</template>
        <template #subtitle>{{ category.name }}</template>
        <template #content>
            <p>{{ job.description }}</p>
        </template>
        <template #footer>
            <div class="flex justify-content-between mt-2">
                <p class="price">€ {{ job.price }}</p>
                <Button label="Details" />
            </div>
        </template>
        <DialogJobView v-if="showDialog" @close="showDialog = false" :visible="showDialog" :klusjeId="selectedJobId" />
    </Card>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';
import DialogJobView from "../components/Dialog/DialogJobView.vue";

const showDialog = ref(false);
const selectedJobId = ref(null);

const emit = defineEmits(['selectJob'])
const props = defineProps({
    job: {
        type: Object,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
});

const category = computed(() => {
    return props.categories.find((category) => category._id === props.job.category);
});

const onClick = () => {
    emit('selectJob', props.job._id);
};
</script>
<style scoped>
.job-tile {
    cursor: pointer;
    width: 280px;
    margin: 0 1em 1em 0;
    transition: transform 0.3s ease-in-out;
    border-radius: 1em;
}

.job-tile:hover {
    transform: scale(1.025);
}

.job-tile img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    object-position: center;
    border-radius: 1em;
}

p {
    margin: 0;
    line-height: 1.5em;
}

.price {
    height: fit-content;
    margin: auto 0;
    font-size: 1.2em;
    font-weight: bold;
    color: var(--primary);
}
</style>
<style>
.p-card.p-major .job-tile .p-card-title,
.p-card.p-major .job-tile .p-card-subtitle,
.p-card.p-major .job-tile .p-card-content,
.p-card.p-major .job-tile .p-card-footer {
    padding: 0;
}

.p-card.p-major .job-tile .p-card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.p-card.p-major .job-tile .p-card-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
</style>