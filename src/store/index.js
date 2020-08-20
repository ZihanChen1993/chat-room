import Vue from 'vue'
import Vuex from 'vuex'
// import servicePath from '../config/apiUrl'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName: window.sessionStorage.getItem('userName'),
    src: window.sessionStorage.getItem('img'),
    token: window.sessionStorage.getItem('token'),
    roomId:'01',
    roomName:'请回答1988',
    showFooter: false,
    roomList:[
      {
        roomId: '01',
        img:'/img/panda.jpeg',
        title:'请回答1998',
      },
      {
        roomId: '02',
        img:'/img/xiaoxin.jpeg',
        title:'编辑部的故事',
      },
      {
        roomId: '03',
        img:'/img/wei.jpg',
        title:'PEACE & LOVE',
      },
    ]
  },
  mutations: {
    setUserName (state, newName) {
      state.userName = newName;
      window.sessionStorage.setItem('userName', newName);
    },
    setSrc(state, val) {
      state.src = val;
      window.sessionStorage.setItem('img', val);
    },
    setToken(state, val) {
      state.token = val;
      window.sessionStorage.setItem('token', val);
    },
    setShowFooter(state, val) {
      state.showFooter = val
    },
    setRoomId(state,val) {
      state.roomId = val;
    },
    setRoomName(state, val) {
      state.roomName = val;
    }

  },
  getters: {
    roomId: state => {
      return state.roomId;
    }
  }
})

export default store