import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./views/HomeView.vue";
import MessageView from "./views/MessageView.vue";
import JobView from "./views/JobView.vue";
import ProfileView from "./views/ProfileView.vue";

import ContactView from "./views/ContactView.vue";
import SettingsView from "./views/SettingsView.vue";

import NotFoundView from "./views/NotFoundView.vue";
import TestView from "./views/TestView.vue";

import BrowseView from "./views/BrowseView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/message",
        name: "Berichten",
        component: MessageView,
    },
    {
        path: "/jobs",
        name: "Mijn Klusjes",
        component: JobView,
    },
    {
        path: "/browse",
        name: "Zoeken",
        component: BrowseView,

    },
    {
        path: "/profile",
        name: "Mijn Profiel",
        component: ProfileView,
    },
    {
        path: "/test",
        name: "Test",
        component: TestView,
    },
    {
        path: "/contact",
        name: "Contact",
        component: ContactView,
    },
    {
        path: "/settings",
        name: "Instellingen",
        component: SettingsView,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "Pagina Niet Gevonden",
        component: NotFoundView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
