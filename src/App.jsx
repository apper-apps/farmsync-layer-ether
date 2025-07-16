import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import MobileSidebar from "@/components/organisms/MobileSidebar";
import Dashboard from "@/components/pages/Dashboard";
import Fields from "@/components/pages/Fields";
import Crops from "@/components/pages/Crops";
import Tasks from "@/components/pages/Tasks";
import Weather from "@/components/pages/Weather";
import Reports from "@/components/pages/Reports";

function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <Router>
      <div className="flex h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        {/* Mobile Sidebar */}
        <MobileSidebar 
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={handleMobileMenuToggle} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/fields" element={<Fields />} />
              <Route path="/crops" element={<Crops />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          fontSize: "14px",
          padding: "12px 16px",
          borderRadius: "8px",
          minHeight: "48px"
        }}
      />
    </Router>
  );
}

export default App;