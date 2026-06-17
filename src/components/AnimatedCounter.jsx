import React from 'react'
import {counterItems} from "../constants/index.js";
import CountUp from "react-countup";

const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const AnimatedCounter = () => {
    return (
        <div id="counter" className= "padding-x-lg xl:mt-0 mt-32">
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item, i) => (
                    <div key={item.label || item.value || i} className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center">
                        <div className="counter-number text-white text-5xl font-bold mb-2">
                            {prefersReducedMotion ? (
                                <span>{item.value}{item.suffix}</span>
                            ) : (
                                <CountUp suffix={item.suffix} end={item.value} enableScrollSpy scrollSpyDelay={200} />
                            )}
                        </div>
                        <div className="text-white-50 text-lg">
                            {item.label}
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}
export default AnimatedCounter
