<script setup>
import { reactive, defineProps, onMounted, watch, ref } from 'vue';
import { getKlusjeById, putKlusje } from '../../api/klusje';
import { getCategories } from '../../api/category';
import { getUserByID } from '../../api/user';
import { postChatGroup } from '../../api/chatGroup';
import { VueperSlides, VueperSlide } from 'vueperslides';
import { useRouter } from 'vue-router';
import { addKlusjeCandidate } from '../../api/klusje';
import OverlayPanel from 'primevue/overlaypanel';
import Avatar from '../Avatar.vue';
import Rating from 'primevue/rating';
import TextArea from 'primevue/textarea';

import moment from 'moment';
import { RouterLink } from 'vue-router';

const emit = defineEmits(['close', 'update']);
const router = useRouter();
const op = ref();

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
 *      daysSincePosted: string | null,
 *      showAcceptDialog: boolean,
 *      showPaymentDialog: boolean,
 *      rating: number,
 *      review: string,
 * }}
 */
const state = reactive({
    job: null,
    permission: 0,
    user: null,
    helper: null,
    category: null,
    daysSincePosted: null,

    showAcceptDialog: false,
    showPaymentDialog: false,

    rating: 0,
    review: "",
});

const close = () => {
    state.showAcceptDialog = false;
    state.showPaymentDialog = false;
    emit('close');
};

const openConfirmDialog = () => {
    state.showAcceptDialog = true;
}

const openPaymentDialog = async () => {
    const result = await putKlusje(localStorage.getItem('token'), state.job._id, { state: 'awaiting payment' });
    if (result.status === 'success') {
        state.job.state = 'awaiting payment';
        emit('update', state.job)
        state.showAcceptDialog = false;
        state.showPaymentDialog = true;
    } else console.error(result.message);
};

const handlePayment = async () => {
    const result = await putKlusje(localStorage.getItem('token'), state.job._id, { state: 'done' });
    if (result.status === 'success') {
        state.job.state = 'done';
        emit('update', state.job)
    } else console.error(result.message);
};

const rateAndClose = async () => {
    // Mock for now, should be replaced with actual rating
    setTimeout(() => {
        console.log("Rating: " + state.rating + ", Review: " + state.review.trim())
        state.showPaymentDialog = false;
    }, 200);
};

const openChatUser = async () => {
    const userId = localStorage.getItem('userId');

    if (!state.job.candidates) {
        state.job.candidates = [];
    }

    // if user is not a candidate
    if (state.job.candidates.find((candidate) => candidate === userId) === undefined) {
        const result = await addKlusjeCandidate(localStorage.getItem('token'), state.job._id, userId);
        if (result.status === 'success') {
            state.job.candidates.push(userId);
        } else console.error(result.message);
    }

    if (state.user && state.user._id !== userId) {
        const chatGroup = {
            name: state.user.name_first + ' ' + state.user.name_last,
            users: [userId, state.user._id],
        };
        let result = await postChatGroup(localStorage.getItem('token'), chatGroup);
        if (result.status === 'success') {
            console.debug("Navigating to /app/message/" + result.data._id + "")
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
            console.debug("Navigating to /app/message/" + result.data._id + "")
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
                } else console.error(result.message);
            } else state.user = null;

            if (state.job.helper) {
                result = await getUserByID(localStorage.getItem('token'), state.job.helper);
                if (result.status === 'success') {
                    state.helper = result.data;
                } else console.error(result.message);
            } else state.helper = null;
        } catch (error) {
            console.error(error);
        }
    }
}

const showOverlay = (event) => { op.value.show(event); };

watch(() => props.klusjeId, async () => await updateJob());
onMounted(async () => await updateJob());
</script>

