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
            <q-btn flat label="Chat" to="/Chat"/>
          </div>
          <div class="col-6">
            <q-btn flat label="To Do List" to="/" />
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
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
    }
  },
  methods: {
    openURL
  },
  mounted () {
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
    height: 8vh;
  }
  .pageHeight{
    height: 92vh;
    background-color: #424242;
  }
</style>
