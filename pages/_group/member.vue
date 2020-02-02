<template>
  <div>
    <div class="list col-lg-6" id="target">
      <h5 class="title">{{ this.$route.params.group }} のメンバー</h5>
      <p class="describe">グループのメンバーを登録してください</p>
      <ul v-if="this.members != ''">
        <li v-for="member in members" :key="member.id">
          <span @click="show(member.member.name)">{{ member.member.name }}</span>
          <button @click="remove(member.id)">削除</button>
        </li>
      </ul>
      <h6 v-else>まだメンバーはいません</h6>
    </div>
    <div class="form col-lg-5">
      <form @submit.prevent="add">
        <h5 class="title">メンバーを追加</h5>
        <br>
        <span>名前：</span>
        <input v-model="member.name">
        <br>
        <button class="button--green">追加</button>
      </form>
    </div>
    <transition name="modal">
      <ScheduleModal
        v-if="showAbout"
        attr="member"
        :name=showAbout
        @close="close"
      ></ScheduleModal>
    </transition>
  </div>
</template>

<script>
import ScheduleModal from '~/components/ScheduleModal'

export default {
  data: function() {
    return {
      member: {
        name: '',
        group: this.$route.params.group
      },
      showAbout: ''
    }
  },
  components: {
    ScheduleModal
  },
  created: function() {
    this.$store.dispatch('members/init')
  },
  methods: {
    add() {
      if ( this.member.name == '' ) {
        return
      }
      this.$store.dispatch('members/add', this.member)
      this.member.name = ''
      document.getElementById("target").scrollIntoView(true)
    },
    remove(id) {
      if (window.confirm('削除してよろしいですか？')) {
        this.$store.dispatch('members/remove', id)
      }
    },
    show(name) {
      this.showAbout = name
    },
    close() {
      this.showAbout = ''
    }
  },
  computed: {
    members() {
      return this.$store.getters['members/orderedMembers'].filter((members) => {
        return (members.member.group == this.$route.params.group)
      })
    }
  }
}
</script>
