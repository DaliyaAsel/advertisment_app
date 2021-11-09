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
          <v-btn class="warning" @click="triggerUpload"
            >Upload
            <v-icon right dark> mdi-cloud-upload </v-icon>
          </v-btn>
          <input
            ref="fileInput"
            type="file"
            style="display: none"
            accept="image/*"
            @change="onFileChange"
          />
        </v-flex>
        <v-layout>
          <v-flex xs12>
            <img :src="imageSrc" height="100px" v-if="imageSrc" />
            <!-- если imageSrc есть, то передаем его в забайденный :src -->
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-switch v-model="promo" label="Add to promo"></v-switch>
          </v-flex>
        </v-layout>
        <v-flex xs12>
          <v-spacer>
            <v-btn
              class="success"
              @click="createAd"
              :loading="loading"
              :disabled="!valid || !image || loading"
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
      image: null,
      imageSrc: "",
      uploadValue: 0
    };
  },
  computed: {
    // достаем состояние приложения при добавлении нового обьявления
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        //logic
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image  //для загрузки изображения на сервер
        };

        this.$store
          .dispatch("craateAd", ad)
          // после того как создалось обьявлеение, мы переходим на стр с обьявлениями
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});
      }
    },
    // метод, который добавляет файлы при добавлении обьявления по кнопку Upload
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange() {
      // file - хранится, то изображение, которое будет загружаться к нам на фронтенд
      const file = event.target.files[0];

      // new FileReader - это стандартный библиотека в JS
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result;
      };
      // readAsDataURL -это метод у FileReader, куда передаем файл. который подгрузили
      reader.readAsDataURL(file); //выполняется асинхронно эта операция, поэтому на нее нужно поставить прослушку событий reader.onload
      this.image = file;
   
    },

    previewImage(event){
       this.uploadValue = 0;
       this.image =  null;
       this.imageSrc = event.target.files[0];
    }
  },
};
</script>