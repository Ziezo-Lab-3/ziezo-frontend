<script>
import { ref } from 'vue';

export default {
  name: 'LoginView',
  setup() {
    const email = ref('');
    const password = ref('');

    const login = () => {
      console.log('login');
      console.log(email.value);
      console.log(password.value);
    }

    return {
      email,
      password,
      login
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
        <template #title>Inloggen</template>
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
                    <Button label="Inloggen" @click="login" />
                </div>
                <RouterLink to="/Aanmelden">
                    <Button class="p-button-secondary" label="Account aanmaken"/>
                </RouterLink>
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