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
        class="ma-2 hidden-sm-and-down"
        color="primary"
        v-for="link in links"
        :key="link.title"
        :to="link.url"
      >
        <v-icon dark left>{{ link.icon }}</v-icon
        >{{ link.title }}
      </v-tab>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
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
      ],
    };
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
