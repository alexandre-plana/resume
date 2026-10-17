import { useState } from "react";
import { motion } from "motion/react";
const spring = { type: "spring" as const, stiffness: 130, damping: 22 };

export function InterfaceSculpture({ fr, paused }: { fr: boolean; paused: boolean }) {
  const [layer, setLayer] = useState(1);
  const captions = fr
    ? [
        "Penser les usages.",
        "Construire les interactions.",
        "Relier les systèmes.",
      ]
    : ["Understand the use.", "Build the interaction.", "Connect the systems."];
  return (
    <div className="hero-object">
      <div className="object-coordinate">
        <span>FIG. 01 — INTERFACE ANATOMY</span>
        <span>AP / 2026</span>
      </div>
      <svg
        className="interface-sculpture"
        viewBox="0 0 540 450"
        role="img"
        aria-label={
          fr
            ? "Trois couches d’une interface : usages, interactions et systèmes"
            : "Three layers of an interface: use, interaction and systems"
        }
      >
        <defs>
          <pattern
            id="object-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0H0V24"
              fill="none"
              stroke="#b9b4a8"
              strokeWidth=".5"
            />
          </pattern>
          <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <ellipse
          cx="274"
          cy="374"
          rx="170"
          ry="22"
          fill="#181813"
          opacity=".08"
          filter="url(#soft-shadow)"
        />
        <path
          d="M90 225L274 110 461 225M90 325L274 210 461 325M274 110V390"
          stroke="#b9b4a8"
          strokeDasharray="3 5"
          fill="none"
        />
        <motion.g
          animate={{ y: layer === 2 ? -12 : 0 }}
          transition={paused ? { duration: 0 } : spring}
        >
          <path
            d="M73 294L268 186 466 295 270 408Z"
            fill={layer === 2 ? "#e6e1d3" : "#ede9df"}
            stroke="#aaa89f"
          />
          <path
            d="M73 294v9l197 113 196-113v-8L270 408Z"
            fill="#d1cdc3"
            stroke="#aaa89f"
          />
          <g transform="matrix(.8 .45 -.8 .45 266 207)">
            <rect width="205" height="205" fill="url(#object-grid)" />
            <path
              d="M20 35H70V80H140V140H185M20 170H90V120H160V30"
              stroke={layer === 2 ? "#d94c27" : "#8e958e"}
              strokeWidth="3"
              fill="none"
            />
            {[
              [20, 35],
              [70, 80],
              [140, 140],
              [185, 140],
              [20, 170],
              [90, 120],
              [160, 30],
            ].map(([x, y], i) => (
              <rect
                key={i}
                x={x - 5}
                y={y - 5}
                width="10"
                height="10"
                fill={i === 3 ? "#e75930" : "#454f48"}
              />
            ))}
          </g>
        </motion.g>
        <motion.g
          animate={{ y: layer === 1 ? -16 : 0 }}
          transition={paused ? { duration: 0 } : spring}
        >
          <path
            d="M73 220L268 112 466 221 270 334Z"
            fill="#252d2c"
            stroke="#4e5750"
          />
          <path
            d="M73 220v9l197 113 196-113v-8L270 334Z"
            fill="#141c1a"
            stroke="#4e5750"
          />
          <g transform="matrix(.8 .45 -.8 .45 266 130)">
            <rect width="205" height="205" fill="#263431" />
            <g fill="none" stroke="#8ba58c" strokeOpacity=".3">
              <circle cx="103" cy="103" r="75" />
              <circle cx="103" cy="103" r="45" />
              <path d="M0 103h205M103 0v205" />
            </g>
            <path
              d="M0 0H45L38 43 65 63 40 90 45 125 15 140 0 135Z"
              fill="#6d8066"
            />
            <path
              d="M65 154L115 117 145 65"
              fill="none"
              stroke="#bed9a2"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <circle cx="115" cy="117" r="14" fill="#e65e37" fillOpacity=".25" />
            <path d="M115 109l6 12-6-3-6 3Z" fill="#e96b41" />
            <rect
              x="145"
              y="130"
              width="47"
              height="49"
              rx="3"
              fill="#17241f"
              stroke="#5d7261"
            />
            <path
              d="M153 141h30M153 150h18M153 159h25"
              stroke="#9fb89f"
              strokeWidth="2"
            />
          </g>
        </motion.g>
        <motion.g
          animate={{ y: layer === 0 ? -16 : 0, opacity: layer === 0 ? 1 : 0.9 }}
          transition={paused ? { duration: 0 } : spring}
        >
          <path
            d="M73 144L268 36 466 145 270 258Z"
            fill="#f7f4eb"
            stroke="#8e9188"
          />
          <path
            d="M73 144v7l197 113 196-113v-6L270 258Z"
            fill="#d8d7ca"
            stroke="#8e9188"
          />
          <g transform="matrix(.8 .45 -.8 .45 267 54)">
            <rect width="205" height="205" fill="#f7f4eb" />
            <rect x="14" y="14" width="177" height="19" rx="2" fill="#e3e3d7" />
            <circle cx="23" cy="23" r="3" fill="#ed653c" />
            <path d="M36 23h47M143 23h37" stroke="#969d90" strokeWidth="3" />
            <rect x="14" y="47" width="46" height="144" fill="#e9e9dd" />
            <path
              d="M22 59h27M22 72h19M22 85h25M22 98h15"
              stroke="#a8ae9d"
              strokeWidth="3"
            />
            <rect x="72" y="47" width="119" height="68" rx="3" fill="#c8d1b6" />
            <path
              d="M83 101l20-18 15 7 22-27 17 10 23-14"
              stroke="#677754"
              fill="none"
              strokeWidth="3"
            />
            <rect x="72" y="128" width="52" height="63" rx="3" fill="#e3e3d7" />
            <rect
              x="137"
              y="128"
              width="54"
              height="63"
              rx="3"
              fill="#e3e3d7"
            />
            <path
              d="M81 141h34M81 152h24M145 141h33M145 152h22"
              stroke="#9aa28b"
              strokeWidth="3"
            />
            <rect x="81" y="170" width="30" height="9" rx="2" fill="#e76a43" />
          </g>
        </motion.g>
        <g fill="#666b60" fontFamily="monospace" fontSize="8">
          <path d="M442 148h48M442 225h48M442 300h48" stroke="#979d90" />
          <text x="494" y="151">
            01
          </text>
          <text x="494" y="228">
            02
          </text>
          <text x="494" y="303">
            03
          </text>
        </g>
      </svg>
      <div
        className="object-selector"
        aria-label={fr ? "Explorer les couches" : "Explore the layers"}
      >
        {(fr
          ? ["USAGES", "INTERACTIONS", "SYSTÈMES"]
          : ["USE", "INTERACTION", "SYSTEMS"]
        ).map((label, index) => (
          <button
            key={label}
            aria-pressed={layer === index}
            onClick={() => setLayer(index)}
          >
            <span>0{index + 1}</span> {label}
          </button>
        ))}
      </div>
      <p className="object-caption" aria-live="polite">
        {captions[layer]} <span>↗</span>
      </p>
    </div>
  );
}

