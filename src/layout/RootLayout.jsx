import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='relative min-h-screen'>
      {/* Navbar */}
      <nav
        className='
          fixed top-0 left-0 h-16 z-50
          transition-all duration-300
          w-full
          '
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </nav>

      {/* Main Content */}
      <div className='transition-all duration-300 '>
        <main className='flex-grow pt-16'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
