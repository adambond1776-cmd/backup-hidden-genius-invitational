
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FeatureCard = ({ image, icon: Icon, title, description, ctaText, ctaLink, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
        {image && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          {Icon && (
            <div className="mb-4">
              <Icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </div>
          )}
          <CardTitle className="text-2xl font-semibold leading-snug">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription className="text-base leading-relaxed text-foreground/80">
            {description}
          </CardDescription>
        </CardContent>
        {ctaText && ctaLink && (
          <CardFooter className="mt-auto">
            <Button 
              asChild 
              className="w-full transition-all duration-200 active:scale-[0.98]"
            >
              <a href={ctaLink} target="_blank" rel="noopener noreferrer">
                {ctaText}
              </a>
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
