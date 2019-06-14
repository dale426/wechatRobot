const http = require('../axios/index')
const moli = require('../config/moliRobot')
const getMoliRepay = async (msg) => {
  params = {
    question: msg,
    ...moli
  }
  try {
    let data = await http.get('http://i.itpk.cn/api.php', params)
    if (!data) {
      return '不清楚你讲的是什么？'
    }
    let str = data.replace(/\\n/g, '<br>').replace(/\\r/g, '').replace(/\s/g, '');
    if (params.question == '笑话') {
      str = JSON.parse(str)['content']
    }
    return str
  } catch (err) {
    console.log('err', err);
  }
}

module.exports = {
  getMoliRepay: getMoliRepay
}