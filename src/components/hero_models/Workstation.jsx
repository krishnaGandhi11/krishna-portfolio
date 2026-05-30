import { useEffect, useMemo, useRef } from "react";
import { useFrame, createPortal } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/workstation.glb");

// The sugaa GLB labels display surfaces as "<n>PIC-0".
// 2PIC-0 is the wall TV (2:1 baked texture), 1/3/4PIC-0 are the three desk monitors (1:1 baked).
// SCREEN-0 is a non-display inner panel — do NOT target it.
const PIC_CONTENT = {
    "2PIC-0": "hero",
    "1PIC-0": "terminal",
    "3PIC-0": "joomla",
    "4PIC-0": "css",
};

const CONTENT = {
    hero: {
        title: "Hero.jsx — krishna-portfolio",
        bg: "#0f1117",
        fontPx: 20,
        lineH: 30,
        gutterX: 64,
        lines: [
            { t: "// Hero.jsx", c: "#6b7280" },
            { t: "import { Canvas } from '@react-three/fiber';", c: "#c4b5fd" },
            { t: "import HeroExperience from './HeroExperience';", c: "#c4b5fd" },
            { t: "", c: "#ffffff" },
            { t: "const Hero = ({ inView }) => (", c: "#93c5fd" },
            { t: "  <section id=\"hero\" className=\"hero-layout\">", c: "#e5e7eb" },
            { t: "    <Canvas frameloop={inView ? 'always' : 'never'}>", c: "#fcd34d" },
            { t: "      <HeroExperience variant=\"workstation\" />", c: "#fcd34d" },
            { t: "    </Canvas>", c: "#e5e7eb" },
            { t: "  </section>", c: "#e5e7eb" },
            { t: ");", c: "#93c5fd" },
            { t: "", c: "#ffffff" },
            { t: "export default Hero;", c: "#f472b6" },
        ],
    },
    terminal: {
        title: "zsh — krishna-portfolio",
        bg: "#0b0c14",
        fontPx: 18,
        lineH: 26,
        gutterX: 20,
        lines: [
            { t: "$ npm run dev", c: "#a7f3d0" },
            { t: "", c: "#ffffff" },
            { t: "  VITE v7.2.4  ready in 388 ms", c: "#e5e7eb" },
            { t: "", c: "#ffffff" },
            { t: "  > Local:   localhost:5173", c: "#c4b5fd" },
            { t: "  > Network: use --host to expose", c: "#9ca3af" },
            { t: "", c: "#ffffff" },
            { t: "  HMR  src/components/NavBar.jsx", c: "#86efac" },
            { t: "  HMR  src/sections/Hero.jsx", c: "#86efac" },
            { t: "", c: "#ffffff" },
            { t: "$ git log --oneline -3", c: "#a7f3d0" },
            { t: "d73f1c2 feat: mobile nav menu", c: "#fcd34d" },
            { t: "5ecb077 feat: joomla logo on wall tv", c: "#fcd34d" },
            { t: "8b32713 feat: hero switcher icons", c: "#fcd34d" },
            { t: "", c: "#ffffff" },
            { t: "$ _", c: "#a7f3d0" },
        ],
    },
    joomla: {
        title: "PortfolioController.php",
        bg: "#101622",
        fontPx: 16,
        lineH: 24,
        gutterX: 44,
        lines: [
            { t: "<?php", c: "#f472b6" },
            { t: "// components/com_portfolio", c: "#6b7280" },
            { t: "defined('_JEXEC') or die;", c: "#e5e7eb" },
            { t: "", c: "#ffffff" },
            { t: "use Joomla\\CMS\\Factory;", c: "#c4b5fd" },
            { t: "use Joomla\\CMS\\MVC\\Controller\\BaseController;", c: "#c4b5fd" },
            { t: "", c: "#ffffff" },
            { t: "class PortfolioController", c: "#93c5fd" },
            { t: "  extends BaseController", c: "#93c5fd" },
            { t: "{", c: "#e5e7eb" },
            { t: "  public function display($cachable = false) {", c: "#fcd34d" },
            { t: "    $app  = Factory::getApplication();", c: "#e5e7eb" },
            { t: "    $view = $app->input->get('view');", c: "#e5e7eb" },
            { t: "    return parent::display($cachable);", c: "#e5e7eb" },
            { t: "  }", c: "#fcd34d" },
            { t: "}", c: "#e5e7eb" },
        ],
    },
    css: {
        title: "index.css — tailwind v4",
        bg: "#0e1320",
        fontPx: 17,
        lineH: 26,
        gutterX: 44,
        lines: [
            { t: "/* index.css */", c: "#6b7280" },
            { t: "@import \"tailwindcss\";", c: "#f472b6" },
            { t: "", c: "#ffffff" },
            { t: "@theme {", c: "#c4b5fd" },
            { t: "  --color-black-100: #0e0e10;", c: "#e5e7eb" },
            { t: "  --color-white-50:  #d9ecff;", c: "#e5e7eb" },
            { t: "  --font-sans: \"Mona Sans\", sans-serif;", c: "#e5e7eb" },
            { t: "}", c: "#c4b5fd" },
            { t: "", c: "#ffffff" },
            { t: "@layer components {", c: "#c4b5fd" },
            { t: "  .hero-layout {", c: "#fcd34d" },
            { t: "    @apply relative z-10 xl:mt-20 mt-32;", c: "#93c5fd" },
            { t: "  }", c: "#fcd34d" },
            { t: "}", c: "#c4b5fd" },
        ],
    },
};

