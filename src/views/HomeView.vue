<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import DialogNewJob from '../components/DialogNewJob.vue';

/* Component State */
let newJobDialog = ref(false);

</script>
<template>
    <div class="w-full h-full flex justify-content-center align-items-center flex-wrap gap-4">
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
                    <Button label="Plaats een klusje" @click="() => newJobDialog = true" />
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
    <DialogNewJob v-on:close="() => newJobDialog = false" :visible="newJobDialog" />
</template>

<style></style>