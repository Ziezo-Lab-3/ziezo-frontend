<script setup>
import { reactive, onMounted } from 'vue';
import { getChatGroups } from '../../api/chatGroup';
import Avatar from '../Avatar.vue';

const emit = defineEmits(['update-selection']);

const state = reactive({
    instances: [],
    initialized: false,
    isLoadingData: false,
    selectedChatGroup: null,
});

const selectChatGroup = (index) => {
    state.selectedChatGroup = index;
    emit('update-selection', state.instances[index]);
}

onMounted(async () => {
    state.isLoadingData = true;
    const chatGroups = await getChatGroups(localStorage.getItem('token'));
    state.instances = chatGroups.data;
    if (chatGroups.data.length > 0) selectChatGroup(0);
    state.isLoadingData = false;
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
            <div v-for="(instance, index) in state.instances" :key="instance.id" @click="() => selectChatGroup(index)" :class="`chat-link ${index === state.selectedChatGroup ? 'chat-link--selected' : ''}`">
                <Avatar :src="instance.avatar" :name="instance.name || '!'" :width="48" />
                <div>
                    <h3>{{ instance.name }}</h3>
                    <p>{{ instance.lastMessage }}</p>
                </div> 
                <div v-if="instance.unreadMessages > 0" class="bubble-unread">
                    {{ instance.unreadMessages }}
                </div> 
            </div>
        </div>
    </div>
</template>
<style scoped>
.chat-list {
    height: 100%;
    overflow-y: auto;
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
    box-shadow: inset 0px 0px var(--primary);
    transition: background-color .2s linear, box-shadow .2s linear;
}

.chat-link.chat-link--selected {
    box-shadow: inset 4px 0px var(--primary);
}

.chat-link:hover {
    cursor: pointer;
    background-color: var(--gray-100);
}

.chat-link.chat-link--active {
    background-color: #a4acc2;
}

.chat-link > div {
    margin-left: .5rem;
    width: calc(100% - 4.5rem); /* subtract the width of the image and padding from the container */
   
}

.chat-link > div > h3,
.chat-link > div > p {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}

.bubble-unread {
    background-color: var(--primary);
    border-radius: 50%;
    color: var(--white);
    font-size: .75rem;
    font-weight: bold;
    height: 1.5rem;
    aspect-ratio: 1/1;
    text-align: center;
    line-height: 1.5rem;

    position: relative;
    right: 1.5rem;
    top: -1rem;
}
</style>