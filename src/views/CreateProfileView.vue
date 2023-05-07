<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const API_URI = import.meta.env.VITE_BACKEND_URL;
/**get id out of URL */
const url = window.location.href;
const id = ref(url.split("?id=")[1]);
console.log(id.value);

const name_first = ref("");
const name_last = ref("");
const message = ref("");

/** */
const createProfile = () => {
    router.push("/");
};

</script>
<template>
    <Card class="p-m-4 p-major">
        <template #header>
            <div class="Login-logo">
                <img src="/images/Logo.svg" alt="Ziezo Logo">
            </div>
        </template>
        <template #title>Account aanmaken</template>
        <template #content>
            <div class="p-fluid">
                <div class="p-field">
                    <label for="name_first">Voornaam</label>
                    <InputText id="name_first" v-model="name_first" />
                </div>
                <div class="p-field">
                    <label for="name_last">Achternaam</label>
                    <InputText id="name_last" v-model="name_last" />
                </div>
                <div class="p-field">
                    <Button label="Opslaan" @click="createProfile" />
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.p-card{
    margin: auto;
}
.p-field{
    margin-bottom: 0.75rem;
}
.Login-logo {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-left: 2rem;
    padding: 32px 90px;
}
.p-major{
    width: 100%;
    max-width: 400px;
}
</style>