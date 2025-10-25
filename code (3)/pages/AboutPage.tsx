
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { TESTIMONIALS, FAQ_ITEMS } from '../constants';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FaqItem: React.FC<{ item: typeof FAQ_ITEMS[0] }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-stone dark:border-gray-700 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-medium">{item.question}</h3>
        {isOpen ? <FiChevronUp className="w-5 h-5 text-brand-gold" /> : <FiChevronDown className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-brand-gray">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="px-12"
        >
          <p className="text-xl italic">"{TESTIMONIALS[currentIndex].quote}"</p>
          <p className="mt-4 font-bold text-brand-gold">{TESTIMONIALS[currentIndex].name}</p>
          <p className="text-sm text-brand-gray">{TESTIMONIALS[currentIndex].company}</p>
        </motion.div>
      </AnimatePresence>
      <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20">&lt;</button>
      <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20">&gt;</button>
    </div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <PageWrapper className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold">About Architexture.AI</h1>
        <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">
          We are a team of architects, designers, and AI engineers dedicated to revolutionizing architectural visualization.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <motion.img 
          src="https://picsum.photos/seed/about/600/700" 
          alt="Architectural detail" 
          className="rounded-lg shadow-lg w-full h-full object-cover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-brand-gray mb-4">
            Our mission is to empower creators by providing instant, intelligent, and inspiring visualization tools. We believe that by harnessing the power of artificial intelligence, we can break down the barriers of time and cost, allowing for more creative freedom and faster design iteration.
          </p>
          <p className="text-brand-gray">
            Architexture.AI was born from the idea that every great design deserves to be seen in its best light, from the earliest concept to the final presentation.
          </p>
        </motion.div>
      </div>

      <div className="bg-brand-dark dark:bg-black/50 text-white py-20 my-20 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <TestimonialSlider />
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        {FAQ_ITEMS.map((item, index) => (
          <FaqItem key={index} item={item} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default AboutPage;
