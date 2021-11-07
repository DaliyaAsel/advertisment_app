<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-item v-for="link in links" :key="link.title" :to="link.url">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="isUserLoggedIn" @click="onLogout">
          <v-list-item-icon>
            <v-icon>{{ exitIcon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="'Logout'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- верхнее меню -->
    <v-app-bar app dark color="primary" flat>
      <!-- вызывает  drawer по нажатию на бургур -->
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer"
          >Ad application</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tab
        class="hidden-sm-and-down"
        color="primary"
        v-for="link in links"
        :key="link.title"
        :to="link.url"
      >
        <v-icon dark left>{{ link.icon }}</v-icon
        >{{ link.title }}
      </v-tab>
      <v-tab
        class="hidden-sm-and-down"
        color="red"
        @click="onLogout"
        v-if="isUserLoggedIn"
      >
        <v-icon dark left>{{ exitIcon }}</v-icon
        >Logout</v-tab
      >
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- вывод сообщения об ошибки, если она есть -->
    <template v-if="error">
      <v-snackbar
        @input="closeError"
        :timeout="timeout"
        color="error"
        :value="true"
      >
        {{ error }}
        <v-btn text color="blue" @click.native="closeError"> Close </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      timeout: 5000,
      exitIcon: "mdi-exit-to-app",
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      //скрываем роуты в зависимости от залогинен пользователь или нет
      if (this.isUserLoggedIn) {
        return [
          {
            title: "Orders",
            icon: "mdi-bookmark-outline",
            url: "/orders",
          },
          {
            title: "New ad",
            icon: "mdi-note-plus-outline",
            url: "/new",
          },
          {
            title: "My ads",
            icon: "mdi-equal",
            url: "/list",
          },
        ];
      }
      return [
        {
          title: "Login",
          icon: "mdi-lock",
          url: "/login",
        },
        {
          title: "Registration",
          icon: "mdi-face-man-shimmer-outline",
          url: "/registration",
        },
      ];
    },
  },
  methods: {
    // метод для очистки ошибки
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push({ name: "home" }).catch((error) => {
        if (
          error.name !== "NavigationDuplicated" &&
          !error.message.includes(
            "Avoided redundant navigation to current location"
          )
        ) {
          console.log(error);
        }
      });
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
