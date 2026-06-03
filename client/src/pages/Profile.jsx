import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('uzum_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('uzum_user');
    navigate('/login');
    window.location.reload();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex flex-col gap-2">
          <Link to="/profile" className="p-3 bg-bg-secondary rounded-xl font-bold text-uzum-purple">Mening ma'lumotlarim</Link>
          <Link to="/orders" className="p-3 hover:bg-bg-secondary rounded-xl transition-colors">Buyurtmalarim</Link>
          <Link to="/favorites" className="p-3 hover:bg-bg-secondary rounded-xl transition-colors">Saralanganlar</Link>
          <button 
            onClick={handleLogout}
            className="p-3 text-left text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            Chiqish
          </button>
        </aside>
        <main className="flex-1 bg-white border border-border rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-6">Shaxsiy ma'lumotlar</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-secondary">F.I.SH (Username)</label>
              <div className="h-12 px-4 flex items-center rounded-xl border-2 border-border bg-bg-secondary text-text-primary font-medium">
                {user.username}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-secondary">Email manzili</label>
              <div className="h-12 px-4 flex items-center rounded-xl border-2 border-border bg-bg-secondary text-text-primary font-medium">
                {user.email}
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-uzum-purple/5 rounded-2xl border border-uzum-purple/10">
            <h3 className="font-bold text-uzum-purple mb-2">Xush kelibsiz, {user.username}!</h3>
            <p className="text-sm text-text-secondary">
              Uzum Marketda xarid qilishda davom eting. Sizning barcha buyurtmalaringiz va sevimlilaringiz shu yerda saqlanadi.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
