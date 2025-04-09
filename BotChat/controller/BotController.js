const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");

module.exports = class BotController extends Controller {


    async introduction(request) {
      return Response.menu.fromArrayOfString(
        [
          f("menu.daftarProduk"),
          f("menu.alamatKantor")
        ],
        f("intro", [request.name]),
        f("template.menu")
      );
    }

    async product(request) {
      return this.reply(`
        🧠 Daftar Produk & Layanan dari Wecode Solution:

        1. 💻 Pembuatan Website
          - Company Profile, E-Commerce, Web Aplikasi

        2. 📱 Pembuatan Aplikasi Mobile
          - Android / iOS (Hybrid & Native)

        3. ⚙️ Sistem Informasi Kustom
          - Sistem Keuangan, Inventory, CRM, dll

        4. 🎨 UI/UX Design
          - Desain aplikasi/web profesional & user-friendly

        5. ☁️ Integrasi Cloud & API
          - Hosting, Server, dan Integrasi API pihak ketiga

        📩 Untuk konsultasi atau penawaran harga, silakan hubungi kami di:
        Instagram: @itsalifanhar
        WhatsApp: 08xx-xxxx-xxxx
      `);
    }

    async alamatKantor(request) {
      return this.reply(`
        🏢 Alamat Kantor Kami:

        Wecode Solution
        📍 Jl. Banta-Bantaeng, Makassar, Sulawesi Selatan  
        🕘 Jam Operasional:  
        Senin - Jumat: 09.00 - 17.00  
        Sabtu - Minggu: Libur

        📞 Kontak:
        WhatsApp: 08xx-xxxx-xxxx  
        📧 Email: sultankautsar21@gmail.com  
        🌐 Instagram: @itsalifanhar

        Kami siap bantu kebutuhan digital kamu ✨
      `);
    }

}