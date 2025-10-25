
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      <div className="relative h-[calc(100vh-80px)] flex items-center justify-center text-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <motion.div 
          className="relative z-10 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            Bring Your Architecture to Life
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
            Utilize the power of AI to generate stunning, photorealistic exterior renderings from your designs in minutes, not days.
          </p>
          <Link
            to="/render"
            className="inline-block bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-md text-lg hover:bg-brand-gold-light transition-transform transform hover:scale-105"
          >
            Start Rendering
          </Link>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
