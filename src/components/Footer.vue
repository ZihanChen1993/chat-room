<template>
  <div class="footer">
    <mu-container>
      <mu-bottom-nav color="amber500">
        <mu-bottom-nav-item title="聊天室" icon="restore"  value="home" to="/"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="当前聊天" icon="favorite" value="room" :to="'/room/' + currentRoom"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="我的信息" icon="location_on" value="info" to="/info"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>

<script>
export default {
  computed: {
    currentRoom() {
      return this.$store.getters.roomId;
    }
  }
}
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
}
</style>