<template lang="pug">
div
  el-select(
    v-model="value"
    multiple
    filterable
    remote
    :remote-method="search"
    :loading="sloading"
    placeholder="请输入关键字"
    style="width: 100%"
    @change="update"
  )
    el-option(
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    )
  el-row(:gutter="20")
    el-col(
      v-for="item in value"
      :key="item.name"
      :span="8"
    )
      card(
        ref="CS309"
        :num="item"
      )
  div {{ this.$store.state }}
  el-button(
    type="primary"
    @click="submit"
  ) 查看结果
  board(:methods="methods")
</template>
<script>
import http from '~/plugins/http.js'
import card from '~/components/card.vue'
import board from '~/components/board.vue'
export default {
  components: {
    'card': card,
    'board': board
  },
  data () {
    return {
      options: [],
      value: [],
      methods: [],
      sloading: false,
      tloading: false
    }
  },
  methods: {
    update () {
      this.$store.commit('checkCourses', {
        num: this.value
      })
    },
    search (key) {
      this.loading = true
      http.get('/search', {keyword: key}).then((response) => {
        this.options = response.data
        this.loading = false
      })
    },
    async submit () {
      var data = []
      for (var i in this.$store.state.courses) {
        if (this.$store.state.courses[i] === null) {
          continue
        }
        data.push(this.$store.state.courses[i])
      }
      const response = await http.post('/work', {data})
      if (response.data.code !== 0) {
        this.$alert('服务器发生错误', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      if (response.data.data.tot === 0) {
        this.$alert('没有可行的排课方案', '提示', {
          confirmButtonText: '确定'
        })
      }
      this.methods = response.data.data
      console.log(response.data.data)
    }
  },
  created () {
    this.search('cs')
  }
}
</script>