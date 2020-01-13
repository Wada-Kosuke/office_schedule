import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const groupsRef = db.collection('groups')

export const state = () => ({
  groups: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('groups', groupsRef)
  }),
  add: firestoreAction((context, name) => {
    if(name.trim()) {
      groupsRef.add({
        name: name
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    groupsRef.doc(id).delete()
  })
}

export const getters = {
  orderedGroups: state => {
    return _.sortBy(state.groups, 'name')
  }
}
