<template>
  <v-app>
    <div class="text-xs-right">
      <notifications />
    </div>
    <v-content>
      <v-container fluid>
        <v-layout column align-center>

<template>
  <div>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" light class="ml-0">New Notififcation</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md6>
                  <v-select :items="types" v-model="editedItem.type" label="Type"></v-select>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-text-field type="number" v-model="editedItem.expires" label="Expires"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 v-if="editedItem.type === 'bonus'">
                  <v-text-field v-model="editedItem.requirement" label="Requirement"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 v-if="editedItem.type === 'text'">
                  <v-text-field v-model="editedItem.text" label="Text"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 v-if="editedItem.type === 'promotion'">
                  <v-text-field v-model="editedItem.image" label="Image"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 v-if="editedItem.type === 'promotion'">
                  <v-text-field v-model="editedItem.link" label="Link"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
 
    <v-data-table
      :items="notifications"
      hide-headers
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.text }}</td>
        <td class="text-xs-right">{{ props.item.type }}</td>
        <td class="text-xs-right">{{ props.item.link }}</td>

        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
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
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
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
    data: () => ({
      dialog: false,
      fixed: true,
      items: [],
      types: ['text', 'bonus', 'promotion'],
      editedIndex: -1,
      editedItem: {
        text: '',
        title: '',
        type: '',
        expires: 0,
        requirement: '',
        link: '',
        image: ''
      },
      defaultItem: {
        text: '',
        title: '',
        type: '',
        expires: 0,
        requirement: '',
        link: '',
        image: ''
      }
    }),
    computed: {
      ...mapGetters(['notifications']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Notification' : 'Edit Notification'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      ...mapActions(['createNotification', 'updateNotification', 'removeNotification']),
      initialize () {
        this.items = this.notifications
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          switch (this.editedItem.type) {
            case 'text': {
              let textItem = {
                id: this.editedItem.id,
                text: this.editedItem.text,
                title: this.editedItem.title,
                type: this.editedItem.type,
                expires: parseInt(this.editedItem.expires)
              }
              this.updateNotification(textItem)
              break
            }
            case 'bonus': {
              let bonusItem = {
                id: this.editedItem.id,
                requirement: this.editedItem.requirement,
                title: this.editedItem.title,
                type: this.editedItem.type,
                expires: parseInt(this.editedItem.expires)
              }
              this.updateNotification(bonusItem)
              break
            }
            case 'promotion': {
              let promotionItem = {
                id: this.editedItem.id,
                image: this.editedItem.image,
                title: this.editedItem.title,
                type: this.editedItem.type,
                link: this.editedItem.link,
                expires: parseInt(this.editedItem.expires)
              }
              this.updateNotification(promotionItem)
              break
            }
          }
        } else {
          switch (this.editedItem.type) {
            case 'text': {
              let textItem = {
                text: this.editedItem.text,
                title: this.editedItem.title,
                type: this.editedItem.type,
                expires: parseInt(this.editedItem.expires)
              }
              this.createNotification(textItem)
              break
            }
            case 'bonus': {
              let bonusItem = {
                requirement: this.editedItem.requirement,
                title: this.editedItem.title,
                type: this.editedItem.type,
                expires: parseInt(this.editedItem.expires)
              }
              this.createNotification(bonusItem)
              break
            }
            case 'promotion': {
              let promotionItem = {
                image: this.editedItem.image,
                title: this.editedItem.title,
                type: this.editedItem.type,
                link: this.editedItem.link,
                expires: parseInt(this.editedItem.expires)
              }
              this.createNotification(promotionItem)
              break
            }
          }
        }
        this.close()
      }
    },
    components: {
      Notifications
    }
  }
</script>
