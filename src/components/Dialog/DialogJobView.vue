<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import { getKlusjeById } from '../../api/klusje';
import { getPersonalInfo } from '../../api/user'; // Import the getPersonalInfo function
import Carousel from 'primevue/carousel';

const emit = defineEmits(['close']);
const props = defineProps({
  visible: Boolean,
  klusjeId: {
    type: String,
    required: true,
  },
});

const selectedKlusje = ref(null);
const carouselImages = ref([]);
const username = ref('');

const close = () => {
  emit('close');
};


onMounted(async () => {
  if (props.klusjeId) {
    try {
      const klusje = await getKlusjeById(localStorage.getItem('token'), props.klusjeId);
      if (klusje.status === 'success') {
        selectedKlusje.value = klusje.data;
        console.log('Selected Klusje:', klusje.data); // Log the job details
        carouselImages.value = klusje.data.images.map((image) => ({ src: image }));
        console.log('Carousel Images:', carouselImages.value); // Log the carousel images
      
      } else {
        console.error('Error fetching klusje details:', klusje.message);
      }
    } catch (error) {
      console.error('Error fetching klusje details:', error);
    }
  }
});
</script>

<template>
  <Dialog
    :visible="props.visible"
    :closable="false"
    :header="selectedKlusje ? selectedKlusje.name : ''"
    modal
    :style="{ width: '832px' }"
    :breakpoints="{ '580px': 'calc(100vw - 1rem)' }"
  >

  <div v-if="selectedKlusje">
      <p>{{ selectedKlusje.description }}</p>
      <p>Price: €{{ selectedKlusje.price }}/u</p>
      <p>Address: {{ selectedKlusje.address }}</p>
      <p>State: {{ selectedKlusje.state }}</p>
    </div>

    <Carousel :value="carouselImages" style="max-height: 400px;">
      <template #item="{ value: image }">
        <img :src="image" alt="Carousel Image" style="max-height: 100%; max-width: 100%;" />
      </template>
    </Carousel>

    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Cancel" @click="close" class="p-button-secondary" />
        <Button label="Edit" />
        <Button label="Mark as Completed" />
      </div>

      <div v-if="message !== ''" style="color: var(--danger)">{{ message }}</div>
    </template>
  </Dialog>
</template>