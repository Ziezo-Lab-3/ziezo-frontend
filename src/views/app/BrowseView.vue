<template>
    <Card class="p-m-4 p-major browse__view">
        <template #title>
            <h1>Mijn Klusjes</h1>
        </template>
        <template #content>
            <InputText v-model="searchTerm" placeholder="Zoek een klusje" />
            <div v-if="jobs.length" class="job-tiles-container">
                <JobTile v-for="job in jobs" :key="job._id" :job="job" @select-job="openJobModal(job._id)" />
            </div>
            <div v-else>
                Loading...
            </div>
            <DialogJobView :visible="openDialog" :klusjeId="selectedKlusje" @close="openDialog = false" />
        </template>
    </Card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import JobTile from '../../components/JobTile.vue';
import DialogJobView from '../../components/Dialog/DialogJobView.vue';
import { getKlusjes } from '../../api/klusje';

const selectedKlusje = ref(null);
const searchTerm = ref('');
const jobs = ref([]);
const openDialog = ref(false);

// Fetch jobs from the API
const fetchJobs = async () => {
    try {
        const result = await getKlusjes(localStorage.getItem('token'), {
            first: jobs.value.length,
            last: jobs.value.length + 10,
            filter: JSON.stringify({
                $and: [
                    { user: { $ne: localStorage.getItem('userId') } },
                    { state: 'open' },
                    { 
                        $or: [
                            { name: { $regex: searchTerm.value, $options: 'i' } },
                            { description: { $regex: searchTerm.value, $options: 'i' } },
                        ],
                    },
                ],
            }),
        });

        if (result.status === 'success') {
            let items = [...jobs.value, ...result.data];
            items = items.filter((item, index, self) => self.findIndex((t) => t._id === item._id) === index);
            jobs.value = items;

        } else {
            console.error('BrowseView.vue onMounted(): ' + result.message);
        }
    } catch (error) {
        console.error('BrowseView.vue onMounted(): ' + error);
    }
};

// Watch for changes in the search term
watch(searchTerm, async () => {
    try {
        jobs.value = [];
        await fetchJobs();
    } catch (error) {
        console.error('BrowseView.vue onSearchTermChange(): ' + error);
    }
});

const openJobModal = async (id) => {
    selectedKlusje.value = id;
    openDialog.value = true;
};

onMounted(fetchJobs);
</script>

<style>
.browse__view .job-tiles-container {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.browse__view .p-card-content {
    display: grid;
    grid-template-rows: auto 1fr;
}

.browse__view.p-card.p-major {
    height: fit-content;
}
</style>