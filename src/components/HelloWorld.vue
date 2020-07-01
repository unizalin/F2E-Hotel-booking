<template>
  <section class="header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="banner">
            <div class="room-title">
              <h1>HexHotel</h1>
            </div>
            <div class="nav-block">
              <div class="dropdown checkIn ">
                <div class="checkInMenu w-100 d-flex justify-content-between align-items-center border p-4">
                  <div class="dropTitle d-flex align-items-center">
                    <span class="material-icons">date_range</span>
                    <span class="ml-4 text-uppercase">CHECK-IN</span>
                  </div>
                  <span class="material-icons">arrow_drop_down</span>
                </div>
              </div>
              <div class="dropdown checkout ">
                <div class="checkoutMenu w-100 d-flex justify-content-between align-items-center border p-4">
                  <div class="dropTitle d-flex align-items-center">
                    <span class="material-icons">date_range</span>
                    <span class="ml-4 text-uppercase">check-out</span>
                  </div>
                  <span class="material-icons">arrow_drop_down</span>
                </div>
              </div>
              <div class="dropdown room" @click="isShowRoom=!isShowRoom">
                <div class="roomMenu w-100 d-flex justify-content-between align-items-center border p-4">
                  <div class="dropTitle d-flex align-items-center">
                  <span class="material-icons">hotel</span>
                  <span class="ml-4 text-uppercase">{{userOrder.room.title}}</span>
                </div>
                <span class="material-icons">arrow_drop_down</span>
              </div>
              <div class="roomContent" v-if="isShowRoom">
                <a class="dropdown-item p-4 border text-left" href="#" v-for="(item,idx) in roomList" :key="idx" @click="userOrder.room=item">{{item.title}}</a>
              </div>
              </div>
              <div class="dropdown w-100  border p-4 text-center bg-primary text-white text-uppercase" @click="reverse()" >REVERSE NOW</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="card-body">
          <div class="top  text-left">
            <div class="card-title   h1 font-weight-bold text-secondary ">Recommend</div>
            <div class="card-text">You may be interested in our popular rooms</div>
          </div>
          <div class="row">
            <div class="col-md-4" v-for="(item,idx) in recommendList" :key="idx" >
              <img :src="item.img"  class="card-img" alt="">
              <div class="card-text text-right">
                <div class="roonName font-weight-bold text-secondary">{{item.title}}</div>
                <div class="roomPrice">${{item.price}} NTD / night</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid text-right">
      <div class="text-info">
        <div class="card-title  h1 font-weight-bold text-dark">Reserve the best service</div>
        <div class="card-text text-dark">over 50,000 commendations from our guests</div>
      </div>
    </div>
    <div class="container">
      <div class="row my-5">
        <div class="col-md-4 text-left">
          <div class="card-title text-secondary h1">One person</div>
          <div class="card-text">Enjoy the one and only service</div>
        </div>
        <div class="col-md-4" v-for="(item,idx) in oneRoomList" :key="idx"> 
          <img :src="item.img"  class="card-img" alt="">
            <div class="card-text text-right mt-3">
              <div class="roonName text-secondary h2 font-weight-bold">{{item.title}}</div>
              <div class="roomPrice">${{item.price}} NTD / night</div>
            </div>
        </div>
      </div>

      <div class="row  my-5">
        <div class="col-md-4 text-left">
          <div class="card-title text-secondary h1">Two people</div>
          <div class="card-text">The perfect choice for both of you</div>
        </div>
        <div class="col-md-4" v-for="(item,idx) in twoRoomList" :key="idx"> 
          <img :src="item.img"  class="card-img" alt="">
            <div class="card-text text-right mt-3">
              <div class="roonName text-secondary h2 font-weight-bold ">{{item.title}}</div>
              <div class="roomPrice">${{item.price}} NTD / night</div>
            </div>
        </div>
      </div>

      <div class="row  my-5">
        <div class="col-md-4 text-left">
          <div class="card-title text-secondary h1">Family</div>
          <div class="card-text">Wanna a big room? there you are</div>
        </div>
        <div class="col-md-4" v-for="(item,idx) in familyList" :key="idx"> 
          <img :src="item.img"  class="card-img" alt="">
            <div class="card-text text-right mt-3">
              <div class="roonName text-secondary h2 font-weight-bold">{{item.title}}</div>
              <div class="roomPrice">${{item.price}} NTD / night</div>
            </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { mapGetters } from "vuex";
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data(){
      return{
        isShowRoom: false,
        roomChoice: 'ROOM',
        recommendList:[
          {
            img: 'https://images.unsplash.com/photo-1558976825-6b1b03a03719?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            title: 'twin room',
            price: '3,350'
          },
          {
            img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2539&q=80',
            title: 'Double Room',
            price: '2,460'
          }, 
          {
            img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80',
            title: 'Deluxe Single Room',
            price: '1,819'
          }
        ],
        oneRoomList:[
          {
            img: 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            title: 'Single Room',
            price: '1,819'
          },
          {
            img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80',
            title: 'Deluxe Single Room',
            price: '1,819'
          }
        ],
        twoRoomList:[
          {
            img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2539&q=80',
            title: 'Double Room',
            price: '1,819'
          },
          {
            img: 'https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2125&q=80',
            title: 'Deluxe Double Room',
            price: '1,819'
          }
        ],
        familyList:[
          {
            img: 'https://images.unsplash.com/photo-1558976825-6b1b03a03719?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            title: 'Twin Room',
            price: '1,819'
          },
          {
            img: 'https://images.unsplash.com/photo-1574643014728-053f16745e49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
            title: 'Deluxe Twin Room',
            price: '1,819'
          }
        ],      }
    },
    methods:{
      reverse(){
        console.log('reverse')
        let vm = this;
        if(!vm.userOrder.room){
          return 
        }
        vm.$router.push({path:'/about'})

      }
    },
    computed:{
      ...mapGetters(['roomList','userOrder'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header .room-title {
    width: 920px;
    height: 352px;
    background: url('https://images.unsplash.com/photo-1523594572281-3c9a566b6163?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80') top no-repeat;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 57px;
      height: 219px;
      background-color: #fff;
    }

    h1 {
      position: relative;
      font-size: 48px;
      font-style: italic;
      font-weight: 700;
      writing-mode: vertical-lr;
      color: #2d3643;
      margin: 0;
    }
  }

  .nav-block {
    width: 350px;
    position: absolute;
    top: 12%;
    right: 0;
    .dropdown{
      cursor: pointer;
    }
    .room{
      .roomContent{
        position: absolute;
        z-index: 3;
        background-color: #fff;
        width: 100%;
      }
    }
  }
  .container-fluid{
    background: url('https://images.unsplash.com/photo-1523594572281-3c9a566b6163?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80') bottom no-repeat;
    height: 352px;
    position: relative;
    .text-info{
      position: absolute;
      right: 4%;
      bottom: 4%;
    }
  } 
</style>