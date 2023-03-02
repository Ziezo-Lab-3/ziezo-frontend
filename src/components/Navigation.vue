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
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0px;
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
  padding: 16px;
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
  padding: 4px 11px;
  padding-top: 7px;
  padding-bottom: 7px;
}

li:hover {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ECECEF;
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
}

.nav-menu {
  position: relative;
  top: -180px;
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
