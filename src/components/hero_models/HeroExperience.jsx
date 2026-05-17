import React, { Suspense, useState, useEffect } from 'react'
import {Canvas} from "@react-three/fiber";
import {OrbitControls, useProgress, Html, AdaptiveDpr, AdaptiveEvents} from "@react-three/drei";
import {useMediaQuery} from "react-responsive";
import {Room} from "./Room.jsx";
import HeroLights from "./HeroLights.jsx";
import Particles from './Particles.jsx';

const Loader = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div style={{ color: '#fff', fontSize: '14px', fontFamily: 'sans-serif', textAlign: 'center' }}>
                <div style={{ marginBottom: '8px' }}>Loading {Math.round(progress)}%</div>
                <div style={{ width: '160px', height: '4px', background: '#333', borderRadius: '2px' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: '#a259ff', borderRadius: '2px', transition: 'width 0.3s' }} />
                </div>
            </div>
        </Html>
    );
};

const HeroExperience = ({ isVisible = true }) => {
    const isMobile = useMediaQuery({query: "(max-width: 768px)" });
    const isTablet = useMediaQuery({query: "(max-width: 1024px)" });
    const isLargeDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
    const [docVisible, setDocVisible] = useState(!document.hidden);

    useEffect(() => {
        const handleVisibility = () => setDocVisible(!document.hidden);
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    const isActive = isVisible && docVisible;

    return (
        <Canvas
            camera={{position: [0,0,15], fov:45}}
            dpr={isMobile ? [1, 1] : [1, 1.25]}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            frameloop={isActive ? "always" : "never"}
            performance={{ min: 0.6 }}
        >

            <OrbitControls
                enablePan={false}
                enableZoom={!isTablet}
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />

            <Suspense fallback={<Loader />}>
                <HeroLights />
                <Particles count={isMobile ? 35 : 60} active={isActive} />
                <group
                    scale={isMobile? 0.7 : 1}
                    position={[0,-3.5,0]}
                    rotation={[0, -Math.PI/4, 0]}
                >
                    <Room enableBloom={!isTablet && isLargeDesktop} />
                </group>
            </Suspense>

        </Canvas>
    )
}

export default HeroExperience
