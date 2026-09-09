import * as THREE from "three";
import gsap from "gsap";

// ============================================================
// YOUR PHOTOS — paste image URLs here (any count, any aspect ratio).
// e.g. from Webflow's Assets panel: upload an image there, then right-click
// it and "Copy URL" (or open it and copy the address bar link).
// Leave this array empty to keep the auto-generated placeholder tiles.
// Cells repeat images if you add fewer photos than there are cells.
// ============================================================
const IMAGE_URLS = [
  "img/playground/playground-001.jpg",
  "img/playground/playground-002.jpg",
  "img/playground/playground-003.jpg",
  "img/playground/playground-004.jpg",
  "img/playground/playground-005.jpg",
  "img/playground/playground-006.jpg",
  "img/playground/playground-007.jpg",
  "img/playground/playground-008.jpg",
  "img/playground/playground-009.jpg",
  "img/playground/playground-010.jpg",
  "img/playground/playground-011.jpg",
  "img/playground/playground-012.jpg",
  "img/playground/playground-013.jpg",
  "img/playground/playground-014.jpg",
  "img/playground/playground-015.jpg",
  "img/playground/playground-016.jpg",
  "img/playground/playground-017.jpg",
  "img/playground/playground-018.jpg",
  "img/playground/playground-019.jpg",
  "img/playground/playground-020.jpg",
  "img/playground/playground-021.jpg",
  "img/playground/playground-022.jpg",
  "img/playground/playground-023.jpg",
  "img/playground/playground-024.jpg",
  "img/playground/playground-025.jpg",
  "img/playground/playground-026.jpg",
  "img/playground/playground-027.jpg",
  "img/playground/playground-028.jpg",
  "img/playground/playground-029.jpg",
  "img/playground/playground-030.jpg",
  "img/playground/playground-031.jpg",
  "img/playground/playground-032.jpg",
  "img/playground/playground-033.jpg",
  "img/playground/playground-034.jpg",
  "img/playground/playground-035.jpg",
  "img/playground/playground-036.jpg",
  "img/playground/playground-037.jpg",
  "img/playground/playground-038.jpg",
  "img/playground/playground-039.jpg",
  "img/playground/playground-040.jpg",
  "img/playground/playground-041.jpg",
  "img/playground/playground-042.jpg",
  "img/playground/playground-043.jpg",
  "img/playground/playground-044.jpg",
  "img/playground/playground-045.jpg",
  "img/playground/playground-046.jpg",
  "img/playground/playground-047.jpg",
  "img/playground/playground-048.jpg",
  "img/playground/playground-049.jpg",
  "img/playground/playground-050.jpg",
  "img/playground/playground-051.jpg",
  "img/playground/playground-052.jpg",
  "img/playground/playground-053.jpg",
  "img/playground/playground-054.jpg",
  "img/playground/playground-055.jpg",
  "img/playground/playground-056.jpg",
  "img/playground/playground-057.jpg",
  "img/playground/playground-058.jpg",
  "img/playground/playground-059.jpg",
  "img/playground/playground-060.jpg",
  "img/playground/playground-061.jpg",
  "img/playground/playground-062.jpg",
  "img/playground/playground-063.jpg",
  "img/playground/playground-064.jpg",
  "img/playground/playground-065.jpg",
  "img/playground/playground-066.jpg",
  "img/playground/playground-067.jpg",
  "img/playground/playground-068.jpg",
  "img/playground/playground-069.jpg",
  "img/playground/playground-070.jpg",
  "img/playground/playground-071.jpg",
  "img/playground/playground-072.jpg",
  "img/playground/playground-073.jpg",
  "img/playground/playground-074.jpg",
  "img/playground/playground-075.jpg",
  "img/playground/playground-076.jpg",
  "img/playground/playground-077.jpg",
  "img/playground/playground-078.jpg",
  "img/playground/playground-079.jpg",
  "img/playground/playground-080.jpg",
  "img/playground/playground-081.jpg",
  "img/playground/playground-082.jpg",
  "img/playground/playground-083.jpg",
  "img/playground/playground-084.jpg",
  "img/playground/playground-085.jpg",
  "img/playground/playground-086.jpg",
  "img/playground/playground-087.jpg",
  "img/playground/playground-088.jpg",
  "img/playground/playground-089.jpg",
  "img/playground/playground-090.jpg",
  "img/playground/playground-091.jpg",
  "img/playground/playground-092.jpg",
  "img/playground/playground-093.jpg",
  "img/playground/playground-094.jpg",
  "img/playground/playground-095.jpg",
  "img/playground/playground-096.jpg",
  "img/playground/playground-097.jpg",
  "img/playground/playground-098.jpg",
  "img/playground/playground-099.jpg",
  "img/playground/playground-100.jpg",
  "img/playground/playground-101.jpg",
  "img/playground/playground-102.jpg",
  "img/playground/playground-103.jpg",
  "img/playground/playground-104.jpg",
  "img/playground/playground-105.jpg",
  "img/playground/playground-106.jpg",
  "img/playground/playground-107.jpg",
  "img/playground/playground-108.jpg",
  "img/playground/playground-109.jpg",
  "img/playground/playground-110.jpg",
  "img/playground/playground-111.jpg",
  "img/playground/playground-112.jpg",
  "img/playground/playground-113.jpg",
  "img/playground/playground-114.jpg",
  "img/playground/playground-115.jpg",
  "img/playground/playground-116.jpg",
  "img/playground/playground-117.jpg",
  "img/playground/playground-118.jpg",
  "img/playground/playground-119.jpg",
  "img/playground/playground-120.jpg",
  "img/playground/playground-121.jpg",
  "img/playground/playground-122.jpg",
  "img/playground/playground-123.jpg",
  "img/playground/playground-124.jpg",
  "img/playground/playground-125.jpg",
  "img/playground/playground-126.jpg",
  "img/playground/playground-127.jpg",
  "img/playground/playground-128.jpg",
  "img/playground/playground-129.jpg",
  "img/playground/playground-130.jpg",
  "img/playground/playground-131.jpg",
  "img/playground/playground-132.jpg",
  "img/playground/playground-133.jpg",
  "img/playground/playground-134.jpg",
  "img/playground/playground-135.jpg",
  "img/playground/playground-136.jpg",
  "img/playground/playground-137.jpg",
  "img/playground/playground-138.jpg",
];

// ---------- viewport / device helpers ----------
const sizes = { width: innerWidth, height: innerHeight };
function isSp() { return innerWidth < 980; }

// ---------- box packing (desktop): recursively split a rect into varied-size cells ----------
const CELL_MIN_W = 130, CELL_MIN_H = 100, CELL_MAX_W = 360, CELL_MAX_H = 280;
const PACK_SCALE = 1.4;   // packed canvas is bigger than the viewport so it has room to scroll/wrap
const CELL_GAP = 14;
const SPLIT_ASPECT_LIMIT = 2;

