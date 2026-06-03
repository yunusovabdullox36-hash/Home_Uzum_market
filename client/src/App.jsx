import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import CategoryNav from './components/CategoryNav';
import HeroSwiper from './components/HeroSwiper';
import QuickFilters from './components/QuickFilters';
import Footer from './components/Footer';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    const user = localStorage.getItem('uzum_user');
    if (!user && !isAuthPage) {
      navigate('/login');
    }
  }, [location.pathname, navigate, isAuthPage]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isAuthPage && (
        <header>
          <TopBar />
          <Navbar />
          <CategoryNav />
        </header>
      )}

      <main className="flex-1">
        {isHomePage && (
          <>
            <HeroSwiper />
            <QuickFilters />
          </>
        )}
        
        <Outlet />
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}
