import * as types from './types'
import notificationService from '../../services/notification'

const state = {
  notifications: []
}

const getters = {
  notifications: store => store.notifications,
  unreadNotificationsCount: store => {
    return store.notifications.filter(value => value.type !== 'bonus' && !value.seen).length
  }
}

const actions = {
  getNotifications ({commit}) {
    notificationService.getNotifications(
      (notification) => { return commit(types.ADD_NOTIFICATION, notification) },
      (notification) => { return commit(types.UPDATE_NOTIFICATION, notification) },
      (notification) => { return commit(types.DELETE_NOTIFICATION, notification) }
    )
  },
  createNotification ({commit}, notification) {
    return notificationService.createNotification(notification)
  },
  updateNotification ({commit}, notification) {
    console.log('updateNotification', notification)
    return notificationService.updateNotification(notification)
  },
  removeNotification ({commit}, notificationId) {
    console.log('removeNotification', notificationId)
    return notificationService.removeNotification(notificationId)
  },
  markAllRead({commit}) {
    state.notifications.forEach(notification => notification.seen = true)
    return commit(types.SET_NOTIFICATIONS, state.notifications)
  } 
}

const mutations = {
  [types.ADD_NOTIFICATION] (state, notification) {
    notification.seen = false
    state.notifications.unshift(notification)
  },
  [types.UPDATE_NOTIFICATION] (state, notification) {
    const i = state.notifications.findIndex(element => element.id === notification.id)
    state.notifications.splice(i, 1, notification)
  },
  [types.DELETE_NOTIFICATION] (state, notification) {
    state.notifications = state.notifications.filter(value => value.id !== notification.id)
  },
  [types.SET_NOTIFICATIONS] (state, notifications) {
    state.notifications = notifications
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
