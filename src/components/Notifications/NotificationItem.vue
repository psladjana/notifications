<template transition="slide-y-transition">
  <div>
    <v-list-tile-avatar>
      <img v-if="item.image" v-bind:src="item.image" />
      <v-icon v-else class="blue accent-2 white--text">notifications</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      <v-list-tile-sub-title v-if="item.type === 'bonus'">{{ item.requirement }}</v-list-tile-sub-title>
      <v-list-tile-sub-title v-if="item.type === 'text'">{{ item.text }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <!-- Rendering of "new" button -->
    <v-chip color="light-green" text-color="white" v-if="!item.seen">New</v-chip>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    props: ['item']
  }
</script>
