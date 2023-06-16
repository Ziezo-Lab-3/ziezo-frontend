<template>
    <Card class="p-m-4 p-major browse__view">
        <template #title>
            <h1>Mijn Klusjes</h1>
        </template>
        <template #content>
            <div class="w-full flex justify-content-center">
                <span class="p-input-icon-left search">
                    <i class="pi pi-search" />
                    <InputText v-model="searchTerm" placeholder="Zoek een klusje" style="width: 400px; max-width: calc(100vw - 2em);" />
                </span>
            </div>
            <div v-if="jobs.length" class="job-tiles-container">
                <JobTile v-for="job in jobs" :key="job._id" :job="job" @select-job="openJobModal(job._id)" :categories="categories" />
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
import { getCategories } from '../../api/category';

const selectedKlusje = ref(null);
const searchTerm = ref('');
const jobs = ref([]);
const categories = ref([]);
const openDialog = ref(false);

// Fetch jobs from the API
const fetchJobs = async () => {
    try {
        const result = await getKlusjes(localStorage.getItem('token'), {
            first: jobs.value.length,
            last: jobs.value.length + 18,
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

onMounted(async () => {
    const result = await getCategories(localStorage.getItem('token'));
    if (result.status === 'success') {
        categories.value = result.data;
        fetchJobs();
    } else {
        console.error('BrowseView.vue onMounted(): ' + result.message);
    }
});
</script>

<style scoped>
.browse__view .job-tiles-container {
    margin: 1em auto 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.browse__view .p-card-content {
    display: grid;
    grid-template-rows: auto 1fr;
}

.browse__view.p-card.p-major {
    height: fit-content;
}
</style>
<style>
.browse__view .p-card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>