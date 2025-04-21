"use client";
import React, { useRef } from "react";
import { ModelPreviews } from "@/components/model-preview";
import * as THREE from "three";

const Logo3D = () => {
  const modelGroupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  // Fetch SVG content
  const svgData = `<svg width="111" height="32" viewBox="0 0 111 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M70.2159 29.4318L73.5795 23.125L62.6477 2.10226H56.3409L70.2159 29.4318Z" fill="#4E018F"/>
<path d="M70.2159 29.4318L73.5795 23.125L62.6477 2.10226H56.3409L70.2159 29.4318Z" stroke="#4E018F"/>
<path d="M110.159 23.125H91.6591V28.5909H110.159V23.125Z" fill="#4E018F"/>
<path d="M110.159 23.125H91.6591V28.5909H110.159V23.125Z" stroke="#4E018F"/>
<path d="M110.159 13.0341H91.6591V18.5H110.159V13.0341Z" fill="#F9423A" stroke="#F9423A"/>
<path d="M110.159 2.52274H91.6591V7.98864H110.159V2.52274Z" fill="#FFC501" stroke="#FFC501"/>
<path d="M75.6818 15.9773L83.25 2.10226H89.1364L81.9886 15.9773H75.6818Z" fill="#5B88D9"/>
<path d="M75.6818 15.9773L83.25 2.10226H89.1364L81.9886 15.9773H75.6818Z" stroke="#5B88D9"/>
<path d="M39.9432 1.68182L26.0682 28.5909H32.7954L40.3636 14.2955L47.5114 28.5909H53.8182L39.9432 1.68182Z" fill="#F9423A" stroke="#F9423A"/>
<path d="M0.840912 8.4091V2.52274H16.3977C21.0651 2.52274 24.0728 7.10658 23.9659 11.7727C23.862 16.3131 20.9392 20.6023 16.3977 20.6023H6.72728V29.0114H0.840912V14.7159H15.1364C16.6502 14.7159 17.5605 13.2833 17.6591 11.7727C17.766 10.1342 16.7783 8.4091 15.1364 8.4091H0.840912Z" fill="#FFC501" stroke="#FFC501"/>
</svg>

`;

  return (
    <div className="w-96 h-96">
      <ModelPreviews
        svgData={svgData}
        depth={3}
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
        autoRotateSpeed={1}
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