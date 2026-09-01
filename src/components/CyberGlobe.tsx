import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

export const CyberGlobe = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#4F8EF7" />
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#8B5CF6" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Sphere ref={sphereRef} args={[2, 64, 64]} scale={1.8}>
        <MeshDistortMaterial
          color="#080C14"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </Sphere>

      {/* Inner glowing core */}
      <Sphere args={[1.7, 32, 32]} scale={1.8}>
        <meshBasicMaterial color="#4F8EF7" transparent opacity={0.05} />
      </Sphere>
    </>
  );
};
