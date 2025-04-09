const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");

module.exports = class BotController extends Controller {


    async introduction(request) {
      return Response.menu.fromArrayOfString(
        [
          f("menu.daftarProduk"),
          f("menu.alamatKantor"),
          f("menu.project"),
        ],
        f("intro", [request.name]),
        f("template.menu")
      );
    }

    async product(request) {
      await this.reply(`🧠 Daftar Produk & Layanan dari Wecode Solution:\n\n1. 💻 Pembuatan Website\n   - Company Profile, E-Commerce, Web Aplikasi\n\n2. 📱 Pembuatan Aplikasi Mobile\n   - Android / iOS (Hybrid & Native)\n\n3. ⚙️ Sistem Informasi Kustom\n   - Sistem Keuangan, Inventory, CRM, dll\n\n4. 🎨 UI/UX Design\n   - Desain aplikasi/web profesional & user-friendly\n\n5. ☁️ Integrasi Cloud & API\n   - Hosting, Server, dan Integrasi API pihak ketiga
      `);
      await this.reply(f("footer"));
      return this.sendBasicMenu(request);
    }

    async alamatKantor(request) {
      await this.reply(`🏢 Alamat Kantor Kami:\n\nWecode Solution\n📍 Jl. Banta-Bantaeng, Makassar, Sulawesi Selatan\n🕘 Jam Operasional:\nSenin - Jumat: 09.00 - 17.00\nSabtu - Minggu: Libur\n\n📞 Kontak:\nWhatsApp: 08xx-xxxx-xxxx\n📧 Email: \nsultankautsar21@gmail.com\n🌐 Instagram: @itsalifanhar\n\nKami siap bantu kebutuhan digital kamu ✨
      `);
      await this.reply(f("footer"));
      return this.sendBasicMenu(request);
    }

    async sendBasicMenu(request) {    
      return Response.menu.fromArrayOfObject(
        [
          {
            value: `menu.back`, 
            text: f("menu.back"),
            code: "0"
          }
        ],
        "",
        f("template.menu")  
      );
    }

    async lihatProject(request) {    
      return Response.menu.fromArrayOfObject(
        [
          {
            value: `menu.project`, 
            text: f("menu.project"),
            code: "3"
          }
        ],
        "",
        f("template.menu")  
      );
    }

}