const GalaxyIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="2.2" />
        <path d="M12 3v3" />
        <path d="M12 18v3" />
        <path d="M3 12h3" />
        <path d="M18 12h3" />
        <path d="M5.6 5.6l2.1 2.1" />
        <path d="M16.3 16.3l2.1 2.1" />
        <path d="M5.6 18.4l2.1-2.1" />
        <path d="M16.3 7.7l2.1-2.1" />
    </svg>
);

const WorkstationIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M9 20h6" />
        <path d="M12 16v4" />
    </svg>
);

const OPTIONS = [
    { id: "galaxy", label: "Galaxy", Icon: GalaxyIcon },
    { id: "workstation", label: "Workstation", Icon: WorkstationIcon },
];

const HeroVariantSwitcher = ({ value, onChange }) => {
    return (
        <div
            className="fixed top-1/2 right-3 md:right-5 -translate-y-1/2 z-[150] flex flex-col gap-1 bg-black/60 backdrop-blur-md border border-white/15 rounded-full p-1"
            role="group"
            aria-label="Hero style"
        >
            {OPTIONS.map((opt) => {
                const selected = value === opt.id;
                const Icon = opt.Icon;
                return (
                    <button
                        key={opt.id}
                        type="button"
                        onClick={() => onChange(opt.id)}
                        title={opt.label}
                        aria-label={`Show ${opt.label} hero`}
                        aria-pressed={selected}
                        className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 ${
                            selected
                                ? "bg-white text-black"
                                : "text-white/70 hover:bg-white/10"
                        }`}
                    >
                        <Icon />
                    </button>
                );
            })}
        </div>
    );
};

export default HeroVariantSwitcher;
