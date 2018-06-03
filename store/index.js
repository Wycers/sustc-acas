export const state = () => ({
  sidebar: false,
  locales: ['en-US', 'zh-CN'],
  locale: 'zh-CN',
  courses: []
})

export const mutations = {
  initCourses (state, {num, value}) {
    state.courses.push({'num': num, 'value': value})
  },
  modifyCourses (state, {num, value}) {
    for (var i in state.courses) {
      if (num === state.courses[i].num) {
        state.courses[i].value = value
        break
      }
    }
  },
  checkCourses (state, {num}) {
    for (var i in state.courses) {
      var flag = false
      for (var j in num) {
        if (state.courses[i].num === num[j]) {
          flag = true
          break
        }
      }
      if (flag) {
        continue
      }
      delete state.courses[i]
    }
  },
  setLanguage (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}
