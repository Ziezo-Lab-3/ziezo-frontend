<script setup>
import moment from 'moment';
import { ref } from 'vue';
import decodeJWT from '../js/decodeJWT';
import { getKlusjes } from '../api/klusje';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

const getSeverity = (status) => {
    if (status == "Klaar") return "success";
    else if (status == "Bezig") return "warning";
    else if (status == "Niet klaar") return "danger";
    else return "primary";
}

const data = ref([]);
const isLoadingData = ref(false);
const onLazyLoad = async (event) => {
    const decoded = decodeJWT(localStorage.getItem('token'));
    isLoadingData.value = true;
    const lazyData = await getKlusjes(localStorage.getItem('token'), {
        first: event.first,
        last: event.last,
        filter: JSON.stringify({
            _id: decoded.id,
        }),
    });
    data.value.push(...lazyData.data);
    isLoadingData.value = false;
}

</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title>Mijn Klusjes</template>
        <template #content>
            <TabView>
                <TabPanel header="Zelf Geplaatste Klusjes">
                    <DataTable :value="data" scrollable scrollHeight="400px" class="p-datatable-sm table-jobs-self"
                        :virtualScrollerOptions="{
                                itemSize: 20,
                                lazy: true,
                                showLoader: true,
                                loading: isLoadingData,
                                onLazyLoad: onLazyLoad
                            }">
                        <Column header="" class="col-image">
                            <template #body="slotProps">
                                <img :src="slotProps.data.image" style="width: 120px; height: 80px;" />
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
                        <Column field="category" header="Category" style="width: 120px" class="col-category"></Column>
                        <Column header="Labels" class="col-label flex flex-column gap-1 justify-content-center">
                            <template #body="slotProps">
                                <Tag severity="info" :value="'€ ' + slotProps.data.price"></Tag>
                                <Tag :severity="getSeverity(slotProps.data.status)" :value="slotProps.data.status"></Tag>
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
