import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@adiwajshing/baileys'
import { Boom } from '@hapi/boom'
import { Request, Response, RequestHandler } from 'express'
import qr from 'qr-image'

const session = new Map()
const VAR = 'VAR_SESSION'
let connectionStatus: string = 'Sedang cek koneksi'
let qrCode: string;

export const iniWhatsApp = async () => {
    await connectToWhatsApp()
}

export const getStatus: RequestHandler = async (req: Request, res: Response) => {
    if(qrCode == null || qrCode == undefined) {
        res.json({
            success: true,
            data: connectionStatus,
            message: 'Sukses menampilkan status'
        })
    } else{
        var code = qr.image(qrCode, { type: 'png' })
        res.setHeader('Content-Type', 'image/png')
        code.pipe(res)
    }
}

export const sendMessage: RequestHandler = async (req: Request, res: Response) => {
    // fungsi untuk mengirim pesan
    // await sock.sendMessage(m.messages[0].key.remoteJid!, { text: 'Hello there!' })
    // await session.get(VAR).sendMessage()
}

async function connectToWhatsApp () {
    const { state, saveCreds } = await useMultiFileAuthState('auth')
    const sock = makeWASocket({
        // can provide additional config here
        printQRInTerminal: true,
        auth: state
    })
    sock.ev.on('creds.update', saveCreds)
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(update.qr) {
            qrCode = update.qr
        }
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            connectionStatus = 'closed'
            if(shouldReconnect) {
                connectToWhatsApp()
            }
        } else if(connection === 'open') {
            connectionStatus = 'connected'
            console.log('opened connection')
        }
    })
    sock.ev.on('messages.upsert', async m => {
        console.log(JSON.stringify(m, undefined, 2))

        console.log('replying to', m.messages[0].key.remoteJid)
        // await sock.sendMessage(m.messages[0].key.remoteJid!, { text: 'Hello there!' })
    })

    session.set(VAR, sock)
}
// run in main file
// connectToWhatsApp()