// Supersample factor: the canvas is rendered at SS× the logical size and all
// metrics scale with it, so the baked text stays crisp when the model (and
// therefore each screen) is magnified.
const SS = 2;

const buildContentTexture = (kind, baseW, baseH) => {
    const cfg = CONTENT[kind];
    const w = baseW * SS;
    const h = baseH * SS;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = cfg.bg;
    ctx.fillRect(0, 0, w, h);

    const barH = 36 * SS;
    ctx.fillStyle = "#1a1d29";
    ctx.fillRect(0, 0, w, barH);
    ["#ef4444", "#facc15", "#22c55e"].forEach((color, i) => {
        ctx.beginPath();
        ctx.arc((18 + i * 18) * SS, barH / 2, 5 * SS, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    });
    ctx.fillStyle = "#9ca3af";
    ctx.font = `${13 * SS}px ui-monospace, Menlo, monospace`;
    ctx.textBaseline = "middle";
    ctx.fillText(cfg.title, 80 * SS, barH / 2);

    // Auto-fit: measure at the desired font, then scale down (never up) so the
    // widest line and the full block both fit the screen without clipping.
    const padTop = 14 * SS;
    const padBottom = 14 * SS;
    const padRight = 16 * SS;
    const gutterX = cfg.gutterX * SS;
    const availW = w - gutterX - padRight;
    const availH = h - barH - padTop - padBottom;

    ctx.font = `${cfg.fontPx * SS}px ui-monospace, Menlo, monospace`;
    let maxLineW = 0;
    cfg.lines.forEach((line) => {
        const lw = ctx.measureText(line.t).width;
        if (lw > maxLineW) maxLineW = lw;
    });
    const scale = Math.min(
        1,
        availW / (maxLineW || 1),
        availH / (cfg.lines.length * cfg.lineH * SS || 1)
    );
    const fontPx = cfg.fontPx * SS * scale;
    const lineH = cfg.lineH * SS * scale;

    // Vertically center the block in the area below the title bar.
    const startY =
        barH + padTop + Math.max(0, (availH - cfg.lines.length * lineH) / 2);

    ctx.font = `${fontPx}px ui-monospace, Menlo, monospace`;
    ctx.textBaseline = "top";
    cfg.lines.forEach((line, i) => {
        ctx.fillStyle = "#4b5563";
        ctx.fillText(String(i + 1).padStart(2, " "), 12 * SS, startY + i * lineH);
        ctx.fillStyle = line.c;
        ctx.fillText(line.t, gutterX, startY + i * lineH);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
};

// Larger than the model's natural fit so the on-screen monitors — and the code
// baked onto them — read clearly. The Joomla logo on the TV back scales too.
const TARGET_SIZE = 6.5;

const Workstation = ({ active = true, isMobile = false }) => {
    const groupRef = useRef();
    const { scene } = useGLTF("/models/workstation.glb");

    const screenTextures = useMemo(
        () => ({
            hero: buildContentTexture("hero", 1024, 512),
            terminal: buildContentTexture("terminal", 512, 512),
            joomla: buildContentTexture("joomla", 512, 512),
            css: buildContentTexture("css", 512, 512),
        }),
        []
    );

    const { cloned, fitScale, wallTv } = useMemo(() => {
        const cloned = scene.clone(true);
        const box = new THREE.Box3().setFromObject(cloned);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        cloned.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const fitScale = TARGET_SIZE / maxDim;
        // The wall TV (material "2PIC-0") shows hero.jsx on its front; we hang
        // the Joomla logo on its back face by portaling a plate into this mesh.
        let wallTv = null;
        cloned.traverse((o) => {
            if (o.isMesh && o.material?.name === "2PIC-0") wallTv = o;
        });
        return { cloned, fitScale, wallTv };
    }, [scene]);

    // Joomla logo plate for the wall TV's back face. TextureLoader (not drei's
    // useTexture) keeps this out of Suspense. The plate is portaled in as a
    // child of the TV mesh, so it inherits the node chain's non-uniform scale
    // automatically — the plane sizing below is pre-compensated so the 1.20
    // logo aspect reads correctly in world space. Laying the plane flat against
    // the TV back (rotation.x = π/2) tips the texture, so a 180° texture spin
    // (repeat -1,-1 about its center) puts the logo upright and unmirrored for
    // a viewer behind the screen.
    const joomlaTex = useMemo(() => {
        const t = new THREE.TextureLoader().load("/images/joomla.png");
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;
        t.center.set(0.5, 0.5);
        t.repeat.set(-1, -1);
        return t;
    }, []);

    useEffect(() => () => joomlaTex.dispose(), [joomlaTex]);

    useEffect(() => {
        cloned.traverse((obj) => {
            if (!obj.isMesh || !obj.material) return;
            const kind = PIC_CONTENT[obj.material.name];
            if (!kind) return;
            const tex = screenTextures[kind];
            const newMat = obj.material.clone();
            newMat.map = tex;
            newMat.emissive = new THREE.Color("#cbd5e1");
            newMat.emissiveMap = tex;
            newMat.emissiveIntensity = 1.0;
            newMat.needsUpdate = true;
            obj.material = newMat;
        });
        return () => {
            Object.values(screenTextures).forEach((t) => t.dispose());
        };
    }, [cloned, screenTextures]);

    useFrame((_, delta) => {
        if (!active || !groupRef.current) return;
        groupRef.current.rotation.y += delta * 0.18;
    });

    return (
        <>
            <ambientLight intensity={0.9} />
            <directionalLight position={[4, 6, 4]} intensity={1.2} />
            <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#a78bfa" />

            <group
                ref={groupRef}
                scale={fitScale * (isMobile ? 0.85 : 1)}
                position={[0, -0.5, 0]}
            >
                <primitive object={cloned} />
                {wallTv &&
                    createPortal(
                        <mesh
                            position={[0, -0.1, 0]}
                            rotation={[Math.PI / 2, 0, 0]}
                        >
                            <planeGeometry args={[0.89, 1.59]} />
                            <meshBasicMaterial
                                map={joomlaTex}
                                transparent
                                side={THREE.DoubleSide}
                                toneMapped={false}
                            />
                        </mesh>,
                        wallTv
                    )}
            </group>
        </>
    );
};

export default Workstation;
