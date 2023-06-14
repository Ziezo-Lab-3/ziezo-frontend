<script setup>
import { computed } from "vue";
import Avatar from "../Avatar.vue";
const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    self: {
        type: Boolean,
        default: false,
    },
    date: {
        type: String
    },
    avatar: {
        type: String
    },
    name: {
        type: String
    },
    format: {
        type: String,
        default: "single",
        oneOf: [ "single", "top" , "bottom" , "middle" ]
    }
});
const wrapperClass = computed(() => {
    let classes = {
        "message__wrapper": true,
        "message__wrapper--self": props.self,
        "message__wrapper--other": !props.self,
    };
    classes[`message__wrapper--${props.format}`] = true;
    return classes;
});
</script>
<template>
    <div :class="wrapperClass">
        <div v-if="props.name && !props.self" class="message__name">{{ props.name }}</div>
        <div v-if="!props.self" class="message__avatar">
            <Avatar :src="props.avatar" :name="props.name" :width="38"/>
        </div>
        <div class="message__bubble">{{ props.text }}</div>
    </div>
</template>
<style scoped>
.message__wrapper {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    margin-bottom: .5em;
}

.message__wrapper--self {
    grid-template-areas: 
        "name name name"
        "bubble bubble bubble";
}

.message__wrapper--other {
    grid-template-areas: 
        ". name name"
        "avatar bubble bubble";
}

.message__name {
    grid-area: name;
    font-size: .75em;
    color: var(--gray-400);
    margin: 0 1em;
}

.message__wrapper--self .message__name {
    text-align: right;
}

.message__avatar {
    grid-area: avatar;
    margin-top: auto;
}

.message__bubble {
    grid-area: bubble;
    padding: .325em .75em .325em .75em;
    background-color: var(--gray-200);
    color: var(--body);
    max-width: 80%;
    margin: auto .5em;
}

.message__wrapper--other .message__bubble {
    border-radius: 1em 1em 1em 0;
    margin-right: auto;
}

.message__wrapper--self .message__bubble {
    border-radius: 1em 1em 0 1em;
    background-color: var(--primary);
    color: var(--white);
    margin-left: auto;
}

.message__wrapper--top .message__avatar,
.message__wrapper--middle .message__avatar {
    opacity: 0%;
}

.message__wrapper--middle .message__name,
.message__wrapper--bottom .message__name {
    display: none;
}

</style>