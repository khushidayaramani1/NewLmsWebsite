import SideBar from "./SideBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, UserCircle } from "lucide-react";

const Educator = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : "Dashboard";
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      
      {/* 1. Top Navigation Bar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <img 
            src="/favicon.svg" 
            alt="Logo" 
            className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          />
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Educator <span className="text-blue-600">Portal</span>
          </h1>
          <div className="h-5 w-[1px] bg-slate-300 hidden md:block"></div>
          <p className="text-sm font-medium text-slate-500 hidden md:block">
            {getPageTitle()}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition-all w-64"
            />
          </div>
          <button className="text-slate-500 hover:text-blue-600">
            <Bell size={20} />
          </button>
          <UserCircle size={28} className="text-slate-400" />
        </div>
      </header>

      {/* 2. Horizontal Navigation Menu */}
      <SideBar />

      {/* 3. THE CENTERED ZONE */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="w-full max-w-5xl transition-all duration-300 pt-8 sm:pt-12 md:pt-16">
          <div className="flex justify-center items-center w-full">
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
};

export default Educator;