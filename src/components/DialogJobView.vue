<script setup>
import FileUpload from 'primevue/fileupload';
import { postKlusje } from '../api/klusje';
import { ref, reactive, watch, defineEmits, computed, onMounted } from 'vue';
import { getKlusjeById } from '../api/klusje'; // import the getKlusjeById function

const visible = ref(false);
const emit = defineEmits(['close']);
const props = defineProps({ visible: false });
watch(() => props.visible, (val) => visible.value = val);
const message = ref("");
const klusjeId = ref(null); // add a new ref to store the klusje ID

const close = () => {
    props.visible = false;
    state.description = '';
    state.title = '';
    state.price = null;
    state.images = [];
    emit('close');
}

const accept = async () => {
    console.log(state);
    let res = await postKlusje({
        name: state.title,
        description: state.description,
        price: state.price,
        image: "https://placehold.co/600x400"
    }, localStorage.getItem('token'));
    console.log(res);
    if (res.status === "success")
        close();
    else {
        message.value = "Er is iets fout gegaan bij het plaatsen van het klusje.";
    }
}

const canPost = computed(() => {
    return state.title.length > 0 && state.description.length > 24 && state.price > 5;
});

const state = reactive({
    title: '',
    description: '',
    price: null,
    images: []
});

onMounted(async () => { // use onMounted to fetch the klusje data
    const id = klusjeId.value;
    if (id) {
        const klusje = await getKlusjeById(id, localStorage.getItem('token'));
        state.title = klusje.name;
        state.description = klusje.description;
        state.price = klusje.price;
        state.images = [klusje.image];
    }
});

</script>

<template>
    <Dialog
      :visible="visible"
      :closable="false"
      header="Test"
      modal
      :style="{ width: '832px' }"
      :breakpoints="{ '580px': 'calc(100vw - 1rem)' }"
    >
      <div class="labelInput">
        <label>Titel</label>
        <input v-model="state.title" />
      </div>
      <div class="labelInput">
        <label>Beschrijving</label>
        <textarea v-model="state.description"></textarea>
      </div>
      <div class="labelInput">
        <label>Prijs</label>
        <input type="number" v-model="state.price" />
      </div>
      <div class="labelInput">
        <label>Adres</label>
      </div>
      <div class="labelInput">
        <label>Aangemaakt: </label>
      </div>
      <template #footer>
        <div class="flex justify-content-between">
          <Button label="Cancel" @click="close" class="p-button-secondary" />
          <Button label="Plaats Klusje" @click="accept" :disabled="!canPost" />
        </div>
  
        <div v-if="message != ''" style="color: var(--danger)">{{ message }}</div>
      </template>
    </Dialog>
  </template>