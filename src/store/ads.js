export default {
  state: {
    ads: [{
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
  },
  mutations: {
    craateAd(state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    craateAd({commit}, payload) {
      payload.id = '87jhj'
      commit('craateAd', payload)
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
    }
  }
}
