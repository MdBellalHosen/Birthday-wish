/* ============ EDIT THIS PART ============ */
const CONFIG = {
  name: "Anika",                        // her name / nickname
  fullName: "Anika Binte Ali",
  from: "Allen",                        // your name (shown under the letter)
  // each letter of her name -> a word (tap the letters on the page)
  nameWords: ["Adorable", "Natural beauty", "Irreplaceable", "Kind-hearted", "Always mine"],
  birthday: "2026-11-16T00:00:00+06:00",// Dhaka time
  reasons: [
    "Your smile fixes my worst days.",
    "The way you laugh at your own jokes.",
    "You care about people so deeply.",
    "You make ordinary moments feel special.",
    "Your voice is my favourite sound.",
    "You believe in me, even when I don't.",
    "You are beautiful inside and out.",
    "Late-night talks with you never get old.",
    "You're my calm in every storm.",
    "Your hugs feel like home.",
    "You're stronger than you know.",
    "You make me want to be better.",
    "Even your silly moods are lovable.",
    "You turned 'us' into my favourite place.",
    "Every plan feels better with you in it.",
    "Because you are simply, entirely you."
  ],
  letter:
`Happy Birthday, my love.

I wanted to give you something that was made only for you, so I turned the night sky into your birthday card.

Thank you for every laugh, every hard day you made lighter, and every moment that became a memory because you were in it.

I hope this year gives you everything you deserve and more. I'll be right beside you for all of it.`
};
/* ========================================= */

const q = (s) => document.querySelector(s);
const qa = (s) => [...document.querySelectorAll(s)];
const params = new URLSearchParams(location.search);
if (params.get("name")) CONFIG.name = params.get("name").slice(0, 30);
if (params.get("from")) CONFIG.from = params.get("from").slice(0, 30);

qa(".name").forEach((el) => (el.textContent = CONFIG.name));
q("#sign").textContent = "Forever yours, " + CONFIG.from;

/* ---------- starry sky ---------- */
const sky = q("#sky"), sctx = sky.getContext("2d");
let W, H, stars = [], shooters = [];
function sizeSky() {
  W = sky.width = innerWidth; H = sky.height = innerHeight;
  stars = Array.from({ length: Math.round((W * H) / 6500) }, () => ({
    x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + 0.3,
    p: Math.random() * 6.28, s: Math.random() * 0.02 + 0.005,
  }));
}
addEventListener("resize", sizeSky); sizeSky();
function drawSky() {
  sctx.clearRect(0, 0, W, H);
  for (const s of stars) {
    s.p += s.s;
    sctx.globalAlpha = 0.45 + Math.sin(s.p) * 0.45;
    sctx.fillStyle = "#fff";
    sctx.beginPath(); sctx.arc(s.x, s.y, s.r, 0, 6.28); sctx.fill();
  }
  if (Math.random() < 0.004 && shooters.length < 2)
    shooters.push({ x: Math.random() * W, y: Math.random() * H * 0.4, l: 0 });
  shooters = shooters.filter((m) => m.l < 60);
  for (const m of shooters) {
    m.x += 9; m.y += 4; m.l++;
    const g = sctx.createLinearGradient(m.x, m.y, m.x - 90, m.y - 40);
    g.addColorStop(0, "rgba(255,255,255,.9)"); g.addColorStop(1, "rgba(255,255,255,0)");
    sctx.globalAlpha = 1 - m.l / 60; sctx.strokeStyle = g; sctx.lineWidth = 2;
    sctx.beginPath(); sctx.moveTo(m.x, m.y); sctx.lineTo(m.x - 90, m.y - 40); sctx.stroke();
  }
  requestAnimationFrame(drawSky);
}
drawSky();

/* ---------- confetti ---------- */
const fx = q("#fx"), fctx = fx.getContext("2d");
let parts = [], running = false;
function sizeFx() { fx.width = innerWidth; fx.height = innerHeight; }
addEventListener("resize", sizeFx); sizeFx();
const COLORS = ["#ff7eb6", "#ffd98a", "#ffffff", "#c9a7ff", "#7ee8fa"];
function burst(x, y, n = 120) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * 6.28, v = Math.random() * 9 + 3;
    parts.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 5, g: 0.18, life: 140 + Math.random() * 60,
      c: COLORS[(Math.random() * COLORS.length) | 0], sz: Math.random() * 6 + 4,
      heart: Math.random() < 0.3, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
    });
  }
  if (!running) { running = true; stepFx(); }
}
function stepFx() {
  fctx.clearRect(0, 0, fx.width, fx.height);
  parts = parts.filter((p) => p.life > 0 && p.y < fx.height + 20);
  for (const p of parts) {
    p.vy += p.g; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
    fctx.globalAlpha = Math.min(1, p.life / 40);
    fctx.fillStyle = p.c;
    fctx.save(); fctx.translate(p.x, p.y); fctx.rotate(p.rot);
    if (p.heart) { fctx.font = p.sz * 2 + "px serif"; fctx.fillText("♥", -p.sz, p.sz); }
    else fctx.fillRect(-p.sz / 2, -p.sz / 4, p.sz, p.sz / 2);
    fctx.restore();
  }
  if (parts.length) requestAnimationFrame(stepFx); else { running = false; fctx.clearRect(0, 0, fx.width, fx.height); }
}

