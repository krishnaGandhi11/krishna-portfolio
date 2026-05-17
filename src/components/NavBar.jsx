import React, {useEffect, useState} from 'react'
import {navLinks, resumeLink} from "../constants/index.js";

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => { window.removeEventListener('scroll', handleScroll); }
    }, [])



    return (
        <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
            <div className="inner">
                <a className="logo" href="#hero">
                    Krishna Gandhi
                </a>
                <nav className="desktop">
                    <ul>
                        {navLinks.map(({link, name}) =>(
                            <li key={name} className="group">
                                <a href={link}>
                                    <span>{name}</span>
                                    <span className="underline" />
                                </a>
                            </li>
                            ))}
                        <li className="group">
                            <a href={resumeLink} target="_blank" rel="noreferrer">
                                <span>Resume</span>
                                <span className="underline" />
                            </a>
                        </li>
                    </ul>
                </nav>
                <a href="#contact" className="contact-btn group">
                    <div className="inner">
                        <span>Contact me</span>
                    </div>
                </a>
            </div>
        </header>
    )
}
export default NavBar
