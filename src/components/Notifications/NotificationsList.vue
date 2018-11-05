<template>
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
          <NotificationItem :item="item" />
          
        </v-list-tile>
      </v-card>
    </v-list>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import NotificationItem from './NotificationItem.vue'
  export default {
    props: ['notifications'],
    components: {
      NotificationItem
    }
  }
</script>
<style lang="scss">
.v-list {
  padding: 0;
  &__tile {
    border-bottom: 1px solid rgba(0,0,0,0.12);
    margin: 10px 10px 0;
    padding: 0
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
