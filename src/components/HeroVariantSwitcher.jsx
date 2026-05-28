const OPTIONS = [
    { id: "galaxy", label: "Galaxy" },
    { id: "workstation", label: "Workstation" },
];

const HeroVariantSwitcher = ({ value, onChange }) => {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] flex flex-col items-center gap-2 px-3">
            <p className="text-white/55 text-[11px] uppercase tracking-[0.2em]">
                Hero style
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-2 py-2">
                {OPTIONS.map((o) => (
                    <button
                        key={o.id}
                        type="button"
                        onClick={() => onChange(o.id)}
                        className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                            value === o.id
                                ? "bg-white text-black font-semibold"
                                : "text-white-50 hover:bg-white/10"
                        }`}
                    >
                        {o.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HeroVariantSwitcher;
