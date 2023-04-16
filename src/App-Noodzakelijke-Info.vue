<script setup>
//import router view
import { useRouter, useRoute } from 'vue-router'

import { ref } from 'vue';

const items = ref([
    {
        label: 'Personal',
        to: "/"
    },
    {
        label: 'Seat',
        to: "/seat",
    },
    {
        label: 'Payment',
        to: "/payment",
    },
    {
        label: 'Confirmation',
        to: "/confirmation",
    }
]);
</script>

<template>
    <main>
        <img src="./assets/Ziezo.png" alt="Ziezo logo">
        <h1>Noodzakelijke Info</h1>
        <div>
            <div class="card">
                <Steps :model="items" :readonly="false" aria-label="Form Steps" />
            </div>
            <p>We hebben nog wat extra informatie nodig voor we je account kunnen aanmaken.</p>
            <form id="logIn" action="login.php" method="post">
                <div class="name">
                    <label for="voornaam">Voornaam</label>
                    <input type="text" name="voornaam" id="voornaam" placeholder="Jonas" required>
                    
                    <label for="achternaam">Achternaam</label>
                    <input type="text" name="achternaam" id="achternaam" placeholder="Beveren" required>
                </div>
                <div class="street">
                    <label for="straat">Straat</label>
                    <input type="text" name="straat" id="straat" placeholder="Boomstraat 21" required>
                </div> 
                <div class="city">
                    <label for="stad">Stad</label>
                    <input type="text" name="stad" id="stad" placeholder="Antwerpen" required>
                    
                    <label for="postcode">Postcode</label>
                    <input type="text" name="postcode" id="postcode" placeholder="2000" required>
                </div>

                <input type="submit" value="Account aanmaken">
            </form>
        </div>
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