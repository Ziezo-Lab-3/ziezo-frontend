<script setup>
import { reactive, onMounted, watch } from 'vue';
import { getKlusjes, putKlusje } from '../../api/klusje';
import decodeJWT from '../../js/decodeJWT';
import JobCard from '../JobCard.vue';

const emit = defineEmits(['on-accept']);

const props = defineProps({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
});
const state = reactive({
    jobs: [],
    selectedJob: null,
    showConfirmDialog: false,
});

const confirmAction = (id) => {
    console.log(id);
    state.selectedJob = state.jobs.find((job) => job._id === id);
    state.showConfirmDialog = true;
}

const acceptHelper = async () => {
    const token = localStorage.getItem('token');

    const result = await putKlusje(token, state.selectedJob._id, {
        helper: props.userId,
        state: 'in progress'
    });
    
    if (result.status === 'success') {
        state.showConfirmDialog = false;
        state.selectedJob = null;
    }
    else console.error(result.message);

    emit('on-accept', result.data);
    getJobs();
}

const getJobs = async () => {
    const token = localStorage.getItem('token');
    const id = decodeJWT(token).id;
    let jobs = [];

    let result = await getKlusjes(localStorage.getItem('token'), {
        filter: {
            user: props.userId,
            candidates: id,
        }
    });
    if (result.status === 'success') {
        jobs = result.data;
    }
    else console.error(result.message);

    result = await getKlusjes(localStorage.getItem('token'),{
        filter: {
            user: id,
            candidates: props.userId,
        }
    });
    if (result.status === 'success') {
        jobs = [...jobs, ...result.data];
    }
    else console.error(result.message);
    jobs.forEach((job) => {
        job.owner = job.user === id;
    })
    jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    jobs.sort((a, b) => b.__priority - a.__priority);
    state.jobs = jobs;
}

onMounted(getJobs);
watch(() => props.userId, getJobs);
</script>
<template>
    <div class="job-list" v-if="state.jobs.length > 0">
        <div><b>Gemeenschappelijke klusjes:</b></div>
        <div class="job-list__scroll">
            <JobCard v-for="job in state.jobs" :key="job._id" :job="job" :owner="job.owner" @click="confirmAction"/>
        </div>
    </div>
    <Dialog modal :draggable="false" :closable="false" :visible="state.showConfirmDialog">
        <template #header>
            <b>Waarschuwing</b>
        </template>
        <p>Weet je zeker dat je het volgende klusje aan <b>{{ props.username }}</b> wilt geven?</p>
        <div class="job-list__dialog__job-container">
            <p><b><i>{{ state.selectedJob?.name }}</i></b></p>
            <p><i>{{ state.selectedJob?.description }}</i></p>
        </div>
        <template #footer>
            <div class="flex justify-content-between">
                <Button label="Annuleren" class="p-button-secondary" @click="state.showConfirmDialog = false" />
                <Button label="Ja, ik ben zeker" @click="acceptHelper" />
            </div>
        </template>
    </Dialog>
</template>
<style scoped>
.job-list {
    min-width: 0px;

}
.job-list__scroll {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: .5rem;
    width: 100%;
    overflow-x: auto;
}

.job-list__dialog__job-container {
    padding: 1rem;
    background-color: var(--gray-100);
    max-width: 540px;
}
</style>