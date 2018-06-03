const baseUrl = 'http://localhost:8080/schedule'
const config = {
  locale: 'zh-CN', // en-US, zh-CN
  url: baseUrl,
  ajaxUploadUrl: `${baseUrl}/api/upload`,
  debug: {
    mock: true, // enable mock
    http: false // http request log
  },
  api: `${baseUrl}/api`
}

global.config = config

export default config
