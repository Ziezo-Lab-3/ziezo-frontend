<template>
  <Card class="p-m-4 p-major">
    <template #title>Mijn Klusjes</template>
    <template #content>
      <InputText v-model="searchTerm" placeholder="Zoek een klusje" />
      <div v-if="jobs.length" class="job-tiles-container">
        <JobTile v-for="job in jobs" :key="job._id" :job="job" />
      </div>
      <div v-else>
        Loading...
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import JobTile from '../../components/JobTile.vue';
import { getKlusjes } from '../../api/klusje';

const searchTerm = ref('');
const jobs = ref([]);

// Fetch jobs from the API
const fetchJobs = async () => {
  try {
    const result = await getKlusjes(localStorage.getItem('token'), {
      first: 0,
      last: 10,
    });
    console.log('API response:', result); // Add this line to log the response

    if (result.status === 'success') {
      jobs.value = result.data;
    } else {
      console.error('BrowseView.vue onMounted(): ' + result.message);
    }
  } catch (error) {
    console.error('BrowseView.vue onMounted(): ' + error);
  }
};

// Watch for changes in the search term
watch(searchTerm, async (newTerm) => {
  try {
    const result = await getKlusjes(localStorage.getItem('token'), {
      first: 0,
      last: 10,
      filter: JSON.stringify({}),
    });
    if (result.status === 'success') {
      jobs.value = result.data;
    } else {
      console.error('BrowseView.vue onSearchTermChange(): ' + result.message);
    }
  } catch (error) {
    console.error('BrowseView.vue onSearchTermChange(): ' + error);
  }
});

onMounted(fetchJobs);
</script>

<style>
.job-tiles-container {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
}
</style>
