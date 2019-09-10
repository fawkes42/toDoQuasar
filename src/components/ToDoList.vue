<template>
	<div>
	<div class="button">
		<input type="button" value="+" @click="novo">
		<input type="button" :value="mostrar ? 'Mostrar somente pendentes' : 'Mostrar todos'" @click="show">
			<ul>
				<li v-for="(item, index) in listaFiltrada" :key="index">
						<input type="text" v-model="item.texto" @input="atualiza(item, 'texto')" placeholder="Titulo da tarefa">
						<input type="checkbox" v-model="item.pronto" @change="atualiza(item, 'pronto')">
						<input type="button" value="-" @click="apaga(index)">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import * as firebase from 'firebase/app'
	import 'firebase/database'
	export default {
	data () {
		return {
			mostrar: true,
			lista: []
		}
	},
	methods: {
		novo () {
			let key = firebase.database().ref().child('tasks').push().key
			firebase.database().ref('tasks/' + key).set({texto: '', pronto: false, key})
		},
		show () {
			this.mostrar = !this.mostrar
		},
		apaga (i) {
			firebase.database().ref('tasks/' + this.lista[i].key).remove()
		},
		atualiza (item, campo) {
			firebase.database().ref('tasks/' + item.key + '/' + campo).set(item[campo])
		},
		carrega (snapshot) {
			this.lista = []
			let valores = snapshot.val()
			for (let prop in valores) {
				this.lista.push({
					key: prop,
					texto: valores[prop].texto,
					pronto: valores[prop].pronto
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
		})}
	}
</script>

<style>
</style>
