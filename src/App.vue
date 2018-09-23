<template>
  <v-app>
    <div class="text-xs-right">
      <notifications />
    </div>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
         
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Notifications from './components/Notifications.vue'
  export default {
    data () {
      return {
      fixed: true
      }
    },
    components: {
      Notifications
    }
  }
</script>
