import express from 'express'
import {iniWhatsApp, getStatus} from './helper/whatsapp'

const port = 3000
const app = express()

app.get('/', getStatus);

// app.post('/send-message', function (req, res) {
    
// })

app.listen(port, async () => {
    console.log(`Server jalan di port ${port}`)
    await iniWhatsApp()
})