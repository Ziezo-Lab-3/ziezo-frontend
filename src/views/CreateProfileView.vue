<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const API_URI = import.meta.env.VITE_BACKEND_URL;
const email = ref("");
const name_first = ref("");
const name_last = ref("");
const message = ref("");

/** get var id from URL */
/**
const $route = useRouter();
const id = $route.query.id;
console.log(id);
*/

/**ajax */
const createProfile = () => {
    fetch(`${API_URI}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name_first: name_first.value,
            name_last: name_last.value,
            email: email.value,
        }),
    })
    // Converteer de response naar JSON
    .then((response) => response.json())

    // Verwerk de response
    .then((response) => {
        if (response.status === "success") {
            // Sla de token op in de localStorage
            localStorage.setItem("token", response.data.accessToken);
            // Reset de velden
            message.value = "";
            router.push("/Login");
        }
        else if (response.status === "fail") {
            message.value = response.message;
            console.log("error:" + response.message);
        }
    });
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