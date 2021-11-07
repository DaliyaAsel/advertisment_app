<template>
  <v-container>
    <v-row>
      <v-flex xs12 sm6 offset-sm3 class="pr-3 pl-5">
        <h1 class="text--secondary mb-3">My ads</h1>
        <v-card class="elevation-10 mb-5" v-for="ad in myAds" :key="ad.id">
          <v-row>
            <v-flex xs4>
              <v-img :src="ad.imageSrc" height="160px"> </v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text class="text--primary">
                <h2>{{ ad.title }}</h2>
                <p>{{ ad.description }}</p>
              </v-card-text>
              <v-card-actions  class="pr-5">
                <v-spacer></v-spacer>
                <v-btn class="info" :to="'/ad/' + ad.id">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-row>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds;
    },
  },
};
</script>