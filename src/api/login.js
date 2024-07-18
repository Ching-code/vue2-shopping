// login request
import request from '@/utils/request'
export const getImgCode = () => {
  return request.get('/captcha/image')
}

export const getCaptchaCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile,
    },
  })
}

export const validateCodeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode,
    },
  })
}
