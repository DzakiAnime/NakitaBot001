const axios = require('axios')

async function searchAnime(query) {
  try {
    const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`)
    if (!res.data.data.length) return '❌ Anime tidak ditemukan!'
    const anime = res.data.data[0]
    return `
📺 *${anime.title}*
💡 Type: ${anime.type}
⭐ Rating: ${anime.score}
📅 Rilis: ${anime.aired.string}
🔗 Link: ${anime.url}
    `
  } catch (err) {
    return '❌ Gagal mengambil info anime!'
  }
}

async function topAnime() {
  try {
    const res = await axios.get(`https://api.jikan.moe/v4/top/anime?limit=5`)
    let teks = '🌟 *Top 5 Anime* 🌟\n\n'
    res.data.data.forEach((a, i) => {
      teks += `${i+1}. ${a.title} (⭐ ${a.score})\n`
    })
    return teks
  } catch (err) {
    return '❌ Gagal mengambil daftar top anime!'
  }
}

module.exports = { searchAnime, topAnime }