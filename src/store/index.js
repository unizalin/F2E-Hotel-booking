import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomList:[
      {
        title: 'Single Room',
        img: 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
        price: '1,819',
        holidayPeice: ''
      },

      {
        title: 'Deluxe Single Room',
        img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80',
        price: '1,819',
        holidayPeice: ''
      },

      {
        title: 'Double Room',
        img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2539&q=80',
        price: '1,819',
        holidayPeice: ''
      },

      {
        title: 'Deluxe Double Room',
        img: 'https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2125&q=80',
        price: '1,819',
        holidayPeice: ''
      },

      {
        title: 'Twin Room',
        img: 'https://images.unsplash.com/photo-1558976825-6b1b03a03719?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
        price: '1,819',
        holidayPeice: ''
      },

      {
        title: 'Deluxe Twin Room',
        img: 'https://images.unsplash.com/photo-1574643014728-053f16745e49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
        price: '1,819',
        holidayPeice: ''
      }
    ],
    userOrder:{
      room: {
        title: '',
        img: '',
        price: ''
      },
      price: '',
      date: '',
    }
  },
  mutations: {
  },
  actions: {
    
  },
  getters:{
    roomList(state){
      return state.roomList
    },
    userOrder(state){
      return state.userOrder
    }
  },
  modules: {
  }
})
