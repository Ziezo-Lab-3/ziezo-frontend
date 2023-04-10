<script setup>
import { RouterLink } from 'vue-router';
import { useDialog } from 'primevue/usedialog';
import { defineAsyncComponent } from 'vue';
import DynamicDialog from 'primevue/dynamicdialog';

const DialogNewJob = defineAsyncComponent(() => import('../components/DialogNewJob.vue'));
const dialog = useDialog();

const openNewJobDialog = () => {
    const dialogRef = dialog.open(DialogNewJob, {
        props: {
            header: 'Klusje plaatsen',
            style: { width: '50vw' },
            breakpoints: { '960px': '75vw', '640px': '90vw' },
            modal: true,
            closable: false,
        }
    });
}

</script>
<template>
    <div class="w-full h-full flex justify-content-center align-items-center">
        <Card class="p-m-4 mx-6" style="width: 360px">
            <template #header>
                <img height="200" class="img-fit" src="../assets/images/senior_group_gardening@w360.webp"
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
                    <Button label="Plaats een klusje" @click="openNewJobDialog" />
                </div>
            </template>
        </Card>
        <Card class="p-m-4 mx-6" style="width: 360px">
            <template #header>
                <img height="200" class="img-fit" src="../assets/images/senior_man_working@w360.webp"
                    alt="Senior group working in a garden">
            </template>
            <template #title>Ik ga helpen!</template>
            <template #content>
                <p style="margin-top: 0px">
                    Wat fijn dat jij een van onze klussers wil worden! We hebben klusjes in verschillende
                    sectoren, neem snel een kijkje!
                </p>
            </template>
            <template #footer>
                <div class="flex justify-content-around pb-4">
                    <RouterLink to="/jobs">
                        <Button label="Zoek een klusje" />
                    </RouterLink>
                </div>
            </template>
        </Card>
    </div>
    <DynamicDialog />
</template>

<style></style>