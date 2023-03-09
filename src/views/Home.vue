<script setup>
import { ref } from 'vue';

const musicIsOn = ref(false);
const fruitLijst = ref(['appel', 'banaan', 'peer']);
const favFruit = ref('appel');
const mijnFruit = ref(['peer']);
const isVegetarian = ref(false);
const pizza = ref("");
</script>
<template>
    <Card class="p-m-4">
        <template #title>Home</template>
        <template #content>
            <div class="stack">
                <Button>Coole knop</Button>
                <InputText placeholder="Voer hier je naam in" />
                <InputNumber placeholder="Voer hier je leeftijd in" />
                <InputMask mask="+99 999 99 99 99" placeholder="Voer hier je telefoonnummer in" />
                <Password placeholder="Voer hier je wachtwoord in" />
                <Dropdown :options="fruitLijst" v-model="favFruit" />
                <MultiSelect :options="fruitLijst" v-model="mijnFruit" />
                <Calendar />
                <TextArea placeholder="Voer hier je tekst in" />
                <div class="flex align-items-center">
                    <Checkbox v-model="isVegetarian" inputId="ingredient1" name="yes" :value="true" />
                    <label for="ingredient1" class="ml-2"> Yes </label>
                </div>
                <div class="flex flex-wrap gap-3">
                    <div class="flex align-items-center">
                        <RadioButton v-model="pizza" inputId="ingredient1" name="pizza" />
                        <label for="ingredient1" class="ml-2">Cheese</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="pizza" inputId="ingredient2" name="pizza" />
                        <label for="ingredient2" class="ml-2">Mushroom</label>
                    </div>
                </div>
                <span>Turn on the music
                    <InputSwitch v-model="musicIsOn" />
                </span>
                <ProgressSpinner />
            </div>
        </template>
    </Card>
</template>

<style scoped>
.stack {
    display: flex;
    flex-direction: column;
    width: fit-content;
    gap: 1rem;
}
</style>