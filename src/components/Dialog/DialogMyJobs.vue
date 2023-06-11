<script setup>
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue';
import { getKlusjeById } from '../../api/klusje';
import { getPersonalInfo } from '../../api/user'; // Import the getPersonalInfo function
import Galleria from 'primevue/galleria';

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
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
]);

const close = () => {
    emit('close');
};

const getStateText = () => {
  if (selectedKlusje.value && selectedKlusje.value.state === 'open') {
    return 'Niet uitgevoerd';
  }
  return '';
};

watch(() => props.jobId, async(val) => {
    if (val) {
        try {
            const klusje = await getKlusjeById(localStorage.getItem('token'), val);
            if (klusje.status === 'success') {
                selectedKlusje.value = klusje.data;
                carouselImages.value = klusje.data.images;
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
    modal
    :style="{ width: '832px' }"
    :breakpoints="{ '580px': 'calc(100vw - 1rem)' }"
  >
  <template #header ><h2>{{ selectedKlusje ? selectedKlusje.name : '' }}</h2></template>
    <div v-if="selectedKlusje" class="dialog-content">
      <div class="left-side">
        <h3>{{ dummyNames[0].firstName }} {{ dummyNames[0].lastName }}</h3>
        <Galleria :value="carouselImages" numVisible="3" style="height: 200px" >
            <template #item="image">
                <img style="width: 100%; height: 100%; object-position: center; object-fit: fit;" :src="image.item" alt="Non-descript image uploaded by user" />
            </template>
            <template #thumbnail="image">
                <img style="width: 100%; height: 100%; object-position: center; object-fit: cover;" :src="image.item" alt="Non-descript thumbnail uploaded by user" />
            </template>
        </Galleria>
      </div>
      <div class="right-side">
        <h3>Beschrijving</h3>
        <p>{{ selectedKlusje.description }}</p>
        <h3>Adres</h3>
        <p>{{ selectedKlusje.address }}</p>
        <div class="details">
          <div class="price-state">
            <p class="p-state">X   {{ getStateText() }}</p>
            <p class="p-price">{{ selectedKlusje.price }}€</p>
          </div>
        </div>
        
      </div>
    </div>

    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Cancel" @click="close" class="p-button-secondary" />
        <div class="right-footer">
          <Button class="p-button-secondary" label="Bewerken" />
          <Button class="p-button" label="Klusje uitgevoerd" />
        </div>
      </div>

      <div v-if="message !== ''" style="color: var(--danger)">{{ message }}</div>
    </template>
  </Dialog>
</template>

<style>
.dialog-content {
  display: flex;
  gap: 1rem;
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