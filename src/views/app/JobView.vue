<script setup>
import moment from 'moment';
import { onMounted, reactive } from 'vue';
import decodeJWT from '../../js/decodeJWT';
import { getKlusjes, getKlusjesCount } from '../../api/klusje';
import { getCategories } from '../../api/category';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

const state = reactive({
    data: [],
    totalDocumentCount: 0,
    isLoadingData: false,
    categories: []
});
const decodedToken = decodeJWT(localStorage.getItem('token'));

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
    let result = await getKlusjesCount(
        token, {
        filter: JSON.stringify({
            user: decodedToken.id,
        }),
    });
    if (result.status === "success") {
        state.totalDocumentCount = result.data.count;
    }
    else {
        console.error("JobView.vue onMounted(): ", result.message);
    }
    result = await getCategories(token);
    if (result.status === "success") {
        state.categories = result.data;
    }
    else {
        console.error("JobView.vue onMounted(): " + result.message);
    }
};

const loadKlusjesLazy = async (event) => {
    !state.isLoadingData && (state.isLoadingData = true);
    const newData = await getKlusjes(localStorage.getItem('token'), {
        first: state.data.length,
        last: state.data.length + 10, // calculate last value
        filter: JSON.stringify({
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
    <Card class="p-m-4 p-major">
        <template #title>Mijn Klusjes</template>
        <template #content>
            <TabView>
                <TabPanel header="Zelf Geplaatste Klusjes">
                    <DataTable v-if="state.totalDocumentCount > 0" scrollHeight="500px" :value="state.data" scrollable
                        :virtualScrollerOptions="{
                            lazy: true,
                            onLazyLoad: loadKlusjesLazy,
                            itemSize: 108,
                            delay: 200,
                            showLoader: true,
                            loading: state.isLoadingData,
                            numToleratedItems: 10,

                        }" class="p-datatable-sm table-jobs-self">

                        <Column header="" class="col-image">
                            <template #body="slotProps">
                                <img :src="slotProps.data.images[0]" style="width: 120px; height: 80px;" class="job-image"/>
                            </template>
                        </Column>

                        <Column header="Klusje" class="col-job">
                            <template #body="slotProps">
                                <div class="column description">
                                    <h2>{{ slotProps.data.name }}</h2>
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
                        <Column header="Geplaatst op" class="col-date">
                            <template #body="slotProps">
                                {{ moment(slotProps.data.createdAt).format('DD-MM-YYYY') }}
                            </template>
                        </Column>

                    </DataTable>
                </TabPanel>
                <TabPanel header="Uitgevoerde Klusjes">
                </TabPanel>
            </TabView>
        </template>
    </Card>
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
    background-image: url(../../assets/images/Placeholder_2.png);
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
