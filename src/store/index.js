import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        product: {},
    },
    mutations: {
        SET_PRODUCT(state, params) {
            state.product = params;
        }
    }
});


export default store;