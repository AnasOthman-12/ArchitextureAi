
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { useGallery } from '../hooks/useGallery';
import { GalleryItem } from '../types';

const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg group"
    >
      <motion.img
        src={item.before}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.img
        src={item.after}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <span className="absolute top-2 left-2 bg-black/50 px-2 py-1 text-xs font-bold rounded-full transition-opacity duration-300 opacity-100 group-hover:opacity-0">
          BEFORE
        </span>
        <span className="absolute top-2 left-2 bg-brand-gold/80 text-black px-2 py-1 text-xs font-bold rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          AFTER
        </span>
        <p className="text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          {item.prompt}
        </p>
      </div>
    </motion.div>
  );
};

const GalleryPage: React.FC = () => {
  const { galleryItems } = useGallery();

  return (
    <PageWrapper className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold">Our Work</h1>
        <p className="mt-4 text-lg text-brand-gray max-w-2xl mx-auto">
          Explore a selection of AI-generated renderings, including your own. Hover over an image to see the transformation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GalleryCard item={item} />
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default GalleryPage;
