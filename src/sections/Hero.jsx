import { words} from "../constants/index.js";
import Button from "../components/Button.jsx";
import HeroExperience from "../components/hero_models/HeroExperience.jsx";
import HeroVariantSwitcher from "../components/HeroVariantSwitcher.jsx";
import { useGSAP} from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState, useEffect } from "react";
import AnimatedCounter from "../components/AnimatedCounter.jsx";
import useInViewOnce from "../hooks/useInViewOnce.js";

const Hero = () => {
    const { targetRef, hasBeenVisible } = useInViewOnce({ rootMargin: "200px 0px" });
    const heroRef = useRef(null);
    const [heroIsVisible, setHeroIsVisible] = useState(true);

    const [variant, setVariant] = useState(() => {
        try { return localStorage.getItem("heroVariant") || "galaxy"; }
        catch { return "galaxy"; }
    });
    useEffect(() => {
        try { localStorage.setItem("heroVariant", variant); } catch { /* ignore */ }
    }, [variant]);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => setHeroIsVisible(entry.isIntersecting),
            { threshold: 0.05 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useGSAP(() =>{
        gsap.fromTo('.hero-text h1',
            {
                y:50,
                opacity:0
            },
            {
                y:0,
                opacity:1,
                stagger: 0.2,
                duration:1,
                ease: 'power2.inOut'
            }
            )
    }, { scope: heroRef, dependencies: [] })


    return (
        <section id="hero" ref={heroRef} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 z-10">
                <img src="/images/bg.png" alt="" width={418} height={327} />
            </div>
            <div className= "hero-layout">
                {/*LEFT: HERO CONTENT */}
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                    <div className="flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>
                                Shaping
                                <span className="slide">
                                    <span className= "wrapper">
                                        {words.map((word, i) => (
                                            <span key={`${word.text}-${i}`} className="flex items-center md:gap-3 gap-1 pb-2">
                                                <img src={word.imgPath}
                                                     alt={word.text}
                                                     className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                                />

                                                <span> {word.text} </span>
                                            </span>
                                        ))}
                                    </span>

                                </span>
                            </h1>
                            <h1>into Real Solutions</h1>
                            <h1>Through Code & Curiosity</h1>
                        </div>

                        <p className= "text-white-50 md:text-xl relative z-10 pointer-events-none">
                            Hi, I'm Krishna, a developer based in India with a passion for code.
                        </p>

                        <Button className="md:w-80 md:h-16 w-60 h-12"
                                id="button"
                                text="See my Work"
                        />
                    </div>
                </header>

                {/*RIGHT: 3D Model */}
                <figure aria-hidden="true">
                    <div ref={targetRef} className="hero-3d-layout">
                        {hasBeenVisible ? <HeroExperience isVisible={heroIsVisible} variant={variant} /> : null}
                    </div>
                </figure>
            </div>

            <AnimatedCounter />

            <HeroVariantSwitcher value={variant} onChange={setVariant} />
        </section>
    )
}
export default Hero
