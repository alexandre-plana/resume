import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { vesselPosition, workflowSteps, type WorkflowStep } from "./simulation";

export interface LabProps {
  language: "fr" | "en";
  paused: boolean;
}
const OrbitScene = lazy(() => import("./OrbitScene"));
const names = ["ALCYON", "NEREIS", "THETIS"];
const colors = ["#aff3ca", "#a6bfff", "#f7aa7c"];

// Timers and render loops only run while their own laboratory is visible.
export function useLabVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) return;
    let intersects = false;
    const update = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      update();
    });
    observer.observe(ref.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return { ref, visible };
}

export function MaritimeLab({ language, paused }: LabProps) {
  const fr = language === "fr";
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(0);
  const [trails, setTrails] = useState(true);
  const [panelKey, setPanelKey] = useState(0);
  const bounds = useRef<HTMLDivElement>(null);
  const { ref, visible } = useLabVisible();
  useEffect(() => {
    if (!playing || paused || !visible) return;
    const interval = window.setInterval(
      () => setTime((t) => (t + 1) % 101),
      160,
    );
    return () => clearInterval(interval);
  }, [playing, paused, visible]);
  const pos = vesselPosition(selected, time);
  return (
    <div className="maritime-lab" ref={ref}>
      <div className="demo-topbar">
        <span>
          <i className="signal-dot" /> XISTAR{" "}
          <span className="muted">/ MARITIME LAB</span>
        </span>
        <span className="simulation-label">
          {fr ? "DONNÉES FICTIVES" : "FICTIONAL DATA"}
        </span>
      </div>
      <div className="map-workspace" ref={bounds}>
        <svg
          className="sea-chart"
          viewBox="0 0 640 420"
          role="img"
          aria-label={
            fr
              ? "Carte maritime schématique, trois navires fictifs"
              : "Schematic maritime chart, three fictional vessels"
          }
        >
          <defs>
            <pattern
              id="sea-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#8ca2b3"
                strokeOpacity=".12"
              />
            </pattern>
            <pattern
              id="land-grid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 0 8 L 8 0" stroke="#668477" strokeOpacity=".15" />
            </pattern>
            <radialGradient id="sea-glow">
              <stop stopColor="#1f3d3b" />
              <stop offset="1" stopColor="#101e24" />
            </radialGradient>
          </defs>
          <rect width="640" height="420" fill="url(#sea-glow)" />
          <rect width="640" height="420" fill="url(#sea-grid)" />
          <path
            d="M0 0H130L118 35 145 70 125 90 150 112 138 140 115 155 117 195 90 211 76 245 42 251 27 280 0 288Z"
            fill="#263c39"
            stroke="#587366"
          />
          <path
            d="M0 0H130L118 35 145 70 125 90 150 112 138 140 115 155 117 195 90 211 76 245 42 251 27 280 0 288Z"
            fill="url(#land-grid)"
          />
          <path
            d="M450 420L475 393 510 382 531 356 565 350 585 326 640 320V420Z"
            fill="#263c39"
            stroke="#587366"
          />
          <path
            d="M560 75l18 8 13 27-24 14-18-19Z"
            fill="#304840"
            stroke="#587366"
          />
          <g fill="none" stroke="#a8dac7" strokeOpacity=".08">
            <circle cx="320" cy="210" r="75" />
            <circle cx="320" cy="210" r="140" />
            <circle cx="320" cy="210" r="205" />
            <path d="M320 0v420M110 210h420" />
          </g>
          <g fill="#8ba39f" fontSize="8" fontFamily="monospace">
            <text x="35" y="100">
              SECTOR A
            </text>
            <text x="495" y="408">
              SECTOR B
            </text>
            <text x="490" y="35">
              47° 24′ N
            </text>
            <text x="490" y="48">
              004° 32′ W
            </text>
            <text x="20" y="400">
              SCHEMATIC · NOT FOR NAVIGATION
            </text>
          </g>
          {trails &&
            names.map((name, i) => (
              <polyline
                key={name}
                points={Array.from({ length: 25 }, (_, n) => {
                  const p = vesselPosition(i, time - n);
                  return `${p.x},${p.y}`;
                }).join(" ")}
                fill="none"
                stroke={colors[i]}
                strokeOpacity=".45"
                strokeWidth="1.5"
                strokeDasharray="3 4"
              />
            ))}
          {names.map((name, i) => {
            const p = vesselPosition(i, time);
            return (
              <g
                key={name}
                transform={`translate(${p.x} ${p.y})`}
                style={{ color: colors[i] }}
              >
                {selected === i && (
                  <>
                    <circle
                      r="23"
                      fill="currentColor"
                      fillOpacity=".05"
                      stroke="currentColor"
                      strokeOpacity=".4"
                      strokeDasharray="3 5"
                    />
                    <path
                      d="M-30-20v-10h10M20-30h10v10M30 20v10H20M-20 30h-10V20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </>
                )}
                <path d="M0-10L7 8 0 4-7 8Z" fill="currentColor" />
                <text
                  x="14"
                  y="-5"
                  fill="currentColor"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {name}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="chart-controls">
          <button
            type="button"
            className={trails ? "selected" : ""}
            aria-pressed={trails}
            onClick={() => setTrails(!trails)}
          >
            {fr ? "Trajectoires" : "Trails"} ⌁
          </button>
          <button type="button" onClick={() => setPanelKey((k) => k + 1)}>
            {fr ? "Recentrer le panneau" : "Reset panel"} ↗
          </button>
        </div>
        <div className="vessel-selectors">
          {names.map((name, i) => (
            <button
              key={name}
              type="button"
              aria-pressed={selected === i}
              aria-label={`${fr ? "Sélectionner" : "Select"} ${name}`}
              onClick={() => setSelected(i)}
            >
              <span style={{ background: colors[i] }} />
              {name}
            </button>
          ))}
        </div>
        <div key={panelKey} className="vessel-panel">
          <DraggableVesselPanel
            name={names[selected]}
            pos={pos}
            fr={fr}
            bounds={bounds}
            panelKey={panelKey}
          />
        </div>
      </div>
      <div className="replay-bar">
        <button
          type="button"
          aria-label={
            playing
              ? fr
                ? "Mettre en pause"
                : "Pause"
              : fr
                ? "Lire la simulation"
                : "Play simulation"
          }
          onClick={() => setPlaying(!playing)}
          disabled={paused}
        >
          {playing && !paused ? "Ⅱ" : "▶"}
        </button>
        <span data-testid="replay-time">
          {Math.floor(time / 60)
            .toString()
            .padStart(2, "0")}
          :{(time % 60).toString().padStart(2, "0")}
        </span>
        <input
          aria-label={fr ? "Rejeu temporel" : "Replay time"}
          type="range"
          min="0"
          max="100"
          value={time}
          onChange={(e) => {
            setTime(+e.target.value);
            setPlaying(false);
          }}
        />
        <span>01:40</span>
        <span className="replay-tag">REPLAY</span>
      </div>
    </div>
  );
}

// A drag handle preserves text selection and touch interaction with the panel content.
function DraggableVesselPanel({
  name,
  pos,
  fr,
  bounds,
  panelKey,
}: {
  name: string;
  pos: { x: number; y: number };
  fr: boolean;
  bounds: React.RefObject<HTMLDivElement>;
  panelKey: number;
}) {
  // The panel itself is translated using pointer capture, with a keyboard reset outside it.
  const panel = useRef<HTMLDivElement>(null);
  const start = useRef({ x: 0, y: 0, left: 0, top: 0 });
  return (
    <div
      className="vessel-panel-inner"
      ref={panel}
      data-testid="vessel-detail"
      key={panelKey}
    >
      <div
        className="panel-grip"
        onPointerDown={(e) => {
          const el = panel.current!;
          start.current = {
            x: e.clientX,
            y: e.clientY,
            left: el.offsetLeft,
            top: el.offsetTop,
          };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (
            !e.currentTarget.hasPointerCapture(e.pointerId) ||
            !panel.current ||
            !bounds.current
          )
            return;
          const el = panel.current;
          el.style.left = `${Math.max(0, Math.min(bounds.current.clientWidth - el.offsetWidth, start.current.left + e.clientX - start.current.x))}px`;
          el.style.top = `${Math.max(0, Math.min(bounds.current.clientHeight - el.offsetHeight, start.current.top + e.clientY - start.current.y))}px`;
        }}
        onPointerUp={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
      >
        <span>⠿ {fr ? "TÉLÉMÉTRIE" : "TELEMETRY"}</span>
        <span>↗</span>
      </div>
      <strong>
        {name}
        <i className="signal-dot" />
      </strong>
      <span className="vessel-type">
        {fr ? "Navire de recherche · simulé" : "Research vessel · simulated"}
      </span>
      <div className="telemetry">
        <span>
          {fr ? "VITESSE" : "SPEED"}
          <b>
            {(8 + pos.x / 100).toFixed(1)} <small>kn</small>
          </b>
        </span>
        <span>
          {fr ? "CAP" : "HEADING"}
          <b>
            {Math.round(pos.y)}
            <small>°</small>
          </b>
        </span>
      </div>
      <div className="telemetry-wave" aria-hidden="true">
        ▁▂▂▃▅▄▃▅▆▄▅▇▆▅▆▇
      </div>
      <span className="panel-caption">
        {fr
          ? "Déplacer par l’en-tête · redimensionner ↘"
          : "Drag the header · resize ↘"}
      </span>
    </div>
  );
}

export function DesignLab({ language }: LabProps) {
  const fr = language === "fr";
  const [dark, setDark] = useState(false);
  const [accent, setAccent] = useState("#6355c7");
  const [radius, setRadius] = useState(12);
  const [compact, setCompact] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  return (
    <div className="design-lab">
      <div className="design-controls">
        <span className="mono">TOKENS / LIVE</span>
        <div className="segmented">
          <button
            aria-pressed={!dark}
            aria-label={fr ? "Thème clair" : "Light theme"}
            onClick={() => setDark(false)}
          >
            ☼
          </button>
          <button
            aria-pressed={dark}
            aria-label={fr ? "Thème sombre" : "Dark theme"}
            onClick={() => setDark(true)}
          >
            ◐
          </button>
        </div>
        <div className="swatches">
          {["#6355c7", "#b83b1f", "#167050"].map((color) => (
            <button
              key={color}
              aria-label={`${fr ? "Accent" : "Accent"} ${color}`}
              aria-pressed={accent === color}
              style={{ background: color }}
              onClick={() => setAccent(color)}
            />
          ))}
        </div>
      </div>
      <div
        className="component-preview"
        data-testid="design-preview"
        data-theme={dark ? "dark" : "light"}
        style={
          {
            "--lab-accent": accent,
            "--lab-radius": `${radius}px`,
            "--lab-space": compact ? "14px" : "24px",
          } as CSSProperties
        }
      >
        <div className="preview-card">
          <div className="preview-card-top">
            <span className="mini-avatar">AP</span>
            <span className="preview-status">
              ● {fr ? "Espace personnel" : "Personal space"}
            </span>
          </div>
          <h4>{fr ? "Le détail fait système." : "Details make a system."}</h4>
          <p>
            {fr
              ? "Une même intention, dans chaque état."
              : "The same intention, in every state."}
          </p>
          <div className="preview-switch-row">
            <span>Notifications</span>
            <button
              type="button"
              role="switch"
              aria-label="Notifications"
              aria-checked={notifications}
              className="preview-switch"
              onClick={() => {
                setNotifications(!notifications);
                setSaved(false);
              }}
            >
              <span />
            </button>
          </div>
          <button className="preview-primary" onClick={() => setSaved(true)}>
            {saved ? "✓ " : ""}
            {saved
              ? fr
                ? "Enregistré"
                : "Saved"
              : fr
                ? "Enregistrer"
                : "Save changes"}{" "}
            <span>↗</span>
          </button>
          <div role="status" className="save-feedback">
            {saved
              ? fr
                ? "Modifications enregistrées"
                : "Changes saved"
              : " "}
          </div>
        </div>
      </div>
      <div className="design-bottom">
        <label>
          {fr ? "Rayon" : "Radius"} <output>{radius}px</output>
          <input
            aria-label={fr ? "Rayon des composants" : "Component radius"}
            type="range"
            min="0"
            max="24"
            value={radius}
            onChange={(e) => setRadius(+e.target.value)}
          />
        </label>
        <button
          className="density-toggle"
          aria-pressed={compact}
          onClick={() => setCompact(!compact)}
        >
          {compact ? (fr ? "Compact" : "Compact") : fr ? "Confort" : "Comfort"}{" "}
          ⇅
        </button>
      </div>
    </div>
  );
}

const stepLabels: Record<WorkflowStep, [string, string]> = {
  prepare: ["Préparer", "Prepare"],
  execute: ["Exécuter", "Execute"],
  verify: ["Vérifier", "Verify"],
  finding: ["Écart détecté", "Finding detected"],
  fix: ["Corriger", "Fix"],
  reverify: ["Revérifier", "Re-verify"],
  accept: ["Accepté", "Accepted"],
};
export function WorkflowLab({ language, paused }: LabProps) {
  const fr = language === "fr";
  const [finding, setFinding] = useState(true);
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const { ref, visible } = useLabVisible();
  const steps = workflowSteps(finding);
  const current = steps[step];
  const done = step === steps.length - 1;
  useEffect(() => {
    if (!running || paused || !visible || done) return;
    const timer = setTimeout(
      () => setStep((s) => Math.min(s + 1, steps.length - 1)),
      850,
    );
    return () => clearTimeout(timer);
  }, [running, paused, visible, step, steps.length, done]);
  const nodes: WorkflowStep[] = [
    "prepare",
    "execute",
    "verify",
    "accept",
    "finding",
    "fix",
    "reverify",
  ];
  const points = [
    [70, 70],
    [220, 70],
    [370, 70],
    [520, 70],
    [370, 190],
    [220, 190],
    [70, 190],
  ];
  return (
    <div className="workflow-lab" ref={ref}>
      <div className="demo-topbar">
        <span>
          <i className="signal-dot violet" /> IASIT / AGENT RUNTIME
        </span>
        <span className="simulation-label">SIMULATION</span>
      </div>
      <div className="workflow-chart">
        <svg viewBox="0 0 590 260" aria-hidden="true">
          <path
            d="M70 70H520M370 70V190H70V120H370"
            fill="none"
            stroke="#41434c"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
          {running && !paused && !done && (
            <path
              className="flow-path"
              d={finding ? "M70 70H370V190H70V120H370V70H520" : "M70 70H520"}
              fill="none"
              stroke="#c3b2f0"
              strokeWidth="2"
              strokeDasharray="12 28"
            />
          )}
          {nodes.map((node, i) => {
            const visited =
              steps.indexOf(node) >= 0 && steps.indexOf(node) <= step;
            return (
              <g
                key={node}
                transform={`translate(${points[i][0]} ${points[i][1]})`}
                className={current === node ? "current-node" : ""}
              >
                <rect
                  x="-24"
                  y="-24"
                  width="48"
                  height="48"
                  rx="12"
                  fill={
                    current === node
                      ? "#d6c3ff"
                      : visited
                        ? "#474155"
                        : "#23262d"
                  }
                  stroke={visited ? "#c0a9ee" : "#494953"}
                />
                <text
                  y="5"
                  textAnchor="middle"
                  fill={current === node ? "#1d1923" : "#d6cce7"}
                  fontSize="17"
                >
                  {visited ? "✓" : ["◇", "⌘", "⌕", "↗", "!", "⌁", "↻"][i]}
                </text>
                <text
                  y="46"
                  textAnchor="middle"
                  fill={visited ? "#ede7f8" : "#9996a7"}
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {stepLabels[node][fr ? 0 : 1]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="workflow-status" role="status">
        <span>
          {current ? String(step + 1).padStart(2, "0") : "—"} /{" "}
          {String(steps.length).padStart(2, "0")}
        </span>
        <strong>
          {current
            ? stepLabels[current][fr ? 0 : 1]
            : fr
              ? "Prêt à exécuter"
              : "Ready to run"}
        </strong>
        <span>
          {current === "finding"
            ? fr
              ? "Acceptation bloquée"
              : "Acceptance blocked"
            : current === "accept"
              ? "✓"
              : "…"}
        </span>
      </div>
      <div className="workflow-actions">
        <button
          className="dark-primary"
          disabled={paused || done}
          onClick={() => setRunning(!running)}
        >
          {running && !done ? "Ⅱ" : "▶"}{" "}
          {running && !done ? "Pause" : fr ? "Lancer" : "Run"}
        </button>
        <button
          aria-label={fr ? "Étape suivante" : "Next step"}
          disabled={done}
          onClick={() => {
            setRunning(false);
            setStep((s) => Math.min(s + 1, steps.length - 1));
          }}
        >
          →
        </button>
        <button
          aria-label={fr ? "Réinitialiser" : "Reset"}
          onClick={() => {
            setRunning(false);
            setStep(-1);
          }}
        >
          ↺
        </button>
        <label>
          <input
            type="checkbox"
            checked={finding}
            onChange={(e) => {
              setFinding(e.target.checked);
              setStep(-1);
              setRunning(false);
            }}
          />
          {fr ? "Simuler un écart" : "Simulate a finding"}
        </label>
      </div>
    </div>
  );
}

export function OrbitalPreview() {
  return (
    <svg className="orbital-preview" viewBox="0 0 600 350" aria-hidden="true">
      <defs>
        <radialGradient id="planet-light">
          <stop stopColor="#ffe2bc" />
          <stop offset=".55" stopColor="#f89b62" />
          <stop offset="1" stopColor="#6f3e2b" />
        </radialGradient>
      </defs>
      <g
        fill="none"
        stroke="#b1a49a"
        strokeOpacity=".35"
        transform="translate(300 175) rotate(-24)"
      >
        <ellipse rx="110" ry="45" />
        <ellipse rx="190" ry="80" />
        <ellipse rx="260" ry="115" />
        <path d="M-285 0h570M0-145v290" strokeDasharray="3 5" />
      </g>
      <circle cx="300" cy="175" r="36" fill="url(#planet-light)" />
      <circle cx="131" cy="193" r="12" fill="#b7c8d8" />
      <circle cx="463" cy="86" r="8" fill="#d4c4ea" />
      <circle cx="526" cy="132" r="17" fill="#bba58a" />
      <path d="M285 175h30M300 160v30" stroke="#fff" strokeOpacity=".4" />
      <g fontFamily="monospace" fontSize="9" fill="#b8ab9f">
        <text x="30" y="320">
          PROCEDURAL SYSTEM / 03 BODIES
        </text>
        <text x="435" y="320">
          ORBITAL EXPLORER
        </text>
      </g>
    </svg>
  );
}
export function OrbitLab({ language, paused }: LabProps) {
  const fr = language === "fr";
  const [active, setActive] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [spread, setSpread] = useState(1);
  const [camera, setCamera] = useState(0);
  const { ref, visible } = useLabVisible();
  return (
    <div className="orbit-lab" ref={ref}>
      <div className="demo-topbar">
        <span>VORRERY / ORBITAL EXPLORER</span>
        <span className="simulation-label">
          {fr ? "EXPÉRIENCE 3D" : "3D EXPERIMENT"}
        </span>
      </div>
      <div className="orbit-stage">
        {active ? (
          <Suspense fallback={<OrbitalPreview />}>
            <OrbitScene
              speed={paused || !visible ? 0 : speed}
              spread={spread}
              cameraAngle={camera}
              language={language}
            />
          </Suspense>
        ) : (
          <>
            <OrbitalPreview />
            <button className="activate-orbit" onClick={() => setActive(true)}>
              {fr ? "Explorer en 3D" : "Explore in 3D"} <span>↗</span>
            </button>
          </>
        )}
      </div>
      <div className="orbit-controls">
        <label>
          {fr ? "Vitesse" : "Speed"} <output>{speed.toFixed(1)}×</output>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={speed}
            aria-label={fr ? "Vitesse orbitale" : "Orbital speed"}
            onChange={(e) => setSpeed(+e.target.value)}
          />
        </label>
        <label>
          {fr ? "Distance" : "Distance"} <output>{spread.toFixed(1)}×</output>
          <input
            type="range"
            min="0.7"
            max="1.4"
            step="0.1"
            value={spread}
            aria-label={fr ? "Distance orbitale" : "Orbital distance"}
            onChange={(e) => setSpread(+e.target.value)}
          />
        </label>
        <button
          aria-label={fr ? "Tourner la caméra" : "Rotate camera"}
          onClick={() => setCamera((c) => c + Math.PI / 4)}
        >
          ↻
        </button>
      </div>
    </div>
  );
}
