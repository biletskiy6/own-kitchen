import Vue from "vue";
import Vuex from "vuex";
import { appForm } from "./modules/app-form";
import { saveKitchen } from "../utils/save";
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    appForm,
  },
  //plugins: [saveKitchen],
});
