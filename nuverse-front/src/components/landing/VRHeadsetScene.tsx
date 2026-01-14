"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useTransform, MotionValue } from "framer-motion";

// Particle system component
function Particles({ count = 3000 }) {
    const mesh = useRef<THREE.Points>(null);

    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color1 = new THREE.Color(0xffc1ac);
        const color2 = new THREE.Color(0x6366f1);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

            const mixColor = Math.random() > 0.5 ? color1 : color2;
            colors[i * 3] = mixColor.r;
            colors[i * 3 + 1] = mixColor.g;
            colors[i * 3 + 2] = mixColor.b;
        }

        return [positions, colors];
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y += 0.0002;
            mesh.current.rotation.x += 0.0001;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
                vertexColors
            />
        </points>
    );
}

// VR Headset model with scroll-based animation
function VRModel({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const modelRef = useRef<THREE.Group>(null);
    const { camera } = useThree();
    const { scene } = useGLTF("/models/oculus_quest_2.glb");

    useFrame(() => {
        if (modelRef.current) {
            const progress = scrollProgress.get();

            // Rotate model based on scroll
            modelRef.current.rotation.y = Math.PI * 0.25 + progress * Math.PI * 3;
            modelRef.current.rotation.x = Math.sin(progress * Math.PI) * 0.15;

            // Scale based on scroll
            const scale = 10 + Math.sin(progress * Math.PI) * 2; // Scale matched to Landing.js (~10)
            modelRef.current.scale.setScalar(scale);

            // Camera movement based on scroll
            const cameraZ = 8 - progress * 4;
            const cameraY = 1 + Math.sin(progress * Math.PI) * 2;
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraZ, 0.05);
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, cameraY, 0.05);
        }
    });

    return (
        <group ref={modelRef}>
            <primitive object={scene} />
        </group>
    );
}

// Main 3D Scene
interface VRHeadsetSceneProps {
    scrollProgress: MotionValue<number>;
}

export function VRHeadsetScene({ scrollProgress }: VRHeadsetSceneProps) {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas
                camera={{ position: [0, 1, 8], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 15, 10]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-10, -5, -10]} intensity={1} color="#ff4d6d" />
                <directionalLight position={[-15, 10, -10]} intensity={0.8} color="#ffc1ac" />
                <pointLight position={[0, 5, 0]} intensity={0.5} color="#6366f1" />

                {/* Particles */}
                <Particles count={3000} />

                {/* VR Headset */}
                <VRModel scrollProgress={scrollProgress} />

                {/* Controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.3}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 3}
                />

                {/* Environment */}
                <fog attach="fog" args={["#0a0f1f", 15, 100]} />
            </Canvas>
        </div>
    );
}