/* tap anywhere = tiny floating heart */
addEventListener("pointerdown", (e) => {
  const h = document.createElement("div");
  h.className = "fh"; h.textContent = ["♥", "✦", "❤"][(Math.random() * 3) | 0];
  h.style.left = e.clientX - 8 + "px"; h.style.top = e.clientY - 8 + "px";
  h.style.color = COLORS[(Math.random() * 2) | 0];
  document.body.appendChild(h); setTimeout(() => h.remove(), 1600);
});

/* ---------- open ---------- */
q("#openBtn").addEventListener("click", (e) => {
  q("#intro").classList.add("gone");
  setTimeout(() => {
    q("#intro").style.display = "none";
    q("#main").hidden = false;
    scrollTo(0, 0);
    requestAnimationFrame(() => observe());
  }, 800);
  burst(e.clientX, e.clientY, 90);
});

/* reveal panels on scroll + type the letter once */
let typed = false;
function observe() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("show");
      if (en.target.querySelector("#letterText") && !typed) { typed = true; typeLetter(); }
    });
  }, { threshold: 0.35 });
  qa(".panel").forEach((p) => io.observe(p));
}
function typeLetter() {
  const el = q("#letterText"); let i = 0;
  (function t() {
    el.textContent = CONFIG.letter.slice(0, ++i);
    if (i < CONFIG.letter.length) setTimeout(t, 38);
    else { q("#sign").classList.add("show"); burst(innerWidth / 2, innerHeight / 2, 80); }
  })();
}

/* ---------- countdown ---------- */
const target = new Date(CONFIG.birthday).getTime();
function tick() {
  let d = target - Date.now();
  if (d <= 0) {
    q("#countdown").style.display = "none";
    q("#cdLabel").textContent = "today is your day ✦";
    return;
  }
  const S = Math.floor(d / 1000);
  q("#cdD").textContent = Math.floor(S / 86400);
  q("#cdH").textContent = Math.floor((S % 86400) / 3600);
  q("#cdM").textContent = Math.floor((S % 3600) / 60);
  q("#cdS").textContent = S % 60;
}
tick(); setInterval(tick, 1000);

/* ---------- cake ---------- */
const candles = qa(".candle");
const wishMsg = q("#wishMsg"), relight = q("#relight");
candles.forEach((c) => c.addEventListener("click", () => {
  c.classList.add("out");
  if (candles.every((x) => x.classList.contains("out"))) {
    wishMsg.textContent = "Wish made. It's already on its way to you ♥";
    wishMsg.classList.add("done");
    relight.hidden = false;
    const r = q(".cake").getBoundingClientRect();
    burst(r.left + r.width / 2, r.top, 140);
  }
}));
relight.addEventListener("click", () => {
  candles.forEach((c) => c.classList.remove("out"));
  wishMsg.classList.remove("done");
  wishMsg.textContent = "Close your eyes, then tap the flames to blow out the candles";
  relight.hidden = true;
});

/* ---------- name in lights ---------- */
{
  const wrap = q("#letters"), out = q("#letterWord"), seen = new Set();
  [...CONFIG.name].forEach((ch, i) => {
    const b = document.createElement("button");
    b.className = "lt"; b.textContent = ch.toUpperCase();
    b.addEventListener("click", () => {
      b.classList.add("on"); seen.add(i);
      out.textContent = ch.toUpperCase() + " is for " + (CONFIG.nameWords[i] || "wonderful");
      out.classList.remove("pop"); void out.offsetWidth; out.classList.add("pop");
      if (seen.size === CONFIG.name.length) {
        const r = wrap.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2, 120);
        setTimeout(() => (out.textContent = "That's you, " + CONFIG.fullName + " ♥"), 1800);
      }
    });
    wrap.appendChild(b);
  });
}

/* ---------- heart constellation ---------- */
const box = q("#constellation"), svg = q("#lines");
const N = CONFIG.reasons.length;
const pts = Array.from({ length: N }, (_, i) => {
  const t = (i / N) * Math.PI * 2 + 0.2;
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x: 50 + x * 2.7, y: 50 - (y + 2.5) * 2.8 };
});
const found = new Set();
pts.forEach((p, i) => {
  const b = document.createElement("button");
  b.className = "star"; b.style.left = p.x + "%"; b.style.top = p.y + "%";
  b.setAttribute("aria-label", "star " + (i + 1));
  b.addEventListener("click", () => {
    const box = q("#reason");
    box.textContent = CONFIG.reasons[i];
    box.classList.remove("pop"); void box.offsetWidth; box.classList.add("pop");
    if (!found.has(i)) {
      found.add(i); b.classList.add("found");
      q("#count").textContent = found.size + " / " + N + " found";
      [(i + N - 1) % N, (i + 1) % N].forEach((j) => {
        if (found.has(j)) {
          const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
          l.setAttribute("x1", pts[i].x); l.setAttribute("y1", pts[i].y);
          l.setAttribute("x2", pts[j].x); l.setAttribute("y2", pts[j].y);
          svg.appendChild(l);
        }
      });
      if (found.size === N) {
        q("#count").textContent = "You found them all ♥ and there are infinitely more";
        const r = box.getBoundingClientRect();
        burst(innerWidth / 2, r.top, 150);
      }
    }
  });
  box.appendChild(b);
});
