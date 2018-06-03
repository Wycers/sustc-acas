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
      @change="update"
    )
      el-checkbox(
        v-for="course in courses"
        :key="courses.id"
        class="text item"
        border
        :label="course.id"
      ) {{ course.name + ' ' + course.teacher}}
    div {{ this.check }}
    el-alert(
      v-if="check.length === 0"
      title="您未选择任何课程哦"
      type="warning"
      show-icon)
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
  methods: {
    update () {
      console.log(this.check)
      this.$store.commit('modifyCourses', {
        num: this.num,
        value: this.check
      })
    }
  },
  mounted () {
    http.get('/query', {num: this.num}).then((response) => {
      console.log(response.data)
      this.courses = response.data
      if (this.courses.length !== 0) {
        this.name = this.courses[0].name
      }
      this.check = []
      for (var i in this.courses) {
        this.check.push(this.courses[i].id)
      }
      this.loading = false
      this.$store.commit('initCourses', {
        num: this.num,
        value: this.check
      })
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