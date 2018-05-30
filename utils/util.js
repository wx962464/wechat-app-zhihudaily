function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date, split) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join(split || '')
}

function formatDateWithWeekDay(date) {
  var month = date.getMonth() + 1
  var day = date.getDate()
  var weekDay = date.getDay()
  var fullDate =  month + '月' + day + '日'
  var weekArray = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  return fullDate.concat(' ' + weekArray[weekDay])
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDateWithWeekDay: formatDateWithWeekDay,
}
