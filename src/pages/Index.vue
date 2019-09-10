<template>
  <q-page class="flex flex-center">
    <card>
      <template #header>
        <p><strong class="text-black q-ml-sm">Add a talk</strong></p>
      </template>
      <template #content>
        <div class="flex horizontal-align q-gutter-sm">
          <q-input rounded outlined bg-color="white" v-model="person" label="New chat with..." />
          <q-btn round color="primary" icon="send" @click="newPerson(person)"/>
        </div>
      </template>
      <template #footer>
         <q-select rounded outlined :options="people" v-model="selected" class="q-mt-md" label="Talk with:" @input="selecionado" bg-color="white"/>
      </template>
    </card>
    <div class="chat">
      <div class="talk q-ml-xl">
        <ul>
          <li class="boxMessage" v-for="message in messages" :key="message">
            {{message.msg}}
          </li>
        </ul>
      </div>
      <div class="panel q-ml-lg q-mt-sm q-gutter-md q-mb-md horizontal-align">
        <q-input rounded outlined bg-color="white" class="inputChat" v-model="message" label="Type your message" />
        <q-btn round color="primary" icon="send" @click="send(message, person)"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/database'
import card from 'components/card.vue'
export default {
  name: 'PageIndex',
  components: {
    card
  },
  data () {
    return {
      messages: [],
      message: '',
      people: [],
      selected: null,
      person: ''
    }
  },
  methods: {
    carregaChat (snapshot) {
      this.messages = []
      let valores = snapshot.val()
      for (let prop in valores) {
        if (valores[prop].person === this.selected) {
          this.messages.push({
            key: prop,
            msg: valores[prop].msg
          })
        }
      }
    },
    carregaPeople (snapshot) {
      this.people = []
      let names = snapshot.val()
      console.log(names)
      // names.forEach((prop, index) => {
      //  this.people.push({ label: names[prop].name, value: index })
      // })
      for (let prop in names) {
        this.people.push({ label: names[prop].name, value: names[prop].key })
      }
    },
    selecionado (name) {
      this.selected = name.label
      firebase.database().ref('chat').on('value', snapshot => {
        this.carregaChat(snapshot)
      })
    },
    send (msg, person) {
      person = this.selected
      let key = firebase.database().ref().child('chat').push().key
      if (this.message.length > 0 && this.selected.length > 0) {
        firebase.database().ref('chat/' + key).set({ msg, person })
        this.message = ''
      }
    },
    newPerson (name) {
      if (name.length >= 3) {
        let key = firebase.database().ref().child('chat').push().key
        firebase.database().ref('person/' + key).set({ name })
        this.person = ''
      }
    }
  },
  mounted () {
    // Your web app's Firebase configuration
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
    firebase.database().ref('tasks').once('value').then(snapshot => {
      this.carrega(snapshot)
    })
    firebase.database().ref('tasks').on('value', snapshot => {
      this.carrega(snapshot)
    })

    firebase.database().ref('chat').once('value').then(snapshot => {
      this.carregaChat(snapshot)
    })
    firebase.database().ref('chat').on('value', snapshot => {
      this.carregaChat(snapshot)
    })

    firebase.database().ref('person').once('value').then(snapshot => {
      this.carregaPeople(snapshot)
    })
    firebase.database().ref('person').on('value', snapshot => {
      this.carregaPeople(snapshot)
    })
  }
}
</script>

<style lang="stylus" scoped>
.flex-center{
  width 100%
  height 100%
  position relative
  background-color:#343434
}
.chat{
  width 100%;
  height calc(100vh + 100%) !important
  position: relative;
}
.new-friend{
}
ul{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
  margin-top: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  width: max-content;
}
.boxMessage{
  position: relative;
}
.boxMessage:before{
  content: "";
  position: absolute;
  border-left: 20px solid transparent;
  border-top: 30px solid white;
  top: 0px;
  left: -12px;
}
.horizontal-align{
  align-items center
}
.talk{
  height 90%
}
.panel{
  display: flex;
  position sticky
  bottom: 0;
  left 0;
}
.inputChat{
  width 55%
}
</style>
