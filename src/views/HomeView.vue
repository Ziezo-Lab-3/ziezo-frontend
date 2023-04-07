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
</template>

<style></style>