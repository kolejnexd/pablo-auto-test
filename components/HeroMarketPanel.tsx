'use client';

import React, { useId } from "react";

// Define the shape of labels expected from i18n
export type MarketPanelLabels = {
    statusTitle: string;
    itemBuy: string;
    valueActive: string;
    itemSell: string;
    valueAvailable: string;
    itemDamaged: string;
    valueAccepted: string;
    itemMileage: string;
    valueOk: string;
    step1: string;
    step2: string;
    step3: string;
};

type HeroMarketPanelProps = {
    hubLabel?: string; // np. "Wiener\nNeustadt"
    hubTag?: string; // np. "24/7"
    points?: Array<{ label: string; x: number; y: number }>;
    showLanguageBadge?: boolean;
    labels?: MarketPanelLabels; // New prop for translations
};

export default function HeroMarketPanel({
    hubLabel = "Wiener\nNeustadt",
    hubTag = "24/7",
    points = [
        { label: "Sollenau", x: 215, y: 90 },
        { label: "Wien", x: 610, y: 110 },
        { label: "Baden", x: 585, y: 235 },
    ],
    showLanguageBadge = true,
    labels, // Destructure labels
}: HeroMarketPanelProps) {
    const gid = useId().replace(/:/g, "");
    const [hubLine1, hubLine2] = hubLabel.split("\n");

    // Fallback labels if not provided (safe default to PL or EN, but we expect them)
    const t = labels || {
        statusTitle: "Status Rynku",
        itemBuy: "Skup aut",
        valueActive: "AKTYWNY",
        itemSell: "Sprzedaż",
        valueAvailable: "dostępne pojazdy",
        itemDamaged: "Auta powypadkowe",
        valueAccepted: "przyjmujemy",
        itemMileage: "Duży przebieg",
        valueOk: "OK",
        step1: "1. Wycena",
        step2: "2. Umowa",
        step3: "3. Płatność / Odbiór"
    };

    return (
        <div className="relative w-full max-w-[720px]">
            {/* Outer card */}
            <div className="relative overflow-hidden rounded-[44px] border border-black/5 bg-white shadow-[0_30px_80px_rgba(2,10,25,0.14)]">
                {/* Soft background wash */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-slate-100/70 blur-2xl" />
                    <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-slate-100/60 blur-2xl" />
                    <div className="absolute bottom-0 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-slate-50 blur-2xl" />
                </div>

                {/* Top map area */}
                <div className="relative px-8 pb-5 pt-8 sm:px-10 sm:pb-6 sm:pt-10">
                    {/* language badge */}
                    {showLanguageBadge && (
                        <div className="absolute right-6 top-6 z-20 sm:right-8 sm:top-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-2 text-sm font-medium text-[#0B2A4A] shadow-[0_12px_30px_rgba(2,10,25,0.10)] backdrop-blur">
                                <span className="text-base leading-none">🇦🇹</span>
                                <span className="text-base leading-none">🇵🇱</span>
                                <span className="text-base leading-none">🇬🇧</span>
                                <span className="opacity-80">Deutsch · Polski · English</span>
                            </div>
                        </div>
                    )}

                    {/* MAP SVG */}
                    <div className="relative h-[260px] w-full sm:h-[290px]">
                        <svg
                            className="absolute inset-0 h-full w-full"
                            viewBox="0 0 800 420"
                            aria-hidden="true"
                        >
                            <defs>
                                <linearGradient id={`roadFade-${gid}`} x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#0B2A4A" stopOpacity="0.10" />
                                    <stop offset="50%" stopColor="#0B2A4A" stopOpacity="0.18" />
                                    <stop offset="100%" stopColor="#0B2A4A" stopOpacity="0.10" />
                                </linearGradient>

                                <linearGradient id={`a2-${gid}`} x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#0B2A4A" stopOpacity="0.95" />
                                    <stop offset="100%" stopColor="#0B2A4A" stopOpacity="0.95" />
                                </linearGradient>
                            </defs>

                            {/* subtle land plates */}
                            <path
                                d="M70 210 C170 140, 260 140, 360 180 C460 220, 540 240, 730 210 L730 250 C540 285, 430 290, 350 270 C250 240, 170 245, 70 280 Z"
                                fill="#0B2A4A"
                                opacity="0.04"
                            />
                            <path
                                d="M120 140 C240 95, 320 95, 420 120 C520 145, 620 150, 720 120 L720 150 C620 180, 520 185, 420 165 C320 145, 240 145, 120 175 Z"
                                fill="#0B2A4A"
                                opacity="0.035"
                            />

                            {/* faint road network */}
                            <g stroke={`url(#roadFade-${gid})`} strokeWidth="7" fill="none" strokeLinecap="round">
                                <path d="M150 145 C240 175, 290 210, 340 240 C400 275, 520 320, 690 300" />
                                <path d="M250 105 C290 140, 330 190, 360 220 C420 285, 520 260, 640 240" />
                                <path d="M520 95 C500 160, 520 215, 585 255 C650 290, 705 320, 745 350" />
                                <path d="M610 120 C595 170, 600 220, 630 260 C670 310, 710 345, 760 365" />
                                <path d="M210 95 C230 150, 220 210, 205 245 C185 290, 160 325, 120 350" />
                            </g>

                            {/* animated dashed route */}
                            <g
                                className="route-dash"
                                stroke="#0B2A4A"
                                strokeOpacity="0.35"
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray="10 10"
                            >
                                <path d="M230 165 C320 195, 395 205, 485 200 C560 196, 650 175, 710 145" />
                                <path d="M210 125 C270 135, 330 155, 380 185 C430 215, 485 250, 565 270" />
                            </g>

                            {/* A2 main road */}
                            <path
                                d="M150 250 C230 230, 300 215, 370 210 C460 205, 550 220, 700 235"
                                stroke={`url(#a2-${gid})`}
                                strokeWidth="18"
                                fill="none"
                                strokeLinecap="round"
                            />

                            {/* A2 label pill */}
                            <g transform="translate(220 235)">
                                <rect
                                    x="-28"
                                    y="-18"
                                    width="56"
                                    height="36"
                                    rx="14"
                                    fill="#0B2A4A"
                                    opacity="0.95"
                                />
                                <text
                                    x="0"
                                    y="7"
                                    textAnchor="middle"
                                    fontSize="18"
                                    fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
                                    fill="white"
                                    fontWeight="700"
                                >
                                    A2
                                </text>
                            </g>

                            {/* points */}
                            {points.map((p) => (
                                <g key={p.label}>
                                    <circle cx={p.x} cy={p.y} r="11" fill="#0B2A4A" opacity="0.95" />
                                    <text
                                        x={p.x}
                                        y={p.y - 18}
                                        textAnchor="middle"
                                        fontSize="22"
                                        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
                                        fill="#0B2A4A"
                                        fontWeight="700"
                                        opacity="0.95"
                                    >
                                        {p.label}
                                    </text>
                                </g>
                            ))}

                            {/* hub (Wiener Neustadt) */}
                            <g transform="translate(415 220)">
                                {/* ping ring */}
                                <circle className="hub-ping" cx="0" cy="0" r="56" fill="none" stroke="#C4001A" strokeWidth="6" opacity="0.35" />
                                <circle cx="0" cy="0" r="64" fill="none" stroke="#C4001A" strokeWidth="10" opacity="0.15" />
                                <circle cx="0" cy="0" r="54" fill="white" opacity="0.98" />
                                <circle cx="0" cy="0" r="58" fill="none" stroke="#C4001A" strokeWidth="10" opacity="0.95" />

                                <text
                                    x="0"
                                    y="-8"
                                    textAnchor="middle"
                                    fontSize="22"
                                    fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
                                    fill="#0B2A4A"
                                    fontWeight="700"
                                    opacity="0.95"
                                >
                                    {hubLine1 || "Wiener"}
                                </text>
                                <text
                                    x="0"
                                    y="18"
                                    textAnchor="middle"
                                    fontSize="26"
                                    fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
                                    fill="#0B2A4A"
                                    fontWeight="900"
                                >
                                    {hubLine2 || "Neustadt"}
                                </text>

                                {/* 24/7 pill */}
                                <g transform="translate(0 50)">
                                    <rect x="-46" y="-18" width="92" height="36" rx="16" fill="#C4001A" opacity="0.98" />
                                    <text
                                        x="0"
                                        y="8"
                                        textAnchor="middle"
                                        fontSize="18"
                                        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
                                        fill="white"
                                        fontWeight="800"
                                    >
                                        {hubTag}
                                    </text>
                                </g>
                            </g>
                        </svg>
                    </div>

                    {/* Status card */}
                    <div className="relative z-10 -mt-2 rounded-3xl border border-black/5 bg-white/90 p-6 shadow-[0_18px_45px_rgba(2,10,25,0.10)] backdrop-blur sm:p-7">
                        <div className="text-xl font-extrabold text-[#0B2A4A] sm:text-2xl">{t.statusTitle}</div>
                        <div className="mt-4 divide-y divide-[#0B2A4A]/10">
                            <StatusRow dot="green" label={t.itemBuy} value={t.valueActive} strong />
                            <StatusRow dot="navy" label={t.itemSell} value={t.valueAvailable} />
                            <StatusRow dot="amber" label={t.itemDamaged} value={t.valueAccepted} />
                            <StatusRow dot="green" label={t.itemMileage} value={t.valueOk} />
                        </div>
                    </div>

                    {/* steps */}
                    <div className="relative z-10 mt-6 border-t border-[#0B2A4A]/10 pt-6">
                        <div className="flex items-center justify-center gap-6 text-[#0B2A4A] sm:gap-10">
                            <Step label={t.step1} icon={<IconClipboardCheck />} />
                            <Arrow />
                            <Step label={t.step2} icon={<IconContract />} />
                            <Arrow />
                            <Step label={t.step3} icon={<IconMoney />} />
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS animations without Tailwind config */}
            <style jsx>{`
        .route-dash path {
          animation: dashMove 6.5s linear infinite;
        }
        @keyframes dashMove {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -140;
          }
        }
        .hub-ping {
          transform-origin: center;
          animation: hubPing 2.2s ease-out infinite;
        }
        @keyframes hubPing {
          0% {
            opacity: 0.42;
            stroke-width: 6;
            transform: scale(0.92);
          }
          70% {
            opacity: 0.05;
            stroke-width: 3;
            transform: scale(1.15);
          }
          100% {
            opacity: 0;
            stroke-width: 2;
            transform: scale(1.2);
          }
        }
      `}</style>
        </div>
    );
}

