<script setup>
import FileUpload from 'primevue/fileupload';
import { postKlusje } from '../../api/klusje';
import { getPersonalInfo } from '../../api/user';
import { getCategories } from '../../api/category';
import { ref, reactive, watch, defineEmits, computed, onMounted } from 'vue';
const visible = ref(false);
const emit = defineEmits(['close']);
const props = defineProps({ visible: false });
watch(() => props.visible, (val) => visible.value = val);
const message = ref("");
const categories = ref([]);
const useDefaultAddress = ref(true);

const close = () => {
    props.visible = false;
    state.description = '';
    state.title = '';
    state.price = null;
    state.images = [];
    state.category = null;
    state.address_street = '';
    state.address_number = null;
    state.address_zipcode = '';
    state.address_city = '';
    state.address_country = 'België';
    state.user = '';
    emit('close');
}

const accept = async () => {
    let res = await postKlusje({
        name: state.title,
        description: state.description,
        price: state.price,
        category: state.category.id,
        address: compAddress.value,
        state: "open",
        images: [],
        user: state.user,
    }, localStorage.getItem('token'));
    if (res.status === "success")
        close();
    else {
        message.value = "Er is iets fout gegaan bij het plaatsen van het klusje.";
    }
}

const canPost = computed(() => {
    let canPost = true;
    if (state.title.length === 0) canPost = false;
    if (state.description.length < 24) canPost = false;
    if (state.price < 5) canPost = false;
    if (state.category == null) canPost = false;
    if (!useDefaultAddress.value) {
        if (state.address_street.length === 0) canPost = false;
        if (state.address_number.length === 0) canPost = false;
        if (state.address_zipcode.length === 0) canPost = false;
        if (state.address_city.length === 0) canPost = false;
    }
    return canPost;
});

const okDescription = computed(() => {
    return state.description.length > 24;
});

const compAddress = computed(() => {
    if (useDefaultAddress.value) {
        return `${state.default_street} ${state.default_number}, ${state.default_zipcode} ${state.default_city}, ${state.default_country}`;
    } else {
        return `${state.address_street} ${state.address_number}, ${state.address_zipcode} ${state.address_city}, ${state.address_country}`;
    }
});

const state = reactive({
    user: '',
    title: '',
    description: '',
    price: null,
    images: [],
    category: null,
    address_street: '',
    address_number: null,
    address_zipcode: '',
    address_city: '',
    address_country: 'België',
    default_street: '',
    default_number: null,
    default_zipcode: '',
    default_city: '',
    default_country: 'België',
});

onMounted(async () => {
    const token = localStorage.getItem('token');
    let res = await getCategories(token);
    if (res.status === "success") {
        categories.value = res.data;
    }
    res = await getPersonalInfo(localStorage.getItem('token'));
    if (res.status === "success") {
        state.default_street = res.data.address.street;
        state.default_number = res.data.address.number;
        state.default_zipcode = res.data.address.zipcode;
        state.default_city = res.data.address.city;
        state.default_country = res.data.address.country;
        state.user = res.data._id;
    }
});
</script>
<template>
    <Dialog :draggable="false" :visible="visible" :closable="false" header="Klusje Plaatsen" modal
        :style="{ width: '540px' }" :breakpoints="{ '580px': 'calc(100vw - 1rem)' }">
        <div class="labelInput">
            <label>Titel*</label>
            <InputText v-model="state.title" placeholder="Kleerkast assembleren" />
        </div>
        <div class="labelInput">
            <label>Beschrijving* <span :style="okDescription ? 'color: var(--primary)' : 'color: var(--gray-400)'">({{
                okDescription ? 24 : state.description.length }}/24)</span></label>
            <Textarea v-model="state.description" placeholder="Ik heb hulp nodig met..." autoResize style="resize: none"
                :minlength="24" />
        </div>
        <div class="labelInput">
            <label>Categorie*</label>
            <Dropdown v-model="state.category" :options="categories" optionLabel="name"
                placeholder="Selecteer een categorie" />
        </div>
        <div class="labelInput">
            <label>Prijs*</label>
            <InputNumber v-model="state.price" mode="currency" currency="EUR" placeholder="€15,00" :minFractionDigits="2"
                :maxFractionDigits="2" :min="5" />
        </div>
        <div class="flex align-items-center cb_address">
            <Checkbox v-model="useDefaultAddress" :binary="true" inputId="defaultAddress" name="defaultAddress"
                :value="true" />
            <label for="defaultAddress" class="ml-2"> Gebruik mijn factuuradres als locatie </label>
        </div>
        <div v-if="!useDefaultAddress" class="inputGrid_address">
            <div class="labelInput">
                <label>Straatnaam*</label>
                <InputText v-model="state.address_street" placeholder="Vleermansstraat" />
            </div>
            <div class="labelInput">
                <label>Huisnummer*</label>
                <InputText v-model="state.address_number" placeholder="8" />
            </div>
            <div class="labelInput">
                <label>Stad*</label>
                <InputText v-model="state.address_city" placeholder="Brussel" />
            </div>
            <div class="labelInput">
                <label>Postcode*</label>
                <InputText v-model="state.address_zipcode" placeholder="1000" />
            </div>
            <div class="labelInput">
                <label>Land</label>
                <InputText v-model="state.address_country" placeholder="België" disabled />
            </div>
        </div>
        <div class="labelInput">
            <label>Afbeeldingen</label>
            <FileUpload :disabled="true" name="images[]" mode="advanced" accept="image/*" :maxFileSize="1000000"
                :multiple="true">
                <template #empty>
                    <p>Sleep afbeeldingen naar hier om te uploaden.</p>
                </template>
            </FileUpload>
        </div>
        <div>* Verplicht veld</div>
        <template #footer>
            <div class="flex justify-content-between">
                <Button label="Cancel" @click="close" class="p-button-secondary" />
                <Button label="Plaats Klusje" @click="accept" :disabled="!canPost" />
            </div>
            <div v-if="message != ''" style="color: var(--danger)">{{ message }}</div>
        </template>
    </Dialog>
</template>
<style scoped>
.inputGrid_address {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-column-gap: 1rem;

}

.cb_address {
    margin-top: 1rem;
}
</style>