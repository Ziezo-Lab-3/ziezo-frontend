<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Navigation from './components/Navigation.vue';
import Sidebar from 'primevue/sidebar';

const menuOpen = ref(false);
const content = ref(null);

const contentScroll = ref(0);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
}

onMounted(() => {
    content.value.addEventListener('scroll', () => {
        const newScroll = content.value.scrollTop;
        if (newScroll > contentScroll.value) {
            document.getElementById('menu_toggle').classList.add('hidden');
        } else {
            document.getElementById('menu_toggle').classList.remove('hidden');
        }
        contentScroll.value = newScroll;
    })
});
</script>

<template>
    <div id="nav_sidebar">
        <Navigation></Navigation>
    </div>
    <div id="content" ref="content">
        <RouterView></RouterView>
    </div>
    <div id="nav_mobile">
        <Sidebar v-model:visible="menuOpen" position="bottom" class="p-sidebar-md">
            <template #header>
                <div class="nav-logo" >
                    <img src="/images/Logo.svg" alt="Ziezo Logo">
                </div>
            </template>
            <Navigation></Navigation>
        </Sidebar>
        <div id="menu_toggle" @click="() => menuOpen = !menuOpen"><i class="pi pi-bars" style="font-size: 1.5rem"></i></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordRepeat: '',
      showPassword: false,
      termsAgreed: false
    }
  },
  methods: {
    async createAccount() {
      const data = {
        email: this.email,
        password: this.password,
        passwordRepeat: this.passwordRepeat,
        termsAgreed: this.termsAgreed
      }

      try {
        const response = await fetch('http://localhost:3000/api/accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        const responseData = await response.json()
        console.log(responseData)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
.nav-logo {
    width: calc(100vw - 4rem);
    display: flex;
    justify-content: center;
    padding-left: 2rem;
}
</style>
<style>
#app {
    display: grid;
    grid-template-columns: 220px 1fr;
}

#content {
    padding: 1rem 3rem;
    height: calc(100vh);
    overflow-y: auto;
    background-color: var(--background);
    grid-column: 2;
}

#nav_mobile {
    display: none;
}

#menu_toggle {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3.5rem;
    height: 3.5rem;
    z-index: 100;
    cursor: pointer;
    background-color: var(--secondary);
    border-radius: 50%;
    padding: 1rem;
    color: white;
    opacity:100;
    transition: all .3s ease;
}

#menu_toggle.hidden {
    opacity: 0;
    bottom: -4rem;
}

@media (max-width: 768px) {
    #app {
        grid-template-columns: 1fr;
    }

    #content {
        padding: 1rem;
        border-radius: 0;
        grid-column: 1;
    }

    #nav_sidebar {
        display: none;
    }

    #nav_mobile {
        display: inherit;
    }
}</style>