<script setup>
//import router view
import { useRouter, useRoute } from 'vue-router'
</script>

<template>
    <main>
        <img src="./assets/Ziezo.png" alt="Ziezo logo">
        <h1>Inloggen</h1>
        <form id="logIn" action="login.php" method="post">
        
            <label for="email">Email Adres</label>
            <input type="email" name="email" id="email" placeholder="email@adres.be" required>
            <label for="password">Wachtwoord</label>
            <input type="password" name="password" id="password" placeholder="wachtwoord" required>
            <div>
                <label for="showpw">Toon wachtwoord:</label>
                <input name="showpw" type="checkbox" onclick="showPW()">
            </div>
            <input type="submit" value="Inloggen">
            <a href="#">Account aanmaken</a>
        </form>
        <a href="#">Wachtwoord vergeten?</a>
    </main>
</template>


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