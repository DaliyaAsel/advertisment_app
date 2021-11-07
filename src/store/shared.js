// общий store, для обработки общих вещей, например используем при регистрации 
export default {
  state: {
    loading: false,
    error: null
  },
  getters: {
      loading (state) {
         return state.loading
      },
      error (state) {
        return state.error
      }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
      setLoading ( {commit}, payload) {
          commit('setLoading',payload)
      },
      setError ( {commit}, payload ) {
        commit('setError', payload)
      },
      clearError ({commit}){
          commit('clearError')
      }
  }
}