function StatusRow({
    dot,
    label,
    value,
    strong,
}: {
    dot: "green" | "navy" | "amber";
    label: string;
    value: string;
    strong?: boolean;
}) {
    const dotClass =
        dot === "green"
            ? "bg-emerald-600"
            : dot === "amber"
                ? "bg-amber-500"
                : "bg-[#0B2A4A]";

    return (
        <div className="flex items-center gap-3 py-4 text-[#0B2A4A] sm:gap-4">
            <span className={`h-3 w-3 shrink-0 rounded-full ${dotClass}`} />
            <div className="text-base font-semibold sm:text-lg">
                {label}:{" "}
                <span className={strong ? "font-extrabold" : "font-bold"}>
                    {value}
                </span>
            </div>
        </div>
    );
}

function Step({ label, icon }: { label: string; icon: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-3 text-center">
            {/* Removed whitespace-nowrap to avoid clipping on small screens */}
            <div className="text-sm font-bold sm:text-lg px-1">{label}</div>
            <div className="rounded-2xl border border-[#0B2A4A]/10 bg-white px-4 py-3 shadow-[0_10px_25px_rgba(2,10,25,0.08)]">
                <div className="h-10 w-10 text-[#0B2A4A]">{icon}</div>
            </div>
        </div>
    );
}

function Arrow() {
    return (
        <div className="hidden select-none text-2xl font-bold text-[#0B2A4A]/70 sm:block">
            →
        </div>
    );
}

// FIXED ICONS (Lucide style)

function IconClipboardCheck() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="m9 14 2 2 4-4" />
        </svg>
    );
}

function IconContract() {
    // Better "Contract" icon (File with Signature look)
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M9 13h6" />
            <path d="M9 17h6" />
            <path d="M8 13h.01" />
            <path d="M8 17h.01" />
        </svg>
    );
}

function IconMoney() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    );
}
