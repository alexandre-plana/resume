import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OrbitalPreview } from "./Labs";

interface Props {
  speed: number;
  spread: number;
  cameraAngle: number;
  language: "fr" | "en";
}
export default function OrbitScene({
  speed,
  spread,
  cameraAngle,
  language,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const engine = useRef<{
    sync: (speed: number, spread: number, angle: number) => void;
  }>();
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // WebGL initialisation is an external capability check, not derived React state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor("#191c20", 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 8, 12);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 6;
    controls.maxDistance = 22;
    controls.maxPolarAngle = Math.PI * 0.85;
    scene.add(new THREE.AmbientLight("#c6cfed", 1.8));
    const light = new THREE.PointLight("#ffb878", 70, 30);
    light.position.set(0, 1, 0);
    scene.add(light);
    const sunlight = new THREE.DirectionalLight("#ffe0c1", 3);
    sunlight.position.set(-3, 5, 4);
    scene.add(sunlight);
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 40, 28),
      new THREE.MeshStandardMaterial({
        color: "#f4ab72",
        emissive: "#d37b3b",
        emissiveIntensity: 0.7,
        roughness: 0.8,
      }),
    );
    scene.add(sun);
    const planets = ["#9ebbc4", "#cab2df", "#bfa28b"].map((color, index) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry([0.17, 0.24, 0.36][index], 32, 20),
        new THREE.MeshStandardMaterial({ color, roughness: 0.6 }),
      );
      scene.add(mesh);
      return mesh;
    });
    const rings = [1.8, 2.9, 4.2].map((radius) => {
      const points = Array.from({ length: 129 }, (_, i) => {
        const t = (i / 128) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius);
      });
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: "#7b838c",
          transparent: true,
          opacity: 0.4,
        }),
      );
      scene.add(line);
      return line;
    });
    const grid = new THREE.GridHelper(14, 28, "#363c45", "#2a2e35");
    grid.position.y = -0.6;
    scene.add(grid);
    let frame = 0;
    let disposed = false;
    let velocity = 0;
    let distance = 1;
    let elapsed = 0;
    let last = 0;
    let angle = 0;
    let requestedAngle = 0;
    const draw = () => {
      planets.forEach((planet, i) => {
        const t = elapsed * [0.7, 0.4, 0.23][i] + i * 2;
        planet.position.set(
          Math.cos(t) * [1.8, 2.9, 4.2][i] * distance,
          0,
          Math.sin(t) * [1.8, 2.9, 4.2][i] * distance,
        );
      });
      rings.forEach((ring) => ring.scale.setScalar(distance));
      renderer.render(scene, camera);
    };
    const tick = (time: number) => {
      if (disposed || !velocity) return;
      elapsed += Math.min((time - last) / 1000, 0.05) * velocity;
      last = time;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const setAngle = (value: number) => {
      angle = value;
      const length = Math.hypot(camera.position.x, camera.position.z);
      camera.position.x = Math.sin(angle) * length;
      camera.position.z = Math.cos(angle) * length;
      controls.update();
      draw();
    };
    engine.current = {
      sync: (nextSpeed, nextSpread, nextAngle) => {
        const previous = velocity;
        velocity = nextSpeed;
        distance = nextSpread;
        if (requestedAngle !== nextAngle) {
          requestedAngle = nextAngle;
          setAngle(nextAngle);
        }
        draw();
        if (!velocity) cancelAnimationFrame(frame);
        else if (!previous) {
          last = performance.now();
          frame = requestAnimationFrame(tick);
        }
      },
    };
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      renderer.setSize(Math.max(width, 1), Math.max(height, 1));
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      draw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    controls.addEventListener("change", draw);
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        setAngle(Math.atan2(camera.position.x, camera.position.z) + (event.key === "ArrowLeft" ? -0.2 : 0.2));
      }
      if (event.key === "+" || event.key === "-") {
        event.preventDefault();
        camera.position.multiplyScalar(event.key === "+" ? 0.9 : 1.1);
        controls.update();
        draw();
      }
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      velocity = 0;
      cancelAnimationFrame(frame);
      setUnavailable(true);
    };
    element.addEventListener("keydown", keydown);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    resize();
    return () => {
      disposed = true;
      engine.current = undefined;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      element.removeEventListener("keydown", keydown);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.LineSegments
        ) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  useEffect(() => {
    engine.current?.sync(speed, spread, cameraAngle);
  }, [speed, spread, cameraAngle]);
  return unavailable ? (
    <div className="webgl-fallback">
      <OrbitalPreview />
      <p role="status">
        {language === "fr"
          ? "WebGL indisponible — aperçu du système orbital."
          : "WebGL unavailable — orbital system preview."}
      </p>
    </div>
  ) : (
    <div
      className="three-host"
      ref={host}
      tabIndex={0}
      role="group"
      aria-label={
        language === "fr"
          ? "Scène 3D. Glisser pour tourner, molette pour zoomer. Clavier : flèches gauche et droite, plus et moins."
          : "3D scene. Drag to orbit, scroll to zoom. Keyboard: left and right arrows, plus and minus."
      }
    >
      <span className="orbit-hint">
        {language === "fr"
          ? "GLISSER POUR EXPLORER · + / − ZOOM"
          : "DRAG TO EXPLORE · + / − ZOOM"}
      </span>
    </div>
  );
}
