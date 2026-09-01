import React, { useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'; // Need to install this, or just use useLayoutEffect

gsap.registerPlugin(ScrollTrigger);

interface ScrollCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  index?: number;
}

export const ScrollCard: React.FC<ScrollCardProps> = ({ children, className = '', onClick, index = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // GSAP Scroll Reveal
  useGSAP(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%", // Reveal when top of card hits 90% of viewport
          toggleActions: "play none none none"
        },
        delay: index * 0.1
      }
    );
  }, { scope: containerRef });

  // Framer Motion 3D Parallax Tilt (GSAP can do this too, but framer is great for mouse tracking)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 opacity-0 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div 
        style={{ transform: "translateZ(20px)" }} 
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
};
