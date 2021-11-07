<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" validation>
              <v-text-field
                prepend-icon="mdi-account"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                :counter="6"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :disabled="!valid || loading"
              :loading="loading"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => emailRegex.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required", //ели пустой инпут, то сообщение об ошибке
        (v) =>
          (v && v.length >= 6) ||
          "Password must be equal or more than 6 characters",
      ],
    };
  },
  computed: {
    loading() {
      this.$store.getters.loading;
    },
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };

        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            //редирект на главную страницу, если пользователь создан
            this.$router.push("/");
          })
          .catch(() => {});
      }
    },
  },
  created () { //это жизненный цикл компонента
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', 'Please log in')
      }
    }
}
</script>