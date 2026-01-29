<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import LoginModal from '@/components/LoginModal.vue'
import RegisterModal from '@/components/RegisterModal.vue'

const userStore = useUserStore()

const name = computed(() => userStore.name)

const openLoginModal = () => {
  userStore.showLoginModal = true
  console.log('Modal state:', userStore.showLoginModal)
}
console.log('Modal state:', userStore.showLoginModal)

const handleLogout = () => {
  userStore.logout()
}

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <nav>
    <div class="left-nav">
      <RouterLink class="nav-link home" to="/" @click="closeMenu">Yarn Tracker</RouterLink>
    </div>

    <!-- Desktop navigation -->
    <div class="right-nav desktop-nav">
      <RouterLink class="nav-link" to="/stash">Yarn Stash</RouterLink>
      <RouterLink class="nav-link" to="/patterns">Patterns</RouterLink>
      <div class="navbar-end">
        <div v-if="userStore.isLoggedIn" class="navbar-item">
          Welcome, {{ name }}
          <button @click="handleLogout" class="button nav-button is-light">Logout</button>
        </div>
        <div v-else class="navbar-item">
          <button @click="openLoginModal" class="button nav-button is-primary">Login</button>
        </div>
      </div>
    </div>

    <!-- Mobile hamburger button -->
    <button class="hamburger" @click="toggleMenu" :class="{ active: isMenuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Mobile navigation menu -->
    <div class="mobile-nav" :class="{ open: isMenuOpen }">
      <RouterLink class="nav-link" to="/about" @click="closeMenu">Yarn Stash</RouterLink>
      <RouterLink class="nav-link" to="/current" @click="closeMenu">Patterns</RouterLink>
    </div>
  </nav>

  <LoginModal
    v-if="userStore.showLoginModal"
    @close="userStore.showLoginModal = false"
    @open-register="
      () => {
        userStore.showLoginModal = false
        userStore.showRegisterModal = true
      }
    "
  />
  <RegisterModal
    v-if="userStore.showRegisterModal"
    @close="userStore.showRegisterModal = false"
    @open-login="
      () => {
        userStore.showRegisterModal = false
        userStore.showLoginModal = true
      }
    "
  />
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

nav {
  display: flex;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 120px;
  padding: 10px 20px;
  background-color: #b366ff;
  background: url('/banner_small.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1000;
  box-sizing: border-box;
}

.home {
  font-size: 2rem;
  text-decoration: none;
  color: white;
}

.left-nav {
  display: flex;
  position: absolute;
  left: 20px;
}

.right-nav {
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #483248;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #7f00ff;
  transform: scale(1.1);
}

/* Hamburger menu button */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 20px;
  z-index: 1001;
}

.hamburger span {
  width: 100%;
  height: 3px;
  background-color: white;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile navigation */
.mobile-nav {
  display: none;
  position: fixed;
  top: 120px;
  right: 0;
  background-color: #b366ff;
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  text-align: right;
}

.mobile-nav.open {
  transform: translateX(0);
}

.mobile-nav .nav-link {
  display: block;
  padding: 12px 20px;
  font-size: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  text-align: right;
}

.mobile-nav .nav-link:last-child {
  border-bottom: none;
}

/* Mobile styles */
@media (max-width: 768px) {
  .home {
    font-size: 1.5rem;
    top: 70px;
  }

  .desktop-nav {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-nav {
    display: block;
  }

  nav {
    height: 70px;
  }
}

@media (max-width: 480px) {
  .home {
    font-size: 1.2rem;
  }

  nav {
    padding: 10px 15px;
  }

  .left-nav {
    left: 15px;
  }

  .hamburger {
    right: 15px;
  }
}
</style>
