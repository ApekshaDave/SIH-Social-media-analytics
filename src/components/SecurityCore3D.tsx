import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { UserRole } from '../types';

interface SecurityCore3DProps {
  role: UserRole;
  isAuthenticating: boolean;
}

// Global mouse tracker for the security core
const localMouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    localMouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    localMouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });
}

// --------------------------------------------------------
// Cryptographic Ring Layer
// --------------------------------------------------------
const CipherRing = ({
  radius,
  tube,
  color,
  speed,
  rotationAxis,
  isAuthenticating,
}: {
  radius: number;
  tube: number;
  color: string;
  speed: number;
  rotationAxis: [number, number, number];
  isAuthenticating: boolean;
}) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const currentSpeed = isAuthenticating ? speed * 6 : speed;
    ringRef.current.rotation.x += rotationAxis[0] * currentSpeed * 0.02;
    ringRef.current.rotation.y += rotationAxis[1] * currentSpeed * 0.02;
    ringRef.current.rotation.z += rotationAxis[2] * currentSpeed * 0.02;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, tube, 16, 64]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={isAuthenticating ? 0.8 : 0.35}
      />
    </mesh>
  );
};

// --------------------------------------------------------
// Orbiting Cryptographic Security Nodes
// --------------------------------------------------------
const SecurityNode = ({
  label,
  angle,
  radius,
  color,
  isAuthenticating,
}: {
  label: string;
  angle: number;
  radius: number;
  color: string;
  isAuthenticating: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * (isAuthenticating ? 1.5 : 0.4) + angle;
    groupRef.current.position.x = Math.cos(t) * radius;
    groupRef.current.position.y = Math.sin(t * 0.7) * (radius * 0.4);
    groupRef.current.position.z = Math.sin(t) * (radius * 0.8);
  });

  return (
    <group ref={groupRef}>
      {/* Node Glowing Bead */}
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* HTML Floating Badge */}
      <Html transform distanceFactor={5} center zIndexRange={[30, 0]}>
        <div 
          className="select-none px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase backdrop-blur-xl border transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xs"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: `${color}40`,
            color: color,
            boxShadow: `0 2px 8px ${color}20`,
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
};

// --------------------------------------------------------
// Central Quantum Sentinel Core
// --------------------------------------------------------
const SentinelCore = ({
  role,
  isAuthenticating,
}: {
  role: UserRole;
  isAuthenticating: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const latticeRef = useRef<THREE.Mesh>(null);

  const themeColor = role === 'analyst' ? '#007AFF' : '#34C759';
  const secondaryColor = role === 'analyst' ? '#5B8DF6' : '#22C55E';

  useFrame((state) => {
    if (!groupRef.current || !coreRef.current || !latticeRef.current) return;

    // Mouse parallax
    localMouse.x += (localMouse.targetX - localMouse.x) * 0.08;
    localMouse.y += (localMouse.targetY - localMouse.y) * 0.08;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -localMouse.y * 0.35,
      0.06
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      localMouse.x * 0.35,
      0.06
    );

    const t = state.clock.elapsedTime;
    const spinMult = isAuthenticating ? 4 : 1;

    coreRef.current.rotation.y = t * 0.8 * spinMult;
    coreRef.current.rotation.z = Math.sin(t * 0.5) * 0.4;

    latticeRef.current.rotation.x = -t * 0.6 * spinMult;
    latticeRef.current.rotation.y = -t * 0.4 * spinMult;

    const pulseScale = isAuthenticating
      ? 1 + Math.sin(t * 12) * 0.15
      : 1 + Math.sin(t * 2) * 0.04;
    groupRef.current.scale.setScalar(pulseScale);
  });

  return (
    <group ref={groupRef}>
      {/* 1. Outer Gyroscope Rings */}
      <CipherRing
        radius={1.8}
        tube={0.015}
        color={themeColor}
        speed={1}
        rotationAxis={[1, 0.4, 0.2]}
        isAuthenticating={isAuthenticating}
      />
      <CipherRing
        radius={1.4}
        tube={0.015}
        color={secondaryColor}
        speed={-1.2}
        rotationAxis={[0.2, 1, 0.5]}
        isAuthenticating={isAuthenticating}
      />
      <CipherRing
        radius={1.05}
        tube={0.012}
        color={themeColor}
        speed={1.6}
        rotationAxis={[0.5, 0.3, 1]}
        isAuthenticating={isAuthenticating}
      />

      {/* 2. Geometric Core Lattice (Octahedron / Icosahedron) */}
      <mesh ref={latticeRef}>
        <octahedronGeometry args={[0.75, 0]} />
        <meshBasicMaterial
          color={themeColor}
          wireframe
          transparent
          opacity={isAuthenticating ? 0.9 : 0.45}
        />
      </mesh>

      {/* 3. Inner Glowing Quantum Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshBasicMaterial
          color={isAuthenticating ? '#FFFFFF' : themeColor}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 4. Core Light Pulse Aura */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial
          color={themeColor}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 5. Orbiting Security Telemetry Badges */}
      <SecurityNode
        label="AES-256"
        angle={0}
        radius={2.1}
        color={themeColor}
        isAuthenticating={isAuthenticating}
      />
      <SecurityNode
        label="FIPS-140-3"
        angle={(Math.PI * 2) / 3}
        radius={2.0}
        color={secondaryColor}
        isAuthenticating={isAuthenticating}
      />
      <SecurityNode
        label="DPDP-2023"
        angle={(Math.PI * 4) / 3}
        radius={2.2}
        color={themeColor}
        isAuthenticating={isAuthenticating}
      />

      {/* 6. Cryptographic Ambient Particles */}
      <Sparkles
        count={isAuthenticating ? 300 : 120}
        scale={6}
        size={isAuthenticating ? 2.5 : 1.5}
        speed={isAuthenticating ? 1.5 : 0.4}
        opacity={0.35}
        color={themeColor}
      />
    </group>
  );
};

export const SecurityCore3D: React.FC<SecurityCore3DProps> = ({ role, isAuthenticating }) => {
  return (
    <div className="w-full h-80 sm:h-96 relative overflow-hidden rounded-3xl">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <SentinelCore role={role} isAuthenticating={isAuthenticating} />
        </Float>
      </Canvas>
    </div>
  );
};
