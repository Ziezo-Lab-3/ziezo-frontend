<script setup>
import { reactive, defineProps, onMounted, watch } from 'vue';
import { getKlusjeById } from '../../api/klusje';
import { getCategories } from '../../api/category';
import { getUserById } from '../../api/user';
import { VueperSlides, VueperSlide } from 'vueperslides';
import moment from 'moment';

const emit = defineEmits(['close']);

const props = defineProps({
    visible: Boolean,
    klusjeId: {
        type: String,
        required: true,
    },
});

/**
 * @type {{ job: Object }}
 * @type {{ permission: number }}
 */
const state = reactive({
    job: null,
    permission: 0,
    user: null,
    helper: null,
    category: null
});

const close = () => {
    emit('close');
};

const updateJob = async () => {
    console.log(props.klusjeId)
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
            }
            result = await getCategories(localStorage.getItem('token'));
            if (result.status === 'success') {
                state.category = result.data.find((category) => category._id === state.job.category).name;
            }

            if (state.job.user) {
                result = await getUserById(localStorage.getItem('token'), state.job.user);
                if (result.status === 'success') {
                    state.user = result.data;
                }
            }
            console.error(result.message);
        } catch (error) {
            console.error(error);
        }
    }
}

watch(() => props.klusjeId, async () => await updateJob());
onMounted(async () => await updateJob());
</script>

<template>
    <Dialog :visible="props.visible" :closable="false" :header="state.job ? state.job.name : ''" modal
        :style="{ width: '832px' }" :breakpoints="{ '580px': 'calc(100vw - 1rem)' }">
        <template #header>
            <h2>{{ state.job?.name || '' }}</h2>
        </template>
        <div v-if="state.job" class="content">
            <div class="content__main">
                <h2>Beschrijving</h2>
                <p>{{ state.job.description }}</p>
                <template v-if="state.permission >= 20">
                    <h2>Adres</h2>
                    <p>{{ state.job.address }}</p>
                </template>
                <div class="content__category">{{ state.category }}</div>
                <div class="content__price">€{{ state.job.price }}</div>
                <div>{{  }}</div>
            </div>
            <div class="content__additional">
                <VueperSlides v-if="state.job?.images" :slide-ratio="2/3">
                    <VueperSlide v-for="(image, index) in state.job.images" :key="index" :image="image" :link="image" open-in-new>
                    </VueperSlide>
                </VueperSlides>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-content-between">
                <Button label="Cancel" @click="close" class="p-button-secondary" />
                <div class="right-footer">
                    <Button class="p-button" label="Stuur bericht" />
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

.content__category {
    font-size: 1.2em;
    opacity: 0.5;
    text-transform: uppercase;
}

.content__price {
    margin-top: 20px;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 1.2em;
    color: var(--success);
}

@media screen and (max-width: 580px) {
    .content {
        grid-template-columns: 1fr;
    }    
}
</style>