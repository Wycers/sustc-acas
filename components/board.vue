<template lang='pug'>
el-row(class='tac')
  el-col(:span='4')
    el-menu(
      default-active='0'
      class='el-menu-vertical-demo'
      @open='handleOpen'
      @close='handleClose'
    )
      el-menu-item(
        v-for='(method, index) in methods.courses'
        :key="'#' + index"
        :index="'#' + index"
        @click='update(index)'
      )
        i(class='el-icon-menu')
        span(slot='title') {{ '方案' + (index + 1) }}
    </el-menu>
  </el-col>
  <el-col :span='20'>
    el-table(
      :data='schedule'
      border
      style='width: 100%'
    )
      el-table-column(
        prop='title'
        label='#'
      )
      el-table-column(
        prop='mon'
        label='星期一'
      )
      el-table-column(
        prop='tue'
        label='星期二'
      )
      el-table-column(
        prop='wed'
        label='星期三'
      )
      el-table-column(
        prop='thu'
        label='星期四'
      )
      el-table-column(
        prop='fri'
        label='星期五'
      )
      el-table-column(
        prop='sat'
        label='星期六'
      )
  </el-col>
  div {{ methods }}
</el-row>
</template>
<script>
export default {
  props: {
    methods: {
      required: true
    }
  },
  data () {
    return {
      now: 0,
      schedule: [
        {title: '第一节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第二节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第三节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第四节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第五节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第六节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第七节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第八节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第九节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第十节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第十一节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''}
      ]
    }
  },
  methods: {
    update (index) {
      if (this.methods.length === 0) {
        return
      }
      this.schedule = [
        {title: '第一节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第二节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第三节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第四节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第五节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第六节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第七节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第八节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第九节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第十节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''},
        {title: '第十一节', mon: '', tue: '', wed: '', thu: '', fri: '', sat: ''}
      ]
      this.now = index
      for (var i = 1; i <= 6; ++i) {
        for (var k in this.methods.courses[index]) {
          for (var l in this.methods.courses[index][k].time) {
            if (11 * (i - 1) <= this.methods.courses[index][k].time[l] && this.methods.courses[index][k].time[l] <= 11 * i - 1) {
              var tag = this.methods.courses[index][k].time[l] - 11 * (i - 1)
              switch (i) {
                case 1:
                  this.schedule[tag - 1].mon = this.methods.courses[index][k].name
                  break
                case 2:
                  this.schedule[tag - 1].tue = this.methods.courses[index][k].name
                  break
                case 3:
                  this.schedule[tag - 1].wed = this.methods.courses[index][k].name
                  break
                case 4:
                  this.schedule[tag - 1].thu = this.methods.courses[index][k].name
                  break
                case 5:
                  this.schedule[tag - 1].fri = this.methods.courses[index][k].name
                  break
                default:
                  this.schedule[tag - 1].sat = this.methods.courses[index][k].name
                  break
              }
            }
          }
        }
      }
    }
  }
}
</script>
