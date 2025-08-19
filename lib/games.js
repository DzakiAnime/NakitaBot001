const tebakKata = [
  { soal: "Ibukota Jepang?", jawaban: "tokyo" },
  { soal: "Pencipta Naruto?", jawaban: "masashi kishimoto" },
  { soal: "Ibukota Indonesia?", jawaban: "jakarta" },
]

function getRandomGame() {
  return tebakKata[Math.floor(Math.random() * tebakKata.length)]
}

module.exports = { getRandomGame }