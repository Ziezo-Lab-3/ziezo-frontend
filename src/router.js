import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./views/HomeView.vue";
import MessageView from "./views/MessageView.vue";
import JobView from "./views/JobView.vue";
import ProfileView from "./views/ProfileView.vue";

import ContactView from "./views/ContactView.vue";
import SettingsView from "./views/SettingsView.vue";

import NotFoundView from "./views/NotFoundView.vue";
import TestView from "./views/TestView.vue";
import LoginView from "./views/LoginView.vue";
import ForgotPasswordView from "./views/ForgotPasswordView.vue";

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
    },
    {
        path: "/Login",
        name: "Login",
        component: LoginView
    },
    {
        path: "/ForgotPassword",
        name: "Wachtwoord vergeten",
        component: ForgotPasswordView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
