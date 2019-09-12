<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
export default {
  name: 'App',
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
</style>
