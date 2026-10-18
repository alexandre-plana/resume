import { useState, type KeyboardEvent } from 'react'
import type { Language } from '../locales'
import type { JourneyEvent } from './model'

const iso = (x: number, y: number, z = 0) => [400 + (x - y) * 37, 290 + (x + y) * 19 - z * 35]
const path = (points: number[][]) => points.map(p => p.join(',')).join(' ')

function Block({ x, y, w = 1, d = 1, h = 1, color = '#e4ecf5', accent = '#c6d8eb' }: { x: number; y: number; w?: number; d?: number; h?: number; color?: string; accent?: string }) {
  const a = iso(x, y), b = iso(x + w, y), c = iso(x + w, y + d), e = iso(x, y + d)
  const top = [iso(x, y, h), iso(x + w, y, h), iso(x + w, y + d, h), iso(x, y + d, h)]
  return <g stroke="#b0c4da" strokeWidth="1" strokeLinejoin="round">
    <polygon points={path([a, b, top[1], top[0]])} fill={color} />
    <polygon points={path([b, c, top[2], top[1]])} fill={accent} />
    <polygon points={path([e, c, top[2], top[3]])} fill={color} />
    <polygon points={path(top)} fill="#f7faff" />
  </g>
}

interface Props { event: JourneyEvent; time: number; progress: number; language: Language }
export function JourneyScene({ event, time, progress, language }: Props) {
  const fr = language === 'fr'
  const [selected, setSelected] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [view, setView] = useState(false)
  const [layer, setLayer] = useState(true)
  const [experiment, setExperiment] = useState(1)
  const scene = event.scene
  const industrial = scene === 'industrial' || scene === 'augmented'
  const alpha = 0.8 + 0.2 * progress
  const lift = (1 - progress) * 28
  const activateKey = (e: KeyboardEvent<SVGGElement>, value: number) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(value) }
  }
  const equipment = fr ? ['Module de simulation', 'Poste opérateur', 'Procédure guidée'] : ['Simulation module', 'Operator station', 'Guided procedure']
  const moduleNames = fr ? ['Connecteurs', 'Calculs', 'Conditions', 'Alertes', 'Scripting', 'Composants partagés'] : ['Connectors', 'Calculations', 'Conditions', 'Alerts', 'Scripting', 'Shared components']
  const isOrbit = event.project?.name === 'vorrery'
  const isKin = event.project?.name === 'kin'
  const isTactical = event.project?.name === 'n-fold-protocol'
  const personalLabels = isKin ? (fr ? ['Bibliothèque', 'Stockage local', 'Synchronisation', 'Appareils'] : ['Library', 'Local storage', 'Synchronization', 'Devices']) : isTactical ? (fr ? ['Préparer', 'Programmer', 'Simuler', 'Observer'] : ['Prepare', 'Program', 'Simulate', 'Observe']) : ['Run', 'Verify', 'Finding', 'Fix', 'Re-verify', 'Learned rules']
  const sceneLabel = industrial ? (fr ? 'Simulation industrielle interactive' : 'Interactive industrial simulation') : scene === 'edge' ? (fr ? 'Architecture modulaire interactive' : 'Interactive modular architecture') : scene === 'maritime' ? (fr ? 'Carte maritime de démonstration' : 'Demonstration maritime map') : (fr ? 'Laboratoire de projets personnels' : 'Personal project laboratory')

  return <section className="journey-visual" aria-label={sceneLabel}>
    <div className="journey-visual-meta"><span><i />{scene === 'industrial' ? 'UNITY / C#' : scene === 'augmented' ? 'AUGMENTED OPERATOR ADVISOR' : scene === 'edge' ? 'IIoT / MICRO-FRONTENDS' : scene === 'maritime' ? 'XISTAR / MARINE COMMAND CENTER' : `~/projects/${event.project?.name}`}</span><span>{fr ? 'VUE INTERACTIVE' : 'INTERACTIVE VIEW'} ↗</span></div>
    <svg className="journey-world" viewBox="0 0 800 530" role="group" aria-label={sceneLabel}>
      <defs>
        <linearGradient id="journey-ground" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f0f6fd" /><stop offset="1" stopColor="#dce8f7" /></linearGradient>
        <linearGradient id="journey-sea" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#eff7ff" /><stop offset="1" stopColor="#daeafa" /></linearGradient>
        <pattern id="journey-dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#d3dfed" /></pattern>
        <pattern id="journey-map-grid" width="52" height="52" patternUnits="userSpaceOnUse"><path d="M 52 0 L 0 0 0 52" fill="none" stroke="#bccfe4" strokeWidth="0.6" /></pattern>
        <filter id="journey-shadow" x="-30%" y="-40%" width="170%" height="200%"><feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#6283b4" floodOpacity="0.12" /></filter>
      </defs>
      <rect width="800" height="530" fill="url(#journey-dots)" opacity="0.48" />
      <g transform={`translate(400 260) scale(${zoom}) translate(-400 -260)`}>
        {/* The same industrial geometry persists from simulation into AR and Edge. */}
        <g aria-hidden={!industrial} style={{ pointerEvents: industrial ? 'auto' : 'none' }} opacity={industrial ? alpha : scene === 'edge' ? 0.13 : 0} transform={`translate(${scene === 'edge' ? 125 : view ? -20 : 0} ${lift + (view ? -30 : 0)}) scale(1 ${view ? 0.84 : 1})`}>
          <ellipse cx="400" cy="398" rx="254" ry="61" fill="#799bc6" opacity="0.07" />
          <polygon points="105,292 400,140 695,292 400,446" fill="url(#journey-ground)" stroke="#bdcfe4" filter="url(#journey-shadow)" />
          {Array.from({ length: 9 }, (_, i) => <g key={i} stroke="#b8cde4" opacity="0.65" strokeWidth="0.6"><line x1={105 + i * 37} y1={292 - i * 19} x2={400 + i * 37} y2={446 - i * 19} /><line x1={105 + i * 37} y1={292 + i * 19} x2={400 + i * 37} y2={140 + i * 19} /></g>)}
          <Block x={-3.1} y={-2.8} w={3.6} d={1.6} h={1.6} />
          <Block x={-2.8} y={-2.45} w={0.7} d={0.8} h={2.7} color="#d7e7f8" accent="#b1c9e6" />
          <Block x={-0.4} y={-2.2} w={0.5} d={0.65} h={2.1} />
          <Block x={1.5} y={0.4} w={2} d={1} h={0.4} color="#c9d9ed" />
          <Block x={-3.2} y={1.2} w={1.5} d={1.1} h={1.3} color="#d1e4f8" accent="#a9c8eb" />
          <Block x={1.7} y={-1.8} w={1.4} d={1.4} h={1.1} color="#dcecf8" accent="#bad7ed" />
          <path d="M 289 320 L 407 260 L 505 310" stroke="#7aaee8" strokeWidth="12" fill="none" />
          <path d="M 289 320 L 407 260 L 505 310" stroke="#e5f2ff" strokeWidth="9" fill="none" strokeDasharray="4 6" strokeDashoffset={-time * 12} />
          <g transform={`translate(${Math.sin(time * 0.45) * 12} ${Math.sin(time * 0.45) * -6})`}><Block x={-0.6} y={0.7} w={0.5} d={0.5} h={0.65} color="#77acec" accent="#3b82dc" /></g>
          {[[-0.6, 2.3], [2.4, -0.3]].map(([x, y], i) => { const [px, py] = iso(x, y); return <g key={i} transform={`translate(${px} ${py})`}><ellipse rx="13" ry="5" fill="#809ec2" opacity="0.2" /><path d="M-4 -7 L-6 -27 Q0 -35 6 -27 L4 -7" fill={i === 0 ? '#5999ed' : '#8298b4'} /><circle cy="-39" r="7" fill="#bfd4ed" /><path d="M-3 -8 L-4 0 M3 -8 L4 0" stroke="#53749d" strokeWidth="3" /></g> })}
          {[[300, 219], [502, 305], [274, 350]].map(([x, y], i) => <g key={i} role="button" tabIndex={industrial ? 0 : -1} aria-label={`${fr ? 'Inspecter' : 'Inspect'} ${equipment[i]}`} aria-pressed={selected % 3 === i} onClick={() => setSelected(i)} onKeyDown={e => activateKey(e, i)} className="journey-svg-button">
            <circle cx={x} cy={y} r="17" fill="#0969da" opacity={selected % 3 === i ? 0.12 : 0.04} /><circle cx={x} cy={y} r="5" fill="#fff" stroke="#0969da" strokeWidth="2" />
            <path d={`M${x} ${y - 12} v-30 h${i === 1 ? 36 : -45}`} stroke="#8ba8ce" fill="none" strokeWidth="1" /><text x={x + (i === 1 ? 42 : -135)} y={y - 38} fill="#536c8b" fontSize="10">{equipment[i]}</text>
          </g>)}
          <text x="399" y="471" textAnchor="middle" fill="#8195ae" fontSize="10" letterSpacing="2">{fr ? 'SCÉNARIOS · INTERACTIONS · TEMPS RÉEL' : 'SCENARIOS · INTERACTIONS · REAL TIME'}</text>
        </g>
        {scene === 'augmented' && <g transform={`translate(${(1 - progress) * 80} 0)`} opacity={alpha}>
          <rect x="424" y="108" width="274" height="255" rx="16" fill="#fff" stroke="#b5cde9" strokeWidth="2" filter="url(#journey-shadow)" />
          <rect x="436" y="124" width="250" height="222" rx="8" fill="#f1f7fe" />
          <path d="M451 171 v-27 h27 M644 144 h27 v27 M451 299 v27 h27 M644 326 h27 v-27" fill="none" stroke="#0969da" strokeWidth="2" />
          <rect x="469" y="186" width="184" height="43" rx="6" fill="#fff" stroke="#cdddec" /><circle cx="487" cy="207" r="5" fill="#2da56c" /><text x="501" y="211" fontSize="12" fill="#3e5876">{fr ? 'Équipement identifié' : 'Equipment identified'}</text>
          <rect x="469" y="242" width="184" height="53" rx="6" fill="#e3efff" /><text x="483" y="263" fontSize="11" fill="#0969da">{equipment[selected % 3]}</text><text x="483" y="283" fontSize="10" fill="#627b99">{fr ? 'Procédure disponible hors ligne' : 'Procedure available offline'}</text>
          <text x="561" y="385" textAnchor="middle" fontSize="11" fill="#6b83a0">ANDROID · iOS · WINDOWS</text>
        </g>}
        {scene === 'edge' && <g opacity={alpha} transform={`translate(0 ${lift})`}>
          <path d="M155 262 H645 M273 190 V390 M518 190 V390" stroke="#9ab9df" fill="none" strokeWidth="1.5" strokeDasharray="5 7" strokeDashoffset={-time * 14} />
          {moduleNames.map((name, i) => { const x = 135 + i % 3 * 182, y = 128 + Math.floor(i / 3) * 155; return <g key={name} role="button" tabIndex={0} aria-label={`${fr ? 'Inspecter' : 'Inspect'} ${name}`} aria-pressed={selected % 6 === i} onClick={() => setSelected(i)} onKeyDown={e => activateKey(e, i)} className="journey-svg-button" transform={`translate(0 ${(1 - progress) * (i + 1) * 5})`}>
            <rect x={x} y={y} width="160" height="122" rx="9" fill="#fff" stroke={selected % 6 === i ? '#0969da' : '#c6d7e9'} filter="url(#journey-shadow)" />
            <rect x={x + 13} y={y + 14} width="27" height="27" rx="6" fill={i % 2 ? '#eee7ff' : '#e2f1ff'} /><text x={x + 26.5} y={y + 33} textAnchor="middle" fill={i % 2 ? '#8250df' : '#0969da'} fontSize="15">{['⇄', 'ƒ', '⋈', '◉', '›_', '▦'][i]}</text>
            <circle cx={x + 141} cy={y + 23} r="3" fill="#2da56c" /><text x={x + 13} y={y + 66} fontSize="12" fill="#253d5a" fontWeight="600">{name}</text>
            <rect x={x + 13} y={y + 82} width="95" height="4" rx="2" fill="#e1e9f3" /><rect x={x + 13} y={y + 94} width={55 + Math.sin(time + i) * 15} height="4" rx="2" fill="#c9dff8" />
          </g> })}
          <text x="400" y="453" textAnchor="middle" fill="#8096b1" fontSize="11" letterSpacing="2">VUE 3 · TYPESCRIPT · SINGLE-SPA</text>
        </g>}
        {scene === 'maritime' && <g transform={`translate(0 ${lift})`} opacity={alpha}>
          <rect x="83" y="78" width="639" height="359" rx="10" fill="url(#journey-sea)" stroke="#bfd2e7" filter="url(#journey-shadow)" />
          <rect x="83" y="78" width="639" height="359" rx="10" fill="url(#journey-map-grid)" />
          <path d="M83 78H289L271 101L290 125L270 145L255 138L237 179L251 200L215 236L205 271L165 287L145 323L119 309L83 342Z" fill="#e8eef0" stroke="#b6cbd9" />
          <path d="M83 90H277L258 103L276 125L256 146L240 139L224 179L236 199L200 234L192 265L157 276L137 307L116 298L83 323" fill="none" stroke="#c9d7dc" strokeWidth="1" />
          <path d="M470 437q-90-130 20-245t180-70 M510 437q-70-140 30-235t182-30 M555 437q-55-135 40-218t127-10" fill="none" stroke="#a8c5e2" strokeWidth="1" opacity="0.45" />
          <text x="315" y="397" fontSize="12" letterSpacing="6" fill="#86a6c7">{fr ? 'ZONE DE DÉMONSTRATION' : 'DEMONSTRATION AREA'}</text>
          {[0, 1, 2, 3].map(i => { const x = 333 + i * 82 + Math.sin(time * 0.2 + i) * 28, y = 160 + (i % 2) * 140 + Math.cos(time * 0.16 + i) * 23; return <g key={i}>
            {layer && <path d={`M${x - 53} ${y + 50} Q${x - 31} ${y + 4} ${x} ${y}`} stroke={i % 2 ? '#28a57c' : '#0969da'} strokeWidth="1.5" strokeDasharray="4 4" fill="none" />}
            <g role="button" tabIndex={0} aria-label={`${fr ? 'Inspecter la piste fictive' : 'Inspect synthetic track'} DEMO-${i + 1}`} aria-pressed={selected % 4 === i} onClick={() => setSelected(i)} onKeyDown={e => activateKey(e, i)} className="journey-svg-button">
              <circle cx={x} cy={y} r={selected % 4 === i ? 25 : 15} fill="#0969da" opacity="0.07" /><path d={`M${x} ${y - 11}l8 19-8-4-8 4Z`} fill={i % 2 ? '#2c9b7e' : '#0969da'} stroke="#fff" strokeWidth="1.5" />
              <text x={x + 15} y={y - 6} fill="#466582" fontSize="10">DEMO-0{i + 1}</text>
            </g>
          </g> })}
          <rect x="98" y="92" width="163" height="30" rx="5" fill="#fff" opacity="0.95" /><circle cx="113" cy="107" r="3" fill="#0969da" /><text x="124" y="111" fontSize="10" fill="#375d86">{fr ? 'SIMULATION · DONNÉES FICTIVES' : 'SIMULATION · SYNTHETIC DATA'}</text>
          <rect x="552" y="365" width="155" height="57" rx="6" fill="#fff" stroke="#c5d8ed" /><text x="565" y="386" fontSize="12" fill="#0969da" fontWeight="600">DEMO-0{selected % 4 + 1}</text><text x="565" y="405" fontSize="10" fill="#6c839e">{fr ? 'Piste simulée · sélectionnée' : 'Simulated track · selected'}</text>
          <text x="400" y="469" textAnchor="middle" fill="#8096b1" fontSize="11" letterSpacing="2">REACT · GO · MAPLIBRE · DECK.GL</text>
        </g>}
        {scene === 'personal' && <g opacity={alpha} transform={`translate(0 ${lift})`}>
          {isOrbit ? <g transform="translate(400 260)">
            {[115, 180, 247].map((r, i) => { const angle = time * 0.18 / (i + 1) * experiment + i * 2; return <g key={r}><ellipse rx={r} ry={r * 0.48} fill="none" stroke="#bfd0e7" strokeDasharray="2 6" /><circle cx={Math.cos(angle) * r} cy={Math.sin(angle) * r * 0.48} r={[13, 20, 16][i]} fill={['#90b8e8', '#a2d4bf', '#c1abe4'][i]} stroke="#fff" strokeWidth="3" /></g> })}
            <circle r="43" fill="#f7dfae" stroke="#eec87c" strokeWidth="2" /><circle r="58" fill="#f7dfae" opacity="0.15" />
            <text y="186" textAnchor="middle" fill="#6d84a3" fontSize="12">{fr ? 'EXPÉRIMENTER · OBSERVER · COMPRENDRE' : 'EXPERIMENT · OBSERVE · UNDERSTAND'}</text>
          </g> : <>
            <path d="M190 205H590V350H190Z" stroke="#afc9e8" fill="none" strokeWidth="2" strokeDasharray="4 8" strokeDashoffset={-time * 16} />
            {personalLabels.map((name, i) => { const x = 140 + (i % 3) * 186, y = 145 + Math.floor(i / 3) * 155; return <g key={name} role="button" tabIndex={0} aria-label={`${fr ? 'Explorer' : 'Explore'} ${name}`} aria-pressed={selected % personalLabels.length === i} onClick={() => setSelected(i)} onKeyDown={e => activateKey(e, i)} className="journey-svg-button">
              <rect x={x} y={y} width="155" height="108" rx="10" fill="#fff" stroke={selected % personalLabels.length === i ? '#8250df' : '#d7d9ed'} filter="url(#journey-shadow)" />
              <text x={x + 15} y={y + 31} fill="#a090c8" fontSize="12">{isTactical ? '◇' : isKin ? '▱' : '⌘'} 0{i + 1}</text><text x={x + 15} y={y + 61} fill="#4c4775" fontSize="13" fontWeight="600">{name}</text><rect x={x + 15} y={y + 78} width="86" height="4" rx="2" fill="#ece9f5" />
            </g> })}
            <text x="400" y="460" textAnchor="middle" fill="#9684b5" fontSize="11" letterSpacing="2">{fr ? 'EXPLORATIONS PERSONNELLES / SCHÉMA INTERACTIF' : 'PERSONAL EXPLORATIONS / INTERACTIVE DIAGRAM'}</text>
          </>}
        </g>}
      </g>
    </svg>
    <div className="journey-scene-toolbar">
      <div className="journey-scene-inspector"><span className="journey-scene-dot" /><span>{industrial ? equipment[selected % 3] : scene === 'edge' ? moduleNames[selected % 6] : scene === 'maritime' ? `DEMO-0${selected % 4 + 1}` : isOrbit ? (fr ? 'Système orbital' : 'Orbital system') : personalLabels[selected % personalLabels.length]}<small>{fr ? 'Cliquez sur un élément pour l’explorer' : 'Select an element to explore'}</small></span></div>
      <div className="journey-scene-tools">
        {industrial && <button type="button" aria-pressed={view} title={fr ? 'Changer le point de vue' : 'Change viewpoint'} aria-label={fr ? 'Changer le point de vue' : 'Change viewpoint'} onClick={() => setView(!view)}>◇</button>}
        {scene === 'maritime' && <button type="button" aria-pressed={layer} title={fr ? 'Afficher les trajectoires' : 'Show trails'} aria-label={fr ? 'Afficher les trajectoires' : 'Show trails'} onClick={() => setLayer(!layer)}>⌁</button>}
        {scene === 'personal' && isOrbit && <label className="journey-orbit-speed"><span>{fr ? 'Orbite' : 'Orbit'}</span><input type="range" min="0.5" max="2" step="0.1" value={experiment} aria-label={fr ? 'Vitesse orbitale' : 'Orbital speed'} onChange={e => setExperiment(Number(e.target.value))} /></label>}
        <button type="button" aria-label={fr ? 'Dézoomer la scène' : 'Zoom out'} disabled={zoom <= 0.8} onClick={() => setZoom(v => Math.max(0.8, v - 0.1))}>−</button><span>{Math.round(zoom * 100)}%</span><button type="button" aria-label={fr ? 'Zoomer la scène' : 'Zoom in'} disabled={zoom >= 1.3} onClick={() => setZoom(v => Math.min(1.3, v + 0.1))}>+</button>
      </div>
    </div>
    <p className="journey-scene-caption">{scene === 'maritime' ? (fr ? 'Illustration interactive · toutes les pistes sont fictives' : 'Interactive illustration · all tracks are synthetic') : (fr ? 'Illustration interactive du domaine · cliquez pour explorer' : 'Interactive domain illustration · select to explore')}</p>
  </section>
}
