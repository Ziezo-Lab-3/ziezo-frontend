<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getProfileByUserId } from "../../api/profile";
import { getUserByID } from "../../api/user";
const route = useRoute();
const state = reactive({
    user: null,
    profile: null
});

onMounted(async () => {
    const token = localStorage.getItem("token");
    const userId = route.params.id;
    let response = await getProfileByUserId(token, userId);
    if (response.status === "success") {
        state.profile = response.data;
    } else console.error(response.message);
    response = await getUserByID(token, userId);
    if (response.status === "success") {
        state.user = response.data;
    } else console.error(response.message);
});
</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title v-if="state.user"><h1>{{ state.user.name_first }} {{ state.user.name_last }}</h1></template>
        <template #content v-if="state.user">
            <template v-if="state.profile">
                <div>HIER MOET HTML KOMEN</div>
            </template>
        </template>
    </Card>
</template>