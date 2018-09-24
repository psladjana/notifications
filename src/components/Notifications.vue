<template>
  <v-menu offset-y left transition="slide-y-transition">
    <v-icon color="blue accent-2" large>arrow_drop_up</v-icon>
    <v-btn slot="activator" class="nootificationBtn" color="white" @click="deleteNotification">
      <v-icon color="grey darken-1">notifications</v-icon>
      <v-badge color="red">
        <span slot="badge">{{ unreadNotificationsCount }}</span>
      </v-badge> 
    </v-btn>

    <v-list>
      <v-card>
        <v-card-title class="blue accent-2">
          <h3>Notifications</h3>
        </v-card-title>
        <v-list-tile
          avatar
          ripple
          v-for="(item, index) in notifications"
          :key="index"
          @click=""
        >
        <!-- Rendering of Promotion item -->
        <template v-if="item.type === 'promotion'">
          <v-list-tile-avatar>
            <img v-bind:src="item.image" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </template>

        <!-- Rendering of Bonus item -->
        <template v-if="item.type === 'bonus'">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.requirement }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </template>

        <!-- Rendering of Text item -->
        <template v-if="item.type === 'text'">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.text }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </template>

        <!-- Rendering of "new" button -->
          <v-btn color="success" right top small v-if="!item.seen">New</v-btn> 
          </v-list-tile>
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
      small: true,
      top: true,
      right: true
      }
    },
    created () {
      this.getNotifications()
    },
    methods: {
      ...mapActions(['getNotifications', 'createNotification', 'updateNotification', 'removeNotification']),
      deleteNotification () {
        this.notifications.forEach(notification => {
          if(notification.expires) {
            let expire = notification.expires * 1000
            setTimeout(() => {
              this.removeNotification(notification.id)
            }, expire)
          }
        })
      }
    },
    computed: {
      ...mapGetters(['notifications', 'unreadNotificationsCount'])
    }
  }
</script>
<style lang="scss">
.nootificationBtn {
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
  .v-icon {
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
.v-list {
  padding: 0;
}
</style>
