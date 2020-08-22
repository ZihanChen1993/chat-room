<template>
  <div class="wrapper">
    <div class="user-head">
      <div class="avatar">
        <mu-avatar size="90px">
          <img :src="userImg" />
        </mu-avatar>
      </div>
      <div class="user-name">
        <span>{{this.userName}}</span>
      </div>
      <div class="user-background" :style="avatarBackground"></div>
    </div>
    <div class="info-content">
      <ul>
        <li class="list-item">
          <span @click="loadAvatar">修改头像</span>
        </li>
        <li class="list-item">
          <span>赞助一下</span>
        </li>
        <li class="list-item">
          <span>github地址</span>
        </li>
        <li class="list-item">
          <span>清除缓存</span>
        </li>
        <li class="list-item">
          <span>检查通知</span>
        </li>
      </ul>
      <mu-button large full-width color="red" @click="logout">退出登录</mu-button>
    </div>
  </div>
</template>

<script>
import servicePath from '../config/apiUrl'

export default {
  data() {
    return {
      userName: '',
      userImg: '',
    }
  },
  computed: {
    avatarBackground() {
      return `background: url("${this.userImg}") no-repeat;`
    }
  },
  methods: {
    logout() {
      this.$store.commit('setToken', '');
      this.$store.commit('setUserName', '');
      this.$store.commit('setSrc', '');
      this.$store.commit('setShowFooter', false)
      this.$router.push('/login');
      
    },
    loadAvatar() {
      const num = Math.floor(Math.random() * 20 + 1);
      const newSrc = '/img/avatar' + num + '.jpeg';
      this.axios({
        method: 'post',
        url: servicePath.updateAvatar,
        data: {
          src: newSrc,
          userName: this.userName
        }
      }).then(res => {
        res = res.data;
        console.log(res);
        // 修改成功
        if (res.success) {
          this.$store.commit('setSrc', newSrc);
          this.userImg = this.$store.state.src;
        } else {
          alert('修改失败');
        }
      }).catch(err => {
        alert('修改失败：' + err.message);
      })
    }
  },
  components: {
  },
  mounted() {
    this.userName = this.$store.state.userName;
    this.userImg = this.$store.state.src;
    this.$store.commit('setShowFooter', true);
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
.user-head {
  height: 40%;
  position: relative;
}
.user-head .avatar .mu-avatar {
  position: absolute;
  left: 50%;
  top: 70px;
  transform: translateX(-50%);
}
.user-head .user-name {
  position: absolute;
  left: 50%;
  top: 170px;
  transform: translateX(-50%);
  font-size: 20px;
  color: aliceblue;
}
.user-head .user-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-size:cover !important;
  filter: blur(15px);
  
  background-size: cover;
  z-index: -1;
}
.info-content {
  margin: 0 20px;
}
.info-content ul {
  margin: 20px 0 0 0;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: rgb(128, 125, 125);
}
.list-item {
  flex: 1;
  width: 100%;
  text-align: center;
}

.mu-raised-button {
  height: 50px !important;
}
</style>