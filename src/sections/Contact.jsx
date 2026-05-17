import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import { socialImgs } from "../constants/index.js";

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            role="alert"
            className={`fixed top-8 right-8 z-[200] px-6 py-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-500 animate-[slideIn_0.4s_ease-out] ${
                type === "success"
                    ? "bg-green-900/80 border-green-500/30 text-green-100"
                    : "bg-red-900/80 border-red-500/30 text-red-100"
            }`}
        >
            <div className="flex items-center gap-3">
                <span className="text-xl">{type === "success" ? "✅" : "❌"}</span>
                <p className="text-sm md:text-base font-medium">{message}</p>
            </div>
        </div>
    );
};

const Contact = () => {
    const formRef = useRef(null);
    const imagePanelRef = useRef(null);
    const imageRef = useRef(null);
    const glowRef = useRef(null);
    const rafRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            );

            // Reset form and show success toast
            setForm({ name: "", email: "", message: "" });
            setToast({ message: "Message sent successfully! I'll get back to you soon.", type: "success" });
        } catch (error) {
            console.error("EmailJS Error:", error);
            setToast({ message: "Something went wrong. Please try again or reach out via LinkedIn.", type: "error" });
        } finally {
            setLoading(false); // Always stop loading, even on error
        }
    };

    const handlePanelMove = (e) => {
        const panel = imagePanelRef.current;
        if (!panel || rafRef.current) return;

        const rect = panel.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const dx = (x - 0.5) * 2;
        const dy = (y - 0.5) * 2;

        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            if (imageRef.current) {
                imageRef.current.style.transform = `scale(1.07) translate(${dx * 10}px, ${dy * 10}px)`;
            }
            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${dx * 20}px, ${dy * 20}px)`;
            }
        });
    };

    const handlePanelLeave = () => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        if (imageRef.current) {
            imageRef.current.style.transform = "scale(1.03) translate(0px, 0px)";
        }
        if (glowRef.current) {
            glowRef.current.style.transform = "translate(0px, 0px)";
        }
    };

    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <section id="contact" className="flex-center section-padding">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Get in Touch – Let's Connect"
                />
                <div className="grid-12-cols mt-16">
                    <div className="xl:col-span-5">
                        <div className="flex-center card-border rounded-xl p-10">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col gap-7"
                            >
                                <div>
                                    <label htmlFor="name">Your name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="What's your good name?"
                                        aria-label="Your full name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="What's your email address?"
                                        aria-label="Your email address"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="How can I help you?"
                                        aria-label="Your message"
                                        rows="5"
                                        required
                                    />
                                </div>

                                <button type="submit" disabled={loading}>
                                    <div className="cta-button group">
                                        <div className="bg-circle" />
                                        <p className="text">
                                            {loading ? "Sending..." : "Send Message"}
                                        </p>
                                        <div className="arrow-wrapper">
                                            <img src="/images/arrow-down.svg" alt="Send" />
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="xl:col-span-7 min-h-96">
                        <div className="w-full h-full flex flex-col gap-6">
                            <div
                                ref={imagePanelRef}
                                onMouseMove={handlePanelMove}
                                onMouseLeave={handlePanelLeave}
                                className="relative overflow-hidden rounded-3xl border border-white/10 min-h-[320px] xl:min-h-[430px] group"
                            >
                                <img
                                    ref={imageRef}
                                    src="/images/Breakfree.jpg"
                                    alt="Break free"
                                    className="w-full h-full object-cover scale-[1.03] transition-transform duration-500 will-change-transform"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                                <div
                                    ref={glowRef}
                                    className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(255,255,255,0.25),transparent_45%)] transition-transform duration-500 will-change-transform"
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    <p className="text-white/80 text-sm md:text-base max-w-xl">
                                        A strong believer of: A problem well defined is a problem half solved.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8">
                                <p className="text-white-50 text-sm mb-4 uppercase tracking-widest">Find me on</p>
                                <div className="flex gap-4 flex-wrap">
                                    {socialImgs.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={`Visit my ${social.name} profile`}
                                            className="flex items-center gap-3 bg-black/40 hover:bg-black/60 transition-colors rounded-xl px-5 py-3 border border-white/10"
                                        >
                                            <img src={social.imgPath} alt={social.name} className="w-6 h-6 object-contain" />
                                            <span className="text-white-50 text-sm capitalize">{social.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;