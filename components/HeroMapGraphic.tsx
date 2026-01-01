import React from "react";

type Props = {
    className?: string;
};

export default function HeroMapGraphic({ className }: Props) {
    return (
        <div className={className}>
            <svg
                viewBox="0 0 1200 560"
                className="w-full h-auto"
                role="img"
                aria-label="Service map: Sollenau hub with A2 route connecting Baden, Wien and Wiener Neustadt"
            >
                <defs>
                    {/* maska na “ring pulse” żeby był czysty i premium */}
                    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
                    </filter>

                    {/* Styl kreskowania dla “flow” */}
                    <style>{`
            :root{
              --navy:#132B4A;
              --red:#C94A49;
              --bg:#EEF1F4;
              --white:#ffffff;
              --muted:#8FA1B5;
            }

            /* delikatny drift całej grafiki */
            .map-float {
              transform-origin: 50% 50%;
              animation: mapFloat 8s ease-in-out infinite;
            }
            @keyframes mapFloat {
              0%,100% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
            }

            /* puls HQ */
            .pulse-core { }
            .pulse-ring {
              transform-origin: 600px 280px;
              animation: pulseRing 1.8s ease-out infinite;
            }
            @keyframes pulseRing {
              0%   { transform: scale(0.85); opacity: 0.0; }
              10%  { opacity: 0.35; }
              60%  { opacity: 0.18; }
              100% { transform: scale(1.55); opacity: 0.0; }
            }

            /* drugi ring, przesunięty w fazie */
            .pulse-ring2 {
              transform-origin: 600px 280px;
              animation: pulseRing2 1.8s ease-out infinite;
              animation-delay: .55s;
            }
            @keyframes pulseRing2 {
              0%   { transform: scale(0.90); opacity: 0.0; }
              10%  { opacity: 0.28; }
              60%  { opacity: 0.14; }
              100% { transform: scale(1.62); opacity: 0.0; }
            }

            /* “flow” na A2 */
            .route-base {
              fill: none;
              stroke: var(--navy);
              stroke-width: 18;
              stroke-linecap: round;
              stroke-linejoin: round;
              opacity: 1;
            }
            .route-flow {
              fill: none;
              stroke: rgba(255,255,255,0.72);
              stroke-width: 6;
              stroke-linecap: round;
              stroke-dasharray: 10 18;
              animation: dashMove 2.2s linear infinite;
              opacity: 0.9;
            }
            @keyframes dashMove {
              to { stroke-dashoffset: -56; }
            }

            /* “online” dot */
            .online-dot {
              animation: onlineBlink 1.6s ease-in-out infinite;
            }
            @keyframes onlineBlink {
              0%,100% { opacity: 1; }
              50% { opacity: 0.35; }
            }

            /* micro “breath” dla pinów */
            .pin-breathe {
              transform-origin: center;
              animation: pinBreathe 3.4s ease-in-out infinite;
            }
            @keyframes pinBreathe {
              0%,100% { transform: scale(1); }
              50% { transform: scale(1.03); }
            }

            /* hover: wzmocnij pulse + lekki lift */
            .wrap:hover .map-float { transform: translateY(-6px); }
            .wrap:hover .pulse-ring,
            .wrap:hover .pulse-ring2 { animation-duration: 1.4s; }
          `}</style>
                </defs>

                {/* tło (light gray + duża ilość white space) */}
                <g className="wrap">
                    <rect x="0" y="0" width="1200" height="560" rx="42" fill="#EEF1F4" />
                    {/* “paper” area */}
                    <rect x="70" y="60" width="1060" height="440" rx="36" fill="#FFFFFF" />

                    {/* cała mapa jako pływający group */}
                    <g className="map-float">
                        {/* abstrakcyjny “blob” mapy */}
                        <path
                            d="M240,410 C150,360 120,300 140,240 C170,150 290,110 390,120 C480,128 500,85 610,98 C720,112 720,70 860,120 C980,170 1030,250 1000,320 C970,390 900,410 820,420 C740,430 710,460 610,450 C520,440 500,500 400,480 C330,466 290,440 240,410 Z"
                            fill="#F3F5F7"
                        />

                        {/* Trasa A2 (base + flow) */}
                        <path
                            className="route-base"
                            d="M270 355 C 420 270, 510 260, 600 280 S 820 300, 940 210"
                        />
                        <path
                            className="route-flow"
                            d="M270 355 C 420 270, 510 260, 600 280 S 820 300, 940 210"
                        />

                        {/* A2 label pill */}
                        <g>
                            <rect x="738" y="245" rx="10" ry="10" width="66" height="40" fill="#C94A49" />
                            <text x="771" y="271" textAnchor="middle" fontSize="20" fontFamily="ui-sans-serif, system-ui" fill="#fff">
                                A2
                            </text>
                        </g>

                        {/* Piny / miasta */}
                        {/* Wien */}
                        <g className="pin-breathe">
                            <circle cx="930" cy="190" r="14" fill="#132B4A" />
                            <text x="955" y="196" fontSize="34" fontWeight="700" fontFamily="ui-sans-serif, system-ui" fill="#132B4A">
                                Wien
                            </text>
                        </g>

                        {/* Baden */}
                        <g className="pin-breathe">
                            <circle cx="360" cy="325" r="12" fill="#132B4A" />
                            <text x="220" y="334" fontSize="42" fontWeight="700" fontFamily="ui-sans-serif, system-ui" fill="#132B4A">
                                Baden
                            </text>
                        </g>

                        {/* Wiener Neustadt */}
                        <g className="pin-breathe">
                            <circle cx="340" cy="215" r="12" fill="#132B4A" />
                            <text x="250" y="148" fontSize="42" fontWeight="700" fontFamily="ui-sans-serif, system-ui" fill="#132B4A">
                                Wiener
                            </text>
                            <text x="245" y="195" fontSize="42" fontWeight="700" fontFamily="ui-sans-serif, system-ui" fill="#132B4A">
                                Neustadt
                            </text>
                        </g>

                        {/* HUB: Sollenau + pulse */}
                        <g>
                            {/* pulse rings */}
                            <circle className="pulse-ring" cx="600" cy="280" r="36" fill="none" stroke="#C94A49" strokeWidth="8" />
                            <circle className="pulse-ring2" cx="600" cy="280" r="38" fill="none" stroke="#C94A49" strokeWidth="6" />

                            {/* core */}
                            <circle cx="600" cy="280" r="30" fill="#C94A49" />
                            <circle cx="600" cy="280" r="12" fill="#ffffff" opacity="0.95" />

                            {/* label pill */}
                            <g>
                                <rect x="480" y="312" rx="18" ry="18" width="240" height="74" fill="#132B4A" />
                                <text
                                    x="600"
                                    y="360"
                                    textAnchor="middle"
                                    fontSize="48"
                                    fontWeight="800"
                                    fontFamily="ui-sans-serif, system-ui"
                                    fill="#ffffff"
                                >
                                    Sollenau
                                </text>

                                <text
                                    x="600"
                                    y="412"
                                    textAnchor="middle"
                                    fontSize="28"
                                    fontWeight="700"
                                    fontFamily="ui-sans-serif, system-ui"
                                    fill="#C94A49"
                                >
                                    24/7 Service
                                </text>
                            </g>
                        </g>

                        {/* “Service Map Online” badge (online dot blink) */}
                        <g>
                            <rect x="120" y="86" rx="20" ry="20" width="240" height="52" fill="#FFFFFF" stroke="#E6EBF0" />
                            <circle className="online-dot" cx="152" cy="112" r="8" fill="#2FBF71" />
                            <text x="172" y="120" fontSize="22" fontWeight="600" fontFamily="ui-sans-serif, system-ui" fill="#132B4A">
                                Service Map Online
                            </text>
                        </g>

                        {/* Language pill (bez gradientów, tylko czyste formy) */}
                        <g>
                            <rect x="820" y="86" rx="20" ry="20" width="260" height="52" fill="#FFFFFF" stroke="#E6EBF0" />
                            <text x="850" y="120" fontSize="22" fontWeight="700" fontFamily="ui-sans-serif, system-ui" fill="#132B4A">
                                🇦🇹 🇵🇱 🇬🇧  DE · PL · EN
                            </text>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
}
