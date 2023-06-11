<script setup>
import { ref, defineProps, defineEmits, onMounted, reactive } from 'vue';
import { getKlusjeById } from '../../api/klusje';
import { getPersonalInfo } from '../../api/user'; // Import the getPersonalInfo function
import Galleria from 'primevue/galleria';

const emit = defineEmits(['close']);

const props = defineProps({
  visible: Boolean,
  klusjeId: {
    type: String,
    required: true,
  },
});

/**
 * @type {{ selectedKlusje: Object }}
 */
const state = reactive({
    selectedKlusje: null,
});

const close = () => {
  emit('close');
};

const getStateText = () => {
  if (state.selectedKlusje && state.selectedKlusje.state === 'open') {
    return 'Niet uitgevoerd';
  }
  return '';
};


onMounted(async () => {
  if (props.klusjeId) {
    try {
      const klusje = await getKlusjeById(localStorage.getItem('token'), props.klusjeId);
      if (klusje.status === 'success') {
        state.selectedKlusje = klusje.data;      
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
    :header="state.selectedKlusje ? state.selectedKlusje.name : ''"
    modal
    :style="{ width: '832px' }"
    :breakpoints="{ '580px': 'calc(100vw - 1rem)' }"
  >
    <div v-if="state.selectedKlusje" class="dialog-content">
      <div class="left-side">
        <Galleria :value="state.selectedKlusje.images" numVisible="3" style="height: 200px" >
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
        <p>{{ state.selectedKlusje.description }}</p>
        <h3>Adres</h3>
        <p>{{ state.selectedKlusje.address }}</p>
        <div class="details">
          <div class="price-state">
            <p class="p-state">X   {{ getStateText() }}</p>
            <p class="p-price">{{ state.selectedKlusje.price }}€ / u</p>

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