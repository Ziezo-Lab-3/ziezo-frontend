import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "./views/Home.vue";

import TestView from "./views/Test.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/test",
        name: "Test",
        component: TestView,
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

/*
router.beforeEach((to, from, next) => {
    if (to.path.startsWith("/app")) {
        const token = localStorage.getItem("token");
        if (!token) {
            next("/");
        } else {
            const API_URI = import.meta.env.VITE_API_URI;
            fetch(`${API_URI}/auth/verify`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token,
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.message === "Unauthorized!") {
                        localStorage.removeItem("token");
                        location.reload();
                    }
                });
        }
    }
    next();
});
*/
export default router;
