const { Wechaty } = require('wechaty')
const PrintQrcode = require('qrcode-terminal');
// const schedule = require('./schedule/index')
// const config = require('./config/index')
// const untils = require('./untils/index')
// const superagent = require('./superagent/index')
// const {FileBox} = require('file-box') //文件读取模块
const { onMessage } = require('./src/message');

// 1. 扫码
const onScan = (qrcode, status) => {
  const url = ['https://api.qrserver.com/v1/create-qr-code/?data=', encodeURIComponent(qrcode), '&size=220x220&margin=20',].join('')
  console.log(url);
  PrintQrcode.generate(qrcode);
}

// 2. 登录成功
const onLogin = function (user) {
  console.log(`用户[ ${user} ]登录上线了`);

}

const main = function () {

}


const bot = new Wechaty({ name: 'long_robot-card' }) // name可以存储登录信息
bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('message', onMessage)
bot.start()