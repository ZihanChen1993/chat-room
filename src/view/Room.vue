<template>
  <div class="wrapper">
    <div class="room-header">
      <mu-appbar style="width: 100%; textAlign:center" :title="roomTitle" color="amber500">
        <mu-button @click="back" icon slot="left">
          <mu-icon value="west"></mu-icon>
        </mu-button>
        <mu-button icon slot="right">
          <mu-icon value="menu"></mu-icon>
        </mu-button>
      </mu-appbar>
    </div>
    <div class="chat-container">
      <div
        class="message clearfix"
        v-for="item in messageList"
        :key="item.id"
        :class="item.username == userName ? 'self': 'other' "
      >
        <div class="messageTime">{{item.time|dateFormat}}</div>
        <div class="message-left">
          <mu-avatar>
            <img :src="item.src" alt />
          </mu-avatar>
        </div>
        <div class="message-right">
          <div class="nickName">
            <span class="userName">{{item.username}}</span>
          </div>
          <div class="message-content">
            <span>{{item.msg}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input type="textarea" class="input-text" v-model="currentMessage" @keydown="enterToSend" />
      <mu-button color="amber500" class="send-button" @click="sendMessage">
        发送
        <mu-icon right value="send"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>

<script>
import socket from '../socket'
import servicePath from '../config/apiUrl'


export default {
  data() {
    return {
      id: '',
      roomTitle: '',
      userName: '',
      inputValue: '',
      userType: 'self',
      currentMessage: '',
      messageList: []
    }
  },
  props: {
    name: String
  },

  mounted() {
    socket.on('res', (res) => {
      if (res.roomId == this.$store.state.roomId) {
        this.messageList.push(res);
      }
    })
    this.id = this.$route.params.id;
    this.userName = this.$store.state.userName;
    this.$store.commit('setShowFooter', false);
    this.getRoomName();
    this.scrollToBottom();
    this.getMessageList();
    this.$store.commit('setRoomId', this.$route.params.id)
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      const chatContainer = document.querySelector('.chat-container');
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },
    back() {
      this.$router.push({ path: '/' })
    },
    sendMessage() {
      const obj = {
        username: this.userName,
        src: this.$store.state.src,
        msg: this.currentMessage,
        roomId: this.$store.state.roomId,
      }
      socket.emit('chat', obj);
      this.currentMessage = '';
    },
    enterToSend(event) {
      if (event.keyCode === 13) {
        console.log('敲了回车');
        this.sendMessage();
      }
    },
    getMessageList() {
      this.axios({
        method: 'get',
        url: servicePath.getMessageListByRoomId,
        params: { id: this.id }
      }).then(res => {
        const data = res.data;
        if (data.success) {
          let messageList = data.result;
          this.messageList = messageList;
        } else {
          console.log('获取message失败');
        }
      })
    },
    getRoomName() {
      this.$store.state.roomList.forEach(room => {
        if (room.roomId === this.id) {
          this.roomTitle = room.title;
        }
      })
    }
  },
}
</script>

<style>
html {
  height: 100%;
}
#app {
  height: 100%;
}
.wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
}
.chat-container {
  flex: 1;
  width: 100%;
  overflow: scroll;
}
.room-header .chat-input {
  width: 100%;
  line-height: 40px;
  background-color: #d8d8d8;
  text-align: center;
}

.chat-input {
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  margin-bottom: 10px;
}
.input-text {
  flex: 1;
  margin-right: 5px;
}
.send-button {
  float: right;
}

.other {
  margin: 10px 0 0 5px;
}
.self {
  margin: 10px 5px 0 0;
}
.message-right {
  max-width:50%
}
.other .message-right .nickName {
  text-align: start;
}
.other > .message-left {
  float: left;
}
.other > .message-right {
  float: left;
  margin-left: 5px;
  text-align: center;
}
.self > .message-right .message-content {
  background-color: #ffee58;
}

.other > .message-right .message-content {
  background-color: white;
}
.self .message-right .nickName {
  text-align: end;
}

.self > .message-left {
  float: right;
}
.self > .message-right {
  float: right;
  margin-right: 5px;
  text-align: center;
}
.self > .messageTime {
  text-align: end;
  
}
.messageTime {
  color: rgb(128, 125, 125);
}
.clearfix::after {
  content: ".";
  height: 0;
  display: block;
  clear: both;
}

.userName {
  color: rgb(128, 125, 125);
}

.message-content {
  padding: 5px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #ddd;
}
</style>