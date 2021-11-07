import firebase from "firebase/compat/app";
import  "firebase/compat/auth"
class User {
  constructor(id) {
    this.id = id
  }
}


export default {
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user
    },
    // проверяем, зарегистрирован пользователь или нет
    isUserLoggedIn (state) {
      return state.user !== null
    }
  },
  mutations: {
    setUser(state, payload) {
       state.user = payload
    }
  },
  actions: {
    // регистрация пользователя
    async registerUser({ commit}, {email, password}) {
      commit('clearError') //очищаем ошибки как только нажали на кнопку регистрации
      commit('setLoading', true) // запускаем загрусщие
      try {
         // обращение к firebaseи через метод  creatUserWithEmailAndPassword создается новый пользователь, который возвращает промис
       const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        // uid в firebase содержит созданного пользователя
        commit('setUser', new User(user.uid))
        commit('setLoading', false) // получили ответ с сервера и убираем загрузчик
      } catch(error) {
          commit('setLoading', false) // загрузка завершена, но с ошибкой, убираем его и выводим сообщение об ошибке
          commit('setError', error.message)
          throw error
        }
    },
      // login пользователя
   async loginUser( {commit}, {email, password} ) {
    commit('clearError') //очищаем ошибки как только нажали на кнопку регистрации
    commit('setLoading', true) // запускаем загрусщие
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password)
      // uid в firebase содержит созданного пользователя
      commit('setUser', new User(user.uid))
      commit('setLoading', false) // получили ответ с сервера и убираем загрузчик
    } catch(error) {
        commit('setLoading', false) // загрузка завершена, но с ошибкой, убираем его и выводим сообщение об ошибке
        commit('setError', error.message)
        throw error
      }
  },
  // сохранение сессии после логина
   autoLoginUser ({commit}, payload){
     commit('setUser', new User(payload.uid))
   },
   logoutUser ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
   }
  }
}
