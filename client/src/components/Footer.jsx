import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { RiInstagramLine, RiTelegramLine, RiYoutubeLine, RiFacebookBoxLine } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border mt-20 pt-12 pb-8">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Biz haqimizda */}
          <div>
            <h3 className="font-bold text-base mb-4">Biz haqimizda</h3>
            <ul className="flex flex-col gap-3">
              <li><a href='https://uzuuzm2.vercel.app/' className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Topshirish punktlari</a></li>
              <li><button className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Vakansiyalar</button></li>
            </ul>
          </div>

          {/* Foydalanuvchilarga */}
          <div>
            <h3 className="font-bold text-base mb-4">Foydalanuvchilarga</h3>
            <ul className="flex flex-col gap-3">
              <li><button className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Biz bilan bog'lanish</button></li>
              <li><button className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Savol-javob</button></li>
            </ul>
          </div>

          {/* Tadbirkorlarga */}
          <div>
            <h3 className="font-bold text-base mb-4">Tadbirkorlarga</h3>
            <ul className="flex flex-col gap-3">
              <li><button className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Uzumda soting</button></li>
              <li><button className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Sotuvchi kabinetiga kirish</button></li>
            </ul>
          </div>

          {/* Ilovani yuklab olish */}
          <div>
            <h3 className="font-bold text-base mb-4">Ilovani yuklab olish</h3>
            <div className="flex gap-4 mb-8">
              <button className="flex items-center gap-2 text-[13px] font-semibold hover:text-uzum-purple transition-colors">
                <FaApple size={20} /> App Store
              </button>
              <button className="flex items-center gap-2 text-[13px] font-semibold hover:text-uzum-purple transition-colors">
                <FaGooglePlay size={18} /> Google Play
              </button>
            </div>
            <h3 className="font-bold text-base mb-4">Uzum ijtimoiy tarmoqlarda</h3>
            <div className="flex gap-4">
              <button className="text-text-primary hover:text-uzum-purple transition-all p-1"><RiInstagramLine size={24} /></button>
              <button className="text-text-primary hover:text-uzum-purple transition-all p-1"><RiTelegramLine size={24} /></button>
              <button className="text-text-primary hover:text-uzum-purple transition-all p-1"><RiYoutubeLine size={24} /></button>
              <button className="text-text-primary hover:text-uzum-purple transition-all p-1"><RiFacebookBoxLine size={24} /></button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] font-bold">Privacy Policy • User Agreement</p>
          <p className="text-[13px] text-text-secondary text-center">
            «2026© XK MCHJ «UZUM MARKET». Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
