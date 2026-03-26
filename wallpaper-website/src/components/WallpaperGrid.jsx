import React, { useEffect, useRef } from 'react';
import WallpaperCard from './WallpaperCard';
import { Loader2 } from 'lucide-react';
import './WallpaperGrid.css';

const WallpaperGrid = ({ wallpapers, onImageClick, onLoadMore, isLoading, hasMore }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <div className="container masonry-wrapper">
      <div className="masonry-grid">
        {wallpapers.map((wallpaper, index) => (
          <WallpaperCard 
            key={`${wallpaper.id}-${index}`} 
            wallpaper={wallpaper} 
            index={index}
            onClick={() => onImageClick(wallpaper)}
          />
        ))}
      </div>
      
      {wallpapers.length > 0 && hasMore && (
        <div className="infinite-loader" ref={loaderRef}>
          {isLoading && <Loader2 className="spinner" size={32} />}
        </div>
      )}
      
      {wallpapers.length === 0 && !isLoading && (
        <div className="no-results">
          <h3>No matches found</h3>
          <p>Try adjusting your search or category filter to discover more Wallpapers.</p>
        </div>
      )}
      
      {isLoading && wallpapers.length === 0 && (
        <div className="initial-loader">
          <Loader2 className="spinner" size={48} />
          <p>Fetching stunners...</p>
        </div>
      )}
    </div>
  );
};

export default WallpaperGrid;
