<template>
  <div>
    <div class="home-header">
      <mu-appbar style="width: 100%; textAlign:center" title="1988聊天室" color="amber500"></mu-appbar>
    </div>
    <div class="chatroom-list">
      <mu-list >
        <mu-sub-header >聊天室列表</mu-sub-header>
        <mu-list-item v-for="room in roomList" :key="room.roomId" button :ripple="false" :to="'/room/' + room.roomId" >
          <mu-list-item-action @click='enterRoom'>
            <mu-avatar :size="50">
              <img :src="room.img" />
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>{{room.title}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
      <mu-list>
        <mu-sub-header>常用聊天室(暂未开放)</mu-sub-header>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar :size="50">
              <img src="/img/panda.jpeg" />
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>请回答1988</mu-list-item-title>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar :size="50">
              <img src="../../public/img/xiaoxin.jpeg" />
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>编辑部的故事</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentRoom: '',
      roomName: '',
      roomList: '',
    }
  },
  mounted() {
    this.currentRoom = this.$store.state.roomId;
    this.roomName = this.$store.state.roomName;
    this.$store.commit('setShowFooter', true);
    this.roomList = this.$store.state.roomList;
    
  },
  methods: {
    enterRoom() {
      console.log('entere');
    } 
  },
}
</script>

<style>

div.mu-item {
  height: 65px;
  margin: 0 10px;
  border-top: 1px solid rgba(233, 230, 230, 0.8);
}

.mu-list li:last-child {
  border-bottom: 1px solid rgba(233, 230, 230, 0.8);
}

div.mu-item-title {
  padding-left: 10px;
  color: #ff6f00;
}


</style>