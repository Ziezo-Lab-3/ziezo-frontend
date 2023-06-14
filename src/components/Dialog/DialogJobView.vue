<script setup>
import { reactive, defineProps, onMounted, watch } from 'vue';
import { getKlusjeById } from '../../api/klusje';
import { getCategories } from '../../api/category';
import { getUserByID } from '../../api/user';
import { postChatGroup } from '../../api/chatGroup';
import { VueperSlides, VueperSlide } from 'vueperslides';
import { useRouter } from 'vue-router';
import Avatar from '../Avatar.vue';
import moment from 'moment';

const emit = defineEmits(['close']);
const router = useRouter();

const props = defineProps({
    visible: Boolean,
    klusjeId: {
        type: String,
        required: true,
    },
});

/**
 * @type {{ 
 *      job: Object | null, 
 *      permission: number, 
 *      user: Object | null, 
 *      helper: Object | null, 
 *      category: string | null, 
 *      daysSincePosted: string | null 
 * }}
 */
const state = reactive({
    job: null,
    permission: 0,
    user: null,
    helper: null,
    category: null,
    daysSincePosted: null,
});

const close = () => {
    emit('close');
};

const openChatUser = async () => {
    const userId = localStorage.getItem('userId');
    if (state.user && state.user._id !== userId) {
        const chatGroup = {
            name: state.user.name_first + ' ' + state.user.name_last,
            users: [userId, state.user._id],
        };
        let result = await postChatGroup(localStorage.getItem('token'), chatGroup);
        if (result.status === 'success') {
            router.push(`/app/message/${result.data._id}`);
        } else console.error(result.message);
    }
};

const openChatHelper = async () => {
    const userId = localStorage.getItem('userId');
    if (state.helper && state.helper._id !== userId) {
        const chatGroup = {
            name: state.helper.name_first + ' ' + state.helper.name_last,
            users: [userId, state.helper._id],
        };
        let result = await postChatGroup(localStorage.getItem('token'), chatGroup);
        if (result.status === 'success') {
            router.push(`/app/message/${result.data._id}`);
        } else console.error(result.message);
    }
};

const updateJob = async () => {
    if (props.klusjeId) {
        try {
            const userId = localStorage.getItem('userId');
            let result = await getKlusjeById(localStorage.getItem('token'), props.klusjeId);
            if (result.status === 'success') {
                state.job = result.data;
                if (state.job.user === userId) {
                    state.permission = 30;
                } else if (state.job.helper === userId) {
                    state.permission = 20;
                } else {
                    state.permission = 10;
                }
                state.daysSincePosted = 0 - moment(state.job.createdAt).diff(moment(), 'days');
            } else console.error(result.message);
            result = await getCategories(localStorage.getItem('token'));

            if (result.status === 'success') {
                state.category = result.data.find((category) => category._id === state.job.category)?.name;
            } else console.error(result.message);

            if (state.job.user) {
                result = await getUserByID(localStorage.getItem('token'), state.job.user);
                if (result.status === 'success') {
                    state.user = result.data;
                }
            } else console.error(result.message);

            if (state.job.helper) {
                result = await getUserByID(localStorage.getItem('token'), state.job.helper);
                if (result.status === 'success') {
                    state.helper = result.data;
                }
            } else console.error(result.message);
        } catch (error) {
            console.error(error);
        }
    }
}



watch(() => props.klusjeId, async () => await updateJob());
onMounted(async () => await updateJob());
</script>