function packRect(x, y, w, h, minW, minH, maxW, maxH, depth = 0) {
  const canSplitX = w >= minW * 2;
  const canSplitY = h >= minH * 2;
  if (!canSplitX && !canSplitY) return [{ x, y, w, h }];

  const aspect = w / h;
  const forceX = aspect > SPLIT_ASPECT_LIMIT && canSplitX;
  const forceY = (1 / aspect) > SPLIT_ASPECT_LIMIT && canSplitY;
  const overMaxX = w > maxW && canSplitX;
  const overMaxY = h > maxH && canSplitY;

  if (!(forceX || forceY || overMaxX || overMaxY)) {
    const overshoot = Math.max(w / maxW, h / maxH);
    const stopChance = Math.min(0.95, 0.45 + overshoot * 0.08 - depth * 0.05);
    if (Math.random() > stopChance) return [{ x, y, w, h }];
  }

  let splitVertically; // true = split side by side along x
  if (forceX || overMaxX) splitVertically = true;
  else if (forceY || overMaxY) splitVertically = false;
  else if (canSplitX && canSplitY) splitVertically = Math.random() < w / (w + h);
  else splitVertically = canSplitX;

  const ratio = 0.4 + Math.random() * 0.2;
  if (splitVertically) {
    const splitX = Math.max(minW, Math.min(w - minW, w * ratio));
    return [
      ...packRect(x, y, splitX, h, minW, minH, maxW, maxH, depth + 1),
      ...packRect(x + splitX, y, w - splitX, h, minW, minH, maxW, maxH, depth + 1),
    ];
  } else {
    const splitY = Math.max(minH, Math.min(h - minH, h * ratio));
    return [
      ...packRect(x, y, w, splitY, minW, minH, maxW, maxH, depth + 1),
      ...packRect(x, y + splitY, w, h - splitY, minW, minH, maxW, maxH, depth + 1),
    ];
  }
}

// mobile fallback: ragged columns, each column a stack of rows scaled to exactly fill the height
function packColumns(width, height, cols) {
  const colW = width / cols;
  const minRatio = 0.75, maxRatio = 1.4;
  const cells = [];
  for (let c = 0; c < cols; c++) {
    const x = c * colW;
    const rowHeights = [];
    let filled = 0;
    while (filled < height * 0.98) {
      const h = colW * (minRatio + Math.random() * (maxRatio - minRatio));
      rowHeights.push(h);
      filled += h;
    }
    const scale = height / filled;
    let y = 0;
    for (const h of rowHeights) {
      const sh = h * scale;
      cells.push({ x, y, w: colW, h: sh });
      y += sh;
    }
  }
  return cells;
}

// given an image's native aspect and a cell's aspect, compute UV repeat/offset for a "cover" fit
function coverFit(imgAspect, cellAspect) {
  if (imgAspect > cellAspect) {
    const r = cellAspect / imgAspect;
    return { rx: r, ry: 1, ox: (1 - r) / 2, oy: 0 };
  } else {
    const r = imgAspect / cellAspect;
    return { rx: 1, ry: r, ox: 0, oy: (1 - r) / 2 };
  }
}

// ---------- shaders: gallery cell (texture + 7-style crossfade + hover glow) ----------
const cellVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const cellFragmentShader = `
  uniform sampler2D uTexA;
  uniform sampler2D uTexB;
  uniform bool      uHasA;
  uniform bool      uHasB;
  uniform vec2      uRepeatA;
  uniform vec2      uOffsetA;
  uniform vec2      uRepeatB;
  uniform vec2      uOffsetB;
  uniform vec3      uFlatColor;
  uniform float     uMix;
  uniform int       uTransType;
  uniform vec2      uMeshSize;
  uniform float     uReveal;
  uniform float     uGrayscale;
  uniform float     uHover;
  uniform float     uFade;
  uniform float     uHoverTime;
  uniform float     uDisintegrate;
  uniform sampler2D uCodeTex;

  varying vec2 vUv;

  float rand(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(rand(i),                 rand(i + vec2(1.0, 0.0)), f.x),
      mix(rand(i + vec2(0.0, 1.0)), rand(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  vec3 sampleA(vec2 uv) { return uHasA ? texture2D(uTexA, uv * uRepeatA + uOffsetA).rgb : uFlatColor; }
  vec3 sampleB(vec2 uv) { return uHasB ? texture2D(uTexB, uv * uRepeatB + uOffsetB).rgb : uFlatColor; }

  void main() {
    float alpha = clamp(uReveal + 1.0, 0.0, 1.0) * uFade;
    if (alpha <= 0.0) discard;

    vec2 vUvEff = vUv;
    if (uDisintegrate > 0.001) {
      float cellPx = mix(2.0, 84.0, uDisintegrate);
      vec2 grid = max(uMeshSize / cellPx, vec2(1.0));
      vUvEff = (floor(vUv * grid) + 0.5) / grid;
    }

    vec2 uv = vUvEff;
    if (uHover > 0.001) {
      float zoom = uHover * 0.07;
      uv = (uv - 0.5) * (1.0 - zoom) + 0.5;
    }

    vec3 col;
    if (uMix < 0.001) {
      col = sampleA(uv);
    } else if (uMix > 0.999) {
      col = sampleB(uv);
    } else if (uTransType == 0) {
      float cellPx = 14.0;
      vec2 c = floor(vUv * uMeshSize / cellPx);
      float r = rand(c);
      float local = smoothstep(r, r + 0.18, uMix);
      col = mix(sampleA(uv), sampleB(uv), local);
    } else if (uTransType == 1) {
      float bell = sin(uMix * 3.14159265);
      float sh = bell * 0.05;
      vec2 uvA = uv * uRepeatA + uOffsetA;
      vec2 uvB = uv * uRepeatB + uOffsetB;
      vec3 a = vec3(texture2D(uTexA, uvA + vec2(sh, 0.0)).r, texture2D(uTexA, uvA).g, texture2D(uTexA, uvA - vec2(sh, 0.0)).b);
      vec3 b = vec3(texture2D(uTexB, uvB + vec2(sh, 0.0)).r, texture2D(uTexB, uvB).g, texture2D(uTexB, uvB - vec2(sh, 0.0)).b);
      col = mix(a, b, smoothstep(0.4, 0.6, uMix));
    } else if (uTransType == 2) {
      float n = vnoise(vUv * 4.5);
      float thr = uMix * 1.3 - 0.15;
      float band = smoothstep(thr - 0.05, thr + 0.05, n);
      vec3 base = mix(sampleB(uv), sampleA(uv), band);
      float edge = exp(-pow((n - thr) * 22.0, 2.0)) * (1.0 - 4.0 * pow(uMix - 0.5, 2.0));
      col = base + vec3(0.30, 0.55, 1.00) * edge * 0.55;
    } else if (uTransType == 3) {
      float bell = sin(uMix * 3.14159265);
      vec2 du = vec2(
        sin(vUv.y * 18.0 + uMix * 7.0) * bell * 0.07,
        cos(vUv.x * 18.0 + uMix * 7.0) * bell * 0.07
      );
      vec3 a = texture2D(uTexA, (uv + du) * uRepeatA + uOffsetA).rgb;
      vec3 b = texture2D(uTexB, (uv - du) * uRepeatB + uOffsetB).rgb;
      col = mix(a, b, smoothstep(0.35, 0.65, uMix));
    } else if (uTransType == 4) {
      float bandY = floor(vUv.y * 9.0);
      float bandDelay = rand(vec2(bandY, 17.3)) * 0.4;
      float local = smoothstep(bandDelay, bandDelay + 0.6, uMix);
      float threshold = local * 1.04 - 0.02;
      float bandMix = smoothstep(threshold - 0.05, threshold + 0.05, vUv.x);
      col = mix(sampleB(uv), sampleA(uv), bandMix);
    } else if (uTransType == 5) {
      float bell = sin(uMix * 3.14159265);
      float sliceY = floor(vUv.y * 24.0);
      float seed = rand(vec2(sliceY, 91.7));
      float ofs = (seed * 2.0 - 1.0) * 0.18 * bell;
      vec2 sUv = uv + vec2(ofs, 0.0);
      float chr = bell * 0.022;
      vec2 uvA = sUv * uRepeatA + uOffsetA;
      vec2 uvB = sUv * uRepeatB + uOffsetB;
      vec3 a = vec3(texture2D(uTexA, uvA + vec2(chr, 0.0)).r, texture2D(uTexA, uvA).g, texture2D(uTexA, uvA - vec2(chr, 0.0)).b);
      vec3 b = vec3(texture2D(uTexB, uvB + vec2(chr, 0.0)).r, texture2D(uTexB, uvB).g, texture2D(uTexB, uvB - vec2(chr, 0.0)).b);
      col = mix(a, b, smoothstep(0.30, 0.70, uMix));
    } else {
      float bell = sin(uMix * 3.14159265);
      float cellPx = mix(2.0, 32.0, bell);
      vec2 grid = max(uMeshSize / cellPx, vec2(1.0));
      vec2 qUv = (floor(vUv * grid) + 0.5) / grid;
      col = mix(sampleA(qUv), sampleB(qUv), smoothstep(0.45, 0.55, uMix));
    }

    float texBlend = clamp(uReveal, 0.0, 1.0);
    col = mix(uFlatColor, col, texBlend);

    if (uDisintegrate > 0.001) {
      vec3 codeCol = texture2D(uCodeTex, fract(vUvEff * 6.0)).rgb;
      col = mix(col, codeCol, smoothstep(0.06, 0.7, uDisintegrate));
    }

    if (uHover > 0.001) {
      vec2 d = abs(vUv - 0.5) * 2.0;
      float edgeMax = max(d.x, d.y);
      float line = smoothstep(0.985, 1.0, edgeMax);
      float bloom = pow(smoothstep(0.55, 1.0, edgeMax), 2.5);
      float pulse = 0.80 + 0.20 * sin(uHoverTime * 3.0);
      col += vec3(0.188, 0.722, 1.0) * (line * 2.6 + bloom * 0.55) * uHover * pulse;
    }

    float gray = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, vec3(gray), uGrayscale);

    gl_FragColor = vec4(col, alpha);
  }
`;

