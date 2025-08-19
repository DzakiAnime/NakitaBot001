require('dotenv').config()

const menu = () => {
  return `
╭─── *${process.env.BOT_NAME || 'NakitaBot'}* ───╮
│
│ 👑 Owner: ${process.env.OWNER_NAME || 'Admin'}
│
│ 📌 *Fitur Umum*:
│ • !menu
│ • !donasi
│ • !info
│ • !topanime
│ • !anime <judul>
│ • !sticker
│ • !game
│
│ ⚙️ *Khusus Admin Grup*:
│ • !setwelcome <teks>
│ • !setbotname <nama>
│ • !setowner <nama>
│
╰────────────────────╯
`
}

module.exports = menu