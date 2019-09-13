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
            <router-link class="router text-white" to="chat">Chat</router-link>
          </div>
          <div class="col-6">
            <router-link class="router text-white" to="/">To do</router-link>
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
import firebase from 'firebase/app'
import 'firebase/database'
export default {
  data () {
    return {
    }
  },
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyB3TEPR45_pGvzofu8Oxj6iJ4dYWl0KHl4',
      authDomain: 'to-do-list-d3aa5.firebaseapp.com',
      databaseURL: 'https://to-do-list-d3aa5.firebaseio.com',
      projectId: 'to-do-list-d3aa5',
      storageBucket: 'to-do-list-d3aa5.appspot.com',
      messagingSenderId: '832078297256',
      appId: '1:832078297256:web:e8b3378c74d8261b'
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }
}
</script>

<style>
  .header{
    height: 8%;
  }
  .pageHeight{
    height: 92%;
    background-color: #424242;
  }
  .router{
    text-decoration: none;
    font-size: 12pt;
  }
</style>
