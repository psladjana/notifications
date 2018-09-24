<template>
  <v-menu offset-y left transition="slide-y-transition">

    <v-btn slot="activator">
      <v-icon dark>notifications</v-icon>
      <v-badge color="red" overlap right>
        <span slot="badge">{{ unreadNotificationsCount }}</span>
      </v-badge> 
    </v-btn>

    <v-list>
      <v-card>
        <v-card-title class="blue accent-2">
          Notifications
        </v-card-title>
        <v-list-tile
          v-for="(item, index) in notifications"
          :key="index"
          @click=""
        >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile>
        
      </v-card>
    </v-list>

  </v-menu>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
      }
    },
    created () {
      this.getNotifications()
    },
    methods: {
      ...mapActions(['getNotifications'])
    },
    computed: {
      ...mapGetters(['notifications', 'unreadNotificationsCount'])
    }
  }
</script>

<style scoped>
.v-list {
  padding: 0;
}
</style>
