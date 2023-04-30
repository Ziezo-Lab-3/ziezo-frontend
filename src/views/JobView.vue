<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title>Mijn Klusjes</template>
        <template #content>
            <TabView>
                <TabPanel header="Zelf Geplaatste Klusjes">
                </TabPanel>
                <TabPanel header="Uitgevoerde Klusjes">
                </TabPanel>
            </TabView>
        </template>
    </Card>
</template>