<template>
    <Dialog :visible="props.visible" :draggable="false" @update:visible="close" :header="state.job ? state.job.name : ''" modal 
        :style="{ width: '832px' }" :breakpoints="{ '580px': 'calc(100vw - 1rem)' }">
        <template #header>
            <h2>{{ state.job?.name || '' }}</h2>
        </template>
        <div v-if="state.job" class="content">
            <div class="content__main">
                <div class="content__stats">
                    <div class="content__category" >Categorie: {{ state.category || "Onbekend" }}</div>
                    <div class="content__posted">{{ state.daysSincePosted !== null ? state.daysSincePosted : "??" }} dagen geleden</div>
                    <div class="content__price">€{{ state.job.price || "??"}}</div>
                    <div class="content__price__label">Inclusief service kost</div>
                </div>
                <h2>Beschrijving</h2>
                <p>{{ state.job.description }}</p>
                <template v-if="state.permission >= 20">
                    <h2>Adres</h2>
                    <p>{{ state.job.address }}</p>
                </template>
            </div>
            <div class="content__additional">
                <VueperSlides v-if="state.job?.images" :slide-ratio="2/3">
                    <VueperSlide v-for="(image, index) in state.job.images" :key="index" :image="image" :link="image" open-in-new>
                    </VueperSlide>
                </VueperSlides>
                <div v-if="state.user" class="content__user">
                    <Avatar :src="state.user?.avatar" :name="state.helper?.name_first + ' ' + state.user?.name_last" :width="48" />
                    <div><b>{{ state.user?.name_first }} {{ state.user?.name_last }}</b></div>
                    <div>Hulpzoeker</div>
                </div>
                <div v-if="state.helper && state.permission >= 20" class="content__user">
                    <Avatar :src="state.helper?.avatar" :name="state.helper?.name_first + ' ' + state.helper?.name_last" :width="48" />
                    <div><b>{{ state.helper?.name_first }} {{ state.helper?.name_last }}</b></div>
                    <div>Klusser</div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-content-between footer">
                <Button icon="pi pi-times" label="Sluiten" @click="close" class="p-button-secondary close" />
                
                <!-- Viewer -->
                <div class="right-footer" v-if="state.permission === 10">
                    <Button class="p-button" icon="pi pi-send" label="Stuur bericht" @click="openChatUser" />
                </div>
                
                <!-- Helper -->
                <div class="right-footer" v-if="state.permission === 20">
                    <Button class="p-button" icon="pi pi-send" label="Stuur bericht" @click="openChatUser" />
                </div>
                
                <!-- Owner -->
                <div class="right-footer" v-if="state.permission === 30">
                    <Button class="p-button p-button-secondary" icon="pi pi-pencil" label="Bewerken" disabled />
                    <Button v-if="state.helper" class="p-button" icon="pi pi-send" label="Stuur bericht" @click="openChatHelper" />
                    <Button class="p-button" icon="pi pi-check" label="Markeer als gedaan" />
                </div>
            </div>
            <div v-if="message !== ''" style="color: var(--danger)">{{ message }}</div>
        </template>
    </Dialog>
</template>

<style>
.content {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-gap: 1rem;
}

.content__main {
    grid-column: 2;
}

.content__additional {
    grid-column: 1;
    grid-row: 1 / span 2;
}

.content__stats {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
}

.content__category {
    opacity: 0.8;
    grid-column: 1;
    grid-row: 1;
}

.content__posted {
    opacity: 0.8;
    grid-column: 1;
    grid-row: 2;
}

.content__price {
    font-weight: bold;
    font-size: 2em;
    color: var(--white);
    background-color: var(--secondary);
    border-radius: .125em;
    text-align: center!important;
    padding: .25em .5em;
    height: fit-content;
    width: fit-content;
    margin-left: auto;
    grid-column: 2;
    grid-row: 1 / span 2;
    text-align: right;
}

.content__price__label {
    opacity: 0.8;
    grid-column: 2;
    grid-row: 3;
    text-align: right;
}

.content__user {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    font-size: 1em;
    line-height: 1em;
    margin-top: 1em;
}

.content__user > img {
    grid-column: 1;
    grid-row: 1 / span 2;
    margin-right: 1em;
}

.content__user > div:nth-child(3) {
    grid-column: 2;
    opacity: .8;
}

@media screen and (max-width: 580px) {
    .content {
        grid-template-columns: 1fr;
        grid-template-columns: auto auto;
    }

    .content__main {
        grid-column: 1;
    }

    .content__additional {
        grid-column: 1;
        grid-row: 2;
    }

    .footer .right-footer {
        display: flex;
        flex-direction: column;
        gap: .5em;
    }

    .footer .close {
        max-height: 36.8px;
        margin-top: auto!important;
        margin-bottom: 0px!important;
    }
}
</style>