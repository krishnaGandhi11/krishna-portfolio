import React from 'react'
import {socialImgs} from "../constants/index.js";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="flex flex-col justify-center md:items-start items-center">
                    {/* <a href="/">Visit my blog</a><br/> */}
                    {/* <a href="mailto:krishnagandhi11@gmail.com/">https://krishnagandhi11@gmail.com</a> */}
                </div>
                <div className="socials">
                    {socialImgs.map((img) => (
                        <a className="icon" target="_blank" href={img.url} key={img.url}>
                            <img src={img.imgPath} />
                        </a>
                    ))}
                </div>

                <div className="flex flex-col justify-center md:items-end items-center">
                    <p className="text-center md:text-end">
                        © {new Date().getFullYear()} Krishna Gandhi. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
export default Footer
