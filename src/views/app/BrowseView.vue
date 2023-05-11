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
import { ref, onMounted } from 'vue';
import JobTile from '../../components/JobTile.vue';
import { getKlusjes } from '../../api/klusje';

const searchTerm = ref('');
const jobs = ref([]);

// Fetch jobs from the API
const fetchJobs = async () => {
  try {
    const result = await getKlusjes(null, { filter: searchTerm.value });
    console.log(result);
    jobs.value = result.data.map((klusje) => ({
      _id: klusje._id,
      name: klusje.name,
      description: klusje.description,
      price: klusje.price,
      address: klusje.address,
      category: klusje.category._id,
      images: klusje.images,
      state: klusje.state,
      user: klusje.user,
      helper: klusje.helper,
    }));
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
