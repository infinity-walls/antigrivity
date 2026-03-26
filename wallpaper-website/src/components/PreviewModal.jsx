import React, { useEffect, useState } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import './PreviewModal.css';

const PreviewModal = ({ wallpaper, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!wallpaper) return null;

  const handleDownload = async () => {
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>
        
        <div className="modal-image-container">
          <img src={wallpaper.url} alt={wallpaper.title} className="modal-image" decoding="async" />
        </div>
        
        <div className="modal-details">
          <div className="modal-info">
            <h2>{wallpaper.title}</h2>
            <p className="modal-author">by <strong>{wallpaper.author}</strong></p>
            <div className="modal-stats">
              <span>{wallpaper.category}</span>
              <span className="dot">•</span>
              <span>{wallpaper.downloads} Downloads</span>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="btn-primary" onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? <Loader2 className="spinner" size={20} /> : <Download size={20} />}
              <span>{isDownloading ? 'Downloading...' : 'Download Free'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
