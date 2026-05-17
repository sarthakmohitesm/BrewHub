'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function CoffeeCup() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} position={[0, -0.6, 0]}>
        
        {/* Cup body */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.7, 0.45, 1.2, 64]} />
          <meshStandardMaterial
            color="#111111"
            roughness={0.1}
            metalness={0.6}
            envMapIntensity={2}
          />
        </mesh>

        {/* Cup inside (to make it look hollow) */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.67, 0.43, 1.2, 64]} />
          <meshStandardMaterial
            color="#050505"
            roughness={0.5}
            metalness={0.1}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Cup outer gold rim */}
        <mesh position={[0, 1.18, 0]}>
          <torusGeometry args={[0.69, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#d4a853"
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={2}
          />
        </mesh>

        {/* Coffee liquid */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.05, 64]} />
          <meshStandardMaterial
            color="#1a0b02"
            roughness={0.1}
            metalness={0.8}
            envMapIntensity={1}
          />
        </mesh>

        {/* Coffee foam / crema ring */}
        <mesh position={[0, 1.06, 0]}>
          <torusGeometry args={[0.55, 0.1, 8, 64]} />
          <meshStandardMaterial
            color="#8c5a35"
            roughness={0.8}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Handle */}
        <mesh position={[0.78, 0.65, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <torusGeometry args={[0.35, 0.08, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#111111"
            roughness={0.1}
            metalness={0.6}
            envMapIntensity={2}
          />
        </mesh>

        {/* Handle gold trim (subtle line) */}
        <mesh position={[0.78, 0.65, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <torusGeometry args={[0.36, 0.015, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#d4a853"
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={2}
          />
        </mesh>

        {/* Saucer */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[1.2, 0.8, 0.1, 64]} />
          <meshStandardMaterial
            color="#111111"
            roughness={0.1}
            metalness={0.6}
            envMapIntensity={2}
          />
        </mesh>

        {/* Saucer indent */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.02, 64]} />
          <meshStandardMaterial
            color="#050505"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Saucer gold rim */}
        <mesh position={[0, 0.1, 0]}>
          <torusGeometry args={[1.18, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#d4a853"
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={2}
          />
        </mesh>

      </group>
    </Float>
  );
}

function CoffeeBean({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.2 + Math.random() * 0.3, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.8;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <capsuleGeometry args={[0.06, 0.1, 16, 16]} />
      <meshStandardMaterial
        color="#221105"
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  );
}

function SteamParticle({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = ((state.clock.elapsedTime * 0.4 + delay) % 3) / 3;
      meshRef.current.position.y = position[1] + t * 2.5;
      meshRef.current.position.x = position[0] + Math.sin(t * Math.PI * 3 + delay) * 0.2;
      meshRef.current.scale.setScalar(Math.sin(t * Math.PI) * 0.5);
      
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = Math.sin(t * Math.PI) * 0.12;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0}
        roughness={1}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function CoffeeScene() {
  return (
    <div className="w-full h-full" style={{ minHeight: '400px' }}>
      <Canvas
        camera={{ position: [0, 2.5, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 5]} intensity={2} color="#ffd7a0" />
        <directionalLight position={[-5, 5, -5]} intensity={1} color="#c8a97e" />
        <pointLight position={[0, 4, 0]} intensity={1.5} color="#d4a853" distance={10} />

        <CoffeeCup />

        {/* Floating beans */}
        <CoffeeBean position={[-1.8, 0.5, -1]} scale={1.2} />
        <CoffeeBean position={[1.8, 0.2, -0.5]} scale={0.9} />
        <CoffeeBean position={[-1.2, 1.2, 1]} scale={1.0} />
        <CoffeeBean position={[1.5, 1.0, 1.2]} scale={0.8} />
        <CoffeeBean position={[-2.2, 0.1, 0.8]} scale={1.1} />
        <CoffeeBean position={[2.2, 0.8, -1.2]} scale={0.7} />

        {/* Steam */}
        {Array.from({ length: 12 }).map((_, i) => (
          <SteamParticle
            key={i}
            position={[(Math.random() - 0.5) * 0.5, 1.2, (Math.random() - 0.5) * 0.5]}
            delay={i * 0.25}
          />
        ))}

        {/* City environment preset gives excellent reflections for dark glossy materials */}
        <Environment preset="city" />
        
        {/* Soft shadow on the invisible floor */}
        <ContactShadows position={[0, -1.2, 0]} opacity={0.5} scale={6} blur={2.5} far={3} color="#000000" />
      </Canvas>
    </div>
  );
}
