"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// ========== SIMPLEX NOISE GLSL ==========
const SIMPLEX_NOISE_GLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

// ========== BACKGROUND HAZE ==========
function BackgroundHaze() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 } as THREE.IUniform<number>,
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.999, 1.0);
        }
      `,
      fragmentShader: `
        ${SIMPLEX_NOISE_GLSL}
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec2 centered = vUv - 0.5;
          float radialDist = length(centered);

          vec3 deepBlack = vec3(0.0, 0.0, 0.0);
          vec3 blueBlack = vec3(0.02, 0.03, 0.06);
          vec3 bgColor = mix(blueBlack, deepBlack, smoothstep(0.0, 0.7, radialDist));

          float nebula1 = snoise(vec2(vUv.x * 2.5, vUv.y * 3.0 + uTime * 0.002)) * 0.5 + 0.5;
          float nebula2 = snoise(vec2(vUv.x * 4.0 + 20.0, vUv.y * 2.5 - uTime * 0.003)) * 0.5 + 0.5;
          float nebulaTex = nebula1 * 0.6 + nebula2 * 0.4;

          vec3 nebulaColor = vec3(0.03, 0.04, 0.08) * nebulaTex * 0.12;
          bgColor += nebulaColor;

          gl_FragColor = vec4(bgColor, 1.0);
        }
      `,
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={shader.uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

// ========== DISK LANE SHADER (FIXED: reduced brightness, vertex warp) ==========
function createDiskLaneShader(speedMult = 1.0) {
  return {
    uniforms: {
      uTime: { value: 0 } as THREE.IUniform<number>,
      uSpeed: { value: speedMult } as THREE.IUniform<number>,
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float wave = sin(pos.x * 0.55 + uTime * 0.08) * 0.035;
        pos.y += wave;
        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      ${SIMPLEX_NOISE_GLSL}
      uniform float uTime;
      uniform float uSpeed;
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        float flow = vUv.x;
        float across = abs(vUv.y - 0.5) * 2.0;
        float band = smoothstep(1.0, 0.0, across);

        float phase = flow * 18.0 - uTime * uSpeed;

        float n1 = snoise(vec2(phase, across * 4.0 + uTime * 0.03));
        float n2 = snoise(vec2(phase * 2.7 + 30.0, across * 9.0 - uTime * 0.05));
        float n3 = snoise(vec2(flow * 4.0 + 90.0, across * 2.0));

        float streak = smoothstep(0.15, 0.75, n1 * 0.45 + n2 * 0.3);
        float clump = smoothstep(0.1, 0.85, n3);

        float core = pow(max(1.0 - across, 0.0), 5.0);
        float softBand = pow(max(1.0 - across, 0.0), 1.6);

        vec3 whiteCore = vec3(1.00, 0.96, 0.86);
        vec3 cream = vec3(0.92, 0.78, 0.58);
        vec3 tan = vec3(0.66, 0.42, 0.24);
        vec3 copper = vec3(0.42, 0.16, 0.06);
        vec3 charcoal = vec3(0.08, 0.055, 0.045);

        vec3 color = mix(charcoal, copper, softBand);
        color = mix(color, cream, streak * 0.6);
        color = mix(color, whiteCore, core * 0.3);

        float asym = snoise(vec2(flow * 1.45 + 11.0, 0.31)) * 0.5 + 0.5;
        color *= mix(0.72, 1.28, asym);
        color *= 0.6;
        color = min(color, vec3(1.2, 1.05, 0.88));

        float alpha = band * mix(0.72, 1.18, asym);

        gl_FragColor = vec4(color, alpha);
      }
    `,
  };
}

