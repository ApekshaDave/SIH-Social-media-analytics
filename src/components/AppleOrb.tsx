import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

export const AppleOrb = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#007AFF" />
      <directionalLight position={[-10, -10, -5]} intensity={3} color="#AF52DE" />
      <directionalLight position={[0, 10, -10]} intensity={2} color="#FF9500" />
      
      <Environment preset="city" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[2.8, 128, 128]} position={[1, 0, -2]}>
          <MeshDistortMaterial
            color="#ffffff"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.0}
            metalness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.8}
            ior={1.5}
            thickness={2}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
        <Sphere args={[1.5, 64, 64]} position={[-3, -2, -5]}>
          <MeshDistortMaterial
            color="#ffffff"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.1}
            transmission={0.9}
            ior={1.4}
            thickness={1}
          />
        </Sphere>
      </Float>
    </>
  );
};