// ---------- shaders: post pass (fisheye distortion + radial blur, driven by scroll velocity) ----------
const postVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

function postFragmentShader(samples) {
  return `
    uniform sampler2D uScene;
    uniform float uStrength;
    uniform float uRadialBlur;
    varying vec2 vUv;
    #define PI 3.14159265359
    #define SAMPLES ${samples}
    void main() {
      if (uStrength < 0.001 && uRadialBlur < 0.001) {
        gl_FragColor = texture2D(uScene, vUv);
        return;
      }
      vec2 c = vUv * 2.0 - 1.0;
      float r = length(c);
      float rSphere = mix(r, sin(r * PI * 0.5), uStrength * 0.7);
      vec2 uv = (r > 0.001) ? (c / r * rSphere) * 0.5 + 0.5 : vUv;
      uv = clamp(uv, 0.0, 1.0);
      vec2 center = vec2(0.5);
      vec2 dir = uv - center;
      float dist = length(dir);
      float amt = dist * dist * uRadialBlur;
      vec4 acc = vec4(0.0);
      for (int i = 0; i < SAMPLES; i++) {
        float t = float(i) / float(SAMPLES - 1);
        acc += texture2D(uScene, uv - dir * t * amt);
      }
      gl_FragColor = acc / float(SAMPLES);
    }
  `;
}

// ---------- placeholder textures (swap these for real photos later) ----------
function makeTexture(index, total) {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const hue = (index / total) * 360;
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, `hsl(${hue}, 55%, 30%)`);
  grad.addColorStop(1, `hsl(${(hue + 40) % 360}, 55%, 15%)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = '600 42px -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(index + 1).padStart(2, '0'), size / 2, size / 2);
  return new THREE.CanvasTexture(c);
}

const texturePool = [];     // index -> THREE.Texture once ready
const textureAspects = [];  // index -> width/height, once known
const readyIndices = [];    // indices currently safe to assign to a cell

function onTextureReady(idx) {
  readyIndices.push(idx);
  // light up any cell that was still showing its flat placeholder color because
  // nothing had loaded yet when it was built
  for (const cell of cells) {
    if (cell.textureIndex === -1) {
      cell.textureIndex = idx;
      assignTexture(cell, idx, 'A');
    }
  }
}

if (IMAGE_URLS.length > 0) {
  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous'); // your photo host needs to allow cross-origin reads for this to work
  IMAGE_URLS.forEach((url, i) => {
    loader.load(
      url,
      (tex) => {
        // deliberately NOT setting an sRGB colorSpace here: this is a raw custom
        // ShaderMaterial with no colorspace-aware output stage, so marking the
        // texture sRGB would gamma-decode it on the GPU with nothing to re-encode
        // it on the way out — a contrast/gamma mismatch vs. the source file.
        // Leaving it at the default keeps sampled values a faithful passthrough.
        texturePool[i] = tex;
        textureAspects[i] = tex.image.width / tex.image.height;
        onTextureReady(i);
      },
      undefined,
      (err) => console.warn('oasis: could not load', url, err)
    );
  });
} else {
  const PLACEHOLDER_COUNT = 24;
  for (let i = 0; i < PLACEHOLDER_COUNT; i++) {
    texturePool[i] = makeTexture(i, PLACEHOLDER_COUNT);
    textureAspects[i] = 1; // square canvas
    readyIndices.push(i);
  }
}

function randomTextureIndex(excludeIdx) {
  if (readyIndices.length === 0) return -1;
  if (readyIndices.length === 1) return readyIndices[0] === excludeIdx ? -1 : readyIndices[0];
  let idx = excludeIdx;
  let guard = 0;
  while (idx === excludeIdx && guard < 8) {
    idx = readyIndices[Math.floor(Math.random() * readyIndices.length)];
    guard++;
  }
  return idx;
}

// "disintegrate" overlay: a dense tile of monospace glyphs standing in for pixelated code
function makeCodeTexture() {
  const size = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#03100a';
  ctx.fillRect(0, 0, size, size);
  const glyphs = '01{}[]()<>=+-*/;:.,#$%&_|\\~^01010101'.split('');
  const cell = 9;
  ctx.font = `${cell - 1}px "SFMono-Regular", Menlo, Consolas, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let y = 0; y < size; y += cell) {
    for (let x = 0; x < size; x += cell) {
      const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
      const bright = Math.random();
      const green = 120 + Math.floor(bright * 135);
      ctx.fillStyle = bright > 0.88
        ? `rgba(225,255,238,${0.75 + Math.random() * 0.25})`
        : `rgba(55,${green},108,${0.4 + bright * 0.55})`;
      ctx.fillText(glyph, x + cell / 2, y + cell / 2);
    }
  }
  return new THREE.CanvasTexture(c);
}
const codeTexture = makeCodeTexture();

