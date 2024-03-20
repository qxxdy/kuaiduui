function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}
let validateEmail = (rule, value, callback) => {
  if (!isEmail(value)) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}


function isPhone (s) {
  return /^(0[1-9]\d{1,2}-)\d{6,7}$/.test(s)
}
let validatePhone = (rule, value, callback) => {
  if (!isPhone(value)) {
    callback(new Error('手机格式错误'))
  } else {
    callback()
  }
}


export {validateEmail,validatePhone}
