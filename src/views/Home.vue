<template>
    <Card class="p-m-4">
        <template #title>Home</template>
        <template #content>
            <div class="stack">
                <Button>Coole knop</Button>
                <InputText placeholder="Voer hier je naam in" />
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