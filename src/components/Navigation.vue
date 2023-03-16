<template>
    <nav>
        <div class="nav-logo">
            <img src="/images/Logo.svg" alt="Ziezo Logo">
        </div>
        <div class="nav-menu">
            <ul>
                <li><i class="pi pi-home" style="font-size: 1.4rem"></i> Thuispagina</li>
                <li><i class="pi pi-comment" style="font-size: 1.4rem"></i>Berichten</li>
                <li><i class="pi pi-wrench" style="font-size: 1.4rem"></i>Mijn Klusjes</li>
                <li><i class="pi pi-user" style="font-size: 1.4rem"></i>Profiel</li>
            </ul>
        </div>
        <div class="nav-details">
            <ul>
                <li><i class="pi pi-question-circle" style="font-size: 1.4rem"></i>Hulp Nodig?</li>
                <li><i class="pi pi-info-circle" style="font-size: 1.4rem"></i>Contact Info</li>
                <li><i class="pi pi-cog" style="font-size: 1.4rem"></i>Instellingen</li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 100vh;
  background: #FFFFFF;
  padding: 1rem;
  justify-content: space-between;
}

ul {
  list-style: none;
  text-align: left;
  padding-left: 0rem;
}

li {
  display: flex;
  flex: none;
  border-radius: 20px;
  align-items: center;
  gap: 1rem;
  color: #172230;
  margin-bottom: .5rem;
  padding: .5rem 1.25rem;
  cursor: pointer;
}

li:hover {
  background: var(--primary-faded);
}

li:active {
  background: var(--primary-faded);
}

.nav-logo {
    width: 100%;
    padding: 0rem 1rem;
}

.nav-logo img {
    /* Retain source image aspect ratio */
    width: 100%;
    height: auto;
}
</style>
