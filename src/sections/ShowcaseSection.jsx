import React, { useRef, useState, useEffect } from 'react'
import { gsap} from "gsap/gsap-core";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "BrainWave AI: Full-Stack AI Chat App",
        desc: "Production-deployed AI chat platform with secure auth, persistent chat history, Gemini-powered responses, image uploads, and polished UX. Tech: React 19, Vite, Node.js, Express, MongoDB Atlas, Clerk, Gemini, ImageKit.",
        imgPath: "/images/project3-jj.webp",
        alt: "BrainWave AI Full-Stack Chat App",
        className: "bg-[#ffe7eb]",
        link: "https://brain-wave-ai-dev.vercel.app/",
    },
    {
        title: "LILIPET: Vanilla UI E-Commerce Design",
        desc: "A multi-page e-commerce frontend built entirely without frameworks. Designed to master semantic HTML5 and responsive Vanilla CSS architecture, featuring custom media queries, flexbox layouts, and interactive DOM manipulation. Tech: HTML5, CSS3, JavaScript (Vanilla).",
        imgPath: "/images/project22.webp",
        alt: "LILIPET Vanilla UI E-Commerce Design",
        className: "bg-[#eaf4ff]",
        link: "https://lilipet.netlify.app/",
    },
];

const LazyIframePreview = ({ src, title, imgPath, alt, onClick }) => {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [dims, setDims] = useState({ scale: 0.3, height: 300 });

    useEffect(() => {
        if (!isHovered) return;
        const el = containerRef.current;
        if (!el) return;
        const obs = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            if (width > 0) setDims({ scale: width / 1440, height });
        });
        obs.observe(el);
        return () => obs.disconnect();
    }, [isHovered]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative overflow-hidden rounded-xl cursor-pointer group"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            role="link"
            aria-label={`View live preview of ${title}`}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
        >
            {/* Thumbnail shown by default */}
            <img
                src={imgPath}
                alt={alt || title}
                loading="lazy"
                className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Iframe loads only on hover */}
            {isHovered && (
                <iframe
                    src={src}
                    title={title}
                    loading="lazy"
                    className="absolute inset-0"
                    style={{
                        width: '1440px',
                        height: dims.scale > 0 ? `${dims.height / dims.scale}px` : '1000px',
                        border: 'none',
                        transform: `scale(${dims.scale})`,
                        transformOrigin: 'top left',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm md:text-base font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                    View Live ↗
                </span>
            </div>
        </div>
    );
};

const ShowcaseSection = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.set(".first-project-wrapper, .project", { y: 40, opacity: 0 });

        gsap.to(".first-project-wrapper, .project", {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                once: true,
            },
        });
    }, { scope: sectionRef, dependencies: [] })

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    {/* Left*/}

                    <div className="first-project-wrapper">
                        <div className="image-wrapper">
                            <LazyIframePreview
                                src="https://waywiseapp.tech/"
                                title="Real-Time Intelligent Navigation Assistant"
                                imgPath="/images/project1-ww.webp"
                                alt="WayWise Navigation App"
                                onClick={() => window.open("https://waywiseapp.tech/", "_blank")}
                            />
                        </div>
                        <div className="text-content">
                            <h2>Real-Time Intelligent Navigation Assistant</h2>
                            <p className="text-white-50 md:text-xl">
                                AI-based tool suggesting optimal nearby stops without route deviation.<br></br>
                                Tech: Python, Flask, JS, Google Maps API, Leaflet.js
                            </p>
                        </div>
                    </div>


                    {/* Right*/}
                    <div className="project-list-wrapper overflow-hidden">
                        {projects.map((project) => (
                            <div key={project.title} className="project">
                                <div className={`image-wrapper ${project.link !== "#" ? "bg-transparent p-0" : project.className}`}>
                                    {project.link !== "#" ? (
                                        <LazyIframePreview
                                            src={project.link}
                                            title={project.title}
                                            imgPath={project.imgPath}
                                            alt={project.alt}
                                            onClick={() => window.open(project.link, "_blank")}
                                        />
                                    ) : (
                                        <img
                                            loading="lazy"
                                            src={project.imgPath}
                                            alt={project.alt}
                                        />
                                    )}
                                </div>
                                <h2>{project.title}</h2>
                                <p className="text-white-50 md:text-xl">{project.desc}</p>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    )
}
export default ShowcaseSection
