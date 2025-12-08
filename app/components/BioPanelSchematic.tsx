"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Environment, ContactShadows } from "@react-three/drei";

// --- DATA: Your exact descriptions ---
const partDetailsData = {
  "MossLayer": {
    title: "Sphagnum Moss Bio-Filter",
    description: "Natural Sphagnum moss layer that traps fine particulates (PM2.5/PM10) and retains humidity."
  },
  "AlgaeLayer": {
    title: "Microalgae Culture (Spirulina)",
    description: "The photosynthetic engine. Absorbs CO2 and SO2, releasing clean Oxygen."
  },
  "PeltierUnit": {
    title: "Peltier Condensation Unit",
    description: "Solid-state cooling module (TEC1-12706) that harvests water from air humidity."
  },
  "WaterTank": {
    title: "Bio-Safe Water Reservoir",
    description: "40L HDPE container storing purified water for the closed-loop irrigation system."
  },
  "SolarSystem": {
    title: "Energy Subsystem",
    description: "20W Solar Panel + Sun Tracker + LiFePO4 Battery for complete autonomy."
  },
  "ControlUnit": {
    title: "AI/IoT Core",
    description: "ESP32 + Sensors. Runs the AI model to predict pollution hotspots."
  }
};

// --- COMPONENT: A reusable 'Lego Brick' ---
function Part({ position, size, color, name, label, selectedPart, onSelect }: any) {
  const mesh = useRef(null);
  const [hovered, setHover] = useState(false);
  
  // Is this part currently selected?
  const isSelected = selectedPart === name;

  // Animation: Pulse if selected
  useFrame((state) => {
    if (mesh.current) {
        // Subtle floating animation
        (mesh.current as any).position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
        // Scale up slightly if hovered or selected
        const targetScale = isSelected ? 1.05 : (hovered ? 1.02 : 1);
        (mesh.current as any).scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onClick={(e) => {
          e.stopPropagation(); // Stop click from hitting background
          onSelect(name);
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        {/* We use a BoxGeometry for everything to keep it simple "Digital Block" style */}
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color={isSelected ? "#ffaa00" : (hovered ? "#ffffff" : color)} 
          roughness={0.3}
          metalness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Floating Label */}
      {hovered && !isSelected && (
        <Text position={[0, size[1]/2 + 0.2, 0]} fontSize={0.15} color="white">
            {label}
        </Text>
      )}
    </group>
  );
}

// --- MAIN COMPONENT ---
export default function BioPanelSchematic() {
  const [selectedPart, setSelectedPart] = useState(null);

  // Close the detail panel
  const handleDeselect = () => setSelectedPart(null);

  return (
    <div className="relative w-full h-screen bg-slate-900">
      
      {/* 3D CANVAS */}
      <Canvas camera={{ position: [4, 2, 5], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        
        {/* Controls */}
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />

        {/* --- THE VIRTUAL MODEL (Built with code) --- */}
        <group position={[0, -0.5, 0]}>
            
            {/* 1. Solar Panel (Top) */}
            <Part 
                name="SolarSystem"
                label="Solar & Battery"
                position={[0, 2.8, -0.5]} 
                size={[2.5, 0.1, 1.5]} 
                color="#111111" 
                selectedPart={selectedPart} onSelect={setSelectedPart}
            />
            {/* Solar Stem */}
            <mesh position={[0, 2.2, -0.5]}>
                <cylinderGeometry args={[0.1, 0.1, 1.2]} />
                <meshStandardMaterial color="#555" />
            </mesh>

            {/* 2. Moss Layer (Front Face) */}
            <Part 
                name="MossLayer"
                label="Moss Layer"
                position={[0, 1, 0.6]} 
                size={[2, 2, 0.2]} 
                color="#2f855a" // Green
                selectedPart={selectedPart} onSelect={setSelectedPart}
            />

            {/* 3. Algae Layer (Behind Moss) */}
            <Part 
                name="AlgaeLayer"
                label="Algae Layer"
                position={[0, 1, 0.3]} 
                size={[2, 2, 0.2]} 
                color="#38b2ac" // Cyan/Green
                selectedPart={selectedPart} onSelect={setSelectedPart}
            />

            {/* 4. Frame / Case (Holding it all) */}
            <mesh position={[0, 1, 0]}>
                <boxGeometry args={[2.2, 2.2, 1]} />
                <meshStandardMaterial color="#2d3748" wireframe={true} />
            </mesh>

            {/* 5. Peltier Unit (Inside/Back) */}
            <Part 
                name="PeltierUnit"
                label="Condensation Unit"
                position={[0.5, 1, -0.2]} 
                size={[0.8, 0.8, 0.4]} 
                color="#a0aec0" // Grey
                selectedPart={selectedPart} onSelect={setSelectedPart}
            />

            {/* 6. Control Unit (Inside/Back) */}
            <Part 
                name="ControlUnit"
                label="AI Core"
                position={[-0.5, 1, -0.2]} 
                size={[0.5, 0.5, 0.2]} 
                color="#ed8936" // Orange
                selectedPart={selectedPart} onSelect={setSelectedPart}
            />

            {/* 7. Water Tank (Bottom) */}
            <Part 
                name="WaterTank"
                label="Water Reservoir"
                position={[0, -0.6, 0]} 
                size={[2.2, 0.8, 1]} 
                color="#3182ce" // Blue
                selectedPart={selectedPart} onSelect={setSelectedPart}
            />

        </group>

        {/* Floor Shadow */}
        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
      </Canvas>

      {/* --- UI OVERLAY (Tailwind) --- */}
      <div className="absolute top-0 left-0 p-6 pointer-events-none">
        <h1 className="text-4xl font-bold text-white tracking-tighter">BIO-DIGITAL<br/>PANEL V1</h1>
        <p className="text-blue-400 mt-2">Interactive Schematic</p>
      </div>

      {/* --- DETAIL SIDEBAR --- */}
      {selectedPart && (
        <div className="absolute top-0 right-0 h-full w-80 bg-black/80 backdrop-blur-md border-l border-white/10 p-6 flex flex-col justify-center animate-fade-in-right">
            <button 
                onClick={handleDeselect}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
                ✕ CLOSE
            </button>
            
            <div className="mb-4 text-blue-500 text-sm font-mono uppercase tracking-widest">
                Component Selected
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
                {partDetailsData[selectedPart as keyof typeof partDetailsData].title}
            </h2>
            
            <p className="text-gray-300 leading-relaxed">
                {partDetailsData[selectedPart as keyof typeof partDetailsData].description}
            </p>

            <div className="mt-8 p-4 bg-white/5 rounded border border-white/10">
                <div className="text-xs text-green-400 font-mono">STATUS: ONLINE</div>
                <div className="text-xs text-gray-500 font-mono mt-1">ID: {selectedPart}_001</div>
            </div>
        </div>
      )}
      
      {/* Instructions at bottom */}
      {!selectedPart && (
        <div className="absolute bottom-10 w-full text-center pointer-events-none">
            <p className="text-white/50 text-sm bg-black/50 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                Click on a component to view details • Drag to rotate
            </p>
        </div>
      )}
    </div>
  );
}
