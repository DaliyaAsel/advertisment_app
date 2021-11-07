<template>
  <v-container class="mt-2">
    <v-row>
      <v-flex xs12>
        <v-card>
          <v-img :src="ad.imageSrc" height="300px"> </v-img>
          <v-card-text>
            <h1 class="text--primary">{{ ad.title }}</h1>
            <p>{{ ad.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer> </v-spacer>
            <v-btn class="warning" text>Edit</v-btn>
            <v-btn class="success"> Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    //чтбы при клике на кнопку open  карточки открываллась текущая карточка с img
    ad() {
      const id = this.id;
      return this.$store.getters.adById(id);
    },
  },
};
</script>