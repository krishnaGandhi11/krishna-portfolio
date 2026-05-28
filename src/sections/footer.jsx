import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="text-center w-full">
                    © 2026 Krishna Gandhi. All rights reserved.
                </p>
                <p className="text-center w-full text-white-50 text-sm mt-2">
                    Public portfolio for viewing only. Reuse or redistribution is not permitted.
                </p>
                <p className="text-center w-full text-white-50/60 text-xs mt-3">
                    Workstation 3D model:{" "}
                    <a
                        href="https://sketchfab.com/3d-models/computer301-e4a2a939bb8445da8db8050e52bb645b"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-white-50"
                    >
                        &ldquo;COMPUTER301&rdquo;
                    </a>{" "}
                    by{" "}
                    <a
                        href="https://sketchfab.com/sugaa"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-white-50"
                    >
                        sugaa
                    </a>
                    , licensed under{" "}
                    <a
                        href="http://creativecommons.org/licenses/by/4.0/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-white-50"
                    >
                        CC-BY-4.0
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}
export default Footer
