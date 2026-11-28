import * as THREE from 'three';

/* Scroll-driven targets. GSAP tweens these; the render loop eases toward them. */
export const S = {
  coreX: 2.7, coreY: 0.15, coreScale: 1.45, amp: 0.27, wire: 0.5, rings: 1, glow: 1,
  projMix: 0, proj: 0, spin: 0.18, intro: 0
};

const PALETTE = [
  ['#ff5a1f', '#ffb04a'], ['#ff3e34', '#ff8a3d'], ['#ff9a1f', '#ffd68a'],
  ['#ff7a2f', '#ffc46b'], ['#ff6a2a', '#ffe0a0'], ['#ff4a1a', '#ff9a4a']
];
const BASE = ['#ff5a1f', '#ffb04a'];

const NOISE = /* glsl */`
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.); const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.; vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.); m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const BODY_VS = /* glsl */`
uniform float uTime, uAmp;
varying vec3 vN, vV, vP; varying float vD;
${NOISE}
float disp(vec3 p){ return snoise(p*1.15 + vec3(0., uTime*.22, uTime*.1))*uAmp + snoise(p*2.4 - uTime*.35)*uAmp*.32; }
void main(){
  vec3 n = normalize(position);
  vec3 t = normalize(cross(n, abs(n.y) < .99 ? vec3(0.,1.,0.) : vec3(1.,0.,0.)));
  vec3 b = normalize(cross(n, t));
  float e = .012;
  vec3 n1 = normalize(n + t*e), n2 = normalize(n + b*e);
  float d0 = disp(n);
  vec3 p0 = n*(1.+d0), p1 = n1*(1.+disp(n1)), p2 = n2*(1.+disp(n2));
  vec3 nn = normalize(cross(p1-p0, p2-p0));
  vec4 mv = modelViewMatrix*vec4(p0*1.25, 1.);
  vN = normalize(normalMatrix*nn); vV = -mv.xyz; vP = p0; vD = d0;
  gl_Position = projectionMatrix*mv;
}`;
const BODY_FS = /* glsl */`
uniform vec3 uA, uB; uniform float uTime;
varying vec3 vN, vV, vP; varying float vD;
void main(){
  vec3 N = normalize(vN), V = normalize(vV);
  float fr = pow(1. - max(dot(N, V), 0.), 2.3);
  float lit = max(dot(N, normalize(vec3(.55,.8,.6))), 0.);
  vec3 base = vec3(.03,.022,.018) + lit*vec3(.17,.08,.035);
  float g = smoothstep(-.5, .7, vD*2.6 + vP.y*.4);
  vec3 glow = mix(uA, uB, g);
  float f = fract(vP.y*6. + vD*4.5 + uTime*.05);
  float line = smoothstep(0., .05, f) * (1. - smoothstep(.05, .1, f));
  vec3 col = base + glow*(fr*1.45 + line*(.28 + fr*.9)) + glow*lit*.1;
  gl_FragColor = vec4(col, 1.);
}`;
const PART_VS = /* glsl */`
uniform float uTime, uPR; attribute float aSize, aPh; attribute vec3 aCol;
varying vec3 vCol; varying float vA;
void main(){
  vec3 p = position; p.y += sin(uTime*.3 + aPh*6.28)*.25; p.x += cos(uTime*.2 + aPh*9.)*.2;
  vec4 mv = modelViewMatrix*vec4(p, 1.);
  float d = -mv.z;
  gl_PointSize = min(aSize*uPR*(70./max(d,.5)), 20.*uPR);
  vCol = aCol;
  vA = (.6 + .4*sin(uTime*1.5 + aPh*40.)) * smoothstep(.6, 5., d) * (1. - smoothstep(35., 78., d));
  gl_Position = projectionMatrix*mv;
}`;
const PART_FS = /* glsl */`
varying vec3 vCol; varying float vA;
void main(){ float r = length(gl_PointCoord - .5); float a = smoothstep(.5, 0., r); a *= a; gl_FragColor = vec4(vCol, a*vA); }`;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

export function initScene(canvas, { reduced = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { return null; }
  const coarse = matchMedia('(pointer: coarse)').matches;
  const small = innerWidth < 800;
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0908, 0.016);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 220);
  scene.add(camera);

  /* lights ride with the camera so shards always catch warm light */
  scene.add(new THREE.AmbientLight(0x4a2a1a, 1.1));
  const l1 = new THREE.PointLight(0xffa24a, 90, 0, 1.6); l1.position.set(-4, 3, -3); camera.add(l1);
  const l2 = new THREE.PointLight(0xff4a14, 120, 0, 1.6); l2.position.set(4.5, -2.5, -5); camera.add(l2);

  /* ---- core ---- */
  const core = new THREE.Group(); camera.add(core); core.position.z = -9;
  const bodyMat = new THREE.ShaderMaterial({
    vertexShader: BODY_VS, fragmentShader: BODY_FS,
    uniforms: { uTime: { value: 0 }, uAmp: { value: .27 }, uA: { value: new THREE.Color(BASE[0]) }, uB: { value: new THREE.Color(BASE[1]) } }
  });
  const body = new THREE.Mesh(new THREE.IcosahedronGeometry(1, coarse || small ? 22 : 34), bodyMat);
  core.add(body);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0xffb04a, wireframe: true, transparent: true, opacity: .2, blending: THREE.AdditiveBlending, depthWrite: false });
  const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.62, 2), wireMat); core.add(wire);

  const ringsGroup = new THREE.Group(); core.add(ringsGroup);
  const ringDefs = [[2.0, 1.15, 0.2, .5, .5], [2.45, -.7, 1.0, -.35, .34], [2.95, .4, -.6, .22, .22]];
  const rings = ringDefs.map(([r, rx, rz, sp, op]) => {
    const pivot = new THREE.Group(); pivot.rotation.set(rx, 0, rz);
    const spin = new THREE.Group(); pivot.add(spin);
    const m = new THREE.MeshBasicMaterial({ color: 0xffb04a, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false });
    spin.add(new THREE.Mesh(new THREE.TorusGeometry(r, .006, 6, 220), m));
    const dm = new THREE.MeshBasicMaterial({ color: 0xfff1d8 });
    const dot = new THREE.Mesh(new THREE.SphereGeometry(.06, 12, 12), dm); dot.position.x = r; spin.add(dot);
    ringsGroup.add(pivot);
    return { spin, sp, m, op, dm };
  });

  const gc = document.createElement('canvas'); gc.width = gc.height = 256;
  const gx = gc.getContext('2d'); const gg = gx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gg.addColorStop(0, 'rgba(255,255,255,.95)'); gg.addColorStop(.25, 'rgba(255,255,255,.35)'); gg.addColorStop(1, 'rgba(255,255,255,0)');
  gx.fillStyle = gg; gx.fillRect(0, 0, 256, 256);
  const glowMat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(gc), color: 0xff5a1f, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .5 });
  const glow = new THREE.Sprite(glowMat); glow.scale.setScalar(8.5); glow.position.z = -1.2; core.add(glow);

  /* ---- shards (world space, camera flies through them) ---- */
  const SH = coarse || small ? 34 : 64;
  const shardGeo = new THREE.IcosahedronGeometry(1, 0);
  const shardMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: .55, roughness: .38, flatShading: true, emissive: 0x1a0904 });
  const shards = new THREE.InstancedMesh(shardGeo, shardMat, SH); scene.add(shards);
  const sd = [], tmpC = new THREE.Color(), cols = [0x2a1d15, 0x241913, 0xff5a1f, 0xffb04a, 0x33241a];
  for (let i = 0; i < SH; i++) {
    const a = Math.random() * Math.PI * 2, r = 3.4 + Math.pow(Math.random(), .7) * 11;
    sd.push({
      x: Math.cos(a) * r * 1.5, y: Math.sin(a) * r * .8, z: 6 - Math.random() * 86,
      s: .25 + Math.random() * .9, ax: Math.random() * 6, ay: Math.random() * 6,
      vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5, fl: Math.random() * 6
    });
    shards.setColorAt(i, tmpC.setHex(cols[(Math.random() * cols.length) | 0]));
  }
  const dummy = new THREE.Object3D();
  function placeShards(t) {
    for (let i = 0; i < SH; i++) {
      const d = sd[i];
      dummy.position.set(d.x, d.y + Math.sin(t * .4 + d.fl) * .35, d.z);
      dummy.rotation.set(d.ax + t * d.vx, d.ay + t * d.vy, 0);
      dummy.scale.set(d.s, d.s * .42, d.s * .8);
      dummy.updateMatrix(); shards.setMatrixAt(i, dummy.matrix);
    }
    shards.instanceMatrix.needsUpdate = true;
  }

  /* ---- particles ---- */
  const PN = coarse || small ? 1300 : 2600;
  const pg = new THREE.BufferGeometry();
  const pp = new Float32Array(PN * 3), ps = new Float32Array(PN), pph = new Float32Array(PN), pc = new Float32Array(PN * 3);
  const pcols = [[1, .35, .12], [1, .69, .29], [1, .85, .6], [1, .45, .2]];
  for (let i = 0; i < PN; i++) {
    pp[i * 3] = (Math.random() - .5) * 46; pp[i * 3 + 1] = (Math.random() - .5) * 28; pp[i * 3 + 2] = 14 - Math.random() * 100;
    ps[i] = .6 + Math.random() * 1.6; pph[i] = Math.random();
    const c = pcols[(Math.random() * 4) | 0]; pc.set(c, i * 3);
  }
  pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
  pg.setAttribute('aSize', new THREE.BufferAttribute(ps, 1));
  pg.setAttribute('aPh', new THREE.BufferAttribute(pph, 1));
  pg.setAttribute('aCol', new THREE.BufferAttribute(pc, 3));
  const pMat = new THREE.ShaderMaterial({ vertexShader: PART_VS, fragmentShader: PART_FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uTime: { value: 0 }, uPR: { value: 1 } } });
  const points = new THREE.Points(pg, pMat); points.frustumCulled = false; scene.add(points);

  /* ---- state ---- */
  const C = { ...S, travel: 0 };
  const ptr = { x: 0, y: 0, sx: 0, sy: 0 };
  const onPointer = e => { ptr.x = (e.clientX / innerWidth) * 2 - 1; ptr.y = (e.clientY / innerHeight) * 2 - 1; };
  addEventListener('pointermove', onPointer, { passive: true });
  let alive = true, raf = 0;
  let spinY = 0, spinX = 0, time = 0, last = performance.now(), aspect = 1;
  const cA = new THREE.Color(), cB = new THREE.Color(), tA = new THREE.Color(), tB = new THREE.Color();

  function resize() {
    const w = innerWidth, h = innerHeight;
    const pr = Math.min(devicePixelRatio || 1, coarse ? 1.5 : 1.75);
    renderer.setPixelRatio(pr); renderer.setSize(w, h, false);
    camera.aspect = w / h; aspect = w / h; camera.updateProjectionMatrix();
    pMat.uniforms.uPR.value = pr;
  }
  resize(); addEventListener('resize', resize);

  function frame(now) {
    const dt = Math.min((now - last) / 1000, .05); last = now;
    if (!document.hidden) {
      if (!reduced) time += dt;
      const k = 1 - Math.exp(-dt * 4.5);
      for (const key of ['coreX', 'coreY', 'coreScale', 'amp', 'wire', 'rings', 'glow', 'projMix', 'proj', 'spin', 'intro']) C[key] = lerp(C[key], S[key], key === 'proj' ? 1 - Math.exp(-dt * 7) : k);
      const max = document.documentElement.scrollHeight - innerHeight;
      const tr = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
      C.travel = lerp(C.travel, tr, 1 - Math.exp(-dt * 6));
      ptr.sx = lerp(ptr.sx, ptr.x, 1 - Math.exp(-dt * 3)); ptr.sy = lerp(ptr.sy, ptr.y, 1 - Math.exp(-dt * 3));

      /* camera path: straight dive with a gentle S-curve */
      const z = 9 - C.travel * 74;
      camera.position.set(Math.sin(C.travel * Math.PI * 3) * 1.7, Math.cos(C.travel * Math.PI * 2.2) * .8 - .4, z);
      camera.rotation.set(-Math.cos(C.travel * Math.PI * 2.2) * .02 - ptr.sy * .035, -Math.cos(C.travel * Math.PI * 3) * .035 - ptr.sx * .05, Math.sin(C.travel * Math.PI * 2) * .035);

      /* core responsive placement */
      const kx = clamp(aspect / 1.6, 0, 1);
      core.position.x = C.coreX * kx + ptr.sx * .25;
      core.position.y = C.coreY + (1 - kx) * 2.1 - ptr.sy * .18;
      const sc = Math.max(C.coreScale * (.62 + .38 * kx) * clamp(C.intro, 0, 1) , .0001);
      core.scale.setScalar(sc);

      /* colour: base blend → per-project palette */
      const i0 = clamp(Math.floor(C.proj), 0, PALETTE.length - 1), i1 = Math.min(i0 + 1, PALETTE.length - 1), f = clamp(C.proj - i0, 0, 1);
      cA.set(PALETTE[i0][0]).lerp(tA.set(PALETTE[i1][0]), f); cB.set(PALETTE[i0][1]).lerp(tB.set(PALETTE[i1][1]), f);
      cA.lerp(tA.set(BASE[0]), 1 - C.projMix); cB.lerp(tB.set(BASE[1]), 1 - C.projMix);
      bodyMat.uniforms.uA.value.copy(cA); bodyMat.uniforms.uB.value.copy(cB);
      glowMat.color.copy(cA); glowMat.opacity = .5 * C.glow * clamp(C.intro, 0, 1);
      wireMat.color.copy(cB); wireMat.opacity = .38 * C.wire * clamp(C.intro, 0, 1);
      bodyMat.uniforms.uTime.value = time; bodyMat.uniforms.uAmp.value = C.amp * (.4 + .6 * clamp(C.intro, 0, 1));
      pMat.uniforms.uTime.value = time;

      spinY += dt * C.spin; spinX += dt * C.spin * .35;
      body.rotation.set(spinX * .6 + ptr.sy * .25, spinY + ptr.sx * .35, 0);
      wire.rotation.set(-spinX, -spinY * .7, 0);
      ringsGroup.scale.setScalar(.6 + .4 * C.rings);
      rings.forEach((r, i) => { r.spin.rotation.z += dt * r.sp * (reduced ? 0 : 1); r.m.opacity = r.op * C.rings; r.m.color.copy(i === 1 ? cB : cA); });
      placeShards(time);
      renderer.render(scene, camera);
    }
    if (alive) raf = requestAnimationFrame(frame);
  }
  placeShards(0);
  renderer.compile(scene, camera); /* compile shaders now, not during the intro */
  raf = requestAnimationFrame(frame);
  function dispose() {
    alive = false; cancelAnimationFrame(raf);
    removeEventListener('pointermove', onPointer); removeEventListener('resize', resize);
    scene.traverse(o => { if (o.geometry) o.geometry.dispose(); const m = o.material; if (m) (Array.isArray(m) ? m : [m]).forEach(x => x.dispose()); });
    renderer.dispose();
  }
  return { renderer, dispose };
}
