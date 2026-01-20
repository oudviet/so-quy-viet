import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ThemChiTieu from './pages/ThemChiTieu';
import TongHop from './pages/TongHop';
import LichSu from './pages/LichSu';

function App() {
  const [trangHienTai, setTrangHienTai] = useState('tong-hop');

  const renderTrang = () => {
    switch (trangHienTai) {
      case 'them-chi-tieu':
        return <ThemChiTieu />;
      case 'tong-hop':
        return <TongHop />;
      case 'lich-su':
        return <LichSu />;
      default:
        return <TongHop />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation trangHienTai={trangHienTai} setTrang={setTrangHienTai} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {renderTrang()}
      </main>
    </div>
  );
}

export default App;
