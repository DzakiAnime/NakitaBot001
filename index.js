import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } from "@whiskeysockets/baileys"
import qrcode from "qrcode-terminal"
import fs from "fs-extra"
import dotenv from "dotenv"
dotenv.config()

import menu from "./lib/menu.js"
import sticker from "./lib/sticker.js"
import games from "./lib/games.js"
import anime from "./lib/anime.js"

const premiumUsers = process.env.PREMIUM_NUMBER ? process.env.PREMIUM_NUMBER.split(",") : []

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth")
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
    browser: ["NakitaBot", "Chrome", "1.0"],
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return

    const from = m.key.remoteJid
    const type = m.message.conversation || m.message.extendedTextMessage?.text || ""
    const sender = m.key.participant || from

    // ❌ Batasan chat pribadi
    if (from.endsWith("@s.whatsapp.net") && !premiumUsers.includes(sender.split("@")[0])) {
      await sock.sendMessage(from, { text: "⚠️ Bot hanya bisa dipakai di Grup/Channel. Chat pribadi khusus PREMIUM." })
      return
    }

    if (type.startsWith("!menu")) {
      await sock.sendMessage(from, { text: menu() })
    } else if (type.startsWith("!sticker")) {
      await sticker(sock, m)
    } else if (type.startsWith("!game")) {
      await sock.sendMessage(from, { text: games() })
    } else if (type.startsWith("!anime")) {
      await sock.sendMessage(from, { text: await anime(type.split(" ")[1] || "naruto") })
    } else if (type.startsWith("!topanime")) {
      await sock.sendMessage(from, { text: await anime("top") })
    }
  })

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update
    if (qr) qrcode.generate(qr, { small: true })
    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      if (shouldReconnect) startBot()
    }
    console.log("Connection Update:", update)
  })
}

startBot()