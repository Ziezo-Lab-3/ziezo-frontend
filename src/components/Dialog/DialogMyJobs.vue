<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import { getKlusjeById } from '../../api/klusje';
import { getPersonalInfo } from '../../api/user'; // Import the getPersonalInfo function
import Carousel from 'primevue/carousel';

const emit = defineEmits(['close']);
const props = defineProps({
    visible: Boolean,
    jobId: {
        type: String,
        required: true,
    },
});

const selectedKlusje = ref(null);

const dummyNames = [
  { firstName: 'Sam', lastName: 'De Backer' },
  { firstName: 'Maarten', lastName: 'Vanwesenmael' },
  { firstName: 'Anna', lastName: 'Devis' },
  { firstName: 'Jef', lastName: 'Van den Broeck',

}
  // Add more dummy names as needed
];

const carouselImages = ref([
  { src: 'https://picsum.photos/200/300' },
  { src: 'https://picsum.photos/200/300' },
  { src: 'https://picsum.photos/200/300' },
]);

console.log('Carousel images:', carouselImages.value)


const close = () => {
  emit('close');
};

const getStateText = () => {
  if (selectedKlusje.value && selectedKlusje.value.state === 'open') {
    return 'Niet uitgevoerd';
  }
  return '';
};


onMounted(async () => {
    if (props.jobId) {
        try {
            const klusje = await getKlusjeById(localStorage.getItem('token'), props.jobId);
            if (klusje.status === 'success') {
                selectedKlusje.value = klusje.data;
                console.log('Selected Klusje:', klusje.data);
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
    <div v-if="selectedKlusje" class="dialog-content">
      <div class="left-side">
        <h3>{{ dummyNames[0].firstName }} {{ dummyNames[0].lastName }}</h3>
        <Carousel :value="carouselImages" :numVisible="1" :numScroll="1" :circular="true" :autoplayInterval="3000" :autoplay="true" style="max-width: 600px">
          <template #item="{value}">
            <img :src="'https://picsum.photos/200/300'" style="width: 100%, height: 50%"/>
          </template>
        </Carousel>
      </div>
      <div class="right-side">
        <h3>Beschrijving</h3>
        <p>{{ selectedKlusje.description }}</p>
        <h3>Adres</h3>
        <p>{{ selectedKlusje.address }}</p>
        <div class="details">
          <div class="price-state">
            <p class="p-state">X   {{ getStateText() }}</p>
            <p class="p-price">{{ selectedKlusje.price }}€ / u</p>

          </div>
        </div>
        
      </div>
    </div>

    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Cancel" @click="close" class="p-button-secondary" />
        <div class="right-footer">
          <Button class="p-button" label="Stuur bericht" />
        </div>
      </div>

      <div v-if="message !== ''" style="color: var(--danger)">{{ message }}</div>
    </template>
  </Dialog>
</template>

<style>
.dialog-content {
  display: flex;
}

.left-side {
  width: 40%;
}

.right-side {
  width: 60%;
}

.right-footer {
  display: flex;
  gap: 1rem;
}

.p-price {
  font-size: 1rem;
  font-weight: bold;
  color: green;
}

.p-state {
  font-size: 1rem;
  font-weight: bold;
  color: red;
}

.details {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: 1rem;
}

.price-state {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 2rem;
}
.p-carousel-content {
  height: 200px;
  overflow-y: hidden;
}


</style>