const splitCharacter = '!@#$'

export const typeValidate = {
  REQUIRE: 'REQUIRE',
  FORMAT: 'FORMAT',
  MIN: 'MIN',
  MAX: 'MAX',
}

export const encodeMessage = (key, message) => {
  return key + splitCharacter + message
}

export const encodeMessageOneField = (key, message, typeValidate) => {
  return key + splitCharacter + message + splitCharacter + typeValidate
}

export const decodeMessage = (encodeMessage) => {
  const arrMessage = encodeMessage.split(splitCharacter)
  return {
    key: arrMessage[0],
    message: arrMessage[1],
    type: arrMessage.length === 3 ? arrMessage[2] : undefined,
  }
}
