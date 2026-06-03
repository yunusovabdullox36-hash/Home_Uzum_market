import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const cities = ['Toshkent', 'Samarqand', 'Buxoro', 'Namangan', 'Andijon', 'Farg\'ona'];

export default function TopBar() {
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Alamli');

  return (
    <div className="bg-[#f0f2f5] text-[13px]">
      <div className="max-w-[1280px] mx-auto px-5 h-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-1 cursor-pointer p-1 px-2 rounded-sm font-semibold text-text-primary relative transition-colors hover:bg-bg-secondary" 
            onClick={() => setCityOpen(!cityOpen)}
          >
            <HiOutlineMapPin className="text-uzum-purple text-base shrink-0" />
            <span>Shahar: <span className="underline decoration-1 underline-offset-4">{selectedCity}</span></span>
            <MdKeyboardArrowDown className={`text-[18px] text-text-secondary transition-transform ${cityOpen ? 'rotate-180' : ''}`} />
            
            {cityOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-md shadow-lg border border-border min-w-[200px] overflow-hidden z-[1000] p-1.5 animate-dropDown">
                {cities.map(city => (
                  <button
                    key={city}
                    className={`flex items-center gap-2 w-full p-2.5 px-3 rounded-sm text-[13px] transition-colors hover:bg-bg-secondary hover:text-uzum-purple ${
                      selectedCity === city ? 'bg-[#F3EEFE] text-uzum-purple font-bold' : 'text-text-primary'
                    }`}
                    onClick={(e) => { e.stopPropagation(); setSelectedCity(city); setCityOpen(false); }}
                  >
                    <HiOutlineMapPin />
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href='https://uzuuzm2.vercel.app/' className="text-text-secondary font-medium transition-colors hover:text-uzum-purple whitespace-nowrap">Topshirish punktlari</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-uzum-purple font-semibold transition-colors hover:text-uzum-purple-dark whitespace-nowrap">Sotuvchi bo'lish</button>
          <span className="text-border">|</span>
          <a href='https://uzuuzm2.vercel.app/' className="text-uzum-purple font-semibold transition-colors hover:text-uzum-purple-dark whitespace-nowrap">Topshirish punktini ochish</a>
          <button className="text-text-secondary font-medium transition-colors hover:text-uzum-purple whitespace-nowrap">Savol-javob</button>
          <Link to="/profile" className="text-text-secondary font-medium transition-colors hover:text-uzum-purple whitespace-nowrap">Buyurtmalarim</Link>
          <div className="flex items-center gap-1 cursor-pointer text-text-secondary font-medium p-1 px-2 rounded-sm transition-colors hover:bg-bg-secondary">
            <span className="text-base leading-none">🇺🇿</span>
            <span>O'zbekcha</span>
            <MdKeyboardArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
}
