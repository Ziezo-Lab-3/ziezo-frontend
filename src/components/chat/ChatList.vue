<script setup>
import { reactive, onMounted } from 'vue';

const state = reactive({
    instances: [],
    initialized: false,
    isLoadingData: false,
});

onMounted(() => {
    state.instances = [
        {
            id: 1,
            name: "Kaitlyn Ullrich",
            picture: "https://randomuser.me/api/portraits/women/51.jpg",
            lastMessage: "Ik heb best wat ervaring in het klussen. Ik kan je helpen met het ophangen van een schilderij, het in elkaar zetten van een kast of het vervangen van een lamp. Ik heb een auto dus ik kan ook helpen met verhuizen.",
            lastMessageDate: "2021-05-01T12:00:00.000Z",
            unreadMessages: 2,
            members: [
                "64009e396dd8fec7e85aa8b4",
                "645396145b0057fb60218836"
            ]
        },
        {
            id: 2,
            picture: "https://randomuser.me/api/portraits/women/52.jpg",
            name: "Marguerite Klaassen",
            lastMessage: "Ik heb best wat ervaring in het klussen. Ik kan je helpen met het ophangen van een schilderij, het in elkaar zetten van een kast of het vervangen van een lamp. Ik heb een auto dus ik kan ook helpen met verhuizen.",
            lastMessageDate: "2021-05-01T12:00:00.000Z",
            unreadMessages: 2,
            members: [
                "64009e396dd8fec7e85aa8b4",
                "64539b22a63851a707c6750d"
            ]
        },
        {
            id: 3,
            picture: "https://randomuser.me/api/portraits/women/62.jpg",
            name: "Jennifer Smith",
            lastMessage: "Ik heb best wat ervaring in het klussen. Ik kan je helpen met het ophangen van een schilderij, het in elkaar zetten van een kast of het vervangen van een lamp. Ik heb een auto dus ik kan ook helpen met verhuizen.",
            lastMessageDate: "2021-05-01T12:00:00.000Z",
            unreadMessages: 2,
            members: [
                "64009e396dd8fec7e85aa8b4",
                "64539b4b3a5f4a419e35b3a6"
            ]
        },
    ];
    state.initialized = true;
});
</script>
<template>
    <div class="chat-list">
        <div v-if="!state.initialized">
            Loading...
        </div>
        <div v-else-if="state.instances.length === 0">
            <p>Geen berichten</p>
        </div>
        <div v-else>
            <div v-for="instance in state.instances" :key="instance.id" class="chat-link">
                <img :src="instance.picture" :alt="instance.name" />
                <div>
                    <h3>{{ instance.name }}</h3>
                    <p>{{ instance.lastMessage }}</p>
                </div>  
            </div>
        </div>
    </div>
</template>
<style scoped>
.chat-list {
    height: 100%;
    overflow-y: auto;
    width: 250px;
}
.chat-list > div {
    width: 100%;
}
.chat-link {
    padding: .5rem;
    border-bottom: 1px solid var(--gray-200);
    align-items: center;
    display: flex;
    align-items: center;
    width: 100%;
}

.chat-link:hover {
    cursor: pointer;
    background-color: var(--gray-100);
}

.chat-link.chat-link--active {
    background-color: #a4acc2;
}

.chat-link img {
    flex: 0 1 auto;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
}

.chat-link > div {
    flex: 1 1 auto;
    margin-left: .5rem;
}

.chat-link > div > h3,
.chat-link > div > p {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
</style>