import { createWebHistory, createRouter } from "vue-router";

import AuthenticatedPageWrapper from "./components/AuthenticatedPageWrapper.vue";

import HomeView from "./views/app/HomeView.vue";
import MessageView from "./views/app/MessageView.vue";
import JobView from "./views/app/JobView.vue";
import ProfileView from "./views/app/ProfileView.vue";
import ContactView from "./views/app/ContactView.vue";
import SettingsView from "./views/app/SettingsView.vue";
import BrowseView from "./views/app/BrowseView.vue";

import LoginView from "./views/auth/LoginView.vue";
import SignupView from "./views/auth/SignupView.vue";

import NotFoundView from "./views/NotFoundView.vue";
import TestView from "./views/TestView.vue";

import Chat from "./components/chat/Chat.vue";

const routes = [
    {
        path: "/",
        redirect: "/app",
    },
    {
        path: "/app",
        name: "Verifieer Gebruiker",
        component: AuthenticatedPageWrapper,
        children: [
            {
                path: "",
                name: "Home",
                component: HomeView,
            },
            {
                path: "browse",
                name: "Browse",
                component: BrowseView,
            },
            {
                path: "message",
                name: "Berichten",
                component: MessageView,
                children: [
                    {
                        path: ":id",
                        name: "Bericht",
                        component: Chat,
                    },
                ],
            },
            {
                path: "jobs",
                name: "Mijn Klusjes",
                component: JobView,
            },
            {
                path: "profile",
                name: "Mijn Profiel",
                component: ProfileView,
            },
            {
                path: "test",
                name: "Test",
                component: TestView,
            },
            {
                path: "contact",
                name: "Contact",
                component: ContactView,
            },
            {
                path: "settings",
                name: "Instellingen",
                component: SettingsView,
            },
        ],
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView
    },
    {
        path: "/signup",
        name: "Nieuwe Gebruiker",
        component: SignupView
    },
    {
        path: "/:pathMatch(.*)*",
        name: "Pagina Niet Gevonden",
        component: NotFoundView
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
