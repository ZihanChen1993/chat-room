<template>
  <div class="wrapper">
    <div class="login-header">
      <mu-appbar style="width: 100%; textAlign:center" title="登录" color="amber500"></mu-appbar>
    </div>
    <mu-container>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="用户名" prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="amber500" @click="login">登录</mu-button>
          <mu-button color="amber500" @click="register">注册</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
import servicePath from '../config/apiUrl'
import md5 from 'js-md5';

export default {
  data() {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名' },
        { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10' }
      ],
      validateForm: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          const pass = md5(this.validateForm.password);
          console.log(pass);
          this.axios({
            method: 'post', url: servicePath.checkLogin, data: {
              username: this.validateForm.username,
              password: pass
            }
          }).then((res) => {
            res = res.data;
            // 登录成功
            if (res.success) {
              console.log(res);
              this.$store.commit('setUserName', res.username);
              this.$store.commit('setSrc', res.img);
              this.$store.commit('setToken', res.openId)
              console.log(window.sessionStorage.getItem('token'));
              this.$router.push('/');
            } else {
              alert('登录失败');
              this.validateForm.username = '';
              this.validateForm.password = '';
            }
          })
        }
      });
    },
    register() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.axios({
            method: 'post', url: servicePath.register, data: {
              username: this.validateForm.username,
              password: md5(this.validateForm.password)
            }
          }).then((res) => {
            res = res.data;
            // 注册并且登录成功
            if (res.success) {
              console.log(res);
              alert('注册成功');
              this.$store.commit('setUserName', res.username);
              this.$store.commit('setSrc', res.img);
              this.$store.commit('setToken', res.openId)
              console.log(window.sessionStorage.getItem('token'));
              this.$router.push('/');
            } else {
              alert('注册失败,请修改用户名');
              this.validateForm.username = '';
              this.validateForm.password = '';

            }
          })
        } else {
          alert('请填写正确的用户名和密码')
        }
      });
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.container {
  margin-top: 100px;
  width: 90%;
}
.mu-form .mu-demo-form {
  width: 100%;
  max-width: 460px;
}
</style>