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
      :span="6"
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
  //- el-table(
  //-   :data="tableData"
  //-   border
  //-   style="width: 100%"
  //-   v-loading="tloading"
  //- )
  //-   el-table-column(
  //-     prop="data"
  //-     label="日期"
  //-   )
  //-   el-table-column(
  //-     prop="name"
  //-     label="姓名"
  //-   )
  //-   el-table-column(
  //-     prop="address"
  //-     label="地址"
  //-   )
</template>
<script>
import http from '~/plugins/http.js'
import card from '~/components/card.vue'
export default {
  components: {
    'card': card
  },
  data () {
    return {
      options: [],
      value: [],
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
      console.log(response.data)
    }
  },
  created () {
    this.search('cs')
  }
}
</script>