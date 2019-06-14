const { getMoliRepay } = require('./main.js');

const user = require('../config/user.js')

const onMessage = async (msg) => {

  const contact = msg.from() // 获取联系人
  const text = msg.text()    //  获取消息内容
  const room = msg.room()   // 获取消息所在的微信群，如果这条消息不在微信群中，会返回null
  if (room) {
    // 群消息
    const topic = await room.topic()
    console.log(`群消息-[ ${topic}] - 用户: ${contact.name()} 消息内容: ${text}`)
  } else {
    // 个人消息
    if (msg.self()) {
      return;
    }

    let msgName = contact.name() // 昵称
    let msgalisName = await contact.alias() // 备注
    console.log(`用户[ ${contact.name()} ]: ${text}`)
    if (msgalisName == user.config2.name) {

      let data = await getMoliRepay(text)
      // 机器人回复
      console.log('[ -茉莉机器人回复--- ]', data);

      contact.say(data)
    }

    // let contactAutoUser = await this.Contact.find({ alias: user.config2.name }) || await this.Contact.find({ name: user.config2.nickName })  // 获取你要发送的联系人

  }


}

module.exports = { onMessage };
