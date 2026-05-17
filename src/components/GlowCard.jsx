import React, {useRef, useCallback} from 'react'

const GlowCard = ({card, children}) => {
    const cardRef = useRef(null);
    const rafId = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const el = cardRef.current;
        if (!el) return;

        if (rafId.current) return;
        rafId.current = requestAnimationFrame(() => {
            rafId.current = null;
            const rect = el.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;

            let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
            angle = (angle + 360) % 360;

            el.style.setProperty('--start', angle + 60);
        });
    }, []);


    return (
        <div ref={cardRef} onMouseMove={handleMouseMove} className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column">
            <div className="glow" />
            {card.review ? (
                <>
                    <div className="flex items-center gap-1 mb-5">
                        {Array.from({length:5}, (_, i) => (
                            <img src="/images/star.png" key={i} alt={`${card.title} rating star ${i + 1}`} className="size-5"/>
                        ))}
                    </div>
                    <div className="mb-5">
                        <p className="text-white-50 text-lg">{card.review}</p>
                    </div>
                </>
            ) : null}
            {children}
        </div>
    )
}
export default GlowCard
