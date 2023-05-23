<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <nav>
        <div class="nav-logo tablet-hide">
            <img src="/images/Logo.svg" alt="Ziezo Logo">
        </div>
        <div class="spacing tablet-hide"></div>
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
                <a class="help" ><li><i class="pi pi-question-circle" style="font-size: 1.4rem"></i>Hulp Nodig?</li></a>
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
    background: #425a7f;
    padding: 1rem;
    justify-content: space-between;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.2);
}

ul {
    list-style: none;
    text-align: left;
    padding-left: 0rem;
}

li {
    display: flex;
    flex: none;
    border-radius: 2rem;
    align-items: center;
    gap: 1rem;
    color: white;
    padding: .5rem 1.25rem;
    margin-bottom: 0.25rem;
    transition: background-color 0.2s ease-in-out;
}

.router-link-exact-active li {
    background-color: white;
    color: var(--body);
}

li:hover {
    background: #374d6f;
}

.router-link-exact-active li:hover {
    background-color: var(--gray-200);
}

li:active {
    background: var(--primary-faded);
}

.nav-logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 220px;
    padding: 1rem 1rem;
    background-color: white; 
}

.nav-logo img {
    /* Retain source image aspect ratio */
    width: 100%;
    height: auto;
}

.spacing {
    height: 140px;
}

.help {
    cursor: not-allowed;
}

@media screen and (max-width: 768px) {
    nav {
        width: 100%;
        padding: 0;
        height: fit-content;
        background-color: white;
        box-shadow: none;
    }

    ul::not(:last-child) {
        margin: 0;
        margin-bottom: 1rem;
    }
    .router-link-exact-active li {
        background-color: var(--secondary);
        color: white;
    }

    li {
        color: var(--body);
    }

    li:hover {
        background: var(--gray-200);
    }
}
</style>
