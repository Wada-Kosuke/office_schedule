import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const membersRef = db.collection('members')

export const state = () => ({
  members: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('members', membersRef)
  }),
  add: firestoreAction((context, member) => {
    if(member.name.trim()) {
      membersRef.add({
        member: member
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    membersRef.doc(id).delete()
  })
}

export const getters = {
  orderedMembers: state => {
    return _.sortBy(state.members, 'member.name')
  }
}
