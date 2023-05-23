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
                console.error("error:" + response.message);
            }
        });

};

const loginKlusser = () => {
    email.value = "klusser@ziezo.be";
    password.value = "123456";
    signin();
};

const loginHulpvrager = () => {
    email.value = "hulpvrager@ziezo.be";
    password.value = "123456";
    signin();
}

</script>
<template>
    <div class="login__wrapper w-screen h-screen flex flex-column justify-content-center align-items-center p-4">
        <Card class="login__demo mb-4" @click="loginHulpvrager">
            <template #content >
                <div class="h-full w-full flex flex-column justify-content-center align-items-center px-4 text-center">
                    <i class="pi pi-user" style="font-size: 6rem; color: var(--primary)"></i>
                    <h3>Inloggen als hulpzoeker</h3>
                </div>
            </template>
        </Card>
        <Card class="login__demo" @click="loginKlusser">
            <template #content>
                <div class="h-full w-full flex flex-column justify-content-center align-items-center px-4 text-center">
                    <i class="pi pi-wrench" style="font-size: 6rem; color: var(--secondary)"></i>
                    <h3>Inloggen als klusser</h3>
                </div>
            </template>
        </Card>
    </div>

    <!-- LOGIN DOOR JARNE-->
    <!-- <div class="w-screen h-screen p-2 flex justify-content-center align-items-center">
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
                    <div class="labelInput">
                        <RouterLink to="/ForgotPassword">
                            <div class="link-simple">Wachtwoord vergeten?</div>
                        </RouterLink>
                    </div>
                </div>
            </template>
        </Card>
    </div> -->
</template>

<style scoped>
.login__wrapper {
    height: fit-content;
    overflow: auto;
}
.login__demo {
    width: 270px;
    max-width: 100%;
    min-height: 270px;
    aspect-ratio: 1/1;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.login__demo:hover {
    transform: scale(1.05);
}

/* LOGIN DOOR JARNE */
/* .link-simple {
    text-decoration: underline;
    color: var(--secondary);
    text-align: center;
}

.link-simple:hover {
    color: var(--secondary-dark-1);
} */
</style>
<style>
.login__demo .p-card-body,
.login__demo .p-card-content {
    height: 100%;
}
</style>