// ========== REAR ACCRETION DISK ==========
function RearAccretionDisk() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const shader = useMemo(() => createDiskLaneShader(0.06), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[0, 0, -0.085]} position={[0, -0.06, -0.04]} renderOrder={30}>
      <planeGeometry args={[18, 2.2, 512, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={shader.uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

// ========== FOREGROUND ACCRETION LANE ==========
function ForegroundAccretionLane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shader = useMemo(() => {
    const baseShader = createDiskLaneShader(0.06);
    return {
      ...baseShader,
      fragmentShader: baseShader.fragmentShader.replace('color *= 0.6;', 'color *= 0.65;'),
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[0, 0, -0.085]} position={[0, -0.32, 0.14]} renderOrder={80}>
      <planeGeometry args={[17, 1.3, 512, 48]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={shader.uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
        depthTest={false}
        opacity={0.50}
      />
    </mesh>
  );
}

// ========== DISK GLOW LAYER ==========
function DiskGlowLayer() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const shader = useMemo(() => createDiskLaneShader(0.06), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[0, 0, -0.085]} position={[0, -0.06, -0.04]} renderOrder={25} scale={[1.15, 1.3, 1]}>
      <planeGeometry args={[18, 2.2, 256, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={shader.uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
        depthTest={false}
        opacity={0.22}
      />
    </mesh>
  );
}

// ========== WHITE HOT CORE BAND ==========
function WhiteHotCoreBand() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 } as THREE.IUniform<number>,
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        ${SIMPLEX_NOISE_GLSL}
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          float across = abs(vUv.y - 0.5) * 2.0;
          float core = pow(max(1.0 - across, 0.0), 9.0);

          float flicker = snoise(vec2(vUv.x * 12.0 + uTime * 0.8, across * 6.0)) * 0.5 + 0.5;

          vec3 whiteCore = vec3(1.00, 0.96, 0.86);
          vec3 color = whiteCore * (0.55 + flicker * 0.35);

          float alpha = core * 0.40;

          gl_FragColor = vec4(color, alpha);
        }
      `,
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[0, 0, -0.085]} position={[0, -0.06, -0.04]} renderOrder={45}>
      <planeGeometry args={[7.5, 0.14, 128, 16]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={shader.uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

// ========== ARC RIBBON GEOMETRY ==========
function createArcRibbonGeometry({
  radiusX,
  radiusY,
  segments,
  baseWidth,
  z,
  lower = false,
}: {
  radiusX: number;
  radiusY: number;
  segments: number;
  baseWidth: number;
  z: number;
  lower?: boolean;
}): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const theta = lower ? Math.PI + Math.PI * t : Math.PI * t;

    const x = Math.cos(theta) * radiusX;
    const y = Math.sin(theta) * radiusY;

    const dx = -Math.sin(theta) * radiusX;
    const dy = Math.cos(theta) * radiusY;
    const tangentLength = Math.sqrt(dx * dx + dy * dy);
    const tx = dx / tangentLength;
    const ty = dy / tangentLength;

    const nx = -ty;
    const ny = tx;

    const width = baseWidth * (0.45 + 0.75 * Math.abs(Math.sin(theta)));

    positions.push(x + nx * width, y + ny * width, z);
    positions.push(x - nx * width, y - ny * width, z);

    uvs.push(t, 0);
    uvs.push(t, 1);

    if (i < segments) {
      const base = i * 2;
      indices.push(base, base + 1, base + 2);
      indices.push(base + 1, base + 3, base + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

// ========== UPPER ARC SHADER (FIXED: reduced brightness, alpha breakup) ==========
function createUpperArcShader(brightness: number, opacityFactor: number) {
  return {
    uniforms: {
      uTime: { value: 0 } as THREE.IUniform<number>,
      uBrightness: { value: brightness } as THREE.IUniform<number>,
      uOpacity: { value: opacityFactor } as THREE.IUniform<number>,
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      ${SIMPLEX_NOISE_GLSL}
      uniform float uTime;
      uniform float uBrightness;
      uniform float uOpacity;
      varying vec2 vUv;

      void main() {
        float flow = vUv.x;
        float across = abs(vUv.y - 0.5) * 2.0;
        float band = smoothstep(1.0, 0.0, across);

        float phase = flow * 18.0 - uTime * 0.12;

        float n1 = snoise(vec2(phase, across * 4.0 + uTime * 0.03));
        float n2 = snoise(vec2(phase * 2.7 + 30.0, across * 9.0 - uTime * 0.05));
        float n3 = snoise(vec2(flow * 4.0 + 90.0, across * 2.0));

        float streak = smoothstep(0.15, 0.75, n1 * 0.45 + n2 * 0.3);
        float clump = smoothstep(0.1, 0.85, n3);

        float core = pow(max(1.0 - across, 0.0), 8.0) * 0.45;
        float softBand = pow(max(1.0 - across, 0.0), 1.6);

        vec3 whiteCore = vec3(1.00, 0.96, 0.86);
        vec3 cream = vec3(0.92, 0.78, 0.58);
        vec3 tan = vec3(0.66, 0.42, 0.24);
        vec3 copper = vec3(0.42, 0.16, 0.06);

        vec3 color = mix(copper, tan, softBand);
        color = mix(color, cream, streak * 0.65);
        color = mix(color, whiteCore, core);

        float asym = snoise(vec2(flow * 1.45 + 11.0, 0.31)) * 0.5 + 0.5;
        color *= mix(0.72, 1.28, asym) * uBrightness;

        float breakup = smoothstep(-0.35, 0.65, snoise(vec2(vUv.x * 7.0 + uTime * 0.08, vUv.y * 3.0)));

        float alpha = band * mix(0.72, 1.18, asym) * uOpacity;
        alpha *= mix(0.45, 1.0, breakup);

        gl_FragColor = vec4(color, alpha);
      }
    `,
  };
}

// ========== UPPER ARC LAYER ==========
function UpperArcLayer({
  radiusX,
  radiusY,
  baseWidth,
  opacity,
  brightness,
  z,
}: {
  radiusX: number;
  radiusY: number;
  baseWidth: number;
  opacity: number;
  brightness: number;
  z: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(
    () =>
      createArcRibbonGeometry({
        radiusX,
        radiusY,
        segments: 300,
        baseWidth,
        z,
        lower: false,
      }),
    [radiusX, radiusY, baseWidth, z]
  );

  const shader = useMemo(() => createUpperArcShader(brightness, opacity), [brightness, opacity]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh geometry={geometry} renderOrder={40}>
      <shaderMaterial
        ref={materialRef}
        uniforms={shader.uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ========== LOWER GHOST SHADER (FIXED: breakup noise) ==========
function createLowerGhostShader(opacityFactor: number, brightness: number) {
  return {
    uniforms: {
      uTime: { value: 0 } as THREE.IUniform<number>,
      uOpacity: { value: opacityFactor } as THREE.IUniform<number>,
      uBrightness: { value: brightness } as THREE.IUniform<number>,
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      ${SIMPLEX_NOISE_GLSL}
      uniform float uTime;
      uniform float uOpacity;
      uniform float uBrightness;
      varying vec2 vUv;

      void main() {
        float flow = vUv.x;
        float across = abs(vUv.y - 0.5) * 2.0;
        float band = smoothstep(1.0, 0.0, across);

        float phase = flow * 14.0 - uTime * 0.08;

        float n1 = snoise(vec2(phase, across * 8.0));
        float n2 = snoise(vec2(phase * 3.0 + 50.0, across * 12.0));

        float turbulence = n1 * 0.6 + n2 * 0.4;
        float fragmentation = smoothstep(0.0, 0.7, turbulence);

        float breakup = snoise(vec2(flow * 8.0 + 3.0, uTime * 0.05));
        fragmentation *= smoothstep(-0.2, 0.55, breakup);

        vec3 copper = vec3(0.42, 0.16, 0.06);
        vec3 charcoal = vec3(0.08, 0.055, 0.045);
        vec3 color = mix(charcoal, copper, pow(max(1.0 - across, 0.0), 3.0));
        color *= uBrightness;

        float alpha = band * fragmentation * uOpacity;

        gl_FragColor = vec4(color, alpha);
      }
    `,
  };
}

// ========== LOWER GHOST LAYER ==========
function LowerGhostLayer({
  radiusX,
  radiusY,
  baseWidth,
  opacity,
  brightness,
}: {
  radiusX: number;
  radiusY: number;
  baseWidth: number;
  opacity: number;
  brightness: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(
    () =>
      createArcRibbonGeometry({
        radiusX,
        radiusY,
        segments: 240,
        baseWidth,
        z: -0.08,
        lower: true,
      }),
    [radiusX, radiusY, baseWidth]
  );

  const shader = useMemo(() => createLowerGhostShader(opacity, brightness), [opacity, brightness]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh geometry={geometry} renderOrder={20}>
      <shaderMaterial
        ref={materialRef}
        uniforms={shader.uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ========== BLACK HOLE SHADOW ==========
function BlackHoleShadow() {
  return (
    <>
      {/* Invisible occlusion sphere - for depth only */}
      <mesh renderOrder={0}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#000000" depthWrite />
      </mesh>
      {/* Camera-facing pure black circular mask - THE ONLY VISIBLE SHADOW */}
      <mesh position={[0, 0.02, 0.12]} scale={[1.0, 0.98, 1]} renderOrder={70}>
        <circleGeometry args={[1.04, 256]} />
        <meshBasicMaterial color="#000000" depthWrite depthTest={false} />
      </mesh>
    </>
  );
}

// ========== PHOTON RIM (FIXED: noise variation, smaller) ==========
function PhotonRim() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 } as THREE.IUniform<number>,
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        ${SIMPLEX_NOISE_GLSL}
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          float rimNoise = snoise(vec2(vUv.x * 40.0, uTime * 0.5)) * 0.5 + 0.5;

          vec3 whiteCore = vec3(1.00, 0.96, 0.86);
          vec3 color = whiteCore * (0.5 + rimNoise * 0.4);

          float alpha = (0.3 + rimNoise * 0.4) * 0.5;

          gl_FragColor = vec4(color, alpha);
        }
      `,
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} renderOrder={90}>
      <torusGeometry args={[1.06, 0.004, 16, 320]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={shader.uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ========== GARGANTUA ASSEMBLY ==========
function Gargantua() {
  return (
    <group>
      {/* Lower ghost lensing (3 layers) - renderOrder 20 */}
      <LowerGhostLayer radiusX={2.0} radiusY={0.48} baseWidth={0.22} opacity={0.30} brightness={0.45} />
      <LowerGhostLayer radiusX={2.32} radiusY={0.68} baseWidth={0.36} opacity={0.16} brightness={0.28} />
      <LowerGhostLayer radiusX={2.65} radiusY={0.92} baseWidth={0.48} opacity={0.08} brightness={0.16} />

      {/* Disk glow layer - renderOrder 25 */}
      <DiskGlowLayer />

      {/* Rear accretion disk - renderOrder 30 */}
      <RearAccretionDisk />

      {/* Upper lensed flow (6 layers + 1 wide smoke) - renderOrder 40 */}
      <UpperArcLayer radiusX={2.05} radiusY={0.62} baseWidth={0.12} opacity={0.70} brightness={1.65} z={-0.06} />
      <UpperArcLayer radiusX={2.20} radiusY={0.76} baseWidth={0.32} opacity={0.48} brightness={1.15} z={-0.07} />
      <UpperArcLayer radiusX={2.46} radiusY={0.98} baseWidth={0.44} opacity={0.34} brightness={0.72} z={-0.08} />
      <UpperArcLayer radiusX={2.62} radiusY={1.08} baseWidth={0.70} opacity={0.20} brightness={0.50} z={-0.09} />
      <UpperArcLayer radiusX={2.86} radiusY={1.32} baseWidth={0.82} opacity={0.10} brightness={0.28} z={-0.10} />
      <UpperArcLayer radiusX={2.34} radiusY={0.86} baseWidth={0.10} opacity={0.48} brightness={1.30} z={-0.055} />
      {/* Wide smoke filler */}
      <UpperArcLayer radiusX={2.70} radiusY={1.05} baseWidth={0.95} opacity={0.16} brightness={0.35} z={-0.095} />

      {/* White hot core band - renderOrder 45 */}
      <WhiteHotCoreBand />

      {/* Black hole shadow - renderOrder 70 */}
      <BlackHoleShadow />

      {/* Foreground accretion lane (crosses shadow) - renderOrder 80 */}
      <ForegroundAccretionLane />

      {/* Photon rim - renderOrder 90 */}
      <PhotonRim />
    </group>
  );
}

// ========== SCENE ==========
function Scene() {
  return (
    <>
      <BackgroundHaze />
      <Stars radius={140} depth={80} count={2500} factor={3.5} saturation={0} fade speed={0.3} />
      <ambientLight intensity={0.02} />

      <Gargantua />
    </>
  );
}

// ========== EXPORT ==========
export function InterstellarScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.26, 5.2], fov: 39 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