// ---------- scene / camera / renderer ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0c);

const camera = new THREE.OrthographicCamera(
  -sizes.width / 2, sizes.width / 2, sizes.height / 2, -sizes.height / 2, 0.1, 100
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// distortion post pass runs off a lower-res FBO (matches the reference's dpr cap of 1 for this pass)
const RADIAL_SAMPLES = isSp() ? 4 : 8;
const fboDprInit = Math.min(devicePixelRatio, 1);
const fbo = new THREE.WebGLRenderTarget(
  Math.max(1, Math.round(sizes.width * fboDprInit)),
  Math.max(1, Math.round(sizes.height * fboDprInit)),
  { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter }
);
const postMat = new THREE.ShaderMaterial({
  vertexShader: postVertexShader,
  fragmentShader: postFragmentShader(RADIAL_SAMPLES),
  uniforms: { uScene: { value: fbo.texture }, uStrength: { value: 0 }, uRadialBlur: { value: 0 } },
  depthWrite: false, depthTest: false,
});
const postScene = new THREE.Scene();
postScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMat));
const ppCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const closeBtn = document.getElementById('pg-close');

// ---------- mutable state ----------
const anim = { introZoom: 0.9 }; // gsap needs an object property, not a bare `let`, to tween
let isTouchDevice = false;
let time = 0, lastFrameMs = performance.now();
let scrollX = 0, scrollY = 0, targetX = 0, targetY = 0;
let velocity = 0;
let zoom = 1, zoomTarget = 1;
let distStrength = 0, radialBlur = 0;
const AUTOSCROLL_SPEED = 9; // px/sec

let isDragging = false, didDrag = false;
let dragStartPos = null, dragLast = null;

let revealReady = false, autoScroll = false;

let packW = 0, packH = 0;
let cells = [], gridGroup = null;
let allMeshes = [], meshToCellMap = new Map();

let hoveredCell = null, hoverThrottle = 0;

let isExpanded = false, expandedMesh = null, expandedCell = null;
let expandBasePos = null;
const expandParallax = { x: 0, y: 0 };
let overlay = null;

let resizeTimer = null;

let interfaceState = 'normal';    // 'normal' | 'exploding' | 'exploded' | 'disintegrating' | 'disintegrated' | 'repairing'
let interactionLocked = false;    // freezes drag/wheel/hover/auto-scroll during explode/disintegrate

const TRANSITION_DURATION = 0.65;
const SWITCH_MIN = 3.7, SWITCH_MAX = 3.7;
const EXPAND_DURATION = 2.4, CLOSE_DURATION = 1.4;
const CLICK_MOVE_THRESHOLD = 6; // px
const PARALLAX_RANGE = 16;  // px of drift while a photo is expanded, at 1x zoom
const PARALLAX_LERP = 0.06; // lower = slower, floatier follow

const EXPLODE_STAGGER_MAX = 0.5;               // seconds, spread of start delays by distance from center
const EXPLODE_DURATION_MIN = 0.9, EXPLODE_DURATION_MAX = 1.5;
const EXPLODE_DISTANCE_MIN = 400, EXPLODE_DISTANCE_MAX = 900; // px flown outward on x/y
const EXPLODE_Z_MAX = 460; // pseudo-depth range; faked via scale since the camera is orthographic

// disintegrate: a slow pixelate-into-code phase, then a few random pieces crumble off
// individually before the rest of the structure lets go and falls together
const DISINTEGRATE_PIXELATE_DURATION = 1.6;
const DISINTEGRATE_RANDOM_RATIO = 0.22;          // fraction of cells that fall on their own first
const DISINTEGRATE_RANDOM_WINDOW = 2.8;          // seconds spread across which those start falling
const DISINTEGRATE_RANDOM_FALL_MIN = 1.7, DISINTEGRATE_RANDOM_FALL_MAX = 2.7; // slow individual falls
const DISINTEGRATE_RANDOM_DRIFT = 90;            // px of horizontal wander for the early fallers
const DISINTEGRATE_MASS_STAGGER = 0.5;           // light stagger once everyone else lets go together
const DISINTEGRATE_MASS_FALL_MIN = 1.3, DISINTEGRATE_MASS_FALL_MAX = 2.0;
const DISINTEGRATE_FALL_DISTANCE = 850;          // px fallen

const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2(-2, -2);

// ---------- texture assignment + crossfade transitions ----------
function assignTexture(cell, idx, slot) {
  const u = cell.mat.uniforms;
  if (idx === -1 || !texturePool[idx]) {
    // nothing loaded yet — shader falls back to the cell's flat placeholder color
    if (slot === 'A') { u.uTexA.value = null; u.uHasA.value = false; }
    else { u.uTexB.value = null; u.uHasB.value = false; }
    return;
  }
  const fit = coverFit(textureAspects[idx] || 1, cell.cellAspect);
  if (slot === 'A') {
    u.uTexA.value = texturePool[idx]; u.uHasA.value = true;
    u.uRepeatA.value.set(fit.rx, fit.ry); u.uOffsetA.value.set(fit.ox, fit.oy);
  } else {
    u.uTexB.value = texturePool[idx]; u.uHasB.value = true;
    u.uRepeatB.value.set(fit.rx, fit.ry); u.uOffsetB.value.set(fit.ox, fit.oy);
  }
}

