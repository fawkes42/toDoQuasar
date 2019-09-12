<template>
  <q-layout>
    <div class="header row col-12">
      <q-toolbar class="bg-grey-10 text-white">
        <div class="col-md-10 col-sm-12 col-xs-8">
          <q-toolbar-title>
            <small>Little </small><strong>Project</strong>
          </q-toolbar-title>
        </div>
        <div class="row col-md-2 col-sm-2 col-xs-4 justify-around">
          <div class="col-6">
            <q-btn flat label="Chat" to="chat"/>
          </div>
          <div class="col-6">
            <q-btn flat label="To Do List" to="todo" />
          </div>
        </div>
      </q-toolbar>
    </div>
    <q-page-container class="pageHeight">
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
  .header{
    height: 8vh;
  }
  .pageHeight{
    height: 92vh;
    background-color: #424242;
  }
</style>
