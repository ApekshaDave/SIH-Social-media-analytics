import React, { useState, useEffect, useRef } from 'react';

export const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const loadScripts = async () => {
      // Inject Three.js
      if (!document.getElementById('three-script')) {
        const threeScript = document.createElement('script');
        threeScript.id = 'three-script';
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        document.body.appendChild(threeScript);
        await new Promise((resolve) => threeScript.onload = resolve);
        
        // Inject Vanta
        const vantaScript = document.createElement('script');
        vantaScript.id = 'vanta-script';
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js';
        document.body.appendChild(vantaScript);

        await new Promise((resolve) => vantaScript.onload = resolve);
      } else {
        // If they already exist, just ensure Vanta is ready.
        if (!(window as any).VANTA) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      if (isMounted && !vantaEffect && vantaRef.current && (window as any).VANTA) {
        setVantaEffect(
          (window as any).VANTA.FOG({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0xd6e4ff,
            midtoneColor: 0xf3e8ff,
            lowlightColor: 0xffedd5,
            baseColor: 0xfbfbfd,
            blurFactor: 0.85,
            speed: 0.8,
            zoom: 0.9
          })
        );
      }
    };

    loadScripts();

    return () => {
      isMounted = false;
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="fixed inset-0 z-0 pointer-events-none" />;
};
