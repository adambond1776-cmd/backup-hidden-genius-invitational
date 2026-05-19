
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewCard = ({ name, rating, review, date, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full rounded-xl bg-card hover:shadow-md transition-all duration-300">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{date}</p>
            </div>
            <Badge variant="secondary" className="shrink-0">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed text-foreground/90">{review}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReviewCard;
