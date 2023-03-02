<script setup>
import { useRouter, useRoute } from 'vue-router'
</script>

<template>
    <nav>
        <div class="nav-logo">
            <img src="/images/Logo.svg" alt="Ziezo Logo">
        </div>
        <div class="nav-menu">
            <ul>
                <li><i class="pi pi-home" style="font-size: 1.4rem"></i> Thuispagina</li>
                <li><i class="pi pi-comment" style="font-size: 1.4rem"></i>Berichten</li>
                <li><i class="pi pi-wrench" style="font-size: 1.4rem"></i>Mijn Klusjes</li>
                <li><i class="pi pi-user" style="font-size: 1.4rem"></i>Profiel</li>
            </ul>
        </div>
        <div class="nav-details">
            <ul>
                <li><i class="pi pi-question-circle" style="font-size: 1.4rem"></i>Hulp Nodig?</li>
                <li><i class="pi pi-info-circle" style="font-size: 1.4rem"></i>Contact Info</li>
                <li><i class="pi pi-cog" style="font-size: 1.4rem"></i>Instellingen</li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  width: 212px;
  height: 100vh;
  background: #FFFFFF;
}

ul {
  list-style: none;
  text-align: left;
  padding: 16px;
}

li {
  gap: 12px;
  display: flex;
  color: #172230;
  flex: none;
  margin-bottom: 8px;
  padding: 4px 11px;
  padding-top: 7px;
  padding-bottom: 7px;
}

li:hover {
  align-items: center;
  background: orange;
  border-radius: 20px;
  color: #2A1005;
}

li:active {
  background: hsla(18, 84%, 61%, 0.2);
  color: #2A1005;
}

.nav-logo {
  width: 100%;
  height: 100%;
  padding: 32px;
}

.nav-menu {
  position: relative;
  top: -70px;
  width: 100%;
}

.nav-details {
  position: relative;
  top: 0;
}
</style>
