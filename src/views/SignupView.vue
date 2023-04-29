<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const API_URI = import.meta.env.VITE_BACKEND_URL;
const email = ref("");
const username = ref("");
const password = ref("");
const password2 = ref("");
const message = ref("");
const checked = ref(false);

/**ajax */
const signup = () => {
    if(checked.value === true){
        document.getElementById('checkbox--text').style.color = 'black';
        if(password.value == password2.value){
            document.getElementById('password2--text').style.color = 'black';
            fetch(`${API_URI}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.value,
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
        }
        else{
            console.log("passwords don't match");
            document.getElementById('password2--text').style.color = 'red';
        }
    }
    else{
        console.log("terms and conditions not accepted");
        /**set text color of id checkbox--text to red  */
        document.getElementById('checkbox--text').style.color = 'red';   
    }
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
                    <label for="email">E-mailadres</label>
                    <InputText id="email" v-model="email" />
                </div>  
                <div class="p-field">
                    <label for="username">Gebruikersnaam</label>
                    <InputText id="username" v-model="username" />
                </div>
                <div class="p-field">
                    <label for="password">Wachtwoord</label>
                    <Password id="password" v-model="password" />
                </div>
                <div class="p-field">
                    <label for="password2" id="password2--text">Herhaal je wachtwoord</label>
                    <Password id="password2" v-model="password2" />
                </div>
                <!-- checkbox which keeps const checked updated -->
                <input type="checkbox" id="checkbox" v-model="checked" />
                <label for="checkbox" id="checkbox--text" >Ik ga akkoord met de gebruiksvoorwaarden</label>
                <div class="p-field">
                    <Button label="Account aanmaken" @click="signup" />
                </div>
                <div class="p-field">
                    <RouterLink to="/Login">
                        <Button class="p-button-secondary" label="Ik heb al een account"/>
                    </RouterLink>
                </div>
                <div>
                    <div class="link-simple">Gebruiksvoorwaarden</div> 
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.p-field, #checkbox {
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