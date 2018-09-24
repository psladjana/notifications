<template>
  <v-app>
    <div class="text-xs-right">
      <notifications />
    </div>
    <v-content>
      <v-container fluid>
        <v-layout column align-center>
          <v-data-table
            :items="notifications"
            hide-actions
            class="elevation-1">
            <template slot="items" slot-scope="props">
              <td  class="text-xs-left">{{ props.item.id }}</td>
              <td  class="text-xs-left">{{ props.item.title }}</td>
              <td  class="text-xs-left">{{ props.item.text }}</td>
              <td class="justify-center layout px-0">
                <v-icon
                  small
                  class="mr-2"
                  @click="updateNotification(props.item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="removeNotification(props.item.id)"
                >
                  delete
                </v-icon>
              </td>
            </template>
          </v-data-table>
          <v-btn @click="createNotification(JSON.parse(notification))">Create notification</v-btn>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Notifications from './components/Notifications.vue'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        fixed: true
      }
    },
    methods: {
      ...mapActions(['createNotification', 'updateNotification', 'removeNotification'])
    },
    computed: {
      ...mapGetters(['notifications'])
    },
    components: {
      Notifications
    }
  }
</script>
