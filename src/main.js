import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as firebase from 'firebase'

Vue.use(Vuetify)
Vue.use(Vuex)

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  created () {
  	firebase.initializeApp({
	  	apiKey: "AIzaSyAJLhyQrmCNMoYwFpsWj-XhrDDGRrvAN3Y",
	    authDomain: "notifications-dopamine.firebaseapp.com",
	    databaseURL: "https://notifications-dopamine.firebaseio.com",
	    projectId: "notifications-dopamine",
	    storageBucket: "notifications-dopamine.appspot.com",
	    messagingSenderId: "526331891392"
  	})

    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
  }
})
