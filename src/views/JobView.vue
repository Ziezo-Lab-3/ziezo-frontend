<script setup>
import moment from 'moment';
import { ref } from 'vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

const getSeverity = (status) => {
    console.log(status);
    if (status == "Klaar") return "success";
    else if (status == "Bezig") return "warning";
    else if (status == "Niet klaar") return "danger";
    else return "primary";
}

const jobs = ref([
    {
        _id: "644120534474c4b01d8804f8",
        name: "Apple bottom jeans",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at elit sit amet purus porta eleifend facilisis non neque. Mauris hendrerit sagittis diam, quis condimentum ante porta eu. Sed vitae velit ut elit maximus pharetra ac quis erat. Nam ipsum mauris, egestas sodales est a, semper volutpat nisi. Ut lacus dui, porta a tincidunt posuere, tempor quis dui. Nulla fringilla sagittis nisl a placerat. Nunc id nibh sit amet ligula pulvinar convallis.",
        category: "Handwerk",
        status: "Niet klaar",
        price: 30,
        image: "https://loremflickr.com/400/300/apple,bottom,jeans",
        createdAt: "2023-04-20T11:21:55.251Z",
        updatedAt: "2023-04-20T11:21:55.251Z",
        __v: 0
    },
    {
        _id: "644120534474c4b01d8804f8",
        name: "Boots with the fur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at elit sit amet purus porta eleifend facilisis non neque. Mauris hendrerit sagittis diam, quis condimentum ante porta eu. Sed vitae velit ut elit maximus pharetra ac quis erat. Nam ipsum mauris, egestas sodales est a, semper volutpat nisi. Ut lacus dui, porta a tincidunt posuere, tempor quis dui. Nulla fringilla sagittis nisl a placerat. Nunc id nibh sit amet ligula pulvinar convallis.",
        category: "Huishouden",
        status: "Niet klaar",
        price: 345.62,
        image: "https://loremflickr.com/400/300/boots,fur",
        createdAt: "2023-04-20T11:21:55.251Z",
        updatedAt: "2023-04-20T11:21:55.251Z",
        __v: 0
    },
    {
        _id: "644120534474c4b01d8804f8",
        name: "The whole club is looking at her",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at elit sit amet purus porta eleifend facilisis non neque. Mauris hendrerit sagittis diam, quis condimentum ante porta eu. Sed vitae velit ut elit maximus pharetra ac quis erat. Nam ipsum mauris, egestas sodales est a, semper volutpat nisi. Ut lacus dui, porta a tincidunt posuere, tempor quis dui. Nulla fringilla sagittis nisl a placerat. Nunc id nibh sit amet ligula pulvinar convallis.",
        category: "Electriciteit",
        status: "Niet klaar",
        price: 120,
        image: "https://loremflickr.com/400/300/club,looking",
        createdAt: "2023-04-20T11:21:55.251Z",
        updatedAt: "2023-04-20T11:21:55.251Z",
        __v: 0
    },
    {
        _id: "644120534474c4b01d8804f8",
        name: "She hit the floor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at elit sit amet purus porta eleifend facilisis non neque. Mauris hendrerit sagittis diam, quis condimentum ante porta eu. Sed vitae velit ut elit maximus pharetra ac quis erat. Nam ipsum mauris, egestas sodales est a, semper volutpat nisi. Ut lacus dui, porta a tincidunt posuere, tempor quis dui. Nulla fringilla sagittis nisl a placerat. Nunc id nibh sit amet ligula pulvinar convallis.",
        category: "Constructie",
        status: "Bezig",
        price: 22,
        image: "https://loremflickr.com/400/300/floor",
        createdAt: "2023-04-20T11:21:55.251Z",
        updatedAt: "2023-04-20T11:21:55.251Z",
        __v: 0
    },
    {
        _id: "644120534474c4b01d8804f8",
        name: "Next thing you know",
        description: "Verhuizen",
        status: "Klaar",
        category: "Handwerk",
        price: 35,
        image: "https://loremflickr.com/400/300/thing,know",
        createdAt: "2023-04-20T11:21:55.251Z",
        updatedAt: "2023-04-20T11:21:55.251Z",
        __v: 0
    },
    {
        _id: "644120534474c4b01d8804f8",
        name: "Shawty got low low low low low low low low",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at elit sit amet purus porta eleifend facilisis non neque. Mauris hendrerit sagittis diam, quis condimentum ante porta eu. Sed vitae velit ut elit maximus pharetra ac quis erat. Nam ipsum mauris, egestas sodales est a, semper volutpat nisi. Ut lacus dui, porta a tincidunt posuere, tempor quis dui. Nulla fringilla sagittis nisl a placerat. Nunc id nibh sit amet ligula pulvinar convallis.",
        category: "Oppassen",
        status: "Klaar",
        price: 12.50,
        image: "https://loremflickr.com/400/300/shawty,low",
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
                    <DataTable :value="jobs" scrollable scrollHeight="flex" class="p-datatable-sm table-jobs-self" >
                        <Column header="" class="col-image">
                            <template #body="slotProps">
                                <img :src="slotProps.data.image" style="width: 120px; height: 80px;" />
                            </template>
                        </Column>
                        <Column header="Klusje" class="col-job" >
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
                                <Tag severity="info" :value="'€ ' + slotProps.data.price "></Tag>
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

.col-category, .col-label {
    min-width: calc(120px + 1rem);
    max-width: calc(120px + 1rem);
}

.col-date {
    min-width: calc(100px + 1rem);
    max-width: calc(100px + 1rem);
}
</style>
