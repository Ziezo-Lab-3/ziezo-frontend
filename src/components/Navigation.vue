<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <nav>
        <div class="nav-logo">
            <img src="/images/Logo.svg" alt="Ziezo Logo">
        </div>
        <div class="nav-menu">
            <ul>
                <RouterLink to="/app/">
                    <li><i class="pi pi-home" style="font-size: 1.4rem"></i> Thuispagina</li>
                </RouterLink>
                <RouterLink to="/app/message">
                    <li><i class="pi pi-comment" style="font-size: 1.4rem"></i>Berichten</li>
                </RouterLink>
                <RouterLink to="/app/jobs">
                    <li><i class="pi pi-wrench" style="font-size: 1.4rem"></i>Mijn Klusjes</li>
                </RouterLink>
                <RouterLink to="/app/profile">
                    <li><i class="pi pi-user" style="font-size: 1.4rem"></i>Profiel</li>
                </RouterLink>
            </ul>
        </div>
        <div class="nav-details">
            <ul>
                <a><li><i class="pi pi-question-circle" style="font-size: 1.4rem"></i>Hulp Nodig?</li></a>
                <RouterLink to="/app/contact">
                    <li><i class="pi pi-info-circle" style="font-size: 1.4rem"></i>Contact Info</li>
                </RouterLink>
                <RouterLink to="/app/settings">
                    <li><i class="pi pi-cog" style="font-size: 1.4rem"></i>Instellingen</li>
                </RouterLink>
            </ul>
        </div>
    </nav>
</template>
<style>
.nav-menu a,
.nav-details a {
    text-decoration: none !important;
}
</style>
<style scoped>
nav {
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 100vh;
    background: #FFFFFF;
    padding: 1rem;
    justify-content: space-between;
}

ul {
    list-style: none;
    text-align: left;
    padding-left: 0rem;
}

li {
    display: flex;
    flex: none;
    border-radius: 20px;
    align-items: center;
    gap: 1rem;
    color: #172230;
    padding: .5rem 1.25rem;
}

.router-link-active li {
    background-color: var(--gray-100);
}

li:hover {
    background: var(--primary-faded);
}

li:active {
    background: var(--primary-faded);
}

.nav-logo {
    width: 100%;
    padding: 0rem 1rem;
}

.nav-logo img {
    /* Retain source image aspect ratio */
    width: 100%;
    height: auto;
}

@media screen and (max-width: 768px) {
    .nav-logo {
        display: none;
    }

    nav {
        width: 100%;
        padding: 0;
        height: fit-content;
    }

    ul::not(:last-child) {
        margin: 0;
        margin-bottom: 1rem;
    }
}
</style>
