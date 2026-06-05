import React, {useEffect, useState} from 'react'
import {navLinks} from "../constants/index.js";

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => { window.removeEventListener('scroll', handleScroll); }
    }, [])

    // Close the mobile menu on Escape and lock body scroll while it is open.
    useEffect(() => {
        if (!menuOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        }

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        }
    }, [menuOpen])

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`navbar ${scrolled || menuOpen ? 'scrolled' : 'not-scrolled'}`}>
            <div className="inner">
                <a className="logo" href="#hero" onClick={closeMenu}>
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
                    </ul>
                </nav>
                <a href="#contact" className="contact-btn group">
                    <div className="inner">
                        <span>Contact me</span>
                    </div>
                </a>
                <button
                    type="button"
                    className="menu-toggle"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span className={`menu-icon ${menuOpen ? 'open' : ''}`}>
                        <span />
                        <span />
                        <span />
                    </span>
                </button>
            </div>

            <nav
                id="mobile-menu"
                className={`mobile-menu ${menuOpen ? 'open' : ''}`}
                aria-hidden={!menuOpen}
            >
                <ul>
                    {navLinks.map(({link, name}) => (
                        <li key={name}>
                            <a href={link} onClick={closeMenu}>{name}</a>
                        </li>
                    ))}
                    <li>
                        <a href="#contact" className="mobile-contact" onClick={closeMenu}>
                            Contact me
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default NavBar
