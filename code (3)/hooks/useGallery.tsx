
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GalleryItem } from '../types';
import { INITIAL_GALLERY_ITEMS } from '../constants';

interface GalleryContextType {
  galleryItems: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      id: Date.now(), // Simple unique ID generation
      ...item,
    };
    setGalleryItems(prevItems => [newItem, ...prevItems]);
  };

  return (
    <GalleryContext.Provider value={{ galleryItems, addGalleryItem }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = (): GalleryContextType => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
