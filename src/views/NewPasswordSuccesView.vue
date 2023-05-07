<template>
    <Card class="p-m-4 p-major">
        <template #header>
            <div class="Login-logo">
                <img src="/images/Logo.svg" alt="Ziezo Logo">
            </div>
        </template>
        <template #title>In orde!</template>
        <template #content>
            <div class="p-fluid">
                Je wachtwoord is aangepast, je kan terug inloggen.
                <div class="p-field">
                    <RouterLink to="/Login">
                        <Button label="Login"/>
                    </RouterLink>
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.p-card{
    margin: auto;
}

.p-field, #checkbox {
    margin-bottom: 0.75rem;
}
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