function triggerTransition(cell) {
  if (cell.transitioning) return;
  const newIdx = randomTextureIndex(cell.textureIndex);
  if (newIdx === -1 || newIdx === cell.textureIndex) {
    // nothing new to switch to yet (still loading, or only one photo total) — just try again later
    cell.nextSwitchT = time + SWITCH_MIN + Math.random() * (SWITCH_MAX - SWITCH_MIN);
    return;
  }
  assignTexture(cell, newIdx, 'B');
  cell.mat.uniforms.uTransType.value = Math.floor(Math.random() * 7);
  cell.transitioning = true;
  cell.mat.uniforms.uMix.value = 0;
  gsap.killTweensOf(cell.mat.uniforms.uMix);
  gsap.to(cell.mat.uniforms.uMix, {
    value: 1, duration: TRANSITION_DURATION, ease: "power1.inOut",
    onComplete: () => {
      const u = cell.mat.uniforms;
      u.uTexA.value = u.uTexB.value;
      u.uHasA.value = u.uHasB.value;
      u.uRepeatA.value.copy(u.uRepeatB.value);
      u.uOffsetA.value.copy(u.uOffsetB.value);
      u.uTexB.value = null; u.uHasB.value = false; u.uMix.value = 0;
      cell.textureIndex = newIdx;
      cell.transitioning = false;
      cell.nextSwitchT = time + SWITCH_MIN + Math.random() * (SWITCH_MAX - SWITCH_MIN);
    },
  });
}

// ---------- grid construction ----------
function disposeGrid() {
  if (!gridGroup) return;
  cells.forEach((cell) => {
    gsap.killTweensOf(cell.mesh.position);
    gsap.killTweensOf(cell.mesh.rotation);
    gsap.killTweensOf(cell.mesh.scale);
    const u = cell.mat.uniforms;
    gsap.killTweensOf(u.uFade);
    gsap.killTweensOf(u.uMix);
    gsap.killTweensOf(u.uReveal);
    gsap.killTweensOf(u.uHover);
    gsap.killTweensOf(u.uGrayscale);
    gsap.killTweensOf(u.uDisintegrate);
    cell.mat.dispose();
    cell.mesh.geometry.dispose(); // shared with its replicas, dispose once
  });
  scene.remove(gridGroup);
}

function buildGrid() {
  disposeGrid();

  scrollX = scrollY = targetX = targetY = 0;
  zoom = zoomTarget = 1;
  distStrength = radialBlur = 0;
  autoScroll = false;
  revealReady = false;
  isExpanded = false;
  expandedMesh = null; expandedCell = null;
  hoveredCell = null;
  if (overlay) overlay.visible = false;
  closeBtn.classList.remove('visible');

  gridGroup = new THREE.Group();
  scene.add(gridGroup);

  const sp = isSp();
  let rects;
  if (sp) {
    packW = sizes.width;
    packH = Math.round(sizes.height * 2.4);
    rects = packColumns(packW, packH, 3);
  } else {
    packW = Math.round(sizes.width * PACK_SCALE);
    packH = Math.round(sizes.height * PACK_SCALE);
    rects = packRect(0, 0, packW, packH, CELL_MIN_W, CELL_MIN_H, CELL_MAX_W, CELL_MAX_H);
  }

  cells = [];
  const gap = sp ? 6 : CELL_GAP;
  const xOffsets = sp ? [0] : [-1, 0, 1];
  const yOffsets = [-1, 0, 1];

  rects.forEach((rect) => {
    const w = Math.max(1, rect.w - gap);
    const h = Math.max(1, rect.h - gap);
    const cellAspect = w / h;

    const mat = new THREE.ShaderMaterial({
      vertexShader: cellVertexShader,
      fragmentShader: cellFragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTexA: { value: null }, uTexB: { value: null },
        uHasA: { value: false }, uHasB: { value: false },
        uRepeatA: { value: new THREE.Vector2(1, 1) }, uOffsetA: { value: new THREE.Vector2(0, 0) },
        uRepeatB: { value: new THREE.Vector2(1, 1) }, uOffsetB: { value: new THREE.Vector2(0, 0) },
        uFlatColor: { value: new THREE.Color(0x15151c) },
        uMix: { value: 0 }, uTransType: { value: 0 },
        uMeshSize: { value: new THREE.Vector2(w, h) },
        uReveal: { value: -1 }, uGrayscale: { value: 0 },
        uHover: { value: 0 }, uHoverTime: { value: 0 }, uFade: { value: 1 },
        uDisintegrate: { value: 0 }, uCodeTex: { value: codeTexture },
      },
    });

    const geometry = new THREE.PlaneGeometry(w, h);
    const mesh = new THREE.Mesh(geometry, mat);
    const x = rect.x + rect.w / 2 - packW / 2;
    const y = -(rect.y + rect.h / 2 - packH / 2);
    mesh.position.set(x, y, 1);
    mesh.renderOrder = 1;
    gridGroup.add(mesh);

    const replicas = [];
    for (const ry of yOffsets) {
      for (const rx of xOffsets) {
        if (rx === 0 && ry === 0) continue;
        const rmesh = new THREE.Mesh(geometry, mat);
        rmesh.position.set(x + rx * packW, y + ry * packH, 1);
        rmesh.renderOrder = 1;
        gridGroup.add(rmesh);
        replicas.push(rmesh);
      }
    }

    const cell = {
      mesh, mat, replicas, meshW: w, meshH: h, cellAspect,
      textureIndex: -1, nextSwitchT: Infinity, transitioning: false,
    };
    cell.textureIndex = randomTextureIndex(-1);
    assignTexture(cell, cell.textureIndex, 'A');
    cells.push(cell);
  });

  allMeshes = [];
  meshToCellMap = new Map();
  for (const cell of cells) {
    allMeshes.push(cell.mesh);
    meshToCellMap.set(cell.mesh, cell);
    for (const r of cell.replicas) { allMeshes.push(r); meshToCellMap.set(r, cell); }
  }
}

// ---------- intro reveal ----------
function startReveal() {
  autoScroll = false;
  revealReady = false;
  anim.introZoom = 0.9;
  let remaining = cells.length;
  cells.forEach((cell) => {
    const u = cell.mat.uniforms;
    gsap.killTweensOf(u.uReveal);
    gsap.to(u.uReveal, {
      value: 1, duration: 0.7, delay: 0.05 + Math.random() * 0.3, ease: "power2.out",
      onComplete: () => {
        cell.nextSwitchT = time + 1.5 + Math.random() * 1.5;
        remaining--;
        if (remaining === 0) { revealReady = true; autoScroll = !isTouchDevice; }
      },
    });
  });
  gsap.to(anim, { introZoom: 1, duration: 1.3, delay: 0.7, ease: "power2.inOut" });
}

// ---------- hover glow ----------
function clearHover() {
  if (!hoveredCell) return;
  const u = hoveredCell.mat.uniforms;
  gsap.killTweensOf(u.uHover);
  gsap.to(u.uHover, { value: 0, duration: 0.3, ease: "power2.out" });
  hoveredCell = null;
}

