
import React from 'react';
import { motion } from 'framer-motion';

const ToolkitCard = ({ number, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors duration-300 flex flex-col h-full"
    >
      <div className="text-primary font-black text-4xl mb-4 opacity-80">
        {String(number).padStart(2, '0')}
      </div>
      <h4 className="text-xl font-bold mb-3 text-foreground">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed mt-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default ToolkitCard;
