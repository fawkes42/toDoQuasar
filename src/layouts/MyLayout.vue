<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row">
        <q-toolbar-title class="col-md-10 col-sm-6">
          Quasar App
        </q-toolbar-title>
        <div class="row col-md-2 col-xs-6 justify-around">
          <div><q-btn to="/" label="Chat"/></div>
          <div><q-btn to="/ToDo" label="To Do List"/></div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
