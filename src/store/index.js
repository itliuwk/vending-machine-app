import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        product: {},
        params:{},
    },
    mutations: {
        SET_PRODUCT(state, params) {
            state.product = params;
        },
        SET_PARAMS(state, params) {
            state.params = params;
        }
    }
});


export default store;