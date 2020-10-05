<template>
  <div id="app-navbar">
    <nav
      id="navbar"
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/"
          ><img src="@/assets/cube.png"
        /></router-link>

        <a
          id="navbarBurger"
          @click="toggleBurger"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBurger"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarList" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <template v-if="isAuthenticated">
                <div
                  class="navbar-item has-dropdown"
                  @mouseover="openDropdown"
                  @mouseleave="closeDropdown"
                >
                  <a class="navbar-link">
                    <font-awesome-icon icon="user" />
                    <span class="pl-2">User</span>
                  </a>

                  <div class="navbar-dropdown">
                    <router-link class="navbar-item" to="/profile">
                      <font-awesome-icon icon="id-card" />
                      <span class="pl-2">Profile</span>
                    </router-link>
                    <router-link class="navbar-item" to="/settings">
                      <font-awesome-icon icon="cog" />
                      <span class="pl-2">Settings</span>
                    </router-link>
                    <hr class="navbar-divider" />
                    <a class="navbar-item" @click="signOut">
                      <font-awesome-icon icon="sign-out-alt" />
                      <span class="pl-2">Logout</span>
                    </a>
                  </div>
                </div>
              </template>
              <template v-else>
                <button
                  class="button is-primary"
                  @click="toggleModal({ modal: 'register' })"
                >
                  <strong>Register</strong>
                </button>
                <button
                  class="button is-light"
                  @click="toggleModal({ modal: 'login' })"
                >
                  Login
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapState("auth/", { isAuthenticated: (state) => state.isAuthenticated }),
  },
  methods: {
    ...mapActions("modal/", ["toggleModal"]),
    ...mapActions("auth/", ["signOut"]),
    toggleBurger() {
      document.getElementById("navbarList").classList.toggle("is-active");
      document.getElementById("navbarBurger").classList.toggle("is-active");
    },
    openDropdown() {
      const dropdown = document.querySelector(".navbar-item.has-dropdown");
      dropdown.classList.add("is-active");
    },
    closeDropdown() {
      const dropdown = document.querySelector(".navbar-item.has-dropdown");
      dropdown.classList.remove("is-active");
    },
  },
};
</script>
