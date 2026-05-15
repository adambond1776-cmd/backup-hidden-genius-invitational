
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialQuote = ({ quote, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative pl-8 pr-8 md:pl-12 md:pr-12"
    >
      <Quote className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 text-primary/40 -scale-x-100" />
      <blockquote className="text-lg md:text-xl font-medium text-foreground/90 leading-relaxed italic">
        "{quote}"
      </blockquote>
      <Quote className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 text-primary/40" />
    </motion.div>
  );
};

export default TestimonialQuote;