<template>
    <Dialog :visible="props.visible && !state.showPaymentDialog" :draggable="false" @update:visible="close"
        :header="state.job ? state.job.name : ''" modal :style="{ width: '832px' }"
        :breakpoints="{ '580px': 'calc(100vw - 1rem)' }">
        <template #header>
            <h2>{{ state.job?.name || '' }}</h2>
        </template>
        <div v-if="state.job" class="content">
            <div class="content__main">
                <div class="content__stats">
                    <div class="content__category">Categorie: {{ state.category || "Onbekend" }}</div>
                    <div class="content__posted">{{ state.daysSincePosted !== null ? state.daysSincePosted : "??" }} dagen
                        geleden</div>
                    <div class="content__price">€{{ state.job.price || "??" }}</div>
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
                <VueperSlides v-if="state.job?.images" :slide-ratio="2 / 3">
                    <VueperSlide v-for="(image, index) in state.job.images" :key="index" :image="image" :link="image"
                        open-in-new>
                    </VueperSlide>
                </VueperSlides>
                <router-link v-if="state.user" :to="'/app/profile/' + state.user._id" class="content__user">
                    <Avatar :src="state.user?.avatar" :name="state.helper?.name_first + ' ' + state.user?.name_last" :width="48" />
                    <div>
                        <b><span class="name no-link">{{ state.user?.name_first }}</span> <span class="name no-link">{{ state.user?.name_last }}</span></b>
                    </div>
                    <div><span class="name no-link">Hulpzoeker</span></div>
                </router-link>
                <router-link v-if="state.helper && state.permission >= 20" :to="'/app/profile/' + state.helper._id" class="content__user">
                    <Avatar :src="state.helper?.avatar" :name="state.helper?.name_first + ' ' + state.helper?.name_last" :width="48" />
                    <div>
                        <b><span class="name no-link">{{ state.user?.name_first }}</span> <span class="name no-link">{{ state.user?.name_last }}</span></b>
                    </div>
                    <div><span class="name no-link">Klusser</span></div>
                </router-link>
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
                    <Button v-if="state.helper" class="p-button" icon="pi pi-send" label="Stuur bericht"
                        @click="openChatHelper" />
                    <Button v-if="state.job.state === 'awaiting payment' || state.job.state === 'in progress'"
                        icon="pi pi-check" label="Markeer als gedaan" @click="openConfirmDialog" />
                    <Button v-if="state.job.state === 'awaiting payment'" class="p-button" icon="pi pi-times"
                        label="Sluiten" />
                </div>
            </div>
            <div v-if="message !== ''" style="color: var(--danger)">{{ message }}</div>
        </template>
    </Dialog>
    <Dialog :visible="state.showAcceptDialog" :draggable="false" modal baseXIndex="90">
        <template #header>
            <h2>Klusje afronden</h2>
        </template>
        <div>
            <div class="p-mb-3">Weet je zeker dat je dit klusje wilt afronden? Deze actie kan niet ongedaan gemaakt worden.
            </div>
        </div>
        <template #footer>
            <div class="p-d-flex p-flex-row p-ai-center">
                <Button class="p-button p-button-secondary p-mr-3" label="Annuleer"
                    @click="state.showAcceptDialog = false" />
                <Button class="p-button p-button-primary modal" label="Bevestig" @click="openPaymentDialog" />
            </div>
        </template>
    </Dialog>
    <Dialog :visible="state.showPaymentDialog" modal :draggable="false" :closable="false" :style="{ width: '832px' }"
        :breakpoints="{ '580px': 'calc(100vw - 1rem)' }">
        <template #header>
            <h2>{{ state.job?.name || '' }}</h2>
        </template>
        <div class="pay-dialog__content">
            <template v-if="state.job.state === 'awaiting payment'">
                <div class="pay-dialog__display">
                    <img src="../../assets/Ziezo.svg" alt="ZieZo logo" width="234" />
                    <h2>De klus is weer geklaard!</h2>
                    <p>Je moet <b>{{ state.helper.name_first }} {{ state.helper.name_last }}</b> in totaal</p>
                    <div class="pay-dialog__price">€{{ state.job.price + 3 || "?" }}</div>
                </div>
                <div class="pay-dialog__details">
                    <h3>Overzicht</h3>
                    <div class="pay-dialog__overview">
                        <p>{{ state.job?.name }}</p>
                        <p><b>€ {{ state.job.price || "?" }}</b></p>
                    </div>
                    <div class="pay-dialog__overview">
                        <p>Servicekosten <b class="clickable" @click="showOverlay">?</b></p>
                        <p><b>€ 3</b></p>
                    </div>
                    <hr />
                    <div class="pay-dialog__overview">
                        <p>Totaal</p>
                        <p><b>€ {{ state.job.price + 3 }}</b></p>
                    </div>
                    <Button label="Betalen" icon="pi pi-credit-card" @click="handlePayment" />
                    <div class="pay-dialog__options">
                        <img src="../../assets/images/ideal-logo-128.webp" alt="iDeal logo" width="36" />
                        <img src="../../assets/images/Bancontact.svg" alt="Bancontact logo" width="48" />
                        <img src="../../assets/images/Mastercard.svg" alt="Mastercard logo" width="40" />
                    </div>
                </div>
                <OverlayPanel ref="op">De servicekost word aangerekend door Ziezo, en wordt gebruikt om ons platform te
                    ondersteunen.</OverlayPanel>
            </template>
            <template v-else-if="state.job.state === 'done'">
                <div class="pay-dialog__display">
                    <img src="../../assets/Ziezo.svg" alt="ZieZo logo" width="234" />
                    <Avatar :src="state.helper.avatar" :name="state.helper.name_first + ' ' + state.helper.name_last"
                        width="80" />
                    <h2>{{ state.helper.name_first }} is betaald</h2>
                </div>
                <div class="pay-dialog__details">
                    <h2>Hoe goed is het klusje uitgevoerd?</h2>
                    <p class="pay-dialog__subtitle">Geef een rating om door te gaan.</p>
                    <Rating v-model="state.rating" :cancel="false" />
                    <div class="labelInput mt-2">
                        <label for="review">Beoordeling</label>
                        <Textarea v-model="state.review" :disabled="state.rating === 0" name="review"
                            placeholder="Heb je opmerkingen bij het klusje?" rows="5" cols="30"
                            style="resize: none; overflow-y: auto" />
                    </div>
                </div>
            </template>
            <template v-else>Something went wrong, please try again later.</template>
        </div>
        <template #footer>
            <div class="p-d-flex p-flex-row p-ai-center">
                <Button :disabled="state.job.state === 'done' && state.rating === 0"
                    class="p-button p-button-secondary p-mr-3" label="Sluiten" @click="state.showPaymentDialog = false" />
                <Button :disabled="state.rating === 0" class="p-button p-button-primary modal" label="Klaar"
                    @click="rateAndClose" />
            </div>
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
    text-align: center !important;
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

