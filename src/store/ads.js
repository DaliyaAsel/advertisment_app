import axios from 'axios'

class Ad {
  constructor(title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title;
    this.description = description;
    this.ownerId = ownerId;
    this.imageSrc = imageSrc;
    this.promo = promo;
    this.id = id;
  }
}

export default {
  state: {
    ads: [],
  },
  mutations: {
    craateAd(state, payload) {
      // console.log(payload);
      state.ads.push(payload)
    },
    setPosts(state, payload) { //сюда передаем массив готовых обьявлений
      state.ads = payload;
    }
  },
  actions: {
    // создание нового поста с рекламой и взаиможействие с БД
    async craateAd({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image
      // try{
      //   //вместо  ownerId, так как в action получаем метод параметр, которым воспользуемся, для получения id текущего пользователя и в этот момент мы уже знаем, что пользователь зареган
      const newAd = new Ad(payload.title, payload.description, getters.user.id, '',  payload.promo) // '' это вместо  imageSrc

      //   // создаем БД в firebase при помощи метода database() и пушим в нее новый элемент, т.е. newAd
      //  const ad = await fb.database().ref('ads').push(newAd)

      //  commit('setLoading', false)
      //  commit('craateAd', {
      //   ...newAd, //развернули обьект который создали
      //   id : ad.key  //обновляем поле id у данного обьекта, key в данном случае - это id нового созданного обьекта, т.е в БД там key по умолчанию, а мы его заменяем на поле id
      // })
      // }
      // catch(error){
      //   commit('setError', error.message)
      //   commit('setLoading', false)
      //   throw error
      // }
      return axios.post('https://itc-ads-3a176-default-rtdb.firebaseio.com/posts.json', newAd)
        .then(res => {
          commit('craateAd', {
            ...newAd, //развернули обьект который создали
            id: res.data.name,
          })
        })
        .catch(e => console.log(e))
    },

    // метод для вытаскивания всех постов из БД
    async fetchAds({
      commit
    }, context) {
      commit('clearError')
      commit('setLoading', true)

      return axios.get('https://itc-ads-3a176-default-rtdb.firebaseio.com/posts.json')
        .then(res => {
          const postsArray = [];
          for (let key in res.data) {
            postsArray.push({
              ...res.data[key],
              id: key
            })
          }
         
          commit('setPosts', postsArray)
        })
        .catch(e => console.log(e))
    }
  },
  getters: {
    ads(state) {
      return state.ads
    },
    // функция вернет только те эл, у которых значение promo = true
    promoAds(state) {
      return state.ads.filter(ad => {
        //   можно  return ad.promo === true
        return ad.promo
      })
    },
    myAds(state) {
      return state.ads
    },
    adById(state) {
      // используем замыкание, для поиска совпадений id и открытия нужной карточки
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    },
    getPostsLoaded(state) { //вытаскиваем посты
      return state.ads;
    }
  }
}
