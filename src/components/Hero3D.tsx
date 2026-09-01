import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface SocialItem {
  id: string;
  name: string;
  color: string;
  metric: string;
  tag: string;
  delta: string;
}

const SOCIALS: SocialItem[] = [
  { id: 'x', name: 'X / Twitter', color: '#0F1419', metric: '4.8M reach', tag: 'Anomaly Flagged', delta: '+34%' },
  { id: 'telegram', name: 'Telegram', color: '#229ED9', metric: '1.2M msgs', tag: 'Cluster Ring', delta: 'High sync' },
  { id: 'reddit', name: 'Reddit', color: '#FF4500', metric: '890k posts', tag: 'Sentiment Shift', delta: '+52%' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000', metric: '3.4M views', tag: 'Velocity Spike', delta: '3.8x' },
  { id: 'instagram', name: 'Instagram', color: '#E4405F', metric: '2.1M engage', tag: 'Viral Seed', delta: '+88%' },
  { id: 'facebook', name: 'Facebook', color: '#1877F2', metric: '1.7M shares', tag: 'Network Node', delta: 'Active' },
];

// Global mouse state shared with R3F frame loop
const globalMouse = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
};

if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    // Normalized to [-1, 1]
    globalMouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    globalMouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });
}

// --------------------------------------------------------
// The Synapse Stream: Data lines flowing from nodes to core
// --------------------------------------------------------
const SynapseStream = ({ cardRef, color, index }: { cardRef: React.RefObject<THREE.Group>, color: string, index: number }) => {
  const lineRef = useRef<THREE.Line>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  
  // The central intelligence core position
  const nexusPos = useMemo(() => new THREE.Vector3(0, 0, -3), []);
  
  useFrame((state) => {
    if (!cardRef.current || !lineRef.current || !pulseRef.current) return;
    
    const start = cardRef.current.position;
    // Calculate a control point to make the line curve elegantly in 3D space
    const mid = new THREE.Vector3().addVectors(start, nexusPos).multiplyScalar(0.5);
    
    // Push the curve outward to give volume and avoid crossing the center directly
    const curvePushX = (index % 2 === 0 ? 1 : -1) * 2.5;
    const curvePushY = (index < 3 ? 1 : -1) * 1.5;
    mid.x += curvePushX;
    mid.y += curvePushY;
    mid.z -= 1.5;
    
    const curve = new THREE.QuadraticBezierCurve3(start, mid, nexusPos);
    const points = curve.getPoints(24);
    
    lineRef.current.geometry.setFromPoints(points);
    
    // Animate data packet (pulse) flowing from card to nexus
    const speed = 0.45;
    const offset = index * 0.18;
    const t = (state.clock.elapsedTime * speed + offset) % 1;
    const pulsePos = curve.getPointAt(t);
    
    pulseRef.current.position.copy(pulsePos);
    
    // Fade pulse scale at start and end for smooth entry/exit
    const scale = Math.sin(t * Math.PI) * 1.2;
    pulseRef.current.scale.setScalar(scale);
  });

  return (
    <group>
      <line ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color={color} transparent opacity={0.25} linewidth={1} />
      </line>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
        {/* Glow halo for the pulse */}
        <mesh>
           <sphereGeometry args={[0.08, 16, 16]} />
           <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
      </mesh>
    </group>
  );
};


