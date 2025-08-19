const { writeFile } = require('fs/promises')
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter')

async function createStickerFromMedia(m, quoted) {
  try {
    const buffer = await quoted.download()
    const sticker = new Sticker(buffer, {
      pack: 'NakitaBot',
      author: 'AI Bot',
      type: StickerTypes.FULL,
      quality: 70
    })
    return await sticker.toBuffer()
  } catch (err) {
    throw '❌ Gagal membuat stiker!'
  }
}

module.exports = { createStickerFromMedia }