import React, { useState } from 'react';
import { Download, Heart, Loader2 } from 'lucide-react';
import './WallpaperCard.css';

const WallpaperCard = ({ wallpaper, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e) => {
    e.stopPropagation();
    setIsDownloading(true);
    try {
      const response = await fetch(wallpaper.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `AuraWalls-${wallpaper.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(wallpaper.url, '_blank');
    }
    setIsDownloading(false);
  };

  // Use native modern CSS aspect-ratio to instantly block out exact dimensions before load
  const aspectRatio = wallpaper.ratio ? `${wallpaper.ratio} / 1` : '16/9';

  return (
    <div className="wallpaper-card" onClick={onClick}>
      <div className="img-box" style={{ aspectRatio }}>
        {!isLoaded && <div className="img-placeholder animate-pulse"></div>}
        
        {/* Removed lazy-loading and async decoding to prevent browser from unloading off-screen images */}
        <img 
          src={wallpaper.thumb || wallpaper.url} 
          alt={wallpaper.title} 
          className={`wallpaper-img ${isLoaded ? 'loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      
      <div className="card-overlay glass">
        <div className="card-top">
          <span className="category-badge">{wallpaper.category}</span>
          <button 
            className="btn-icon btn-heart" 
            aria-label="Like"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Heart size={16} />
          </button>
        </div>
        
        <div className="card-bottom">
          <div className="author-info">
            <h3 className="img-title">{wallpaper.title}</h3>
            <span className="author-name">@ {wallpaper.author}</span>
          </div>
          <button 
            className="btn-icon btn-download" 
            aria-label="Download"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? <Loader2 size={18} className="spinner" /> : <Download size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;
