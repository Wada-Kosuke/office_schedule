<template>
  <div>
    <h1>{{ message }}</h1>
    <p>id: {{ this.$route.params.id }}</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return{
      message: '/calendar/_id.vueを表示中'
    }
  }
}
</script>
