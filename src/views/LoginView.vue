<script>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

/**on click scripts*/
const login = () => {
    console.log('login');
    /**log text from input fields */
    console.log(email.value);
    console.log(password.value);
}

export default {
    name: 'LoginView',
    components: {},
    setup() {
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
                <RouterLink to="/jobs">
                    <Button class="p-button-secondary" label="Account aanmaken"/>
                </RouterLink>
                <!--forgot password-->
                <div class="p-field">
                <!--div on click-->
                    <RouterLink to="/jobs">
                        <Button label="Wachtwoord vergeten?" />
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