function updateHover() {
  if (pointerNDC.x < -1 || pointerNDC.x > 1 || pointerNDC.y < -1 || pointerNDC.y > 1) {
    clearHover();
    return;
  }
  raycaster.setFromCamera(pointerNDC, camera);
  const hits = raycaster.intersectObjects(allMeshes);
  const next = hits.length ? meshToCellMap.get(hits[0].object) : null;
  if (next === hoveredCell) return;

  if (hoveredCell) {
    const u = hoveredCell.mat.uniforms;
    gsap.killTweensOf(u.uHover);
    gsap.killTweensOf(u.uGrayscale);
    gsap.to(u.uHover, { value: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(u.uGrayscale, { value: 1, duration: 0.3, ease: "power2.out" });
  }
  if (next) {
    const u = next.mat.uniforms;
    u.uHoverTime.value = 0;
    gsap.killTweensOf(u.uHover);
    gsap.killTweensOf(u.uGrayscale);
    gsap.to(u.uHover, { value: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(u.uGrayscale, { value: 0, duration: 0.3, ease: "power2.out" });
  }
  hoveredCell = next;
}

// ---------- click to expand / close ----------
function ensureOverlay() {
  if (overlay) return;
  const geometry = new THREE.PlaneGeometry(sizes.width * 6, sizes.height * 6);
  const material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0, depthWrite: false, depthTest: false });
  overlay = new THREE.Mesh(geometry, material);
  overlay.position.set(0, 0, 2);
  overlay.renderOrder = 2;
  overlay.visible = false;
  scene.add(overlay);
}

function openExpand(mesh, cell) {
  if (isExpanded) return;
  autoScroll = false;
  isExpanded = true;
  expandedMesh = mesh;
  expandedCell = cell;
  cell.nextSwitchT = Infinity;
  mesh.renderOrder = 4;

  const currentZoom = camera.zoom;
  const fitZoomX = (sizes.width * 0.75) / cell.meshW;
  const fitZoomY = (sizes.height * 0.8) / cell.meshH;
  const expandZoom = Math.min(fitZoomX, fitZoomY, currentZoom * 4);
  const scaleFactor = expandZoom / currentZoom;

  const targetGX = -mesh.position.x * scaleFactor;
  const targetGY = -mesh.position.y * scaleFactor;

  expandBasePos = { x: mesh.position.x, y: mesh.position.y };
  expandParallax.x = 0;
  expandParallax.y = 0;

  gsap.killTweensOf(gridGroup.position);
  gsap.killTweensOf(gridGroup.scale);
  gsap.to(gridGroup.position, { x: targetGX, y: targetGY, duration: EXPAND_DURATION, ease: "power3.inOut" });
  gsap.to(gridGroup.scale, { x: scaleFactor, y: scaleFactor, duration: EXPAND_DURATION, ease: "power3.inOut" });

  for (const c of cells) {
    if (c === cell) continue;
    gsap.killTweensOf(c.mat.uniforms.uFade);
    gsap.to(c.mat.uniforms.uFade, { value: 0, duration: EXPAND_DURATION * 0.55, ease: "power1.out" });
  }

  ensureOverlay();
  overlay.visible = true;
  gsap.killTweensOf(overlay.material);
  gsap.to(overlay.material, { opacity: 0.6, duration: EXPAND_DURATION * 0.55, ease: "power1.out" });

  closeBtn.classList.add('visible');
}

function closeExpand() {
  if (!isExpanded || !expandedMesh || !expandedCell) return;
  const mesh = expandedMesh, cell = expandedCell;
  // tween back to wherever the grid's own scroll position currently is, not the origin,
  // so there's no snap once render() resumes driving gridGroup.position every frame
  const wrapX = scrollX - Math.round(scrollX / packW) * packW;
  const wrapY = scrollY - Math.round(scrollY / packH) * packH;

  gsap.killTweensOf(gridGroup.position);
  gsap.killTweensOf(gridGroup.scale);
  gsap.to(gridGroup.position, { x: wrapX, y: -wrapY, duration: CLOSE_DURATION, ease: "power3.inOut" });
  gsap.to(gridGroup.scale, {
    x: 1, y: 1, duration: CLOSE_DURATION, ease: "power3.inOut",
    onComplete: () => {
      mesh.renderOrder = 1;
      if (expandBasePos) { mesh.position.x = expandBasePos.x; mesh.position.y = expandBasePos.y; }
      expandBasePos = null;
      autoScroll = !isTouchDevice;
      isExpanded = false;
      expandedMesh = null;
      expandedCell = null;
      cell.nextSwitchT = time + SWITCH_MIN + Math.random() * (SWITCH_MAX - SWITCH_MIN);
    },
  });

  for (const c of cells) {
    if (c === cell) continue;
    gsap.killTweensOf(c.mat.uniforms.uFade);
    gsap.to(c.mat.uniforms.uFade, { value: 1, duration: CLOSE_DURATION * 0.55, ease: "power2.out" });
  }

  if (overlay) {
    gsap.killTweensOf(overlay.material);
    gsap.to(overlay.material, {
      opacity: 0, duration: CLOSE_DURATION * 0.4, ease: "power2.out",
      onComplete: () => { overlay.visible = false; },
    });
  }

  closeBtn.classList.remove('visible');
}

function clickAt(ndc) {
  if (isExpanded) {
    raycaster.setFromCamera(ndc, camera);
    if (!expandedMesh || raycaster.intersectObject(expandedMesh).length === 0) closeExpand();
    return;
  }
  if (!revealReady) return;
  raycaster.setFromCamera(ndc, camera);
  const hits = raycaster.intersectObjects(allMeshes);
  if (!hits.length) return;
  const cell = meshToCellMap.get(hits[0].object);
  if (cell) openExpand(hits[0].object, cell);
}

// ---------- explode / disintegrate / repair ----------
const explodeBtn = document.getElementById('pg-explode');
const disintegrateBtn = document.getElementById('pg-disintegrate');
const repairBtn = document.getElementById('pg-repair');

function setActionButtons(state) {
  const normal = state === 'normal';
  const done = state === 'exploded' || state === 'disintegrated';
  explodeBtn.disabled = !normal;
  disintegrateBtn.disabled = !normal;
  explodeBtn.hidden = done;
  disintegrateBtn.hidden = done;
  repairBtn.hidden = !done;
}

// approximated "physics": no rigid-body solver, just a radial burst timed so cells
// nearest the grid's center kick off first and the shockwave spreads outward.
// the camera is orthographic (no perspective), so literal z-translation alone would be
// invisible; each cell's z is faked by tying it to scale (farther on z = smaller), which
// is the standard way to sell a depth axis without a perspective camera.
function runExplode() {
  if (interfaceState !== 'normal' || !revealReady) return;
  if (isExpanded) closeExpand();

  interfaceState = 'exploding';
  interactionLocked = true;
  setActionButtons('exploding');

  let maxDist = 1;
  for (const cell of cells) {
    const d = Math.hypot(cell.mesh.position.x, cell.mesh.position.y);
    if (d > maxDist) maxDist = d;
  }

  let maxFinish = 0;
  cells.forEach((cell) => {
    cell.replicas.forEach((r) => { r.visible = false; });

    const startX = cell.mesh.position.x, startY = cell.mesh.position.y;
    const dist = Math.hypot(startX, startY);
    let dirX = startX / (dist || 1), dirY = startY / (dist || 1);
    if (dist < 1) {
      const a = Math.random() * Math.PI * 2;
      dirX = Math.cos(a); dirY = Math.sin(a);
    }

    const delay = (dist / maxDist) * EXPLODE_STAGGER_MAX;
    const duration = EXPLODE_DURATION_MIN + Math.random() * (EXPLODE_DURATION_MAX - EXPLODE_DURATION_MIN);
    const flyDist = EXPLODE_DISTANCE_MIN + Math.random() * (EXPLODE_DISTANCE_MAX - EXPLODE_DISTANCE_MIN);
    const flyZ = (Math.random() - 0.5) * 2 * EXPLODE_Z_MAX; // signed pseudo-depth
    const spin = (Math.random() - 0.5) * 12;

    // one proxy tween drives x/y/z/rotation/scale together each update, instead of
    // several independent gsap tweens racing to write the same mesh properties
    const driver = { t: 0 };
    gsap.to(driver, {
      t: 1, duration, delay, ease: "power2.in",
      onUpdate: () => {
        const t = driver.t;
        cell.mesh.position.x = startX + dirX * flyDist * t;
        cell.mesh.position.y = startY + dirY * flyDist * t;
        cell.mesh.position.z = 1 + flyZ * t;
        cell.mesh.rotation.z = spin * t;
        const zFactor = 1 / (1 + Math.abs(flyZ * t) / 380);
        const s = (1 - t) * zFactor;
        cell.mesh.scale.set(s, s, 1);
      },
    });

    gsap.killTweensOf(cell.mat.uniforms.uFade);
    gsap.to(cell.mat.uniforms.uFade, {
      value: 0, duration: duration * 0.7, delay: delay + duration * 0.3, ease: "power1.in",
      onComplete: () => { cell.mesh.visible = false; },
    });

    maxFinish = Math.max(maxFinish, delay + duration);
  });

  gsap.delayedCall(maxFinish + 0.05, () => {
    interfaceState = 'exploded';
    setActionButtons('exploded');
    scheduleIdleMessage();
  });
}

// slow pixelate-into-code, then a random handful of pieces peel off individually
// before the rest of the structure lets go and falls together
function runDisintegrate() {
  if (interfaceState !== 'normal' || !revealReady) return;
  if (isExpanded) closeExpand();

  interfaceState = 'disintegrating';
  interactionLocked = true;
  setActionButtons('disintegrating');

  cells.forEach((cell) => { cell.replicas.forEach((r) => { r.visible = false; }); });

  const shuffled = [...cells].sort(() => Math.random() - 0.5);
  const randomFallCount = Math.max(1, Math.round(cells.length * DISINTEGRATE_RANDOM_RATIO));
  const randomFallers = new Set(shuffled.slice(0, randomFallCount));
  const massFallStart = DISINTEGRATE_PIXELATE_DURATION * 0.5 + DISINTEGRATE_RANDOM_WINDOW;

  let maxFinish = 0;
  cells.forEach((cell) => {
    const u = cell.mat.uniforms;
    gsap.killTweensOf(u.uDisintegrate);
    gsap.to(u.uDisintegrate, { value: 1, duration: DISINTEGRATE_PIXELATE_DURATION, ease: "power1.inOut" });

    const isRandomFaller = randomFallers.has(cell);
    const fallDelay = isRandomFaller
      ? DISINTEGRATE_PIXELATE_DURATION * 0.4 + Math.random() * DISINTEGRATE_RANDOM_WINDOW
      : massFallStart + Math.random() * DISINTEGRATE_MASS_STAGGER;
    const fallDuration = isRandomFaller
      ? DISINTEGRATE_RANDOM_FALL_MIN + Math.random() * (DISINTEGRATE_RANDOM_FALL_MAX - DISINTEGRATE_RANDOM_FALL_MIN)
      : DISINTEGRATE_MASS_FALL_MIN + Math.random() * (DISINTEGRATE_MASS_FALL_MAX - DISINTEGRATE_MASS_FALL_MIN);
    const driftX = isRandomFaller ? (Math.random() - 0.5) * 2 * DISINTEGRATE_RANDOM_DRIFT : 0;

    gsap.to(cell.mesh.position, {
      x: cell.mesh.position.x + driftX,
      y: cell.mesh.position.y - DISINTEGRATE_FALL_DISTANCE - Math.random() * 250,
      duration: fallDuration, delay: fallDelay, ease: "power2.in",
    });
    gsap.killTweensOf(u.uFade);
    gsap.to(u.uFade, {
      value: 0, duration: fallDuration, delay: fallDelay, ease: "power2.in",
      onComplete: () => { cell.mesh.visible = false; },
    });

    maxFinish = Math.max(maxFinish, fallDelay + fallDuration);
  });

  gsap.delayedCall(maxFinish + 0.05, () => {
    interfaceState = 'disintegrated';
    setActionButtons('disintegrated');
    scheduleIdleMessage();
  });
}

// nudge for anyone who explodes/disintegrates the gallery and then just... leaves it that way
const IDLE_EMPTY_DELAY = 15000; // ms
const idleMsgEl = document.getElementById('pg-idle-msg');
let idleEmptyTimeout = null;

function scheduleIdleMessage() {
  clearIdleMessage();
  idleEmptyTimeout = setTimeout(() => {
    gsap.to(idleMsgEl, { opacity: 1, duration: 2.2, ease: "power1.out" });
  }, IDLE_EMPTY_DELAY);
}

function clearIdleMessage() {
  if (idleEmptyTimeout) { clearTimeout(idleEmptyTimeout); idleEmptyTimeout = null; }
  gsap.killTweensOf(idleMsgEl);
  gsap.to(idleMsgEl, { opacity: 0, duration: 0.4, ease: "power1.out" });
}

function runRepair() {
  if (interfaceState !== 'exploded' && interfaceState !== 'disintegrated') return;
  interfaceState = 'repairing';
  setActionButtons('repairing');
  clearIdleMessage();

  buildGrid();
  interactionLocked = false;
  startReveal();

  const waitForReveal = () => {
    if (revealReady) {
      interfaceState = 'normal';
      setActionButtons('normal');
    } else {
      requestAnimationFrame(waitForReveal);
    }
  };
  requestAnimationFrame(waitForReveal);
}

explodeBtn.addEventListener('click', runExplode);
disintegrateBtn.addEventListener('click', runDisintegrate);
repairBtn.addEventListener('click', runRepair);

// ---------- input: drag-to-pan, wheel-to-pan, click detection ----------
function updatePointerNDC(e) {
  pointerNDC.x = (e.clientX / sizes.width) * 2 - 1;
  pointerNDC.y = -(e.clientY / sizes.height) * 2 + 1;
}

function onPointerDown(e) {
  if (interactionLocked) return;
  updatePointerNDC(e);
  isDragging = true;
  didDrag = false;
  dragStartPos = { x: e.clientX, y: e.clientY };
  dragLast = { x: e.clientX, y: e.clientY };
}

function onPointerMove(e) {
  updatePointerNDC(e);
  if (!isDragging || !dragLast) return;
  const dx = e.clientX - dragLast.x;
  const dy = e.clientY - dragLast.y;
  dragLast = { x: e.clientX, y: e.clientY };
  if (!didDrag && dragStartPos) {
    const total = Math.hypot(e.clientX - dragStartPos.x, e.clientY - dragStartPos.y);
    if (total > CLICK_MOVE_THRESHOLD) didDrag = true;
  }
  if (isExpanded) return;
  if (!isSp()) targetX += dx;
  targetY += dy;
}

function onPointerUp(e) {
  updatePointerNDC(e);
  const wasDragging = isDragging;
  isDragging = false;
  dragLast = null;
  if (wasDragging && !didDrag) clickAt(pointerNDC);
  dragStartPos = null;
  didDrag = false;
}

function onWheel(e) {
  if (interactionLocked) return;
  if (isExpanded) return;
  if (!isSp()) targetX -= e.deltaX;
  targetY -= e.deltaY;
}

function onResize() {
  sizes.width = innerWidth;
  sizes.height = innerHeight;
  camera.left = -sizes.width / 2;
  camera.right = sizes.width / 2;
  camera.top = sizes.height / 2;
  camera.bottom = -sizes.height / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);

  const fboDpr = Math.min(devicePixelRatio, 1);
  fbo.setSize(Math.max(1, Math.round(sizes.width * fboDpr)), Math.max(1, Math.round(sizes.height * fboDpr)));

  // full grid rebuild is a bit heavy to run on every resize tick during a window drag,
  // so only do it once things settle
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (interfaceState !== 'normal') return; // don't disturb a mid-animation / exploded / disintegrated view
    buildGrid();
    setActionButtons('normal');
    startReveal();
  }, 250);
}

