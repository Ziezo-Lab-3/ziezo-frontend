<script setup>
import { reactive, onMounted, watch } from 'vue';

const state = reactive({
    initialized: false,
    theme: 'default',
});

onMounted(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
        state.theme = theme;
    }
    console.log(theme);
    state.initialized = true;
});

watch(() => state.theme, (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
});
</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title><h1>Instellingen</h1></template>
        <template #content>
            <div class="flex flex-wrap flex-column">
                <h2>Kleurenthema's</h2>
                <div class="flex align-items-center">
                    <RadioButton v-model="state.theme" inputId="theme1" name="Default" value="default"/>
                    <label for="theme1" class="ml-2">Standaard</label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="state.theme" inputId="theme2" name="High-contrast" value="high-contrast" />
                    <label for="theme2" class="ml-2">Hoog-contrast</label>
                </div>
            </div>
        </template>
    </Card>
</template>