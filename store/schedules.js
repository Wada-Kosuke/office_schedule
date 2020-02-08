import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const schedulesRef = db.collection('schedules')

export const state = () => ({
  schedules: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('schedules', schedulesRef)
  }),
  add: firestoreAction((context, event) => {
    if(event.name.trim()) {
      schedulesRef.add({
        event: event
      })
    }
  }),
  edit: firestoreAction((context, arg) => {
    schedulesRef.doc(arg.schedule.id).update({
      event: arg.editedEvent
      }
    )
  }),
  remove: firestoreAction((context, id) => {
    schedulesRef.doc(id).delete()
  })
}

export const getters = {
  orderedSchedules: state => {
    return _.sortBy(state.schedules, 'event.startTime')
  }
}