// ---------- render loop ----------
function tick() {
  requestAnimationFrame(tick);

  const now = performance.now();
  const dt = Math.min(0.05, Math.max(0, (now - lastFrameMs) / 1000));
  lastFrameMs = now;
  time += dt;

  if (autoScroll && !interactionLocked) targetY -= AUTOSCROLL_SPEED * dt;

  const prevScrollX = scrollX, prevScrollY = scrollY;
  if (!isExpanded && !interactionLocked) {
    scrollX += (targetX - scrollX) * 0.08;
    scrollY += (targetY - scrollY) * 0.08;
  }
  const moveDist = Math.hypot(scrollX - prevScrollX, scrollY - prevScrollY);
  velocity += (moveDist - velocity) * 0.4;

  zoomTarget = isTouchDevice ? 1 : isExpanded ? 1 : isDragging ? 0.92 : 1 - Math.min(velocity / 30, 0.1);
  const zoomDelta = zoomTarget - zoom;
  if (!interactionLocked) zoom += zoomDelta * (zoomDelta > 0 ? 0.18 : 0.14);

  if (!isExpanded) {
    const combinedZoom = zoom * anim.introZoom;
    if (Math.abs(combinedZoom - camera.zoom) > 1e-4) {
      camera.zoom = combinedZoom;
      camera.updateProjectionMatrix();
    }
    const wrapX = scrollX - Math.round(scrollX / packW) * packW;
    const wrapY = scrollY - Math.round(scrollY / packH) * packH;
    gridGroup.position.x = wrapX;
    gridGroup.position.y = -wrapY;
  }

  // while a photo is expanded, let it drift a little with the cursor instead of sitting static
  if (isExpanded && expandedMesh && expandBasePos && !isTouchDevice) {
    const targetParX = pointerNDC.x * PARALLAX_RANGE;
    const targetParY = pointerNDC.y * PARALLAX_RANGE;
    expandParallax.x += (targetParX - expandParallax.x) * PARALLAX_LERP;
    expandParallax.y += (targetParY - expandParallax.y) * PARALLAX_LERP;
    const scale = gridGroup.scale.x || 1;
    expandedMesh.position.x = expandBasePos.x - expandParallax.x / scale;
    expandedMesh.position.y = expandBasePos.y - expandParallax.y / scale;
  }

  for (const cell of cells) {
    if ((cell === hoveredCell || isExpanded) && cell.nextSwitchT < Infinity) {
      cell.nextSwitchT += dt;
    }
    if (!cell.transitioning && !isExpanded && !interactionLocked && revealReady && time >= cell.nextSwitchT) {
      triggerTransition(cell);
    }
    const u = cell.mat.uniforms;
    if (u.uHover.value > 0.001) u.uHoverTime.value += dt;
  }

  if (!isTouchDevice && !isExpanded && !isDragging && !interactionLocked && revealReady) {
    hoverThrottle = (hoverThrottle + 1) & 1;
    if (hoverThrottle === 0) updateHover();
  } else if (hoveredCell) {
    clearHover();
  }

  if (!isTouchDevice) {
    renderer.domElement.style.cursor = isExpanded ? 'default' : isDragging ? 'grabbing' : hoveredCell ? 'pointer' : 'grab';
  }

  renderer.setRenderTarget(fbo);
  renderer.render(scene, camera);

  if (isTouchDevice) {
    distStrength = 0;
    radialBlur = 0;
  } else {
    const distTarget = Math.min(velocity / 75, 0.25);
    distStrength += (distTarget - distStrength) * 0.1;
    const blurTarget = Math.min(velocity / 20, 0.07);
    radialBlur += (blurTarget - radialBlur) * 0.07;
  }
  postMat.uniforms.uStrength.value = distStrength;
  postMat.uniforms.uRadialBlur.value = radialBlur;

  renderer.setRenderTarget(null);
  renderer.render(postScene, ppCamera);
}

// ---------- boot ----------
isTouchDevice = window.matchMedia
  ? window.matchMedia('(hover: none) and (pointer: coarse)').matches
  : ('ontouchstart' in window);

buildGrid();
setActionButtons('normal');

renderer.domElement.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointermove', onPointerMove);
window.addEventListener('pointerup', onPointerUp);
window.addEventListener('wheel', onWheel, { passive: true });
window.addEventListener('resize', onResize);
closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeExpand(); });

startReveal();
lastFrameMs = performance.now();
requestAnimationFrame(tick);
