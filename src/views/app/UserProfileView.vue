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

const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
}

onMounted(async () => {
  const token = localStorage.getItem("token");
  const userId = route.params.id;
  let response = await getProfileByUserId(token, userId);
  if (response.status === "success") {
    state.profile = response.data;
    if (state.profile.content) {
      const formattedContent = state.profile.content
        .replace(/<br\s*\/?>/gi, '\n') // Replace <br> tags with newline character
        .replace(/<\/p>/gi, '\n') // Replace closing </p> tags with newline character
        .replace(/<\/h2>/gi, '</h2>\n') // Add a line break after each closing </h2> tag
        .replace(/<\/?[^>]+(>|$)/g, ''); // Remove all other HTML tags

      state.profile.formattedContent = formattedContent;
    }
  } else {
    console.error(response.message);
  }

  response = await getUserByID(token, userId);
  if (response.status === "success") {
    state.user = response.data;
  } else {
    console.error(response.message);
  }

  console.log(state);
});
</script>
<template>
    <div class="profile-container">
        <div class="card-container">
            <Card v-if="state.user" class="p-m-4 p-major card-profile">
                <template #title> 
                <h1>{{ state.user.name_first }} {{ state.user.name_last }}</h1>
                </template>
                <template #content>
                <template v-if="state.profile">
                    <div class="profile-info">
                    <div class="left-column">
                        <h3>Naam:</h3>  
                        <p>{{ state.user.name_first }} {{ state.user.name_last }}</p>
                        <h3>Email:</h3>
                        <p>{{ state.user.email }}</p>
                        <h3>Telefoon:</h3>
                        <p>04/75 87 53 89</p>
                    </div>
                    <div class="right-column">
                        <h3>Straat + Huisnummer:</h3>
                        <p>{{ state.user.address.street }}, {{ state.user.address.number }}</p>
                        <h3>Postcode + Stad:</h3>
                        <p>{{ state.user.address.zip }}, {{ state.user.address.city }}</p>
                    </div>
                    </div>
                </template>
                </template>
            </Card>
            <Card v-if="state.user" class="p-m-4 p-major card-about">
                <template #title><h1>Wie is {{ state.user.name_first }}?</h1></template>
                <template #content>
                    <template v-if="state.profile">
                        <template v-for="(paragraph, index) in state.profile.formattedContent.split('\n')">
                            <template v-if="index % 2 === 0">
                            <h3>{{ paragraph }}</h3>
                            </template>
                            <template v-else>
                            <p>{{ paragraph }}</p>
                            </template>
                        </template>
                    </template>
                </template>
            </Card>

            <Card v-if="state.user" class="p-m-4 p-major card-reviews">
                <template #title><h1>Reviews</h1></template>
                <template #content>
                    <template v-if="state.profile">
                        <h4>Algemene beoordeling</h4>
                        <img class="rating" src="../../assets/images/rating.png" alt="rating" />
                    </template>
                </template>
            </Card>
        </div>
        <Button label="Log uit" icon="pi pi-sign-out" @click="logout" />
    </div>


</template>

<style scoped>

/* put some margin between the 3 cards */
.card-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* give all the 3 cards custom vh */
.profile-container .card-profile {
    height: 50vh;
}

.profile-container .card-about {
    height: 50vh;
}

.profile-container .card-reviews {
    height: 30vh;
    margin-bottom: 20px;
}

/* add some spacing under logout button */
.profile-container .p-button {
    margin-bottom: 20px;
}

.profile-info {
  display: flex;
  justify-content: space-between;
}

.left-column,
.right-column {
  flex-basis: 50%;
}

.profile-info h3 {
  margin-bottom: -10px;
}

.rating {
    width: 100px;
    height: 20px;
    margin-top: 10px;
}


</style>

