import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random so the galaxy is stable across renders (and pure).
const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// A slowly spinning spiral galaxy of particles, violet core fading to blue arms.
const GalaxySpiral = ({ active = true, isMobile = false }) => {
    const ref = useRef();
    const count = isMobile ? 1800 : 4500;
    const branches = 3;
    const radiusMax = 4;
    const spin = 1.1;
    const randomness = 0.4;
    const randomPow = 2.6;

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const inner = new THREE.Color("#d8b4fe");
        const outer = new THREE.Color("#2563eb");

        const scatter = (v, amp) => {
            const c = (v - 0.5) * 2;
            return Math.sign(c) * Math.pow(Math.abs(c), randomPow) * amp;
        };

        for (let i = 0; i < count; i++) {
            const r = Math.pow(seededRandom(i * 4 + 1), 1.5) * radiusMax;
            const branchAngle = ((i % branches) / branches) * Math.PI * 2;
            const spinAngle = r * spin;

            const rx = scatter(seededRandom(i * 4 + 2), randomness * r);
            const ry = scatter(seededRandom(i * 4 + 3), randomness * 0.5);
            const rz = scatter(seededRandom(i * 4 + 4), randomness * r);

            positions[i * 3] = Math.cos(branchAngle + spinAngle) * r + rx;
            positions[i * 3 + 1] = ry;
            positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + rz;

            const c = inner.clone().lerp(outer, r / radiusMax);
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }
        return { positions, colors };
    }, [count]);

    useFrame((_, delta) => {
        if (!active || !ref.current) return;
        ref.current.rotation.y += delta * 0.12;
    });

    return (
        <group rotation={[-0.5, 0, 0.15]} scale={isMobile ? 0.85 : 1}>
            <points ref={ref}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={count}
                        array={colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    sizeAttenuation
                    vertexColors
                    transparent
                    opacity={0.9}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
};

export default GalaxySpiral;
