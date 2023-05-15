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
