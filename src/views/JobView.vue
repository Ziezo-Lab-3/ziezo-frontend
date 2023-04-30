<script setup>
import moment from 'moment';
import { ref } from 'vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const jobs = ref([
    {
        _id: "644120534474c4b01d8804f8",
        name: "Georgia Rempel",
        description: "dynamic",
        price: 345.62,
        image: "https://loremflickr.com/400/300/business",
        createdAt: "2023-04-20T11:21:55.251Z",
        updatedAt: "2023-04-20T11:21:55.251Z",
        __v: 0
    }
]);
</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title>Mijn Klusjes</template>
        <template #content>
            <TabView>
                <TabPanel header="Zelf Geplaatste Klusjes">
                    <DataTable :value="jobs" scrollable scrollHeight="flex" class="p-datatable-sm"  >
                        <Column header="" style="min-width: cal(120px + 1rem)">
                            <template #body="slotProps">
                                <img :src="slotProps.data.image" style="width: 120px; height: 80px;" />
                            </template>
                        </Column>
                        <Column header="Klusje" >
                            <template #body="slotProps" style="width: 120px">
                                <div class="column description">
                                    <h2>{{ slotProps.data.name }}</h2>
                                    <p>{{ slotProps.data.description }}</p>
                                </div>
                            </template>
                        </Column>
                        <Column field="category" header="Category" style="width: 120px"></Column>
                        <Column header="Geplaatst op" style="width: 120px">
                            <template #body="slotProps">
                                {{ moment(slotProps.data.createdAt).format('DD-MM-YYYY') }}
                            </template>
                        </Column>
                        <Column header="Labels"></Column>
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
</style>