// --------------------------------------------------------
// The Social Intelligence Node (Floating Card)
// --------------------------------------------------------
const SpatialNode = ({
  position,
  rotation,
  social,
  index,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  social: SocialItem;
  index: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position]);
  const explodeDir = useMemo(() => {
    const dir = initialPos.clone().normalize();
    dir.x *= 1.35;
    dir.y *= 0.9;
    dir.z *= 0.6;
    return dir;
  }, [initialPos]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    globalMouse.x += (globalMouse.targetX - globalMouse.x) * 0.08;
    globalMouse.y += (globalMouse.targetY - globalMouse.y) * 0.08;

    const t = state.clock.elapsedTime;
    const pointerDist = Math.sqrt(globalMouse.x ** 2 + globalMouse.y ** 2);
    
    // 1. Organic gentle sinusoidal floating
    const floatX = Math.sin(t * 0.9 + index * 1.6) * 0.12;
    const floatY = Math.cos(t * 0.8 + index * 1.4) * 0.16;
    const floatZ = Math.sin(t * 0.6 + index * 0.8) * 0.1;

    // 2. Cursor repulsion & gentle dismantling effect
    const dismantleFactor = Math.min(0.55, pointerDist * 0.65);
    const mouseShiftX = globalMouse.x * 0.25;
    const mouseShiftY = globalMouse.y * 0.2;

    const targetPos = initialPos.clone()
      .add(explodeDir.clone().multiplyScalar(dismantleFactor))
      .add(new THREE.Vector3(floatX + mouseShiftX, floatY + mouseShiftY, floatZ));

    groupRef.current.position.lerp(targetPos, 0.06);
    
    // 3. Tilting & Parallax Rotation
    const targetRotX = rotation[0] + Math.sin(t * 0.5 + index) * 0.05 - globalMouse.y * 0.12;
    const targetRotY = rotation[1] + Math.cos(t * 0.5 + index) * 0.05 + globalMouse.x * 0.12;
    const targetRotZ = rotation[2] + Math.sin(t * 0.4 + index * 2) * 0.02;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.06);
  });

  const streamColor = social.color === '#0F1419' ? '#86868B' : social.color;

  return (
    <>
      <group ref={groupRef} position={position} rotation={rotation}>
        <Html transform distanceFactor={4.5} center zIndexRange={[40, 0]}>
          <div 
            className="group select-none cursor-pointer rounded-[20px] p-3 flex items-center gap-3 transition-all duration-300 hover:scale-105"
            style={{
              width: '188px',
              background: 'rgba(255, 255, 255, 0.82)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.07), 0 0 0 1px rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 1)',
            }}
          >
            {/* Icon Container with subtle brand color glow */}
            <div 
              className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: `0 4px 12px -2px ${social.color}25, 0 0 0 1px rgba(0,0,0,0.04)`,
              }}
            >
              <img 
                src={`/icons/${social.id}.svg`} 
                alt={social.name} 
                className="w-4.5 h-4.5 object-contain"
                style={{
                  filter: social.id === 'x' ? 'none' : `drop-shadow(0 1px 3px ${social.color}30)`,
                }} 
              />
            </div>

            {/* Card Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[12px] font-bold text-[#1D1D1F] tracking-tight truncate">
                  {social.name}
                </span>
                <span 
                  className="text-[8.5px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: `${social.color}15`,
                    color: social.color === '#0F1419' ? '#1D1D1F' : social.color,
                  }}
                >
                  {social.delta}
                </span>
              </div>
              <div className="flex items-center justify-between text-[9.5px] text-[#86868B]">
                <span className="font-semibold text-[#1D1D1F]/70">{social.metric}</span>
                <span className="text-[8.5px] text-[#0071E3] font-semibold truncate">{social.tag}</span>
              </div>
            </div>
          </div>
        </Html>
      </group>
      {/* 3D Line Stream connecting this node to the central core */}
      <SynapseStream cardRef={groupRef} color={streamColor} index={index} />
    </>
  );
};


// --------------------------------------------------------
// The Intelligence Core (Central processing nexus)
// --------------------------------------------------------
const IntelligenceNexus = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Slow majestic rotation
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
    
    // Subtle parallax reaction to mouse
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, globalMouse.x * 0.3, 0.05);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, globalMouse.x * 0.1, 0.05);
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {/* Outer Holographic Grid Sphere */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#0071E3" wireframe transparent opacity={0.06} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* Mid-layer Geometric Lattice */}
      <mesh>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#7928CA" wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* Deep Glowing Core Engine */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#43BFEA" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Outer Core Aura */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#0071E3" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};


const IntelligenceEcosystem = () => {
  // Balanced 6-node perimeter ecosystem
  const nodes = useMemo(() => {
    const layout: Array<{ position: [number, number, number]; rotation: [number, number, number]; social: SocialItem }> = [
      // Left Column (Top, Mid, Bottom)
      { position: [-3.35, 1.25, 0.05], rotation: [0.03, 0.12, -0.02], social: SOCIALS[0] }, // X
      { position: [-3.65, -0.2, 0.15], rotation: [-0.02, 0.14, -0.01], social: SOCIALS[2] }, // Reddit
      { position: [-2.95, -1.65, 0.05], rotation: [-0.04, 0.1, 0.02], social: SOCIALS[4] }, // Instagram

      // Right Column (Top, Mid, Bottom)
      { position: [3.35, 1.25, 0.05], rotation: [0.03, -0.12, 0.02], social: SOCIALS[1] }, // Telegram
      { position: [3.65, -0.2, 0.15], rotation: [-0.02, -0.14, 0.01], social: SOCIALS[3] }, // YouTube
      { position: [2.95, -1.65, 0.05], rotation: [-0.04, -0.1, -0.02], social: SOCIALS[5] }, // Facebook
    ];
    return layout;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      <IntelligenceNexus />
      
      {nodes.map((node, i) => (
        <SpatialNode key={i} {...node} index={i} />
      ))}
      
      {/* Ambient Data Noise (The "Noise" being filtered) */}
      <Sparkles count={600} scale={18} size={1.2} speed={0.3} opacity={0.12} color="#86868B" />
      <Sparkles count={200} scale={12} size={2} speed={0.5} opacity={0.2} color="#0071E3" />
    </group>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none h-screen w-full overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 6.5], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={0.6} />
        <IntelligenceEcosystem />
      </Canvas>
    </div>
  );
};