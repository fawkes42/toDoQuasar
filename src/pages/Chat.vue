<template>
  <q-page class="flex-center bg-grey-9">
    <chat-card>
      <template #content>
        <section>
          <div class="row q-gutter-md items-center">
            <div class="col-6">
              <q-input rounded outlined bg-color="grey-4" color="secondary" v-model="person" label="New chat with..." />
            </div>
            <div class="col-1">
              <q-btn round color="secondary" icon="send" @click="newPerson(person)"/>
            </div>
          </div>
        </section>
      </template>
      <template #footer>
        <section class="row">
          <div class="col-7">
            <q-select rounded outlined :options="people" v-model="selected" class="q-mt-md" label="Talk with:" @input="selecionado" bg-color="grey-4" color="secondary" />
          </div>
        </section>
      </template>
    </chat-card>
    <section class="row col-12 justify-center q-pa-lg">
        <div class="col-12">
          <ul class="col-6">
            <li class="boxMessage" v-for="(message, index) in messages" :key="index">
              {{message.msg}}
            </li>
          </ul>
        </div>
        <div class="row col-12 items-center q-gutter-md panel">
          <div class="col-md-6 col-sm-8 col-xs-10">
            <q-input rounded outlined color="secondary" bg-color="grey-4" v-model="message" label="Type your message" />
          </div>
          <div class="col-1">
            <q-btn round color="secondary" icon="send" @click="send(message, person)"/>
          </div>
        </div>
    </section>
  </q-page>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/database'
import ChatCard from 'components/card.vue'
import utils from 'src/utils.js'
export default {
  name: 'PageIndex',
  components: {
    ChatCard
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
  async mounted () {
    try {
      let snapshot = await utils.once(firebase, 'chat', 'value')
      this.carregaChat(snapshot)
    } catch (erro) {
      console.log('este é o erro: ', erro)
    }
    firebase.database().ref('chat').on('value', snapshot => {
      this.carregaChat(snapshot)
    })
    try {
      let snapshot = await utils.once(firebase, 'person', 'value')
      this.carregaPeople(snapshot)
    } catch (erro) {
      console.log('este é o erro: ', erro)
    }
    firebase.database().ref('person').on('value', snapshot => {
      this.carregaPeople(snapshot)
    })
  }
}
</script>

<style lang="stylus" scoped>
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
</style>
