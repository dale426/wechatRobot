const http = require('./index');
const GB2312UnicodeConverter = require('../utils/util');
const QS = require('qs');

var getHttp = async function () {
  params = {
    question: '杭州天气'
  }
  let data = await http.get('http://i.itpk.cn/api.php', params)

  let str = data.replace(/\\n/g, '\\\\n').replace(/\\r/g, '\\\\r');
  console.log('str1', str);
  
  str = str.replace(/\s/g, '');
  console.log('str2', str);

  str = JSON.parse(str)

  console.log('str', str.content);
  return data


}

getHttp();