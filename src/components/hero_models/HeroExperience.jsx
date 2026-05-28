import { Suspense, useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMediaQuery } from "react-responsive";
import HeroLights from "./HeroLights.jsx";
import GalaxySpiral from "./GalaxySpiral.jsx";
import Workstation from "./Workstation.jsx";

const SCENES = {
    galaxy: GalaxySpiral,
    workstation: Workstation,
};

const HeroExperience = ({ isVisible = true, variant = "galaxy" }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    const isLargeDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
    const [docVisible, setDocVisible] = useState(!document.hidden);

    useEffect(() => {
        const handleVisibility = () => setDocVisible(!document.hidden);
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    const isActive = isVisible && docVisible;
    const enableBloom = !isTablet && isLargeDesktop && variant === "galaxy";
    const Scene = SCENES[variant] ?? GalaxySpiral;
    const enableAutoRotate = variant !== "workstation";

    return (
        <Canvas
            camera={{ position: [0, 0, 9], fov: 45 }}
            dpr={isMobile ? [1, 1] : [1, 1.25]}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            frameloop={isActive ? "always" : "never"}
            performance={{ min: 0.6 }}
        >
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate={enableAutoRotate}
                autoRotateSpeed={0.4}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
            />
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />

            <Suspense fallback={null}>
                <HeroLights />
                <Scene active={isActive} isMobile={isMobile} />
                {enableBloom && (
                    <EffectComposer multisampling={0}>
                        <Bloom
                            mipmapBlur
                            intensity={1.1}
                            luminanceThreshold={0.25}
                            luminanceSmoothing={0.85}
                        />
                    </EffectComposer>
                )}
            </Suspense>
        </Canvas>
    )
}

export default HeroExperience
