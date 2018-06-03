<template lang="pug">
  el-card(
    class="box-card"
    v-loading="loading"
    element-loading-text="课程内容加载中"
  )
    div(
      slot="header"
      class="clearfix"
    )
      span {{ title }}
    el-checkbox-group(
      v-model="check"
      size="small"
    )
      el-checkbox(
        v-for="course in courses"
        :key="courses.id"
        class="text item"
        border
        :label="course.id"
      ) {{ course.name + ' ' + course.teacher}}
    div {{ this.check }}
</template>
<script>
// :label="course.bj + ' ' + course.teacher"
import http from '~/plugins/http'
export default {
  props: {
    num: {
      required: true
    }
  },
  data () {
    return {
      loading: true,
      name: null,
      courses: [],
      check: []
    }
  },
  computed: {
    title () {
      return this.num + ': ' + this.name
    }
  },
  mounted () {
    http.get('/query', {num: this.num}).then((response) => {
      console.log(response.data)
      this.courses = response.data
      if (this.courses.length !== 0) {
        this.name = this.courses[0].name
      }
      // [ ...this.check ] = this.courses
      this.loading = false
    })
  }
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>