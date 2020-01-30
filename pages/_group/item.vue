<template>
  <div>
    <div class="list col-lg-6" id="target">
      <h5 class="title">{{ this.$route.params.group }} の使用できるアイテム</h5>
      <p class="describe">パソコンや社用車など、共用のアイテムを登録してください</p>
      <ul v-if="this.items != ''">
        <li v-for="item in items" :key="item.id">
          <span @click="show(item.item.name)">{{ item.item.name }}</span>
          <button @click="remove(item.id)">削除</button>
        </li>
      </ul>
      <h6 v-else>まだ登録されているアイテムはありません</h6>
    </div>
    <div class="form col-lg-5">
      <form @submit.prevent="add">
        <h5 class="title">アイテムを追加</h5>
        <br>
        <span>名前：</span>
        <input v-model="item.name">
        <br>
        <button class="button--green">追加</button>
      </form>
    </div>
    <transition name="modal">
      <ScheduleModal
        v-if="showAbout"
        attr="item"
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
      item: {
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
    this.$store.dispatch('items/init')
  },
  methods: {
    add() {
      if ( this.item.name == '' ) {
        return
      }
      this.$store.dispatch('items/add', this.item)
      this.item.name = ''
      document.getElementById("target").scrollIntoView(true)
    },
    remove(id) {
      this.$store.dispatch('items/remove', id)
    },
    show(name) {
      this.showAbout = name
    },
    close() {
      this.showAbout = ''
    }
  },
  computed: {
    items() {
      return this.$store.getters['items/orderedItems'].filter((items) => {
        return (items.item.group === this.$route.params.group)
      })
    }
  }
}
</script>
