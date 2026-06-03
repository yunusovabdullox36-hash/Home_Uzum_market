import { BsBoxSeam } from 'react-icons/bs';
import { GiSoccerBall } from 'react-icons/gi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { PiFlameBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const filters = [
  {
    id: 1,
    icon: <BsBoxSeam />,
    label: 'Onalar va bolalar uchun',
    iconBg: '#FFF3E0',
    iconColor: '#FF9800',
    href: '/category/bolalar',
  },
  {
    id: 2,
    icon: <GiSoccerBall />,
    label: 'Futbol',
    iconBg: '#E8F5E9',
    iconColor: '#4CAF50',
    href: '/category/futbol',
  },
  {
    id: 3,
    icon: <HiOutlineShoppingBag />,
    label: 'Zamonaviy bozor',
    iconBg: '#FCE4EC',
    iconColor: '#E91E8C',
    href: '/category/bozor',
  },
  {
    id: 4,
    icon: <PiFlameBold />,
    label: 'Yozgi chegirmalar',
    iconBg: '#EDE7F6',
    iconColor: '#7B2FF7',
    href: '/category/yozgi-chegirmalar',
  },
];

export default function QuickFilters() {
  return (
    <section className="pt-5 pb-0 ">
      <div className="max-w-[1250px] mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {filters.map(filter => (
            <Link 
              key={filter.id} 
              to={filter.href} 
              className="flex items-center gap-3.5 bg-white rounded-xl p-[18px_20px] border-[1.5px] border-border text-text-primary font-bold text-sm transition-all relative overflow-hidden group hover:border-uzum-purple hover:shadow-md hover:-translate-y-0.5 hover:text-uzum-purple"
            >
              <div
                className="w-[52px] h-[52px] rounded-md flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110 group-hover:-rotate-6"
                style={{ background: filter.iconBg, color: filter.iconColor }}
              >
                {filter.icon}
              </div>
              <span className="flex-1 leading-tight">{filter.label}</span>
              <div className="text-lg opacity-0 -translate-x-1.5 transition-all text-uzum-purple group-hover:opacity-100 group-hover:translate-x-0">→</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
