<script setup>
import { ref } from 'vue';
const visible = ref(false);

const toggle = () => {
    visible.value = !visible.value;
}
</script>
<template>
    <Dialog :closable="false" header="Klusje Plaatsen" :visible="visible" modal width="50vw" :breakpoints="{  '960px': '75vw', '641px': 'calc(100vw - 1rem)' }">
        <p>Test</p>
        <template #footer>
            <div class="flex justify-content-between" >
                <Button label="Cancel" @click="toggle" class="p-button-secondary" />
                <Button label="Plaats Klusje" @click="toggle" />
            </div>
        </template>
    </Dialog>
</template>