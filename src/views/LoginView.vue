<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const API_URI = import.meta.env.VITE_BACKEND_URL;
const username = ref("");
const password = ref("");
const message = ref("");

/**ajax */
const signin = () => {
    fetch(`${API_URI}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
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
            router.push("/");
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
        <template #title>
            Inloggen
        </template>
        <template #content>
            <div class="p-fluid">
                <div class="p-field">
                    <label for="username">Gebruikersnaam</label>
                    <InputText id="username" v-model="username" />
                </div>
                <div class="p-field">
                    <label for="password">Wachtwoord</label>
                    <Password id="password" v-model="password" />
                </div>
                <div style="color: var(--danger)" v-if="message !== ''">{{ message }}</div>
                <div class="p-field">
                    <Button label="Inloggen" @click="signin" />
                </div>
                <div class="p-field">
                    <RouterLink to="/Aanmelden">
                        <Button class="p-button-secondary" label="Account aanmaken"/>
                    </RouterLink>
                </div>
                <!--forgot password-->
                <div class="p-field">
                <!--div on click-->
                    <RouterLink to="/ForgotPassword">
                        <div class="link-simple">Wachtwoord vergeten?</div> 
                    </RouterLink>
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
.link-simple{
    text-decoration: underline;
    color: #000;
    background-color: transparent;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    text-align: center;
}
.link-simple:hover{
    color: #000;
    background-color: transparent;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}
</style>