<template lang="pug">
div
  el-select(
    v-model="value"
    multiple
    filterable
    remote
    :remote-method="search"
    :loading="loading"
    placeholder="请输入关键字"
    style="width: 100%"
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
      card(:num="item")
  div {{value}}
  div {{options}}
  el-table(
    :data="tableData"
    border
    style="width: 100%"
  )
    el-table-column(
      prop="data"
      label="日期"
      width="180"
    )
    el-table-column(
      prop="name"
      label="姓名"
      width="180"
    )
    el-table-column(
      prop="address"
      label="地址"
      width="180"
    )
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
      loading: false
    }
  },
  methods: {
    search (key) {
      this.loading = true
      http.get('/search', {keyword: key}).then((response) => {
        this.options = response.data
        this.loading = false
      })
    }
  },
  created () {
    this.search('cs')
  }
}
</script>