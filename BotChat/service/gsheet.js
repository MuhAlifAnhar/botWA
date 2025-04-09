const axios = require('axios');

const baseUrl = "https://script.google.com/macros/s/AKfycbyYUkMfG2kSWjokKN_IDi4qEmyFLCOVU6SnlAqTg2W5Ya5SaSbkNGGZMt4rloiDAq1V/exec"

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

exports.getData = async (whatsapp) => {
    console.log(">>>", whatsapp);
    try{
        const response = await axiosInstance.get();
        let responseStr = "";
        response.data.data.forEach(element => {
            if (element.whatsapp.toString() === whatsapp) { 
                responseStr += `Nama Pelanggan : ${element.nama}\nJenis Layanan : ${element.layanan}\nEstimasi Bayar : Rp.${element.bayar}\nStatus Proyek : ${element.status}\n\n`;               
            } else {
                responseStr = "Kamu belum memiliki proyek";
            }
        });
        
        return responseStr;
        // const {success, message, data} = response.body;
    } catch (error) {
        console.error(error);
    }
}