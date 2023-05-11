<script setup>
import { ref } from 'vue';
const API_URI = import.meta.env.VITE_BACKEND_URL;
const new_password = ref('');
const check_password = ref('');

const requestcode = () => {
    if(new_password.value == check_password.value){
        document.getElementById('check_password--text').style.color = 'black';
        fetch(`${API_URI}/auth/requestcode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                new_password: new_password.value,
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
        document.getElementById('check_password--text').style.color = 'red';
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
        <template #title>Nieuw wachtwoord</template>
        <template #content>
            <div class="p-fluid">
                <div class="p-field">
                    <label for="new_password">Nieuw wachtwoord</label>
                    <InputText id="new_password" v-model="new_password" />
                </div>
                <div class="p-field">
                    <label for="check_password">Wachtwoord herhalen</label>
                    <InputText id="check_password" v-model="check_password" />
                </div>
                <div class="p-field">
                    <Button label="verzenden" @click="requestcode" />
                </div>
                <!--forgot password-->
                <div class="p-field">
                <!--div on click-->
                    <RouterLink to="/Login">
                        <div class="link-simple">Ik weet mijn wachtwoord nog</div> 
                    </RouterLink>
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