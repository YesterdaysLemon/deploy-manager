import * as THREE from "three";

// A deterministic directional spectrum. Geometry carries the swells; smaller
// wavelengths contribute filtered shading normals. No repeating normal texture.
// See GPU Gems 1, chapter 1: analytic wave sums and their spatial derivatives.
export const OCEAN_WAVES = Object.freeze(Array.from({ length: 14 }, (_, i) => {
  const wavelength = 15.7 / 1.49 ** i;
  const angle = i < 2 ? [2.65, 1.9][i] : 2.6 + Math.sin(i * 2.399963) * 0.45;
  const k = Math.PI * 2 / wavelength;
  return Object.freeze({ k, amplitude: 0.115 / 1.53 ** i, dx: Math.cos(angle), dz: Math.sin(angle),
    omega: Math.sqrt(2.1 * k), phase: i * 2.399963 });
}));
export const OCEAN_WAVE_SETTINGS = Object.freeze({ vertexIterations: 8, fragmentIterations: 14 });

export function coastXAt(z, shoreX) {
  return shoreX + Math.sin(z * 0.042 + 0.42) * 0.66 + Math.sin(z * 0.119 - 0.8) * 0.3;
}
const coastGLSL = `
  uniform float uShoreX;
  float coastX(float z) { return uShoreX + sin(z * 0.042 + 0.42) * 0.66 + sin(z * 0.119 - 0.8) * 0.3; }
`;
const spectrumGLSL = OCEAN_WAVES.map((w, i) => `
  #if OCEAN_WAVE_COUNT > ${i}
  {
    vec2 direction = vec2(${w.dx.toFixed(9)}, ${w.dz.toFixed(9)});
    float k = ${w.k.toFixed(9)};
    #ifdef WATER_FRAGMENT
    if (${i}.0 < uDetail && pixelWidth * k < 1.2) {
    #endif
    float phase = dot(p, direction) * k - time * ${w.omega.toFixed(9)} + ${w.phase.toFixed(9)};
    float amplitude = ${w.amplitude.toFixed(9)};
    #ifdef WATER_FRAGMENT
      amplitude *= 1.0 - smoothstep(0.4, 1.2, pixelWidth * k);
    #endif
    result += vec3(amplitude * sin(phase), amplitude * k * cos(phase) * direction);
    #ifdef WATER_FRAGMENT
    }
    #endif
  }
  #endif
`).join("\n");
const sampleGLSL = `
  vec3 sampleOcean(vec2 p, float time, float pixelWidth) {
    vec3 result = vec3(0.0);
    ${spectrumGLSL}
    float distance = p.x - coastX(p.y);
    float blend = clamp(distance / 4.0, 0.0, 1.0);
    float envelope = blend * blend * (3.0 - 2.0 * blend);
    float derivative = (distance > 0.0 && distance < 4.0) ? 6.0 * blend * (1.0 - blend) / 4.0 : 0.0;
    float coastSlope = 0.66 * 0.042 * cos(p.y * 0.042 + 0.42) + 0.3 * 0.119 * cos(p.y * 0.119 - 0.8);
    return vec3(result.x * envelope, result.yz * envelope + result.x * derivative * vec2(1.0, -coastSlope));
  }
`;

export function oceanWaveHeightAt(x, z, time = 0, iterations = 8, shoreX = -Infinity) {
  let height = 0;
  for (const w of OCEAN_WAVES.slice(0, iterations)) {
    height += w.amplitude * Math.sin((x * w.dx + z * w.dz) * w.k - time * w.omega + w.phase);
  }
  const t = THREE.MathUtils.clamp((x - coastXAt(z, shoreX)) / 4, 0, 1);
  return t === 0 ? 0 : height * t * t * (3 - 2 * t);
}

export function createCoastalWaterMaterial(shoreX) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }, uShoreX: { value: shoreX },
      uDetail: { value: 14 },
      uViewDirection: { value: new THREE.Vector3(-1, 1, -1).normalize() },
      uSunDirection: { value: new THREE.Vector3(-18, 31, 20).normalize() },
    },
    vertexShader: `
      uniform float uTime;
      varying vec3 vWorldPosition;
      ${coastGLSL}
      #define OCEAN_WAVE_COUNT 8
      ${sampleGLSL}
      void main() {
        vec3 p = position;
        p.y += sampleOcean(p.xz, uTime, 0.0).x;
        vWorldPosition = p;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uDetail;
      uniform vec3 uViewDirection;
      uniform vec3 uSunDirection;
      varying vec3 vWorldPosition;
      ${coastGLSL}
      #define WATER_FRAGMENT
      #define OCEAN_WAVE_COUNT 14
      ${sampleGLSL}
      void main() {
        vec2 p = vWorldPosition.xz;
        float footprint = max(length(dFdx(p)), length(dFdy(p)));
        vec3 wave = sampleOcean(p, uTime, footprint);
        vec3 normal = normalize(vec3(-wave.y, 1.0, -wave.z));
        vec3 view = normalize(uViewDirection);
        float facing = max(dot(normal, view), 0.001);
        float fresnel = 0.0204 + 0.9796 * pow(1.0 - facing, 5.0);
        float distance = max(0.0, p.x - coastX(p.y));
        float depth = max(0.02, 0.08 + distance * 0.32 + wave.x);
        vec3 transmittance = exp(-vec3(0.42, 0.095, 0.065) * depth / max(0.4, facing));
        vec3 seabed = vec3(0.43, 0.52, 0.31);
        vec3 deep = vec3(0.009, 0.105, 0.19);
        vec3 refracted = mix(deep, seabed, transmittance);
        // The reflection is a broad sky gradient, not a painted white stripe.
        vec3 reflectedDirection = reflect(-view, normal);
        vec3 sky = mix(vec3(0.59, 0.71, 0.68), vec3(0.22, 0.45, 0.56), clamp(reflectedDirection.y, 0.0, 1.0));
        vec3 halfVector = normalize(view + uSunDirection);
        float nh = max(dot(normal, halfVector), 0.0);
        float roughness = 0.19 + footprint * 0.025;
        float alpha2 = pow(roughness, 4.0);
        float denominator = nh * nh * (alpha2 - 1.0) + 1.0;
        float distribution = alpha2 / (3.14159265 * denominator * denominator);
        float sun = min(1.5, distribution * 0.02) * max(dot(normal, uSunDirection), 0.0);
        vec3 color = mix(refracted, sky, fresnel) + vec3(1.0, 0.88, 0.67) * sun;
        // Sparse, narrow wind-crest glints; avoid broad height-based color
        // patches, which read as clouds instead of a reflective water surface.
        float crest = smoothstep(0.16, 0.27, length(wave.yz));
        float broken = smoothstep(0.03, 0.11, wave.x);
        float ripple = crest * broken * smoothstep(1.0,5.0,distance) * (1.0-smoothstep(0.25,0.9,footprint));
        color += vec3(0.25,0.37,0.39) * ripple * 0.24;
        // Thin, broken incoming wash, confined to shallow water. Slow diagonal
        // variation prevents every beach point from breaking in lockstep.
        float washPhase = distance * 3.3 + uTime * 0.85 + sin(p.y * 0.37) * 0.7;
        float wash = pow(max(0.0, sin(washPhase)), 14.0);
        float fragments = smoothstep(-0.35, 0.45, sin(p.y * 1.17 + sin(p.y * 0.23) * 2.0));
        float foam = wash * fragments * (1.0 - smoothstep(0.25, 1.8, distance)) * smoothstep(0.0, 0.15, distance);
        color = mix(color, vec3(0.82, 0.88, 0.77), foam * 0.64);
        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}
