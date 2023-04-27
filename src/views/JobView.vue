<template>
    <Card class="p-m-4 p-major">
      <template #title>Mijn Klusjes</template>
      <template #content>
        <InputText v-model="searchTerm" placeholder="Zoek een klusje" />
        <div v-if="jobs.length" class="job-tiles-container">
          <div v-for="job in jobs" :key="job._id">
            <JobTile :job="job" />
          </div>
        </div>
        <div v-else>
          Loading...
        </div>
      </template>
    </Card>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import JobTile from '../components/JobTile.vue';
  import { getKlusjes } from '../api/klusje';
  
  const searchTerm = ref('');
  const jobs = ref([]);
  
  // Fetch jobs from the API
  const fetchJobs = async () => {
    try {
      const result = await getKlusjes();
      console.log(result);
      jobs.value = result.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  onMounted(fetchJobs);
  </script>

<style>
.job-tiles-container {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
}
</style>






