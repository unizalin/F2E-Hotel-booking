<template>
  <div class="monthCalendar xc-border xc-round-s border-primary">
    <div class="close xc-round-s xc-bg-gray3" @click="closeCalendar()"></div>
    <div class="card-body">
      <div class="calendarNav d-flex justify-content-between align-items-center">
        <div class="preMonth d-flex" @click="adjustMonth(-1)">
          <div class="preTri"></div>
          <span class="h6 mb-0 ml-2 text-primary">{{calendar.month==0 ? 1:calendar.month}} 月</span>
        </div>
        <div class="nowMonth py-2">
          <span class="xc-text-md-h3 h5 xc-text-bold">{{calendar.year}} 年 {{calendar.month +1}} 月</span>
        </div>
        <div class="nextMonth d-flex" @click="adjustMonth(1)">
          <span class="h6 mb-0 mr-2 text-primary">{{calendar.month >10?1: calendar.month+2}} 月</span>
          <div class="nextTri"></div>
        </div>
      </div>
      <div class="row">
        <div class="calendar col">
          <div class="weekDay">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div class="week" v-for="i in 6" :key="i">
            <div class="day" v-for="(j,idx) in 7" :key="idx" :class="{pastDay:calendarMonth[(i-1)*7+j-1].month === today.month && calendarMonth[(i-1)*7+j-1].date < today.date || calendar.month < today.month || calendar.year < today.year}">
              <div class="date" @click.prevent="selectDate($event,calendarMonth[(i-1)*7+j-1])">
                <div class="datePick" :class="{ today:calendarMonth[(i-1)*7+j-1].year === today.year && calendarMonth[(i-1)*7+j-1].month === today.month && calendarMonth[(i-1)*7+j-1].date === today.date ,other:calendarMonth[(i-1)*7+j-1].month !== calendar.month ,pastDay:calendarMonth[(i-1)*7+j-1].month === today.month && calendarMonth[(i-1)*7+j-1].date < today.date || calendar.month < today.month || calendar.year < today.year ,weekend:j==7||j==1 ,selected: visibility==`${calendarMonth[(i-1)*7+j-1].year}${calendarMonth[(i-1)*7+j-1].month}${calendarMonth[(i-1)*7+j-1].date}` }"   @click="visibility = `${calendarMonth[(i-1)*7+j-1].year}${calendarMonth[(i-1)*7+j-1].month}${calendarMonth[(i-1)*7+j-1].date}`">
                  <div class="solar">{{calendarMonth[(i-1)*7+j-1].date}}{{calendarMonth[(i-1)*7+j-1].selected}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="calendar col">
          <div class="weekDay">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div class="week" v-for="i in 6" :key="i">
            <div class="day" v-for="(j,idx) in 7" :key="idx" :class="today.month < nextCalendarMonth[(i-1)*7+j-1].month?'':'pastDay'">
              <div class="date" @click.prevent="selectDate($event,nextCalendarMonth[(i-1)*7+j-1])">
                <div class="datePick" :class="nextCalendarMonth[(i-1)*7+j-1].month>nextCalendarFirstDay.month?'other':''" @click="visibility = `${nextCalendarMonth[(i-1)*7+j-1].year}${nextCalendarMonth[(i-1)*7+j-1].month}${nextCalendarMonth[(i-1)*7+j-1].date}`">
                  <div class="solar">{{nextCalendarMonth[(i-1)*7+j-1].date}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      visibility: '',
      chiday:['日', '一', '二', '三', '四', '五', '六'],
      remainDay:'14',
      today:{
        year:'',
        month:'',
        date: '',
        day:''
      },
      calendar:{
        year:'',
        month:'',
        date: '',
        day:''
      },
      dateArr:[],
      dateRange:[]
    };
  },
  mounted(){
    setTimeout(() => {
      this.setToday()
    }, 500);
  },
  methods:{
    setToday(){
      this.visibility=''
      const date = new Date()
      this.today.year = this.calendar.year = date.getFullYear()
      this.today.month = this.calendar.month = date.getMonth() // 0~11
      this.today.date = this.calendar.date = date.getDate()
      this.today.day = this.calendar.day = date.getDay()
      this.closeCalendar()
    },
    adjustYear(fix){
      this.calendar.year += fix
    },
    adjustMonth(fix){
      // this.calendar.month += fix 範圍
      let month = this.calendar.month + fix
      if(month > 11){
        this.adjustYear(1)
        this.calendar.month = 0
      }else if(month < 0){
        this.adjustYear(-1)
        this.calendar.month = 11
      }else{
        this.calendar.month = month
      }
    },
    selectDate(e,date){
      let vm = this
      if(vm.dateArr.length<2){
        
        vm.dateArr.push({
          year: date.year,
          month: date.month,
          date: date.date
        })
      }else{
        vm.dateArr.shift()
        vm.dateArr.push({
          year: date.year,
          month: date.month,
          date: date.date
        })
        // sortDateRange(vm.dateArr[0],vm.dateArr[1])
      }
        vm.getAll()
      // console.log(`你選到的日期為 ${date.year}${date.month+1}月 ${date.date}日 星期 ${date.day}`)
    },
    getAll() {
        console.log('s')
        let vm = this;
        console.log(vm.dateArr[0].year)
        vm.dateRange = []
        let db = new Date()
        db.setUTCFullYear(vm.dateArr[0].year,vm.dateArr[0].month,vm.dateArr[0].date)
        var de = new Date()
        de.setUTCFullYear(vm.dateArr[1].year,vm.dateArr[1].month,vm.dateArr[1].date)
        var unixDb = db.getTime() - 24*60*60*1000
        var unixDe = de.getTime() - 24*60*60*1000
        console.log(unixDb,unixDe)
        if( unixDb < unixDe){
          for(var k = unixDb;k<=unixDe;) {
              k = k +24 *60 *60 *1000;
            vm.dateRange.push( 
              {
                year: new Date(parseInt(k)).getFullYear(),
                month: new Date(parseInt(k)).getMonth(),
                date: new Date(parseInt(k)).getDate(),
                day: new Date(parseInt(k)).getDay(),
              })
            vm.calendarMonth.forEach(item=>{
              console.log('calendar',item)
              if(item.year==new Date(parseInt(k)).getFullYear() &&  item.month==new Date(parseInt(k)).getMonth() && item.date ==new Date(parseInt(k)).getDate() && item.day ==new Date(parseInt(k)).getDay()){
                item.selected = true
              }else{
                item.selected = false
              }
            })
          }
        } else {
          for(var k = unixDe;k<=unixDb;) {
              k = k +24 *60 *60 *1000;
              vm.dateRange.push( 
              {
                year: new Date(parseInt(k)).getFullYear(),
                month: new Date(parseInt(k)).getMonth(),
                date: new Date(parseInt(k)).getDate(),
                day: new Date(parseInt(k)).getDay(),
              })
              console.log('tw',{
                year: new Date(parseInt(k)).getFullYear(),
                month: new Date(parseInt(k)).getMonth(),
                date: new Date(parseInt(k)).getDate(),
                day: new Date(parseInt(k)).getDay(),
              })
              vm.calendarMonth.forEach(item=>{
              console.log('calendar',item)
              if(item.year==new Date(parseInt(k)).getFullYear() &&  item.month==new Date(parseInt(k)).getMonth() && item.date ==new Date(parseInt(k)).getDate() && item.day ==new Date(parseInt(k)).getDay()){
                item.selected = true
              }
            })
          }
        }
      }
  },
  computed:{
    calendarFirstDay(){ 
      let vm =this;
      const mDate = new Date(this.calendar.year,this.calendar.month,1)
      const date = new Date(this.calendar.year,this.calendar.month,1 - mDate.getDay())
      return {
        year:date.getFullYear(),
        month:date.getMonth(),
        date:date.getDate(),
        day:vm.chiday[date.getDay()],
      }
    },
    nextCalendarFirstDay(){ 
      let vm =this;
      const mDate = new Date(this.calendar.year,this.calendar.month+1,1)
      return {
        year:mDate.getFullYear(),
        month:mDate.getMonth(),
        date:mDate.getDate(),
        day:vm.chiday[mDate.getDay()],
      }
    },
    calendarMonth(){
      const data = []
      let date
      for(let i=0;i<42;i++){
        date = new Date(this.calendarFirstDay.year,this.calendarFirstDay.month,this.calendarFirstDay.date + i)
        data.push({
          year:date.getFullYear(),
          month:date.getMonth(),
          date:date.getDate(),
          day:date.getDay(),
          selected: false
        })
      }
      return data
    },
    nextCalendarMonth(){
      const data = []
      let vm = this
      const mDate = new Date(vm.calendar.year,vm.calendar.month+1,1)
      let date
      for(let i=0;i<42;i++){
        date = new Date(vm.calendar.year,vm.calendar.month +1 ,1 - mDate.getDay()+i)
        data.push({
          year:date.getFullYear(),
          month:date.getMonth(),
          date:date.getDate(),
          day:date.getDay(),
          selected: false
        })
      }
      return data
    },
    // dateRange(){
    //   let vm = this;
    //   let d = new Date()
    //   let startTime = new Date(vm.dateArr[0].year,vm.dateArr[0].momth -1 ,vm.dateArr[0].date)
    //   let endTime = new Date(vm.dateArr[0].year,vm.dateArr[0].momth -1 ,vm.dateArr[0].date)
    //   if(startTime>endTime){
    //     while((endTime.getTime()-startTime.getTime())>=0){
    //       var year = startTime.getFullYear();
    //       var month = startTime.getMonth().toString().length==1?"0"+startTime.getMonth().toString():startTime.getMonth();
    //       var day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
    //       console.log(year+"-"+month+"-"+day);
    //       startTime.setDate(startTime.getDate()+1);
    //     }
    //   }
    // },
    // getAll() {
    //     let arr = []
    //     // let ab = begin.split("-")
    //     // let ae = end.split("-")
    //     let db = new Date()
    //     db.setUTCFullYear(vm.dateArr[0].year,vm.dateArr[0].month-1,vm.dateArr[0].date)
    //     var de = new Date()
    //     de.setUTCFullYear(vm.dateArr[1].year,vm.dateArr[1].month-1,vm.dateArr[1].date)
    //     var unixDb = db.getTime() - 24*60*60*1000
    //     var unixDe = de.getTime() - 24*60*60*1000
    //     if( unixDb < unixDe){
    //       for(var k = unixDb;k<=unixDe;) {
    //           k = k +24 *60 *60 *1000;
    //         arr.push( 
    //           {
    //             year: new Date(parseInt(k)).getFullYear(),
    //             month: new Date(parseInt(k)).getMonth(),
    //             date: new Date(parseInt(k)).getDate(),
    //             day: new Date(parseInt(k)).getDay(),
    //           })
    //       }
    //     } else {
    //       for(var k = unixDe;k<=unixDb;) {
    //           k = k +24 *60 *60 *1000;
    //           arr.push( 
    //           {
    //             year: new Date(parseInt(k)).getFullYear(),
    //             month: new Date(parseInt(k)).getMonth(),
    //             date: new Date(parseInt(k)).getDate(),
    //             day: new Date(parseInt(k)).getDay(),
    //           })
    //       }
    //     }
    //     return arr
    //   }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$Primary: #ffe99d;
.monthCalendar {
  position: relative;
  // position: fixed;
  // top: 53%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // background-color: #fff;
  // box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.3);
  // display: none;
  // z-index: 20;
  // transition: opacity 0.5s;
}
.monthCalendar {
  width: 95%;
  z-index: 20;
}

.weekDay,
.week {
  text-align: center;
  display: flex;
}
.weekDay > div {
  flex: 1 1;
  line-height: 30px;
}
.day {
  flex: 1 1 0%;
  line-height: 50px;
  height: 50px;
}

.weekend {
  color: red;
}
.date {
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.datePick {
  width: 100%;
  height: 50px;
  position: relative;
  .solar {
    width: 100%;
    position: absolute;
    transform: translate(-50%, -15%);
    top: 0;
    left: 50%;
  }
  .lunar {
    font-size: 10px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 25%);
  }
}
.leapMonthDateOne {
  width: 42px;
  border-bottom: 1px solid #cc0000;
}
.lunarMonthDateOne {
  width: 36px;
  border-bottom: 1px solid #cc0000;
}
.today {
  width: 50px;
  background-color: #ffedcf;
  position: relative;
}
.selected {
  width: 50px;
  background-color: #ffedcf;
  // border-radius: 50%;
  // border: 1px solid #853737;
}

.pastDay {
  position: relative;
  pointer-events: none;
  color: #bbb;
}

.other {
  color: #bbb;
  display: none;
}

/*  test*/
.preTri {
  cursor: pointer;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 12px 20.8px 12px 0;
  border-color: transparent $Primary transparent transparent;
}
.nextTri {
  cursor: pointer;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 12px 0 12px 20.8px;
  border-color: transparent transparent transparent $Primary;
}
.btn {
  cursor: pointer;
  padding: 4px 6px;
  border: 1px solid black;
  margin-right: 2px;
  margin-left: 2px;
  border-radius: 5px;
  &:hover {
    background-color: #999;
    color: #fff;
  }
}

// rwd

@media (min-width: 320px) {
  .card-bottom {
    font-size: 15px;
    .userRange {
      font-size: 10px;
    }
  }
}
@media (min-width: 375px) {
  .card-bottom {
    .btn {
      padding: 12px 10px;
      font-size: 16.3px;
      line-height: 15px;
    }
    .userRange {
      font-size: 1rem;
    }
  }
}
@media (min-width: 765px) {
  .monthCalendar {
    width: 700px;
    z-index: 4;
  }
}
</style>