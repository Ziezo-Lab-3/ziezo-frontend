<script setup>
import moment from 'moment';
import { onMounted, reactive, ref } from 'vue';
import decodeJWT from '../js/decodeJWT';
import { getKlusjes } from '../api/klusje';
import { getCategories } from '../api/category';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import DialogJobView from './Dialog/DialogJobView.vue';

const props = defineProps({
    executed: {
        type: Boolean,
        default: false,
    }
});

const state = reactive({
    data: [],
    initialized: false,
    isLoadingData: false,
    categories: [],
    selectedJobId: null
});
const decodedToken = decodeJWT(localStorage.getItem('token'));

const showDialog = ref(false);

const closeDialog = () => {
    console.log("closeDialog");
    showDialog.value = false;
};

const onClickRow = (event) => {
    openDialog(event.data._id);
};

const openDialog = (id) => {
    console.log(id);
    state.selectedJobId = id;
    showDialog.value = true;
}

const getCategory = (id) => {
    const category = state.categories.find((category) => category._id == id);
    return category ? category.name : "Onbekend";
}

const getSeverity = (status) => {
    if (status == "open") return "success";
    else if (status == "in progress") return "warning";
    else if (status == "done") return "danger";
    else return "primary";
}

const loadInitialData = async () => {
    const token = localStorage.getItem('token');
    await loadKlusjesLazy();
    let result = await getCategories(token);
    if (result.status === "success") {
        state.categories = result.data;
    }
    else {
        console.error("JobView.vue onMounted(): " + result.message);
    }
    state.initialized = true;
};

const loadKlusjesLazy = async (event) => {
    !state.isLoadingData && (state.isLoadingData = true);
    const newData = await getKlusjes(localStorage.getItem('token'), {
        first: state.data.length,
        last: state.data.length + 10, // calculate last value
        filter: props.executed ? 
            JSON.stringify({
                helper: decodedToken.id,
            }) : 
            JSON.stringify({
            user: decodedToken.id,
        }),
    });
    if (newData.status === "success") {
        const virtual = [...state.data];
        state.data = [...virtual, ...newData.data];
        state.isLoadingData = false;
    } else {
        console.error(newData.message);
    }
};

onMounted(() => {
    loadInitialData();
});
</script>
<template>
    <DataTable v-if="state.initialized" scrollHeight="500px" :value="state.data" scrollable
        :virtualScrollerOptions="{
            lazy: true,
            onLazyLoad: loadKlusjesLazy,
            itemSize: 108,
            delay: 200,
            showLoader: true,
            loading: state.isLoadingData,
            numToleratedItems: 10,
        }" class="p-datatable-sm table-jobs-self" @row-click.native="onClickRow">
        <Column header="" class="col-image">
            <template #body="slotProps">
                <img :src="slotProps.data.images[0]" style="width: 120px; height: 80px;" class="job-image" />
            </template>
        </Column>
        <Column header="Klusje" class="col-job">
            <template #body="slotProps">
                <div class="column description">
                    <h2 tabindex="2" @keyup.enter="() => openDialog(slotProps.data._id)">{{ slotProps.data.name }}</h2>
                    <p>{{ slotProps.data.description }}</p>
                </div>
            </template>
        </Column>
        <Column header="Categorie" class="col-category">
            <template #body="slotProps">
                <div>{{ getCategory(slotProps.data.category) }}</div>
            </template>
        </Column>
        <Column header="Labels" class="col-label flex flex-column gap-1 justify-content-center">
            <template #body="slotProps">
                <Tag severity="info" :value="'€ ' + slotProps.data.price"></Tag>
                <Tag :severity="getSeverity(slotProps.data.state)" :value="slotProps.data.state"></Tag>
            </template>
        </Column>
        <Column v-if="!props.executed" header="Geplaatst op" class="col-date">
            <template #body="slotProps">
                {{ moment(slotProps.data.createdAt).format('DD-MM-YYYY') }}
            </template>
        </Column>
    </DataTable>
    <DialogJobView :visible="showDialog" :klusje-id="state.selectedJobId" @close="closeDialog"/>
</template>
<style scoped>
.description {
    height: 100%;
    padding: 0.25rem 0;
}

.description p,
.description h2 {
    margin: 0;
    text-overflow: ellipsis;
}

.description h2 {
    height: 28px;
    overflow: hidden;
}

.description p {
    max-height: 56px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.job-image {
    object-fit: cover;
    object-position: center;
    background-image: url(../assets/images/Placeholder_2.png);
    background-size: cover;
    background-position: center;
}
</style>
<style>
.col-image {
    min-width: calc(120px + 1rem);
    max-width: calc(120px + 1rem);
}

.col-job {
    min-width: calc(300px + 1rem);
}

.col-category,
.col-label {
    min-width: calc(120px + 1rem);
    max-width: calc(120px + 1rem);
}

.col-date {
    min-width: calc(100px + 1rem);
    max-width: calc(100px + 1rem);
}
</style>
