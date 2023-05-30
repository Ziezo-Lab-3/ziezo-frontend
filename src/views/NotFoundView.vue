<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const navigate = () => {
    router.push("/app");
}
</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title><h1>Deze pagina bestaat niet meer</h1></template>
        <template #content>
            <p>Mischien is ze verwijdert of verplaatst.</p>
            <Button label="Terug naar de thuispagina" @click="navigate" />
        </template>
    </Card>
</template>