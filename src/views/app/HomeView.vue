<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import DialogNewJob from '../../components/Dialog/DialogNewJob.vue';

/* Component State */
let newJobDialog = ref(false);
let roles = ref([]);

onMounted(() => {
    roles.value = JSON.parse(localStorage.getItem('userRole'));

});

</script>
<template>
    <div class="w-full h-full flex justify-content-center align-items-center flex-wrap gap-4 py-4">
        <Card class="p-m-4 mx-6" style="width: 360px">
            <template #header>
                <img height="200" class="img-fit w-full" src="../../assets/images/senior_group_gardening@w360.webp"
                    alt="Senior group working in a garden">
            </template>
            <template #title>Hulp nodig?</template>
            <template #content>
                <p style="margin-top: 0px">
                    Onze klussers staan paraat! Door een klusje te plaatsen, kan je meteen zoeken
                    naar de klusser die jij nodig hebt.
                </p>
            </template>
            <template #footer>
                <div class="flex justify-content-around pb-4">
                    <Button icon="pi pi-plus" label="Plaats een klusje" @click="() => newJobDialog = true" />
                </div>
            </template>
        </Card>
        <Card v-if="roles.includes('ROLE_EMPLOYEE')" class="p-m-4 mx-6" style="width: 360px">
            <template #header>
                <img height="200" class="img-fit w-full" src="../../assets/images/senior_man_working@w360.webp"
                    alt="Senior group working in a garden">
            </template>
            <template #title>Klusjes uitvoeren</template>
            <template #content>
                <p style="margin-top: 0px">
                    Kijk door onze lijst van klusjes om te zien of er iets is dat je kan doen. Er is altijd wel iemand die jouw hulp kan gebruiken!
                </p>
            </template>
            <template #footer>
                <div class="flex justify-content-around pb-4">
                    <RouterLink to="/app/browse">
                        <Button icon="pi pi-search" label="Zoek een klusje" />
                    </RouterLink>
                </div>
            </template>
        </Card>
    </div>
    <DialogNewJob v-on:close="() => newJobDialog = false" :visible="newJobDialog" />
</template>

<style></style>