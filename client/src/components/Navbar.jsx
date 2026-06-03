import { useState, useEffect } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { RiShoppingCartLine } from 'react-icons/ri';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { MdOutlineApps } from 'react-icons/md';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/market-horizontal-logo.png';

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('uzum_user') || 'null');
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const updateCounts = async () => {
    if (!currentUser) {
      setCartCount(0);
      setFavCount(0);
      return;
    }
    try {
      // Fetch Cart Count
      const cartRes = await fetch(`${apiUrl}/carts/${currentUser._id}`);
      const cartData = await cartRes.json();
      if (cartData && cartData.items) {
        const count = cartData.items.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCartCount(count);
      }

      // Fetch Fav Count
      const favRes = await fetch(`${apiUrl}/favorites/${currentUser._id}`);
      const favData = await favRes.json();
      if (favData && favData.products) {
        setFavCount(favData.products.length);
      }
    } catch (err) {
      console.error("Navbar count update error:", err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
    updateCounts();
    window.addEventListener('storage', updateCounts);
    return () => window.removeEventListener('storage', updateCounts);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?q=${search}`);
  };

  return (
    <nav className="bg-white  top-0 z-50 ">
      <div className="max-w-[1250px] mx-auto px-5 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <img src={logo} alt="Uzum Logo" className="h-8" />
          <span className="text-uzum-purple font-bold text-lg transition-colors group-hover:text-uzum-purple-dark">Uzum</span>
        </Link>

        <button className="flex items-center gap-2 bg-[#F3EEFE] text-uzum-purple rounded-md px-[18px] py-2.5 text-sm font-bold whitespace-nowrap transition-all border-2 border-transparent hover:bg-uzum-purple hover:text-white hover:border-uzum-purple shrink-0">
          <MdOutlineApps className="text-[18px]" />
          <span>Katalog</span>
        </button>

        <form onSubmit={handleSearch} className="flex-1 relative flex items-center">
          <input
            type="text"
            className="w-full h-11 border-2 border-border rounded-md px-[18px] pr-[52px] text-sm text-text-primary bg-bg-secondary transition-all outline-none focus:border-uzum-purple focus:bg-white focus:shadow-[0_0_0_4px_rgba(123,47,247,0.1)]"
            placeholder="Mahsulotlar va turkumlar izlash"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="absolute right-1.5 w-[34px] h-[34px] bg-uzum-purple text-white rounded-[9px] flex items-center justify-center text-[17px] transition-colors hover:bg-uzum-purple-dark">
            <HiOutlineMagnifyingGlass />
          </button>
        </form>

        <div className="flex items-center gap-1 shrink-0">
          <Link to={user ? "/profile" : "/login"} className="flex items-center gap-1.5 p-2 px-3 rounded-sm text-text-primary text-[13px] font-semibold transition-all hover:bg-bg-secondary hover:text-uzum-purple">
            <AiOutlineUser className="text-[22px] shrink-0" />
            <span className="whitespace-nowrap max-w-[100px] overflow-hidden text-ellipsis">
              {user ? user.username : 'Kirish'}
            </span>
          </Link>
          <Link to="/favorites" className="flex items-center gap-1.5 p-2 px-3 rounded-sm text-text-primary text-[13px] font-semibold transition-all hover:bg-bg-secondary hover:text-uzum-purple">
            <div className="relative flex">
              <AiOutlineHeart className="text-[22px] shrink-0" />
              {favCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-uzum-purple text-white text-[11px] font-extrabold rounded-full flex items-center justify-center px-1 border-2 border-white">
                  {favCount}
                </span>
              )}
            </div>
            <span className="whitespace-nowrap">Saralangan</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-1.5 p-2 px-3 rounded-sm text-text-primary text-[13px] font-semibold transition-all hover:bg-bg-secondary hover:text-uzum-purple">
            <div className="relative flex">
              <RiShoppingCartLine className="text-[22px] shrink-0" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-uzum-purple text-white text-[11px] font-extrabold rounded-full flex items-center justify-center px-1 border-2 border-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="whitespace-nowrap">Savat</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
