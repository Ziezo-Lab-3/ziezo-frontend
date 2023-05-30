<script setup>
import { ref } from 'vue';

const musicIsOn = ref(false);
const fruitLijst = ref(['appel', 'banaan', 'peer']);
const favFruit = ref('appel');
const mijnFruit = ref(['peer']);
const isVegetarian = ref(false);
const ingredient = ref("none");
const logIngredient = () => { console.log(ingredient.value) }
</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title><h1>Test Area</h1></template>
        <template #content>
            <div class="stack">
                <h1>Header 1</h1>
                <h2>Header 2</h2>
                <h3>Header 3</h3>
                <h4>Header 4</h4>
                <h5>Header 5</h5>
                <h6>Header 6</h6>
                <p>Paragraph</p>
                <Button class="p-button-secondary">Coole knop</Button>
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
                        <RadioButton v-model="ingredient" inputId="ingredient1" name="cheese" value="cheese"/>
                        <label for="ingredient1" class="ml-2">Cheese</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="ingredient" inputId="ingredient2" name="mushroom" value="mushroom" />
                        <label for="ingredient2" class="ml-2">Mushroom</label>
                    </div>
                    <p @click="logIngredient" ><b>Ingredient: </b>{{ ingredient }}</p>
                </div>
                <span>Turn on the music
                    <InputSwitch v-model="musicIsOn" />
                </span>
                <ProgressSpinner />
            </div>
        </template>
    </Card>
</template>