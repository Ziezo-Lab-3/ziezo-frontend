<script>
import { ref } from 'vue';
const API_URI = 'http://localhost:3000';

/**ajax */
const signup = () => {
    fetch(`${API_URI}/api/v1/auth/signup`, {
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
    
};

export default {
  data() {
    return {
        email: '',
        username: '',
        password: '',
        password2: '',
        checked: false
    }
  },
  methods: {
    signupScript() {
        if(this.checked === true){
            document.getElementById('checkbox--text').style.color = 'black';
            if(this.password == this.password2){
                document.getElementById('password2--text').style.color = 'black';
            signup();
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
    }
  }
}

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
                <input type="checkbox" id="checkbox" v-model="checked" />
                <label for="checkbox" id="checkbox--text">Ik ga akkoord met de gebruiksvoorwaarden</label>
                <div class="p-field">
                    <Button label="Account aanmaken" @click="signupScript" />
                </div>
                <RouterLink to="/Login">
                    <Button class="p-button-secondary" label="Ik heb al een account"/>
                </RouterLink>
                    <RouterLink to="/ForgotPassword">
                        <div class="link-simple">Gebruiksvoorwaarden</div> 
                    </RouterLink>
            </div>
        </template>
    </Card>
</template>

<style scoped>
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