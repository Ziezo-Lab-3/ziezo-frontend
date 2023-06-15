<script setup>
import { reactive, onMounted } from "vue";

const emit = defineEmits(['click']);
const props = defineProps({
    job: {
        type: Object,
        required: true,
    },
    owner: {
        type: Boolean,
        default: false,
    },
});

const state = reactive({
    job: {
        name: '',
        avatar: '',
        id: null,
        taken: false,
        status: '',
    }
});

const click = () => {
    emit('click', state.job.id);
}

onMounted(() => {
    state.job.name = props.job.name || 'Job';
    state.job.avatar = props.job.images[0] || null;
    state.job.id = props.job._id;
    state.job.status = props.job.state;
    state.job.taken = !!props.job.helper;
});

const getClass = () => {
    return {
        'job-card': true,
        'job-card--owner': props.owner,
    }
}
</script>
<template>
    <div :class="getClass()">
        <img v-if="state.job.avatar" height="72" width="72" :src="state.job.avatar" />
        <p><b>{{ state.job.name }}</b></p>
        <div class="job-card__button-wrapper">
            <Button v-if="props.owner && !state.job.taken" label="Geven" @click="click" />
            <div v-else class="job-card__status">{{ state.job.status }}</div>
        </div>
    </div>
</template>
<style scoped>
.job-card {
    padding: .5em;
    border-radius: 1em;
    background-color: var(--white);
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 
        "image name"
        "image other";
    gap: .5em;
    width: fit-content;
    height: fit-content;

    border: 3px solid var(--gray-300)
}

.job-card--owner {
    border: 3px solid var(--secondary);
}

job-card:hover {
    cursor: pointer;
    background-color: var(--gray-100);
}

.job-card img {
    grid-area: image;
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center;
}

.job-card p {
    grid-area: name;
    margin: 0;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.job-card__button-wrapper {
    grid-area: other;
    justify-self: end;
}

.job-card__status {
    grid-area: other;
    justify-self: end;
    text-transform: capitalize;
}
</style>
