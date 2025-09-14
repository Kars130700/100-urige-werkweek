import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WavyImage({
  src = "/mijn-foto.jpg",
  alt = "Wavy image",
  className = "",
  hoverScale = 1.1,
}) {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const rendererRef = useRef(null);
  const planeRef = useRef(null);

  // smooth state (matches your original)
  const currentState = useRef({
    mouse: new THREE.Vector2(0, 0),
    intensity: 0.005,
  });
  const targetState = useRef({
    mouse: new THREE.Vector2(0, 0),
    intensity: 0.005,
  });

  // config
  const CONFIG = {
    transitionSpeed: 0.03,
    baseIntensity: 0.005,
    hoverIntensity: 0.009,
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, 1, 0.01, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.transition = "transform 1s";
    el.appendChild(renderer.domElement);

    // shaders
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_intensity;
      uniform sampler2D u_texture;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float wave1 = sin(uv.x * 10.0 + u_time * 0.5 + u_mouse.x * 5.0) * u_intensity;
        float wave2 = sin(uv.y * 12.0 + u_time * 0.8 + u_mouse.y * 4.0) * u_intensity;
        float wave3 = cos(uv.x * 8.0  + u_time * 0.5 + u_mouse.x * 3.0) * u_intensity;
        float wave4 = cos(uv.y * 9.0  + u_time * 0.7 + u_mouse.y * 3.5) * u_intensity;

        uv.y += wave1 + wave2;
        uv.x += wave3 + wave4;

        gl_FragColor = texture2D(u_texture, uv);
      }
    `;

    // uniforms
    const uniforms = {
      u_time: { value: 1.0 },
      u_mouse: { value: new THREE.Vector2() },
      u_intensity: { value: currentState.current.intensity },
      u_texture: { value: null },
    };

    // geometry + material
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      })
    );
    planeRef.current = plane;
    scene.add(plane);

    // texture loading (works with /public in Next.js)
    const loader = new THREE.TextureLoader();
    // If using external URLs, you might need: loader.setCrossOrigin("anonymous");
    loader.load(
      src,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        uniforms.u_texture.value = tex;
        renderNow(); // first paint after texture ready
      },
      undefined,
      (err) => {
        // eslint-disable-next-line no-console
        console.error("Failed to load texture:", err);
      }
    );

    // sizing
    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // interactions
    const onPointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetState.current.mouse.set(x, y);
    };
    const onEnter = () => {
      targetState.current.intensity = CONFIG.hoverIntensity;
      // optional zoom like your CSS hover
      renderer.domElement.style.transform = `scale(${hoverScale})`;
    };
    const onLeave = () => {
      targetState.current.intensity = CONFIG.baseIntensity;
      targetState.current.mouse.set(0, 0);
      renderer.domElement.style.transform = "scale(1)";
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    // helpers
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      // smooth towards target
      currentState.current.mouse.x = lerp(
        currentState.current.mouse.x,
        targetState.current.mouse.x,
        CONFIG.transitionSpeed
      );
      currentState.current.mouse.y = lerp(
        currentState.current.mouse.y,
        targetState.current.mouse.y,
        CONFIG.transitionSpeed
      );
      currentState.current.intensity = lerp(
        currentState.current.intensity,
        targetState.current.intensity,
        CONFIG.transitionSpeed
      );

      uniforms.u_time.value += 0.005;
      uniforms.u_intensity.value = currentState.current.intensity;
      uniforms.u_mouse.value.copy(currentState.current.mouse);

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };

    const renderNow = () => {
      renderer.render(scene, camera);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    // start base intensity
    targetState.current.intensity = CONFIG.baseIntensity;
    renderNow();

    // cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("resize", resize);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);

      scene.remove(plane);
      plane.geometry.dispose();
      plane.material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [src, hoverScale]);

  return (
    <div
      ref={containerRef}
      aria-label={alt}
      className={`
        relative overflow-hidden ${className}
      `}
      // The canvas will fill this box
    />
  );
}
