import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import {techStackImgs} from "../constants";
// import { techStackImgs } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
    // Animate the tech cards in the skills section
    useGSAP(() => {
        // This animation is triggered when the user scrolls to the #skills wrapper
        // The animation starts when the top of the wrapper is at the center of the screen
        // The animation is staggered, meaning each card will animate in sequence
        // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
        // Skip it entirely for users who prefer reduced motion (cards stay in place, visible)
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(
                ".tech-card",
                {
                    // Initial values
                    y: 50, // Move the cards down by 50px
                    opacity: 0, // Set the opacity to 0
                },
                {
                    // Final values
                    y: 0, // Move the cards back to the top
                    opacity: 1, // Set the opacity to 1
                    duration: 1, // Duration of the animation
                    ease: "power2.inOut", // Ease of the animation
                    stagger: 0.2, // Stagger the animation by 0.2 seconds
                    scrollTrigger: {
                        trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
                        start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
                    },
                }
            );
        });
    }, []);

    return (
        <div id="skills" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="How I Can Contribute & My Key Skills"
                />
                <div className="tech-grid">
                    {/* Render image-based skill cards */}
                   {techStackImgs.map((techStackIcon, index) => (
                    <div
                        key={index}
                        className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
                    >
                        <div className="tech-card-animated-bg" />
                        <div className="tech-card-content">
                        <div className="tech-icon-wrapper">
                            <img
                                src={techStackIcon.imgPath}
                                alt=""
                                style={{ transform: `scale(${techStackIcon.iconScale || 1})` }}
                            />
                        </div>
                        <div className="padding-x w-full">
                            <p>{techStackIcon.name}</p>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechStack;