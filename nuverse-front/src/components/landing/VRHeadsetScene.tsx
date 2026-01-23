"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

const BloomEffect = Bloom as any;
const VignetteEffect = Vignette as any;
const EffectComposerAny = EffectComposer as any;

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

    const circleTexture = useMemo(() => {
        if (typeof document === 'undefined') return null;
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.arc(16, 16, 14, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        return new THREE.CanvasTexture(canvas);
    }, []);

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
                map={circleTexture}
                transparent
                alphaTest={0.5}
                opacity={0.8}
                vertexColors
            />
        </points>
    );
}

const KEYFRAMES = [
    { t: 0.0, camPos: [0, 1, 8], modelRot: [0, 0, 0], scale: 10 },
    { t: 0.18, camPos: [0.2, 1.1, 7.8], modelRot: [0.02, 0.05, 0], scale: 10.2 },
    { t: 0.22, camPos: [-5, 1, 6], modelRot: [0, Math.PI * 0.5, 0], scale: 9 },
    { t: 0.38, camPos: [-5.2, 0.9, 5.8], modelRot: [0, Math.PI * 0.55, 0.05], scale: 9.2 },
    { t: 0.42, camPos: [2, -2, 7], modelRot: [0.2, Math.PI, 0], scale: 9 },
    { t: 0.58, camPos: [2.2, -1.8, 6.8], modelRot: [0.15, Math.PI * 1.05, 0], scale: 9.2 },
    { t: 0.62, camPos: [4, 1, 5], modelRot: [0, 0, 0], scale: 8.5 },
    { t: 0.78, camPos: [3, 0.8, 4], modelRot: [0, Math.PI, 0], scale: 9.5 },
    { t: 0.85, camPos: [0, 0, 2], modelRot: [0, Math.PI, 0], scale: 11 },
    { t: 0.92, camPos: [0, 0, 0.8], modelRot: [0, Math.PI, 0], scale: 12 },
    { t: 1.0, camPos: [0, 0, 0.0], modelRot: [0, Math.PI, 0], scale: 14 },
];

const scratchVecA = new THREE.Vector3();
const scratchVecB = new THREE.Vector3();
const scratchEuler = new THREE.Euler();

function interpolateKeyframes(progress: number, outPos: THREE.Vector3, outRot: THREE.Euler) {
    const t = Math.max(0, Math.min(1, progress));

    let prevFrame = KEYFRAMES[0];
    let nextFrame = KEYFRAMES[KEYFRAMES.length - 1];

    for (let i = 0; i < KEYFRAMES.length - 1; i++) {
        if (t >= KEYFRAMES[i].t && t <= KEYFRAMES[i + 1].t) {
            prevFrame = KEYFRAMES[i];
            nextFrame = KEYFRAMES[i + 1];
            break;
        }
    }

    const range = nextFrame.t - prevFrame.t;
    const localT = range === 0 ? 0 : (t - prevFrame.t) / range;

    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const smoothT = ease(localT);

    // Reuse vectors to avoid allocation
    scratchVecA.fromArray(prevFrame.camPos);
    scratchVecB.fromArray(nextFrame.camPos);
    outPos.copy(scratchVecA).lerp(scratchVecB, smoothT);

    outRot.set(
        THREE.MathUtils.lerp(prevFrame.modelRot[0], nextFrame.modelRot[0], smoothT),
        THREE.MathUtils.lerp(prevFrame.modelRot[1], nextFrame.modelRot[1], smoothT),
        THREE.MathUtils.lerp(prevFrame.modelRot[2], nextFrame.modelRot[2], smoothT)
    );

    const scale = THREE.MathUtils.lerp(prevFrame.scale, nextFrame.scale, smoothT);

    return scale;
}

function VRModel({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const modelRef = useRef<THREE.Group>(null);
    const { camera } = useThree();
    const { scene } = useGLTF("/models/oculus_quest_2.glb") as any;
    const targetPos = useMemo(() => new THREE.Vector3(), []);
    const targetRot = useMemo(() => new THREE.Euler(), []);

    useFrame((state) => {
        if (modelRef.current) {
            const progress = scrollProgress.get();
            // Mutates targetPos and targetRot in place
            const scale = interpolateKeyframes(progress, targetPos, targetRot);

            const time = state.clock.getElapsedTime();
            const floatY = Math.sin(time * 0.5) * 0.05;
            const floatRot = Math.cos(time * 0.3) * 0.02;

            modelRef.current.rotation.set(
                targetRot.x + floatRot,
                targetRot.y,
                targetRot.z
            );

            modelRef.current.position.y = floatY;
            modelRef.current.scale.setScalar(scale);

            camera.position.lerp(targetPos, 0.08);
            camera.lookAt(0, 0, 0);
        }
    });

    return (
        <group ref={modelRef}>
            {/* @ts-ignore */}
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

                {/* Environment Fog for depth */}
                <fog attach="fog" args={["#0a0f1f", 5, 40]} />

                {/* Post Processing Effects */}
                <EffectComposerAny disableNormalPass>
                    <BloomEffect luminanceThreshold={1} mipmapBlur intensity={0.4} radius={0.6} />
                    <VignetteEffect eskil={false} offset={0.1} darkness={0.5} />
                </EffectComposerAny>
            </Canvas>
        </div>
    );
}
