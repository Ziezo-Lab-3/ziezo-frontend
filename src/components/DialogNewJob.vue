<script setup>
import FileUpload from 'primevue/fileupload';
import { ref, reactive, watch, defineEmits } from 'vue';
const visible = ref(false);
const emit = defineEmits(['close']);
const props = defineProps({ visible: false });
watch(() => props.visible, (val) => visible.value = val);

const close = () => {
    props.visible = false;
    emit('close');
}

const accept = () => {
    console.log(state);
    state.description = '';
    state.title = '';
    state.price = null;
    state.images = [];
    close();
}

const state = reactive({
    title: '',
    description: '',
    price: null,
    images: []
});
</script>
<template>
    <Dialog :visible="visible" :closable="false" header="Klusje Plaatsen" modal :style="{width: '540px'}" :breakpoints="{  '580px': 'calc(100vw - 1rem)' }">
        <div class="labelInput">
            <label>Titel</label>
            <InputText v-model="state.title" placeholder="Kleerkast assembleren" />
        </div>
        <div class="labelInput">
            <label>Beschrijving</label>
            <TextArea v-model="state.description" placeholder="Ik heb hulp nodig met..." autoResize style="resize: none" />
        </div>
        <div class="labelInput">
            <label>Prijs</label>
            <InputNumber v-model="state.price" mode="currency" currency="EUR" placeholder="€15,00" :minFractionDigits="2" :maxFractionDigits="2" />
        </div>
        <div class="labelInput">
            <label>Afbeeldingen</label>
            <FileUpload :disabled="true" name="images[]" mode="advanced" accept="image/*" maxFileSize="1000000" :multiple="true" >
                <template #empty>
                    <p>Sleep afbeeldingen naar hier om te uploaden.</p>
                </template>
            </FileUpload>
        </div>
        <template #footer>
            <div class="flex justify-content-between" >
                <Button label="Cancel" @click="close" class="p-button-secondary" />
                <Button label="Plaats Klusje" @click="accept" />
            </div>
        </template>
    </Dialog>
</template>