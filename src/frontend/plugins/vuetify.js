// src/plugins/vuetify.js
import Vue from "vue";
import Vuetify, {
  VApp,
  VCard,
  VRating,
  VToolbar,
  VBtn,
  VInput,
  VTextField,
  VForm,
  VProgressLinear,
} from "vuetify/lib";
import { Ripple } from "vuetify/lib/directives";

Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VRating,
    VToolbar,
    VBtn,
    VInput,
    VTextField,
    VForm,
    VProgressLinear,
  },
  directives: {
    Ripple,
  },
});

const opts = {};

export default new Vuetify(opts);
