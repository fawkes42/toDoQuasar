<template>
  <section class="q-mt-md bg-grey-9">
    <div class="row col-md-12 justify-center q-gutter-md">
      <q-btn icon="add" @click="novo" class="bg-grey-4" color="grey-10" flat round small />
      <q-btn :label="mostrar ? 'Mostrar somente pendentes' : 'Mostrar todos'" @click="show" class="bg-grey-4"/>
    </div>
    <section class="row justify-center q-mt-md">
    <div class="col-md-8">
        <q-list dense bordered padding class="rounded-borders q-ma-md" v-for="(item, index) in listaFiltrada" :key="index" :style="{'background-color': item.cor}">
        <div class="col-12 q-gutter-md">
          <q-item>
            <q-item-section>
              <div class="row">
                <div class="col-12">
                  <q-input rounded v-model="item.texto" color="secondary" @input="atualiza(item, 'texto')" label="Titulo da tarefa" />
                </div>
                <div class="col-12">
                  <q-input type="textarea" rounded v-model="item.descricao" color="secondary" @input="atualiza(item, 'descricao')" label="Descrição da tarefa" />
                </div>
                <div class="col-12 q-mt-md">
                  <div class="row col-12 justify-between">
                    <div class="col-md-9 col-sm-9 col-xs-7">
                      <q-btn icon="color_lens" round color="grey-9" flat small>
                        <q-popup-proxy>
                          <q-banner inline-actions rounded class="bg-grey-4 text-white">
                            <div class="q-pa-lg">
                                <q-option-group class="text-black" v-model="item.cor" :options="options" color="grey-9" inline dense @input="atualiza(item, 'cor')" />
                              </div>
                          </q-banner>
                        </q-popup-proxy>
                      </q-btn>
                    </div>
                    <div class="row col-md-3 col-sm-3 col-xs-5">
                      <div class="col-md-8 col-sm-10 col-xs-10">
                        <q-checkbox v-model="item.pronto" @input="atualiza(item, 'pronto')" :label="item.pronto ? 'Concluída' : 'Pendente'" color="grey-9"/>
                      </div>
                      <div class="col-md-4 col-sm-2 col-xs-2">
                        <q-btn round flat small icon="delete" v-model="item.key" color="grey-9" @click="apaga(item.key)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>
    </section>
  </section>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
export default {
  data () {
    return {
      title: 'Teste Vue.js',
      mostrar: true,
      lista: [],
      options: [
        {
          label: 'Padrão',
          value: '#e0e0e0'
        },
        {
          label: 'Branco',
          value: '#fff'
        },
        {
          label: 'Azul',
          value: '#64b5f6'
        },
        {
          label: 'Vermelho',
          value: '#e57373'
        },
        {
          label: 'Amarelo',
          value: '#fff176'
        },
        {
          label: 'Verde',
          value: '#aed581'
        }
      ]
    }
  },
  methods: {
    novo () {
      let key = firebase.database().ref().child('tasks').push().key
      firebase.database().ref('tasks/' + key).set({ texto: '', descricao: '', pronto: false, cor: '#e0e0e0', key })
    },
    show () {
      this.mostrar = !this.mostrar
    },
    apaga (i) {
      console.log(i)
      firebase.database().ref('tasks/' + i).remove() // aqui eu removi o this.lista[i]).key e coloquei o i que é a key para apagar o item exato mesmo mostrando apenas pendentes
    },
    atualiza (item, campo) {
      firebase.database().ref('tasks/' + item.key + '/' + campo).set(item[campo])
    },
    carrega (snapshot) {
      this.lista = []
      let valores = snapshot.val()
      for (let prop in valores) {
        this.lista.unshift({ // Aqui eu troquei de push para unshift, o push jogava o item no final e não no início, como era esperado
          key: prop,
          texto: valores[prop].texto,
          descricao: valores[prop].descricao,
          pronto: valores[prop].pronto,
          cor: valores[prop].cor
        })
      }
    }
  },
  computed: {
    listaFiltrada () {
      return this.mostrar ? this.lista : this.lista.filter(el => {
        return !el.pronto
      })
    }
  },
  mounted () {
    firebase.database().ref('tasks').once('value', snapshot => {
      this.carrega(snapshot)
    })
    firebase.database().ref('tasks').on('value', snapshot => {
      this.carrega(snapshot)
    })
  }
}
</script>

<style>
</style>
