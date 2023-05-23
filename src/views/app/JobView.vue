<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import PersonalJobsTable from '../../components/PersonalJobsTable.vue';
</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title>Mijn Klusjes</template>
        <template #content>
            <TabView>
                <TabPanel header="Zelf Geplaatste Klusjes">
                    <PersonalJobsTable />                    
                </TabPanel>
                <TabPanel header="Uitgevoerde Klusjes">
                    <PersonalJobsTable executed />
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
