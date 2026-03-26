export const fetchWallpapers = async ({ page = 1, category = "All", query = "" }) => {
  let apiUrl = `https://wallhaven.cc/api/v1/search?page=${page}`;
  
  let searchTerms = [];
  if (category !== "All") {
    searchTerms.push(category);
  }
  if (query.trim() !== "") {
    searchTerms.push(query.trim());
  }
  
  if (searchTerms.length > 0) {
    apiUrl += `&q=${encodeURIComponent(searchTerms.join(' '))}&sorting=relevance`;
  } else {
    // If no search query, show the popular mix of wallpapers
    apiUrl += `&sorting=toplist`;
  }

  // Use a public CORS proxy to guarantee it works without requiring you to restart Vite correctly
  const url = `https://corsproxy.io/?url=${encodeURIComponent(apiUrl)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch wallpapers");
    }
    const data = await response.json();
    
    if (!data || !data.data || !Array.isArray(data.data)) {
        return [];
    }

    return data.data.map(item => ({
      id: item.id,
      title: `Wallpaper ${item.id}`,
      author: item.source && String(item.source).startsWith('http') ? new URL(item.source).hostname.replace('www.', '') : 'Anonymous',
      url: item.path, 
      thumb: item.path, // Revert to highest resolution, will use async decoding to eliminate browser main-thread lag
      category: item.category || 'General',
      downloads: (item.views || 0).toLocaleString() + ' Views',
      ratio: item.ratio // Native aspect ratio
    }));
  } catch (error) {
    console.error("API Error during fetchWallpapers execution:", error);
    return [];
  }
};
