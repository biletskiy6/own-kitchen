import Vue from 'vue'
import Vuex from 'vuex'
import { appForm } from './modules/app-form'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        appForm
    }
})
