<template>
  <v-menu offset-y left transition="slide-y-transition">
    <v-icon color="blue accent-2" large class="arrow_icon">arrow_drop_up</v-icon>
    <v-btn slot="activator" class="nootification_btn" color="white" @click="deleteNotification">
      <v-icon color="grey darken-1">notifications</v-icon>
      <v-badge color="red">
        <span slot="badge">{{ unreadNotificationsCount }}</span>
      </v-badge> 
    </v-btn>
    <NotificationsList :notifications="notifications" />
  </v-menu>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import NotificationsList from './NotificationsList.vue'
  export default {
    props: ['notifications'],
    data () {
      return {
        small: true,
        top: true,
        right: true,
        menuOpen: false
      }
    },
    methods: {
      ...mapActions([
        'markAllRead',
        'removeNotification'
      ]),
      /** This will remove notification when expire. */
      deleteNotification () {
        this.notifications.forEach(notification => {
          if(notification.expires && notification.expires !== 0) {
            let expire = notification.expires * 1000
            setTimeout(() => {
              this.removeNotification(notification.id)
            }, expire)
          }
        })
        /** This will set seen property to notifications. */
        if (this.menuOpen) {
          this.markAllRead()
        }
        this.menuOpen = !this.menuOpen
      }
    },
    computed: {
      ...mapGetters(['unreadNotificationsCount'])
    },
    components: {
      NotificationsList
    }
  }
</script>
<style lang="scss">
.nootification_btn {
  min-width: 30px;
  margin: 20px;
  padding: 0 7px;
  .v-badge__badge {
    top:-30px;
  }
}
.v-menu__content {
  contain: initial;
  overflow-y: visible;
  overflow-x: visible;
  margin-top: 20px;
  .arrow_icon {
      position: absolute;
      top: -21px;
      overflow: visible;
      right: 5px;
    }
  .v-card__title {
    padding: 7px 15px;
    h3 {
      font-size: 1em;
      text-transform: uppercase;
      color: #fff;
      font-weight: 100;
    }
  }
}
</style>
