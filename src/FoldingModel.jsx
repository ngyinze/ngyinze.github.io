import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { areas } from "./projects";

export default function FoldingModel({ selected, onSelect, onStatus, reset }) {
  const canvasRef = useRef(null);
  const api = useRef(null);
  const selection = useRef(onSelect);
  selection.current = onSelect;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: "low-power",
      });
    } catch {
      setStatus("unavailable");
      return;
    }
    let disposed = false;
    let contextAvailable = true;
    let frame = 0;
    let idleTimer = 0;
    let visible = true;
    let dragging = null;
    let lastTime = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
    camera.position.set(-3.8, 3.4, 6.5);
    camera.lookAt(0, 1.65, 0.7);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0xeaf0fb, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.65;
    room.dispose();
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xf2f6ff, 0x8594b5, 0.8));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(-3, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.normalBias = 0.025;
    keyLight.shadow.bias = -0.0002;
    keyLight.shadow.radius = 5;
    keyLight.shadow.blurSamples = 8;
    scene.add(keyLight);

    const blue = new THREE.MeshStandardMaterial({
      color: 0x2046c8,
      roughness: 0.32,
      metalness: 0.12,
    });
    const yellow = new THREE.MeshStandardMaterial({
      color: 0xf5ff3b,
      roughness: 0.35,
      metalness: 0.18,
    });
    const emboss = new THREE.MeshStandardMaterial({
      color: 0x234cc8,
      roughness: 0.4,
      metalness: 0.16,
    });
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.ShadowMaterial({ color: 0x344776, opacity: 0.18 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.06;
    floor.receiveShadow = true;
    scene.add(floor);
    const assembly = new THREE.Group();
    assembly.position.set(-2.1, 0, 0.15);
    scene.add(assembly);

    const geometry = new RoundedBoxGeometry(1.65, 3.35, 0.18, 5, 0.09);
    const edgeGeometry = new RoundedBoxGeometry(1.65, 3.35, 0.14, 5, 0.07);
    const hitTargets = [];
    const roots = [assembly, new THREE.Group(), new THREE.Group()];
    roots[1].position.x = 1.65;
    roots[2].position.x = 1.65;
    roots[0].add(roots[1]);
    roots[1].add(roots[2]);

    function mesh(geo, mat, parent, x, y, z) {
      const object = new THREE.Mesh(geo, mat);
      object.position.set(x, y, z);
      object.castShadow = true;
      object.receiveShadow = true;
      parent.add(object);
      return object;
    }
    function box(w, h, d, parent, x, y, z, mat = emboss, radius = 0.04) {
      return mesh(
        new RoundedBoxGeometry(w, h, d, 3, radius),
        mat,
        parent,
        x,
        y,
        z,
      );
    }
    for (let index = 0; index < 3; index++) {
      const root = roots[index];
      mesh(edgeGeometry, yellow, root, 0.825, 1.675, -0.016);
      const panel = mesh(geometry, blue, root, 0.825, 1.675, 0.015);
      panel.userData.area = areas[index];
      hitTargets.push(panel);
      // Both faces carry the discipline so the sculpture stays legible when turned.
      for (const side of [1, -1]) {
        const symbol = new THREE.Group();
        symbol.position.set(0.825, 1.72, 0.125 * side);
        symbol.rotation.y = side === -1 ? Math.PI : 0;
        root.add(symbol);
        if (index === 0) {
          for (const x of [-0.235, 0.235])
            for (const y of [-0.235, 0.235])
              box(0.42, 0.42, 0.025, symbol, x, y, 0, emboss, 0.045);
        } else if (index === 1) {
          for (const y of [-0.28, 0, 0.28]) {
            const ring = mesh(
              new THREE.TorusGeometry(0.36, 0.025, 8, 40),
              emboss,
              symbol,
              0,
              y,
              0.02,
            );
            ring.scale.y = 0.35;
          }
          box(0.035, 0.56, 0.025, symbol, -0.36, 0, 0.02, emboss, 0.01);
          box(0.035, 0.56, 0.025, symbol, 0.36, 0, 0.02, emboss, 0.01);
        } else {
          for (const offset of [-0.16, 0.16]) {
            const ring = mesh(
              new THREE.TorusGeometry(0.23, 0.035, 10, 40),
              emboss,
              symbol,
              offset,
              offset,
              0.025,
            );
            ring.scale.y = 1.35;
            ring.rotation.z = -0.55;
          }
        }
      }
      if (index > 0) {
        for (const y of [0.3, 3.05]) {
          const hinge = mesh(
            new THREE.CylinderGeometry(0.085, 0.085, 0.44, 24),
            yellow,
            root,
            0,
            y,
            0,
          );
          hinge.rotation.x = Math.PI / 2;
        }
      }
    }

    const target = { turn: -0.12, first: -1.13, second: 1.24 };
    const current = { ...target };
    const modes = [
      { turn: -0.12, first: -1.13, second: 1.24 },
      { turn: 0.28, first: -0.28, second: 1.35 },
      { turn: -0.55, first: -1.45, second: 0.3 },
    ];
    function render(time = 0) {
      frame = 0;
      if (disposed || !contextAvailable || !visible || document.hidden) return;
      const delta = Math.min((time - lastTime) / 1000 || 1 / 60, 0.05);
      lastTime = time;
      const ease = reduced.matches ? 1 : 1 - Math.exp(-9 * delta);
      let moving = false;
      for (const key of Object.keys(current)) {
        current[key] += (target[key] - current[key]) * ease;
        if (Math.abs(target[key] - current[key]) > 0.0003) moving = true;
        else current[key] = target[key];
      }
      assembly.rotation.y = current.turn;
      roots[1].rotation.y = current.first;
      roots[2].rotation.y = current.second;
      renderer.shadowMap.autoUpdate = false;
      if (moving || dragging) renderer.shadowMap.needsUpdate = true;
      renderer.render(scene, camera);
      setStatus((previous) => (previous === "ready" ? previous : "ready"));
      if (moving) requestRender();
      else if (!reduced.matches)
        idleTimer = window.setTimeout(requestRender, 250);
    }
    function requestRender() {
      clearTimeout(idleTimer);
      if (
        !frame &&
        contextAvailable &&
        visible &&
        !document.hidden &&
        !disposed
      )
        frame = requestAnimationFrame(render);
    }
    function select(area) {
      Object.assign(target, modes[areas.indexOf(area)]);
      requestRender();
    }
    api.current = { select, reset: () => select("Desktop") };
    function resize() {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      // Frame the same physical object rather than cropping it on narrow screens.
      camera.position
        .set(-3.8, 3.4, 6.5)
        .multiplyScalar(camera.aspect < 1.1 ? 1.08 : 1);
      camera.lookAt(0, 1.65, 0.7);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      requestRender();
    }
    const raycaster = new THREE.Raycaster();
    function pointArea(event) {
      const rect = canvas.getBoundingClientRect();
      raycaster.setFromCamera(
        new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          (-(event.clientY - rect.top) / rect.height) * 2 + 1,
        ),
        camera,
      );
      return raycaster.intersectObjects(hitTargets, false)[0]?.object.userData
        .area;
    }
    function pointerDown(event) {
      if (!event.isPrimary || event.button !== 0) return;
      dragging = {
        x: event.clientX,
        y: event.clientY,
        turn: target.turn,
        moved: false,
      };
    }
    function pointerMove(event) {
      if (!dragging) return;
      const dx = event.clientX - dragging.x;
      const dy = event.clientY - dragging.y;
      if (!dragging.moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        dragging.moved = true;
        canvas.setPointerCapture(event.pointerId);
      }
      if (!dragging.moved) return;
      target.turn = THREE.MathUtils.clamp(
        dragging.turn + dx * 0.006,
        -1.2,
        1.2,
      );
      target.first = -1.13 + Math.sin(dx * 0.006) * 0.32;
      target.second = 1.24 - Math.sin(dx * 0.006) * 0.32;
      requestRender();
    }
    function pointerUp(event) {
      if (!dragging) return;
      if (!dragging.moved) {
        const area = pointArea(event);
        if (area) selection.current(area);
      }
      dragging = null;
      if (canvas.hasPointerCapture(event.pointerId))
        canvas.releasePointerCapture(event.pointerId);
    }
    function cancel() {
      dragging = null;
    }
    function keyboard(event) {
      if (!["ArrowLeft", "ArrowRight", "Home"].includes(event.key)) return;
      event.preventDefault();
      const active = areas.indexOf(canvas.dataset.area);
      selection.current(
        event.key === "Home"
          ? "Desktop"
          : areas[(active + (event.key === "ArrowRight" ? 1 : 2)) % 3],
      );
    }
    function contextLost(event) {
      event.preventDefault();
      setStatus("unavailable");
      contextAvailable = false;
      clearTimeout(idleTimer);
      cancelAnimationFrame(frame);
      frame = 0;
    }
    function restored() {
      contextAvailable = true;
      requestRender();
    }
    function visibility() {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else requestRender();
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) requestRender();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    intersection.observe(canvas);
    const events = {
      pointerdown: pointerDown,
      pointermove: pointerMove,
      pointerup: pointerUp,
      pointercancel: cancel,
      keydown: keyboard,
      webglcontextlost: contextLost,
      webglcontextrestored: restored,
    };
    Object.entries(events).forEach(([name, handler]) =>
      canvas.addEventListener(name, handler),
    );
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", requestRender);
    resize();
    return () => {
      disposed = true;
      clearTimeout(idleTimer);
      api.current = null;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      Object.entries(events).forEach(([name, handler]) =>
        canvas.removeEventListener(name, handler),
      );
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", requestRender);
      const geometries = new Set();
      const materials = new Set();
      scene.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) materials.add(object.material);
      });
      geometries.forEach((item) => item.dispose());
      materials.forEach((item) => item.dispose());
      environment.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    onStatus(status);
  }, [status, onStatus]);

  useEffect(() => {
    api.current?.select(selected);
  }, [selected]);
  useEffect(() => {
    api.current?.reset();
  }, [reset]);
  return (
    <div className="model-render" data-ready={status === "ready"}>
      {status !== "ready" && (
        <img
          className="model-poster"
          src="/assets/fold-fallback.png"
          alt="A cobalt folding workspace with three hinged panels."
          width="1466"
          height="1073"
        />
      )}
      <canvas
        ref={canvasRef}
        data-area={selected}
        tabIndex={status === "unavailable" ? -1 : 0}
        role="group"
        aria-label="Interactive folding sculpture. Drag horizontally to turn, click a panel to select, or use left and right arrow keys to choose a discipline. Home resets to Desktop."
        aria-describedby="model-instructions"
        style={status === "unavailable" ? { visibility: "hidden" } : undefined}
      />
      {status === "unavailable" && (
        <p className="model-status" role="status">
          3D preview unavailable. Explore using the buttons below.
        </p>
      )}
    </div>
  );
}
