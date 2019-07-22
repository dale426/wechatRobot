/**
 * WechatBot
 *  - https://github.com/gengchen528/wechatBot
 */
const { Wechaty, Friendship, Contact } = require('wechaty')
const schedule = require('./schedule/index')
const config = require('./config/index')
const config2 = require('./config/user')
const untils = require('./untils/index')
const superagent = require('./superagent/index')
const { FileBox } = require('file-box') //文件读取模块
//  二维码生成
function onScan(qrcode, status) {
	require('qrcode-terminal').generate(qrcode)  // 在console端显示二维码
	const qrcodeImageUrl = [
		'https://api.qrserver.com/v1/create-qr-code/?data=',
		encodeURIComponent(qrcode),
	].join('')
	console.log(qrcodeImageUrl)
}

// 登录
async function onLogin(user) {
	console.log(`贴心小助理${user}登录了`)
	// main(); // 启动时 执行一次

	// 登陆后创建定时任务
	schedule.setSchedule(config.SENDDATE, () => {
		console.log('你的贴心小助理开始工作啦！')
		main()
	})
}

//登出
function onLogout(user) {
	console.log(`${user} 登出`)
	return bot.stop();
}
// 监听对话 根据关键词自动加群
async function onMessage(msg) {
	const contact = msg.from() // 发消息人
	const content = msg.text() //消息内容
	const room = msg.room() //是否是群消息
	const roomCodeUrl = FileBox.fromUrl(config.ROOMCODEURL) //来自url的文件
	const roomCodeLocal = FileBox.fromFile(config.ROOMLOCALPATH) //添加本地文件
	if (msg.self()) {
		return
	}
	if (room) { // 如果是群消息
		return;
		/* const topic = await room.topic()
		console.log(`群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`) */
	} else { // 如果非群消息
		console.log(`发消息人: ${contact.name()} 消息内容: ${content}`)
		if (contact.name() === '胡卫潇1') {
			// 获取发消息的人 
			let contactMeizi = await bot.Contact.find({ name: config.NICKNAME }) || await bot.Contact.find({ alias: config.NAME }) // 获取你要发送的联系人
			contactMeizi.say(content);
		} else if (contact.name() === '夏橙1')
		let contactMentor = await bot.Contact.find({ name: config.NICKNAME }) || await bot.Contact.find({ alias: config.NAME }) // 获取你要发送的联系人

	}
}

// 自动发消息功能
async function main() {
	let logMsg
	let contact = await bot.Contact.find({ name: config.NICKNAME }) || await bot.Contact.find({ alias: config.NAME }) // 获取你要发送的联系人
	let contact2 = await bot.Contact.find({ alias: config2.NAME }) || await bot.Contact.find({ name: config2.NICKNAME })  // 获取你要发送的联系人

	try {
		logMsg = strXIAN
		await contact.say(str) // 发送消息
		await contact2.say(strXIAN) // 发送消息
	} catch (e) {
		logMsg = e.message
	}
	console.log(logMsg)
}
// 加群提醒
function roomJoin(room, inviteeList, inviter) {
	const nameList = inviteeList.map(c => c.name()).join(',')
	room.topic().then(function (res) {
		const roomNameReg = eval(config.ROOMNAME)
		if (roomNameReg.test(res)) {
			console.log(`群名： ${res} ，加入新成员： ${nameList}, 邀请人： ${inviter}`)
			room.say(`${res}：欢迎新朋友 @${nameList}，<br>使用过程中有什么问题都可以在群里提出`)
		}
	})
}

const bot = new Wechaty({ name: 'WechatEveryDay' })

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)
bot.on('room-join', roomJoin)

bot.start()
	.then(() => console.log('开始登陆微信'))
	.catch(e => console.error(e))
