<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const API_URI = import.meta.env.VITE_BACKEND_URL;
const email = ref("");
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
            email: email.value,
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
    <div class="w-screen h-screen p-2 flex justify-content-center align-items-center">
        <Card class="max-w-full w-20rem h-fit">
            <template #header>
                <div class="pb-2 pt-4 px-6">
                    <img src="/images/Logo.svg" alt="Ziezo Logo">
                </div>
            </template>
            <template #title>
                Inloggen
            </template>
            <template #content>
                <div class="p-fluid">
                    <div class="labelInput">
                        <label for="email">Email</label>
                        <InputText id="email" v-model="email" />
                    </div>
                    <div class="labelInput">
                        <label for="password">Wachtwoord</label>
                        <Password id="password" :feedback="false" v-model="password" />
                    </div>
                    <div style="color: var(--danger)" v-if="message !== ''">{{ message }}</div>
                    <div class="labelInput">
                        <Button label="Inloggen" @click="signin" />
                    </div>
                    <div class="labelInput">
                        <RouterLink to="/Aanmelden">
                            <Button class="p-button-secondary" label="Account aanmaken" />
                        </RouterLink>
                    </div>
                    <!--forgot password-->
                    <div class="labelInput">
                        <!--div on click-->
                        <RouterLink to="/ForgotPassword">
                            <div class="link-simple">Wachtwoord vergeten?</div>
                        </RouterLink>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>

.link-simple {
    text-decoration: underline;
    color: var(--secondary);
    text-align: center;
}

.link-simple:hover {
    color: var(--secondary-dark-1);
}
</style>