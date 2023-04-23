<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
        email: '',
        password: '',
        password2: '',
        checked: false
    }
  },
  methods: {
    signup() {
        if(this.checked === true){
            document.getElementById('checkbox--text').style.color = 'black';
            if(this.password == this.password2){
            document.getElementById('password2--text').style.color = 'black';
            /**ajax */
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
                    <Button label="Account aanmaken" @click="signup" />
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