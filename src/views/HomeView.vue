<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <Card class="p-m-4" style="width: 360px">
        <template #header>
            <img src="../assets/images/senior_group_gardening@w360.webp" alt="Senior group working in a garden">
        </template>
        <template #title>Hulp nodig?</template>
        <template #content>
            <p style="margin-top: 0px">
                Onze klussers staan paraat! Door een klusje te plaatsen, kan je meteen zoeken naar de klusser die jij nodig
                hebt.
            </p>
        </template>
        <template #footer>
            <div class="flex justify-content-around">
                <RouterLink to="/jobs">
                    <Button label="Plaats een klusje" />
                </RouterLink>
            </div>
        </template>
    </Card>
    <Card class="p-m-4" style="width: 360px">
        <template #header>
            <img src="../assets/images/senior_man_working@w360.webp" alt="Senior group working in a garden">
        </template>
        <template #title>Ik ga helpen!</template>
        <template #content>
            <p style="margin-top: 0px">
                Wat fijn dat jij een van onze klussers wil worden! We hebben klusjes in verschillende sectoren, neem snel
                een kijkje!
            </p>
        </template>
        <template #footer>
            <div class="flex justify-content-around">
                <RouterLink to="/jobs">
                    <Button label="Zoek een klusje" />
                </RouterLink>
            </div>
        </template>
    </Card>
</template>

<style></style>