<script setup>
import { reactive, onMounted } from 'vue';

const state = reactive({
    messages: [],
    initialized: false,
    isLoadingData: false,
    message: "",
});

</script>
<template>
<div class="chat__wrapper">
    <div class="chat__header"></div>
    <div class="chat__messages">
        <div v-if="!state.initialized">
            Loading...
        </div>
        <div v-else-if="state.messages.length === 0">
            <p>Geen berichten</p>
        </div>
        <div v-else>
            <div v-for="message in state.messages" :key="message.id" class="chat__message">
                <div class="chat__message__content">
                    <p>{{ message.content }}</p>
                </div>
                <div class="chat__message__meta">
                    <p>{{ message.createdAt }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="chat__input">
        <InputText v-model="value" placeholder="Aa" />
        <Button label="Verstuur" />
    </div>
</div>
</template>
<style scoped>
.chat__wrapper {
    display: grid;
    grid-template-rows: auto 1fr auto;
}
.chat__input {
    display: grid;
    height: 3rem;
    grid-template-columns: 1fr auto;
    grid-gap: 1rem;
    padding: .25rem;
}
</style>