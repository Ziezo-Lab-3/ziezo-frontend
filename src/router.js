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
import SignupView from "./views/SignupView.vue";
import NewPasswordView from "./views/NewPasswordView.vue";
import NewPasswordSuccesView from "./views/NewPasswordSuccesView.vue";
import CreateProfileView from "./views/CreateProfileView.vue";

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
    },
    {
        path: "/Aanmelden",
        name: "Aanmelden",
        component: SignupView
    },
    {
        path: "/NewPassword",
        name: "Nieuw Wachtwoord",
        component: NewPasswordView
    },
    {
        path: "/NewPasswordSucces",
        name: "Nieuw Wachtwoord geaccepteerd",
        component: NewPasswordSuccesView
    },
    {
        path: "/CreateProfile",
        name: "Profiel aanmaken",
        component: CreateProfileView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
