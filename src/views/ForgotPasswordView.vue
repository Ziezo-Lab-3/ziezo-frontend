<script>
import { ref } from 'vue';

export default {
  name: 'LoginView',
  setup() {
    const email = ref('');
    const password = ref('');

    const requestcode = () => {
        console.log('requesting password reset code');
        console.log(email.value);
        console.log(password.value);
    }

    return {
      email,
      password,
      requestcode
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
        <template #title>Wachtwoord vergeten?</template>
        <template #content>
            Geef je email adres, en we sturen je zo snel mogelijk een email om een nieuw wachtwoord in te stellen.
            <div class="p-fluid">
                <div class="p-field">
                    <label for="email">E-mailadres</label>
                    <InputText id="email" v-model="email" />
                </div>
                <div class="p-field">
                <RouterLink to="/jobs">
                    <Button label="verzenden" @click="requestcode" />
                </RouterLink>
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