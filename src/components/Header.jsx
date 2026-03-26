import React from 'react';
import { Sun, Moon, Hexagon } from 'lucide-react';
import './Header.css';

const Header = ({ isDark, toggleTheme }) => {
  return (
    <header className="header glass">
      <div className="container header-content">
        <div className="logo-group">
          <div className="logo-icon">
            <Hexagon size={24} strokeWidth={2.5} />
          </div>
          <span className="logo-text">Nexus</span>
        </div>

        <div className="header-status">
          <div className="status-dot"></div>
          <span className="status-text">Live Sync • Wallhaven Datastream</span>
        </div>

        <div className="actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