.content__user>img {
    grid-column: 1;
    grid-row: 1 / span 2;
    margin-right: 1em;
}

.content__user>div:nth-child(3) {
    grid-column: 2;
    opacity: .8;
}

.pay-dialog__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
}

.pay-dialog__display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.pay-dialog__display p {
    margin: .25em 0;
}

.pay-dialog__display>img:first-of-type {
    margin-bottom: 1em;
}

.pay-dialog__price {
    font-weight: bold;
    font-size: 3em;
    text-align: center !important;
    height: fit-content;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    margin: .5em 0;
}

.pay-dialog__overview {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pay-dialog__overview p {
    margin: .25em 0;
}

.pay-dialog__overview .clickable {
    margin-left: .25em;
    padding: .125em .5em;
    border-radius: .75em;
    background-color: var(--secondary);
    color: var(--white);
}

.pay-dialog__details button {
    width: 50%;
    max-width: 200px;
    margin: .5em auto 0 auto;
    display: block;
}

.pay-dialog__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .5em auto 0 auto;
    max-width: 200px;
}

.pay-dialog__subtitle {
    opacity: .8;
    margin: 0 0 .5rem 0;
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
        margin-top: auto !important;
        margin-bottom: 0px !important;
    }

    .content__user  {
        text-decoration: none !important; /* Remove underline */
        color: inherit !important; /* Use the default text color */
        cursor: default !important; /* Use the default cursor */
    }
    
    .pay-dialog__content {
        grid-template-columns: 1fr;
    }
}</style>