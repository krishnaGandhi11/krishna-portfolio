import { lazy, Suspense } from "react";
import Hero from "./sections/Hero.jsx";
import NavBar from "./components/NavBar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection.jsx"));
const LogoSection = lazy(() => import("./sections/LogoSection.jsx").then(m => ({ default: m.LogoSection })));
const FeatureCards = lazy(() => import("./sections/FeatureCards.jsx"));
const ExperienceSection = lazy(() => import("./sections/ExperienceSection.jsx"));
const TechStack = lazy(() => import("./sections/TechStack.jsx"));
const Contact = lazy(() => import("./sections/Contact.jsx"));
const Footer = lazy(() => import("./sections/footer.jsx"));

const App = () => {
    return (
        <>
            <NavBar />
            <Hero />
            <Suspense fallback={null}>
                <ShowcaseSection />
                <LogoSection />
                <FeatureCards />
                <ExperienceSection />
                <TechStack />
                <Contact />
                <Footer />
            </Suspense>
            <ScrollToTop />
        </>
    )
}
export default App
