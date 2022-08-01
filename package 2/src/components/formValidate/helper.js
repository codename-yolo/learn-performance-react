const splitCharacter = '!@#$'

export const encodeMessage = (name, message) => {
  return name + splitCharacter + message
}

export const decodeMessage = (encodeMessage) => {
  const arrMessage = encodeMessage.split(splitCharacter)
  return {
    name: arrMessage[0],
    message: arrMessage[1],
  }
}
