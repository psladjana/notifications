<template>
  <v-menu offset-y left transition="slide-y-transition">
  
    <v-btn slot="activator">
      <v-icon dark>notifications</v-icon>
      <v-badge color="red" overlap right>
        <span slot="badge">0</span>
      </v-badge> 
    </v-btn>

    <v-list>
      <v-card>
        <v-card-title class="blue accent-2">
          Notifications
        </v-card-title>
        <v-list-tile
          v-for="(item, index) in items"
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
  export default {
    data () {
      return {
        items: [
          { title: 'Note 1' },
          { title: 'Note 2' },
          { title: 'Note 3' },
          { title: 'Note 4' }
        ]
      }
    }
  }
</script>

<style scoped>
.v-list {
  padding: 0;
}
</style>
