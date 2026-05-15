
import React from 'react';
import { motion } from 'framer-motion';

const StudentStoryCard = ({ image, headline, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border"
    >
      <div className="aspect-[4/3] md:aspect-[16/9] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <img 
          src={image} 
          alt={headline}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {headline}
          </h3>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentStoryCard;
