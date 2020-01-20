import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const roomsRef = db.collection('rooms')

export const state = () => ({
  rooms: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('rooms', roomsRef)
  }),
  add: firestoreAction((context, room) => {
    if(room.name.trim()) {
      roomsRef.add({
        room: room
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    roomsRef.doc(id).delete()
  })
}

export const getters = {
  orderedRooms: state => {
    return _.sortBy(state.rooms, 'room.name')
  }
}
