<script setup>
//import router view
import { useRouter, useRoute } from 'vue-router'
</script>

<template>
    <main>
      <img src="./assets/Ziezo.png" alt="Ziezo logo">
      <h1>Account aanmaken</h1>
      <form id="logIn" @submit.prevent="createAccount">
        <label for="email">Email Adres</label>
        <input v-model="email" type="email" name="email" id="email" placeholder="email@adres.be" required>
        <label for="password">Wachtwoord</label>
        <input v-model="password" type="password" name="password" id="password" placeholder="wachtwoord" required>
        <label for="passwordRepeat">Wachtwoord herhalen</label>
        <input v-model="passwordRepeat" type="password" name="passwordRepeat" id="passwordRepeat" placeholder="wachtwoord" required>
        <div>
          <label for="showpw">Toon wachtwoord:</label>
          <input type="checkbox" v-model="showPassword">
        </div>
        <div>
          <label for="terms">Ik ga akkoord met de <a href="#">gebruiksvoorwaarden</a></label>
          <input type="checkbox" v-model="termsAgreed">
        </div>
        <input type="submit" value="Account aanmaken">
        <a href="#">Ik heb al een account</a>
      </form>
    </main>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordRepeat: '',
      showPassword: false,
      termsAgreed: false
    }
  },
  methods: {
    async createAccount() {
      const data = {
        email: this.email,
        password: this.password,
        passwordRepeat: this.passwordRepeat,
        termsAgreed: this.termsAgreed
      }

      try {
        const response = await fetch('http://localhost:3000/api/accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        const responseData = await response.json()
        console.log(responseData)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
nav {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 0px;
    padding: 24px 16px;
    gap: 48px;
    width: 212px;
    height: 831px;
    background: #FFFFFF;
    flex: none;
    order: 0;
    flex-grow: 0;
    font-family: 'Figtree';
}

ul {
    list-style: none;
    text-align: left;
}

li {
    font-family: 'Figtree';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    gap: 12px;
    display: flex;
    align-items: center;
    color: #172230;
    flex: none;
    order: 1;
    flex-grow: 1;
    margin-bottom: 12px;
}

li:hover {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 16px;
    gap: 12px;

    position: static;
    width: 180px;
    height: 40px;
    left: 20px;
    top: 80px;

    background: #ECECEF;
    border-radius: 20px;
}

li:active {
    background: #EF7946;
    opacity: 0.2;
    color: #2A1005;
}

.nav-logo {
    width: 100%;
    height: 100%;
}

.nav-menu {
    position: relative;
    top: -204px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 4px;
    order: 1;
    flex-grow: 0;
}

.nav-details {
    position: relative;
    top: -104px;
    display: flex;
    flex-direction: column;
    align-items: left;
    order: 2;
    flex-grow: 0;
}
</style>