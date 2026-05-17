import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const Particles = ({ count = 200, active = true }) => {
  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const xSeed = seededRandom(i + 1);
      const ySeed = seededRandom(i + 101);
      const zSeed = seededRandom(i + 1001);
      const speedSeed = seededRandom(i + 10001);
      temp.push({
        position: [
          (xSeed - 0.5) * 10,
          ySeed * 10 + 5,
          (zSeed - 0.5) * 10,
        ],
        speed: 0.005 + speedSeed * 0.001,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!active || !mesh.current) return;
    const positions = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1];
      y -= particles[i].speed;
      if (y < -2) y = Math.random() * 10 + 5;
      positions[i * 3 + 1] = y;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      arr[i * 3] = p.position[0];
      arr[i * 3 + 1] = p.position[1];
      arr[i * 3 + 2] = p.position[2];
    });
    return arr;
  }, [particles, count]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;