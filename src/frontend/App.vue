<template>
  <v-app id="vue-frontend-app">
    <h2>Frontend App</h2>

    <app-form></app-form>

    <router-view />
  </v-app>
</template>

<script>

import AppForm from 'frontend/components/app-form.vue'

export default {
  name: 'App',
  components: {
    AppForm
  }
}
</script>

<style>

</style>
