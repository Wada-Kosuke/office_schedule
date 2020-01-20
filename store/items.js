import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const itemsRef = db.collection('items')

export const state = () => ({
  items: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('items', itemsRef)
  }),
  add: firestoreAction((context, item) => {
    if(item.name.trim()) {
      itemsRef.add({
        item: item
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    itemsRef.doc(id).delete()
  })
}

export const getters = {
  orderedItems: state => {
    return _.sortBy(state.items, 'item.name')
  }
}
