import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: function() {
      return {
        events: []
      }
    },
    mutations: {
      add: function(state, event) {
        state.events.push(event)
      }
    }
  })
}

export default createStore
