import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import WallpaperGrid from './components/WallpaperGrid';
import PreviewModal from './components/PreviewModal';
import { categories } from './data/mockWallpapers';
import { fetchWallpapers } from './api';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [wallpapers, setWallpapers] = useState([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Theme Toggler
  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDark]);

  // Reset logic when search or category changes
  useEffect(() => {
    setWallpapers([]);
    setPage(1);
    setHasMore(true);
  }, [activeCategory, searchQuery]);

  // Fetch logic
  useEffect(() => {
    let isMounted = true;
    const loadWallpapers = async () => {
      setIsLoading(true);
      const newWallpapers = await fetchWallpapers({ page, category: activeCategory, query: searchQuery });
      
      if (isMounted) {
        if (newWallpapers.length === 0) {
          setHasMore(false);
        } else {
          setWallpapers(prev => page === 1 ? newWallpapers : [...prev, ...newWallpapers]);
        }
        setIsLoading(false);
      }
    };

    if (hasMore) {
      loadWallpapers();
    }

    return () => { isMounted = false; };
  }, [page, activeCategory, searchQuery]); // purposefully excluding hasMore wrapper from deps to prevent loop

  const toggleTheme = () => setIsDark(!isDark);
  
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) setPage(p => p + 1);
  }, [isLoading, hasMore]);

  return (
    <>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      
      <main>
        <Hero onSearch={setSearchQuery} />
        
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
        />
        
        <WallpaperGrid 
          wallpapers={wallpapers} 
          onImageClick={setSelectedWallpaper} 
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
          hasMore={hasMore}
        />
      </main>

      {selectedWallpaper && (
        <PreviewModal 
          wallpaper={selectedWallpaper} 
          onClose={() => setSelectedWallpaper(null)} 
        />
      )}
    </>
  );
}

export default App;
