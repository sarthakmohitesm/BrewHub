'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function CoffeeCup() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef} position={[0, -0.5, 0]}>
        {/* Cup body */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.7, 0.55, 1.2, 32]} />
          <meshStandardMaterial
            color="#f5e6d0"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        {/* Cup inside rim */}
        <mesh position={[0, 1.18, 0]}>
          <torusGeometry args={[0.68, 0.04, 8, 32]} />
          <meshStandardMaterial
            color="#e8c9a0"
            roughness={0.2}
            metalness={0.2}
          />
        </mesh>
        {/* Coffee liquid */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.63, 0.63, 0.1, 32]} />
          <meshStandardMaterial
            color="#2a1810"
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
        {/* Coffee foam / crema */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.02, 32]} />
          <meshStandardMaterial
            color="#c8a97e"
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Handle */}
        <mesh position={[0.85, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.25, 0.05, 8, 16, Math.PI]} />
          <meshStandardMaterial
            color="#f5e6d0"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        {/* Saucer */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 0.08, 32]} />
          <meshStandardMaterial
            color="#f5e6d0"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        {/* Saucer rim */}
        <mesh position={[0, -0.01, 0]}>
          <torusGeometry args={[1.0, 0.03, 8, 32]} />
          <meshStandardMaterial
            color="#e8c9a0"
            roughness={0.2}
            metalness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function CoffeeBean({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.5 + Math.random() * 0.5, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.7;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[0.12, 16, 8]} />
      <meshStandardMaterial
        color="#3d2e1f"
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}

function SteamParticle({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = ((state.clock.elapsedTime + delay) % 3) / 3;
      meshRef.current.position.y = position[1] + t * 2;
      meshRef.current.position.x = position[0] + Math.sin(t * Math.PI * 2 + delay) * 0.15;
      meshRef.current.scale.setScalar(Math.sin(t * Math.PI) * 0.15);
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = Math.sin(t * Math.PI) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0}
        roughness={1}
      />
    </mesh>
  );
}

export default function CoffeeScene() {
  return (
    <div className="w-full h-full" style={{ minHeight: '400px' }}>
      <Canvas
        camera={{ position: [0, 1.5, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffb84d" />
        <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#c8a97e" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#d4a853" />

        <CoffeeCup />

        {/* Floating beans */}
        <CoffeeBean position={[-2, 1, -1]} scale={1.2} />
        <CoffeeBean position={[2.2, 0.8, -0.5]} scale={0.9} />
        <CoffeeBean position={[-1.5, 1.8, 0.5]} scale={1.0} />
        <CoffeeBean position={[1.8, 1.5, 1]} scale={0.8} />
        <CoffeeBean position={[-2.5, 0.5, 0.8]} scale={1.1} />
        <CoffeeBean position={[2.8, 1.2, -1.5]} scale={0.7} />

        {/* Steam */}
        {Array.from({ length: 6 }).map((_, i) => (
          <SteamParticle
            key={i}
            position={[(Math.random() - 0.5) * 0.3, 1.3, (Math.random() - 0.5) * 0.3]}
            delay={i * 0.5}
          />
        ))}

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
