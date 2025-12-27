import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarDays, BookOpen, Lightbulb, Settings, Newspaper, PartyPopper, UserCircle } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import CalendarManager from './pages/CalendarManager';
import StoryManager from './pages/StoryManager';
import TipManager from './pages/TipManager';
import FeatureManager from './pages/FeatureManager';
import NewsManager from './pages/NewsManager';
import FestivalManager from './pages/FestivalManager';
import UserProfile from './pages/UserProfile';

const Sidebar = () => (
  <aside className="sidebar">
    <h2>Valikkati Admin</h2>
    <nav>
      <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <LayoutDashboard size={20} /> Dashboard
      </NavLink>
      <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <Users size={20} /> Users
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <UserCircle size={20} /> User Profiles
      </NavLink>
      <NavLink to="/calendar" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <CalendarDays size={20} /> Calendar
      </NavLink>
      <NavLink to="/festivals" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <PartyPopper size={20} /> Festivals
      </NavLink>
      <NavLink to="/stories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <BookOpen size={20} /> Stories
      </NavLink>
      <NavLink to="/tips" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <Lightbulb size={20} /> Tips
      </NavLink>
      {/* Added new NavLink for Features */}
      <NavLink to="/features" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <Settings size={20} /> Features
      </NavLink>
      <NavLink to="/news" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <Newspaper size={20} /> News
      </NavLink>
    </nav>
  </aside>
);

function App() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/calendar" element={<CalendarManager />} />
          <Route path="/festivals" element={<FestivalManager />} />
          <Route path="/stories" element={<StoryManager />} />
          <Route path="/tips" element={<TipManager />} />
          {/* Added new Route for FeatureManager */}
          <Route path="/features" element={<FeatureManager />} />
          <Route path="/news" element={<NewsManager />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
