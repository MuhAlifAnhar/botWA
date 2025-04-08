// import Module
const { makeWAsocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const pino = require('pino')
const chalk = require('chalk')
const readline = require('readline')
const { resolve } = require('path')
const { version } = require('os')

// Metode Pairing
// true = Pairing Code || False = Scan QR
const usePairingCode = true

// promt Input Terminal
async function question(promt) {
    process.stdout.write(promt)
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return new Promise((resolve) => r1.question("", (ans) => {
        rl.close()
        resolve(ans)
    }))
}

// Koneksi WhatsApp
async function connectToWhatsApp() {
    console.log(chalk.blue('Connecting to WhatsApp...'))

    // Menyimpan Sesi Login
    // LenwySesi Menjadi Penyimpanan Sesi Login
    const { state, saveCreds } = await useMultiFileAuthState('./LenwySesi')

    // Membuat Koneksi WhatsApp
    const Lenwy = makeWAsocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !usePairingCode,
        auth: state,
        browser: ['Ubuntu', 'Chrome', '20.0.4'], // Simulasi Browser
        version: [2, 3000, 1015901307] // Simulasi Versi WhatsApp
    })

    // Metode Pairing Code
    if (usePairingCode && !Lenwy.authState.creds.registered) {
        console.log(chalk.green('Masukkan Nomor dengan awal 62'))
        const phoneNumber = await question('> ')
        const code = await Lenwy.requestPairingCode(phoneNumber.trim())
        console.log(chalk.cyan(`Pairing Code: ${code}`))
    }

    // Menyimpan Sesi Login
    Lenwy.ev.on('creds.update', saveCreds)

    // Informasi Koneksi
    Lenwy.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            console.log(chalk.red('Koneksi Terputus'))
            connectToWhatsApp()
        } else if (connection === 'open') {
            console.log(chalk.red('Koneksi Terhubung'))
        }
    })

}

// Jalankan Koneksi WhatsApp
connectToWhatsApp()