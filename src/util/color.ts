export const hexToRGBA = (hex, alpha) => {
  if (!isValidHex(hex)) {
    throw new Error('Invalid HEX')
  }
  const chunkSize = Math.floor((hex.length - 1) / 3)
  const hexArr = getChunksFromString(hex.slice(1), chunkSize)
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256)
  return {
    r,
    g,
    b,
    a: getAlphafloat(a, alpha),
  }
}
const isValidHex = (hex) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex)

const getChunksFromString = (st, chunkSize) =>
  st.match(new RegExp(`.{${chunkSize}}`, 'g'))

const convertHexUnitTo256 = (hexStr) =>
  parseInt(hexStr.repeat(2 / hexStr.length), 16)
const getAlphafloat = (a, alpha) => {
  if (typeof a !== 'undefined') {
    return a / 256
  }
  if (typeof alpha !== 'undefined') {
    if (1 < alpha && alpha <= 100) {
      return alpha / 100
    }
    if (0 <= alpha && alpha <= 1) {
      return alpha
    }
  }
  return 1
}
