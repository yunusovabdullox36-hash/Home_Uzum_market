import { useState } from 'react';
import { GiSoccerBall } from 'react-icons/gi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { BsCollection, BsPhone } from 'react-icons/bs';
import { TbArmchair2, TbPercentage } from 'react-icons/tb';
import { MdOutlineSportsHandball } from 'react-icons/md';
import { PiFlowerLotusBold } from 'react-icons/pi';
import { IoChevronDownOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, label: 'Yozgi chegirmalar', icon: <TbPercentage />, color: '#FF4081', href: '/category/yozgi-chegirmalar' },
  { id: 2, label: 'Futbol', icon: <GiSoccerBall />, color: '#4CAF50', href: '/category/futbol' },
  { id: 3, label: 'Yozgi kolleksiya', icon: <BsCollection />, color: '#FF9800', href: '/category/yozgi-kolleksiya' },
  { id: 4, label: 'Arzon narxlar kafolati', icon: <MdOutlineLocalOffer />, color: '#7B2FF7', href: '/category/arzon-narxlar' },
  { id: 5, label: "Sizning go'zalligingiz", icon: <PiFlowerLotusBold />, color: '#E91E8C', href: '/category/gozallik' },
  { id: 6, label: 'Mebel', icon: <TbArmchair2 />, color: '#795548', href: '/category/mebel' },
  { id: 7, label: 'Turizm va baliq ovi', icon: <MdOutlineSportsHandball />, color: '#009688', href: '/category/turizm' },
  { id: 8, label: 'Elektronika', icon: <BsPhone />, color: '#2196F3', href: '/category/elektronika' },
];

export default function CategoryNav() {
  const [active, setActive] = useState(null);

  return (
    <div className="bg-white ">
      <div className="max-w-[1280px] mx-auto px-5">
        <ul className="flex items-center gap-0.5 overflow-x-auto no-scrollbar scrollbar-hide">
          {categories.map(cat => (
            <li key={cat.id}>
              <Link
                to={cat.href}
                className={`flex items-center gap-[7px] p-2.5 px-3 rounded-sm text-[13px] font-semibold whitespace-nowrap transition-all relative group hover:bg-bg-secondary hover:text-uzum-purple ${
                  active === cat.id ? 'text-uzum-purple' : 'text-text-primary'
                }`}
                onClick={() => setActive(cat.id)}
              >
                <span 
                  className="w-[26px] h-[26px] rounded-[6px] flex items-center justify-center text-sm shrink-0" 
                  style={{ color: cat.color, background: cat.color + '18' }}
                >
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
                <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-uzum-purple rounded-t-sm transition-transform duration-200 ${
                  active === cat.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            </li>
          ))}
          <li>
            <button className="flex items-center gap-1 p-2.5 px-3 text-[13px] font-semibold text-text-secondary rounded-sm whitespace-nowrap transition-all hover:bg-bg-secondary hover:text-uzum-purple">
              Yana <IoChevronDownOutline />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
