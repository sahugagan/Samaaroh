import { Float, Icosahedron, MeshDistortMaterial, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function CoreOrb() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.35;
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1.2, 20]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#66e3ff"
          emissive="#176bff"
          emissiveIntensity={0.9}
          metalness={0.5}
          roughness={0.1}
          distort={0.45}
          speed={2.2}
        />
      </Icosahedron>
    </Float>
  );
}

function Ring() {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = clock.getElapsedTime() * 0.4;
    ringRef.current.rotation.x = 1.2 + Math.sin(clock.getElapsedTime()) * 0.1;
  });

  return (
    <mesh ref={ringRef} rotation={[1.2, 0, 0]}>
      <torusGeometry args={[2.1, 0.04, 16, 140]} />
      <meshStandardMaterial color="#8f7bff" emissive="#2f1fb8" emissiveIntensity={0.8} />
    </mesh>
  );
}

export default function ThreeHeroScene() {
  return (
    <div className="three-scene-wrap" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 3, 4]} intensity={2.2} color="#65d4ff" />
        <pointLight position={[-3, -2, -1]} intensity={1.2} color="#9a8dff" />
        <Stars radius={80} depth={35} count={2000} factor={3} fade speed={1.2} />
        <CoreOrb />
        <Ring />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.9} />
      </Canvas>
    </div>
  );
}
