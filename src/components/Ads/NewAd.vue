<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 justtify-center class="pl-3 pr-3">
        <h1 class="text--secondary mb-3">Create new advertisment</h1>
        <v-form v-model="valid" ref="form" validation>
          <v-text-field
            name="title"
            label="Ad title"
            type="text"
            v-model="title"
            required
            :rules="[(v) => !!v || 'Title is required']"
          ></v-text-field>
          <v-textarea
            name="description"
            label="Ad description"
            type="text"
            v-model="description"
            :rules="[(v) => !!v || 'Description is required']"
          ></v-textarea>
        </v-form>
        <v-flex xs12 class="mb-5">
          <v-btn class="warning"
            >Upload
            <v-icon right dark> mdi-cloud-upload </v-icon>
          </v-btn>
        </v-flex>
        <v-layout>
          <v-flex xs12>
            <img src="" height="100px" />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-switch v-model="promo" label="Add to promo"></v-switch>
          </v-flex>
        </v-layout>
        <v-flex xs12>
          <v-spacer>
            <v-btn class="success" @click="createAd" :disabled="!valid"
              >Create ad</v-btn
            >
          </v-spacer>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      promo: false,
      valid: false,
    };
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate()) {
        //logic
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          imageSrc:
            "https://timeweb.com/ru/community/article/1d/1d959c23e81024374895da086675b298.jpg",
        };
        this.$store.dispatch('craateAd', ad);
      }
    },
  },
};
</script>