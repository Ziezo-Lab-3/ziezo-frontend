<script setup>
import { ref, defineProps, watch } from 'vue';
import { getKlusjeById } from '../../api/klusje';
import { getPersonalInfo } from '../../api/user'; // Import the getPersonalInfo function

import { VueperSlides, VueperSlide } from 'vueperslides';

const emit = defineEmits(['close']);

const props = defineProps({
    visible: Boolean,
    jobId: {
        type: String,
        required: true,
    },
});

const data = ref(null);

const close = () => {
    emit('close');
};

watch(() => props.jobId, async(val) => {
    if (val) {
        try {
            const result = await getKlusjeById(localStorage.getItem('token'), val);
            if (result.status === 'success') {
                data.value = result.data;
            } else {
                console.error('Error fetching klusje details:', result.message);
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
    <template #header >
        <h2>{{ data ? data.name : '' }}</h2>
    </template>
    <VueperSlides>
        <VueperSlide v-for="(image, index) in data.images" :key="index">
            <img :src="image" />
        </VueperSlide>
    </VueperSlides>
    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Cancel" @click="close" class="p-button-secondary" />
        <div class="right-footer">
          <Button class="p-button-secondary" label="Bewerken" />
          <Button class="p-button" label="Markeer als gedaan" />
        </div>
      </div>
      <div v-if="message !== ''" style="color: var(--danger)">{{ message }}</div>
    </template>
  </Dialog>
</template>

<style>
</style>