<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item v-for="ad in ads" :key="ad.id" :src="ad.imageSrc">
              <div class="carusel-link">
                <v-btn class="error" :to="'/ad/' +ad.id">{{ad.title}}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="ad in ads" :key="ad.id" :src="ad.imageSrc">
          <v-card class="mx-auto" max-width="344">
            <v-img :src="ad.imageSrc" height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <h3>{{ ad.title }}</h3>
                <div>{{ ad.description }}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :to="'/ad/' + ad.id"> Open </v-btn>
              <v-btn raised class="primary" text> Buy </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ads: [
        {
          title: "First ad",
          description: "Hellow I'am descr",
          promo: false,
          imageSrc: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          id: "123",
        },
        {
          title: "Second ad",
          description: "Hellow I'am descr",
          promo: true,
          imageSrc: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
          id: "124",
        },
        {
          title: "Third  ad",
          description: "Hellow I'am descr",
          promo: true,
          imageSrc: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
          id: "125",
        },
      ],
    };
  },
};
</script>

<style  scoped>
.carusel-link {
  position: absolute;
  left: 50%;
  bottom: 50px;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, 0);
  padding: 5px 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>