"use client";
import React, { useRef } from "react";
import { ModelPreviews } from "@/components/model-preview";
import * as THREE from "three";

const Logo3D = () => {
  const modelGroupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  // Fetch SVG content
  const svgData = `<svg width="312" height="260" viewBox="0 0 312 260" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M132 260L164 200L60 0H0L132 260Z" fill="#4E018F"/>
<path d="M184 132L256 0H312L244 132H184Z" fill="#5B88D9"/>
</svg>
`;

  return (
    <div className="sm:w-[32rem] sm:h-[32rem] w-48 h-48">
      <ModelPreviews
        svgData={svgData}
        depth={15}
        modelRotationY={0}
        modelGroupRef={modelGroupRef}
        modelRef={modelRef}
        bevelEnabled={true}
        bevelThickness={0.5}
        bevelSize={0.3}
        bevelSegments={3}
        isHollowSvg={false}
        spread={0}
        useCustomColor={false}
        customColor="#000000"
        roughness={0.5}
        metalness={0.7}
        clearcoat={0.3}
        transmission={0}
        envMapIntensity={1}
        backgroundColor="#ffffff00"
        useEnvironment={false}
        environmentPreset="studio"
        customHdriUrl=""
        autoRotate={true}
        autoRotateSpeed={8}
        useBloom={false}
        bloomIntensity={0}
        bloomMipmapBlur={false}
        isMobile={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </div>
  );
};

export default Logo3D;