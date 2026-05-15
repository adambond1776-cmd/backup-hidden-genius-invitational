
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = () => {
  // 30 days from May 12, 2026 -> June 11, 2026
  const targetDate = new Date('2026-06-11T23:59:59').getTime();
  
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isExpired: false
    };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (timeLeft.isExpired) {
    return (
      <div className="text-center p-6 border-2 border-primary/50 bg-primary/10 rounded-xl">
        <p className="text-2xl font-bold text-primary uppercase tracking-widest">
          Application Closed
        </p>
      </div>
    );
  }
  
  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds }
  ];
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-primary font-bold tracking-widest uppercase text-sm mb-2">
        Application Deadline
      </div>
      <div className="flex gap-3 md:gap-6 justify-center">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="bg-card border border-border shadow-lg shadow-black/20 rounded-lg p-3 md:p-5 min-w-[70px] md:min-w-[90px] text-center">
              <span className="text-3xl md:text-5xl font-black text-foreground tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-xs md:text-sm font-semibold text-muted-foreground mt-3 uppercase tracking-wider">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
