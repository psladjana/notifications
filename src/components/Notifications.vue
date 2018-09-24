<template>
  <v-menu offset-y left transition="slide-y-transition">
    <v-icon color="blue accent-2" large class="arrow_icon">arrow_drop_up</v-icon>
    <v-btn slot="activator" class="nootification_btn" color="white" @click="deleteNotification">
      <v-icon color="grey darken-1">notifications</v-icon>
      <v-badge color="red">
        <span slot="badge">{{ unreadNotificationsCount }}</span>
      </v-badge> 
    </v-btn>

    <v-list two-line>
      <v-card>
        <v-card-title class="blue accent-2">
          <h3>Notifications</h3>
        </v-card-title>
        
        <v-list-tile
          avatar
          ripple
          v-for="(item, index) in notifications"
          :key="index"
        >
        <!-- Rendering of Promotion item -->
        <template v-if="item.type === 'promotion'" transition="slide-y-transition">
          <v-list-tile-avatar>
            <img v-bind:src="item.image" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>

        </template>

        <!-- Rendering of Bonus item -->

        <template v-if="item.type === 'bonus'" transition="slide-y-transition">
        <v-list-tile-avatar>
          <v-icon class="blue accent-2 white--text">notifications</v-icon>
        </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.requirement }}</v-list-tile-sub-title>
          </v-list-tile-content>
 
        </template>

        <!-- Rendering of Text item -->
   
        <template v-if="item.type === 'text'" transition="slide-y-transition">
        <v-list-tile-avatar>
          <v-icon class="blue accent-2 white--text">notifications</v-icon>
        </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.text }}</v-list-tile-sub-title>
          </v-list-tile-content>
          
        </template>

        <!-- Rendering of "new" button -->
          <v-chip color="light-green" text-color="white" v-if="!item.seen">New</v-chip>
          
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
.v-list {
  padding: 0;
  &__tile {
    border-bottom: 1px solid rgba(0,0,0,0.12);
    margin: 10px 10px 0;
    padding-left: 0
  }
  .v-chip {
    border-radius: 7px;
    margin: 0;
    position: absolute;
    right: 0px;
    top: 0;
    &__content {
      font-size: 11px;
      text-transform: uppercase;
      height: auto;
      padding: 2px 10px;
      line-height: 1
    }
  }
}
</style>
