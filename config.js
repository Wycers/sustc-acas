const baseUrl = 'http://localhost:8080/schedule'
const config = {
  locale: 'zh-CN', // en-US, zh-CN
  url: baseUrl,
  ajaxUploadUrl: `${baseUrl}/api/upload`,
  debug: {
    mock: false, // enable mock
    http: true // http request log
  },
  api: `${baseUrl}/`
}

global.config = config

export default config
