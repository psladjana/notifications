import * as types from './types'
import notificationService from '../../services/notification'

const state = {
  notifications: null
}

const getters = {
  notifications: store => store.notifications,
  unreadNotificationsCount: store => {
    return store.notifications.filter(value => value.type !== 'bonus' && !value.seen).length
  }
}

const actions = {
  getNotifications ({commit}) {
    notificationService.getNotifications()
      .then((notifications) => {
        console.log(notifications)
        return commit(types.SET_NOTIFICATINS, notifications)
      })
  },
  createDriver ({commit, rootState}, driver) {
    return notificationService.createNotification()
  }
}

const mutations = {
  [types.SET_NOTIFICATINS] (state, notifications) {
    state.notifications = notifications
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
