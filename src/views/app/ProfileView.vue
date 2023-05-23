<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
}
</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title>Mijn Profiel</template>
        <template #content>
            <Button label="Log uit" icon="pi pi-sign-out" @click="logout" />
        </template>
    </Card>
</template>