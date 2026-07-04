/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { THEMES as T } from './config/theme';
import { Ic } from './components/Icon';
import { BookCover } from './components/BookCover';

// ─────────────────────────────────────────────
//  GLOBAL STYLES — Premium Japanese aesthetic
// ─────────────────────────────────────────────
const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;0,900;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;700&display=swap');
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

html, body {
  width: 100%;
  height: 100%;
  background: #080C14;
  overflow: hidden;
  font-family: 'Plus Jakarta Sans', 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}

#root {
  width: 100%;
  max-width: 430px;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}

input, textarea {
  -webkit-user-select: auto;
  user-select: auto;
  outline: none;
  font-family: 'Plus Jakarta Sans', 'DM Sans', sans-serif;
}

button {
  font-family: 'Plus Jakarta Sans', 'DM Sans', sans-serif;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.15s ease, background 0.22s ease, box-shadow 0.22s ease;
}

button:active { transform: scale(0.95); opacity: 0.88; }

::-webkit-scrollbar { width: 0; }

.serif {
  font-family: 'Fraunces', 'Noto Serif JP', Georgia, serif !important;
  font-weight: 700 !important;
}
.serif-light {
  font-family: 'Fraunces', 'Noto Serif JP', Georgia, serif !important;
  font-weight: 400 !important;
}

/* ── Core Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(12px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes scaleIn {
  from { transform: scaleX(0); opacity: 0; }
  to   { transform: scaleX(1); opacity: 1; }
}
@keyframes coverFloat {
  0%, 100% { transform: rotate(-2deg) translateY(0px); }
  50%       { transform: rotate(-2deg) translateY(-6px); }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes kanjiGlow {
  0%, 100% { opacity: 0.75; filter: drop-shadow(0 0 16px currentColor); }
  50%       { opacity: 1;   filter: drop-shadow(0 0 36px currentColor) drop-shadow(0 0 64px currentColor); }
}
@keyframes kanjiRise {
  from { opacity: 0; transform: translateY(24px) scale(0.88); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0); }
}
@keyframes titleReveal {
  from { opacity: 0; letter-spacing: 20px; }
  to   { opacity: 1; letter-spacing: 12px; }
}
@keyframes lineExpand {
  from { width: 0; opacity: 0; }
  to   { width: 56px; opacity: 1; }
}

/* ── Sakura petals ── */
@keyframes sakFall {
  0%   { transform: translate(0, -20px) rotate(0deg) scale(0.9);   opacity: 0; }
  8%   { opacity: 1; }
  85%  { opacity: 0.7; }
  100% { transform: translate(var(--sx), 110vh)      rotate(var(--sr)) scale(0.7); opacity: 0; }
}
@keyframes sakSway {
  0%, 100% { margin-left: 0; }
  33%       { margin-left: 18px; }
  66%       { margin-left: -12px; }
}

/* ── Ripple ── */
@keyframes rippleOut {
  from { transform: scale(0); opacity: 0.45; }
  to   { transform: scale(3.5); opacity: 0; }
}

/* ── PREMIUM FRAME ANIMATIONS ── */
@keyframes inkSpin     { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
@keyframes inkSpinRev  { from{transform:rotate(0deg);}to{transform:rotate(-360deg);} }
@keyframes fireDistort {
  0%,100%{border-radius:48% 52% 44% 56%/52% 44% 56% 48%;}
  25%    {border-radius:56% 44% 52% 48%/44% 56% 44% 56%;}
  50%    {border-radius:44% 56% 48% 52%/56% 44% 52% 48%;}
  75%    {border-radius:52% 48% 56% 44%/48% 52% 48% 52%;}
}
@keyframes celestialPulse { 0%,100%{opacity:.5;transform:scale(1);}50%{opacity:1;transform:scale(1.07);} }
@keyframes goldShimmer    { 0%{background-position:-300% center;}100%{background-position:300% center;} }
@keyframes jadePulse      { 0%,100%{box-shadow:0 0 12px #34D39960,0 0 24px #34D39930;}50%{box-shadow:0 0 28px #34D399AA,0 0 56px #34D39960;} }
@keyframes sakuraSpin     { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
@keyframes mythicShine    { 0%{background-position:-300% center;}100%{background-position:300% center;} }

.title-legendary {
  background: linear-gradient(90deg,#FBBF24,#FFFBEB,#F59E0B,#FFFBEB,#FBBF24);
  background-size: 300% auto; color: transparent;
  -webkit-background-clip: text; background-clip: text;
  animation: mythicShine 3.5s linear infinite;
}
.title-mythic {
  background: linear-gradient(90deg,#C084FC,#F472B6,#fff,#F472B6,#C084FC);
  background-size: 300% auto; color: transparent;
  -webkit-background-clip: text; background-clip: text;
  animation: mythicShine 2.5s linear infinite;
  filter: drop-shadow(0 0 8px rgba(244,114,182,.7));
}
  .banner-shimmer {
  background-size: 300% 100%;
  animation: goldShimmer 5s linear infinite;
}

/* ── Nav tab indicator ── */
@keyframes tabPop {
  0%   { transform: scaleX(0); }
  60%  { transform: scaleX(1.15); }
  100% { transform: scaleX(1); }
}

@keyframes spin { 
  to { transform: rotate(360deg); } 
}

@keyframes staggerUp { 
  from { opacity: 0; transform: translateY(14px); } 
  to { opacity: 1; transform: translateY(0); } 
}

@keyframes dotPop { 
  0% { transform: scale(0); } 
  60% { transform: scale(1.3); } 
  100% { transform: scale(1); } 
}

.fu  { animation: fadeUp  0.48s cubic-bezier(0.22, 1, 0.36, 1) both; }
.fi  { animation: fadeIn  0.32s ease both; }
.fu1 { animation-delay: 0.05s; }
.fu2 { animation-delay: 0.12s; }
.fu3 { animation-delay: 0.20s; }
.fu4 { animation-delay: 0.28s; }
.fu5 { animation-delay: 0.36s; }
.su  { animation: staggerUp 0.44s cubic-bezier(0.22, 1, 0.36, 1) both; }
.stagger-item { animation: staggerUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }

/* ── NEW: Coin burst & level-up animations ── */
@keyframes coinFly {
  0%   { transform: translate(0, 0) scale(0.6) rotate(0deg); opacity: 0; }
  15%  { opacity: 1; }
  80%  { opacity: 0.9; }
  100% { transform: translate(var(--cx, 0px), -160px) scale(1.1) rotate(var(--cr, 20deg)); opacity: 0; }
}
@keyframes coinLabel {
  0%   { opacity: 0; transform: translateX(-50%) translateY(16px) scale(0.7); }
  25%  { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1.05); }
  75%  { opacity: 1; transform: translateX(-50%) translateY(-8px) scale(1); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-28px) scale(0.85); }
}
@keyframes levelNumPop {
  0%   { opacity: 0; transform: scale(0.4); }
  60%  { opacity: 1; transform: scale(1.15); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes levelUpGlow {
  0%, 100% { box-shadow: 0 0 20px currentColor; }
  50%       { box-shadow: 0 0 60px currentColor, 0 0 100px currentColor; }
}
@keyframes achieveSlideUp {
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes xpFill {
  from { width: 0; }
}
@keyframes missionComplete {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.04); }
  100% { transform: scale(1); }
}
@keyframes streakPulse {
  0%, 100% { filter: drop-shadow(0 0 4px #FBBF24); }
  50%       { filter: drop-shadow(0 0 12px #FBBF24) drop-shadow(0 0 24px #F59E0B); }
}

/* ── Marcos colombianos ── */
@keyframes sparkleFlash {
  0%, 100% { opacity: 0; transform: scale(0.2) rotate(0deg); }
  50%       { opacity: 1; transform: scale(1) rotate(90deg); }
}
@keyframes petalPulse {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; }
  50%       { transform: scale(1.12) rotate(8deg); opacity: 1; }
}
@keyframes emberRise {
  0%   { transform: translate(-50%, 0) scale(0.7); opacity: 0; }
  25%  { opacity: 1; }
  100% { transform: translate(-50%, -26px) scale(0.2); opacity: 0; }
}
@keyframes steamRise {
  0%   { transform: translate(-50%, 0) scaleY(0.7); opacity: 0; }
  30%  { opacity: 0.75; }
  100% { transform: translate(-50%, -24px) scaleY(1.4); opacity: 0; }
}
@keyframes shootingStar {
  0%, 70%, 100% { opacity: 0; transform: translate(-26px,-26px) scale(0.4); }
  72%  { opacity: 1; }
  88%  { opacity: 0; transform: translate(26px,26px) scale(1.2); }
}
@keyframes mariposaVuelo {
  0%   { transform: translate(0, 8vh) rotate(-8deg); opacity: 0; }
  10%  { opacity: 0.4; }
  25%  { transform: translate(8vw, -12vh) rotate(10deg); }
  50%  { transform: translate(-6vw, -45vh) rotate(-12deg); opacity: 0.45; }
  75%  { transform: translate(10vw, -75vh) rotate(8deg); }
  90%  { opacity: 0.3; }
  100% { transform: translate(-4vw, -110vh) rotate(-6deg); opacity: 0; }
}
@keyframes mariposaAleteo {
  0%, 100% { transform: scaleX(1); }
  50%      { transform: scaleX(0.45); }
}
@keyframes sabioPop {
  0%   { opacity: 0; transform: translateX(-50%) translateY(14px) scale(0.85); }
  15%  { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  85%  { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.95); }
}
@keyframes streakFlameGrow {
  0%   { transform: scale(0) rotate(-12deg); opacity: 0; }
  45%  { transform: scale(1.25) rotate(6deg); opacity: 1; }
  65%  { transform: scale(0.92) rotate(-3deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
@keyframes streakNumPop {
  0%   { transform: scale(0.2); opacity: 0; }
  50%  { transform: scale(1.3); opacity: 1; }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}
@keyframes streakSpark {
  0%   { transform: translate(0,0) scale(1); opacity: 1; }
  100% { transform: translate(var(--spx), var(--spy)) scale(0); opacity: 0; }
}
@keyframes flameFlicker {
  0%, 100% { transform: scale(1) rotate(-1deg); filter: drop-shadow(0 0 20px #F59E0B) drop-shadow(0 0 40px #EF4444); }
  50%       { transform: scale(1.06) rotate(1deg); filter: drop-shadow(0 0 30px #FBBF24) drop-shadow(0 0 60px #F59E0B); }
}
@keyframes parceroBreath { 0%,100%{transform:scale(0.97) translateY(0px);} 50%{transform:scale(1.03) translateY(-2px);} }
@keyframes parceroWave { 0%{transform:rotate(0deg);} 30%{transform:rotate(-22deg);} 70%{transform:rotate(13deg);} 100%{transform:rotate(0deg);} }
@keyframes sparkRise { 0%{transform:translate(0,0) scale(1);opacity:1;} 100%{transform:translate(var(--sx),var(--sy)) scale(0);opacity:0;} }
@keyframes starTwinkle { 0%,100%{opacity:0.12;} 50%{opacity:0.38;} }
@keyframes zzz { 0%{opacity:0;transform:translate(0,0) scale(0.5);} 30%{opacity:1;} 100%{opacity:0;transform:translate(8px,-22px) scale(1.1);} }
@keyframes mordorGlow { 0%,100%{opacity:0.35;} 50%{opacity:0.68;} }
@keyframes logFlyToFire { 0%{transform:translate(0,0) rotate(0deg);opacity:1;} 60%{opacity:1;} 100%{transform:translate(var(--tx),var(--ty)) rotate(-55deg);opacity:0;} }
@keyframes ashSmoke { 0%{opacity:0;transform:translateX(-50%) scaleX(1) translateY(0);} 30%{opacity:0.35;} 100%{opacity:0;transform:translateX(-50%) scaleX(1.8) translateY(-28px);} }
@keyframes cloudDrift { 0%,100%{transform:translateX(0px);} 50%{transform:translateX(10px);} }
@keyframes ctaPulse { 0%,85%,100%{transform:scale(1);}90%{transform:scale(1.015);}95%{transform:scale(1.008);} }
@keyframes logGlow { 0%,100%{opacity:0.6;}50%{opacity:1;} }
@keyframes breathe { 0%,100%{transform:translateY(0px);}50%{transform:translateY(-2px);} }
`;


// ─────────────────────────────────────────────
//  SAKURA FALLING
// ─────────────────────────────────────────────
const SAKURA_CONFIG = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  left:  `${7 + (i * 13.4) % 85}%`,
  size:  2.4 + (i % 3) * 1.1,
  dur:   `${18 + (i % 4) * 3.2}s`,
  delay: `${(i * 2.1) % 12}s`,
  sx:    `${(i % 2 ? 1 : -1) * (9 + (i % 4) * 7)}px`,
  sr:    `${(i % 2 ? 1 : -1) * (75 + (i % 5) * 44)}deg`,
  op:    0.038 + (i % 4) * 0.016,
}));

// ─────────────────────────────────────────────
//  TEXTURA DE MARCA — grano de piedra + petroglifos tenues
// ─────────────────────────────────────────────
const PETROGLIFOS_MARCA = [
  "M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10zm0 4a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  "M12 4V2M12 22v-2M4 12H2M22 12h-2M6.34 6.34L4.93 4.93M17.66 17.66l1.41 1.41M6.34 17.66l-1.41 1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  "M12 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z M12 5v12 M12 8H8V5 M12 8h4V5 M12 15H8v3 M12 15h4v3 M12 17q0 4 4 5",
];
// ─────────────────────────────────────────────
//  LOGO / ISOTIPO DE PANKEY — la rana-vueltiao en medallón Tumbaga
// ─────────────────────────────────────────────
function PankeyLogo({ size = 64, C, glow = true }) {
  const oro = (C && C.accent) || '#D4AF37';
  const piedra = (C && C.bgAlt) || '#1A1715';
  // 16 puntos de greca alrededor
  const dots = Array.from({ length: 16 }, (_, i) => {
    const a = i * (Math.PI * 2 / 16);
    return { cx: 50 + 38 * Math.cos(a), cy: 50 + 38 * Math.sin(a) };
  });
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
      style={{ filter: glow ? `drop-shadow(0 0 ${size * 0.12}px ${oro}70)` : 'none', display: 'block' }}>
      <circle cx="50" cy="50" r="45" fill={piedra} stroke={oro} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="33" fill="none" stroke={oro} strokeWidth="0.6" strokeOpacity="0.5" />
      {dots.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r="1.4" fill={oro} />)}
      <g transform="translate(50,52) scale(3.4) translate(-12,-12)">
        <g fill="none" stroke={oro} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 15.5c0-2 2.7-3.2 6-3.2s6 1.2 6 3.2c0 2.3-2.7 3.9-6 3.9s-6-1.6-6-3.9z M7 11a2.4 2.4 0 1 0 0 .01z M17 11a2.4 2.4 0 1 0 0 .01z M10.4 16c.8.5 2.4.5 3.2 0 M3.8 6.4c0-.7 3.7-1.2 8.2-1.2s8.2.5 8.2 1.2-3.7 1.2-8.2 1.2S3.8 7.1 3.8 6.4z M8.4 5.8c0-1.7 1.6-2.9 3.6-2.9s3.6 1.2 3.6 2.9" />
        </g>
      </g>
    </svg>
  );
}
function TexturaFondo({ C }) {
  // Grano sutil generado como SVG turbulence (data URI), muy tenue
  const grano = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`;

  const figuras = [
    { p: 0, top: '6%',  left: '-6%',  size: 200, rot: -8 },
    { p: 1, top: '38%', left: '70%',  size: 240, rot: 12 },
    { p: 2, top: '72%', left: '-8%',  size: 180, rot: 5 },
    { p: 0, top: '85%', left: '68%',  size: 160, rot: -14 },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Petroglifos tenues */}
      {figuras.map((f, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: 'absolute', top: f.top, left: f.left, width: f.size, height: f.size,
            opacity: 0.025, transform: `rotate(${f.rot}deg)` }}>
          <path d={PETROGLIFOS_MARCA[f.p]} />
        </svg>
      ))}
      {/* Grano de piedra */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: grano, backgroundRepeat: 'repeat',
        opacity: 0.04, mixBlendMode: 'overlay' }} />
      {/* Viñeta sutil para dar profundidad a los bordes */}
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 35%, transparent 55%, rgba(0,0,0,0.35) 100%)` }} />
    </div>
  );
}

function SakuraFalling() {
  return null;
}
// ─────────────────────────────────────────────
//  PkIc — Iconos Originales Premium (Sin Emojis)
// ─────────────────────────────────────────────
const FILLED_ICONS = new Set(['ryo', 'flame', 'star', 'crystal', 'empanada', 'sombrero']);
// Nuevos iconos de trazo: condor, tiple, maracas, mochila (van con stroke, no fill)

function PkIc({ n, s = 20, c = 'currentColor', sw }) {
  const P = {
    // ── BÁSICOS DE NAVEGACIÓN ──
    home: 'M4 20V13M20 20V13M2 10.5h20M6.5 10.5V7a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v3.5M8 10.5V8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2M6.5 13.5h11M6.5 20h11',
    msg: 'M6 3.5C5.17 3.5 4.5 4.17 4.5 5V6h15V5c0-.83-.67-1.5-1.5-1.5H6zM4.5 7.5v9.5c0 .83.67 1.5 1.5 1.5h6.5M15.5 13.5l4.2 4.2M17.5 11.5a2 2 0 1 1 2.83 2.83L13 21.5H11v-2L17.5 11.5z',
    timer: 'M6.5 2h11M6.5 22h11M7 2v1.5l4.2 5 .8.8.8-.8 4.2-5V2M7 22v-1.5l4.2-5 .8-.8.8.8 4.2 5V22M7.5 22h9',
    book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM4 19.5A2.5 2.5 0 0 0 6.5 22H20M8.5 7.5h7M8.5 10.5h4.5',
    settings: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z',
    
    // ── IDENTIDAD COLOMBIANA PREMIUM (FILLED) ──
    empanada: 'M3 12.5c0-5 4-9 9-9s9 4 9 9c0 1.5-1.2 2.7-2.7 2.7-.9 0-1.7-.4-2.2-1.1-.5.7-1.3 1.1-2.2 1.1s-1.7-.4-2.2-1.1c-.5.7-1.3 1.1-2.2 1.1s-1.7-.4-2.2-1.1c-.5.7-1.3 1.1-2.2 1.1C4.2 15.2 3 14 3 12.5z',
    sabio: 'M12 2l1.5 3h-3z M18 4l-1 3.5-2-1.5z M6 4l1 3.5 2-1.5z M21 10l-3.5 1 1.5 2z M3 10l3.5 1-1.5 2z M12 7a5 5 0 0 0-5 5v3c0 2.8 2.2 5 5 5s5-2.2 5-5v-3a5 5 0 0 0-5-5zm-2 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-2 5c-1 0-2-.5-2-.5l.5-1s.5.5 1.5.5 1.5-.5 1.5-.5l.5 1s-1 .5-2 .5z',
    mochila: 'M7.5 9h9l1 11.5a1 1 0 0 1-1 1.1H7.5a1 1 0 0 1-1-1.1L7.5 9z M8 9c0-2.5 1.8-4.5 4-4.5s4 2 4 4.5 M9.5 12.5l1.5 2 1-1.5 1 1.5 1.5-2 M8 16h8',
    sombrero: 'M12 4c-1 0-1.8 2-1.8 4.5 0 .4 0 .8.1 1.1C7.5 10 5 11 5 12.3c0 1 1.5 1.7 3.8 2 .9.1 2 .2 3.2.2s2.3-.1 3.2-.2c2.3-.3 3.8-1 3.8-2 0-1.3-2.5-2.3-5.3-2.7.1-.3.1-.7.1-1.1C13.8 6 13 4 12 4z M3 13.5c0 2 4 3.5 9 3.5s9-1.5 9-3.5',
    condor: 'M2 9c3-1 5 0 6 2 1-3 2.5-5 4-5s3 2 4 5c1-2 3-3 6-2-2 1.5-3 3-3.5 5l-2-1.5L13 14l-1-1.5-1 1.5-3.5-1.5L5.5 14C5 12 4 10.5 2 9z M12 14v6 M10 20h4',
    tiple: 'M9 2c1 0 1.5 1 1.5 2.5L10 11c2 1 3 2.8 3 4.8C13 19 11 21 8.5 21S4 19 4 15.8c0-2 1-3.8 3-4.8l-.5-6.5C6.5 3 7 2 8 2h1z M8.5 13.5a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6z M14 4l5 2-5 2',
    maracas: 'M6 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M8.2 11.8L11 19 M18 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M15.8 11.8L13 19 M5 9h2 M5.7 7.5l1.4 1.4 M17 9h2 M16.9 8.9l1.4-1.4',
    pergamino: 'M6 3h9a3 3 0 0 1 3 3v11 M6 3a2 2 0 0 0-2 2v1h2 M6 3a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1h-2 M9 8h6 M9 11h6 M9 14h4',
    solandino: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2 M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
    
// 🐸 RANA DORADA CON SOMBRERO VUELTIAO — la mascota de Pankey
    rana: 'M6 15.5c0-2 2.7-3.2 6-3.2s6 1.2 6 3.2c0 2.3-2.7 3.9-6 3.9s-6-1.6-6-3.9z M7 11a2.4 2.4 0 1 0 0 .01z M17 11a2.4 2.4 0 1 0 0 .01z M10.4 16c.8.5 2.4.5 3.2 0 M3.8 6.4c0-.7 3.7-1.2 8.2-1.2s8.2.5 8.2 1.2-3.7 1.2-8.2 1.2S3.8 7.1 3.8 6.4z M8.4 5.8c0-1.7 1.6-2.9 3.6-2.9s3.6 1.2 3.6 2.9',
    // 🐸 RANA DORADA — rediseñada limpia (vista de frente)
    rana: 'M5 9.5C5 6.5 8 4.5 12 4.5s7 2 7 5c0 1.3-.5 2.5-1.4 3.4 1.1.5 2 1.4 2.6 2.6.3.6-.1 1.3-.8 1.3-.5 0-.9-.3-1.1-.7-.6-1.1-1.8-1.8-3.1-1.8H9.8c-1.3 0-2.5.7-3.1 1.8-.2.4-.6.7-1.1.7-.7 0-1.1-.7-.8-1.3.6-1.2 1.5-2.1 2.6-2.6C6.5 12 5 11 5 9.5z M8.5 6.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6z M15.5 6.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6z M9.5 13.5c.8.7 4.2.7 5 0',
    eyeShineL: '', // (placeholder, no se usa)
    // ── NUEVOS ÍCONOS DE UI & TEMAS ──
    coffee: 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z M6 1v3M10 1v3M14 1v3',
    butterfly: 'M12 12c-3-4-8-6-10-2s4 8 10 10c6-2 12-6 10-10s-7-2-10 2z M12 2v10',
    wave: 'M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0',
    leaf: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z M12 2v20 M12 12l5-5 M12 16l4-4 M12 8l-4 4',
    mountain: 'M2 20L12 4l10 16H2z M12 4l3 6H9l3-6z',
    flower: 'M12 22v-6 M12 16a4 4 0 1 0-4-4 4 4 0 1 0 4-4 4 4 0 1 0 4 4 4 4 0 1 0-4 4z',
    swords: 'M5 4l8 9 M5 4H3v2l9 8 M19 4l-5 5.5 M19 4h2v2l-3.5 3 M9 15l-4 4 M5 17v2h2l3-3 M15 15l4 4 M19 17v2h-2l-3-3',
    eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    scroll: 'M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4H4z M4 8h16M4 16h16',
    frame: 'M4 4h16v16H4z M8 8h8v8H8z',
    landscape: 'M4 4h16v16H4z M4 16l4-4 4 4 4-2 4 4 M16 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',

    // ── UTILIDADES ──
    bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
    check: 'M20 6L9 17l-5-5', x: 'M18 6L6 18M6 6l12 12', left: 'M19 12H5M12 19l-7-7 7-7', right: 'M5 12h14M12 5l7 7-7 7',
    play: 'M5 3l14 9-14 9V3z', pause: 'M6 4h4v16H6zM14 4h4v16h-4z',
    refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
    icfes: 'M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12.5v4c0 1.93 2.69 3.5 6 3.5s6-1.57 6-3.5v-4',
    people: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    snowflake: 'M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07L19.07 4.93',
  };

  const d = P[n];
  if (!d) return <Ic n={n} s={s} c={c} />;
  
  const isFilled = FILLED_ICONS.has(n);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24"
      fill={isFilled ? c : 'none'}
      stroke={isFilled ? 'none' : c}
      strokeWidth={isFilled ? 0 : (sw || 1.7)}  // 🔥 ¡AQUÍ ESTÁ LA MAGIA DEL GROSOR!
      strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: 'block' }}>
      <path d={d} />
    </svg>
  );
}
// ─────────────────────────────────────────────
//  GENRE PALETTE
// ─────────────────────────────────────────────
const GENRE_PALETTE_OVERRIDE = {
  'Ficción':       { from:'#0D0A1E', to:'#1A0E3C', spine:'#8B5CF6', text:'#EDE9FF' },
  'Romance':       { from:'#1A0614', to:'#3D0A28', spine:'#F472B6', text:'#FFE4F0' },
  'Misterio':      { from:'#060D18', to:'#0D1E38', spine:'#38BDF8', text:'#E0F6FF' },
  'Fantasía':      { from:'#0C0A00', to:'#261C00', spine:'#FBBF24', text:'#FFF8E0' },
  'Terror':        { from:'#0A0000', to:'#220000', spine:'#EF4444', text:'#FFE0E0' },
  'Ciencia':       { from:'#001A20', to:'#003344', spine:'#22D3EE', text:'#E0FFFE' },
  'Clásico':       { from:'#1A1000', to:'#2E1E00', spine:'#D97706', text:'#FFF4DC' },
  'Historia':      { from:'#0E0C00', to:'#201800', spine:'#B45309', text:'#FFF0D0' },
  'Manga':         { from:'#0C0C0C', to:'#1A1A1A', spine:'#F1F5F9', text:'#F8FAFC' },
  'Cómic':         { from:'#1A0000', to:'#2C0A14', spine:'#EF4444', text:'#FFF0F0' },
  'Novela Ligera': { from:'#0A0A1A', to:'#18182E', spine:'#A78BFA', text:'#EDE9FF' },
  'Poesía':        { from:'#0A100E', to:'#162420', spine:'#34D399', text:'#ECFDF5' },
  'Thriller':      { from:'#0A0A00', to:'#1C1C08', spine:'#EAB308', text:'#FEFCE8' },
  'Biografía':     { from:'#100008', to:'#220012', spine:'#F9A8D4', text:'#FFF0F8' },
  'Aventura':      { from:'#000E1A', to:'#001E38', spine:'#60A5FA', text:'#EFF6FF' },
  'Autoayuda':     { from:'#061206', to:'#0E2210', spine:'#4ADE80', text:'#F0FDF4' },
  'default':       { from:'#0C080E', to:'#1E1026', spine:'#C084FC', text:'#F5F0FF' },
};
const getPalette = (genre) => GENRE_PALETTE_OVERRIDE[genre] || GENRE_PALETTE_OVERRIDE.default;

// ─────────────────────────────────────────────
//  FIREBASE
// ─────────────────────────────────────────────
const injectFirebase = () => {
  if (document.getElementById('firebase-init')) return;
  const s = document.createElement('script');
  s.id = 'firebase-init';
  s.type = 'module';
  s.innerHTML = `
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getDatabase, ref, set, get, onValue, update, push, onDisconnect }
      from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
    import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider }
      from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
    const cfg = {
      apiKey: "AIzaSyDf308JcBu-8eXBW2OpmST-MK0gCD9lVPs",
      authDomain: "leemos-a-v.firebaseapp.com",
      databaseURL: "https://leemos-a-v-default-rtdb.firebaseio.com",
      projectId: "leemos-a-v",
      storageBucket: "leemos-a-v.firebasestorage.app",
      messagingSenderId: "519086900953",
      appId: "1:519086900953:web:8dc1a5ca17ae699cd420c8"
    };
    try {
      const app = initializeApp(cfg);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      window.__FB = { db: getDatabase(app), ref, set, get, onValue, update, push, onDisconnect, auth, provider, signInWithRedirect, getRedirectResult };
      window.__FB_READY = true;
    } catch(e) { 
      window.__FB_READY = false; 
      alert("Error interno de Firebase: " + e.message);
    }
  `;
  document.head.appendChild(s);
};

// ─────────────────────────────────────────────
//  MOTOR SENSORIAL PREMIUM v2 — Percusión y cuerda colombiana
//  (sintetizado, liviano, con variación natural + ambientación)
// ─────────────────────────────────────────────
const FX = {
  ctx: null,
  ambient: { audio: null, key: null, enabled: false },

  init: function() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx?.state === 'suspended') this.ctx.resume();
  },

  // Pequeña variación aleatoria para que no suene robótico (±semitonos suaves)
  _vary: function(base, cents = 30) {
    const factor = Math.pow(2, ((Math.random() * 2 - 1) * cents) / 1200);
    return base * factor;
  },

  // ── PRIMITIVA: cuerda pulsada (tiple / arpa) ──
  pluck: function(freq, vol = 0.12, dur = 1.6, type = 'sawtooth') {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    filter.type = 'lowpass';
    filter.Q.value = 1.4;
    filter.frequency.setValueAtTime(freq * 6, t);
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.1, 200), t + 0.25);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(filter); filter.connect(gain); gain.connect(this.ctx.destination);
    osc.start(t); osc.stop(t + dur);
  },

  // ── PRIMITIVA: golpe de tambor (membrana: tambora / alegre / llamador) ──
  drum: function(startFreq = 150, endFreq = 55, vol = 0.3, dur = 0.18) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(t); osc.stop(t + dur);
  },

  // ── PRIMITIVA: shaker / maracas / guacharaca (ruido filtrado) ──
  shaker: function(vol = 0.12, dur = 0.09, bright = 6000) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const bufLen = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, bufLen, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = this._vary(bright, 20);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(hp); hp.connect(gain); gain.connect(this.ctx.destination);
    src.start(t); src.stop(t + dur);
  },

  play: function(sound) {
    try {
      this.init();
      if (!this.ctx) return;

      switch (sound) {
        // Toque de tarjetas: tambor alegre seco y sutil
        case 'tap':
          this.drum(this._vary(170), 70, 0.12, 0.12);
          break;

        // Navegación inferior: golpe un poco más redondo + shaker mínimo
        case 'nav':
          this.drum(this._vary(140), 60, 0.16, 0.15);
          this.shaker(0.05, 0.06, 7000);
          break;

        // Moneda/empanada: guacharaca/maracas que suena a plata
        case 'coin': {
          this.shaker(0.12, 0.07, 5500);
          setTimeout(() => this.shaker(0.10, 0.06, 6500), 70);
          setTimeout(() => this.shaker(0.08, 0.05, 7500), 130);
          break;
        }

        // Acierto: acorde alegre ascendente de tiple
        case 'success': {
          const root = this._vary(523.25, 15); // Do
          [1, 1.26, 1.5, 2].forEach((mult, i) => {
            setTimeout(() => this.pluck(root * mult, 0.11, 1.4, 'sawtooth'), i * 55);
          });
          break;
        }

        // Error: tambora grave y apagada (un "pum" seco, nunca estridente)
        case 'error': {
          this.drum(120, 45, 0.28, 0.30);
          break;
        }

        // Subir de nivel: fanfarria festiva tipo gaita
        case 'levelUp': {
          const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];
          notes.forEach((f, i) => {
            setTimeout(() => this.pluck(this._vary(f, 8), 0.13, 2.2, 'triangle'), i * 65);
          });
          setTimeout(() => this.drum(180, 60, 0.3, 0.25), 0);
          break;
        }

        // Duelo: tambores de tensión que suben
        case 'duel': {
          this.drum(160, 55, 0.32, 0.2);
          setTimeout(() => this.drum(160, 55, 0.32, 0.2), 220);
          setTimeout(() => this.drum(200, 70, 0.34, 0.25), 440);
          break;
        }

        // Bienvenida: amanecer en el páramo (gaita suave que florece)
        case 'welcome': {
          const notes = [392.0, 523.25, 659.25, 783.99]; // Sol-Do-Mi-Sol, abierto y cálido
          notes.forEach((f, i) => {
            setTimeout(() => this.pluck(this._vary(f, 6), 0.10, 2.6, 'triangle'), i * 130);
          });
          setTimeout(() => this.shaker(0.05, 0.2, 4000), 200); // brisa
          break;
        }

        // Conjuro: el Sabio prepara el simulacro (místico, ascendente, etéreo)
        case 'conjure': {
          const base = this._vary(220, 10);
          [1, 1.5, 2, 2.5, 3].forEach((mult, i) => {
            setTimeout(() => this.pluck(base * mult, 0.07, 2.0, 'sine'), i * 110);
          });
          setTimeout(() => this.shaker(0.06, 0.5, 8000), 0); // shimmer de fondo
          break;
        }

        // Apertura de duelo: redoble de tambora que arranca la pelea
        case 'duelStart': {
          for (let i = 0; i < 5; i++) {
            setTimeout(() => this.drum(this._vary(170), 60, 0.25, 0.12), i * 90);
          }
          setTimeout(() => { this.drum(120, 45, 0.4, 0.4); this.shaker(0.12, 0.3, 5000); }, 5 * 90 + 60);
          break;
        }

        default:
          this.drum(this._vary(160), 65, 0.12, 0.12);
      }
    } catch (e) {}
  },

  vibrate: function(type) {
    if (!window.navigator || !window.navigator.vibrate) return;
    try {
      if (type === 'light')   window.navigator.vibrate(40);
      if (type === 'medium')  window.navigator.vibrate(70);
      if (type === 'success') window.navigator.vibrate([40, 60, 50]);
      if (type === 'error')   window.navigator.vibrate([80, 50, 100]);
      if (type === 'heavy')   window.navigator.vibrate([60, 50, 80, 50, 120]);
    } catch (e) {}
  },

  // ── AMBIENTACIÓN DE FONDO (audios externos en loop, opcional) ──
  // Pega tus links de audio (de bancos libres tipo Freesound) en AMBIENT_TRACKS.
  setAmbient: function(themeKey, tracksMap) {
    const url = tracksMap?.[themeKey] || null;
    // Si está apagado o no hay pista para este tema, silencio
    if (!this.ambient.enabled || !url) {
      if (this.ambient.audio) { try { this.ambient.audio.pause(); } catch (e) {} }
      this.ambient.key = themeKey;
      return;
    }
    // Si ya suena la misma pista, no reiniciar
    if (this.ambient.key === themeKey && this.ambient.audio && !this.ambient.audio.paused) return;
    if (this.ambient.audio) { try { this.ambient.audio.pause(); } catch (e) {} }
    const a = new Audio(url);
    a.loop = true;
    a.volume = 0.18; // bajito, de fondo
    a.play().catch(() => {}); // si el navegador bloquea hasta interacción, no truena
    this.ambient.audio = a;
    this.ambient.key = themeKey;
  },

  toggleAmbient: function(on, themeKey, tracksMap) {
    this.ambient.enabled = on;
    if (on) this.setAmbient(themeKey, tracksMap);
    else if (this.ambient.audio) { try { this.ambient.audio.pause(); } catch (e) {} }
  },
};

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
const FB    = () => window.__FB;
const fbOK  = () => !!window.__FB_READY && !!window.__FB;
const SK    = 'leemos_v9';
const save  = (d) => { try { localStorage.setItem(SK, JSON.stringify(d)); } catch(e){} };
const load  = () => { try { const s = localStorage.getItem(SK); return s ? JSON.parse(s) : null; } catch(e){ return null; } };
const todayStr = () => new Date().toDateString();

// IDs de los objetos que brillan en la vitrina del Inicio (los más vistosos)
const DESTACADOS_IDS = ['f_koi', 'b_void', 't_kami', 'f_celestial', 'b_cosmos'];
// ─────────────────────────────────────────────
//  PISTAS DE AMBIENTACIÓN POR TEMA
//  Pega aquí los links de audio (loops de bancos libres como Freesound).
//  Déjalo en null por ahora; cuando tengas los audios, reemplaza el null
//  por el link directo al .mp3/.ogg y se activará solo.
// ─────────────────────────────────────────────
const AMBIENT_TRACKS = {
  rupestre_dark: null, // grillos de noche + río lejano
  aizome_dark:   null, // olas suaves (Caribe)
  slate_dark:    null, // selva amazónica
  sakura_dark:   null, // campo / Macondo
  washi_light:   null, // páramo / viento suave
  slate_light:   null, // día tranquilo (Valle)
};
// ─────────────────────────────────────────────
//  MOTOR DE DUELOS 1v1 EN VIVO (Firebase)
// ─────────────────────────────────────────────
const DuelFB = {
  // Crea la sala y descuenta la apuesta al retador. Devuelve el duelId.
  crear: async ({ from, to, wager, config }) => {
    if (!fbOK()) throw new Error('Sin conexión');
    const duelId = `${from.code}_${to.code}_${Date.now()}`;
    const sala = {
      id: duelId, status: 'pending', ts: Date.now(),
      fromCode: from.code, fromName: from.name || 'Retador', fromPhoto: from.photo || null,
      toCode: to.code,     toName: to.name || 'Rival',       toPhoto: to.photo || null,
      wager: wager || 0,
      config: config || { count: 5, subjects: [] },
      questions: null,
      scoreRetador: 0, scoreRetado: 0,
      finishedRetador: false, finishedRetado: false,
    };
    // Sala principal + punteros livianos para cada jugador (para escucha rápida)
    await FB().set(FB().ref(FB().db, `duelRooms/${duelId}`), sala);
    await FB().update(FB().ref(FB().db, `duels/${to.code}/${duelId}`),   { id: duelId, status: 'pending', fromName: sala.fromName, wager: sala.wager, ts: sala.ts });
    await FB().update(FB().ref(FB().db, `duels/${from.code}/${duelId}`), { id: duelId, status: 'pending', toName: sala.toName,   wager: sala.wager, ts: sala.ts });
    return duelId;
  },

  // El retado acepta. (Las preguntas las escribe el retador, no aquí.)
  aceptar: async (duelId, retadoCode, retadorCode) => {
    if (!fbOK()) return;
    await FB().update(FB().ref(FB().db, `duelRooms/${duelId}`), { status: 'accepted' });
    await FB().update(FB().ref(FB().db, `duels/${retadoCode}/${duelId}`),  { status: 'accepted' });
    await FB().update(FB().ref(FB().db, `duels/${retadorCode}/${duelId}`), { status: 'accepted' });
  },

  // El retador sube las preguntas y arranca el duelo.
  iniciarConPreguntas: async (duelId, questions, retadorCode, retadoCode) => {
    if (!fbOK()) return;
    await FB().update(FB().ref(FB().db, `duelRooms/${duelId}`), { questions, status: 'active' });
    await FB().update(FB().ref(FB().db, `duels/${retadoCode}/${duelId}`),  { status: 'active' });
    await FB().update(FB().ref(FB().db, `duels/${retadorCode}/${duelId}`), { status: 'active' });
  },

  // Actualiza el puntaje en vivo (soyRetador define qué campo se escribe).
  actualizarScore: async (duelId, soyRetador, score) => {
    if (!fbOK()) return;
    await FB().update(FB().ref(FB().db, `duelRooms/${duelId}`),
      soyRetador ? { scoreRetador: score } : { scoreRetado: score });
  },

  // Marca que terminaste tu lado.
  terminar: async (duelId, soyRetador, scoreFinal) => {
    if (!fbOK()) return;
    await FB().update(FB().ref(FB().db, `duelRooms/${duelId}`),
      soyRetador
        ? { scoreRetador: scoreFinal, finishedRetador: true }
        : { scoreRetado: scoreFinal, finishedRetado: true });
  },

  // El retado rechaza: se cancela y hay que devolver apuestas (lo hace el componente).
  rechazar: async (duelId, retadoCode, retadorCode) => {
    if (!fbOK()) return;
    await FB().update(FB().ref(FB().db, `duelRooms/${duelId}`), { status: 'rejected' });
    await FB().update(FB().ref(FB().db, `duels/${retadoCode}/${duelId}`),  { status: 'rejected' });
    await FB().update(FB().ref(FB().db, `duels/${retadorCode}/${duelId}`), { status: 'rejected' });
  },

  // Limpia el puntero liviano de un jugador (cuando ya vio el resultado).
  cerrarPuntero: async (duelId, code) => {
    if (!fbOK()) return;
    try { await FB().set(FB().ref(FB().db, `duels/${code}/${duelId}`), null); } catch(e) {}
  },

  // Escucha una sala en vivo. Devuelve función para desuscribir.
  escuchar: (duelId, callback) => {
    if (!fbOK()) return () => {};
    const salaRef = FB().ref(FB().db, `duelRooms/${duelId}`);
    return FB().onValue(salaRef, snap => callback(snap.exists() ? snap.val() : null));
  },
};

// ─────────────────────────────────────────────
//  XP / LEVEL SYSTEM
// ─────────────────────────────────────────────
const XP_LEVELS = [0, 500, 1200, 2500, 4500, 7000, 10500, 15000, 21000, 28500, 37500, 48000];

function computeLevel(xp) {
  const totalXp = xp || 0;
  let level = 1;
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= XP_LEVELS[i]) { level = i + 1; break; }
  }
  const levelStart = XP_LEVELS[level - 1] || 0;
  const levelEnd   = XP_LEVELS[level] || (XP_LEVELS[XP_LEVELS.length - 1] + 15000);
  const current    = totalXp - levelStart;
  const needed     = levelEnd - levelStart;
  return { level, current, needed, pct: Math.min(100, Math.round((current / needed) * 100)) };
}

// ─────────────────────────────────────────────
//  DAILY MISSIONS SYSTEM
// ─────────────────────────────────────────────
const MISSION_POOL = [
  { id: 'm_read10',    text: 'Leer 10 minutos hoy',          type: 'read_minutes',    target: 10,  ryo: 20,  xp: 40,  icon: 'timer',  kanji: '読' },
  { id: 'm_read20',    text: 'Leer 20 minutos hoy',          type: 'read_minutes',    target: 20,  ryo: 40,  xp: 80,  icon: 'timer',  kanji: '読' },
  { id: 'm_read30',    text: 'Leer 30 minutos hoy',          type: 'read_minutes',    target: 30,  ryo: 65,  xp: 130, icon: 'timer',  kanji: '読' },
  { id: 'm_icfes1',    text: 'Completar 1 simulacro ICFES',  type: 'icfes_complete',  target: 1,   ryo: 50,  xp: 100, icon: 'icfes',  kanji: '試' },
  { id: 'm_icfes8',    text: 'Acertar 8 preguntas ICFES',    type: 'icfes_correct',   target: 8,   ryo: 45,  xp: 90,  icon: 'icfes',  kanji: '知' },
  { id: 'm_icfes15',   text: 'Acertar 15 preguntas ICFES',   type: 'icfes_correct',   target: 15,  ryo: 75,  xp: 150, icon: 'icfes',  kanji: '知' },
  { id: 'm_confirm',   text: 'Sellar tu pergamino hoy',      type: 'confirm',         target: 1,   ryo: 25,  xp: 50,  icon: 'check',  kanji: '印' },
  { id: 'm_streak',    text: 'Mantener tu racha viva',       type: 'streak_active',   target: 1,   ryo: 30,  xp: 60,  icon: 'flame',  kanji: '炎' },
];

function generateDailyMissions(today) {
  const seed = today.split('').reduce((acc, ch, i) => acc + ch.charCodeAt(0) * (i + 1), 0);
  const pool = [...MISSION_POOL];
  const selected = [];
  for (let i = 0; i < 3 && pool.length > 0; i++) {
    const idx = ((seed * (i + 1) * 37) % pool.length + pool.length) % pool.length;
    selected.push(pool.splice(idx, 1)[0]);
  }
  return selected;
}

function getMissionProgress(template, appState) {
  const today = todayStr();
  const todaySims = (appState.icfesHistory || []).filter(r => r.ts && new Date(r.ts).toDateString() === today);
  switch (template.type) {
    case 'read_minutes':   return appState.readingMinutesToday || 0;
    case 'icfes_complete': return todaySims.length;
    case 'icfes_correct':  return todaySims.reduce((s, r) => s + (r.correct || 0), 0);
    case 'confirm':        return appState.yourConfirmed ? 1 : 0;
    case 'streak_active':  return (appState.streakDays || 0) > 0 ? 1 : 0;
    default:               return 0;
  }
}

// ─────────────────────────────────────────────
//  INITIAL STATE — FIX: ryo 100 (no 99999), add xp/level/icfes streak
// ─────────────────────────────────────────────
const freshState = () => ({
  currentBookId: null,
  currentChapter: 1,
  currentPage: 1,
  streakDays: 0,
  yourProgress: 0,
  theirProgress: 0,
  theirPage: 1,
  yourConfirmed: false,
  theirConfirmed: false,
  readingMinutesToday: 0,
  totalMinutesRead: 0,
  completedBooks: 0,
  totalSessions: 0,
  dailyGoal: 20,
  lastConfirmedDate: null,
  customColor: null,
  photoURL: null,
  notifPermission: null,
  // Economy
  ryo: 100,         // ✅ FIX: was 99999 (debug value)
  xp: 0,            // ✅ NEW: experience points for leveling
  // ICFES streak
  icfesStreak: 0,   // ✅ NEW: consecutive days completing simulacros
  lastIcfesDate: null,
  // Shop & profile
  institution: '',
  interests: '',
  equipped: { title: null, frame: null, banner: null },
  inventory: ['t_iniciado'],
  streakFreezes: 0, // ✅ NEW: streak freeze item count
  // Daily missions state
  missionsDate: null,       // ✅ NEW: date string of current missions
  missionsRewarded: [],     // ✅ NEW: IDs of missions already rewarded today

  weekData: [
    {day:"Lun",you:false,them:false},{day:"Mar",you:false,them:false},
    {day:"Mié",you:false,them:false},{day:"Jue",you:false,them:false},
    {day:"Vie",you:false,them:false},{day:"Sáb",you:false,them:false},
    {day:"Dom",you:false,them:false},
  ],
  achievements: [
    // ── LECTURA ──────────────────────────────────────────────
    {id:1,  name:"Primer Paso",           desc:"Confirma tu primera lectura.",             icon:"check",  unlocked:false, date:null, ryo:50,   xp:100 },
    {id:2,  name:"Fuego Interior",        desc:"7 días de racha consecutiva.",             icon:"flame",  unlocked:false, date:null, ryo:150,  xp:300 },
    {id:3,  name:"Sincronía",             desc:"14 días leyendo en racha.",                icon:"people", unlocked:false, date:null, ryo:300,  xp:600 },
    {id:4,  name:"Gran Lector",           desc:"Acumula 100 minutos de lectura total.",    icon:"timer",  unlocked:false, date:null, ryo:200,  xp:400 },
    {id:5,  name:"Maratón Literario",     desc:"21 días de racha consecutiva.",            icon:"trophy", unlocked:false, date:null, ryo:500,  xp:1000},
    {id:6,  name:"El Archivero",          desc:"Añade 5 libros a tu biblioteca.",          icon:"book",   unlocked:false, date:null, ryo:200,  xp:400 },
    {id:7,  name:"Samurái de Páginas",    desc:"Lee 60 minutos en una sola sesión.",       icon:"timer",  unlocked:false, date:null, ryo:250,  xp:500 },
    {id:8,  name:"La Gran Racha",         desc:"30 días de racha consecutiva.",            icon:"flame",  unlocked:false, date:null, ryo:800,  xp:1600},
    {id:9,  name:"Leyenda Viviente",      desc:"Alcanza 50 días de racha.",               icon:"trophy", unlocked:false, date:null, ryo:1500, xp:3000},
    {id:10, name:"Bibliófilo",            desc:"Añade 10 libros a tu biblioteca.",         icon:"book",   unlocked:false, date:null, ryo:400,  xp:800 },
    {id:11, name:"El Centurión",          desc:"Completa 100 sesiones de lectura.",        icon:"timer",  unlocked:false, date:null, ryo:700,  xp:1400},
    {id:12, name:"Monje Lector",          desc:"Acumula 1000 minutos de lectura total.",   icon:"timer",  unlocked:false, date:null, ryo:1000, xp:2000},
    {id:13, name:"Dúo Imparable",         desc:"Ambos confirman lectura 14 días juntos.",  icon:"people", unlocked:false, date:null, ryo:600,  xp:1200},
    {id:14, name:"La Gran Sincronía",     desc:"Ambos confirman lectura 30 días juntos.",  icon:"people", unlocked:false, date:null, ryo:1500, xp:3000},
    {id:15, name:"Coleccionista",         desc:"Termina un libro de 5 géneros distintos.", icon:"book",   unlocked:false, date:null, ryo:500,  xp:1000},
    {id:16, name:"El Inmortal",           desc:"100 días de racha. Un logro histórico.",   icon:"trophy", unlocked:false, date:null, ryo:5000, xp:10000},
    {id:17, name:"Noctámbulo",            desc:"Completa 10 sesiones nocturnas.",          icon:"timer",  unlocked:false, date:null, ryo:300,  xp:600 },
    // ── ICFES ────────────────────────────────────────────────
    {id:20, name:"Iniciado en el Templo", desc:"Completa tu primer simulacro ICFES.",      icon:"icfes",  unlocked:false, date:null, ryo:150,  xp:300 },
    {id:21, name:"El Guerrero",           desc:"Completa 10 simulacros ICFES.",            icon:"icfes",  unlocked:false, date:null, ryo:400,  xp:800 },
    {id:22, name:"Mente Brillante",       desc:"Supera 300 puntos en el ICFES.",           icon:"star",   unlocked:false, date:null, ryo:400,  xp:800 },
    {id:23, name:"El Sabio",              desc:"Supera 400 puntos en el ICFES.",           icon:"star",   unlocked:false, date:null, ryo:800,  xp:1600},
    {id:24, name:"Perfeccionista",        desc:"Obtén 500/500 en un simulacro.",           icon:"trophy", unlocked:false, date:null, ryo:3000, xp:6000},
    {id:25, name:"Maestro Persistente",   desc:"Completa 25 simulacros ICFES.",            icon:"icfes",  unlocked:false, date:null, ryo:1000, xp:2000},
    {id:26, name:"Analítico",             desc:"Supera 80% en Lectura Crítica.",           icon:"msg",    unlocked:false, date:null, ryo:500,  xp:1000},
    {id:27, name:"Calculista",            desc:"Supera 80% en Matemáticas.",               icon:"icfes",  unlocked:false, date:null, ryo:500,  xp:1000},
    {id:28, name:"Científico",            desc:"Supera 80% en Ciencias Naturales.",        icon:"icfes",  unlocked:false, date:null, ryo:500,  xp:1000},
    {id:29, name:"El Historiador",        desc:"Supera 80% en Ciencias Sociales.",         icon:"icfes",  unlocked:false, date:null, ryo:500,  xp:1000},
    {id:32, name:"Racha del Templo",      desc:"Completa ICFES 7 días seguidos.",          icon:"flame",  unlocked:false, date:null, ryo:600,  xp:1200},
    // ── SOCIAL ────────────────────────────────────────────────
    {id:30, name:"Primer Amigo",          desc:"Añade a tu primer amigo en Pankey.",       icon:"people", unlocked:false, date:null, ryo:200,  xp:400 },
    {id:31, name:"El Conector",           desc:"Tienes 5 amigos en Pankey.",               icon:"people", unlocked:false, date:null, ryo:500,  xp:1000},
    // ── ESPECIALES ────────────────────────────────────────────
    {id:40, name:"El Primer Capítulo",    desc:"Avanza al capítulo 2 de cualquier libro.", icon:"book",   unlocked:false, date:null, ryo:100,  xp:200 },
    {id:41, name:"Madrugador",            desc:"Completa una sesión antes de las 7 AM.",   icon:"timer",  unlocked:false, date:null, ryo:300,  xp:600 },
    {id:42, name:"Congelador de Racha",   desc:"Usa tu primer Congelador de Racha.",       icon:"snowflake", unlocked:false, date:null, ryo:150, xp:300 },
  ],
});


// ─────────────────────────────────────────────
//  TARJETAS (Cards) — Ahora con acústica de madera
// ─────────────────────────────────────────────
const Card = ({ C, isLight, style, children, onClick, className = "" }) => {
  const glassOp  = C.glassOpacity  || (isLight ? '0.60' : '0.045');
  const [pressed, setPressed] = useState(false);

  // Filo de oro Tumbaga muy sutil como borde (marca), distinto al gris genérico
  const filoOro = isLight ? 'rgba(0,0,0,0.06)' : `${C.accent}22`;

  // "Tallado en piedra": luz arriba (inset claro), relieve hundido (inset oscuro abajo) + profundidad externa
  const restShadow = isLight
    ? `inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.06)`
    : `inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -2px 4px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.3), 0 14px 38px rgba(0,0,0,0.4)`;
  const pressShadow = isLight
    ? `inset 0 1px 3px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)`
    : `inset 0 2px 6px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)`;

  const handleTap = (e) => {
    if (onClick) { FX.play('tap'); FX.vibrate('light'); onClick(e); }
  };

  return (
    <div
      className={className}
      onClick={handleTap}
      onPointerDown={() => onClick && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        background: `rgba(255,255,255,${glassOp})`,
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        border: `1px solid ${filoOro}`,
        borderRadius: 18,
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: pressed ? pressShadow : restShadow,
        transform: pressed ? 'translateY(1px) scale(0.993)' : 'translateY(0) scale(1)',
        transition: 'transform 0.18s cubic-bezier(0.22,1,0.36,1), box-shadow 0.18s ease',
        ...style,
      }}>
      {children}
    </div>
  );
};

const PrimaryBtn = ({ C, children, onClick, disabled, style, loading }) => {
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);
  const handleClick = (e) => {
    if (disabled || loading) { FX.vibrate('light'); return; }
    FX.play('tap'); FX.vibrate('medium'); // 🔥 SONIDO Y VIBRACIÓN AQUÍ
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { id, x, y }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 650);
    onClick?.();
  };
  return (
    <button ref={btnRef} onClick={handleClick} disabled={disabled || loading} style={{
      width: '100%', background: disabled ? C.bgAlt : C.accent,
      color: disabled ? C.textMuted : '#fff', border: 'none',
      borderRadius: 14, padding: '16px 24px', fontSize: 15, fontWeight: 600, letterSpacing: 0.3,
      boxShadow: disabled ? 'none' : `0 6px 28px ${C.accent}50`,
      opacity: loading ? 0.7 : 1, position: 'relative', overflow: 'hidden', ...style,
    }}>
      {ripples.map(rp => (
        <span key={rp.id} style={{
          position: 'absolute', left: rp.x, top: rp.y,
          width: 8, height: 8, borderRadius: '50%',
          background: 'rgba(255,255,255,0.5)',
          transform: 'translate(-50%, -50%) scale(0)',
          animation: 'rippleOut 0.6s ease-out both', pointerEvents: 'none',
        }} />
      ))}
      {loading ? 'Un momento...' : children}
    </button>
  );
};

// ─────────────────────────────────────────────
//  AVATAR PREMIUM — con marcos animados
// ─────────────────────────────────────────────
const Av = ({ name, sz = 36, color, C, style: st = {}, photoURL, frameData }) => {
  const c = color || C.accent;
  const [imgErr, setImgErr] = useState(false);
  useEffect(() => { setImgErr(false); }, [photoURL]);
  const hasFrame = frameData && frameData.type === 'frame';
  const innerOffset = hasFrame ? 5 : 0;
  const innerSz = sz - innerOffset * 2;

  const initials = (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    // 🔥 MAGIA APLICADA: Flexbox asegura que la foto quede siempre en el puro centro
    <div style={{ position: 'relative', width: sz, height: sz, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', ...st }}>
      
      {/* La foto o iniciales */}
      <div style={{
        width: innerSz, height: innerSz, borderRadius: '50%', overflow: 'hidden',
        background: `linear-gradient(135deg, ${c}30, ${c}60)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: innerSz * 0.35, fontWeight: 700, color: c,
        zIndex: 2,
      }}>
        {photoURL && !imgErr
          ? <img src={photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setImgErr(true)} />
          : <span style={{ userSelect: 'none' }}>{initials}</span>
        }
      </div>
      
      {/* El marco */}
      {hasFrame && <AvatarFrame frameData={frameData} sz={sz} c={c} />}
    </div>
  );
};
function AvatarFrame({ frameData, sz, c }) {
  if (!frameData) return null;
  const id = frameData.id;
  const r  = sz / 2 + 5; // radio para elementos orbitando alrededor del avatar

  // ── Anillo de Esmeralda ──
  if (id === 'f_jade') {
    const sparks = [
      { top: '0%',   left: '50%' },
      { top: '50%',  left: '100%' },
      { top: '100%', left: '50%' },
      { top: '50%',  left: '0%' },
    ];
    return (
      <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', zIndex: 3, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #10B981',
          boxShadow: '0 0 14px #10B98180, inset 0 0 10px #10B98130', animation: 'jadePulse 2.5s ease-in-out infinite' }} />
        {sparks.map((p, i) => (
          <div key={i} style={{ position: 'absolute', top: p.top, left: p.left, transform: 'translate(-50%,-50%)' }}>
            <div style={{ width: 6, height: 6, background: '#fff',
              clipPath: 'polygon(50% 0%,65% 35%,100% 50%,65% 65%,50% 100%,35% 65%,0% 50%,35% 35%)',
              boxShadow: '0 0 6px #6EE7B7, 0 0 12px #34D39990',
              animation: `sparkleFlash 3.2s ${i * 0.8}s ease-in-out infinite` }} />
          </div>
        ))}
      </div>
    );
  }

  // ── Aro de Café ──
  if (id === 'f_cafe') {
    const steams = [-7, 0, 7];
    return (
      <div style={{ position: 'absolute', inset: -3, zIndex: 3, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #C9963A',
          boxShadow: '0 0 12px #C9963A60, inset 0 0 8px #8B5E1A40' }} />
        {steams.map((off, i) => (
          <div key={i} style={{ position: 'absolute', top: '-8%', left: `calc(50% + ${off}px)`, transform: 'translate(-50%,-100%)' }}>
            <div style={{ width: 4, height: 10, borderRadius: 99, background: 'rgba(255,255,255,0.55)', filter: 'blur(1px)',
              animation: `steamRise 2.4s ${i * 0.6}s ease-out infinite` }} />
          </div>
        ))}
      </div>
    );
  }

  // ── Corona de Heliconia ──
  if (id === 'f_sakura') {
    const petals = [
      { deg: -25, color: '#E63946' },
      { deg: 35,  color: '#F77F00' },
      { deg: 95,  color: '#FCBF49' },
      { deg: 155, color: '#E63946' },
      { deg: 215, color: '#F77F00' },
      { deg: 280, color: '#FCBF49' },
    ];
    return (
      <div style={{ position: 'absolute', inset: -3, zIndex: 3, pointerEvents: 'none' }}>
        {petals.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%', width: 9, height: 14,
            marginLeft: -4.5, marginTop: -7,
            transform: `rotate(${p.deg}deg) translateY(-${r}px) rotate(${-p.deg}deg)`,
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50% 50% 50% 0', background: p.color,
              boxShadow: `0 0 6px ${p.color}90`,
              animation: `petalPulse 3.4s ${i * 0.4}s ease-in-out infinite` }} />
          </div>
        ))}
      </div>
    );
  }

  // ── Espiral de Añil ──
  if (id === 'f_indigo') return (
    <div style={{ position: 'absolute', inset: -3, zIndex: 3, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px dashed #4A6FA5',
        animation: 'inkSpin 14s linear infinite', boxShadow: '0 0 18px #4A6FA570' }} />
      <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1.5px dashed #7C9BD980',
        animation: 'inkSpinRev 9s linear infinite' }} />
    </div>
  );

  // ── Rana Dorada ──
  if (id === 'f_koi') {
    const frogs = [30, 150, 270];
    const dust  = [{top:'5%',left:'85%'},{top:'80%',left:'10%'},{top:'90%',left:'75%'}];
    return (
      <div style={{ position: 'absolute', inset: -3, zIndex: 3, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2.5px solid #FBBF24',
          boxShadow: '0 0 16px #FBBF2490, inset 0 0 10px #FBBF2430', animation: 'jadePulse 3s ease-in-out infinite' }} />
         <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', animation: 'inkSpin 22s linear infinite' }}>
          {frogs.map((deg, i) => (
            <div key={i} style={{
              position: 'absolute', top: '50%', left: '50%', width: 11, height: 11,
              marginLeft: -5.5, marginTop: -5.5,
              transform: `rotate(${deg}deg) translateY(-${r}px) rotate(${-deg}deg)`,
            }}>
              <PkIc n="rana" s={11} c="#FBBF24" />
            </div>
          ))}
        </div>
        {dust.map((d, i) => (
          <div key={i} style={{ position: 'absolute', top: d.top, left: d.left, transform: 'translate(-50%,-50%)' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FFE9A8',
              boxShadow: '0 0 6px #FBBF24', animation: `sparkleFlash 2.6s ${i * 0.7}s ease-in-out infinite` }} />
          </div>
        ))}
      </div>
    );
  }

  // ── El Volcán ──
  if (id === 'f_dragon') {
    const embers = [
      { top: '90%', left: '28%' },
      { top: '98%', left: '50%' },
      { top: '90%', left: '72%' },
    ];
    return (
      <div style={{ position: 'absolute', inset: -4, zIndex: 3, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, border: '3px solid #EF4444',
          animation: 'fireDistort 2s ease-in-out infinite',
          boxShadow: '0 0 24px #EF444490,0 0 48px #EF444440', filter: 'blur(.4px)' }} />
        <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', border: '2px solid #F59E0B',
          boxShadow: '0 0 16px #EF4444,inset 0 0 10px #EF444430' }} />
        {embers.map((e, i) => (
          <div key={i} style={{ position: 'absolute', top: e.top, left: e.left, transform: 'translate(-50%,-50%)' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%',
              background: 'radial-gradient(#FDE68A,#F59E0B)', boxShadow: '0 0 8px #F59E0B',
              animation: `emberRise 1.8s ${i * 0.5}s ease-out infinite` }} />
          </div>
        ))}
      </div>
    );
  }

  // ── Corona de Estrellas ──
  if (id === 'f_celestial') {
    const stars = [0,51,102,153,204,255,306];
    return (
      <div style={{ position: 'absolute', inset: -5, zIndex: 3, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '3px solid #C084FC',
          boxShadow: '0 0 24px #C084FC90,0 0 48px #C084FC50,0 0 80px #C084FC25' }} />
        <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', border: '1.5px solid #C084FC70', animation: 'inkSpin 10s linear infinite' }} />
        <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: '1px solid #C084FC40', animation: 'inkSpinRev 15s linear infinite' }} />
        {stars.map((deg, i) => (
          <div key={i} style={{ position: 'absolute', top: '50%', left: '50%',
            transform: `rotate(${deg}deg) translate(${r + 2}px,-50%)` }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff',
              boxShadow: '0 0 6px #C084FC,0 0 12px #C084FC',
              animation: `sparkleFlash 2.4s ${i * 0.28}s ease-in-out infinite` }} />
          </div>
        ))}
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 3, height: 3, borderRadius: '50%',
          background: '#fff', boxShadow: '0 0 8px #fff, 0 0 16px #C084FC',
          animation: 'shootingStar 6s ease-in infinite' }} />
      </div>
    );
  }

  // Fallback genérico
  return (
    <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', zIndex: 3,
      pointerEvents: 'none',
      border: frameData.border || `3px solid ${frameData.color || c}`,
      boxShadow: frameData.boxShadow || 'none' }} />
  );
}
const SectionTitle = ({ C, children, icon }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
    <div style={{ width: 3, height: 16, borderRadius: 99, background: `linear-gradient(180deg, ${C.accent}, ${C.accent}40)`, boxShadow: `0 0 6px ${C.accent}60` }} />
    {icon && <PkIc n={icon} s={14} c={C.accent} />}
    <span style={{ fontSize: 11, color: C.textMid, fontWeight: 800, letterSpacing: 1.6, textTransform: 'uppercase' }}>{children}</span>
  </div>
);
const Pill = ({ children, C, accent, style }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center',
    background: (accent || C.accent) + '18', color: accent || C.accent,
    borderRadius: 8, padding: '4px 10px',
    fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
    border: `1px solid ${(accent || C.accent)}28`,
    ...style,
  }}>
    {children}
  </div>
);

const Divider = ({ C, label }) => {
  const greca = (
    <svg viewBox="0 0 60 8" preserveAspectRatio="none" style={{ flex: 1, height: 8, opacity: 0.5 }}>
      <path d="M0 4h8v-3h6v6h6v-3h8v3h6v-6h6v3h8" fill="none" stroke={C.accent} strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '6px 0' }}>
      {greca}
      {label && <span style={{ fontSize: 10, color: C.accent, fontWeight: 800, letterSpacing: 2, flexShrink: 0 }}>{label}</span>}
      <div style={{ transform: 'scaleX(-1)', flex: 1, display: 'flex' }}>{greca}</div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  PROGRESS STEPPER
// ─────────────────────────────────────────────
function ProgressStepper({ C, isLight, appState, setAppState, currentBook }) {
  const tChap = currentBook?.totalChapters || 10;
  const tPage = currentBook?.totalPages || 0;
  const cChap = appState.currentChapter || 1;
  const cPage = appState.currentPage || 1;
  const pct = tPage > 0
    ? Math.min(100, Math.round((cPage / tPage) * 100))
    : Math.min(100, Math.round((cChap / tChap) * 100));

  const StepBox = ({ label, value, onMinus, onPlus }) => (
    <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 10px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: 1.5 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onMinus} style={{ width: 30, height: 30, borderRadius: 8,
          background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', fontSize: 18, fontWeight: 300,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', minWidth: 32, textAlign: 'center' }}>{value}</span>
        <button onClick={onPlus} style={{ width: 30, height: 30, borderRadius: 8,
          background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', fontSize: 18, fontWeight: 300,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <StepBox label="CAPÍTULO" value={cChap}
          onMinus={() => setAppState(s => ({ ...s, currentChapter: Math.max(1, cChap - 1) }))}
          onPlus={() => setAppState(s => ({ ...s, currentChapter: Math.min(tChap, cChap + 1) }))}
        />
        {tPage > 0 && (
          <StepBox label="PÁGINA" value={cPage}
            onMinus={() => setAppState(s => ({ ...s, currentPage: Math.max(1, cPage - 1) }))}
            onPlus={() => setAppState(s => ({ ...s, currentPage: Math.min(tPage, cPage + 1) }))}
          />
        )}
      </div>
      <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, borderRadius: 99, background: 'rgba(255,255,255,0.9)',
          transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)', boxShadow: '0 0 12px rgba(255,255,255,0.6)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
        {pct}% completado
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  NEW: COIN BURST — animación de monedas volando
// ─────────────────────────────────────────────
function CoinBurst({ amount, C }) {
  useEffect(() => { FX.play('coin'); FX.vibrate('success'); }, []);
  const coins = Array.from({ length: 7 }, (_, i) => ({
    cx: `${(i - 3) * 28}px`,
    cr: `${(i % 2 ? 1 : -1) * (15 + i * 8)}deg`,
    delay: `${i * 0.06}s`,
  }));
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99995, pointerEvents: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {coins.map((coin, i) => (
        <div key={i} style={{
          position: 'absolute', left: '50%', bottom: '45%',
          fontSize: 22, marginLeft: '-11px',
          '--cx': coin.cx, '--cr': coin.cr,
          animation: `coinFly 1.0s ${coin.delay} cubic-bezier(0.2, 0.8, 0.4, 1) both`,
        }}><PkIc n={i % 2 === 0 ? 'empanada' : 'maracas'} s={13} c={C.amberMid}/></div>
      ))}
      <div style={{
        position: 'absolute', bottom: '62%', left: '50%',
        fontSize: 28, fontWeight: 900,
        color: '#FBBF24',
        textShadow: `0 0 24px #FBBF24AA, 0 2px 8px rgba(0,0,0,0.5)`,
        animation: 'coinLabel 1.3s cubic-bezier(0.22, 1, 0.36, 1) both',
        whiteSpace: 'nowrap',
      }}>
        +{amount} <PkIc n="empanada" s={13} c={C.amberMid}/>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────
//  STREAK CELEBRATION — El momentazo al sellar la racha del día
// ─────────────────────────────────────────────
function StreakCelebration({ streak, C, onClose }) {
  useEffect(() => {
    FX.play('levelUp'); FX.vibrate('heavy');
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [onClose]);

  // Frases según el tamaño de la racha
  const frase =
    streak >= 100 ? '¡INMORTAL! Nadie lo para, parce.' :
    streak >= 30  ? '¡Un mes en candela! Usted es de otro nivel.' :
    streak >= 14  ? '¡Dos semanas ardiendo! Imparable.' :
    streak >= 7   ? '¡Una semana completa! Va finísimo.' :
    streak >= 3   ? '¡Ya coge ritmo, no pare!' :
                    '¡Racha encendida! Vuelva mañana.';

  // Chispas que vuelan
  const sparks = Array.from({ length: 14 }, (_, i) => {
    const ang = (i / 14) * Math.PI * 2;
    const dist = 90 + (i % 3) * 30;
    return { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist, d: (i % 5) * 0.05 };
  });

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 99994, cursor: 'pointer',
      background: 'rgba(15,13,12,0.97)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.35s ease both',
    }}>
      {/* Resplandor de fondo */}
      <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%',
        background: `radial-gradient(circle, #F59E0B30 0%, transparent 62%)`,
        animation: 'celestialPulse 2.4s ease-in-out infinite', pointerEvents: 'none' }} />

      {/* Chispas */}
      {sparks.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', width: 7, height: 7, borderRadius: '50%',
          background: i % 2 ? '#FBBF24' : '#F59E0B',
          boxShadow: '0 0 8px #FBBF24',
          '--spx': `${s.x}px`, '--spy': `${s.y}px`,
          animation: `streakSpark 1.1s ${s.d}s ease-out forwards`,
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Llama gigante latiendo */}
        <div style={{ animation: 'streakFlameGrow 0.9s cubic-bezier(0.22,1,0.36,1) both' }}>
          <div style={{ animation: 'flameFlicker 1.2s 0.9s ease-in-out infinite' }}>
            <PkIc n="flame" s={96} c="#F59E0B" />
          </div>
        </div>

        {/* Número gigante */}
        <div className="serif" style={{
          fontSize: 88, fontWeight: 900, color: '#FBBF24', lineHeight: 1, marginTop: 8,
          textShadow: '0 4px 30px #F59E0B80', fontVariantNumeric: 'tabular-nums',
          animation: 'streakNumPop 0.7s 0.5s cubic-bezier(0.22,1,0.36,1) both',
        }}>{streak}</div>

        <div style={{ fontSize: 13, color: '#FBBF24', fontWeight: 800, letterSpacing: 4,
          marginTop: 6, animation: 'fadeUp 0.6s 0.8s ease both' }}>
          {streak === 1 ? 'DÍA DE RACHA' : 'DÍAS DE RACHA'}
        </div>

        <div style={{ fontSize: 16, color: C.text, fontWeight: 700, marginTop: 20, maxWidth: 280,
          lineHeight: 1.4, animation: 'fadeUp 0.6s 1.1s ease both', opacity: 0, animationFillMode: 'forwards' }}>
          {frase}
        </div>

        <div style={{ fontSize: 11, color: C.textMuted, marginTop: 28, letterSpacing: 2,
          animation: 'fadeIn 1s 2s ease both', opacity: 0, animationFillMode: 'forwards' }}>
          Toca para continuar
        </div>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────
//  NEW: LEVEL UP MODAL — Celebración de Nivel Ancestral
// ─────────────────────────────────────────────
function LevelUpModal({ newLevel, C, onClose }) {
  useEffect(() => {
    FX.play('levelUp'); FX.vibrate('heavy'); // 🔥 MÚSICA Y TEMBLOR ÉPICO
    const t = setTimeout(onClose, 4200);
    return () => clearTimeout(t);
  }, [onClose]);
  // Nombres épicos que escalan con tu nivel
  const RANGOS = [
    'Explorador', 'Caminante', 'Rastreador', 'Guerrero', 
    'Chamán', 'Cacique', 'Sabio Ancestral', 
    'Mito de Tumbaga', 'Leyenda del Páramo', 'Inmortal'
  ];
  const rangoName = RANGOS[Math.min(newLevel - 1, RANGOS.length - 1)];

  // Íconos que van rotando según el nivel; el cóndor corona los niveles altos
  const ICONS = ['leaf', 'mountain', 'wave', 'flame', 'sabio', 'rana', 'crystal', 'star'];
  const iconName = newLevel >= 9 ? 'condor' : ICONS[(newLevel - 1) % ICONS.length];

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 99994,
      background: 'rgba(15, 13, 12, 0.96)', // Fondo oscuro rupestre
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer',
      animation: 'fadeIn 0.4s ease both',
    }}>
      {/* Glow radial de oro (Luz de Antorcha) */}
      <div style={{ position: 'absolute', width: 450, height: 450, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.accent}25 0%, transparent 65%)`,
        pointerEvents: 'none', animation: 'celestialPulse 3s ease-in-out infinite' }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Ícono de rango brillando */}
        <div style={{
          marginBottom: 16,
          animation: 'kanjiRise 0.8s cubic-bezier(0.22,1,0.36,1) both, kanjiGlow 2.5s 1s ease-in-out infinite',
          filter: `drop-shadow(0 0 20px ${C.accent}90)`,
        }}>
          <PkIc n={iconName} s={72} c={C.accent} sw={1.2} />
        </div>

        {/* Label superior */}
        <div style={{ fontSize: 12, color: C.textMuted, letterSpacing: 6, marginBottom: 6,
          animation: 'fadeUp 0.6s 0.3s ease both', fontWeight: 800 }}>
          NUEVO NIVEL
        </div>

        {/* Número Gigante */}
        <div className="serif" style={{
          fontSize: 96, fontWeight: 900, color: C.text, lineHeight: 1,
          animation: 'levelNumPop 0.7s 0.4s cubic-bezier(0.22,1,0.36,1) both',
          textShadow: `0 4px 20px ${C.accent}60`,
          fontVariantNumeric: 'tabular-nums',
        }}>{newLevel}</div>

        {/* Subtítulo / Rango Obtenido */}
        <div style={{
          fontSize: 18, fontWeight: 800, color: C.accent, letterSpacing: 4,
          marginTop: 16, textTransform: 'uppercase',
          animation: 'fadeUp 0.6s 0.6s ease both', opacity: 0,
          animationFillMode: 'forwards',
        }}>
          {rangoName}
        </div>

        {/* Toca para continuar */}
        <div style={{ fontSize: 11, color: C.textMuted, marginTop: 32, letterSpacing: 2,
          animation: 'fadeIn 1s 1.5s ease both', opacity: 0, animationFillMode: 'forwards' }}>
          Toca para continuar
        </div>
      </div>

      {/* Adornos esquineros (Orfebrería) */}
      {[[true,true],[true,false],[false,true],[false,false]].map(([top,left],i) => (
        <div key={i} style={{
          position: 'absolute',
          top: top ? 32 : 'auto', bottom: !top ? 32 : 'auto',
          left: left ? 32 : 'auto', right: !left ? 32 : 'auto',
          width: 28, height: 28,
          borderTop:    top  ? `2px solid ${C.accent}40` : undefined,
          borderBottom: !top ? `2px solid ${C.accent}40` : undefined,
          borderLeft:   left ? `2px solid ${C.accent}40` : undefined,
          borderRight:  !left ? `2px solid ${C.accent}40` : undefined,
          animation: `fadeIn 0.4s ${0.1 * i}s ease both`,
          pointerEvents: 'none',
        }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
//  NEW: ACHIEVEMENT TOAST — logro desbloqueado
// ─────────────────────────────────────────────
function AchievementToast({ achievement, C, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3400);
    return () => clearTimeout(t);
  }, [achievement.id]);

  return (
    <div style={{
      position: 'fixed', bottom: 110, left: '50%',
      zIndex: 9993,
      background: `linear-gradient(135deg, ${C.accent}22, ${C.bgAlt})`,
      border: `1px solid ${C.accent}55`,
      backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
      borderRadius: 20, padding: '14px 18px',
      display: 'flex', alignItems: 'center', gap: 14,
      boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px ${C.accent}25`,
      animation: 'achieveSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both',
      minWidth: 270, maxWidth: '86vw',
      cursor: 'pointer',
    }} onClick={onDone}>
      {/* Icon circle */}
      <div style={{
        width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
        background: `linear-gradient(135deg, ${C.accent}, ${C.accent}BB)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 18px ${C.accent}60`,
        animation: 'levelNumPop 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <PkIc n={achievement.icon} s={22} c="#fff" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, color: C.accent, fontWeight: 800, letterSpacing: 1.5, marginBottom: 2 }}>
          ¡CORONASTE UN LOGRO! 
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {achievement.name}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, marginTop: 3, display: 'flex', gap: 10 }}>
          <span style={{ color: '#FBBF24' }}>+{achievement.ryo} <PkIc n="empanada" s={13} c={C.amberMid}/></span>
          <span style={{ color: C.accent }}>+{achievement.xp} XP</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  NEW: XP BAR — barra de progreso de nivel
// ─────────────────────────────────────────────
function XpBar({ C, xp, compact = false }) {
  const lvl = computeLevel(xp || 0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {!compact && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.accent }}>Nivel {lvl.level}</span>
          <span style={{ fontSize: 10, color: C.textMuted }}>{lvl.current.toLocaleString()} / {lvl.needed.toLocaleString()} XP</span>
        </div>
      )}
      <div style={{ height: compact ? 4 : 6, borderRadius: 99,
        background: C.bgAlt || 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${lvl.pct}%`, borderRadius: 99,
          background: `linear-gradient(90deg, ${C.accent}88, ${C.accent})`,
          boxShadow: `0 0 8px ${C.accent}60`,
          transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      </div>
      {compact && (
        <div style={{ fontSize: 9, color: C.textMuted, textAlign: 'right' }}>Nv. {lvl.level}</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  NEW: DAILY MISSIONS CARD
// ─────────────────────────────────────────────
function DailyMissions({ C, isLight, appState, setAppState, onReward }) {
  const today = todayStr();
  const missions = generateDailyMissions(today);
  const rewarded = appState.missionsRewarded || [];

  const collectMission = (template) => {
    if (rewarded.includes(template.id)) return;
    
    FX.play('levelUp'); FX.vibrate('success'); // 🔥 Melodía épica andina al cobrar

    setAppState(s => ({
      ...s,
      ryo: (s.ryo || 0) + template.ryo,
      xp:  (s.xp  || 0) + template.xp,
      missionsDate: today,
      missionsRewarded: [...(s.missionsRewarded || []), template.id],
    }));
    onReward?.(template.ryo, template.xp);
  };

  const resetIfNewDay = () => {
    if (appState.missionsDate !== today && (appState.missionsRewarded || []).length > 0) {
      setAppState(s => ({ ...s, missionsDate: today, missionsRewarded: [] }));
    }
  };

  useEffect(() => { resetIfNewDay(); }, [today]);

  const completedCount = missions.filter(m => {
    const progress = getMissionProgress(m, appState);
    return progress >= m.target;
  }).length;

  return (
    <div>
      <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>
        {completedCount}/3 completadas hoy
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {missions.map((m, idx) => {
          const progress   = getMissionProgress(m, appState);
          const isDone     = progress >= m.target;
          const isRewarded = rewarded.includes(m.id);
          const pct        = Math.min(100, Math.round((progress / m.target) * 100));
          const canCollect = isDone && !isRewarded;

          return (
            <div key={m.id} className="stagger-item" style={{ animationDelay: `${idx * 0.07}s` }}>
              <Card C={C} isLight={isLight} style={{
                padding: '12px 16px',
                border: `1px solid ${isRewarded ? C.border : isDone ? C.accent + '55' : C.border}`,
                background: isRewarded
                  ? 'transparent'
                  : isDone
                  ? `rgba(255,255,255,0.03)`
                  : undefined,
                transition: 'all 0.3s ease',
                opacity: isRewarded ? 0.5 : 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Kanji icon */}
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: isRewarded ? C.bgAlt : `${C.accent}18`,
                    border: `1px solid ${isRewarded ? C.border : C.accent + '30'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, fontWeight: 700, color: isRewarded ? C.textMuted : C.accent,
                  }}>
                    {isRewarded ? <PkIc n="check" s={18} c={C.textMuted} /> : <PkIc n={m.icon} s={18} c={C.accent} />}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: isRewarded ? C.textMuted : C.text,
                      textDecoration: isRewarded ? 'line-through' : 'none', marginBottom: 4 }}>
                      {m.text}
                    </div>
                    {/* Progress bar */}
                    {!isRewarded && (
                      <div>
                        <div style={{ height: 3, borderRadius: 99, background: C.bgAlt, overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', width: `${pct}%`, borderRadius: 99,
                            background: isDone
                              ? `linear-gradient(90deg, #34D399, #10B981)`
                              : `linear-gradient(90deg, ${C.accent}88, ${C.accent})`,
                            transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
                            boxShadow: isDone ? '0 0 6px #34D39970' : `0 0 4px ${C.accent}50`,
                          }} />
                        </div>
                        <div style={{ fontSize: 10, color: C.textMuted, marginTop: 3, display: 'flex', justifyContent: 'space-between' }}>
                          <span>{progress}/{m.target}</span>
                          <span style={{ color: C.accent, fontWeight: 700 }}>Recompensa: {m.ryo} emp · {m.xp} XP</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Collect button */}
                  {canCollect && (
                    <button onClick={() => collectMission(m)} style={{
                      background: `linear-gradient(135deg, #34D399, #10B981)`,
                      border: 'none', borderRadius: 10,
                      padding: '8px 12px', color: '#fff',
                      fontSize: 11, fontWeight: 800,
                      cursor: 'pointer', flexShrink: 0,
                      boxShadow: '0 4px 14px #34D39950',
                      animation: 'missionComplete 0.4s ease',
                      letterSpacing: 0.5,
                    }}>
                      ¡Cobrar!
                    </button>
                  )}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
//  NOTIF PANEL
// ─────────────────────────────────────────────
function NotifPanel({ C, isLight, notifications, onClose }) {
  return (
    <div style={{
      position: 'absolute', top: 62, right: 0, left: 0, zIndex: 950,
      background: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(8,12,20,0.95)',
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      border: `1px solid ${isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: '0 0 16px 16px',
      boxShadow: `0 16px 48px rgba(0,0,0,0.25)`,
      maxHeight: 300, overflowY: 'auto',
      animation: 'fadeUp 0.2s ease both',
    }}>
      <div style={{
        padding: '12px 20px', borderBottom: `1px solid ${C.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0,
        background: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(8,12,20,0.9)',
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: C.textMuted }}>NOTIFICACIONES</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.textMuted, padding: 4 }}>
          <PkIc n="x" s={15} c={C.textMuted} />
        </button>
      </div>
      {notifications.length === 0 && (
        <div style={{ padding: '24px 20px', textAlign: 'center', color: C.textMuted, fontSize: 13 }}>Todo al día</div>
      )}
      {notifications.slice(0, 15).map(n => (
        <div key={n.id} style={{
          padding: '12px 20px', borderBottom: `1px solid ${C.border}`,
          background: n.read ? 'transparent' : (C.accent + '0A'),
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          {!n.read && <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent, marginTop: 6, flexShrink: 0 }} />}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{n.text}</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
// ─────────────────────────────────────────────
//  EL ORÁCULO DEL SUMAPAZ — Estética de Lujo, Folclor y Misticismo
// ─────────────────────────────────────────────
function OracleView({ C, isLight, appState, onBack, pushNotif }) {
  const [step, setStep] = useState('menu'); 
  const [career, setCareer] = useState(null); 
  const [uni, setUni] = useState(null);       
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  
  const [quizPhase, setQuizPhase] = useState(1);
  const [quizStep, setQuizStep] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState([]); 
  const [answers, setAnswers] = useState([]); 
  const [suggestions, setSuggestions] = useState([]);
  const [auraText, setAuraText] = useState(''); 
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);
  
  const [activeCatalog, setActiveCatalog] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');

  const history = appState?.icfesHistory || [];
  const recentHistory = history.slice(-3);
  const avgScore = recentHistory.length > 0 ? Math.round(recentHistory.reduce((s,r) => s + (r.score || 0), 0) / recentHistory.length) : 0;
  const icfesTotal = history.length;

  const REAL_CAREERS = useMemo(() => [
    { name: "Medicina", area: "salud", cutoff: 415, icon: "flower", desc: "Vocación de servicio absoluto para sanar." },
    { name: "Enfermería", area: "salud", cutoff: 330, icon: "flower", desc: "Cuidado clínico, empatía y soporte vital." },
    { name: "Odontología", area: "salud", cutoff: 345, icon: "flower", desc: "Salud oral y precisión quirúrgica." },
    { name: "Psicología", area: "salud", cutoff: 335, icon: "people", desc: "Sanar la mente y entender el comportamiento." },
    { name: "Derecho", area: "social", cutoff: 350, icon: "scroll", desc: "Defensa de la justicia y las leyes." },
    { name: "Trabajo Social", area: "social", cutoff: 310, icon: "people", desc: "Intervención en comunidades vulnerables." },
    { name: "Fisioterapia / Kinesiología", area: "salud", cutoff: 320, icon: "flower", desc: "Rehabilitación física y biomecánica." },
    { name: "Ciencias Políticas", area: "social", cutoff: 340, icon: "scroll", desc: "Análisis del poder, el Estado y las políticas." },
    { name: "Sociología / Antropología", area: "social", cutoff: 315, icon: "people", desc: "Estudio profundo de la cultura humana." },
    { name: "Licenciatura en Educación", area: "social", cutoff: 290, icon: "book", desc: "Formar a las futuras generaciones con pedagogía." },
    { name: "Instrumentación Quirúrgica", area: "salud", cutoff: 300, icon: "flower", desc: "Apoyo vital en quirófanos y tecnología." },
    { name: "Fonoaudiología", area: "salud", cutoff: 305, icon: "msg", desc: "Terapia de lenguaje y comunicación." },
    
    { name: "Ingeniería de Sistemas", area: "ing", cutoff: 360, icon: "settings", desc: "Creación de software, IA y estructuras digitales." },
    { name: "Ingeniería Civil", area: "ing", cutoff: 340, icon: "mountain", desc: "Diseño y construcción de grandes infraestructuras." },
    { name: "Ingeniería Mecatrónica", area: "ing", cutoff: 365, icon: "settings", desc: "Fusión de mecánica, electrónica y programación." },
    { name: "Ingeniería Industrial", area: "ing", cutoff: 335, icon: "settings", desc: "Optimización de procesos y producción." },
    { name: "Ingeniería Ambiental", area: "ing", cutoff: 325, icon: "leaf", desc: "Soluciones para proteger el medio ambiente." },
    { name: "Ingeniería Electrónica", area: "ing", cutoff: 340, icon: "settings", desc: "Circuitos, microcontroladores y hardware." },
    { name: "Ingeniería Química", area: "ing", cutoff: 350, icon: "flower", desc: "Transformación de materias primas a gran escala." },
    { name: "Ingeniería de Petróleos", area: "ing", cutoff: 370, icon: "mountain", desc: "Extracción y gestión de recursos energéticos." },
    { name: "Ingeniería Biomédica", area: "ing", cutoff: 355, icon: "flower", desc: "Tecnología aplicada a la medicina y prótesis." },
    { name: "Ingeniería Agronómica", area: "ing", cutoff: 310, icon: "leaf", desc: "Tecnificación del campo y producción agrícola." },
    { name: "Desarrollo de Software", area: "ing", cutoff: 260, icon: "settings", desc: "Carrera técnica con altísima demanda laboral." },

    { name: "Administración de Empresas", area: "neg", cutoff: 310, icon: "target", desc: "Gestión corporativa, liderazgo y estrategia." },
    { name: "Economía", area: "neg", cutoff: 340, icon: "target", desc: "Análisis financiero y micro/macroeconomía." },
    { name: "Negocios Internacionales", area: "neg", cutoff: 330, icon: "target", desc: "Exportaciones, aduanas y comercio global." },
    { name: "Contaduría Pública", area: "neg", cutoff: 300, icon: "scroll", desc: "Finanzas, auditoría, impuestos y orden." },
    { name: "Marketing / Mercadeo", area: "neg", cutoff: 310, icon: "target", desc: "Estrategias de venta y comportamiento del consumidor." },
    { name: "Administración Hotelera", area: "neg", cutoff: 290, icon: "home", desc: "Gestión de la hospitalidad y turismo." },
    { name: "Gastronomía", area: "neg", cutoff: 280, icon: "empanada", desc: "Alta cocina, gestión de restaurantes y creatividad." },

    { name: "Arquitectura", area: "arte", cutoff: 350, icon: "frame", desc: "Diseño de espacios uniendo arte y funcionalidad." },
    { name: "Diseño Gráfico / Visual", area: "arte", cutoff: 320, icon: "frame", desc: "Comunicación visual e ilustración." },
    { name: "Diseño Industrial", area: "arte", cutoff: 330, icon: "frame", desc: "Creación de productos, muebles y objetos." },
    { name: "Producción Audiovisual", area: "arte", cutoff: 315, icon: "play", desc: "Cámaras, guiones, edición y contar historias." },
    { name: "Comunicación Social", area: "arte", cutoff: 310, icon: "msg", desc: "Medios, periodismo y relaciones públicas." },
    { name: "Publicidad", area: "arte", cutoff: 305, icon: "target", desc: "Campañas creativas y persuasión visual." },
    { name: "Artes Plásticas", area: "arte", cutoff: 290, icon: "butterfly", desc: "Expresión pura a través de pintura y escultura." },
    { name: "Música / Artes Escénicas", area: "arte", cutoff: 295, icon: "play", desc: "Actuación, canto, composición y escenario." },
    { name: "Diseño de Modas", area: "arte", cutoff: 300, icon: "butterfly", desc: "Tendencias, textiles y creación de indumentaria." },

    { name: "Biología", area: "ciencia", cutoff: 345, icon: "leaf", desc: "Estudio de los seres vivos y ecosistemas." },
    { name: "Física / Matemáticas", area: "ciencia", cutoff: 375, icon: "eye", desc: "Descifrar las leyes del universo." },
    { name: "Medicina Veterinaria", area: "ciencia", cutoff: 335, icon: "flower", desc: "Salud animal y clínica médica." },
    { name: "Química / Farmacia", area: "ciencia", cutoff: 350, icon: "flower", desc: "Composición de la materia y medicamentos." },
    { name: "Geología", area: "ciencia", cutoff: 340, icon: "mountain", desc: "Estudio de la Tierra, minerales y sismología." },
    { name: "Microbiología", area: "ciencia", cutoff: 335, icon: "eye", desc: "Investigación de bacterias y biotecnología." },
    { name: "Astronomía", area: "ciencia", cutoff: 360, icon: "star", desc: "Estudio del cosmos, las estrellas y planetas." }
  ], []);

  const COLOMBIAN_UNIS = useMemo(() => [
    { name: "Universidad Nacional de Colombia", type: "Pública", diff: 30, desc: "La de mayor tradición y exigencia." },
    { name: "Universidad de Antioquia", type: "Pública", diff: 20, desc: "Potencia investigativa de la región." },
    { name: "Universidad del Valle", type: "Pública", diff: 15, desc: "Líder indiscutible del occidente." },
    { name: "Universidad de los Andes", type: "Privada", diff: 15, desc: "Exige alto puntaje para becas y apoyos." },
    { name: "Univ. Distrital Francisco José de Caldas", type: "Pública", diff: 10, desc: "Fuerte enfoque en ingeniería y arte." },
    { name: "Pontificia Universidad Javeriana", type: "Privada", diff: 5, desc: "Humanismo y excelencia académica." },
    { name: "Universidad Pedagógica Nacional", type: "Pública", diff: 5, desc: "La mejor casa para formadores." },
    { name: "Universidad del Rosario", type: "Privada", diff: 0, desc: "Tradición histórica en leyes y salud." },
    { name: "Universidad Externado de Colombia", type: "Privada", diff: 0, desc: "Pionera en ciencias sociales." },
    { name: "Universidad de Cundinamarca", type: "Pública", diff: -10, desc: "Excelente proyección regional." },
    { name: "Politécnico Grancolombiano", type: "Privada", diff: -20, desc: "Vanguardia en medios y negocios." },
    { name: "SENA (Servicios Tecnológicos)", type: "Pública", diff: -50, desc: "Formación técnica de alto impacto laboral." }
  ], []);

  const PETROGLIFOS = [
    "M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10zm0 4a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
    "M12 4V2M12 22v-2M4 12H2M22 12h-2M6.34 6.34L4.93 4.93M17.66 17.66l1.41 1.41M6.34 17.66l-1.41 1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    "M12 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z M12 5v12 M12 8H8V5 M12 8h4V5 M12 15H8v3 M12 15h4v3 M12 17q0 4 4 5"
  ];
  
  const LOADING_PHRASES = [
    "Leyendo las hojas del frailejón...",
    "Interpretando el eco de la montaña...",
    "Escuchando los ríos subterráneos...",
    "Consultando a los ancestros..."
  ];

  useEffect(() => {
    if (step === 'analyzing_aura' || step === 'generating_questions') {
      const interval = setInterval(() => {
        setLoadingTextIdx(i => (i + 1) % LOADING_PHRASES.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const getTraitIcon = (t) => {
    switch(t) {
      case 'ing': return 'settings'; case 'salud': return 'flower';
      case 'neg': return 'target'; case 'arte': return 'butterfly';
      case 'ciencia': return 'eye'; default: return 'leaf';
    }
  };

  const startMysticJourney = async () => {
    FX.play('nav');
    setStep('generating_questions');
    try {
      const qs = await fetchOracleDynamicQuestions();
      setCurrentQuiz(qs);
      setQuizPhase(1);
      setQuizStep(0);
      setAnswers([]);
      setStep('quiz');
    } catch (error) {
      pushNotif("La neblina es muy densa, pero recordé unos viejos enigmas.");
      setStep('menu');
    }
  };

  const askMoreQuestions = async () => {
    FX.play('nav');
    setStep('generating_questions');
    try {
      const qs = await fetchOracleDynamicQuestions();
      setCurrentQuiz(qs);
      setQuizPhase(p => p + 1);
      setQuizStep(0);
      setStep('quiz');
    } catch (error) {
      pushNotif("El páramo está en silencio. Usa el catálogo manual.");
      setStep('calc');
    }
  };

  const handleQuizAnswer = (textOpt) => {
    FX.play('tap'); FX.vibrate('light');
    const newAnswers = [...answers, textOpt];
    setAnswers(newAnswers);
    
    if (quizStep < currentQuiz.length - 1) {
      setQuizStep(q => q + 1);
    } else {
      setStep('analyzing_aura');
      FX.play('levelUp');
      
      fetchOracleVision(newAnswers, REAL_CAREERS, COLOMBIAN_UNIS)
        .then(aiResult => {
          const mappedSuggestions = aiResult.suggestions.map(s => {
            const foundCareer = REAL_CAREERS.find(c => c.name === s.c) || REAL_CAREERS[0];
            const foundUni    = COLOMBIAN_UNIS.find(u => u.name === s.u) || COLOMBIAN_UNIS[0];
            return { cObj: foundCareer, uObj: foundUni, desc: s.desc };
          });
          
          setAuraText(aiResult.aura);
          setSuggestions(mappedSuggestions);
          setStep('suggestions');
          FX.play('success');
        })
        .catch(() => {
          setAuraText("Los ancestros susurran, pero el viento oculta las palabras. Tu destino te espera aquí:");
          const fallback = [
            { cObj: REAL_CAREERS[0], uObj: COLOMBIAN_UNIS[0], desc: "Tienes el temple necesario para este camino." },
            { cObj: REAL_CAREERS[12], uObj: COLOMBIAN_UNIS[4], desc: "La estructura y la lógica guiarán tus pasos." }
          ];
          setSuggestions(fallback);
          setStep('suggestions');
        });
    }
  };

  const selectSuggestion = (sugg) => {
    FX.play('nav');
    setCareer(sugg.cObj);
    setUni(sugg.uObj);
    setStep('calc');
  };

  const analyzeDestiny = () => {
    if (!career || !uni) { pushNotif('Elige una carrera y universidad para continuar.'); return; }
    if (icfesTotal === 0) { pushNotif('Se requiere al menos un simulacro para pesar tus conocimientos.'); return; }

    FX.play('levelUp');
    setAnalyzing(true);
    
    setTimeout(() => {
      const targetScore = career.cutoff + uni.diff;
      const difference = avgScore - targetScore;
      
      let rawProb = 70 + (difference * 0.8);
      rawProb += (Math.random() * 6 - 3); 
      
      const finalProb = Math.min(99, Math.max(1, Math.floor(rawProb)));
      
      let msg = "";
      if (finalProb >= 85) msg = `¡Qué perrenque! El corte estimado para ${career.name} allí es de ${targetScore} pts. Tu promedio reciente de ${avgScore} te da un cupo seguro.`;
      else if (finalProb >= 60) msg = `Estás en la pelea. El corte es de ~${targetScore} pts. Tu promedio de ${avgScore} aguanta, pero no te me duermas. ¡Aprieta el estudio!`;
      else if (finalProb >= 35) msg = `Pille pues, la cosa está peluda. El corte es ~${targetScore} pts. Con tu promedio de ${avgScore}, toca sudar la gota gorda y mejorar ese ICFES.`;
      else msg = `Seamos francos, parcero: el corte es muy alto (~${targetScore} pts) y tu promedio es ${avgScore}. O evalúas otra opción, o te encierras a estudiar el triple.`;

      setResult({ prob: finalProb, msg, targetScore });
      setAnalyzing(false);
      setStep('result');
      FX.play('success'); 
    }, 4500);
  };

  const renderCatalog = () => {
    const isCareer = activeCatalog === 'career';
    const list = isCareer ? REAL_CAREERS : COLOMBIAN_UNIS;
    const filtered = list.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      <Card C={C} isLight={isLight} className="fi" style={{ padding: '20px', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', height: '70vh', background: 'rgba(10, 10, 15, 0.95)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.text, letterSpacing: 1 }}>{isCareer ? 'CATÁLOGO DE CAMINOS' : 'CATÁLOGO DE INSTITUCIONES'}</div>
          <button onClick={() => setActiveCatalog(null)} style={{ background: 'none', border: 'none', color: C.textMuted, fontSize: 24, cursor: 'pointer', padding: '0 10px' }}>×</button>
        </div>
        
        <input autoFocus placeholder={`Buscar ${isCareer ? 'carrera...' : 'universidad...'} pille pues`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, borderRadius: 12, color: C.text, fontSize: 14, outline: 'none', marginBottom: 16 }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', flex: 1, paddingRight: 4 }}>
          {filtered.map((item, i) => (
            <button key={i} onClick={() => { isCareer ? setCareer(item) : setUni(item); setActiveCatalog(null); setSearchTerm(''); FX.play('tap'); }} style={{
              background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px',
              textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', gap: 6, transition: 'all 0.2s'
            }} onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${C.accent}15, rgba(255,255,255,0.02))`; e.currentTarget.style.border = `1px solid ${C.accent}50`; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.border = `1px solid ${C.border}`; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {isCareer && <PkIc n={item.icon} s={16} c={C.accent} />}
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{item.name}</span>
                </div>
                {!isCareer && (
                  <span style={{ fontSize: 9, background: item.type === 'Pública' ? '#34D39915' : '#60A5FA15', color: item.type === 'Pública' ? '#34D399' : '#60A5FA', padding: '4px 8px', borderRadius: 4, fontWeight: 800 }}>{item.type}</span>
                )}
              </div>
              <span style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.4 }}>
                {item.desc}
              </span>
            </button>
          ))}
          {filtered.length === 0 && <div style={{ textAlign: 'center', color: C.textMuted, marginTop: 20 }}>No se encontraron registros en el papiro.</div>}
        </div>
      </Card>
    );
  };

  return (
    <div className="fi" style={{ display: 'flex', flexDirection: 'column', gap: 20, minHeight: '100%', position: 'relative' }}>
      
      {/* 🔥 FONDO MÍSTICO OBSIDIANA: Cero Café, Negro Profundo y Transparente 🔥 */}
      <div style={{ position: 'fixed', inset: 0, background: `linear-gradient(180deg, ${C.bg} 0%, #000000 100%)`, zIndex: -2 }} />
      <div style={{ position: 'fixed', top: '-20%', left: '-20%', width: '140%', height: '140%', opacity: 0.03, pointerEvents: 'none', zIndex: -1, display: 'flex', flexWrap: 'wrap', gap: 40, animation: 'spin 120s linear infinite' }}>
        {Array.from({length: 12}).map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" fill="none" stroke={C.textMid} strokeWidth="1" style={{ width: 120, height: 120 }}>
            <path d={PETROGLIFOS[i % 3]} />
          </svg>
        ))}
      </div>
      {/* Luciérnagas sutiles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1 }}>
         {Array.from({length: 8}).map((_, i) => (
           <div key={i} style={{
             position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: C.accent,
             boxShadow: `0 0 8px ${C.accent}`, opacity: 0, left: `${10 + Math.random()*80}%`, bottom: `${10 + Math.random()*40}%`,
             animation: `sparkFloat ${3 + Math.random()*4}s ease-in infinite ${Math.random()*4}s`
           }} />
         ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
        <button onClick={() => {
          if (activeCatalog) { setActiveCatalog(null); return; }
          if (step === 'menu') onBack();
          else if (step === 'calc' && suggestions.length > 0) setStep('suggestions');
          else if (step === 'result') setStep('calc');
          else setStep('menu');
        }} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          <PkIc n="left" s={18} c={C.text} />
        </button>
        <div>
          <div className="serif" style={{ fontSize: 24, fontWeight: 700, color: C.text, textShadow: `0 2px 10px rgba(0,0,0,0.5)` }}>La Visión</div>
          <div style={{ fontSize: 11, color: C.accent, fontWeight: 800, letterSpacing: 1.5 }}>SABIDURÍA DEL SUMAPAZ</div>
        </div>
      </div>

      {activeCatalog ? (
        <div style={{ position: 'relative', zIndex: 1 }}>{renderCatalog()}</div>
      ) : (
        <>
          {/* ── 1. MENÚ PRINCIPAL ── */}
          {step === 'menu' && (
            <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20, position: 'relative', zIndex: 1 }}>
              <div className="serif" style={{ fontSize: 15, color: C.textMid, lineHeight: 1.6, textAlign: 'center', marginBottom: 10, padding: '0 10px', fontStyle: 'italic' }}>
                "Acércate. Las aguas frías guardan el destino de los que se atreven a soñar. ¿Qué camino deseas tomar hoy?"
              </div>
              <button onClick={startMysticJourney} style={{
                background: `linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2))`, border: `1px solid ${C.accent}40`, borderRadius: 20, padding: '24px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)', backdropFilter: 'blur(10px)',
                boxShadow: `0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`
              }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.border = `1px solid ${C.accent}80`; e.currentTarget.style.boxShadow = `0 15px 40px rgba(0,0,0,0.4), inset 0 0 20px ${C.accent}15`; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = `1px solid ${C.accent}40`; e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`; }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${C.accent}20, transparent)`, border: `1px solid ${C.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PkIc n="eye" s={26} c={C.accent} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.text, letterSpacing: 1 }}>"Guíame, Sabio. Estoy perdido"</div>
                <div style={{ fontSize: 12, color: C.textMuted, textAlign: 'center', lineHeight: 1.5 }}>Los ancestros formularán enigmas únicos sobre el páramo para revelar tu verdadera vocación.</div>
              </button>
              
              <button onClick={() => setStep('calc')} style={{
                background: `linear-gradient(145deg, rgba(255,255,255,0.02), rgba(0,0,0,0.2))`, border: `1px solid ${C.borderStrong}`, borderRadius: 20, padding: '24px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)', backdropFilter: 'blur(10px)'
              }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.border = `1px solid ${C.textMuted}`; e.currentTarget.style.background = `linear-gradient(145deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))`; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = `1px solid ${C.borderStrong}`; e.currentTarget.style.background = `linear-gradient(145deg, rgba(255,255,255,0.02), rgba(0,0,0,0.2))`; }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `rgba(255,255,255,0.03)`, border: `1px solid ${C.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PkIc n="target" s={26} c={C.textMuted} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.text, letterSpacing: 1 }}>"Ya tengo mi destino claro"</div>
                <div style={{ fontSize: 12, color: C.textMuted, textAlign: 'center', lineHeight: 1.5 }}>Usa la balanza del ICFES para ver si te alcanza el puntaje en la universidad real.</div>
              </button>
            </div>
          )}

          {/* ── ESTADO: INVENTANDO PREGUNTAS MÍSTICAS ── */}
          {step === 'generating_questions' && (
            <div className="fi" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, position: 'relative', zIndex: 1, marginTop: 80 }}>
              <div style={{ position: 'relative', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px dashed ${C.textMuted}`, animation: 'spin 6s linear infinite' }} />
                <div style={{ position: 'absolute', inset: -15, borderRadius: '50%', border: `1px solid ${C.border}`, borderRightColor: C.accent, animation: 'spin 3s linear infinite reverse' }} />
                <PkIc n="sabio" s={36} c={C.textMid} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.text, letterSpacing: 3, animation: 'pulse 2s infinite', textAlign: 'center' }}>
                ESCUCHANDO AL PÁRAMO...
              </div>
              <div style={{ fontSize: 12, color: C.accent, marginTop: 10, fontStyle: 'italic', fontWeight: 600 }}>{LOADING_PHRASES[loadingTextIdx]}</div>
            </div>
          )}

          {/* ── 2. EL QUIZ MÍSTICO (Cristal Oscuro) ── */}
          {step === 'quiz' && currentQuiz.length > 0 && (
            <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 10, position: 'relative', zIndex: 1 }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 800, letterSpacing: 1.5 }}>
                  VISIÓN {quizStep + 1} DE {currentQuiz.length}
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {currentQuiz.map((_, i) => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i <= quizStep ? C.accent : C.border, boxShadow: i === quizStep ? `0 0 8px ${C.accent}` : 'none', transition: 'all 0.4s' }} />)}
                </div>
              </div>
              
              <div className="serif" style={{ fontSize: 20, color: C.text, lineHeight: 1.4, marginBottom: 20, padding: '0 10px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                {currentQuiz[quizStep]?.q}
              </div>
                
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {currentQuiz[quizStep]?.options?.map((opt, i) => (
                  <button key={i} onClick={() => handleQuizAnswer(opt.text)} className="su" style={{
                    animationDelay: `${i * 0.05}s`, background: `rgba(255,255,255,0.02)`, border: `1px solid ${C.border}`, borderRadius: 16, padding: '16px', display: 'flex', alignItems: 'center', gap: 16, color: C.textMid, cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)', fontFamily: 'inherit', backdropFilter: 'blur(8px)'
                  }} 
                  onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${C.accent}60`; e.currentTarget.style.background = `linear-gradient(145deg, ${C.accent}15, rgba(255,255,255,0.02))`; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 25px rgba(0,0,0,0.3)`; }}
                  onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${C.border}`; e.currentTarget.style.background = `rgba(255,255,255,0.02)`; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    
                    <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: `rgba(0,0,0,0.4)`, border: `1px solid ${C.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PkIc n={getTraitIcon(opt.trait)} s={18} c={C.textMuted} sw={1.5} />
                    </div>
                    
                    <div style={{ fontSize: 14, textAlign: 'left', lineHeight: 1.4, fontWeight: 500, color: C.text }}>
                      {opt.text}
                    </div>
                  </button>
                ))}
              </div>

              {/* BOTÓN SALVAVIDAS */}
              <div style={{ marginTop: 10, textAlign: 'center' }}>
                <button onClick={askMoreQuestions} style={{ background: 'transparent', border: 'none', color: C.textMuted, fontSize: 13, fontWeight: 600, padding: '10px 20px', cursor: 'pointer', fontFamily: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
                  ↻ Ninguna opción soy yo. Saca otro enigma.
                </button>
              </div>

            </div>
          )}

          {/* ── 3. CARGANDO AURA (ASTROLABIO) ── */}
          {step === 'analyzing_aura' && (
            <div className="fi" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, position: 'relative', zIndex: 1, marginTop: 80 }}>
              <div style={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px solid ${C.accent}30`, animation: 'spin 8s linear infinite' }} />
                <div style={{ position: 'absolute', inset: 15, borderRadius: '50%', border: `2px dashed ${C.accent}60`, animation: 'spin 4s linear infinite reverse' }} />
                <div style={{ position: 'absolute', inset: 30, borderRadius: '50%', background: `radial-gradient(circle, ${C.accent}30 0%, transparent 70%)`, animation: 'celestialPulse 2s ease-in-out infinite' }} />
                <PkIc n="eye" s={30} c={C.accent} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.accent, letterSpacing: 3, animation: 'pulse 2s infinite' }}>REVELANDO TU CAMINO...</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 10, fontStyle: 'italic' }}>{LOADING_PHRASES[loadingTextIdx]}</div>
            </div>
          )}

          {/* ── 4. RECOMENDACIONES MÍSTICAS ── */}
          {step === 'suggestions' && (
            <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10, position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center', marginBottom: 6 }}>
                <div className="serif" style={{ fontSize: 24, color: C.text, marginBottom: 4 }}>Tu Destino</div>
              </div>
              
              <div style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.03), transparent)`, padding: '20px', borderRadius: 16, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.accent}`, marginBottom: 8, fontStyle: 'italic', color: C.textMid, fontSize: 14, lineHeight: 1.6, backdropFilter: 'blur(10px)' }}>
                "{auraText}"
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '45vh', overflowY: 'auto', paddingRight: 5 }}>
                {suggestions.map((sugg, i) => (
                  <Card key={i} C={C} isLight={isLight} onClick={() => selectSuggestion(sugg)} style={{ padding: '18px', border: `1px solid ${C.border}`, cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${C.accent}60`; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = `linear-gradient(145deg, ${C.accent}10, rgba(255,255,255,0.02))`; }} 
                    onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${C.border}`; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 38, height: 38, background: `rgba(0,0,0,0.3)`, border: `1px solid ${C.borderStrong}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <PkIc n={sugg.cObj.icon} s={18} c={C.text} />
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{sugg.cObj.name}</div>
                      </div>
                      <PkIc n="right" s={14} c={C.textMuted} />
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 6, letterSpacing: 0.5 }}>🎓 {sugg.uObj.name}</div>
                    <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>{sugg.desc}</div>
                  </Card>
                ))}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                <button onClick={askMoreQuestions} style={{ background: 'transparent', border: `1px dashed ${C.borderStrong}`, borderRadius: 14, padding: '16px', color: C.textMuted, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.border = `1px dashed ${C.text}`} onMouseLeave={e => e.currentTarget.style.border = `1px dashed ${C.borderStrong}`}>
                  Aún no siento conexión. Echa otro vistazo.
                </button>
              </div>
            </div>
          )}

          {/* ── 5. CALCULADORA MANUAL ESTRICTA ── */}
          {step === 'calc' && (
            <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10, position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 4, padding: '0 10px' }}>
                Ponga sus opciones en la balanza y veamos si el puntaje aguanta.
              </div>
              <Card C={C} isLight={isLight} style={{ padding: '24px', border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: 1 }}>TU VOCACIÓN</label>
                      <button onClick={() => setActiveCatalog('career')} style={{ background: `transparent`, border: `none`, color: C.accent, fontSize: 11, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Explorar 📚</button>
                    </div>
                    <button onClick={() => setActiveCatalog('career')} style={{ width: '100%', padding: '16px', background: 'rgba(0,0,0,0.2)', border: `1px solid ${C.borderStrong}`, borderRadius: 12, color: career ? C.text : C.textMuted, fontSize: 15, fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit', transition: 'border 0.2s' }} onMouseEnter={e => e.currentTarget.style.border = `1px solid ${C.accent}50`} onMouseLeave={e => e.currentTarget.style.border = `1px solid ${C.borderStrong}`}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 10 }}>
                        {career ? <><PkIc n={career.icon} s={16} c={C.text}/> {career.name}</> : 'Toca para elegir...'}
                      </span>
                      <PkIc n="right" s={14} c={C.textMuted} />
                    </button>
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: 1 }}>LA INSTITUCIÓN</label>
                      <button onClick={() => setActiveCatalog('uni')} style={{ background: `transparent`, border: `none`, color: C.accent, fontSize: 11, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Explorar 🏫</button>
                    </div>
                    <button onClick={() => setActiveCatalog('uni')} style={{ width: '100%', padding: '16px', background: 'rgba(0,0,0,0.2)', border: `1px solid ${C.borderStrong}`, borderRadius: 12, color: uni ? C.text : C.textMuted, fontSize: 15, fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit', transition: 'border 0.2s' }} onMouseEnter={e => e.currentTarget.style.border = `1px solid ${C.accent}50`} onMouseLeave={e => e.currentTarget.style.border = `1px solid ${C.borderStrong}`}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{uni ? uni.name : 'Toca para elegir...'}</span>
                      <PkIc n="right" s={14} c={C.textMuted} />
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: 32 }}>
                  <button onClick={analyzeDestiny} disabled={analyzing || !career || !uni} style={{
                    width: '100%', padding: '16px', borderRadius: 14, cursor: (analyzing || !career || !uni) ? 'default' : 'pointer',
                    background: (analyzing || !career || !uni) ? C.bgAlt : `linear-gradient(135deg, ${C.text}, ${C.textMid})`,
                    border: (analyzing || !career || !uni) ? `1px solid ${C.border}` : 'none',
                    color: (analyzing || !career || !uni) ? C.textMuted : C.bg, fontSize: 14, fontWeight: 800, transition: 'all 0.3s', fontFamily: 'inherit',
                    boxShadow: (analyzing || !career || !uni) ? 'none' : `0 8px 25px rgba(255,255,255,0.15)`
                  }}>
                    {analyzing ? 'Calculando destino...' : 'Pesar en la balanza'}
                  </button>
                </div>
              </Card>
              
              <div style={{ textAlign: 'center', fontSize: 12, color: C.textMuted }}>
                Basado en tu promedio histórico de <strong>{avgScore} pts</strong>.
              </div>
            </div>
          )}

          {/* ── 6. RESULTADO FINAL ── */}
          {step === 'result' && result && (
            <div className="su" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30, position: 'relative', zIndex: 1 }}>
              <div style={{ position: 'relative', width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `3px dashed ${result.prob >= 80 ? '#34D399' : result.prob >= 50 ? C.amberMid : '#EF4444'}`, animation: 'spin 12s linear infinite' }} />
                <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: `radial-gradient(circle, ${result.prob >= 80 ? '#34D399' : result.prob >= 50 ? C.amberMid : '#EF4444'}10 0%, transparent 60%)` }} />
                <div style={{ fontSize: 48, fontWeight: 900, color: result.prob >= 80 ? '#34D399' : result.prob >= 50 ? C.amberMid : '#EF4444', fontFamily: "'Fraunces', serif" }}>
                  {result.prob}%
                </div>
              </div>

              <div style={{ marginTop: 30, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>Viabilidad de Ingreso</div>
                <div style={{ fontSize: 15, color: C.text, marginTop: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <PkIc n={career?.icon} s={16} c={C.textMuted} /> {career?.name}
                </div>
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{uni?.name}</div>
              </div>

              <Card C={C} isLight={isLight} style={{ padding: '24px 20px', marginTop: 24, border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>
                <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.6 }}>{result.msg}</div>
              </Card>

              <button onClick={() => { setStep('calc'); setResult(null); }} style={{ marginTop: 30, background: 'transparent', border: `1px solid ${C.borderStrong}`, padding: '14px 28px', borderRadius: 99, color: C.textMuted, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = C.text; e.currentTarget.style.border = `1px solid ${C.textMuted}`; }} onMouseLeave={e => { e.currentTarget.style.color = C.textMuted; e.currentTarget.style.border = `1px solid ${C.borderStrong}`; }}>
                Nueva consulta
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────
//  APP PRINCIPAL
// ─────────────────────────────────────────────
export default function App() {
  const saved = load();

  const [screen, setScreen]       = useState('splash');
  const [themeKey, setThemeKey]   = useState(saved?.themeKey || 'rupestre_dark');
  const [globalSenseiQ, setGlobalSenseiQ] = useState(null);
  const [tab, setTab]             = useState('inicio');
  const [user, setUser]           = useState(saved?.user || null);
  const [appState, setAppState]   = useState(saved?.appState || freshState());
  const [books, setBooks]         = useState(saved?.books || []);
  const [notes, setNotes]         = useState([]);
  const [noteText, setNoteText]   = useState('');
  const [notifications, setNotifications] = useState(saved?.notifications || []);
  const [showNotif, setShowNotif] = useState(false);
  const [toast, setToast]         = useState(null);
  const [partnerOnline, setPartnerOnline] = useState(false);
  const [partnerPhotoURL, setPartnerPhotoURL] = useState(null);
  const [fbLoaded, setFbLoaded]   = useState(false);
  const [ambientOn, setAmbientOn] = useState(saved?.ambientOn || false); // ✅ NEW: ambientación de fondo
  const [perfilStartView, setPerfilStartView] = useState('profile'); // a qué vista abrir el Perfil
  const [identityMenu, setIdentityMenu] = useState(false); // menú desplegable de identidad (estilo Duolingo)
const seenNotifsRef = useRef(new Set()); // Para no spamear al usuario con la misma noti
  // ✅ NEW: Animation states
  const [coinBurst, setCoinBurst]         = useState(null); // { amount, key }
  const [levelUpData, setLevelUpData]     = useState(null); // { newLevel }
  const [achToast, setAchToast]           = useState(null); // achievement object
  const [streakCelebration, setStreakCelebration] = useState(null); // ✅ momentazo de racha
  const prevLevelRef = useRef(computeLevel(appState.xp || 0).level);
  const achQueueRef  = useRef([]);
  const processingAch = useRef(false);

  // Tema base + color custom
  const rupestreTheme = {
    bg: '#0F0D0C', bgAlt: '#1A1715', text: '#F5F2EB', textMid: '#D4CDC4', textMuted: '#A39C95',
    border: '#2A2624', borderStrong: '#3D3835', accent: '#D4AF37', accentBg: '#D4AF3715',
    amberMid: '#F59E0B', blueMid: '#38BDF8', tealBg: '#064E3B', tealMid: '#10B981',
    glassOpacity: '0.03', glassBorder: 'rgba(255,255,255,0.05)'
  };
  const macondoTheme = {
    bg: '#150F0C', bgAlt: '#221813', text: '#F5EDE3', textMid: '#D8C8B8', textMuted: '#A89483',
    border: '#322419', borderStrong: '#473529', accent: '#E08A5B', accentBg: '#E08A5B15',
    amberMid: '#E8A04B', blueMid: '#C97B6B', tealBg: '#3A1E14', tealMid: '#D98B5C',
    glassOpacity: '0.03', glassBorder: 'rgba(255,255,255,0.05)'
  };
  const LOCAL_THEMES = { rupestre_dark: rupestreTheme, sakura_dark: macondoTheme };
  const baseTheme = LOCAL_THEMES[themeKey] || T[themeKey] || rupestreTheme;
  const C = appState.customColor
    ? { ...baseTheme, accent: appState.customColor, accentMid: appState.customColor }
    : baseTheme;
  const isLight = themeKey.includes('light');
  const isSakura = themeKey === 'sakura_dark';

  // ✅ NEW: Trigger coin burst
  const triggerCoinBurst = useCallback((amount) => {
    if (!amount || amount <= 0) return;
    setCoinBurst({ amount, key: Date.now() });
    setTimeout(() => setCoinBurst(null), 1500);
  }, []);

  // ✅ NEW: Queue achievement toasts (one at a time)
  const showNextAch = () => {
    if (achQueueRef.current.length === 0) { processingAch.current = false; return; }
    const next = achQueueRef.current.shift();
    setAchToast(next);
  };
  const queueAchievement = (ach) => {
    achQueueRef.current.push(ach);
    if (!processingAch.current) { processingAch.current = true; showNextAch(); }
  };

  // ✅ NEW: Mission reward callback
  const handleMissionReward = (ryoAmt, xpAmt) => {
    triggerCoinBurst(ryoAmt);
  };

  // ✅ NEW: Level-up detector
  useEffect(() => {
    const newLevel = computeLevel(appState.xp || 0).level;
    if (newLevel > prevLevelRef.current) {
      setLevelUpData({ newLevel });
    }
    prevLevelRef.current = newLevel;
  }, [appState.xp]);

  // Firebase: inyectar
  useEffect(() => {
    injectFirebase();
    const checkFb = setInterval(() => {
      if (window.__FB_READY && window.__FB) { setFbLoaded(true); clearInterval(checkFb); }
    }, 100);
    return () => clearInterval(checkFb);
  }, []);

  // Sonido de bienvenida al llegar a la app
  useEffect(() => {
    if (screen === 'app') {
      const t = setTimeout(() => FX.play('welcome'), 350);
      return () => clearTimeout(t);
    }
  }, [screen]);
// Ambientación: arranca/cambia la pista de fondo según el tema activo
  useEffect(() => {
    FX.toggleAmbient(ambientOn, themeKey, AMBIENT_TRACKS);
  }, [ambientOn, themeKey]);
  // Motor de vigilancia de notificaciones (duelos + solicitudes entrantes)
  useEffect(() => {
    if (!fbLoaded || !user?.code) return;
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') requestNotifPermission();

    const { db, ref, onValue } = window.__FB;

    const duelsUnsub = onValue(ref(db, `duels/${user.code}`), snap => {
      if (!snap.exists()) return;
      Object.values(snap.val()).forEach(d => {
        if (d.status === 'pending' && !seenNotifsRef.current.has(d.id)) {
          seenNotifsRef.current.add(d.id);
          if (Date.now() - d.ts < 120000) {
            sendPushNotif('¡DUELO A MUERTE!', `Pille pues: @${d.fromName} le apostó ${d.wager} empanadas a que le gana. ¿Se va a arrugar?`, `duel-${d.id}`);
            pushNotif(`@${d.fromName} te retó a un duelo`);
          }
        }
      });
    });

    const reqUnsub = onValue(ref(db, `friendRequests/${user.code}`), snap => {
      if (!snap.exists()) return;
      Object.values(snap.val()).forEach(req => {
        if (req.status === 'pending' && !seenNotifsRef.current.has(`req_${req.fromCode}`)) {
          seenNotifsRef.current.add(`req_${req.fromCode}`);
          if (Date.now() - req.ts < 120000) {
            sendPushNotif('Nueva alianza en el páramo', `@${req.fromName} quiere ser tu parcero en Pankey.`, `req-${req.fromCode}`);
            pushNotif(`@${req.fromName} quiere ser tu aliado`);
          }
        }
      });
    });

    return () => { duelsUnsub(); reqUnsub(); };
  }, [fbLoaded, user?.code]);

  // Persistencia
  useEffect(() => {
    if (user) save({ user, appState, books, themeKey, notifications, ambientOn });
    if (fbOK() && user?.code) {
      try {
        const lvl = computeLevel(appState.xp || 0).level;
        FB().update(FB().ref(FB().db, `users/${user.code}`), {
          appState, books,
          equipped: appState.equipped || null,
          ryo: appState.ryo || 0,
          xp: appState.xp || 0,
          level: lvl,
          streakDays: appState.streakDays || 0,
          totalMinutesRead: appState.totalMinutesRead || 0
        });
      } catch(e) {}
    }
  }, [user, appState, books, themeKey, notifications]);

  // Descarga multi-dispositivo
  useEffect(() => {
    if (fbLoaded && user?.code) {
      FB().get(FB().ref(FB().db, `users/${user.code}`)).then(snap => {
        if (snap.exists()) {
          const cloudData = snap.val();
          if (cloudData.appState) {
            const cloudXp = cloudData.appState.xp || 0;
            const localXp = appState.xp || 0;
            const cloudMins = cloudData.appState.totalMinutesRead || 0;
            const localMins = appState.totalMinutesRead || 0;
            
            // Si la nube detecta que tienes más XP o más minutos en otro lado, jala los datos
            if (cloudXp > localXp || cloudMins > localMins) {
              setAppState(cloudData.appState);
              if (cloudData.books) setBooks(cloudData.books);
              pushNotif("Datos sincronizados desde la nube ☁️");
            }
          }
        }
      });
    }
  }, [fbLoaded, user?.code]);

  // Reset diario + chequeo de racha rompible (con protección del Kodachi de Hielo)
  useEffect(() => {
    const today = todayStr();
    const last  = appState.lastConfirmedDate;
    if (!last || last === today) return; // nunca selló, o ya selló hoy → nada que romper

    // ¿Cuántos días COMPLETOS pasaron desde el último sello?
    const msPerDay = 86400000;
    const lastTime = new Date(last).setHours(0, 0, 0, 0);
    const nowTime  = new Date(today).setHours(0, 0, 0, 0);
    const daysGap  = Math.round((nowTime - lastTime) / msPerDay);

    setAppState(s => {
      const base = { ...s, yourConfirmed: false, theirConfirmed: false, readingMinutesToday: 0 };

      // Selló ayer (gap 1): racha intacta, todavía tiene hoy para sellar
      if (daysGap <= 1) return base;

      // Faltó exactamente un día (gap 2) Y tiene congelador → lo gastamos y salvamos
      if (daysGap === 2 && (s.streakFreezes || 0) > 0) {
        setTimeout(() => pushNotif(`Tu Kodachi de Hielo protegió tu racha de ${s.streakDays} días mientras no estabas.`), 800);
        return { ...base, streakFreezes: s.streakFreezes - 1, lastConfirmedDate: today };
        // Nota: actualizamos lastConfirmedDate a hoy para que "ayer" cuente como cubierto
      }

      // Hueco mayor, o gap 2 sin congelador → se rompe la racha
      if ((s.streakDays || 0) > 0) {
        const perdida = s.streakDays;
        setTimeout(() => pushNotif(`Se rompió tu racha de ${perdida} día${perdida !== 1 ? 's' : ''}. ¡A empezar de nuevo con toda, parce!`), 800);
      }
      return { ...base, streakDays: 0 };
    });
  }, []);

  // Firebase listener (sesión compartida)
  useEffect(() => {
    if (!user?.sessionId || !fbLoaded) return;
    const { db, ref, onValue, onDisconnect, update } = FB();
    const sessionRef = ref(db, `sessions/${user.sessionId}`);

    window.__FB.get(sessionRef).then(snap => {
      if (!snap.exists()) return;
      const amI1 = snap.val().user1Code === user.code;
      const myOnlineRef = ref(db, `sessions/${user.sessionId}/${amI1 ? 'user1Online' : 'user2Online'}`);
      onDisconnect(myOnlineRef).set(false);
      update(sessionRef, { [amI1 ? 'user1Online' : 'user2Online']: true });
    });

    const unsub = onValue(sessionRef, (snap) => {
      if (!snap.exists()) return;
      const d = snap.val();
      const amI1 = d.user1Code === user.code;
      const isToday = d.lastActivity && new Date(d.lastActivity).toDateString() === new Date().toDateString();
      const theirConf  = isToday ? (amI1 ? d.user2Confirmed : d.user1Confirmed) : false;
      const theirProg  = isToday ? (amI1 ? d.user2Progress : d.user1Progress) : 0;
      const theirPg    = amI1 ? d.user2Page       : d.user1Page;
      const theirOnl   = amI1 ? !!d.user2Online   : !!d.user1Online;
      const theirPhoto = amI1 ? d.user2PhotoURL   : d.user1PhotoURL;
      const theirBook  = amI1 ? d.user2Book       : d.user1Book;

      setPartnerOnline(theirOnl);
      if (theirPhoto !== undefined) setPartnerPhotoURL(theirPhoto || null);

      setAppState(s => {
        if (theirConf && !s.theirConfirmed) {
          showToast(`${user.partner} confirmó su lectura hoy`);
        }
        return {
          ...s,
          theirConfirmed: theirConf ?? s.theirConfirmed,
          theirProgress:  theirProg ?? s.theirProgress,
          theirPage:      theirPg   ?? s.theirPage,
          theirBook:      theirBook || null,
        };
      });
    });

    const unsubNotes = onValue(FB().ref(db, `sessions/${user.sessionId}/notes`), (snap) => {
      if (!snap.exists()) { setNotes([]); return; }
      const raw = snap.val();
      const arr = Object.entries(raw).map(([id, v]) => ({ ...v, id }));
      arr.sort((a, b) => (a.ts || 0) - (b.ts || 0));
      setNotes(arr);
    });

    return () => { unsub(); unsubNotes(); };
  }, [user?.sessionId, fbLoaded]);

  // Sync progreso libro en vivo
  useEffect(() => {
    if (fbLoaded && user?.sessionId) {
      const currentBook = books.find(b => b.id === appState.currentBookId);
      let pct = 0;
      if (currentBook) {
        const tPage = currentBook.totalPages || 0, cPage = appState.currentPage || 1;
        const tChap = currentBook.totalChapters || 10, cChap = appState.currentChapter || 1;
        pct = tPage > 0
          ? Math.min(100, Math.round((cPage / tPage) * 100))
          : Math.min(100, Math.round((cChap / tChap) * 100));
      }
      try {
        FB().get(FB().ref(FB().db, `sessions/${user.sessionId}`)).then(snap => {
          if (!snap.exists()) return;
          const amI1 = snap.val().user1Code === user.code;
          FB().update(FB().ref(FB().db, `sessions/${user.sessionId}`), {
            [amI1 ? 'user1Book' : 'user2Book']: currentBook ? { title: currentBook.title, author: currentBook.author, genre: currentBook.genre } : null,
            [amI1 ? 'user1Progress' : 'user2Progress']: pct
          });
        });
      } catch(e) {}
    }
  }, [appState.currentBookId, appState.currentChapter, appState.currentPage, books, user?.sessionId, fbLoaded]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800); };
  const pushNotif = (text) => {
    const n = { id: Date.now(), text, time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }), read: false };
    setNotifications(p => [n, ...p.slice(0, 19)]);
    showToast(text);
  };

  // ✅ FIXED: handleConfirm — solo streak (no depende de pareja), achievements pagan Ryō+XP
  const handleConfirm = async () => {
    if (appState.yourConfirmed) return;
    const today  = todayStr();
    const dayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    const book   = books.find(b => b.id === appState.currentBookId);
    const tPage  = book?.totalPages || 0, cPage = appState.currentPage || 1;
    const tChap  = book?.totalChapters || 10, cChap = appState.currentChapter || 1;
    const pct    = tPage > 0
      ? Math.min(100, Math.round((cPage / tPage) * 100))
      : Math.min(100, appState.yourProgress + Math.ceil(100 / tChap));

    const newStreak = appState.streakDays + 1; // ✅ FIX: solo streak
    const confirmXp = 30 + (newStreak >= 7 ? 20 : 0); // Bonus XP for streak milestones
    const confirmRyo = 5;

    setAppState(s => {
      const newAchievements = (s.achievements || []).map(a => {
        if (a.unlocked) return a;
        if (a.id === 1)  return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 2  && newStreak >= 7)  return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 3  && newStreak >= 14) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 5  && newStreak >= 21) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 8  && newStreak >= 30) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 9  && newStreak >= 50) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 16 && newStreak >= 100) return { ...a, unlocked: true, date: 'hoy' };
        return a;
      });

      // ✅ FIX: Pay ryo/xp for newly unlocked achievements
      const prevIds = (s.achievements || []).filter(a => a.unlocked).map(a => a.id);
      const newlyUnlocked = newAchievements.filter(a => a.unlocked && !prevIds.includes(a.id));
      const achRyo = newlyUnlocked.reduce((sum, a) => sum + (a.ryo || 0), 0);
      const achXp  = newlyUnlocked.reduce((sum, a) => sum + (a.xp  || 0), 0);

      // Queue achievement toasts
      newlyUnlocked.forEach(a => queueAchievement(a));

      return {
        ...s,
        yourConfirmed: true,
        yourProgress: pct,
        streakDays: newStreak,
        totalSessions: s.totalSessions + 1,
        lastConfirmedDate: today,
        ryo: (s.ryo || 0) + confirmRyo + achRyo,
        xp:  (s.xp  || 0) + confirmXp  + achXp,
        weekData: s.weekData.map((d, i) => i === dayIdx ? { ...d, you: true } : d),
        achievements: newAchievements,
      };
    });

    triggerCoinBurst(confirmRyo);
    setStreakCelebration(newStreak); // ✅ ¡El momentazo!

    if (fbOK() && user?.sessionId) {
      const snap = await FB().get(FB().ref(FB().db, `sessions/${user.sessionId}`));
      const amI1 = snap.exists() ? snap.val().user1Code === user.code : true;
      await FB().update(FB().ref(FB().db, `sessions/${user.sessionId}`), {
        [amI1 ? 'user1Confirmed' : 'user2Confirmed']: true,
        [amI1 ? 'user1Progress'  : 'user2Progress']:  pct,
        [amI1 ? 'user1Page'      : 'user2Page']:      cPage,
        lastActivity: Date.now(),
      });
    }
    pushNotif(`¡Racha de ${newStreak} día${newStreak > 1 ? 's' : ''}! +${confirmRyo} empanadas`);
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    const note = {
      who: user?.code || 'you', whoName: user?.name || 'Tú',
      text: noteText.trim(),
      time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
      ts: Date.now(),
    };
    if (fbOK() && user?.sessionId) {
      await FB().push(FB().ref(FB().db, `sessions/${user.sessionId}/notes`), note);
    } else {
      setNotes(p => [...p, { ...note, id: Date.now().toString() }]);
    }
    setNoteText('');
  };

  const handleAddBook = (book) => {
    const nb = { ...book, id: Date.now().toString(), timeRead: 0 };
    setBooks(p => [...p, nb]);
    if (!appState.currentBookId) {
      setAppState(s => ({ ...s, currentBookId: nb.id, currentChapter: 1, currentPage: 1, yourProgress: 0, theirProgress: 0 }));
    }
    pushNotif(`"${book.title}" añadido`);
  };

  const currentBook = books.find(b => b.id === appState.currentBookId) || null;
  const unreadCount = notifications.filter(n => !n.read).length;

 // Pantallas de flujo
  if (screen === 'splash')     return <><style>{globalStyles}</style><Splash C={C} onDone={() => setScreen(user?.code ? 'app' : 'onboarding')} /></>;
  
  if (screen === 'onboarding') return (
    <><style>{globalStyles}</style>
    <Onboarding C={C} isLight={isLight} onDone={(data) => {
      // Magia: Separamos los datos del usuario de su progreso en la nube
      const { appState: cloudAppState, books: cloudBooks, ...basicUser } = data;
      
      setUser(basicUser); 
      // ¡Aquí estaba el error! Ahora sí cargamos el progreso y los libros de la nube
      if (cloudAppState) setAppState(cloudAppState);
      if (cloudBooks) setBooks(cloudBooks);
      
      // Si el usuario ya tiene pareja o sesión, va directo a la app. Si no, a conectarse.
      if (basicUser.partnerCode || basicUser.sessionId) {
        setScreen('app');
        setTimeout(() => pushNotif(`¡Bienvenido de vuelta, ${basicUser.name}!`), 1000);
      } else {
        setScreen('connect');
      }
    }} /></>
  );

  if (screen === 'connect')    return (
    <><style>{globalStyles}</style>
    <Connect C={C} isLight={isLight} user={user}
      onDone={({ partnerName, sessionId: sid, partnerCode }) => {
        setUser(u => ({ ...u, partner: partnerName, partnerCode, partnerConnected: true, sessionId: sid }));
        setScreen('app');
        pushNotif(`Conectado con ${partnerName}`);
      }}
      onSkip={() => setScreen('app')}
    /></>
  );

  // App principal
  // ── RUTAS PRINCIPALES ──
  const NAV_TABS = [
    { id: 'inicio',   icon: 'home' },
    { id: 'icfes',    icon: 'rana' },
    { id: 'books',    icon: 'pergamino' },
    { id: 'friends',  icon: 'people' },
  ];

  return (
    <>
    <style>{globalStyles}</style>
    <div style={{ width: '100%', maxWidth: 430, height: '100dvh', display: 'flex', flexDirection: 'column', background: C.bg, color: C.text, position: 'relative', margin: '0 auto', overflow: 'hidden' }}>
      <TexturaFondo C={C} />
      {isSakura && <SakuraFalling />}
      {coinBurst && <CoinBurst key={coinBurst.key} amount={coinBurst.amount} C={C} />}
      {levelUpData && <LevelUpModal newLevel={levelUpData.newLevel} C={C} onClose={() => setLevelUpData(null)} />}
      {achToast && <AchievementToast achievement={achToast} C={C} onDone={() => { setAchToast(null); setTimeout(showNextAch, 400); }} />}
      {fbLoaded && user?.code && <DuelController C={C} isLight={isLight} user={user} appState={appState} setAppState={setAppState} pushNotif={pushNotif} />}
      {streakCelebration !== null && <StreakCelebration streak={streakCelebration} C={C} onClose={() => setStreakCelebration(null)} />}
      {isSakura && <SakuraFalling />}

      {/* ✅ NEW: Coin Burst overlay */}
      {coinBurst && <CoinBurst key={coinBurst.key} amount={coinBurst.amount} C={C} />}

      {/* ✅ NEW: Level Up Modal */}
      {levelUpData && <LevelUpModal newLevel={levelUpData.newLevel} C={C} onClose={() => setLevelUpData(null)} />}

      {/* ✅ NEW: Achievement Toast */}
      {achToast && (
        <AchievementToast
          achievement={achToast} C={C}
          onDone={() => { setAchToast(null); setTimeout(showNextAch, 400); }}
        />
      )}

      {/* Toast regular */}
      {toast && (
        <div style={{
          position: 'absolute', bottom: 96, left: '50%',
          transform: 'translateX(-50%)',
          background: C.text, color: C.bg,
          borderRadius: 24, padding: '10px 22px',
          fontSize: 13, fontWeight: 600, zIndex: 9990,
          whiteSpace: 'nowrap', maxWidth: '88vw',
          animation: 'toastIn 0.3s ease both',
          boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
        }}>
          {toast}
        </div>
      )}

      {/* ── Header Flotante Premium ── */}
      <div style={{
        padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0, zIndex: 900,
        background: `linear-gradient(180deg, ${C.bg} 60%, transparent)`,
      }}>
        
        {/* 1. Saludo y Rango Actual (Izquierda) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeIn 0.5s ease' }}>
          <PankeyLogo size={36} C={C} glow={false} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: C.text }}>
              Hola, {user?.name ? user.name.split(' ')[0] : 'Explorador'}
            </span>
            <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              {appState.equipped?.title?.name || 'Iniciado'}
            </span>
          </div>
        </div>

        {/* 2. Racha y Economía (Derecha) */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {/* Racha Animada Fuego Colombiano */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: `linear-gradient(90deg, ${C.amberMid}22, transparent)`,
            border: `1px solid ${C.amberMid}40`, borderRadius: 20,
            padding: '4px 12px 4px 6px',
            animation:'none'
          }}>
            <div style={{
              background: C.amberMid, borderRadius: '50%', width: 24, height: 24,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 10px ${C.amberMid}80`
            }}>
              <PkIc n="flame" s={14} c="#fff" />
            </div>
            <span style={{ fontSize: 14, fontWeight: 900, color: C.amberMid }}>{appState.streakDays}</span>
          </div>
          
          {/* Empanadas (Economía) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 12, padding: '6px 10px' }}>
            <PkIc n="empanada" s={16} c={C.amberMid} />
            <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{appState.ryo || 0}</span>
          </div>

          {/* Avatar → menú de identidad */}
          <button onClick={() => setIdentityMenu(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', borderRadius: '50%' }}>
            <Av name={user?.name || '?'} sz={34} C={C} photoURL={appState.photoURL} frameData={appState.equipped?.frame} />
          </button>
        </div>
      </div>

      {/* Menú de identidad desplegable (estilo Duolingo) */}
      {identityMenu && (
        <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 9994, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }} onClick={() => setIdentityMenu(false)}>
          <div onClick={e => e.stopPropagation()} className="fu" style={{
            position: 'absolute', top: 60, right: 14, width: 232,
            background: C.bgAlt, border: `1px solid ${C.accent}30`, borderRadius: 18,
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)', overflow: 'hidden', padding: 6,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 12px 12px', borderBottom: `1px solid ${C.border}`, marginBottom: 6 }}>
              <Av name={user?.name || '?'} sz={40} C={C} photoURL={appState.photoURL} frameData={appState.equipped?.frame} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Explorador'}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>@{user?.code}</div>
              </div>
            </div>
            {[
              { icon: 'sombrero', label: 'Tu Pergamino', view: 'profile' },
              { icon: 'mochila',  label: 'La Tiendita',  view: 'shop' },
              { icon: 'solandino', label: 'Ajustes',      view: 'settings' },
            ].map(opt => (
              <button key={opt.view} onClick={() => { setPerfilStartView(opt.view); setTab('perfil'); setIdentityMenu(false); }} style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px', borderRadius: 12,
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${C.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PkIc n={opt.icon} s={17} c={C.accent} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── CONTENIDO ── */}
      <div style={{ flex: 1, position: 'relative', zIndex: 100, overflow: 'hidden' }}>
        <div style={{ display: tab === 'inicio' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }}>
          <InicioTab C={C} isLight={isLight} appState={appState} setAppState={setAppState} user={user} books={books} onGoTab={setTab} onGoShop={() => { setPerfilStartView('shop'); setTab('perfil'); }} onMissionReward={triggerCoinBurst} pushNotif={pushNotif} />
        </div>
        <div style={{ display: tab === 'icfes' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }}>
          <IcfesTab C={C} isLight={isLight} appState={appState} setAppState={setAppState} setGlobalSenseiQ={setGlobalSenseiQ} onCoinBurst={triggerCoinBurst} onAchievement={queueAchievement} pushNotif={pushNotif} onConfirm={handleConfirm} />
        </div>
        <div style={{ display: tab === 'books' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }}>
          <PergaminosTab C={C} isLight={isLight} appState={appState} setAppState={setAppState} user={user} books={books} setBooks={setBooks} onAddBook={handleAddBook} onConfirm={handleConfirm} partnerOnline={partnerOnline} partnerPhotoURL={partnerPhotoURL} pushNotif={pushNotif} onCoinBurst={triggerCoinBurst} onAchievement={queueAchievement} />
        </div>
        <div style={{ display: tab === 'friends' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }}>
          <FriendsView C={C} isLight={isLight} appState={appState} setAppState={setAppState} user={user} pushNotif={pushNotif} onBack={() => setTab('books')} />
        </div>
        <div style={{ display: tab === 'perfil' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }}>
          <SettingsTab startView={perfilStartView} C={C} isLight={isLight} themeKey={themeKey} setThemeKey={setThemeKey} ambientOn={ambientOn} setAmbientOn={setAmbientOn} appState={appState} setAppState={setAppState} user={user} partnerPhotoURL={partnerPhotoURL} onSavePhoto={(url) => { setAppState(s => ({ ...s, photoURL: url })); if (fbOK() && user?.sessionId) { try { FB().get(FB().ref(FB().db, `sessions/${user.sessionId}`)).then(snap => { if (!snap.exists()) return; const amI1 = snap.val().user1Code === user.code; FB().update(FB().ref(FB().db, `sessions/${user.sessionId}`), { [amI1 ? 'user1PhotoURL' : 'user2PhotoURL']: url }); }); } catch(_) {} } }} onLogout={() => { localStorage.removeItem(SK); setUser(null); setAppState(freshState()); setBooks([]); setScreen('onboarding'); }} pushNotif={pushNotif} onCoinBurst={triggerCoinBurst} onAchievement={queueAchievement} onGoSettings={(dest) => setTab(dest || 'inicio')} />
        </div>
        <div style={{ display: tab === 'settings' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }}>
          <SettingsTab startView="settings" C={C} isLight={isLight} themeKey={themeKey} setThemeKey={setThemeKey} ambientOn={ambientOn} setAmbientOn={setAmbientOn} appState={appState} setAppState={setAppState} user={user} partnerPhotoURL={partnerPhotoURL} onSavePhoto={(url) => { setAppState(s => ({ ...s, photoURL: url })); if (fbOK() && user?.sessionId) { try { FB().get(FB().ref(FB().db, `sessions/${user.sessionId}`)).then(snap => { if (!snap.exists()) return; const amI1 = snap.val().user1Code === user.code; FB().update(FB().ref(FB().db, `sessions/${user.sessionId}`), { [amI1 ? 'user1PhotoURL' : 'user2PhotoURL']: url }); }); } catch(_) {} } }} onLogout={() => { localStorage.removeItem(SK); setUser(null); setAppState(freshState()); setBooks([]); setScreen('onboarding'); }} pushNotif={pushNotif} onCoinBurst={triggerCoinBurst} onAchievement={queueAchievement} />
        </div>
      </div>

      {/* Nav bar */}
      <div style={{
        display: 'flex', height: 66, flexShrink: 0,
        background: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(8,12,20,0.92)',
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        borderTop: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        zIndex: 900,
      }}>
        {NAV_TABS.map(({ id, icon, label }) => {
          const active = tab === id;
          return (
           <button key={id} onClick={() => { 
                if (tab !== id) { FX.play('nav'); FX.vibrate('light'); }
                if (id === 'perfil') setPerfilStartView('profile');
                setTab(id); 
              }}
               style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', padding: '6px 0', gap: 3, cursor: 'pointer',
            }}>
              <div style={{
                width: 46, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: active ? C.accent + '1A' : 'transparent',
                borderRadius: 10, transition: 'background 0.25s ease', position: 'relative',
              }}>
                <div style={{
                  transform: active ? 'scale(1.18) translateY(-1px)' : 'scale(1)',
                  filter: active ? `drop-shadow(0 0 6px ${C.accent}90)` : 'none',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s',
                }}>
                  <PkIc n={icon} s={20} c={active ? C.accent : C.textMuted} />
                </div>
                {active && (
                  <div style={{
                    position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
                    width: 18, height: 3, borderRadius: 99, background: C.accent,
                    boxShadow: `0 0 8px ${C.accent}80`,
                    animation: 'tabPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                  }} />
                )}
              </div>
              <span style={{ fontSize: 9, fontWeight: active ? 700 : 500, color: active ? C.accent : C.textMuted, letterSpacing: 0.5 }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {globalSenseiQ && (
        <SenseiModal
          C={C} isLight={isLight}
          question={globalSenseiQ.q}
          userAnsText={globalSenseiQ.userAns}
          correctAnsText={globalSenseiQ.correctAns}
          onClose={() => setGlobalSenseiQ(null)}
        />
      )}
    </div>
    </>
  );
}


// ─────────────────────────────────────────────
//  SPLASH (Caverna Animada + Cóndor + Frases)
// ─────────────────────────────────────────────
function Splash({ onDone, C }) {
  const [phase, setPhase] = useState(0);
  const [phrase, setPhrase] = useState({ top: '', bottom: '' });

  useEffect(() => {
    // Banco de frases al estilo "El Sabio"
    const PHRASES = [
      { top: "COLANDO EL TINTO...", bottom: "PA' DESPERTAR LAS NEURONAS" },
      { top: "ALISTANDO EL MACHETE...", bottom: "ABRIENDO CAMINO AL SABER" },
      { top: "EMPACANDO EMPANADAS...", bottom: "LA EXPEDICIÓN DA HAMBRE" },
      { top: "PRENDIENDO LA FOGATA...", bottom: "ACOMODE SU RUANA Y EMPECEMOS" },
      { top: "PONIÉNDOSE LAS PILAS...", bottom: "QUE ESE ICFES NO SE PASA SOLO" },
      { top: "ECHÁNDOLE GAFA...", bottom: "A LAS PREGUNTAS MÁS CORCHADORAS" }
    ];
    setPhrase(PHRASES[Math.floor(Math.random() * PHRASES.length)]);

    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(onDone, 4500); // 4.5 segundos
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);
  
  const accent = C.accent || '#D4AF37'; 

  // Trazos de Arte Rupestre (Inspirados en Colombia) - ¡Declarado UNA sola vez!
  const PETROGLIFOS = [
    "M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10zm0 4a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z", // Espiral
    "M12 4V2M12 22v-2M4 12H2M22 12h-2M6.34 6.34L4.93 4.93M17.66 17.66l1.41 1.41M6.34 17.66l-1.41 1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", // Sol Andino
    "M12 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z M12 5v12 M12 8H8V5 M12 8h4V5 M12 15H8v3 M12 15h4v3 M12 17q0 4 4 5", // Lagartija
    "M12 2 L8 6 v4 L2 10 l5 4 l5-2 l5 2 l5-4 l-6-4 V6 Z M12 14 v7 M10 21 h4" // Cóndor
  ];

  const fondoRupestre = [
    { path: PETROGLIFOS[0], top: '5%', left: '5%', size: 160, delay: '0s' },
    { path: PETROGLIFOS[1], top: '65%', left: '65%', size: 200, delay: '2s' },
    { path: PETROGLIFOS[2], top: '60%', left: '-5%', size: 140, delay: '1s' },
    { path: PETROGLIFOS[3], top: '2%', left: '70%', size: 140, delay: '3s' },
  ];
  
  return (
    <div style={{ width: '100%', height: '100dvh', background: C.bg || '#0F0D0C',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden' }}>
      
      <style>{`
        @keyframes antorcha {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.95); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes pulsoRupestre {
          0%, 100% { opacity: 0.02; transform: scale(0.95) rotate(-2deg); }
          50% { opacity: 0.06; transform: scale(1.05) rotate(2deg); filter: drop-shadow(0 0 8px ${accent}); }
        }
      `}</style>

      {/* Símbolos del fondo */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {fondoRupestre.map((fig, i) => (
          <svg key={i} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            style={{
              position: 'absolute', top: fig.top, left: fig.left,
              width: fig.size, height: fig.size,
              animation: `pulsoRupestre 6s ease-in-out infinite ${fig.delay}`
            }}>
            <path d={fig.path} />
          </svg>
        ))}
      </div>

      {/* Fuego de la antorcha central */}
      <div style={{ position: 'absolute', width: 450, height: 450, borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}25 0%, transparent 65%)`,
        top: '50%', left: '50%', pointerEvents: 'none',
        animation: 'antorcha 4s ease-in-out infinite' }} />
      
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        animation: 'scaleIn 1.2s 0.2s ease both', transformOrigin: 'left center', opacity: 0.7 }} />
      
      {/* CONTENIDO (Logo y Letras) */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ marginBottom: 24, animation: 'kanjiRise 1.0s cubic-bezier(0.22, 1, 0.36, 1) both, kanjiGlow 3.5s 1.2s ease-in-out infinite' }}>
          <PankeyLogo size={108} C={{ accent, bgAlt: '#1A1715' }} />
        </div>
        
        <div style={{ height: 1, margin: '0 auto 20px', background: accent, opacity: phase >= 1 ? 0.6 : 0, width: 60,
          animation: phase >= 1 ? 'lineExpand 0.9s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none',
          boxShadow: `0 0 10px ${accent}80` }} />
        
        <div className="serif" style={{
          fontSize: 44, fontWeight: 800, letterSpacing: 10, color: C.text || '#F5F2EB',
          marginBottom: 16, opacity: phase >= 1 ? 1 : 0, textShadow: '0 4px 15px rgba(0,0,0,0.6)',
          animation: phase >= 1 ? 'titleReveal 0.9s 0.05s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none' }}>
          PANKEY
        </div>
        
        {/* Frases Dinámicas */}
        <div style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.8s ease',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div className="serif" style={{ fontSize: 12, color: `${accent}DD`,
            letterSpacing: 3, fontWeight: 600 }}>{phrase.top}</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: C.textMuted || '#A39C95',
            letterSpacing: 2, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{phrase.bottom}</div>
        </div>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────
//  ONBOARDING (Estética Limpia - Fogata y Chispas)
// ─────────────────────────────────────────────
function Onboarding({ C, isLight, onDone }) {
  const [step, setStep] = useState('login');
  const [tempUid, setTempUid] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const accent = C.accent || '#D4AF37';

  useEffect(() => {
    const tryGetRedirect = setInterval(async () => {
      if (!fbOK()) return;
      clearInterval(tryGetRedirect);
      try {
        const res = await window.__FB.getRedirectResult(window.__FB.auth);
        if (!res || !res.user) { setLoading(false); return; }
        setLoading(true);
        const uid = res.user.uid;
        const googleName = res.user.displayName || '';
        const snapUid = await window.__FB.get(window.__FB.ref(window.__FB.db, `uids/${uid}`));
        if (snapUid.exists()) {
          const existingCode = snapUid.val();
          const userSnap = await window.__FB.get(window.__FB.ref(window.__FB.db, `users/${existingCode}`));
          if (userSnap.exists()) { setLoading(false); onDone(userSnap.val()); return; }
        }
        setTempUid(uid); setName(googleName); setStep('profile'); setLoading(false);
      } catch(e) { setError('Error al volver de Google: ' + e.message); setLoading(false); }
    }, 100);
    return () => clearInterval(tryGetRedirect);
  }, []);

  const handleGoogleLogin = () => {
    if (!fbOK()) { setError('Firebase no está listo.'); return; }
    setLoading(true); setError('');
    window.__FB.signInWithRedirect(window.__FB.auth, window.__FB.provider);
  };

  const submitProfile = async () => {
    const cleanUser = username.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (cleanUser.length < 3) { setError('El usuario debe tener al menos 3 letras o números.'); return; }
    if (!age || isNaN(Number(age))) { setError('Por favor, ingresa una edad válida.'); return; }
    setLoading(true); setError('');
    try {
      const checkSnap = await window.__FB.get(window.__FB.ref(window.__FB.db, `users/${cleanUser}`));
      if (checkSnap.exists()) { setError('Este nombre de usuario ya está en uso.'); setLoading(false); return; }
      const userData = {
        name: name.trim() || cleanUser, code: cleanUser, uid: tempUid,
        age: parseInt(age), interests: interests.trim(),
        partner: null, partnerConnected: false, sessionId: null, ts: Date.now()
      };
      await window.__FB.set(window.__FB.ref(window.__FB.db, `users/${cleanUser}`), userData);
      await window.__FB.set(window.__FB.ref(window.__FB.db, `uids/${tempUid}`), cleanUser);
      setLoading(false); onDone(userData);
    } catch(e) { setError('Detalle del error: ' + e.message); setLoading(false); }
  };

  return (
    <div style={{ height: '100dvh', padding: '48px 32px', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', background: C.bg || '#0F0D0C', color: C.text, position: 'relative', overflow: 'hidden' }}>
      
      <style>{`
        @keyframes sparkFloat {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-150px) translateX(30px) scale(0.2); opacity: 0; }
        }
      `}</style>

      {/* Brillo de fogata súper sutil y elegante */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}10 0%, transparent 68%)`,
        top: '40%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
      
      {/* Chispas flotantes que suben lentamente */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(12)].map((_, i) => {
          const size = Math.random() * 4 + 2;
          const left = 10 + Math.random() * 80;
          const bottom = 10 + Math.random() * 40;
          const dur = 3 + Math.random() * 5;
          const del = Math.random() * 4;
          return (
            <div key={i} style={{
              position: 'absolute', bottom: `${bottom}%`, left: `${left}%`,
              width: size, height: size, borderRadius: '50%', background: accent,
              boxShadow: `0 0 ${size * 2}px ${accent}`, opacity: 0,
              animation: `sparkFloat ${dur}s ease-in infinite ${del}s`
            }} />
          );
        })}
      </div>
      
      {step === 'login' && (
        <div className="fi" style={{ position: 'relative', zIndex: 1 }}>
          <div className="fu" style={{ marginBottom: 32, animation: 'kanjiRise 1s cubic-bezier(0.22,1,0.36,1) both', filter: `drop-shadow(0 0 12px ${accent}60)` }}>
            <PkIc n="rana" s={72} c={accent} sw={1} />
          </div>
          <div className="fu fu1" style={{ marginBottom: 44 }}>
            <div className="serif" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 10, color: C.text, letterSpacing: 2 }}>PANKEY</div>
            <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, fontWeight: 500 }}>Identifícate para iniciar tu expedición hacia el conocimiento.</div>
          </div>
          <div className="fu fu2">
            <button onClick={handleGoogleLogin} disabled={loading} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              background: 'rgba(255,255,255,0.06)', color: C.text, border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 16, padding: '16px 24px',
              fontSize: 15, fontWeight: 700, boxShadow: `0 8px 24px rgba(0,0,0,0.4)`, backdropFilter: 'blur(10px)',
              cursor: 'pointer', transition: 'all 0.2s', opacity: loading ? 0.7 : 1 }}>
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {loading ? 'Preparando morral...' : 'Entrar con Google'}
            </button>
            {error && <div style={{ fontSize: 12, color: accent, marginTop: 16, textAlign: 'center', fontWeight: 600 }}>⚠ {error}</div>}
          </div>
        </div>
      )}
      
      {step === 'profile' && (
        <div className="fi" style={{ position: 'relative', zIndex: 1 }}>
          <div className="fu" style={{ marginBottom: 32 }}>
            <div className="serif" style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: C.text }}>Tu Identidad</div>
            <div style={{ fontSize: 13, color: C.textMuted }}>Solo necesitamos un par de datos para tallar tu nombre en la piedra.</div>
          </div>
          <div className="fu fu1" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 16, border: `1px solid rgba(255,255,255,0.08)`, backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 6, fontWeight: 700, letterSpacing: 1.5 }}>ALIAS (ÚNICO)</div>
              <div style={{ display: 'flex', alignItems: 'baseline', borderBottom: `2px solid rgba(255,255,255,0.1)`, paddingBottom: 6 }}>
                <span style={{ fontSize: 22, color: accent, fontWeight: 800, marginRight: 4 }}>@</span>
                <input value={username}
                  onChange={e => { setUsername(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')); setError(''); }}
                  placeholder="EXPLORADOR"
                  style={{ width: '100%', fontSize: 22, fontWeight: 700, border: 'none', background: 'transparent', color: C.text, fontFamily: "'Plus Jakarta Sans', monospace", outline: 'none' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 16, border: `1px solid rgba(255,255,255,0.08)`, backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 6, fontWeight: 700, letterSpacing: 1.5 }}>EDAD</div>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Ej. 17"
                  style={{ width: '100%', fontSize: 18, fontWeight: 500, padding: '4px 0', border: 'none', borderBottom: `2px solid rgba(255,255,255,0.1)`, background: 'transparent', color: C.text, outline: 'none' }} />
              </div>
              <div style={{ flex: 2, background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 16, border: `1px solid rgba(255,255,255,0.08)`, backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 6, fontWeight: 700, letterSpacing: 1.5 }}>NOMBRE</div>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre"
                  style={{ width: '100%', fontSize: 18, fontWeight: 500, padding: '4px 0', border: 'none', borderBottom: `2px solid rgba(255,255,255,0.1)`, background: 'transparent', color: C.text, outline: 'none' }} />
              </div>
            </div>
            {error && <div style={{ fontSize: 12, color: accent, background: `${accent}10`, borderRadius: 10, padding: '10px 14px', fontWeight: 600 }}>⚠ {error}</div>}
            <PrimaryBtn C={C} onClick={submitProfile} loading={loading}>Comenzar Expedición →</PrimaryBtn>
          </div>
        </div>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────
//  CONNECT (Estética Rupestre Colombiana)
// ─────────────────────────────────────────────
function Connect({ C, isLight, user, onDone, onSkip }) {
  const [step, setStep] = useState('show_code');
  const [pCode, setPCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const accent = C.accent || '#D4AF37';

  const copyCode = () => {
    navigator.clipboard?.writeText(user?.code || '').catch(() => {});
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleConnect = async () => {
    const code = pCode.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!code || code === user?.code) { setError('Ingresa el código de tu pareja.'); return; }
    setLoading(true); setError('');
    try {
      if (!fbOK()) throw new Error('Sin Firebase');
      const snap = await FB().get(FB().ref(FB().db, `users/${code}`));
      if (!snap.exists()) { setError('Usuario no encontrado.'); setLoading(false); return; }
      const partner = snap.val();
      const sid = [user.code, code].sort().join('_');
      await FB().update(FB().ref(FB().db, `sessions/${sid}`), {
        user1Code: user.code, user2Code: code, user1Name: user.name, user2Name: partner.name,
        user1Confirmed: false, user2Confirmed: false, user1Online: false, user2Online: false, created: Date.now(),
      });
      await FB().update(FB().ref(FB().db, `users/${user.code}`), { partner: partner.name, partnerCode: code, sessionId: sid });
      await FB().update(FB().ref(FB().db, `users/${code}`), { partner: user.name, partnerCode: user.code, sessionId: sid });
      setLoading(false);
      onDone({ partnerName: partner.name, sessionId: sid, partnerCode: code });
    } catch(e) { setError('Error de red. Intenta de nuevo.'); setLoading(false); }
  };

  // Mismos petroglifos para mantener la consistencia
  const PETROGLIFOS = [
    "M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10zm0 4a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
    "M12 4V2M12 22v-2M4 12H2M22 12h-2M6.34 6.34L4.93 4.93M17.66 17.66l1.41 1.41M6.34 17.66l-1.41 1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    "M12 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z M12 5v12 M12 8H8V5 M12 8h4V5 M12 15H8v3 M12 15h4v3 M12 17q0 4 4 5",
    "M12 2 L8 6 v4 L2 10 l5 4 l5-2 l5 2 l5-4 l-6-4 V6 Z M12 14 v7 M10 21 h4"
  ];
  const fondoRupestre = [
    { path: PETROGLIFOS[0], top: '5%', left: '5%', size: 160, delay: '0s' },
    { path: PETROGLIFOS[1], top: '65%', left: '65%', size: 200, delay: '2s' },
    { path: PETROGLIFOS[2], top: '60%', left: '-5%', size: 140, delay: '1s' },
    { path: PETROGLIFOS[3], top: '2%', left: '70%', size: 140, delay: '3s' },
  ];

  return (
    <div style={{ height: '100dvh', padding: '48px 32px', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', background: C.bg || '#0F0D0C', color: C.text, position: 'relative', overflow: 'hidden' }}>
      
      {/* Fondo Inmersivo */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {fondoRupestre.map((fig, i) => (
          <svg key={i} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', top: fig.top, left: fig.left, width: fig.size, height: fig.size, animation: `pulsoRupestre 6s ease-in-out infinite ${fig.delay}` }}>
            <path d={fig.path} />
          </svg>
        ))}
      </div>
      <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)`, top: '45%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', animation: 'antorcha 4s ease-in-out infinite' }} />

      {step === 'show_code' && (
        <div className="fi" style={{ position: 'relative', zIndex: 1 }}>
          <div className="fu" style={{ marginBottom: 40 }}>
            <div className="serif" style={{ fontSize: 34, fontWeight: 800, marginBottom: 10, color: C.text }}>Alianza Lectora</div>
            <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, fontWeight: 500 }}>Comparte tu código para sincronizar la expedición con tu pareja.</div>
          </div>
          <div className="fu fu1" style={{
            background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, borderRadius: 22, padding: '32px 24px',
            textAlign: 'center', marginBottom: 24, backdropFilter: 'blur(10px)',
          }}>
            <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 16, fontWeight: 700, letterSpacing: 2.5 }}>TU CÓDIGO ÚNICO</div>
            <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: 4, color: accent, marginBottom: 22,
              textShadow: `0 0 20px ${accent}40`, fontFamily: "'Noto Serif JP', monospace", wordBreak: 'break-all' }}>
              @{user?.code}
            </div>
            <button onClick={copyCode} style={{
              background: copied ? `linear-gradient(135deg, #34D399, #10B981)` : `linear-gradient(135deg, ${accent}, ${C.amberMid})`,
              color: copied ? '#fff' : '#000', border: 'none', borderRadius: 14, padding: '14px 32px',
              fontSize: 15, fontWeight: 800, fontFamily: 'inherit',
              boxShadow: `0 6px 20px ${copied ? '#34D399' : accent}40`, transition: 'all 0.32s ease', cursor: 'pointer'
            }}>
              {copied ? '¡Copiado! ✓' : 'Copiar mi código'}
            </button>
          </div>
          <div className="fu fu2" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <PrimaryBtn C={C} onClick={() => setStep('enter_code')}>Tengo el código de mi pareja →</PrimaryBtn>
            <button onClick={onSkip} style={{
              background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, borderRadius: 14, padding: '15px',
              color: C.textMuted, fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', backdropFilter: 'blur(5px)' }}>
              Continuar la expedición solo/a
            </button>
          </div>
        </div>
      )}

      {step === 'enter_code' && (
        <div className="fi" style={{ position: 'relative', zIndex: 1 }}>
          <button onClick={() => { setStep('show_code'); setError(''); }} style={{
            background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.text, fontSize: 13, fontWeight: 700,
            borderRadius: 12, fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', marginBottom: 36, cursor: 'pointer' }}>
            <PkIc n="left" s={14} c={C.text} /> Volver
          </button>
          <div className="fu" style={{ marginBottom: 36 }}>
            <div className="serif" style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: C.text }}>Forjar Alianza</div>
            <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.65, fontWeight: 500 }}>Ingresa el código de la persona con la que compartirás esta expedición.</div>
          </div>
          <div className="fu fu1" style={{ background: 'rgba(255,255,255,0.03)', padding: '24px 20px', borderRadius: 20, border: `1px solid ${C.border}`, backdropFilter: 'blur(10px)', marginBottom: 24 }}>
            <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 10, fontWeight: 700, letterSpacing: 2 }}>CÓDIGO DEL ALIADO</div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: `2px solid ${error ? '#EF4444' : C.border}`, paddingBottom: 6 }}>
              <span style={{ fontSize: 24, color: accent, fontWeight: 800, marginRight: 6 }}>@</span>
              <input value={pCode}
                onChange={e => { setPCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')); setError(''); }}
                placeholder="USUARIO" autoFocus
                style={{ width: '100%', fontSize: 24, fontWeight: 800, letterSpacing: 3, padding: '8px 0', border: 'none',
                  background: 'transparent', color: C.text, fontFamily: "'Plus Jakarta Sans', monospace", outline: 'none' }} />
            </div>
            {error && <div style={{ fontSize: 12, color: '#EF4444', marginTop: 12, fontWeight: 600 }}>⚠ {error}</div>}
          </div>
          <PrimaryBtn C={C} onClick={handleConnect} loading={loading}>Vincular y Comenzar</PrimaryBtn>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  HOME TAB — con misiones diarias y XP bar
// ─────────────────────────────────────────────
function HomeTab({ C, isLight, appState, setAppState, user, currentBook, books,
                   onConfirm, onGoBooks, partnerOnline, partnerPhotoURL, onMissionReward }) {
  const partner = user?.partner || 'Pareja';
  const pal     = getPalette(currentBook?.genre);
  const lvl     = computeLevel(appState.xp || 0);

  return (
    <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Duo avatars + XP bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DuoAvatars C={C} user={user} partner={partner}
          myPhoto={appState.photoURL} theirPhoto={partnerPhotoURL}
          partnerOnline={partnerOnline} streak={appState.streakDays}
        />
        {/* ✅ NEW: XP progress bar compacta */}
        <div style={{ background: C.bgAlt, borderRadius: 12, padding: '10px 14px',
          border: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: 6,
                background: `linear-gradient(135deg, ${C.accent}, ${C.accent}CC)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800, color: '#fff' }}>
                {lvl.level}
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Nivel {lvl.level}</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: C.textMuted }}>{lvl.current.toLocaleString()} XP</span>
              {appState.icfesStreak > 0 && (
                <span style={{ fontSize: 11, color: '#A78BFA', fontWeight: 700 }}>⚡ {appState.icfesStreak} días ICFES</span>
              )}
            </div>
          </div>
          <div style={{ height: 5, borderRadius: 99, background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${lvl.pct}%`, borderRadius: 99,
              background: `linear-gradient(90deg, ${C.accent}88, ${C.accent})`,
              boxShadow: `0 0 8px ${C.accent}60`,
              transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            }} />
          </div>
        </div>
      </div>

      {/* MI LIBRO ACTUAL */}
      <div>
        <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 12, fontWeight: 600, letterSpacing: 1.5 }}>TU LECTURA ACTUAL</div>
        {!currentBook ? (
          <Card C={C} isLight={isLight} onClick={onGoBooks} style={{ padding: '36px 24px', textAlign: 'center',
            cursor: 'pointer', border: `1px dashed ${C.border}`, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 14 }}>
            <PkIc n="book" s={30} c={C.textMuted} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.textMid, marginBottom: 4 }}>Sin libro activo</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>Toca para ir a la biblioteca</div>
            </div>
            <Pill C={C}>Ir a Biblioteca →</Pill>
          </Card>
        ) : (
          <div style={{ borderRadius: 24, overflow: 'hidden',
            background: `linear-gradient(155deg, ${pal.from} 0%, ${pal.to} 100%)`,
            boxShadow: `0 20px 56px ${pal.spine}22, 0 8px 32px rgba(0,0,0,0.5)`, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(ellipse at 68% 18%, ${pal.spine}18 0%, transparent 52%)` }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${pal.spine}90, transparent)` }} />
            <div style={{ padding: '26px 22px 22px', display: 'flex', gap: 18, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <BookCover book={currentBook} size="lg" floating={true} />
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div className="serif" style={{ fontSize: 21, fontWeight: 700, color: pal.text || '#fff',
                  lineHeight: 1.22, marginBottom: 6, textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>
                  {currentBook.title}
                </div>
                <div style={{ fontSize: 12, marginBottom: 14, color: pal.text ? pal.text + 'AA' : 'rgba(255,255,255,0.6)' }}>
                  {currentBook.author}
                </div>
                {currentBook.genre && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: 9, fontWeight: 700,
                    letterSpacing: 1.5, color: pal.spine, background: `${pal.spine}22`,
                    border: `1px solid ${pal.spine}35`, borderRadius: 6, padding: '3px 9px' }}>
                    {currentBook.genre.toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.32)', padding: '16px 22px 22px', position: 'relative', zIndex: 1 }}>
              
              {/* 1. Barra de progreso de páginas/capítulos */}
              <ProgressStepper
                C={{ ...C, bgAlt:'rgba(255,255,255,0.09)', text:'#fff', textMuted:'rgba(255,255,255,0.48)', accent: pal.spine }}
                isLight={false} appState={appState} setAppState={setAppState} currentBook={currentBook}
              />

              {/* 2. Botón de Confirmar lectura integrado (Sellar pergamino) */}
              <button onClick={onConfirm} style={{
                width:'100%', marginTop:14,
                background: appState.yourConfirmed ? 'rgba(52,211,153,0.15)' : `linear-gradient(135deg, ${pal.spine}, ${pal.spine}CC)`,
                color: appState.yourConfirmed ? '#34D399' : '#fff',
                border: appState.yourConfirmed ? '1.5px solid #34D39940' : 'none',
                borderRadius:12, padding:'12px', fontSize:13, fontWeight:700,
                cursor: appState.yourConfirmed ? 'default' : 'pointer', fontFamily:'inherit',
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                transition:'all 0.3s',
              }}>
                <PkIc n={appState.yourConfirmed ? 'check' : 'flame'} s={15} c={appState.yourConfirmed ? '#34D399' : '#fff'} />
                {appState.yourConfirmed ? 'Pergamino sellado hoy' : 'Sellar Pergamino del día'}
              </button>

              {/* 3. Cafetal de Enfoque con estilo premium separado */}
              <div style={{ marginTop:20, paddingTop:18,
                borderTop:'1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
                  <PkIc n="coffee" s={16} c="rgba(255,255,255,0.7)" />
                  <span style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.7)', letterSpacing:1.5 }}>
                    CAFETAL DE ENFOQUE
                  </span>
                </div>
                <CafetalTimer
                  C={C} isLight={false} appState={appState} setAppState={setAppState}
                  pushNotif={pushNotif} currentBook={currentBook} setBooks={setBooks}
                  onCoinBurst={onCoinBurst} onAchievement={onAchievement}
                />
              </div>

            </div>
                isLight={false} appState={appState} setAppState={setAppState} currentBook={currentBook}
          </div>
        )}
      </div>

      {/* Confirmar lectura */}
      {currentBook && (
        <button onClick={onConfirm} style={{
          width: '100%',
          background: appState.yourConfirmed
            ? (C.tealBg || C.tealMid + '18')
            : `linear-gradient(135deg, ${C.accent}, ${C.accent}CC)`,
          color: appState.yourConfirmed ? C.tealMid : '#fff',
          border: appState.yourConfirmed ? `1.5px solid ${C.tealMid}` : 'none',
          borderRadius: 16, padding: 18, fontSize: 16, fontWeight: 600,
          cursor: appState.yourConfirmed ? 'default' : 'pointer',
          boxShadow: appState.yourConfirmed ? 'none' : `0 8px 28px ${C.accent}40`,
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)', fontFamily: 'inherit',
        }}>
          {appState.yourConfirmed ? '✓ Pergamino sellado hoy' : 'Sellar Pergamino de Hoy'}
        </button>
      )}

      {/* MISIONES DIARIAS ✅ NEW */}
      <DailyMissions C={C} isLight={isLight} appState={appState} setAppState={setAppState} onReward={onMissionReward} />

      {/* EL LIBRO DE MI PAREJA */}
      {user?.partner && (
        <div>
          <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 10, fontWeight: 600, letterSpacing: 1.5 }}>
            {partner.toUpperCase()} ESTÁ LEYENDO
          </div>
          {appState.theirBook ? (
            <Card C={C} isLight={isLight} style={{ padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ flexShrink: 0, width: 46, height: 66, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                <BookCover book={appState.theirBook} size="sm" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{appState.theirBook.title}</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{appState.theirBook.author}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                  <div style={{ flex: 1, height: 4, borderRadius: 99, background: C.border }}>
                    <div style={{ height: '100%', borderRadius: 99, width: `${appState.theirProgress || 0}%`,
                      background: getPalette(appState.theirBook.genre).spine, transition: 'width 0.5s ease' }} />
                  </div>
                  <span style={{ fontSize: 11, color: C.textMuted, fontWeight: 600 }}>{appState.theirProgress || 0}%</span>
                </div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 6 }}>
                  {appState.theirConfirmed ? '✓ Ya confirmó hoy' : 'No ha confirmado hoy'}
                </div>
              </div>
            </Card>
          ) : (
            <Card C={C} isLight={isLight} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <PkIc n="book" s={24} c={C.border} />
              <div style={{ fontSize: 13, color: C.textMuted }}>{partner} no ha añadido un libro.</div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

function DuoAvatars({ C, user, partner, myPhoto, theirPhoto, partnerOnline, streak }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ position: 'relative', width: 62, height: 46, flexShrink: 0 }}>
        {user?.partner && (
          <div style={{ position: 'absolute', left: 22, top: 3, zIndex: 1 }}>
            <Av name={partner} sz={38} C={C} color={C.blueMid} photoURL={theirPhoto}
              style={{ border: `2px solid ${C.bg}`, boxShadow: `0 2px 10px rgba(0,0,0,0.25)` }} />
          </div>
        )}
        <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 2 }}>
          <Av name={user?.name || '?'} sz={44} C={C} photoURL={myPhoto}
            style={{ border: `2px solid ${C.bg}`, boxShadow: `0 2px 14px ${C.accent}28` }} />
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user?.name || 'Tú'}{user?.partner ? ` & ${partner}` : ''}
        </div>
        <div style={{ fontSize: 12, color: C.textMuted, display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
          {user?.partnerConnected ? (
            <>
              <div style={{ width: 6, height: 6, borderRadius: '50%',
                background: partnerOnline ? C.tealMid : C.border,
                boxShadow: partnerOnline ? `0 0 6px ${C.tealMid}` : 'none', flexShrink: 0 }} />
              {partnerOnline ? 'en línea' : 'desconectado/a'}
            </>
          ) : 'Sin pareja conectada'}
          {streak > 0 && (
            <span style={{ color: C.amberMid, fontWeight: 700,
              filter: streak >= 7 ? 'drop-shadow(0 0 4px #FBBF24)' : 'none' }}>
              · {streak} días {streak >= 30 ? '🔥' : streak >= 14 ? '⚡' : '🔥'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  NOTES TAB
// ─────────────────────────────────────────────
function NotesTab({ C, isLight, appState, notes, user, noteText, setNoteText, onAddNote, partnerPhotoURL }) {
  return (
    <div className="fi" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <div className="serif" style={{ fontSize: 30, fontWeight: 700, marginBottom: 4, color: C.text }}>Tsudoi</div>
        <div style={{ fontSize: 13, color: C.textMuted }}>Comparte tus ideas con {user?.partner || 'tu pareja'}</div>
      </div>
      <Card C={C} isLight={isLight} style={{ padding: '18px 20px' }}>
        <textarea value={noteText} onChange={e => setNoteText(e.target.value)}
          placeholder="¿Qué estás leyendo o pensando?"
          style={{ width: '100%', fontSize: 14, border: 'none', borderBottom: `1px solid ${C.border}`,
            background: 'transparent', color: C.text, resize: 'none', minHeight: 72, lineHeight: 1.7,
            marginBottom: 14, paddingBottom: 10, fontFamily: 'inherit' }} />
        <PrimaryBtn C={C} onClick={onAddNote}>Enviar mensaje</PrimaryBtn>
      </Card>
      {notes.length === 0 && (
        <div style={{ textAlign: 'center', color: C.textMuted, padding: '40px 0', fontSize: 14 }}>Sé el primero en enviar un mensaje.</div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {notes.slice().reverse().map((note, idx) => {
          const isMe = note.who === user?.code || note.who === 'you';
          return (
            <div key={note.id} className="stagger-item" style={{ animationDelay: `${idx * 0.07}s`,
              display: 'flex', flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 10 }}>
              <Av name={note.whoName || (isMe ? user?.name : '?')} sz={34} C={C}
                color={isMe ? C.accent : C.blueMid}
                photoURL={isMe ? appState.photoURL : partnerPhotoURL} style={{ flexShrink: 0 }} />
              <div style={{
                maxWidth: '80%', position: 'relative',
                background: isMe ? `linear-gradient(145deg, ${C.accent}1E, ${C.accent}0D)` : isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.055)',
                backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                border: `1px solid ${isMe ? C.accent + '22' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: isMe ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                padding: '12px 16px', boxShadow: isMe ? `0 4px 20px ${C.accent}18` : '0 4px 16px rgba(0,0,0,0.14)',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.4,
                  color: isMe ? C.accent : C.textMuted, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {note.whoName || (isMe ? 'Tú' : 'Pareja')}
                  <span style={{ opacity: 0.5 }}>·</span> {note.time}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.68, color: C.text }}>{note.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
//  SISTEMA DE NOTIFICACIONES PUSH NATIVAS (Móvil y Web)
// ─────────────────────────────────────────────
const requestNotifPermission = async () => {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied')  return 'denied';
  return await Notification.requestPermission();
};

const sendPushNotif = (title, body, tag = 'pankey-general') => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try { 
    // Si el pelao tiene la app abierta en la cara, no le vibramos el celular (solo sale la in-app).
    // A menos que sea el temporizador del café, ese sí suena siempre.
    if (document.visibilityState === 'visible' && tag !== 'pankey-timer') return;
    
    new Notification(title, { 
      body, 
      tag, 
      renotify: true,
      requireInteraction: true, // Se queda en la pantalla hasta que la toque
      vibrate: [200, 100, 200, 100, 400], // Patrón de vibración sabroso (ta-ta-ta--taaaaa)
      icon: 'https://cdn-icons-png.flaticon.com/512/3068/3068303.png' // Ícono temporal místico
    }); 
  } catch(e) {}
};

// ─────────────────────────────────────────────
//  TIMER TAB — con XP y coins
// ─────────────────────────────────────────────
function CafetalTimer({ C, isLight, appState, setAppState, pushNotif, currentBook, setBooks, onCoinBurst, onAchievement }) {
  const [notifStatus, setNotifStatus] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  );
  useEffect(() => {
    if (notifStatus === 'default') requestNotifPermission().then(r => setNotifStatus(r));
  }, []);
  const handleReqNotif = async () => { const r = await requestNotifPermission(); setNotifStatus(r); };

  const [running, setRunning]     = useState(false);
  const [seconds, setSeconds]     = useState(0);
  const [goalMins, setGoalMins]   = useState(appState.dailyGoal || 20);
  const [customInput, setCustomInput] = useState('');
  const [showCustom, setShowCustom]   = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s + 1 === goalMins * 60) {
            playAlarm();
            sendPushNotif('¡Tiempo de lectura cumplido!', `Leíste ${goalMins} minutos. ¡Excelente sesión!`);
            pushNotif('¡Tiempo cumplido! 🎉');
          }
          return s + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, goalMins]);

  const reset = () => { setRunning(false); setSeconds(0); };

  const finish = () => {
    if (seconds < 10) { reset(); return; }
    const mins = Math.max(1, Math.round(seconds / 60));
    const earnedRyo = mins;          // 1 Ryō per minute
    const earnedXp  = mins * 3;     // 3 XP per minute
    const isLongSession = mins >= 60;
    const isMadrugador = new Date().getHours() < 7;

    setAppState(s => {
      const newTotal    = s.totalMinutesRead + mins;
      const newSessions = s.totalSessions + 1;

      const newAchievements = (s.achievements || []).map(a => {
        if (a.unlocked) return a;
        if (a.id === 4  && newTotal    >= 100)  return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 7  && mins        >= 60)   return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 11 && newSessions >= 100)  return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 12 && newTotal    >= 1000) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 41 && isMadrugador)        return { ...a, unlocked: true, date: 'hoy' };
        return a;
      });

      const prevIds = (s.achievements || []).filter(a => a.unlocked).map(a => a.id);
      const newlyUnlocked = newAchievements.filter(a => a.unlocked && !prevIds.includes(a.id));
      const achRyo = newlyUnlocked.reduce((sum, a) => sum + (a.ryo || 0), 0);
      const achXp  = newlyUnlocked.reduce((sum, a) => sum + (a.xp  || 0), 0);
      newlyUnlocked.forEach(a => onAchievement?.(a));

      return {
        ...s,
        ryo: (s.ryo || 0) + earnedRyo + achRyo,
        xp:  (s.xp  || 0) + earnedXp  + achXp,
        readingMinutesToday: s.readingMinutesToday + mins,
        totalMinutesRead: newTotal,
        totalSessions: newSessions,
        achievements: newAchievements,
      };
    });

    if (currentBook) {
      setBooks(p => p.map(b => b.id === currentBook.id ? { ...b, timeRead: (b.timeRead || 0) + mins } : b));
    }

    onCoinBurst?.(earnedRyo);
    pushNotif?.(`+${earnedRyo} Ryō · +${earnedXp} XP · ${mins} min`);
    reset();
  };

  const applyCustom = () => {
    const v = parseInt(customInput);
    if (v > 0 && v <= 480) { setGoalMins(v); setShowCustom(false); setCustomInput(''); reset(); }
  };

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const pct  = Math.min((seconds / (goalMins * 60)) * 100, 100);
  const circ = 2 * Math.PI * 90;
  const done = pct >= 100;

  return (
    <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 800, marginBottom: 4, color: C.text, display: 'flex', alignItems: 'center', gap: 8 }}>
          <PkIc n="coffee" s={24} c={C.accent} /> Cafetal de Enfoque
        </div>
        <div style={{ fontSize: 13, color: C.textMuted }}>
          Tómate un tinto y lee. Sesión: {String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
        </div>
      </div>

      {notifStatus !== 'granted' && notifStatus !== 'unsupported' && (
        <Card C={C} isLight={isLight} style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <PkIc n="bell" s={18} c={C.amberMid} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>
              {notifStatus === 'denied' ? 'Notificaciones bloqueadas' : 'Activar alertas del sistema'}
            </div>
            <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>
              {notifStatus === 'denied' ? 'Actívalas desde los ajustes del navegador.' : 'Recibe una alerta cuando termine tu sesión.'}
            </div>
          </div>
          {notifStatus !== 'denied' && (
            <button onClick={handleReqNotif} style={{ background: C.accent, color: '#fff', border: 'none',
              borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 600, flexShrink: 0, cursor: 'pointer' }}>Activar</button>
          )}
        </Card>
      )}

      {/* Círculo timer */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ position: 'relative', width: 220, height: 220 }}>
          <svg width="220" height="220" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="110" cy="110" r="90" fill="none" stroke={C.bgAlt} strokeWidth="10" />
            <circle cx="110" cy="110" r="90" fill="none"
              stroke={done ? C.tealMid : running ? C.accent : C.borderStrong}
              strokeWidth="10" strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ - (circ * pct) / 100}
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s', filter: running ? `drop-shadow(0 0 8px ${C.accent}80)` : 'none' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 46, fontWeight: 300, letterSpacing: 2,
              color: running ? C.accent : C.text, fontVariantNumeric: 'tabular-nums' }}>
              {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, marginTop: 4 }}>
              {done ? '¡META CUMPLIDA! 🏆' : `META: ${goalMins} MIN`}
            </div>
          </div>
        </div>

        {/* Controles */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <button onClick={() => setRunning(r => !r)} style={{
            width: 68, height: 68, borderRadius: '50%',
            background: running ? C.accentBg || C.accent + '18' : C.accent,
            border: running ? `2px solid ${C.accent}` : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: running ? 'none' : `0 6px 24px ${C.accent}45`,
          }}>
            <PkIc n={running ? 'pause' : 'play'} s={24} c={running ? C.accent : '#fff'} />
          </button>
          {seconds >= 10 && (
            <button onClick={finish} style={{ width: 56, height: 56, borderRadius: '50%',
              background: C.bgAlt, border: `2px solid ${C.tealMid}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PkIc n="check" s={20} c={C.tealMid} />
            </button>
          )}
          {seconds > 0 && (
            <button onClick={reset} style={{ width: 46, height: 46, borderRadius: '50%',
              background: C.bgAlt, border: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PkIc n="refresh" s={16} c={C.textMuted} />
            </button>
          )}
        </div>

        {/* Selector de meta */}
        <div style={{ width: '100%' }}>
          <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 10, fontWeight: 600, letterSpacing: 1.2, textAlign: 'center' }}>DURACIÓN DE SESIÓN</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[10, 20, 30, 45, 60].map(mins => (
              <button key={mins} onClick={() => { setGoalMins(mins); setShowCustom(false); reset(); }} style={{
                padding: '8px 16px', borderRadius: 10, fontFamily: 'inherit',
                background: goalMins === mins && !showCustom ? C.accent : C.bgAlt,
                color: goalMins === mins && !showCustom ? '#fff' : C.textMuted,
                border: `1px solid ${goalMins === mins && !showCustom ? C.accent : C.border}`,
                fontSize: 13, fontWeight: 600,
                boxShadow: goalMins === mins && !showCustom ? `0 4px 12px ${C.accent}35` : 'none',
              }}>{mins} min</button>
            ))}
            <button onClick={() => setShowCustom(v => !v)} style={{
              padding: '8px 16px', borderRadius: 10,
              background: showCustom ? C.accent : C.bgAlt,
              color: showCustom ? '#fff' : C.textMuted,
              border: `1px solid ${showCustom ? C.accent : C.border}`, fontSize: 13, fontWeight: 600,
            }}>Otro</button>
          </div>
          {showCustom && (
            <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'center', alignItems: 'center' }}>
              <input value={customInput} onChange={e => setCustomInput(e.target.value.replace(/\D/g, ''))}
                placeholder="ej. 90" maxLength={3}
                style={{ width: 80, fontSize: 18, fontWeight: 600, padding: '10px 0', textAlign: 'center',
                  border: 'none', borderBottom: `2px solid ${C.border}`, background: 'transparent', color: C.text }} />
              <span style={{ fontSize: 13, color: C.textMuted }}>min</span>
              <button onClick={applyCustom} style={{ background: C.accent, color: '#fff', border: 'none',
                borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>OK</button>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { v: `${appState.readingMinutesToday + m}`, u: 'min', l: 'Hoy' },
          { v: `${Math.round((appState.totalMinutesRead + m) / 60 * 10) / 10}`, u: 'h', l: 'Total' },
          { v: `${appState.totalSessions || 0}`, u: 'ses.', l: 'Sesiones' },
          { v: `${appState.ryo || 0}`, u: 'Ryō', l: 'Monedas' },
        ].map(({ v, u, l }) => (
          <Card key={l} C={C} isLight={isLight} style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: C.text }}>{v}</span>
              <span style={{ fontSize: 11, color: C.textMuted }}>{u}</span>
            </div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{l}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  BOOKS TAB
// ─────────────────────────────────────────────
const GENRES = ['Ficción', 'Romance', 'Misterio', 'Fantasía', 'Terror', 'Ciencia', 'Manga', 'Cómic', 'Novela Ligera', 'Clásico', 'Historia', 'Poesía', 'Thriller', 'Biografía', 'Aventura', 'Autoayuda'];
// ─────────────────────────────────────────────
//  PERGAMINOS TAB — Libro actual + biblioteca + añadir
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
//  PERGAMINOS TAB — Libro actual + biblioteca + añadir
// ─────────────────────────────────────────────
function PergaminosTab({ C, isLight, appState, setAppState, user, books, setBooks, onAddBook, partnerOnline, partnerPhotoURL, pushNotif, onCoinBurst, onAchievement }) {
  const [showAdd, setShowAdd]   = useState(false);
  const [nb, setNb]             = useState({ title: '', author: '', totalChapters: 10, totalPages: 0, genre: 'Ficción' });
  const partner     = user?.partner || 'Pareja';
  const currentBook = books.find(b => b.id === appState.currentBookId) || null;
  const otherBooks  = books.filter(b => b.id !== appState.currentBookId);
  const pal         = getPalette(currentBook?.genre);

  const doAdd = () => {
    if (!nb.title.trim()) return;
    onAddBook({ ...nb, totalChapters: parseInt(nb.totalChapters) || 10, totalPages: parseInt(nb.totalPages) || 0 });
    setNb({ title: '', author: '', totalChapters: 10, totalPages: 0, genre: 'Ficción' });
    setShowAdd(false);
  };

  return (
    <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header con avatares */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative', width: 54, height: 42, flexShrink: 0 }}>
            {user?.partner && (
              <div style={{ position: 'absolute', left: 18, top: 2, zIndex: 1 }}>
                <Av name={partner} sz={34} C={C} color={C.blueMid} photoURL={partnerPhotoURL}
                  style={{ border: `2px solid ${C.bg}`, boxShadow: `0 2px 10px rgba(0,0,0,0.25)` }} />
              </div>
            )}
            <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 2 }}>
              <Av name={user?.name || '?'} sz={40} C={C} photoURL={appState.photoURL}
                style={{ border: `2px solid ${C.bg}`, boxShadow: `0 2px 14px ${C.accent}28` }} />
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name || 'Tú'}{user?.partner ? ` & ${partner}` : ''}
            </div>
            <div style={{ fontSize: 11, color: C.textMuted, display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
              {user?.partnerConnected ? (
                <>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: partnerOnline ? C.tealMid : C.border, boxShadow: partnerOnline ? `0 0 6px ${C.tealMid}` : 'none' }} />
                  {partnerOnline ? 'en línea' : 'desconectado/a'}
                </>
              ) : 'Solo/a por ahora'}
            </div>
          </div>
        </div>
        <button onClick={() => setShowAdd(v => !v)} style={{
          background: showAdd ? C.bgAlt : C.accent, color: showAdd ? C.textMuted : '#fff',
          border: showAdd ? `1px solid ${C.border}` : 'none',
          borderRadius: 12, padding: '9px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
        }}>
          {showAdd ? 'Cancelar' : '+ Añadir'}
        </button>
      </div>

      {/* Formulario añadir libro */}
      {showAdd && (
        <Card C={C} isLight={isLight} style={{ padding: '22px 20px', animation: 'fadeUp 0.3s ease both' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <BookCover book={{ ...nb, title: nb.title || 'Nuevo Libro', author: nb.author || 'Autor' }} size="md" />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
            {GENRES.map(g => (
              <button key={g} onClick={() => setNb(b => ({ ...b, genre: g }))} style={{
                padding: '5px 11px', borderRadius: 8, fontSize: 11, fontWeight: 500, cursor: 'pointer',
                border: `1px solid ${nb.genre === g ? C.accent : C.border}`,
                background: nb.genre === g ? C.accent + '18' : 'transparent',
                color: nb.genre === g ? C.accent : C.textMuted,
              }}>{g}</button>
            ))}
          </div>
          {[
            { label: 'TÍTULO *', key: 'title', ph: 'Nombre del libro...' },
            { label: 'AUTOR',    key: 'author', ph: 'Nombre del autor...' },
          ].map(({ label, key, ph }) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 6, fontWeight: 700, letterSpacing: 1.2 }}>{label}</div>
              <input value={nb[key]} onChange={e => setNb(b => ({ ...b, [key]: e.target.value }))} placeholder={ph}
                style={{ width: '100%', fontSize: 15, fontWeight: 500, padding: '10px 0', border: 'none', borderBottom: `1px solid ${C.border}`, background: 'transparent', color: C.text }} />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'CAPÍTULOS', key: 'totalChapters' },
              { label: 'PÁGINAS (0=sin límite)', key: 'totalPages' },
            ].map(({ label, key }) => (
              <div key={key} style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 6, fontWeight: 700, letterSpacing: 1.1 }}>{label}</div>
                <input type="number" value={nb[key]} onChange={e => setNb(b => ({ ...b, [key]: e.target.value }))}
                  style={{ width: '100%', fontSize: 20, fontWeight: 700, padding: '8px 0', textAlign: 'center', border: 'none', borderBottom: `1px solid ${C.border}`, background: 'transparent', color: C.text }} />
              </div>
            ))}
          </div>
          <PrimaryBtn C={C} onClick={doAdd}>Guardar en los Pergaminos</PrimaryBtn>
        </Card>
      )}

      {/* LIBRO ACTUAL */}
      <div>
        <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 12, fontWeight: 700, letterSpacing: 1.5 }}>
          LECTURA ACTIVA
        </div>
        {!currentBook ? (
          <Card C={C} isLight={isLight} style={{ padding: '36px 24px', textAlign: 'center', border: `1px dashed ${C.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <PkIc n="book" s={32} c={C.textMuted} />
            <div style={{ fontSize: 14, fontWeight: 600, color: C.textMid }}>Sin libro activo</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>Usa el botón "Añadir" para empezar</div>
          </Card>
        ) : (
          <div style={{ borderRadius: 24, overflow: 'hidden', background: `linear-gradient(155deg, ${pal.from} 0%, ${pal.to} 100%)`, boxShadow: `0 20px 56px ${pal.spine}22, 0 8px 32px rgba(0,0,0,0.5)`, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse at 68% 18%, ${pal.spine}18 0%, transparent 52%)` }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${pal.spine}90, transparent)` }} />
            
            <div style={{ padding: '26px 22px 22px', display: 'flex', gap: 18, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <BookCover book={currentBook} size="lg" floating={true} />
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div className="serif" style={{ fontSize: 21, fontWeight: 700, color: pal.text || '#fff', lineHeight: 1.22, marginBottom: 6, textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>
                  {currentBook.title}
                </div>
                <div style={{ fontSize: 12, marginBottom: 14, color: pal.text ? pal.text + 'AA' : 'rgba(255,255,255,0.6)' }}>
                  {currentBook.author}
                </div>
                {currentBook.genre && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: pal.spine, background: `${pal.spine}22`, border: `1px solid ${pal.spine}35`, borderRadius: 6, padding: '3px 9px' }}>
                    {currentBook.genre.toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.32)', padding: '16px 22px 22px', position: 'relative', zIndex: 1 }}>
              {/* Barra de progreso */}
              <ProgressStepper
                C={{ ...C, bgAlt:'rgba(255,255,255,0.09)', text:'#fff', textMuted:'rgba(255,255,255,0.48)', accent: pal.spine }}
                isLight={false} appState={appState} setAppState={setAppState} currentBook={currentBook}
              />
              
              {/* Cafetal de Enfoque incrustado */}
              <div style={{ marginTop:20, paddingTop:18, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
                  <PkIc n="coffee" s={16} c="rgba(255,255,255,0.7)" />
                  <span style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.7)', letterSpacing:1.5 }}>
                    CAFETAL DE ENFOQUE
                  </span>
                </div>
                <CafetalTimer
                  C={C} isLight={false} appState={appState} setAppState={setAppState}
                  pushNotif={pushNotif} currentBook={currentBook} setBooks={setBooks}
                  onCoinBurst={onCoinBurst} onAchievement={onAchievement}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LIBRO DE LA PAREJA */}
      {user?.partner && appState.theirBook && (
        <div>
          <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 10, fontWeight: 700, letterSpacing: 1.5 }}>
            {partner.toUpperCase()} ESTÁ LEYENDO
          </div>
          <Card C={C} isLight={isLight} style={{ padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ flexShrink: 0, width: 42, height: 60, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              <BookCover book={appState.theirBook} size="sm" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{appState.theirBook.title}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{appState.theirBook.author}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <div style={{ flex: 1, height: 3, borderRadius: 99, background: C.border }}>
                  <div style={{ height: '100%', borderRadius: 99, width: `${appState.theirProgress || 0}%`, background: getPalette(appState.theirBook.genre).spine }} />
                </div>
                <span style={{ fontSize: 11, color: C.textMuted, fontWeight: 600 }}>{appState.theirProgress || 0}%</span>
              </div>
              <div style={{ fontSize: 10, color: appState.theirConfirmed ? C.tealMid : C.textMuted, marginTop: 5, fontWeight: 600 }}>
                {appState.theirConfirmed ? '✓ Confirmó hoy' : 'Sin confirmar hoy'}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* OTROS LIBROS */}
      {otherBooks.length > 0 && (
        <div>
          <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 12, fontWeight: 700, letterSpacing: 1.5 }}>
            EN LA BIBLIOTECA · {otherBooks.length}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {otherBooks.map(book => (
              <Card key={book.id} C={C} isLight={isLight}
                onClick={() => setAppState(s => ({ ...s, currentBookId: book.id, currentChapter: 1, currentPage: 1, yourProgress: 0 }))}
                style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <BookCover book={book} size="sm" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{book.author || 'Autor desconocido'}</div>
                </div>
                <PkIc n="right" s={14} c={C.border} />
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  ICFES — Metadatos y banco de preguntas (50 preguntas)
// ─────────────────────────────────────────────
const SUBJECT_META = {
  'Lectura Crítica':    { color: '#A78BFA', bg: '#A78BFA16', short: 'LC' },
  'Matemáticas':        { color: '#60A5FA', bg: '#60A5FA16', short: 'MA' },
  'Ciencias Naturales': { color: '#34D399', bg: '#34D39916', short: 'CN' },
  'Ciencias Sociales':  { color: '#FBBF24', bg: '#FBBF2416', short: 'CS' },
  'Inglés':             { color: '#F472B6', bg: '#F472B616', short: 'IN' },
};
const PERF_LEVELS = [
  { min: 0,   max: 199, label: 'Por debajo del promedio', color: '#EF4444', emoji: '📚' },
  { min: 200, max: 299, label: 'Promedio nacional',       color: '#F59E0B', emoji: '⚡' },
  { min: 300, max: 399, label: 'Por encima del promedio', color: '#60A5FA', emoji: '🌟' },
  { min: 400, max: 500, label: 'Rendimiento excepcional', color: '#34D399', emoji: '🏆' },
];
const getPerfLevel = s => PERF_LEVELS.find(l => s >= l.min && s <= l.max) || PERF_LEVELS[0];

const ICFES_QUESTIONS = [
  { id:1,  subject:'Lectura Crítica',    nivel:'Análisis',             text:`Lee el siguiente fragmento y responde:\n\n"El progreso técnico moderno nos ha dado el poder de transformar la naturaleza a una escala sin precedentes. Sin embargo, este poder vino acompañado de una responsabilidad que muchas sociedades tardaron en reconocer..."\n\n¿Cuál es el propósito comunicativo principal del texto?`,                                                                                    options:['Celebrar los logros del progreso técnico moderno.','Denunciar la irresponsabilidad de las industrias.','Reflexionar críticamente sobre las consecuencias del desarrollo.','Proponer soluciones concretas.'],                                                          correct:2, explanation:'El texto reconoce tanto beneficios como consecuencias negativas, constituyendo una reflexión crítica equilibrada.' },
  { id:2,  subject:'Lectura Crítica',    nivel:'Lógica',               text:`Analiza el argumento:\n\n"Todos los artistas verdaderos han sufrido. García Lorca sufrió profundamente. Por lo tanto, García Lorca fue un verdadero artista."\n\n¿Cuál es la falla lógica?`,                                                                                                                                                                                                         options:['La conclusión es falsa porque García Lorca no fue reconocido.','Comete afirmación del consecuente: que los artistas sufran no significa que todo el que sufre sea artista.','La premisa inicial es verdadera y la conclusión es lógica.','Es válido porque se basa en evidencia histórica.'],                                                            correct:1, explanation:'Es la falacia de afirmación del consecuente (Si P → Q; Q; luego P).' },
  { id:3,  subject:'Lectura Crítica',    nivel:'Inferencia',           text:`En la frase: "La memoria es un espejo que miente", el autor utiliza una figura retórica para expresar que:\n\n¿Qué quiere decir el autor?`,                                                                                                                                                                                                                                                           options:['Los espejos no reflejan la realidad con precisión física.','Los recuerdos suelen ser alteraciones o reconstrucciones subjetivas del pasado.','La memoria de las personas siempre busca engañar a los demás a propósito.','Es imposible recordar eventos traumáticos.'],                                                                                        correct:1, explanation:'La metáfora "espejo que miente" alude a que la memoria no es un reflejo exacto, sino una versión alterada por la mente.' },
  { id:4,  subject:'Lectura Crítica',    nivel:'Semántica',            text:`Lea el fragmento periodístico:\n\n"El candidato, lejos de amilanarse ante las acusaciones, esgrimió un discurso vehemente."\n\nEl sinónimo más adecuado para la palabra 'amilanarse' en este contexto es:`,                                                                                                                                                                                         options:['Envalentonarse','Atemorizarse','Excusarse','Burlarse'],                                                                                                                                                                                                                                                                                           correct:1, explanation:'"Amilanarse" significa acobardarse o atemorizarse. El texto indica que el candidato NO se asustó.' },
  { id:5,  subject:'Lectura Crítica',    nivel:'Síntesis',             text:`"La lectura hace al hombre completo; la conversación lo hace ágil, el escribir lo hace preciso". (Francis Bacon)\n\nSegún la cita anterior, se puede inferir que:`,                                                                                                                                                                                                                                  options:['La escritura es la única habilidad que requiere precisión intelectual.','La conversación es superior a la lectura porque otorga agilidad mental.','El desarrollo integral del individuo depende de la combinación de diversas prácticas intelectuales.','Solo los hombres completos tienen la capacidad de escribir con precisión.'],                                  correct:2, explanation:'Bacon divide los beneficios de tres habilidades distintas, implicando que todas son necesarias para el desarrollo integral.' },
  { id:6,  subject:'Lectura Crítica',    nivel:'Análisis Poético',     text:`Lee el siguiente Haiku clásico de Matsuo Bashō:\n\n"Un viejo estanque;\nsalta una rana,\n¡plop! sonido de agua."\n\nDesde la estética literaria zen, ¿qué elemento contrasta principalmente en este poema?`,                                                                                                                                                                                        options:['El terror a la naturaleza frente a la tranquilidad humana.','La eternidad estática del estanque frente a la acción efímera de la rana.','El ruido ensordecedor frente al silencio absoluto del bosque.','La juventud de la rana frente a la vejez del poeta.'],                                                                                           correct:1, explanation:'El haiku opone magistralmente la inmutabilidad (viejo estanque) con la fugacidad del instante (el salto y el sonido).' },
  { id:7,  subject:'Lectura Crítica',    nivel:'Epistemología',        text:`"La ciencia no nos dice la verdad absoluta, sino la verdad hasta donde hemos llegado a comprenderla hoy, siempre dispuesta a ser corregida mañana por nueva evidencia."\n\nEste texto sugiere que el conocimiento científico es fundamentalmente:`,                                                                                                                                                  options:['Falso y poco confiable.','Dogmático y estructurado.','Provisional y perfectible.','Subjetivo y emocional.'],                                                                                                                                                                                                                                     correct:2, explanation:'La ciencia se basa en la constante revisión; por ende, sus verdades no son absolutas, sino perfectibles y provisionales.' },
  { id:8,  subject:'Lectura Crítica',    nivel:'Tipología Textual',    text:`Un texto comienza así: "Según los últimos datos del Banco Mundial, la inflación en América Latina ha decrecido un 1.2% en el último trimestre, lo cual sugiere una estabilización de los mercados financieros locales."\n\n¿A qué tipología corresponde este fragmento?`,                                                                                                                              options:['Argumentativo - Filosófico.','Narrativo - Ficción.','Expositivo - Informativo.','Descriptivo - Literario.'],                                                                                                                                                                                                                                     correct:2, explanation:'Expone datos objetivos para informar sobre una situación específica sin recurrir a la narrativa o a la literatura.' },
  { id:9,  subject:'Lectura Crítica',    nivel:'Inferencia',           text:`Al decir "Se frotó las manos y miró el horizonte gris con una sonrisa torcida", el autor nos da a entender indirectamente que el personaje:`,                                                                                                                                                                                                                                                         options:['Siente mucho frío y está triste por el clima.','Acaba de lavar sus manos y está feliz.','Anticipa un evento desafiante o maquiavélico con satisfacción.','No puede ver bien debido a la niebla espesa.'],                                                                                                                                         correct:2, explanation:'Frotarse las manos y la "sonrisa torcida" son lenguaje no verbal clásico de maquinación o satisfacción ante un conflicto.' },
  { id:10, subject:'Lectura Crítica',    nivel:'Evaluación',           text:`Identifica la premisa implícita en este argumento: "No debes fumar, porque daña los pulmones".`,                                                                                                                                                                                                                                                                                                       options:['Fumar es un hábito costoso.','Aquello que daña los pulmones debe ser evitado.','Los pulmones se regeneran con el tiempo.','Todas las personas que fuman terminan en el hospital.'],                                                                                                                                                               correct:1, explanation:'Para que "daña los pulmones" sirva de base para "no debes fumar", debe existir la regla implícita de que lo dañino debe evitarse.' },
  { id:11, subject:'Matemáticas',        nivel:'Álgebra',              text:`Una empresa modela su costo de producción con:\nC(x) = 3x² − 12x + 20\ndonde x es la cantidad en cientos de unidades.\n\n¿Para qué valor de x se minimiza el costo?`,                                                                                                                                                                                                                               options:['x = 1','x = 2','x = 3','x = 4'],                                                                                                                                                                                                                                                                                                                correct:1, explanation:'El mínimo de una parábola ax² + bx + c está en x = -b/(2a). Aquí x = -(-12)/(2·3) = 2.' },
  { id:12, subject:'Matemáticas',        nivel:'Probabilidad',         text:`En una clase, 20% sacó notas altas, 35% medias-altas, 30% medias-bajas y 15% bajas.\n\n¿Cuál es la probabilidad de elegir alguien con nota de media-alta hacia arriba?`,                                                                                                                                                                                                                              options:['0.20','0.35','0.55','0.65'],                                                                                                                                                                                                                                                                                                                     correct:2, explanation:'Se suma el 20% (altas) y el 35% (medias-altas) = 55%. La probabilidad es 0.55.' },
  { id:13, subject:'Matemáticas',        nivel:'Geometría',            text:`Una rampa tiene 6 metros de base horizontal y 30° de inclinación.\n\n¿Cuál es su altura vertical? (tan 30° ≈ 0.577)`,                                                                                                                                                                                                                                                                               options:['Aprox. 2.60 m','Aprox. 3.00 m','Aprox. 3.46 m','Aprox. 5.20 m'],                                                                                                                                                                                                                                                                                correct:2, explanation:'Altura = base × tan(30°) = 6 × 0.577 = 3.462 m.' },
  { id:14, subject:'Matemáticas',        nivel:'Estadística',          text:`El promedio de las edades de 4 personas es 25 años. Si se suma una quinta persona de 35 años, ¿cuál es el nuevo promedio?`,                                                                                                                                                                                                                                                                          options:['25 años','27 años','30 años','35 años'],                                                                                                                                                                                                                                                                                                         correct:1, explanation:'Suma inicial = 4 × 25 = 100. Suma nueva = 135. Nuevo promedio = 135 / 5 = 27.' },
  { id:15, subject:'Matemáticas',        nivel:'Aritmética',           text:`Un artículo que cuesta $80.000 recibe un descuento del 20% y luego un impuesto del 10% sobre el valor con descuento. ¿Cuál es el precio final?`,                                                                                                                                                                                                                                                     options:['$72.000','$70.400','$68.000','$80.000'],                                                                                                                                                                                                                                                                                                         correct:1, explanation:'Con descuento: 80.000 × 0.80 = 64.000. Con impuesto: 64.000 × 1.10 = 70.400.' },
  { id:16, subject:'Matemáticas',        nivel:'Trigonometría',        text:`Un triángulo rectángulo tiene catetos de 3 cm y 4 cm. ¿Cuál es el Seno del ángulo opuesto al cateto de 3 cm?`,                                                                                                                                                                                                                                                                                       options:['3/4','4/5','3/5','4/3'],                                                                                                                                                                                                                                                                                                                         correct:2, explanation:'Hipotenusa = √(9+16) = 5. Sen = Opuesto/Hipotenusa = 3/5.' },
  { id:17, subject:'Matemáticas',        nivel:'Estadística',          text:`En un conjunto de datos, la varianza es 16. ¿Cuál es la desviación estándar?`,                                                                                                                                                                                                                                                                                                                        options:['256','8','4','2'],                                                                                                                                                                                                                                                                                                                               correct:2, explanation:'La desviación estándar es la raíz cuadrada de la varianza. √16 = 4.' },
  { id:18, subject:'Matemáticas',        nivel:'Sistemas de Ecuaciones',text:`En un estacionamiento hay motos (2 ruedas) y carros (4 ruedas). Si hay 20 vehículos y 64 ruedas, ¿cuántos carros hay?`,                                                                                                                                                                                                                                                                             options:['8','10','12','14'],                                                                                                                                                                                                                                                                                                                              correct:2, explanation:'M + C = 20 y 2M + 4C = 64. Resolviendo: C = 12.' },
  { id:19, subject:'Matemáticas',        nivel:'Geometría del Espacio', text:`Un tanque cilíndrico tiene 2 m de radio y 5 m de altura. ¿Cuál es su volumen? (π ≈ 3.14)`,                                                                                                                                                                                                                                                                                                         options:['31.4 m³','62.8 m³','125.6 m³','15.7 m³'],                                                                                                                                                                                                                                                                                                       correct:1, explanation:'V = π × r² × h = 3.14 × 4 × 5 = 62.8 m³.' },
  { id:20, subject:'Matemáticas',        nivel:'Combinatoria',         text:`Una heladería ofrece 5 sabores y 3 salsas. ¿Cuántas combinaciones diferentes puede elegir un cliente que quiere un sabor y una salsa?`,                                                                                                                                                                                                                                                               options:['8','15','125','243'],                                                                                                                                                                                                                                                                                                                            correct:1, explanation:'Principio multiplicativo: 5 × 3 = 15 combinaciones totales.' },
  { id:21, subject:'Ciencias Naturales', nivel:'Biología Celular',     text:`La mitocondria es considerada "la central energética de la célula" porque es el organelo donde se realiza:`,                                                                                                                                                                                                                                                                                          options:['La síntesis de proteínas mediante los ribosomas.','La respiración celular aeróbica, produciendo la mayor parte del ATP.','La digestión celular de partículas externas (fagocitosis).','La duplicación del ADN antes de la división celular.'],                                                                                                     correct:1, explanation:'La respiración celular aeróbica ocurre en la mitocondria, produciendo ~30-32 moléculas de ATP por glucosa.' },
  { id:22, subject:'Ciencias Naturales', nivel:'Genética',             text:`En la genética mendeliana, si un progenitor tiene genotipo Bb (heterocigoto) y el otro BB (homocigoto dominante), ¿qué porcentaje de la descendencia será heterocigota (Bb)?`,                                                                                                                                                                                                                       options:['0%','25%','50%','100%'],                                                                                                                                                                                                                                                                                                                         correct:2, explanation:'El cruce BB × Bb produce: BB, BB, Bb, Bb → 50% heterocigotos (Bb).' },
  { id:23, subject:'Ciencias Naturales', nivel:'Química',              text:`Al disolverse el NaCl en agua, ocurre un proceso llamado:`,                                                                                                                                                                                                                                                                                                                                           options:['Ionización por disociación electrolítica, rodeando iones Na⁺ y Cl⁻ con moléculas de H₂O.','Oxidación del sodio y reducción del cloro.','Formación de un compuesto covalente entre Na y H₂O.','Reacción de precipitación que forma NaOH y HCl.'],                                                                                                  correct:0, explanation:'El NaCl se disocia en iones Na⁺ y Cl⁻, los cuales son solvatados (rodeados) por las moléculas polares del agua.' },
  { id:24, subject:'Ciencias Naturales', nivel:'Física',               text:`Un objeto cae libremente desde el reposo. Usando g = 10 m/s², ¿cuál es su velocidad después de 3 segundos?`,                                                                                                                                                                                                                                                                                         options:['10 m/s','20 m/s','30 m/s','45 m/s'],                                                                                                                                                                                                                                                                                                            correct:2, explanation:'v = g × t = 10 m/s² × 3 s = 30 m/s.' },
  { id:25, subject:'Ciencias Naturales', nivel:'Ecología',             text:`En un ecosistema, los organismos que producen materia orgánica a partir de sustancias inorgánicas mediante la fotosíntesis se denominan:`,                                                                                                                                                                                                                                                            options:['Consumidores primarios.','Descomponedores.','Productores.','Consumidores secundarios.'],                                                                                                                                                                                                                                                          correct:2, explanation:'Los productores (plantas, algas) son la base de la cadena alimentaria al convertir energía solar en materia orgánica.' },
  { id:26, subject:'Ciencias Naturales', nivel:'Biología',             text:`El proceso de la meiosis es fundamental para la reproducción sexual porque:`,                                                                                                                                                                                                                                                                                                                         options:['Duplica el material genético para la división celular.','Reduce a la mitad el número de cromosomas, produciendo gametos haploides.','Repara el ADN dañado en las células somáticas.','Produce células idénticas a la célula madre.'],                                                                                                             correct:1, explanation:'La meiosis genera células con la mitad de cromosomas (haploides), que al fusionarse restauran el número diploide.' },
  { id:27, subject:'Ciencias Naturales', nivel:'Química Orgánica',     text:`¿Cuál de los siguientes compuestos es un hidrocarburo aromático?`,                                                                                                                                                                                                                                                                                                                                    options:['Metano (CH₄)','Etanol (C₂H₅OH)','Benceno (C₆H₆)','Ácido acético (CH₃COOH)'],                                                                                                                                                                                                                                                                  correct:2, explanation:'El benceno posee un anillo hexagonal de carbonos con enlaces conjugados, característica definitoria de los aromáticos.' },
  { id:28, subject:'Ciencias Naturales', nivel:'Física Ondulatoria',   text:`Si una onda de sonido tiene frecuencia de 440 Hz y viaja en el aire a 340 m/s, ¿cuál es su longitud de onda?`,                                                                                                                                                                                                                                                                                       options:['0.77 m','1.3 m','1.94 m','1503.2 m'],                                                                                                                                                                                                                                                                                                           correct:0, explanation:'λ = v/f = 340/440 ≈ 0.77 m.' },
  { id:29, subject:'Ciencias Naturales', nivel:'Anatomía',             text:`¿Cuál de los siguientes procesos NO ocurre en el intestino delgado?`,                                                                                                                                                                                                                                                                                                                                 options:['Absorción de nutrientes hacia la sangre.','Acción de enzimas pancreáticas e intestinales.','Producción de bilis para emulsionar grasas.','Digestión de proteínas, grasas y carbohidratos.'],                                                                                                                                                      correct:2, explanation:'La bilis es producida por el hígado y almacenada en la vesícula biliar, no en el intestino delgado.' },
  { id:30, subject:'Ciencias Naturales', nivel:'Electromagnetismo',    text:`La Ley de Ohm establece que, en un circuito eléctrico resistivo, la relación entre Voltaje (V), Corriente (I) y Resistencia (R) es:`,                                                                                                                                                                                                                                                                options:['V = I / R','I = V × R','V = I × R','R = V × I'],                                                                                                                                                                                                                                                                                                correct:2, explanation:'La Ley de Ohm establece V = I × R. La resistencia opone el paso de la corriente.' },
  { id:31, subject:'Ciencias Sociales',  nivel:'Historia de Colombia', text:`La Constitución Política de Colombia de 1991 fue promulgada en respuesta a una profunda crisis institucional del país. Una de sus características más innovadoras fue:`,                                                                                                                                                                                                                              options:['Establecer un sistema presidencialista con reelección inmediata indefinida.','Reconocer a Colombia como un Estado Social de Derecho, pluriétnico y multicultural.','Eliminar la autonomía de las regiones y centralizar todo el poder en Bogotá.','Prohibir la participación de movimientos políticos alternativos al bipartidismo.'],              correct:1, explanation:'La CP-91 introdujo el Estado Social de Derecho, la tutela, la diversidad étnica y cultural, y mecanismos de participación ciudadana.' },
  { id:32, subject:'Ciencias Sociales',  nivel:'Geografía',            text:`Colombia posee una ubicación geográfica privilegiada en América del Sur. ¿Cuál de las siguientes afirmaciones describe mejor esta ventaja estratégica?`,                                                                                                                                                                                                                                              options:['Es el único país con acceso al Océano Atlántico en Sudamérica.','Posee costas tanto en el Océano Pacífico como en el Mar Caribe, y comparte fronteras con cinco países suramericanos y Panamá.','Tiene la mayor extensión territorial del continente americano.','Comparte la Amazonía exclusivamente con Brasil.'],                              correct:1, explanation:'Colombia es el único país en Sudamérica con salida a dos océanos, posición que le confiere enorme biodiversidad y potencial comercial.' },
  { id:33, subject:'Ciencias Sociales',  nivel:'Economía',             text:`El Producto Interno Bruto (PIB) de un país mide:`,                                                                                                                                                                                                                                                                                                                                                    options:['El ingreso promedio de los ciudadanos después de impuestos.','El valor total de todos los bienes y servicios finales producidos dentro de las fronteras del país en un período determinado.','La suma de las exportaciones netas de bienes y servicios.','El nivel de deuda pública acumulada por el gobierno nacional.'],                           correct:1, explanation:'El PIB es el indicador macroeconómico más común para medir el tamaño de una economía y su producción total.' },
  { id:34, subject:'Ciencias Sociales',  nivel:'Política',             text:`En un Estado democrático republicano, la separación de poderes (Ejecutivo, Legislativo y Judicial) tiene como propósito fundamental:`,                                                                                                                                                                                                                                                               options:['Acelerar los procesos de toma de decisiones del gobierno.','Concentrar el poder en el órgano más representativo de la voluntad popular.','Evitar la concentración del poder en una sola institución y garantizar el control y equilibrio entre las ramas.','Garantizar que solo el poder judicial pueda legislar en materia de derechos.'],       correct:2, explanation:'La separación de poderes (Montesquieu) busca el sistema de frenos y contrapesos para evitar el abuso del poder.' },
  { id:35, subject:'Ciencias Sociales',  nivel:'Historia Universal',   text:`La Revolución Industrial del siglo XVIII-XIX en Europa produjo transformaciones sociales profundas. Una de las más significativas fue:`,                                                                                                                                                                                                                                                             options:['El fortalecimiento de la aristocracia terrateniente como clase dominante.','El surgimiento del proletariado urbano como nueva clase social y sus movimientos reivindicativos.','La disminución de la población en las ciudades por la migración al campo.','La desaparición del comercio internacional de materias primas.'],                         correct:1, explanation:'La industrialización creó el proletariado urbano, cuyas condiciones laborales precarias dieron origen al movimiento obrero y el sindicalismo.' },
  { id:36, subject:'Ciencias Sociales',  nivel:'Sociología',           text:`El concepto de "estratificación social" en sociología se refiere a:`,                                                                                                                                                                                                                                                                                                                                 options:['La clasificación de las culturas según su nivel de desarrollo tecnológico.','La organización jerárquica de la sociedad en grupos diferenciados por criterios como riqueza, poder o prestigio.','El proceso de integración de inmigrantes en una nueva sociedad.','La movilidad geográfica de la población entre regiones.'],                        correct:1, explanation:'La estratificación describe cómo las sociedades se organizan en capas o estratos con diferente acceso a recursos y poder.' },
  { id:37, subject:'Ciencias Sociales',  nivel:'Filosofía Política',   text:`El filósofo John Locke argumentó que los individuos poseen derechos naturales inalienables. ¿Cuáles son estos derechos según su teoría?`,                                                                                                                                                                                                                                                            options:['Trabajo, educación y seguridad social.','Vida, libertad y propiedad.','Igualdad, fraternidad y justicia.','Paz, honor y defensa de la nación.'],                                                                                                                                                                                                 correct:1, explanation:'Locke postuló que vida, libertad y propiedad son derechos naturales previos al Estado, fundando el liberalismo político clásico.' },
  { id:38, subject:'Ciencias Sociales',  nivel:'Historia de Colombia', text:`El conflicto armado en Colombia durante el siglo XX tuvo múltiples causas estructurales. ¿Cuál de las siguientes fue una de las principales?`,                                                                                                                                                                                                                                                       options:['La invasión militar extranjera y la ocupación de territorio colombiano.','La inequitativa distribución de la tierra y la exclusión política de sectores de la población.','La competencia económica con países vecinos por el canal de Panamá.','La sobrepoblación en las ciudades que generó inseguridad y desempleo masivo.'],                   correct:1, explanation:'La alta concentración de la tierra (latifundismo) y la exclusión política bipartidista fueron detonantes fundamentales del conflicto armado.' },
  { id:39, subject:'Ciencias Sociales',  nivel:'Derecho',              text:`El mecanismo de la Acción de Tutela en Colombia, consagrada en el Artículo 86 de la Constitución, permite a los ciudadanos:`,                                                                                                                                                                                                                                                                        options:['Derogar leyes que consideren inconstitucionales.','Reclamar la protección inmediata de derechos fundamentales cuando sean vulnerados o amenazados.','Elegir o revocar el mandato de funcionarios públicos.','Presentar proyectos de ley directamente ante el Congreso.'],                                                                          correct:1, explanation:'La tutela es el mecanismo constitucional de acción rápida para proteger derechos fundamentales vulnerados por autoridades o particulares.' },
  { id:40, subject:'Ciencias Sociales',  nivel:'Cultura',              text:`La diversidad cultural de Colombia está reconocida en su Constitución Política. ¿Qué implica el concepto de "Estado pluriétnico y multicultural"?`,                                                                                                                                                                                                                                                  options:['Que todos los ciudadanos deben hablar el mismo idioma y compartir una cultura única.','El reconocimiento y protección de la diversidad de etnias, culturas y cosmovisiones que coexisten en el territorio.','Que las comunidades indígenas son independientes del Estado colombiano.','Que la cultura extranjera tiene prioridad sobre la nacional.'], correct:1, explanation:'El pluralismo cultural reconoce las diferencias étnicas y culturales como riqueza, no como amenaza, y las protege constitucionalmente.' },
  { id:41, subject:'Inglés',             nivel:'Comprensión Lectora',  text:`Read the following text:\n\n"Scientists have discovered that regular physical exercise not only strengthens the body but also significantly improves mental health. Studies show that people who exercise at least three times a week report lower levels of anxiety and depression."\n\nWhat is the main idea of the text?`,                                                                           options:['Exercise causes anxiety and depression in some people.','Physical exercise only benefits the body, not the mind.','Regular exercise has positive effects on both physical and mental health.','Scientists disagree about the benefits of exercise.'],                                                                                                 correct:2, explanation:'The text explicitly mentions that exercise benefits both physical health ("strengthens the body") and mental health ("improves mental health").' },
  { id:42, subject:'Inglés',             nivel:'Vocabulario',          text:`Choose the correct meaning of the word "abundant" in the following sentence:\n\n"The Amazon rainforest has abundant biodiversity, making it the richest ecosystem on Earth."`,                                                                                                                                                                                                                        options:['Scarce and hard to find.','Present in large quantities; plentiful.','Harmful and dangerous.','Discovered recently.'],                                                                                                                                                                                                                             correct:1, explanation:'"Abundant" means existing in great quantities. The context of "richest ecosystem" confirms the positive, plentiful meaning.' },
  { id:43, subject:'Inglés',             nivel:'Gramática',            text:`Choose the correct form of the verb to complete the sentence:\n\n"By the time the rescue team arrived, the hikers _______ in the cave for two days."`,                                                                                                                                                                                                                                               options:['were staying','had been staying','are staying','will have stayed'],                                                                                                                                                                                                                                                                               correct:1, explanation:'"Had been staying" (Past Perfect Continuous) is correct because it describes an action that began in the past and continued up to another point in the past.' },
  { id:44, subject:'Inglés',             nivel:'Conectores',           text:`Select the connector that best completes the sentence:\n\n"She studied very hard for the exam; _______, she failed to pass it."`,                                                                                                                                                                                                                                                                    options:['therefore','furthermore','nevertheless','consequently'],                                                                                                                                                                                                                                                                                          correct:2, explanation:'"Nevertheless" (= sin embargo / a pesar de ello) expresses contrast, which is the correct logical connection: she studied hard BUT failed.' },
  { id:45, subject:'Inglés',             nivel:'Comprensión de Diálogo',text:`Read the dialogue:\n\nAlex: "I'm thinking about taking a gap year before university."\nSam: "That sounds like a great idea, but have you considered the financial implications?"\nAlex: "Yes, I've saved up enough to travel for six months."\n\nWhat can be inferred about Alex?`,                                                                                                                  options:['Alex has not made any decision about university yet.','Alex is financially unprepared for a gap year.','Alex has planned ahead and saved money for the gap year.','Alex wants Sam to lend money for the trip.'],                                                                                                                                    correct:2, explanation:'Alex explicitly states he has "saved up enough", which demonstrates prior financial planning for the gap year.' },
  { id:46, subject:'Inglés',             nivel:'Escritura Funcional',  text:`Which sentence is grammatically correct and appropriately formal for a job application letter?`,                                                                                                                                                                                                                                                                                                      options:['"I wanna work at your company cuz it seems pretty cool."','"I am writing to express my keen interest in the Software Engineer position advertised on your website."','"Your company looks good and I think I can do the job."','"Me and my friend both want jobs at your organization."'],                                                           correct:1, explanation:'Option B uses formal register, correct grammar, and professional vocabulary appropriate for a job application.' },
  { id:47, subject:'Inglés',             nivel:'Vocabulario Avanzado', text:`The word "ephemeral" most closely means:`,                                                                                                                                                                                                                                                                                                                                                           options:['Permanent and everlasting.','Lasting for a very short time; transitory.','Extremely important and significant.','Related to physical appearance.'],                                                                                                                                                                                               correct:1, explanation:'"Ephemeral" derives from Greek "ephemeros" (lasting a day), meaning transient or short-lived. Example: "ephemeral beauty of cherry blossoms".' },
  { id:48, subject:'Inglés',             nivel:'Comprensión Crítica',  text:`Read the quote:\n\n"The limits of my language mean the limits of my world." (Ludwig Wittgenstein)\n\nWhat does this philosophical statement imply?`,                                                                                                                                                                                                                                                  options:['People who speak more languages are physically stronger.','Language is merely a tool for communication with no deeper significance.','The concepts and vocabulary we have shape and define the reality we can perceive and understand.','Bilingual people have a smaller worldview than monolingual people.'],                                        correct:2, explanation:'Wittgenstein suggests that our capacity to think and perceive reality is bounded by the linguistic tools (words and concepts) we possess.' },
  { id:49, subject:'Inglés',             nivel:'Condicionales',        text:`Complete the conditional sentence correctly:\n\n"If I _______ harder when I was young, I _______ a doctor now."`,                                                                                                                                                                                                                                                                                    options:['study / would be','had studied / would be','studied / will be','have studied / would have been'],                                                                                                                                                                                                                                               correct:1, explanation:'This is a Mixed Conditional (3rd+2nd): "If I had studied" (past condition, 3rd cond.) + "I would be" (present result, 2nd cond.).' },
  { id:50, subject:'Inglés',             nivel:'Análisis de Texto',    text:`Read the paragraph:\n\n"Despite receiving little formal education, Leonardo da Vinci became one of history's most versatile geniuses, excelling in painting, sculpture, architecture, science, and engineering."\n\nThe word "despite" indicates:`,                                                                                                                                                    options:['A cause-and-effect relationship.','A concession or contrast between two ideas.','A comparison between Leonardo and others.','A time sequence of events.'],                                                                                                                                                                                        correct:1, explanation:'"Despite" introduces a concession: his lack of education (obstacle) contrasted with his extraordinary achievements (result).' },
];


// ─────────────────────────────────────────────
//  ICFES — ScoreGauge
// ─────────────────────────────────────────────
function ScoreGauge({ score, C }) {
  const maxScore = 500;
  const pct = (score / maxScore) * 100;
  const radius = 60, circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;
  const level = getPerfLevel(score);
  return (
    <div style={{ position: 'relative', width: 160, height: 160 }}>
      <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="80" cy="80" r={radius} fill="none" stroke={C.bgAlt} strokeWidth="12" />
        <circle cx="80" cy="80" r={radius} fill="none" stroke={level.color} strokeWidth="12"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)', filter: `drop-shadow(0 0 8px ${level.color}80)` }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: level.color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{score}</div>
        <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 600, letterSpacing: 1 }}>/ 500</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  ICFES — Expedición del Saber (Colombian Premium)
// ─────────────────────────────────────────────
function IcfesDashboard({ C, isLight, appState, setAppState, onStartSetup, onGoOracle, onMissionReward, onGoShop }) {
  const history    = appState.icfesHistory || [];
  const hasHistory = history.length > 0;
  const best       = hasHistory ? Math.max(...history.map(r => r.score)) : 0;
  const avg        = hasHistory ? Math.round(history.reduce((s,r)=>s+r.score,0)/history.length) : 0;
  const streak     = appState.icfesStreak || 0;
  const total      = history.length;
  const recentFive = history.slice(-5).reverse();
  const bestLevel  = getPerfLevel(best);

  const cafeOscuro = '#2C1810';
  const oroMacuquina = '#C9963A';

  const [chestOpen, setChestOpen] = useState(false);
  const todayMissions = generateDailyMissions(todayStr());
  const missionsReady = todayMissions.filter(m => getMissionProgress(m, appState) >= m.target && !(appState.missionsRewarded || []).includes(m.id)).length;

  return (
    <div className="fi" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── COFRE DE MISIONES (botón sutil) ── */}
      <button onClick={() => setChestOpen(true)} style={{
        display: 'flex', alignItems: 'center', gap: 12, width: '100%', cursor: 'pointer', fontFamily: 'inherit',
        background: `linear-gradient(135deg, ${C.accent}12, transparent)`, border: `1px solid ${C.accent}30`,
        borderRadius: 16, padding: '12px 16px', position: 'relative',
      }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: `${C.accent}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <PkIc n="mochila" s={20} c={C.accent} />
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>El Morral de Misiones</div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>Tus tareas del día y recompensas</div>
        </div>
        {missionsReady > 0 && (
          <div style={{ minWidth: 22, height: 22, borderRadius: 11, background: C.amberMid, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, padding: '0 7px', boxShadow: `0 0 12px ${C.amberMid}90`, animation: 'celestialPulse 1.6s ease-in-out infinite' }}>
            {missionsReady}
          </div>
        )}
        <PkIc n="right" s={15} c={C.accent} />
      </button>

      {/* Aviso de racha sin protección (estilo Duolingo) */}
      {(appState.streakDays || 0) >= 2 && (appState.streakFreezes || 0) === 0 && (
        <button onClick={onGoShop} style={{
          display: 'flex', alignItems: 'center', gap: 12, width: '100%', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
          background: 'linear-gradient(135deg, #38BDF815, transparent)', border: '1px solid #38BDF835',
          borderRadius: 16, padding: '12px 16px',
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: '#38BDF81A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <PkIc n="snowflake" s={20} c="#38BDF8" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#38BDF8' }}>Protege tu racha de {appState.streakDays} días</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>Sin un Kodachi de Hielo, un solo día sin estudiar y la pierdes</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#38BDF8', background: '#38BDF820', borderRadius: 8, padding: '6px 12px', flexShrink: 0 }}>
            Conseguir
          </div>
        </button>
      )}

      {/* Modal del Morral */}
      {chestOpen && (
        <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99996, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(14px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={() => setChestOpen(false)}>
          <div onClick={e => e.stopPropagation()} className="fu" style={{ width: '100%', maxWidth: 430, maxHeight: '80vh', overflowY: 'auto', background: C.bg, borderRadius: '24px 24px 0 0', border: `1px solid ${C.border}`, borderBottom: 'none', padding: '8px 18px 28px' }}>
            <div style={{ width: 40, height: 4, borderRadius: 99, background: C.border, margin: '8px auto 18px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: `linear-gradient(135deg, ${C.accent}, ${C.amberMid})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 18px ${C.accent}40` }}>
                <PkIc n="mochila" s={22} c="#000" />
              </div>
              <div style={{ flex: 1 }}>
                <div className="serif" style={{ fontSize: 20, fontWeight: 800, color: C.text }}>El Morral del Día</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>Cumple y reclama tus empanadas</div>
              </div>
              <button onClick={() => setChestOpen(false)} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <PkIc n="x" s={15} c={C.textMuted} />
              </button>
            </div>
            <DailyMissions C={C} isLight={isLight} appState={appState} setAppState={setAppState} onReward={onMissionReward} />
          </div>
        </div>
      )}

      {/* ── HERO: Territorio del Saber ── */}
      <div style={{
        borderRadius: 28, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(155deg, ${cafeOscuro} 0%, #3D1F0F 40%, #1A0E06 100%)`,
        padding: '32px 22px 26px',
        border: `1px solid ${oroMacuquina}22`,
        boxShadow: `0 24px 56px rgba(0,0,0,0.6), inset 0 1px 0 ${oroMacuquina}25`,
      }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:`repeating-linear-gradient(45deg,transparent,transparent 8px,rgba(255,255,255,0.012) 8px,rgba(255,255,255,0.012) 9px),repeating-linear-gradient(-45deg,transparent,transparent 8px,rgba(255,255,255,0.008) 8px,rgba(255,255,255,0.008) 9px)` }} />
        <div style={{ position:'absolute', top:-60, left:'50%', transform:'translateX(-50%)', width:280, height:180, pointerEvents:'none',
          background:`radial-gradient(ellipse, ${oroMacuquina}20 0%, transparent 70%)` }} />

        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
            <div style={{
              width:52, height:52, borderRadius:16, flexShrink:0,
              background:`linear-gradient(135deg, ${oroMacuquina}, #8B5E1A)`,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:`0 6px 20px rgba(201,150,58,0.45), inset 0 1px 0 rgba(255,255,255,0.2)`,
            }}>
              <PkIc n="rana" s={30} c="#fff" />
            </div>
            <div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:22, fontWeight:800, color:'#fff', lineHeight:1.1 }}>
                Territorio del Saber
              </div>
              <div style={{ fontSize:11, color:`${oroMacuquina}BB`, marginTop:3, letterSpacing:1.5, fontWeight:600 }}>
                SIMULADOR SABER 11 · PANKEY
              </div>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:22 }}>
            <div style={{ background:'rgba(0,0,0,0.35)', borderRadius:16, padding:'14px 10px', textAlign:'center', border:`1px solid ${oroMacuquina}20` }}>
              <div style={{ fontSize:9, color:`rgba(255,255,255,0.45)`, fontWeight:800, letterSpacing:1.5, marginBottom:6 }}>RACHA</div>
              <div style={{ fontSize:28, fontWeight:900, color:oroMacuquina, lineHeight:1, textShadow:`0 0 20px ${oroMacuquina}60` }}>{streak}</div>
              <div style={{ fontSize:8, color:`rgba(255,255,255,0.35)`, marginTop:4 }}>días seguidos</div>
            </div>
            <div style={{ background:'rgba(0,0,0,0.35)', borderRadius:16, padding:'14px 10px', textAlign:'center', border:`1px solid ${bestLevel.color}25` }}>
              <div style={{ fontSize:9, color:`rgba(255,255,255,0.45)`, fontWeight:800, letterSpacing:1.5, marginBottom:6 }}>MEJOR</div>
              <div style={{ fontSize:24, fontWeight:900, color:hasHistory?bestLevel.color:'rgba(255,255,255,0.2)', lineHeight:1 }}>{hasHistory?best:'—'}</div>
              <div style={{ fontSize:8, color:`rgba(255,255,255,0.35)`, marginTop:4 }}>/500 pts</div>
            </div>
            <div style={{ background:'rgba(0,0,0,0.35)', borderRadius:16, padding:'14px 10px', textAlign:'center', border:'1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize:9, color:`rgba(255,255,255,0.45)`, fontWeight:800, letterSpacing:1.5, marginBottom:6 }}>PRUEBAS</div>
              <div style={{ fontSize:28, fontWeight:900, color:'#fff', lineHeight:1 }}>{total}</div>
              <div style={{ fontSize:8, color:`rgba(255,255,255,0.35)`, marginTop:4 }}>simulacros</div>
            </div>
          </div>

          {hasHistory && (
            <div style={{ background:'rgba(0,0,0,0.25)', borderRadius:12, padding:'10px 16px', marginBottom:20, border:'1px solid rgba(255,255,255,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)' }}>Promedio histórico</div>
              <div style={{ fontSize:15, fontWeight:800, color:getPerfLevel(avg).color }}>{avg}/500 — {getPerfLevel(avg).label}</div>
            </div>
          )}

          {/* Botones de acción */}
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <button onClick={onStartSetup} style={{
              borderRadius:16, padding:'17px',
              background:`linear-gradient(135deg, ${oroMacuquina}, #8B5E1A)`,
              border:'none', color:'#fff', fontSize:14, fontWeight:800,
              cursor:'pointer', fontFamily:'inherit', letterSpacing:0.5,
              boxShadow:`0 8px 24px rgba(201,150,58,0.4), inset 0 -2px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)`,
              display:'flex', alignItems:'center', justifyContent:'center', gap:10,
              transition:'transform 0.15s',
            }}>
              <PkIc n="rana" s={20} c="#fff" />
              {hasHistory ? 'Nueva Expedición al Saber' : 'Iniciar Primera Expedición'}
            </button>

            {/* BOTÓN DEL ORÁCULO PREMIUM (Tallado en piedra con borde de oro) */}
            <button onClick={onGoOracle} style={{
              width: '100%', padding: '16px 20px', borderRadius: 16, cursor: 'pointer',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
              border: `1px solid ${C.accent}50`, color: C.accent, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 8px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)', transition: 'all 0.2s', fontFamily: 'inherit'
            }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
              <PkIc n="target" s={20} c={C.accent} />
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.5 }}>CONSULTAR AL ORÁCULO</span>
            </button>

            {/* Racha del día */}
            <div style={{
              borderRadius:14, padding:'13px 16px', marginTop: 6,
              background: appState.yourConfirmed ? 'rgba(52,211,153,0.08)' : 'rgba(201,150,58,0.08)',
              border:`1px solid ${appState.yourConfirmed ? '#34D39930' : `${oroMacuquina}35`}`,
              display:'flex', alignItems:'center', gap:12,
            }}>
              <div style={{ width:36, height:36, borderRadius:10, flexShrink:0,
                background: appState.yourConfirmed ? '#34D39920' : `${oroMacuquina}20`,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <PkIc n={appState.yourConfirmed ? 'check' : 'flame'} s={18} c={appState.yourConfirmed ? '#34D399' : oroMacuquina} />
              </div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color: appState.yourConfirmed ? '#34D399' : oroMacuquina }}>
                  {appState.yourConfirmed ? 'Racha de hoy sellada' : 'Completa un simulacro para sellar tu racha'}
                </div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.35)', marginTop:2 }}>
                  {appState.streakDays > 0 ? `Llevas ${appState.streakDays} día${appState.streakDays!==1?'s':''} de racha total` : 'Empieza hoy tu racha legendaria'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HISTORIAL RECIENTE ── */}
      {hasHistory && (
        <div>
          <div style={{ fontSize:10, color:C.textMuted, fontWeight:800, letterSpacing:1.8, marginBottom:14 }}>
            ÚLTIMAS EXPEDICIONES
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {recentFive.map((r,i)=>{
              const lv=getPerfLevel(r.score);
              const pct=Math.round((r.score/500)*100);
              return(
                <Card key={i} C={C} isLight={isLight} className="su" style={{ padding:'14px 18px', animationDelay:`${i*.06}s` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                    <div style={{ width:48, height:48, borderRadius:'50%', flexShrink:0, position:'relative',
                      background:`conic-gradient(${lv.color} ${pct}%, rgba(255,255,255,0.06) ${pct}%)`,
                      boxShadow:`0 0 14px ${lv.color}25`,
                    }}>
                      <div style={{ position:'absolute', inset:5, borderRadius:'50%', background:C.bgAlt,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:12, fontWeight:900, color:lv.color }}>
                        {r.score}
                      </div>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                        <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{lv.label}</span>
                        <span style={{ fontSize:10, color:C.textMuted }}>{r.correct}/{r.total} · {r.date}</span>
                      </div>
                      <div style={{ height:3, borderRadius:99, background:isLight?'rgba(0,0,0,0.07)':'rgba(255,255,255,0.07)', overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${pct}%`, borderRadius:99,
                          background:`linear-gradient(90deg,${lv.color}88,${lv.color})`,
                          boxShadow:`0 0 6px ${lv.color}60`, transition:'width 1s' }} />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Rendimiento por materia */}
      {hasHistory && (() => {
        const cumulative={};
        history.forEach(r=>Object.entries(r.subjectScores||{}).forEach(([s,v])=>{
          if(!cumulative[s])cumulative[s]={correct:0,total:0};
          cumulative[s].correct+=v.correct; cumulative[s].total+=v.total;
        }));
        const bySubject=Object.entries(cumulative).map(([s,v])=>({s,pct:v.total>0?Math.round(v.correct/v.total*100):0})).sort((a,b)=>b.pct-a.pct);
        if(!bySubject.length) return null;
        return(
          <Card C={C} isLight={isLight} style={{ padding:'18px 20px' }}>
            <div style={{ fontSize:10, color:C.textMuted, fontWeight:800, letterSpacing:1.8, marginBottom:14 }}>RENDIMIENTO HISTÓRICO</div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {bySubject.map(({s,pct})=>{
                const meta=SUBJECT_META[s]||{color:C.accent,bg:C.bgAlt,short:'??'};
                return(
                  <div key={s}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                        <div style={{ width:7, height:7, borderRadius:'50%', background:meta.color, boxShadow:`0 0 5px ${meta.color}` }} />
                        <span style={{ fontSize:12, fontWeight:600, color:C.text }}>{s}</span>
                      </div>
                      <span style={{ fontSize:11, fontWeight:800, color:meta.color, background:meta.bg, borderRadius:6, padding:'2px 8px' }}>{pct}%</span>
                    </div>
                    <div style={{ height:4, borderRadius:99, background:isLight?'rgba(0,0,0,0.06)':'rgba(255,255,255,0.07)', overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${meta.color}AA,${meta.color})`, boxShadow:`0 0 5px ${meta.color}50` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })()}
    </div>
  );
}
// ─────────────────────────────────────────────
//  ICFES — Setup
// ─────────────────────────────────────────────
function IcfesSetup({ C, isLight, onBeginTest, onBack }) {
  const countOptions = [5, 10, 15, 20, 25, 30, 50];
  const allSubjects  = Object.keys(SUBJECT_META);
  const [selectedCount, setSelectedCount] = useState(10);
  const [selectedSubs, setSelectedSubs]   = useState(allSubjects);

  const toggleSubject = (s) => {
    if (selectedSubs.includes(s) && selectedSubs.length === 1) return;
    if (selectedSubs.includes(s)) setSelectedSubs(p => p.filter(i => i !== s));
    else setSelectedSubs(p => [...p, s]);
  };

  return (
    <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.accent, cursor: 'pointer', padding: 0 }}>
          <PkIc n="left" s={20} c={C.accent} />
        </button>
        <div>
          <div className="serif" style={{ fontSize: 24, fontWeight: 700, color: C.text }}>Configurar Test</div>
          <div style={{ fontSize: 13, color: C.textMuted }}>Personaliza tu sesión de práctica.</div>
        </div>
      </div>

      <Card C={C} isLight={isLight} style={{ padding: '24px 22px' }}>
        <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 16 }}>1. CANTIDAD DE PREGUNTAS</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {countOptions.map(c => {
            const active = selectedCount === c;
            return (
              <button key={c} onClick={() => setSelectedCount(c)} style={{
                flex: 1, minWidth: '45px', padding: '12px 0', borderRadius: 12, fontFamily: 'inherit', cursor: 'pointer',
                background: active ? C.accent : 'transparent', color: active ? '#fff' : C.text,
                border: `1px solid ${active ? C.accent : C.border}`,
                fontSize: 15, fontWeight: 700, transition: 'all 0.2s',
                boxShadow: active ? `0 4px 14px ${C.accent}40` : 'none',
              }}>{c}</button>
            );
          })}
        </div>
        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 12, textAlign: 'center' }}>
          El sistema elegirá <b>{selectedCount}</b> preguntas al azar.
        </div>
      </Card>

      <Card C={C} isLight={isLight} style={{ padding: '24px 22px' }}>
        <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 16 }}>2. MATERIAS A INCLUIR</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {allSubjects.map(s => {
            const active = selectedSubs.includes(s);
            const meta   = SUBJECT_META[s];
            return (
              <button key={s} onClick={() => toggleSubject(s)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px', borderRadius: 14, fontFamily: 'inherit', cursor: 'pointer',
                background: active ? meta.bg : 'transparent',
                border: `1.5px solid ${active ? meta.color : C.border}`, transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: active ? meta.color : C.border }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: active ? meta.color : C.text }}>{s}</span>
                </div>
                {active && <PkIc n="check" s={16} c={meta.color} />}
              </button>
            );
          })}
        </div>
      </Card>

      <div style={{ marginTop: 10 }}>
        <PrimaryBtn C={C} onClick={() => onBeginTest(selectedSubs, selectedCount)}>
          Comenzar Test Ahora →
        </PrimaryBtn>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────
//  MOTOR VISUAL ICFES — Generador de Gráficas y Cuadernillos
// ─────────────────────────────────────────────
function IcfesVisualContext({ context }) {
  if (!context || typeof context !== 'object' || !context.type) return null;

  const validTypes = ['long_text', 'table', 'bar_chart', 'notice'];
  if (!validTypes.includes(context.type)) return null;

  const paperStyle = {
    background: '#F9F7F1',
    color: '#1C1917',
    padding: '24px 20px',
    borderRadius: '16px',
    border: '1px solid #E7E5E4',
    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02)',
    fontFamily: "'Noto Serif JP', serif",
    marginBottom: '20px'
  };

  return (
    <div style={paperStyle}>
      {/* 1. TEXTOS LARGOS (Lectura Crítica / Filosofía) */}
      {context.type === 'long_text' && (() => {
        // Blindaje: si Gemini manda un string, lo convertimos a array. Si no manda nada, ponemos un aviso.
        const rawParas = context.paragraphs || context.text || context.content;
        const paragraphs = Array.isArray(rawParas) ? rawParas : (typeof rawParas === 'string' ? [rawParas] : ["(El pergamino está borroso... falta el texto)"]);
        
        return (
          <div style={{ fontSize: 14, lineHeight: 1.8, textAlign: 'justify' }}>
            {context.title && <h4 style={{ textAlign: 'center', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1, fontSize: 13 }}>{context.title}</h4>}
            {paragraphs.map((p, i) => (
              <p key={i} style={{ marginBottom: 12 }}>{p}</p>
            ))}
            {context.source && <div style={{ fontSize: 10, textAlign: 'right', fontStyle: 'italic', marginTop: 10 }}>Tomado de: {context.source}</div>}
          </div>
        );
      })()}

      {/* 2. TABLAS DE DATOS */}
      {context.type === 'table' && context.data && context.data.headers && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <thead>
              <tr style={{ background: '#E7E5E4' }}>
                {context.data.headers.map((h, i) => (
                  <th key={i} style={{ padding: '10px', border: '1px solid #A8A29E', textAlign: 'center', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {context.data.rows && context.data.rows.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#F9F7F1' : '#F5F5F4' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '8px', border: '1px solid #A8A29E', textAlign: 'center' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. GRÁFICAS DE BARRAS */}
      {context.type === 'bar_chart' && context.data && (
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {context.title && <div style={{ fontSize: 12, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>{context.title}</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {context.data.map((bar, i) => {
              const maxVal = Math.max(...context.data.map(b => b.value || 1));
              const pct = ((bar.value || 0) / maxVal) * 100;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 60, fontSize: 11, textAlign: 'right', fontWeight: 600 }}>{bar.label}</div>
                  <div style={{ flex: 1, height: 16, background: '#E7E5E4', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: '#44403C', transition: 'width 1s' }} />
                  </div>
                  <div style={{ width: 40, fontSize: 11, fontWeight: 700 }}>{bar.value}</div>
                </div>
              );
            })}
          </div>
          {context.axisLabel && <div style={{ fontSize: 10, textAlign: 'center', marginTop: 10, fontStyle: 'italic' }}>{context.axisLabel}</div>}
        </div>
      )}

      {/* 4. AVISOS DE INGLÉS */}
      {context.type === 'notice' && (() => {
        // Blindaje: Buscar el texto en diferentes posibles variables que Gemini se invente
        const noticeText = context.text || context.message || context.title || "WARNING";
        return (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
            <div style={{ border: '4px solid #1C1917', padding: '20px 30px', textAlign: 'center', background: '#fff', borderRadius: 8, boxShadow: '4px 4px 0 rgba(0,0,0,0.1)', maxWidth: '90%' }}>
              <div style={{ fontSize: 22, fontWeight: 900, textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans', sans-serif", wordWrap: 'break-word' }}>
                {noticeText}
              </div>
              {context.subtext && <div style={{ fontSize: 12, marginTop: 10, fontWeight: 600 }}>{context.subtext}</div>}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
// ─────────────────────────────────────────────
//  ICFES — Test (Interfaz Híbrida: Cuadernillo + App)
// ─────────────────────────────────────────────
function IcfesTest({ C, isLight, question, questionIdx, total, selected, animating, sabioComment, onAnswer, onExit, onNext }) {
  const meta    = SUBJECT_META[question.subject] || { color: C.accent, bg: C.bgAlt };
  const pct     = (questionIdx / total) * 100;
  const LETTERS = ['A', 'B', 'C', 'D'];
  
  // 🌟 EL TRADUCTOR MÁGICO: Convierte texto plano en matemáticas y listas hermosas
  const renderRichText = (text, isExplanation = false) => {
    if (!text) return null;
    
    // 1. Limpieza rápida: Cambiamos exponentes feos por superíndices reales
    let cleanText = text
      .replace(/\^2/g, '²')
      .replace(/\^3/g, '³')
      .replace(/\^4/g, '⁴')
      .replace(/\^n/g, 'ⁿ');
    
    const lines = cleanText.split('\n');
    
    return lines.map((line, lineIdx) => {
      if (!line.trim()) return null;
      
      let isBullet = false;
      let content = line;
      
      // Detectar viñetas en la explicación (líneas que empiezan con guion)
      if (isExplanation && line.trim().startsWith('-')) {
        isBullet = true;
        content = line.replace(/^-/, '').trim();
      }

      // 2. Parsear Fórmulas entre backticks (`)
      const mathParts = content.split('`');
      
      const renderedLine = mathParts.map((mPart, mIdx) => {
        const isMath = mIdx % 2 !== 0; // Si es impar, está dentro de los backticks
        
        if (isMath) {
          return (
            <span key={mIdx} style={{ 
              fontFamily: "'Noto Serif JP', monospace", // Fuente elegante para fórmulas
              background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)', 
              padding: '2px 8px', 
              borderRadius: 6,
              color: C.accent,
              fontWeight: 700,
              fontSize: '1.05em',
              letterSpacing: 0.5,
              margin: '0 4px',
            }}>
              {mPart}
            </span>
          );
        }
        
        // 3. Parsear Negritas en el texto normal (**)
        const boldParts = mPart.split('**');
        return boldParts.map((bPart, bIdx) => {
          const isBold = bIdx % 2 !== 0;
          return isBold 
            ? <strong key={bIdx} style={{ fontWeight: 900, color: isExplanation ? 'inherit' : C.text }}>{bPart}</strong> 
            : <span key={bIdx}>{bPart}</span>;
        });
      });

      // Renderizado final de la línea
      if (isExplanation) {
        return (
          <div key={lineIdx} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            {isBullet && <span style={{ color: selected === question.correct ? '#34D399' : '#EF4444', fontWeight: 900, fontSize: 16 }}>•</span>}
            <div style={{ flex: 1 }}>{renderedLine}</div>
          </div>
        );
      }

      return <React.Fragment key={lineIdx}>{renderedLine}{lineIdx < lines.length - 1 && <br />}</React.Fragment>;
    });
  };

  return (
    <div className="fi" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Globito del Sabio (reacciones en vivo) */}
      {sabioComment && (
        <div key={sabioComment.key} style={{
          position: 'fixed', bottom: 90, left: '50%', zIndex: 9992,
          display: 'flex', alignItems: 'center', gap: 10,
          background: sabioComment.tone === 'hype' ? 'rgba(52,211,153,0.16)' : 'rgba(56,189,248,0.16)',
          border: `1px solid ${sabioComment.tone === 'hype' ? '#34D39955' : '#38BDF855'}`,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 20, padding: '10px 16px 10px 10px',
          boxShadow: '0 10px 36px rgba(0,0,0,0.4)',
          animation: 'sabioPop 2.6s ease both', maxWidth: '86vw',
        }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: sabioComment.tone === 'hype' ? 'linear-gradient(135deg,#34D399,#10B981)' : 'linear-gradient(135deg,#38BDF8,#0EA5E9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PkIc n="sabio" s={20} c="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1, color: sabioComment.tone === 'hype' ? '#34D399' : '#38BDF8', marginBottom: 1 }}>EL SABIO</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{sabioComment.msg}</div>
          </div>
        </div>
      )}

      {/* Barra de progreso superior */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onExit} style={{ background: 'none', border: 'none', color: C.textMuted, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          <PkIc n="left" s={13} c={C.textMuted} /> Salir
        </button>
        <div style={{ flex: 1, height: 6, borderRadius: 99, background: C.bgAlt, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${meta.color}88, ${meta.color})`, transition: 'width 0.5s', boxShadow: `0 0 8px ${meta.color}60` }} />
        </div>
        <span style={{ fontSize: 12, color: C.text, fontWeight: 800 }}>{questionIdx + 1}/{total}</span>
      </div>

      {/* Etiquetas de Materia y Competencia */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: meta.bg, border: `1px solid ${meta.color}40`, borderRadius: 8, padding: '5px 12px' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: meta.color, boxShadow: `0 0 6px ${meta.color}` }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: meta.color, letterSpacing: 0.5 }}>{question.subject.toUpperCase()}</span>
        </div>
        <span style={{ fontSize: 10, color: C.textMuted, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 5, padding: '4px 10px', fontWeight: 700, letterSpacing: 1 }}>{question.nivel.toUpperCase()}</span>
      </div>

      {/* El Motor Visual (Gráficas/Tablas) */}
      {question.context && <IcfesVisualContext context={question.context} />}

      {/* Enunciado de la Pregunta */}
      <Card key={question.id} C={C} isLight={isLight} className="fu" style={{ padding: '20px 22px', borderLeft: `4px solid ${meta.color}` }}>
        <div style={{ fontSize: 15, lineHeight: 1.7, color: C.text, fontWeight: 500 }}>
          {/* AQUÍ APLICAMOS EL TRADUCTOR */}
          {renderRichText(question.text)}
        </div>
      </Card>

      {/* Opciones de Respuesta */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {question.options.map((opt, i) => {
          const isSelected = selected === i, isCorrect = question.correct === i, showResult = animating;
          let bg = C.bgAlt, border = C.border, txtColor = C.text, shadow = 'none', letterBg = 'rgba(255,255,255,0.05)', letterColor = C.textMuted;
          
          if (showResult) {
            if (isSelected && isCorrect)  { bg = '#34D39915'; border = '#34D399'; txtColor = '#34D399'; shadow = `0 4px 20px #34D39925`; letterBg = '#34D399'; letterColor = '#000'; }
            else if (isSelected && !isCorrect) { bg = '#EF444415'; border = '#EF4444'; txtColor = '#EF4444'; shadow = `0 4px 20px #EF444425`; letterBg = '#EF4444'; letterColor = '#fff'; }
            else if (isCorrect) { bg = '#34D39908'; border = '#34D39950'; txtColor = '#34D399'; letterBg = '#34D39930'; letterColor = '#34D399'; }
          } else if (isSelected) {
            bg = meta.bg; border = meta.color; txtColor = meta.color; shadow = `0 4px 20px ${meta.color}30`; letterBg = meta.color; letterColor = '#000';
          }
          
          return (
            <button key={i} onClick={() => !animating && onAnswer(i)} style={{
              background: bg, border: `1px solid ${border}`, borderRadius: 16,
              padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 14, textAlign: 'left',
              cursor: animating ? 'default' : 'pointer', boxShadow: shadow, fontFamily: 'inherit',
              transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)', transform: (isSelected && animating) ? 'scale(1.02)' : 'scale(1)',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, background: letterBg, color: letterColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, transition: 'all 0.3s' }}>
                {showResult && isSelected ? (isCorrect ? '✓' : '✗') : showResult && isCorrect ? '✓' : LETTERS[i]}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: txtColor, fontWeight: isSelected ? 700 : 500, flex: 1, marginTop: 4 }}>
                {/* AQUÍ APLICAMOS EL TRADUCTOR A LAS OPCIONES */}
                {renderRichText(opt)}
              </div>
            </button>
          );
        })}
      </div>

      {/* 🌟 EXPLICACIÓN DEL SABIO REDISEÑADA 🌟 */}
      {animating && (
        <div className="fu" style={{
          background: selected === question.correct ? 'rgba(52, 211, 153, 0.08)' : 'rgba(239, 68, 68, 0.08)',
          border: `1px solid ${selected === question.correct ? 'rgba(52, 211, 153, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`,
          borderRadius: 20, padding: '22px', marginTop: 12, position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 180, height: 180, 
            background: selected === question.correct ? 'radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, position: 'relative', zIndex: 1 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, 
              background: selected === question.correct ? '#34D39920' : '#EF444420', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
               <PkIc n={selected === question.correct ? "check" : "sabio"} s={24} c={selected === question.correct ? '#34D399' : '#EF4444'} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: selected === question.correct ? '#34D399' : '#EF4444' }}>
                {selected === question.correct ? '¡Precisión Absoluta! +10 XP' : 'El Sabio corrige tu camino'}
              </div>
              <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: 1.5, marginTop: 2 }}>ANÁLISIS DE LA PREGUNTA</div>
            </div>
          </div>

          <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, position: 'relative', zIndex: 1, 
            background: 'rgba(0,0,0,0.25)', padding: '16px 18px', borderRadius: 14, border: `1px solid rgba(255,255,255,0.05)` }}>
            {/* AQUÍ APLICAMOS EL TRADUCTOR A LA EXPLICACIÓN (CON VIÑETAS ACTIVAS) */}
            {renderRichText(question.explanation, true)}
          </div>

          <div style={{ marginTop: 20, position: 'relative', zIndex: 1 }}>
            <PrimaryBtn C={C} onClick={onNext}>{questionIdx < total - 1 ? 'Siguiente Desafío →' : 'Ver Resultados de la Expedición'}</PrimaryBtn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  ICFES — Resultados
// ─────────────────────────────────────────────
function IcfesResults({ C, isLight, result, activeQuestions, onRetry, onBack, setGlobalSenseiQ }) {
  const [showAll, setShowAll] = useState(false);
  if (!result) return null;
  const level = getPerfLevel(result.score);

  return (
    <div className="fi" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ borderRadius: 24, overflow: 'hidden', background: `linear-gradient(150deg, ${level.color}16 0%, ${level.color}07 100%)`, border: `1px solid ${level.color}22`, padding: '36px 24px', textAlign: 'center', boxShadow: `0 16px 48px ${level.color}14`, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 0%, ${level.color}16 0%, transparent 58%)` }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>{level.emoji}</div>
          <div style={{ fontSize: 80, fontWeight: 900, color: level.color, lineHeight: 1, textShadow: `0 0 28px ${level.color}55`, fontVariantNumeric: 'tabular-nums' }}>{result.score}</div>
          <div style={{ fontSize: 16, color: C.textMuted, fontWeight: 500, marginTop: 6 }}>puntos de 500</div>
          <div style={{ marginTop: 16, display: 'inline-block', background: `${level.color}20`, color: level.color, border: `1px solid ${level.color}30`, borderRadius: 10, padding: '8px 22px', fontSize: 13, fontWeight: 700 }}>{level.label}</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 12 }}>{result.correct} de {result.total} respuestas correctas</div>
          {/* Rewards earned */}
          <div style={{ marginTop: 12, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#FBBF24' }}>+{result.correct * 5} <PkIc n="empanada" s={13} c={C.amberMid}/></span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>+{result.correct * 10} XP</span>
          </div>
        </div>
      </div>

      <Card C={C} isLight={isLight} style={{ padding: '20px 22px' }}>
        <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: 1.8, marginBottom: 16 }}>DESGLOSE POR ÁREA</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {Object.entries(result.subjectScores || {}).map(([subj, stats], idx) => {
            const meta = SUBJECT_META[subj] || { color: C.accent, bg: C.bgAlt };
            const pct  = Math.round((stats.correct / stats.total) * 100);
            return (
              <div key={subj} className="su" style={{ animationDelay: `${idx * 0.08}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: meta.color, boxShadow: `0 0 6px ${meta.color}` }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{subj}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, color: C.textMuted }}>{stats.correct}/{stats.total}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: meta.color, background: meta.bg, borderRadius: 6, padding: '2px 9px' }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ height: 5, borderRadius: 99, background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${meta.color}AA, ${meta.color})`, boxShadow: `0 0 6px ${meta.color}50` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card C={C} isLight={isLight} style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: 1.8 }}>REVISIÓN</div>
          <button onClick={() => setShowAll(v => !v)} style={{ fontSize: 11, color: C.accent, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
            {showAll ? 'Mostrar menos' : 'Ver todas'}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {(showAll ? activeQuestions : activeQuestions.slice(0, 3)).map((q, i) => {
            const userAns = result.answers?.[i] ?? -1;
            const correct = userAns === q.correct;
            const meta    = SUBJECT_META[q.subject] || { color: C.accent };
            return (
              <div key={q.id} className="su" style={{ animationDelay: `${i * 0.05}s`, background: correct ? '#34D39908' : '#EF444408', border: `1px solid ${correct ? '#34D39922' : '#EF444422'}`, borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, color: meta.color, fontWeight: 700 }}>{meta.short}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: correct ? '#34D399' : '#EF4444' }}>{correct ? '✓ Correcto' : '✗ Incorrecto'}</span>
                </div>
                <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6, marginBottom: userAns >= 0 ? 10 : 0, whiteSpace: 'pre-line' }}>
                  {q.text.length > 120 ? q.text.slice(0, 120) + '...' : q.text}
                </div>
                {userAns >= 0 && (
                  <>
                    {!correct && (
                      <div style={{ fontSize: 11, color: '#EF4444', marginBottom: 4 }}>✗ Tu respuesta: {q.options[userAns]}</div>
                    )}
                    <div style={{ fontSize: 11, color: '#34D399', marginBottom: 10 }}>✓ Correcta: {q.options[q.correct]}</div>
                    <button onClick={() => setGlobalSenseiQ?.({ q, userAns: userAns >= 0 ? q.options[userAns] : 'Ninguna', correctAns: q.options[q.correct] })}
                      style={{ width: '100%', background: `linear-gradient(135deg, ${C.accent}15, transparent)`, border: `1px solid ${C.accent}40`, borderRadius: 8, padding: '8px', color: C.accent, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit' }}>
                      <PkIc n="msg" s={14} c={C.accent} /> Preguntar al Sensei
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <PrimaryBtn C={C} onClick={onRetry}> Configurar otro simulacro</PrimaryBtn>
      <button onClick={onBack} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 14, padding: '15px', color: C.textMuted, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
        Volver a estadísticas
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SENSEI MODAL
// ─────────────────────────────────────────────
function SenseiModal({ C, isLight, question, userAnsText, correctAnsText, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(true);
  const endRef = useRef(null);

  const formatText = (text) => {
    const clean = text.replace(/###/g, '').replace(/#/g, '');
    return clean.split('**').map((part, i) =>
      i % 2 !== 0 ? <strong key={i} style={{ color: C.accent, fontWeight: 800 }}>{part}</strong> : part
    );
  };

  useEffect(() => {
    const start = async () => {
      try {
        const advice = await fetchSenseiAdvice(question, userAnsText, correctAnsText, []);
        setMessages([{ id: Date.now(), role: 'sensei', text: advice }]);
      } catch(e) {
        setMessages([{ id: Date.now(), role: 'sensei', text: "El viento cortó mi conexión. Cierra e inténtalo de nuevo." }]);
      } finally { setLoading(false); }
    };
    start();
  }, [question, userAnsText, correctAnsText]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg  = { id: Date.now(), role: 'user', text: input.trim() };
    const newHist  = [...messages, userMsg];
    setMessages(newHist); setInput(''); setLoading(true);
    try {
      const reply = await fetchSenseiAdvice(question, userAnsText, correctAnsText, newHist);
      setMessages(p => [...p, { id: Date.now(), role: 'sensei', text: reply }]);
    } catch(e) {
      setMessages(p => [...p, { id: Date.now(), role: 'sensei', text: "Mi meditación fue interrumpida." }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99999, background: C.bg, display: 'flex', flexDirection: 'column', paddingTop: 'env(safe-area-inset-top, 20px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg, ${C.accent}, ${C.accent}AA)`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontFamily: "'Noto Serif JP', serif", boxShadow: `0 4px 16px ${C.accent}60` }}>知</div>
          <div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text }}>El Sabio</div>
            <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 1.5 }}>SABIDURÍA DE LA TIERRA</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <PkIc n="x" s={18} c={C.textMuted} />
        </button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {messages.map(m => (
          <div key={m.id} className="fu" style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '88%',
            background: m.role === 'user' ? `linear-gradient(145deg, ${C.accent}2A, ${C.accent}11)` : C.bgAlt,
            border: `1px solid ${m.role === 'user' ? C.accent + '40' : C.border}`,
            borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
            padding: '16px 20px', fontSize: 14, lineHeight: 1.7, color: C.text, boxShadow: `0 8px 24px rgba(0,0,0,0.1)` }}>
            {formatText(m.text)}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 6, padding: '12px 16px', background: C.bgAlt, borderRadius: '20px 20px 20px 4px' }}>
            {[0, 0.2, 0.4].map((d, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: C.accent, animation: `dotPop 1.2s ${d}s infinite` }} />)}
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ padding: '16px 20px 30px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 12, background: C.bg }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Reflexiona con el Sensei..."
          style={{ flex: 1, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 20, padding: '0 20px', height: 48, color: C.text, fontSize: 15, outline: 'none', fontFamily: 'inherit' }}
          disabled={loading} />
        <button onClick={handleSend} disabled={loading || !input.trim()} style={{ background: C.accent, border: 'none', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: (!input.trim() || loading) ? 0.5 : 1, transition: 'all 0.2s', cursor: 'pointer', flexShrink: 0, boxShadow: `0 4px 16px ${C.accent}50` }}>
          <PkIc n="right" s={22} c="#fff" />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  GEMINI API — Generador de Simulacros con Material Visual
// ─────────────────────────────────────────────
// La llave ahora está escondida y segura
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

async function fetchGeminiQuestions(subjects, count) {
  if (!GEMINI_API_KEY) throw new Error("Falta la Llave Maestra de IA.");
  const subjectList = subjects.join(', ');
  
  // ¡El nuevo cerebro ESTRICTO del examinador!
  const prompt = `Eres un examinador experto del ICFES Saber 11 de Colombia.
Tu ÚNICA tarea es generar exactamente ${count} preguntas de examen.
Distribución de materias: ${subjectList}
Dificultad: Alta. Formato ICFES real, análisis crítico y pensamiento profundo.

🚨 REGLA VISUAL DE VIDA O MUERTE 🚨
ES OBLIGATORIO que AL MENOS LA MITAD de las preguntas tengan el campo "context" con datos visuales. NUNCA devuelvas todas las preguntas con "context": null. ¡Invéntate tablas, gráficas, textos o avisos!

FORMATOS DE CONTEXTO PERMITIDOS (Usa estrictamente esta estructura y NO dejes campos vacíos):
1. Tabla: {"type": "table", "data": {"headers": ["Col1", "Col2"], "rows": [["V1", "V2"], ["V3", "V4"]]}}
2. Gráfica: {"type": "bar_chart", "title": "Título", "axisLabel": "Eje", "data": [{"label": "A", "value": 10}, {"label": "B", "value": 20}]}
3. Texto Largo: {"type": "long_text", "title": "TITULO", "paragraphs": ["Escribe aquí el texto COMPLETO a analizar. Mínimo 30 palabras."], "source": "Autor"} -> OJO: "paragraphs" es un array de strings obligatorio.
4. Aviso: {"type": "notice", "text": "WARNING: DO NOT ENTER", "subtext": "Staff only"} -> OJO: "text" es obligatorio.

REGLAS DE FORMATO Y MATEMÁTICAS:
1. Envuelve TODAS las ecuaciones, variables (x, y) y números sueltos entre comillas invertidas (\`) para formato matemático. Ejemplo: \`f(x) = x² - 3x + 2\`.
2. NUNCA uses asteriscos (*) para multiplicación. Usa '·' o '×'.
3. Pon espacios en tus ecuaciones: \`x = 0\` y \`x = 2\`.
4. La explicación (explanation) DEBE usar viñetas (líneas que empiezan con guion '-'). Usa **negritas** para resaltar.

FORMATO DE RESPUESTA OBLIGATORIO (Devuelve SOLO un array JSON válido, ejemplo):
[
  {
    "id": 1,
    "subject": "Lectura Crítica",
    "nivel": "Análisis",
    "context": {
      "type": "long_text",
      "title": "LA LIBERTAD",
      "paragraphs": ["La libertad no es un acto anárquico, sino la capacidad de actuar conforme a la razón...", "Por lo tanto, depende del individuo..."],
      "source": "Filosofía Moderna"
    },
    "text": "¿Qué postura defiende el autor frente a la libertad?",
    "options": ["A", "B", "C", "D"],
    "correct": 1,
    "explanation": "- **Concepto**: El autor liga la libertad a la razón.\\n- Por ello, la opción correcta es la B."
  }
]

¡GENERA LAS ${count} PREGUNTAS AHORA MISMO!`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, responseMimeType: "application/json" }
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Error HTTP.");
    const textRaw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textRaw) throw new Error("Respuesta vacía de Gemini.");
    
    const cleaned = textRaw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsed  = JSON.parse(cleaned);
    
    if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Formato inválido.");
    return parsed;
  } catch(err) {
    console.error("Fallo en Gemini:", err);
    throw new Error("El flujo de energía se interrumpió. Usando banco de emergencia.");
  }
}

async function fetchSenseiAdvice(question, userAnswer, correctAnswer, chatHistory = []) {
  if (!GEMINI_API_KEY) throw new Error("Falta la Llave Maestra de IA.");
  const historyText = chatHistory.map(m => `${m.role === 'user' ? 'Alumno' : 'Sensei'}: ${m.text}`).join('\n');
 const prompt = `Eres "El Sabio", un tutor colombiano brillante y cercano. Un estudiante falló esta pregunta de ${question.subject}:
"${question.text}"
Eligió la trampa: "${userAnswer}"
Correcta: "${correctAnswer}"
Historial: ${historyText}

REGLAS ABSOLUTAS:
1. CERO INTRODUCCIONES LARGAS. Saluda con calidez en una línea corta y ataca el problema.
2. PROHIBIDO usar símbolos de markdown como ### o encabezados. Usa texto limpio y viñetas simples (-). Puedes usar **negritas** para resaltar conceptos clave.
3. ELI5: Explica el error de forma EXTREMADAMENTE sencilla, detallada y paso a paso.
4. Usa analogías de la naturaleza colombiana, el café, o la vida cotidiana para que lo entienda al instante.
TU MISIÓN: Desarma la pregunta. Explícale por qué su respuesta es una ilusión y revela la lógica de la correcta. Renderiza las palabras importantes usando **negritas**.
"${question.text}"
Eligió la trampa: "${userAnswer}"
Correcta: "${correctAnswer}"
Historial: ${historyText}

REGLAS ABSOLUTAS:
1. CERO INTRODUCCIONES LARGAS. Saluda en una línea corta y ataca el problema.
2. PROHIBIDO usar símbolos de markdown como ### o encabezados. Usa texto limpio y viñetas simples (-). Puedes usar **negritas** para resaltar conceptos clave.
3. ELI5: Explica el error y el concepto de forma EXTREMADAMENTE sencilla, detallada y paso a paso.
4. Usa una sola analogía de la naturaleza o la vida cotidiana para que lo entienda al instante.
TU MISIÓN: Desarma la pregunta pieza por pieza. Explícale por qué su respuesta es un espejismo y revela la lógica oculta detrás de la correcta. Renderiza las palabras importantes usando **negritas**.`;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.6 } }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Error al contactar al Sensei.");
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "El Sensei está meditando. Intenta de nuevo.";
  } catch(err) {
    throw new Error("El flujo de energía se interrumpió. El Sensei no puede responder ahora.");
  }
}

// ─────────────────────────────────────────────
//  GEMINI API — Enigmas Vocacionales Reales y con Sabrosura
// ─────────────────────────────────────────────
async function fetchOracleDynamicQuestions() {
  if (!GEMINI_API_KEY) throw new Error("Falta la Llave Maestra.");
  
  const prompt = `Eres el "Sabio del Sumapaz", un orientador vocacional colombiano muy bacano y experimentado.
  Crea un test de 3 preguntas de opción múltiple MUY CORTAS para descubrir la vocación real de un joven.
  
  REGLAS DE SABROSURA REALISTA (OBLIGATORIO):
  1. Usa situaciones cotidianas y reales de Colombia con mucha sabrosura, PERO CERO MAGIA. (Ej: Se vara una chiva rumbera, organizando un bazar en el barrio, un viaje al Amazonas, camellando en la plaza de mercado). NADA de Mohanes, espíritus o hechizos.
  2. Lenguaje coloquial ("parcero", "camello", "pille pues") pero profesional y enfocado en descubrir talentos.
  3. Pregunta CORTA (máximo 15 palabras).
  4. Opciones CORTAS y directas sobre QUÉ HARÍA en esa situación (máximo 12 palabras). PROHIBIDO usar emojis.
  
  Las 5 opciones deben corresponder a talentos reales (usa estos códigos en "trait"):
  - "ing" (Lógica, arreglar cosas, mecánica, tecnología, construir)
  - "salud" (Cuidar a la gente, primeros auxilios, empatía, proteger)
  - "neg" (Liderar el grupo, recolectar plata, negociar, organizar)
  - "arte" (Creatividad, animar con música, diseñar, dibujar, hablar)
  - "ciencia" (Analizar el entorno, biología, investigar causas, datos)
  
  Devuelve ÚNICAMENTE un JSON válido con esta estructura:
  [
    {
      "q": "Pregunta de situación real colombiana aquí",
      "options": [
        { "text": "Acción lógica/técnica", "trait": "ing" }, 
        { "text": "Acción de cuidado", "trait": "salud" },
        { "text": "Acción de liderazgo/negocio", "trait": "neg" }, 
        { "text": "Acción creativa", "trait": "arte" }, 
        { "text": "Acción analítica", "trait": "ciencia" }
      ]
    }
  ]`;

  try {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=" + GEMINI_API_KEY;
    const response = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.85, responseMimeType: "application/json" } }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Error HTTP");
    const textRaw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleaned = textRaw.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch(err) {
    console.error("Usando enigmas de reserva");
    // Fallback con situaciones colombianas reales y enfocadas en la vocación
    return [
      { 
        q: "Vas en una chiva rumbo a la costa y se vara en plena montaña. ¿Qué haces?", 
        options: [
          {text: "Me meto debajo a revisar la mecánica del motor.", trait: "ing"}, 
          {text: "Reviso que los abuelos y los niños estén bien.", trait: "salud"}, 
          {text: "Negocio con los vecinos de la zona un transporte alterno.", trait: "neg"}, 
          {text: "Saco la guitarra y me pongo a animar al combo.", trait: "arte"}, 
          {text: "Analizo el clima y el terreno por si toca acampar.", trait: "ciencia"}
        ] 
      },
      { 
        q: "En tu barrio van a armar un proyecto para mejorar la cuadra. Tú...", 
        options: [
          {text: "Diseño los planos para arreglar el parque y las calles.", trait: "ing"}, 
          {text: "Organizo una brigada de salud para los vecinos.", trait: "salud"}, 
          {text: "Hago la recolecta de plata y administro los fondos.", trait: "neg"}, 
          {text: "Pinto un mural bien bacano en la cancha.", trait: "arte"}, 
          {text: "Hago un estudio de qué plantas sembrar según el suelo.", trait: "ciencia"}
        ] 
      }
    ];
  }
}

// ─────────────────────────────────────────────
//  GEMINI API — Oráculo Vocacional (IA Blindada)
// ─────────────────────────────────────────────
async function fetchOracleVision(userChoices, availableCareers, availableUnis) {
  if (!GEMINI_API_KEY) throw new Error("Falta la Llave Maestra.");
  
  const careerNames = availableCareers.map(c => c.name).join(', ');
  const uniNames = availableUnis.map(u => u.name).join(', ');

  const prompt = `Eres el "Sabio del Sumapaz", un orientador vocacional experto. CERO palabras de tecnología como "IA" o "sistema".
  Un joven te dio estas respuestas sobre cómo actúa en situaciones reales:
  ${userChoices.map((c, i) => `${i + 1}. ${c}`).join('\n')}

  Tu tarea es leer su perfil y recomendarle 3 caminos profesionales.
  
  REGLAS DE ORO:
  1. "aura": Escribe un párrafo motivador y con sabrosura colombiana (máximo 45 palabras) explicando cuál es su mayor talento en el mundo real.
  2. "suggestions": Recomienda 3 carreras cruzando su personalidad.
  3. OBLIGATORIO: Usa SOLAMENTE estas carreras y universidades:
     - Carreras: ${careerNames}
     - Universidades: ${uniNames}

  Devuelve ÚNICAMENTE un JSON válido:
  {
    "aura": "texto del aura aquí",
    "suggestions": [
      { "c": "Nombre exacto de carrera", "u": "Nombre exacto de universidad", "desc": "Por qué tiene el talento para esto (max 20 palabras)." }
    ]
  }`;

  try {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=" + GEMINI_API_KEY;
    const response = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.8, responseMimeType: "application/json" } }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Error HTTP");
    const textRaw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleaned = textRaw.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch(err) {
    throw new Error("El Oráculo está meditando.");
  }
}
// ─────────────────────────────────────────────
//  PANTALLA DE CARGA DEL SABIO (Animación Premium)
// ─────────────────────────────────────────────
function SabioLoading({ C }) {
  const PHRASES = [
    "El Sabio está colando el tinto...",
    "Afilando el machete del conocimiento...",
    "Buscando las preguntas más corchadoras...",
    "El Sabio se está comiendo una empanada, ya casi...",
    "Echándole fresco al café para no quemarse...",
    "Pensando más que un filósofo en buseta...",
    "Preparando la prueba, paciencia mijo...",
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIdx(i => (i + 1) % PHRASES.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fi" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 380, gap: 28 }}>
      <div style={{ position: 'relative', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Aros mágicos giratorios */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `3px dashed ${C.amberMid}50`, animation: 'spin 5s linear infinite' }} />
        <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: `2px solid ${C.amberMid}20`, borderTopColor: C.amberMid, animation: 'spin 3s linear infinite reverse' }} />
        <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: `radial-gradient(circle, ${C.amberMid}20 0%, transparent 70%)`, animation: 'celestialPulse 2s ease-in-out infinite' }} />
        
        {/* Núcleo del Sabio */}
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${C.amberMid}, #D97706)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 30px ${C.amberMid}70`, zIndex: 2 }}>
          <PkIc n="tiple" s={34} c="#000" />
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.amberMid, letterSpacing: 2 }}>EL SABIO DICE:</div>
        <div key={idx} style={{ fontSize: 15, color: C.text, textAlign: 'center', maxWidth: 280, lineHeight: 1.6, animation: 'fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both', fontStyle: 'italic' }}>
          "{PHRASES[idx]}"
        </div>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────
//  PARCERO SVG — Mascota premium: trazos gruesos, sentado en tronco
// ─────────────────────────────────────────────
function ParceroSVG({ state = 'sitting' }) {
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    let t;
    const tick = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      t = setTimeout(tick, 4000 + Math.random() * 3500);
    };
    t = setTimeout(tick, 3500 + Math.random() * 2000);
    return () => clearTimeout(t);
  }, []);
  const [waving, setWaving] = useState(false);
  useEffect(() => {
    if (state !== 'sitting' && state !== 'happy') return;
    let t;
    const cycle = () => {
      setWaving(true);
      setTimeout(() => setWaving(false), 1400);
      t = setTimeout(cycle, 5000 + Math.random() * 4000);
    };
    t = setTimeout(cycle, 3000 + Math.random() * 2000);
    return () => clearTimeout(t);
  }, [state]);

  const W = '#F0E6D3'; // Warm fire-lit white
  const G = '#D4AF37'; // Oro tumbaga
  const sw = 3.8;      // trazo grueso premium

  const armWaveStyle = {
    animation: waving ? 'parceroWave 0.9s ease-in-out' : 'none',
    transformOrigin: '74px 60px',
  };

  const eyes = blink
    ? <>
        <line x1="47" y1="26" x2="56" y2="26" stroke={W} strokeWidth="3.2" strokeLinecap="round"/>
        <line x1="61" y1="26" x2="70" y2="26" stroke={W} strokeWidth="3.2" strokeLinecap="round"/>
      </>
    : state === 'sleeping'
    ? <>
        <path d="M47 24 L54 30 M54 24 L47 30" stroke={W} strokeWidth="2.4" strokeLinecap="round"/>
        <path d="M60 24 L67 30 M67 24 L60 30" stroke={W} strokeWidth="2.4" strokeLinecap="round"/>
      </>
    : (state === 'happy' || state === 'celebrating')
    ? <>
        <path d="M46 28 Q52 22 58 28" stroke={W} strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <path d="M60 28 Q66 22 72 28" stroke={W} strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      </>
    : state === 'worried'
    ? <>
        <circle cx="51" cy="26" r="3.5" fill={W}/>
        <circle cx="64" cy="26" r="3.5" fill={W}/>
        <path d="M44 21 L55 25" stroke={W} strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M63 25 L74 21" stroke={W} strokeWidth="2.2" strokeLinecap="round"/>
      </>
    : <>
        <circle cx="51" cy="26" r="3.5" fill={W}/>
        <circle cx="64" cy="26" r="3.5" fill={W}/>
      </>;

  const mouth = state === 'sleeping'
    ? <path d="M50 38 Q57 41 64 38" stroke={W} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    : state === 'happy'
    ? <path d="M46 37 Q57 46 68 37" stroke={W} strokeWidth="3" fill="none" strokeLinecap="round"/>
    : state === 'celebrating'
    ? <path d="M44 36 Q57 48 70 36" stroke={W} strokeWidth="3.2" fill="none" strokeLinecap="round"/>
    : state === 'worried'
    ? <path d="M50 41 Q57 37 64 41" stroke={W} strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    : <path d="M49 39 Q57 44 65 39" stroke={W} strokeWidth="2.4" fill="none" strokeLinecap="round"/>;

  const tronco = <>
    <rect x="4" y="92" width="106" height="16" rx="8" fill="#5C4033" stroke="#3D2A1A" strokeWidth="2.5"/>
    <path d="M12 97 Q32 95 52 97" stroke="#4A3224" strokeWidth="1.3" fill="none" opacity="0.5"/>
    <path d="M62 102 Q82 100 102 102" stroke="#4A3224" strokeWidth="1.3" fill="none" opacity="0.5"/>
  </>;

  let body;
  if (state === 'celebrating') {
    body = <>
      <line x1="57" y1="45" x2="57" y2="90" stroke={W} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="38" y1="60" x2="76" y2="60" stroke={W} strokeWidth={sw} strokeLinecap="round"/>
      <path d="M38 60 L18 36 L12 22" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M76 60 L96 36 L102 22" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {tronco}
      <path d="M47 108 Q42 126 44 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M67 108 Q72 126 70 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M44 146 L35 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M70 146 L79 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
    </>;
  } else if (state === 'sleeping') {
    body = <>
      <path d="M57 45 Q54 68 55 90" stroke={W} strokeWidth={sw} fill="none" strokeLinecap="round"/>
      <line x1="38" y1="62" x2="72" y2="62" stroke={W} strokeWidth={sw} strokeLinecap="round"/>
      <path d="M38 62 L20 84 L14 98" stroke={W} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M72 62 L90 78 L96 90" stroke={W} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {tronco}
      <path d="M46 108 Q40 126 42 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M64 108 Q70 126 68 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M42 146 L33 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M68 146 L77 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
    </>;
  } else if (state === 'worried') {
    body = <>
      <line x1="57" y1="45" x2="57" y2="90" stroke={W} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="38" y1="60" x2="76" y2="60" stroke={W} strokeWidth={sw} strokeLinecap="round"/>
      <path d="M38 60 L20 76 L14 70" stroke={W} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M76 60 L88 52 L92 42" stroke={W} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {tronco}
      <path d="M46 108 Q41 126 43 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M68 108 Q73 126 71 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M43 146 L34 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M71 146 L80 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
    </>;
  } else if (state === 'happy') {
    body = <>
      <line x1="57" y1="45" x2="57" y2="90" stroke={W} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="38" y1="60" x2="76" y2="60" stroke={W} strokeWidth={sw} strokeLinecap="round"/>
      <path d="M38 60 L20 44 L14 32" stroke={W} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <g style={armWaveStyle}>
        <path d="M76 60 L96 46 L102 34" stroke={W} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {tronco}
      <path d="M47 108 Q42 126 44 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M67 108 Q72 126 70 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M44 146 L35 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M70 146 L79 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
    </>;
  } else if (state === 'coffee') {
    body = <>
      <line x1="57" y1="45" x2="57" y2="90" stroke={W} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="38" y1="60" x2="76" y2="60" stroke={W} strokeWidth={sw} strokeLinecap="round"/>
      <path d="M38 60 L22 80 L18 96" stroke={W} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M76 60 L94 72 L100 65" stroke={W} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="97" y="60" width="14" height="12" rx="3" fill="none" stroke={W} strokeWidth="2"/>
      <path d="M111 64 Q116 67 111 70" stroke={W} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M101 58 Q103 52 101 46" stroke={W} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5" style={{animation:'steamRise 2s ease-in-out infinite'}}/>
      <path d="M107 59 Q109 52 107 45" stroke={W} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.4" style={{animation:'steamRise 2.5s ease-in-out infinite 0.4s'}}/>
      {tronco}
      <path d="M47 108 Q42 126 44 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M67 108 Q72 126 70 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M44 146 L35 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M70 146 L79 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
    </>;
  } else {
    // sitting — brazo izquierdo descansa en tronco, brazo derecho al fuego
    body = <>
      <line x1="57" y1="45" x2="57" y2="90" stroke={W} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="38" y1="60" x2="76" y2="60" stroke={W} strokeWidth={sw} strokeLinecap="round"/>
      <path d="M38 60 L20 82 L16 98" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <g style={armWaveStyle}>
        <path d="M76 60 L98 74 L112 70" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {tronco}
      <path d="M47 108 Q42 126 44 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M67 108 Q72 126 70 146" stroke={W} strokeWidth="3.6" fill="none" strokeLinecap="round"/>
      <path d="M44 146 L35 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M70 146 L79 150" stroke={W} strokeWidth="3.5" strokeLinecap="round"/>
    </>;
  }

  const hatTransform = state === 'sleeping' ? 'rotate(18 57 20)' : undefined;

  return (
    <svg viewBox="0 0 114 162" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', overflow: 'visible',
        animation: 'breathe 4s ease-in-out infinite',
        transformOrigin: '50% 60%',
        filter: 'drop-shadow(0 0 12px rgba(232,116,58,0.18))' }}>
      {/* ── SOMBRERO VUELTIAO — Copa + ala muy ancha + zigzag cinta ── */}
      <g transform={hatTransform}>
        <ellipse cx="57" cy="10" rx="14" ry="9" fill="#1E1A16" stroke={G} strokeWidth="1.6"/>
        <ellipse cx="57" cy="18" rx="29" ry="4.5" fill="#252018" stroke={G} strokeWidth="1.5"/>
        <rect x="28" y="15.5" width="58" height="4" rx="2" fill="#111"/>
        <path d="M28,17.5 l2.5,2 l2.5,-2 l2.5,2 l2.5,-2 l2.5,2 l2.5,-2 l2.5,2 l2.5,-2 l2.5,2 l2.5,-2 l2.5,2 l2.5,-2 l2.5,2 l2.5,-2 l2.5,2 l2.5,-2 l2.5,2 l2.5,-2 l2.5,2 l2.5,-2 l2.5,2 l2.5,-2"
          fill="none" stroke={G} strokeWidth="1.2" strokeLinecap="round"/>
      </g>

      {/* Cara */}
      <circle cx="57" cy="27" r="18" fill="none" stroke={W} strokeWidth={sw}/>

      {/* Rubor cálido del fuego */}
      {state !== 'sleeping' && <>
        <ellipse cx="43" cy="31" rx="7" ry="4.5" fill="#E8743A" opacity="0.15"/>
        <ellipse cx="72" cy="31" rx="7" ry="4.5" fill="#E8743A" opacity="0.15"/>
      </>}

      {eyes}

      {/* Reflejo del fuego en los ojos */}
      {!blink && state !== 'sleeping' && <>
        <circle cx="52" cy="25" r="1.5" fill="#F59E0B" opacity="0.6"/>
        <circle cx="65" cy="25" r="1.5" fill="#F59E0B" opacity="0.6"/>
      </>}

      {mouth}
      {body}

      {state === 'sleeping' && <>
        <text x="77" y="24" fontSize="9" fill={W} opacity="0.7"
          style={{animation:'zzz 2.2s ease-in-out infinite', fontFamily:'sans-serif', fontWeight:700}}>z</text>
        <text x="86" y="13" fontSize="12" fill={W} opacity="0.8"
          style={{animation:'zzz 2.2s ease-in-out infinite 0.55s', fontFamily:'sans-serif', fontWeight:700}}>z</text>
        <text x="97" y="2" fontSize="15" fill={W} opacity="0.9"
          style={{animation:'zzz 2.2s ease-in-out infinite 1.1s', fontFamily:'sans-serif', fontWeight:700}}>Z</text>
      </>}
    </svg>
  );
}

// ─────────────────────────────────────────────
//  FOGATA SVG — Fuego SVG real con path morphing, proporcional a la racha
// ─────────────────────────────────────────────
function FogataSVG({ streakDays }) {
  const s = streakDays || 0;
  const isLegendary = s >= 30;
  const cR = isLegendary ? '#FF6B00' : '#EF4444';
  const cO = isLegendary ? '#FF9500' : '#F59E0B';
  const cY = isLegendary ? '#FFD700' : '#FBBF24';

  if (s === 0) {
    return (
      <div style={{ position: 'relative', width: 100, height: 52 }}>
        <div style={{ position: 'absolute', top: 0, left: '44%',
          width: 6, height: 20, borderRadius: 3,
          background: 'radial-gradient(ellipse, rgba(130,120,110,0.4), transparent)',
          animation: 'ashSmoke 2.8s ease-out infinite' }}/>
        <div style={{ position: 'absolute', top: 4, left: '30%',
          width: 4, height: 14, borderRadius: 3,
          background: 'radial-gradient(ellipse, rgba(130,120,110,0.28), transparent)',
          animation: 'ashSmoke 2.8s ease-out infinite 1.1s' }}/>
        <svg viewBox="0 0 100 36" width="100" height="36"
          style={{ position: 'absolute', bottom: 0 }} xmlns="http://www.w3.org/2000/svg">
          <line x1="15" y1="30" x2="68" y2="16" stroke="#5C4033" strokeWidth="8" strokeLinecap="round"/>
          <line x1="85" y1="30" x2="32" y2="16" stroke="#4A3224" strokeWidth="8" strokeLinecap="round"/>
          <ellipse cx="50" cy="32" rx="28" ry="4" fill="#706060" opacity="0.3"/>
        </svg>
      </div>
    );
  }

  // Tiers: [small, medium, large, xlarge, epic]
  const tier = s <= 2 ? 0 : s <= 6 ? 1 : s <= 13 ? 2 : s <= 29 ? 3 : 4;
  const W  = [110, 148, 186, 224, 260][tier];
  const H  = [138, 186, 230, 276, 320][tier];
  const cx = W / 2;
  const baseY = H - 24;  // llamas nacen aquí (sobre los leños)
  const fH  = H - 44;   // altura total de llama

  const rd = (n) => Math.round(n * 10) / 10;

  // Generador de path: llama simétrica con 2 beziers cúbicos
  // Estructura IDENTICA en todos los keyframes para que SVG animate funcione
  const fp = (hw, fh, ctrl) => {
    const tx = rd(cx), ty = rd(baseY);
    const c1x = rd(hw * ctrl), c2x = rd(hw * 0.55);
    const h1 = rd(fh * 0.35), h2 = rd(fh * 0.88), h3 = rd(fh);
    return `M${tx},${ty} C${rd(tx-hw)},${rd(ty-h1)} ${rd(tx-c2x)},${rd(ty-h2)} ${tx},${rd(ty-h3)} C${rd(tx+c2x)},${rd(ty-h2)} ${rd(tx+hw)},${rd(ty-h1)} ${tx},${ty} Z`;
  };

  const ow = W * 0.40;
  const mw = W * 0.28;
  const iw = W * 0.17;
  const cw = W * 0.085;

  // Llama exterior (roja) — 3 keyframes, oscila suave
  const pR0 = fp(ow,       fH,      0.95);
  const pR1 = fp(ow*1.08,  fH*1.04, 0.88);
  const pR2 = fp(ow*0.92,  fH*0.97, 1.02);
  // Llama media (naranja)
  const pO0 = fp(mw,       fH*0.80, 0.90);
  const pO1 = fp(mw*1.10,  fH*0.84, 0.82);
  const pO2 = fp(mw*0.90,  fH*0.78, 0.98);
  // Llama interior (amarilla)
  const pY0 = fp(iw,       fH*0.60, 0.92);
  const pY1 = fp(iw*1.12,  fH*0.63, 0.82);
  // Corazón blanco
  const pW0 = fp(cw,       fH*0.38, 0.90);
  const pW1 = fp(cw*1.15,  fH*0.40, 0.80);

  const ll = rd(W * 0.40);

  return (
    <div style={{ position: 'relative', width: W, height: H }}>
      {/* Chispas (divs con CSS animation para performance) */}
      {s >= 3 && [0,1,2,3,4].map(i => (
        <div key={i} style={{
          position: 'absolute',
          bottom: 24 + fH * 0.28,
          left: `${16 + i * 16}%`,
          width: i%2===0 ? 3 : 2, height: i%2===0 ? 3 : 2,
          borderRadius: '50%', pointerEvents: 'none',
          background: i%3===0 ? cY : i%3===1 ? cO : '#FFF8E0',
          '--sx': `${(i-2)*16}px`,
          '--sy': `${-38-i*9}px`,
          animation: `sparkRise ${1.1+i*0.24}s ease-out infinite ${i*0.38}s`,
        }}/>
      ))}
      {isLegendary && [0,1,2,3,4,5,6].map(i => (
        <div key={`lg${i}`} style={{
          position: 'absolute',
          bottom: 24 + fH * 0.5,
          left: `${7 + i * 13}%`,
          width: 3.5, height: 3.5, borderRadius: '50%', pointerEvents: 'none',
          background: i%2===0 ? '#FFD700' : '#FFF8F0',
          '--sx': `${(i-3)*18}px`,
          '--sy': `${-52-i*8}px`,
          animation: `sparkRise ${0.9+i*0.2}s ease-out infinite ${i*0.26}s`,
        }}/>
      ))}
      {/* SVG con llamas, leños y brasas */}
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <defs>
          <radialGradient id="pkFgGl" cx="50%" cy="100%" r="58%">
            <stop offset="0%" stopColor={cO} stopOpacity="0.16"/>
            <stop offset="100%" stopColor={cO} stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Resplandor en el piso */}
        <ellipse cx={cx} cy={H-8} rx={rd(W*0.75)} ry={15} fill="url(#pkFgGl)"
          style={{animation:'mordorGlow 2.2s ease-in-out infinite'}}/>
        {/* Leños cruzados en X */}
        <line x1={rd(cx-ll)} y1={rd(baseY-2)} x2={rd(cx+ll*0.38)} y2={H-4}
          stroke="#5C4033" strokeWidth={rd(8*(W/148))} strokeLinecap="round"/>
        <line x1={rd(cx+ll)} y1={rd(baseY-2)} x2={rd(cx-ll*0.38)} y2={H-4}
          stroke="#4A3224" strokeWidth={rd(8*(W/148))} strokeLinecap="round"/>
        {/* Brasas — parpadean */}
        <circle cx={rd(cx-6*(W/148))} cy={rd(baseY+3)} r={rd(2.5*(W/148))} fill="#EF4444" opacity="0.9"
          style={{animation:'mordorGlow 0.7s ease-in-out infinite'}}/>
        <circle cx={rd(cx+5*(W/148))} cy={rd(baseY+2)} r={rd(2*(W/148))} fill="#F59E0B" opacity="0.8"
          style={{animation:'mordorGlow 1.0s ease-in-out infinite 0.22s'}}/>
        <circle cx={cx} cy={rd(baseY+5)} r={rd(2.2*(W/148))} fill="#FF6B00" opacity="0.7"
          style={{animation:'mordorGlow 0.85s ease-in-out infinite 0.48s'}}/>
        {/* Llama exterior (roja) — más ancha, baja opacidad */}
        <path fill={cR} opacity="0.54">
          <animate attributeName="d" values={`${pR0};${pR1};${pR2};${pR0}`}
            dur="1.4s" repeatCount="indefinite" calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"/>
        </path>
        {/* Llama media (naranja) */}
        <path fill={cO} opacity="0.85">
          <animate attributeName="d" values={`${pO0};${pO1};${pO2};${pO0}`}
            dur="1.05s" repeatCount="indefinite" begin="0.18s" calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"/>
        </path>
        {/* Llama interior (amarilla) */}
        <path fill={cY} opacity="0.95">
          <animate attributeName="d" values={`${pY0};${pY1};${pY0}`}
            dur="0.80s" repeatCount="indefinite" begin="0.28s" calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"/>
        </path>
        {/* Corazón blanco — más vivo, parpadea rápido */}
        <path fill="#FFFDE7" opacity="0.82">
          <animate attributeName="d" values={`${pW0};${pW1};${pW0}`}
            dur="0.60s" repeatCount="indefinite" begin="0.08s" calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"/>
        </path>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
//  LEÑITO SVG — Un leñito que representa una misión
// ─────────────────────────────────────────────
function LeñitoSVG({ done, canCollect }) {
  const logFill  = done ? '#6B5A4A' : '#4A3828';
  const dotFill  = done ? '#2D8A5E' : canCollect ? '#F2B705' : '#554A42';
  const glowFilt = canCollect ? 'drop-shadow(0 0 5px rgba(242,183,5,0.7))' : 'none';
  return (
    <svg viewBox="0 0 46 24" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 54, height: 28, display: 'block', filter: glowFilt }}>
      <rect x="6" y="9" width="34" height="10" rx="5" fill={logFill}/>
      <ellipse cx="6" cy="14" rx="4" ry="5" fill="#5D4A38" stroke="#3D2E20" strokeWidth="0.8"/>
      <ellipse cx="6" cy="14" rx="2.2" ry="3" fill="none" stroke="#3D2E2040" strokeWidth="0.7"/>
      <ellipse cx="40" cy="14" rx="4" ry="5" fill="#5D4A38" stroke="#3D2E20" strokeWidth="0.8"/>
      <ellipse cx="40" cy="14" rx="2.2" ry="3" fill="none" stroke="#3D2E2040" strokeWidth="0.7"/>
      <circle cx="23" cy="5" r="4" fill={dotFill}/>
      {done && <path d="M20.5 5 L22.5 7 L26 3" stroke="#fff" strokeWidth="1.5" fill="none"
        strokeLinecap="round" strokeLinejoin="round"/>}
    </svg>
  );
}

// ─────────────────────────────────────────────
//  LEÑITOS MISIONES — 3 leños que representan las misiones del día
// ─────────────────────────────────────────────
function LeñitosMisiones({ appState, setAppState, onMissionReward }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const [flyingIdx, setFlyingIdx] = useState(null);
  const today    = todayStr();
  const missions = generateDailyMissions(today);
  const rewarded = appState.missionsRewarded || [];

  useEffect(() => {
    if (appState.missionsDate !== today && rewarded.length > 0) {
      setAppState(s => ({ ...s, missionsDate: today, missionsRewarded: [] }));
    }
  }, [today]);

  const collectMission = (m, idx) => {
    if (rewarded.includes(m.id)) return;
    setFlyingIdx(idx);
    FX.play('levelUp'); FX.vibrate('success');
    setTimeout(() => {
      setFlyingIdx(null);
      setActiveIdx(null);
      setAppState(s => ({
        ...s,
        ryo: (s.ryo || 0) + m.ryo,
        xp:  (s.xp  || 0) + m.xp,
        missionsDate: today,
        missionsRewarded: [...(s.missionsRewarded || []), m.id],
      }));
      onMissionReward?.(m.ryo, m.xp);
    }, 700);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'flex-end', position: 'relative' }}>
      {missions.map((m, i) => {
        const progress   = getMissionProgress(m, appState);
        const isDone     = progress >= m.target;
        const isRewarded = rewarded.includes(m.id);
        const canCollect = isDone && !isRewarded;
        const isActive   = activeIdx === i;
        const isFlying   = flyingIdx === i;
        return (
          <div key={m.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {/* Tooltip arriba del leño */}
            {isActive && !isFlying && (
              <div style={{
                position: 'absolute', bottom: '115%', left: '50%', transform: 'translateX(-50%)',
                width: 152, zIndex: 20,
                background: 'rgba(14,12,11,0.97)',
                border: `1px solid ${canCollect ? '#2D8A5E66' : '#3D383566'}`,
                borderRadius: 12, padding: '10px 11px',
                animation: 'fadeUp 0.15s ease both',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#F5F2EB', marginBottom: 6, lineHeight: 1.35 }}>{m.text}</div>
                <div style={{ height: 3, background: '#2A2624', borderRadius: 99, overflow: 'hidden', marginBottom: 4 }}>
                  <div style={{ height: '100%',
                    width: `${Math.min(100, Math.round((progress / m.target) * 100))}%`,
                    background: isDone ? '#2D8A5E' : '#D4AF37', borderRadius: 99,
                    transition: 'width 0.5s ease' }}/>
                </div>
                <div style={{ fontSize: 10, color: '#A39C95' }}>{progress}/{m.target}</div>
                {canCollect && (
                  <button onClick={() => collectMission(m, i)} style={{
                    marginTop: 7, width: '100%', padding: '6px 0',
                    background: '#2D8A5E', border: 'none', borderRadius: 8,
                    color: '#fff', fontSize: 11, fontWeight: 800,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>¡Cobrar! +{m.ryo} emp.</button>
                )}
              </div>
            )}
            {/* Botón leñito */}
            <button
              onClick={() => setActiveIdx(isActive ? null : i)}
              style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block',
                ...(isFlying ? {
                  '--tx': '0px', '--ty': '-80px',
                  animation: 'logFlyToFire 0.7s ease-in forwards',
                } : {}),
              }}
            >
              <LeñitoSVG done={isRewarded} canCollect={canCollect}/>
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
//  PÁRAMO BIOMA SVG — Noche atmosférica de páramo (premium, minimalista)
// ─────────────────────────────────────────────
function ParamoBiomaSVG() {
  // Pocas estrellas, tamaño y opacidad variados — discreción es elegancia
  const STARS = [
    [5,3,1.1],[13,7,0.9],[23,5,1.3],[34,3,0.8],[44,8,1.0],[55,4,1.2],[65,7,0.85],
    [74,3,1.1],[83,6,0.9],[90,9,0.8],[95,4,1.2],[98,7,0.9],
    [4,13,0.8],[11,16,1.0],[20,11,0.85],[29,18,1.3],[38,14,0.8],[48,11,1.1],
    [58,16,0.9],[67,12,1.2],[77,15,0.8],[87,12,0.95],[97,17,1.0],
  ];
  return (
    <svg viewBox="0 0 430 300" xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pkSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0a0e1a"/>
          <stop offset="40%"  stopColor="#12182a"/>
          <stop offset="70%"  stopColor="#1a2035"/>
          <stop offset="100%" stopColor="#1e2540"/>
        </linearGradient>
        <radialGradient id="pkMoonHalo" cx="87%" cy="14%" r="24%">
          <stop offset="0%"   stopColor="#FFF5D4" stopOpacity="0.09"/>
          <stop offset="50%"  stopColor="#FFF5D4" stopOpacity="0.03"/>
          <stop offset="100%" stopColor="#FFF5D4" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="pkFireGlow" cx="50%" cy="90%" r="42%">
          <stop offset="0%"   stopColor="#E8743A" stopOpacity="0.20"/>
          <stop offset="50%"  stopColor="#E8743A" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="#E8743A" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Cielo */}
      <rect x="0" y="0" width="430" height="300" fill="url(#pkSkyGrad)"/>
      {/* Halo lunar */}
      <rect x="0" y="0" width="430" height="300" fill="url(#pkMoonHalo)"/>
      {/* Luna — elegante, sin detalles */}
      <circle cx="374" cy="42" r="16" fill="#FFF5D4" opacity="0.85"/>

      {/* Estrellas — 4-5 con titileo muy sutil, resto estáticas */}
      {STARS.map(([x,y,r],i) => (
        <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="#F5F2EB"
          style={{
            opacity: 0.13 + (i % 5) * 0.048,
            ...(i < 5 ? {animation:`starTwinkle ${3.6+i*1.2}s ease-in-out infinite ${i*0.9}s`} : {}),
          }}/>
      ))}

      {/* Montaña trasera — silueta onda suave, fill plano sin bordes */}
      <path d="M0 215 L40 162 L90 185 L148 138 L205 163 L265 125 L318 150 L375 132 L430 144 L430 300 L0 300Z"
        fill="#151d28"/>

      {/* Montaña delantera — un poco más clara */}
      <path d="M0 238 L55 195 L115 215 L178 183 L238 202 L298 175 L358 192 L430 180 L430 300 L0 300Z"
        fill="#1a2430"/>

      {/* Arbustos abstractos izquierda — formas simples, apenas distinguibles */}
      <rect x="10" y="270" width="9" height="28" rx="4" fill="#131b11" opacity="0.78"/>
      <rect x="26" y="276" width="7" height="22" rx="3" fill="#141c12" opacity="0.62"/>
      <rect x="40" y="278" width="10" height="20" rx="4" fill="#131b11" opacity="0.70"/>

      {/* Arbustos abstractos derecha */}
      <rect x="368" y="268" width="10" height="30" rx="4" fill="#131b11" opacity="0.78"/>
      <rect x="385" y="274" width="8" height="24" rx="3" fill="#141c12" opacity="0.62"/>
      <rect x="403" y="276" width="9" height="22" rx="4" fill="#131b11" opacity="0.70"/>

      {/* Neblina atmosférica — 2 bandas horizontales muy suaves */}
      <ellipse cx="215" cy="252" rx="225" ry="9" fill="white" opacity="0.020"
        style={{animation:'cloudDrift 30s ease-in-out infinite'}}/>
      <ellipse cx="175" cy="264" rx="195" ry="6" fill="white" opacity="0.014"
        style={{animation:'cloudDrift 38s ease-in-out infinite 14s'}}/>

      {/* Suelo oscuro */}
      <rect x="0" y="278" width="430" height="22" fill="#0c1018" opacity="0.75"/>

      {/* Resplandor del fuego — pulsa suave */}
      <rect x="0" y="0" width="430" height="300" fill="url(#pkFireGlow)"
        style={{animation:'mordorGlow 2.2s ease-in-out infinite'}}/>
    </svg>
  );
}

// ─────────────────────────────────────────────
//  CHIP BTN — Chip con efecto 3D (borderBottom)
// ─────────────────────────────────────────────
function ChipBtn({ label, icon, color, onPress }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onPress}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        flex: 1, padding: '10px 0',
        background: `${color}15`,
        border: `1.5px solid ${color}40`,
        borderBottom: pressed ? `3px solid ${color}70` : `5px solid ${color}50`,
        borderRadius: 18, cursor: 'pointer', fontFamily: 'inherit',
        transform: pressed ? 'translateY(2px)' : 'translateY(0)',
        transition: 'transform 0.08s ease, border-bottom 0.08s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
      }}>
      <PkIc n={icon} s={15} c={color}/>
      <span style={{ fontSize: 12, fontWeight: 800, color }}>{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────
//  FOGATA SCENE — Escena completa interactiva
// ─────────────────────────────────────────────
function FogataScene({ C, appState, setAppState, onMissionReward }) {
  const streak  = appState.streakDays || 0;
  const hora    = new Date().getHours();
  const today   = todayStr();
  const missions = generateDailyMissions(today);
  const completedCount = missions.filter(m => getMissionProgress(m, appState) >= m.target).length;

  const hizoAlgoHoy = appState.yourConfirmed ||
    (appState.icfesHistory || []).some(r =>
      r.date === today || (r.ts && new Date(r.ts).toDateString() === today));

  let parceroState = 'sitting';
  if (hora < 6 && !hizoAlgoHoy)                              parceroState = 'sleeping';
  else if (hora >= 6 && hora < 10)                           parceroState = 'coffee';
  else if (completedCount === 3)                             parceroState = 'happy';
  else if (streak > 0 && !appState.yourConfirmed && hora >= 20) parceroState = 'worried';

  const streakColor = streak >= 30 ? '#FF9500' : streak >= 7 ? '#F59E0B' : '#E8743A';

  return (
    <div style={{ position: 'relative', width: '100%', height: 300,
      borderRadius: '0 0 28px 28px', overflow: 'hidden' }}>
      <ParamoBiomaSVG/>

      {/* Fuego — protagonista, centrado en la escena */}
      <div style={{ position: 'absolute', bottom: 34, left: '50%',
        transform: 'translateX(-46%)', zIndex: 2 }}>
        <FogataSVG streakDays={streak}/>
      </div>

      {/* Sombra de contacto — pega al Parcero al suelo visualmente */}
      <div style={{ position: 'absolute', bottom: 10, left: '22%',
        transform: 'translateX(-50%)', width: 88, height: 14,
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.32)',
        filter: 'blur(4px)',
        zIndex: 2 }}/>

      {/* El Parcero — sentado junto al fuego */}
      <div style={{ position: 'absolute', bottom: 16, left: '22%',
        transform: 'translateX(-50%)', width: 136, height: 178, zIndex: 3 }}>
        <ParceroSVG state={parceroState}/>
      </div>

      {/* Leñitos en el piso, junto al fuego */}
      <div style={{ position: 'absolute', bottom: 12, left: '56%', zIndex: 4 }}>
        <LeñitosMisiones
          appState={appState}
          setAppState={setAppState}
          onMissionReward={onMissionReward}
        />
      </div>

      {/* Racha visual en la escena */}
      <div style={{ position: 'absolute', bottom: 16, right: 14, zIndex: 6,
        display: 'flex', alignItems: 'flex-end', gap: 3 }}>
        {streak > 0 ? (
          <>
            <PkIc n="flame" s={16} c={streakColor}/>
            <span style={{ fontSize: 26, fontWeight: 900, color: streakColor, lineHeight: 1,
              textShadow: `0 0 14px ${streakColor}88` }}>{streak}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: `${streakColor}BB`,
              marginBottom: 3 }}>días</span>
          </>
        ) : (
          <span style={{ fontSize: 10, fontWeight: 700,
            color: 'rgba(245,242,235,0.45)', textAlign: 'right', maxWidth: 72 }}>
            Prende tu fogata
          </span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  INICIO TAB v4 — La Fogata: atmósfera total
// ─────────────────────────────────────────────
const STARS_V4 = [
  {x:'8%',y:'12%',r:1.2,op:0.6,tw:true}, {x:'15%',y:'6%',r:0.9,op:0.45},
  {x:'24%',y:'18%',r:1.0,op:0.5,tw:true}, {x:'35%',y:'8%',r:1.3,op:0.55},
  {x:'48%',y:'5%',r:0.8,op:0.38}, {x:'57%',y:'14%',r:1.1,op:0.52,tw:true},
  {x:'68%',y:'7%',r:0.9,op:0.42}, {x:'78%',y:'11%',r:1.2,op:0.58},
  {x:'86%',y:'4%',r:1.0,op:0.48,tw:true}, {x:'92%',y:'16%',r:0.8,op:0.36},
  {x:'5%',y:'28%',r:0.7,op:0.32}, {x:'72%',y:'24%',r:0.9,op:0.44},
  {x:'41%',y:'22%',r:0.7,op:0.3,tw:true}, {x:'88%',y:'28%',r:1.1,op:0.5},
  {x:'19%',y:'32%',r:0.8,op:0.36}, {x:'62%',y:'30%',r:0.7,op:0.3},
];

function InicioTab({ C, isLight, appState, setAppState, user, books, onGoTab, onGoShop, onMissionReward, pushNotif }) {
  const lvl         = computeLevel(appState.xp || 0);
  const currentBook = books.find(b => b.id === appState.currentBookId) || null;
  const [rankInfo, setRankInfo] = useState(null);
  const [icfesPressed, setIcfesPressed] = useState(false);
  const [leerPressed, setLeerPressed]   = useState(false);
  const today = todayStr();

  useEffect(() => {
    if (!fbOK() || !user?.code) return;
    FB().get(FB().ref(FB().db, 'users')).then(snap => {
      if (!snap.exists()) return;
      const ranked = Object.values(snap.val())
        .map(u => ({
          code: u.code,
          correctas: (u.appState?.icfesHistory || []).reduce((s, r) => s + (r.correct || 0), 0),
        }))
        .sort((a, b) => b.correctas - a.correctas);
      const myIdx = ranked.findIndex(u => u.code === user.code);
      if (myIdx === -1) return;
      setRankInfo({
        pos: myIdx + 1, total: ranked.length,
        myCorrectas: ranked[myIdx].correctas,
        aheadGap: myIdx > 0 ? ranked[myIdx - 1].correctas - ranked[myIdx].correctas : null,
      });
    }).catch(() => {});
  }, [user?.code]);

  const streak      = appState.streakDays || 0;
  const streakColor = streak >= 30 ? '#EF4444' : streak >= 7 ? '#E8743A' : '#F59E0B';
  const hora        = new Date().getHours();
  const hizoAlgoHoy = appState.yourConfirmed ||
    (appState.icfesHistory || []).some(r =>
      r.date === today || (r.ts && new Date(r.ts).toDateString() === today));

  let parceroState = 'sitting';
  if (hora < 6 && !hizoAlgoHoy)   parceroState = 'sleeping';
  else if (hora >= 6 && hora < 10) parceroState = 'coffee';
  else if (generateDailyMissions(today).filter(m => getMissionProgress(m, appState) >= m.target).length === 3)
    parceroState = 'happy';
  else if (streak > 0 && !appState.yourConfirmed && hora >= 20) parceroState = 'worried';

  const hizoSimHoy = (appState.icfesHistory || []).some(r => r.date === today);
  const todoDone   = hizoSimHoy && appState.yourConfirmed;

  let socialText = null;
  if (rankInfo) {
    if (rankInfo.pos === 1)
      socialText = '¡Nadie te tose, parce! Eres #1 del combo';
    else if (rankInfo.aheadGap !== null && rankInfo.aheadGap <= 5)
      socialText = `Pispe: el #${rankInfo.pos - 1} te lleva solo ${rankInfo.aheadGap} aciertos`;
    else
      socialText = `Vas #${rankInfo.pos} de ${rankInfo.total}`;
  }

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const ds = d.toDateString();
    return (appState.icfesHistory || []).some(r => r.date === ds || (r.ts && new Date(r.ts).toDateString() === ds))
      || (ds === today && appState.yourConfirmed);
  });

  const allMissions = generateDailyMissions(today);
  const rewarded    = appState.missionsRewarded || [];
  const nearestMission = allMissions
    .filter(m => !rewarded.includes(m.id))
    .map(m => ({ ...m, progress: getMissionProgress(m, appState), pct: getMissionProgress(m, appState) / m.target }))
    .sort((a, b) => b.pct - a.pct)[0] || null;
  const nearestCanCollect = nearestMission && nearestMission.progress >= nearestMission.target;

  const icfesHist = appState.icfesHistory || [];
  const lastSim   = icfesHist.length > 0 ? icfesHist[icfesHist.length - 1] : null;
  const lastSimDaysAgo = lastSim?.ts ? Math.floor((Date.now() - lastSim.ts) / 86400000) : null;
  const lastSimColor = !lastSim ? C.textMuted
    : (lastSim.correct || 0) >= 8 ? '#2D8A5E'
    : (lastSim.correct || 0) >= 5 ? '#2E86AB'
    : (lastSim.correct || 0) >= 3 ? '#E8743A' : '#EF4444';

  const rarityColor = { común: '#888', raro: '#2E86AB', épico: '#9D4E7C', legendario: '#D4AF37', mítico: '#EF4444' };
  const destacados  = (SHOP_ITEMS || []).filter(i => DESTACADOS_IDS.includes(i.id)).slice(0, 4);

  return (
    <div className="fi" style={{ display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #06090f 0%, #0d1220 28%, #121828 55%, #0f1420 100%)',
      minHeight: '100%' }}>

      {/* ══ HERO — Atmósfera nocturna completa ══ */}
      <div style={{ position: 'relative', width: '100%', height: 340, flexShrink: 0 }}>

        {/* Luna */}
        <div style={{ position: 'absolute', top: 22, right: '18%', width: 34, height: 34,
          borderRadius: '50%', background: '#FFF5D4', opacity: 0.88,
          boxShadow: '0 0 18px 6px rgba(255,245,212,0.18)' }}/>

        {/* Estrellas */}
        {STARS_V4.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', left: s.x, top: s.y,
            width: s.r * 2, height: s.r * 2, borderRadius: '50%',
            background: '#FFF5D4', opacity: s.op,
            animation: s.tw ? 'starTwinkle 3.5s ease-in-out infinite' : 'none',
            animationDelay: `${i * 0.22}s`,
          }}/>
        ))}

        {/* Fuego — protagonista centrado */}
        <div style={{ position: 'absolute', bottom: 30, left: '54%',
          transform: 'translateX(-50%)', zIndex: 2 }}>
          <FogataSVG streakDays={streak}/>
        </div>

        {/* El Parcero */}
        <div style={{ position: 'absolute', bottom: 10, left: '10%',
          width: 130, height: 162, zIndex: 3 }}>
          <ParceroSVG state={parceroState}/>
        </div>

        {/* Leñitos */}
        <div style={{ position: 'absolute', bottom: 8, left: '58%', zIndex: 4 }}>
          <LeñitosMisiones
            appState={appState}
            setAppState={setAppState}
            onMissionReward={onMissionReward}
          />
        </div>

        {/* Racha superpuesta */}
        <div style={{ position: 'absolute', bottom: 18, right: 16, zIndex: 6,
          display: 'flex', alignItems: 'flex-end', gap: 3 }}>
          {streak > 0 ? (
            <>
              <PkIc n="flame" s={16} c={streakColor}/>
              <span style={{ fontSize: 28, fontWeight: 900, color: streakColor, lineHeight: 1,
                textShadow: `0 0 14px ${streakColor}88` }}>{streak}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: `${streakColor}BB`,
                marginBottom: 3 }}>días</span>
            </>
          ) : (
            <span style={{ fontSize: 10, fontWeight: 700,
              color: 'rgba(245,242,235,0.40)', textAlign: 'right', maxWidth: 72 }}>
              Prende tu fogata
            </span>
          )}
        </div>
      </div>

      {/* ══ CONTENT CARD — sube sobre el hero ══ */}
      <div style={{ flex: 1, background: C.bg,
        borderRadius: '24px 24px 0 0', marginTop: -24,
        paddingTop: 16, display: 'flex', flexDirection: 'column' }}>

        {/* ── RANKING BANNER ── */}
        {rankInfo && socialText && (
          <button onClick={() => onGoTab('friends')} style={{
            margin: '0 14px 10px', padding: '9px 14px',
            background: rankInfo.pos === 1
              ? 'rgba(212,175,55,0.10)'
              : `linear-gradient(90deg, ${C.accent}10, transparent)`,
            border: 'none',
            borderLeft: rankInfo.pos !== 1 ? `3px solid ${C.accent}` : 'none',
            outline: rankInfo.pos === 1 ? `1px solid rgba(212,175,55,0.28)` : 'none',
            borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <PkIc n="star" s={14} c={rankInfo.pos === 1 ? '#D4AF37' : C.accent}/>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.3, flex: 1 }}>
              {socialText}
            </span>
            {rankInfo.aheadGap !== null && rankInfo.pos > 1 && (
              <span style={{ fontSize: 12, fontWeight: 800,
                color: '#2D8A5E', whiteSpace: 'nowrap' }}>
                +{rankInfo.aheadGap} →
              </span>
            )}
          </button>
        )}

        {/* ── CTA DUAL ── */}
        <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* ICFES — verde */}
          <div style={{ animation: todoDone ? 'none' : 'ctaPulse 5s ease-in-out infinite 2s' }}>
            <button
              onClick={() => onGoTab('icfes')}
              disabled={todoDone}
              onPointerDown={() => !todoDone && setIcfesPressed(true)}
              onPointerUp={() => setIcfesPressed(false)}
              onPointerLeave={() => setIcfesPressed(false)}
              style={{
                width: '100%', padding: '15px 20px',
                background: todoDone ? C.bgAlt : '#2D8A5E', border: 'none',
                borderBottom: todoDone ? `3px solid ${C.border}`
                  : icfesPressed ? `2px solid #1a6b45` : `5px solid #1a6b45`,
                borderRadius: 20, fontSize: 15, fontWeight: 800,
                color: todoDone ? C.textMuted : '#fff',
                cursor: todoDone ? 'default' : 'pointer', fontFamily: 'inherit',
                transform: icfesPressed ? 'translateY(3px)' : 'translateY(0)',
                transition: 'transform 0.08s ease, border-bottom 0.08s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}>
              <PkIc n="rana" s={20} c={todoDone ? C.textMuted : '#fff'}/>
              {todoDone ? 'Hoy quedó sellado, descansa parce'
                : hizoSimHoy ? 'Otro simulacro más' : 'Échate un simulacro'}
            </button>
          </div>
          {/* LEER — azul */}
          <button
            onClick={() => onGoTab('books')}
            onPointerDown={() => setLeerPressed(true)}
            onPointerUp={() => setLeerPressed(false)}
            onPointerLeave={() => setLeerPressed(false)}
            style={{
              width: '100%', padding: '14px 20px',
              background: '#2E86AB', border: 'none',
              borderBottom: leerPressed ? `2px solid #1d6b8a` : `5px solid #1d6b8a`,
              borderRadius: 20, fontSize: 15, fontWeight: 800,
              color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
              transform: leerPressed ? 'translateY(3px)' : 'translateY(0)',
              transition: 'transform 0.08s ease, border-bottom 0.08s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}>
            <PkIc n="book" s={20} c="#fff"/>
            {currentBook
              ? `Seguir: ${currentBook.title.length > 22 ? currentBook.title.slice(0, 22) + '…' : currentBook.title}`
              : 'Explora los libros'}
          </button>
        </div>

        {/* ── CHIPS SECUNDARIOS ── */}
        <div style={{ display: 'flex', gap: 10, padding: '10px 14px 0' }}>
          <ChipBtn label="El Combo" icon="swords" color="#C1553B" onPress={() => onGoTab('friends')}/>
          <ChipBtn label="Perfil"   icon="sombrero" color={C.accent} onPress={() => onGoTab('perfil')}/>
        </div>

        <div style={{ height: 1, background: `${C.border}44`, margin: '10px 14px 0' }}/>

        {/* ── RACHA ── */}
        {streak > 0 && (
          <div style={{ margin: '6px 14px 0', padding: '10px 14px',
            background: `linear-gradient(90deg, ${streakColor}12, ${streakColor}04)`,
            borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <PkIc n="flame" s={26} c={streakColor}/>
            <span style={{ fontSize: 30, fontWeight: 900, color: streakColor, lineHeight: 1 }}>{streak}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: `${streakColor}AA` }}>
              {streak === 1 ? 'día de racha' : 'días de racha'}
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}>
              {last7.map((active, i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: '50%',
                  background: active ? '#2D8A5E' : `${C.border}88` }}/>
              ))}
            </div>
          </div>
        )}

        {/* ── MISIÓN ── */}
        {nearestMission && (
          <div style={{ margin: '6px 14px 0', padding: '9px 12px',
            background: nearestCanCollect ? `rgba(45,138,94,0.10)` : C.bgAlt,
            borderRadius: 12,
            border: nearestCanCollect ? '1px solid rgba(45,138,94,0.3)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <PkIc n="swords" s={14} c={nearestCanCollect ? '#2D8A5E' : C.textMuted}/>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 600,
                color: nearestCanCollect ? '#2D8A5E' : C.text,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {nearestMission.text}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700,
                color: nearestCanCollect ? '#2D8A5E' : C.textMuted, whiteSpace: 'nowrap' }}>
                {nearestMission.progress}/{nearestMission.target}
              </span>
            </div>
            <div style={{ height: 4, background: `${C.border}66`, borderRadius: 99, marginTop: 6, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, Math.round(nearestMission.pct * 100))}%`,
                background: nearestCanCollect ? '#2D8A5E' : C.accent,
                borderRadius: 99, transition: 'width 0.5s ease',
                animation: nearestCanCollect ? 'logGlow 1.2s ease-in-out infinite' : 'none',
              }}/>
            </div>
          </div>
        )}

        {/* ── ÚLTIMO SIMULACRO ── */}
        {lastSim && (
          <button onClick={() => onGoTab('icfes')} style={{
            margin: '4px 14px 0', padding: '8px 12px',
            background: 'none', border: 'none', borderRadius: 10,
            cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 8 }}>
            <PkIc n="rana" s={14} c={lastSimColor}/>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, flex: 1 }}>
              Último simulacro:{' '}
              <span style={{ color: lastSimColor, fontWeight: 800 }}>{lastSim.correct || 0} aciertos</span>
              {lastSimDaysAgo !== null && lastSimDaysAgo >= 0 && (
                <span style={{ color: C.textMuted, fontWeight: 500 }}>
                  {' '}· {lastSimDaysAgo === 0 ? 'hoy' : lastSimDaysAgo === 1 ? 'ayer' : `hace ${lastSimDaysAgo} días`}
                </span>
              )}
            </span>
            <PkIc n="right" s={10} c={C.textMuted}/>
          </button>
        )}

        {/* ── LIBRO ACTIVO ── */}
        {currentBook && (() => {
          const prog = appState.bookProgress?.[currentBook.id] || 0;
          return (
            <button onClick={() => onGoTab('books')} style={{
              margin: '4px 14px 0', padding: '8px 12px',
              background: 'none', border: 'none', borderRadius: 10,
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 8 }}>
              <PkIc n="book" s={14} c="#2D8A5E"/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.text,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentBook.title}
                </div>
                <div style={{ height: 3, background: `${C.border}66`, borderRadius: 99, marginTop: 3 }}>
                  <div style={{ height: '100%', width: `${prog}%`, background: '#2D8A5E', borderRadius: 99 }}/>
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#2D8A5E', whiteSpace: 'nowrap' }}>
                {Math.round(prog)}%
              </span>
              <PkIc n="right" s={10} c={C.textMuted}/>
            </button>
          );
        })()}

        <div style={{ height: 1, background: `${C.border}44`, margin: '8px 14px 0' }}/>

        {/* ── SHOP VITRINA ── */}
        {destacados.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 14px 4px' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: C.textMuted,
                textTransform: 'uppercase', letterSpacing: 0.8 }}>Tienda</span>
              <button onClick={() => onGoShop?.()} style={{
                background: 'none', border: 'none', padding: 0,
                cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 11, fontWeight: 700, color: C.accent }}>
                Ver todo
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, padding: '0 14px 8px',
              overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              {destacados.map(item => (
                <button key={item.id} onClick={() => onGoShop?.()} style={{
                  flexShrink: 0, width: 88, padding: '10px 6px',
                  background: C.bgAlt, border: `1px solid ${C.border}`,
                  borderBottom: `3px solid ${rarityColor[item.rarity] || C.border}44`,
                  borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%',
                    background: `${rarityColor[item.rarity] || '#888'}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PkIc n="star" s={14} c={rarityColor[item.rarity] || C.textMuted}/>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.text,
                    textAlign: 'center', lineHeight: 1.2, width: '100%',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: C.amberMid }}>
                    {item.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── PULSE BAR ── */}
        <div style={{ display: 'flex', alignItems: 'stretch',
          borderTop: `1px solid ${C.border}44`,
          margin: '4px 14px 0', paddingTop: 2 }}>
          <button onClick={() => onGoTab('friends')} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            background: 'none', border: 'none', padding: '8px 0',
            cursor: 'pointer', fontFamily: 'inherit', opacity: 1, transition: 'opacity 0.12s',
          }} onPointerDown={e => e.currentTarget.style.opacity='0.6'}
             onPointerUp={e => e.currentTarget.style.opacity='1'}
             onPointerLeave={e => e.currentTarget.style.opacity='1'}>
            <PkIc n="star" s={13} c="#2E86AB"/>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#2E86AB' }}>
              {rankInfo ? `#${rankInfo.pos}` : '—'}
            </span>
          </button>
          <div style={{ width: 1, background: `${C.border}55`, margin: '6px 0' }}/>
          <button onClick={() => onGoTab('perfil')} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            background: 'none', border: 'none', padding: '8px 0',
            cursor: 'pointer', fontFamily: 'inherit', opacity: 1, transition: 'opacity 0.12s',
          }} onPointerDown={e => e.currentTarget.style.opacity='0.6'}
             onPointerUp={e => e.currentTarget.style.opacity='1'}
             onPointerLeave={e => e.currentTarget.style.opacity='1'}>
            <PkIc n="sombrero" s={13} c={C.accent}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>Nv.{lvl.level}</span>
          </button>
          <div style={{ width: 1, background: `${C.border}55`, margin: '6px 0' }}/>
          <button onClick={() => onGoShop?.()} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            background: 'none', border: 'none', padding: '8px 0',
            cursor: 'pointer', fontFamily: 'inherit', opacity: 1, transition: 'opacity 0.12s',
          }} onPointerDown={e => e.currentTarget.style.opacity='0.6'}
             onPointerUp={e => e.currentTarget.style.opacity='1'}
             onPointerLeave={e => e.currentTarget.style.opacity='1'}>
            <PkIc n="empanada" s={13} c={C.amberMid}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.amberMid }}>Tienda</span>
          </button>
        </div>

      </div>
    </div>
  );
}
// ─────────────────────────────────────────────
//  ICFES TAB — Orquestador principal (Estructura Corregida)
// ─────────────────────────────────────────────
function IcfesTab({ C, isLight, appState, setAppState, setGlobalSenseiQ, onCoinBurst, onAchievement, onConfirm, pushNotif }) {
  const [icfesScreen, setIcfesScreen] = useState('dashboard');
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQ, setCurrentQ]       = useState(0);
  const [answers, setAnswers]          = useState([]);
  const [selected, setSelected]       = useState(null);
  const [animating, setAnimating]     = useState(false);
  const [result, setResult]           = useState(null);
  const [loading, setLoading]         = useState(false);
  const [sabioComment, setSabioComment] = useState(null); // mensaje en vivo del Sabio
  const streakRef = useRef({ hits: 0, misses: 0 });        // racha de aciertos/fallos
const SABIO_HYPE = [
    '¡Está finísimo, no pare!',
    '¡Eso es, mijo, con toda!',
    '¡Imparable como chiva en bajada!',
    '¡Usted sí sabe, parce!',
    '¡Va volando, sígale!',
  ];
  const SABIO_ANIMO = [
    'Respire hondo, parce, y vuelva.',
    'Tranquilo, que todos fallamos.',
    'Pille la próxima con calma.',
    'No se me arrugue, usted puede.',
    'Sacúdase y siga, que esto apenas empieza.',
  ];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const showSabio = (msg, tone) => {
    setSabioComment({ msg, tone, key: Date.now() });
    setTimeout(() => setSabioComment(null), 2600);
  };
  const handleBeginTest = async (subjects, count) => {
    setLoading(true);
    FX.play('conjure'); // El Sabio empieza a tejer las preguntas
    try {
      let qs;
      try { qs = await fetchGeminiQuestions(subjects, count); }
      catch(e) {
        const filtered = ICFES_QUESTIONS.filter(q => subjects.includes(q.subject));
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        qs = shuffled.slice(0, Math.min(count, shuffled.length));
      }
      setActiveQuestions(qs);
      setAnswers(new Array(qs.length).fill(-1));
      setCurrentQ(0); setSelected(null); setAnimating(false);
      streakRef.current = { hits: 0, misses: 0 };
      setSabioComment(null);
      setIcfesScreen('test');
    } catch(e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  const handleAnswer = (optionIdx) => {
    if (animating) return;
    setSelected(optionIdx);
    setAnimating(true);
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIdx;
    setAnswers(newAnswers);
    
    const isCorrect = optionIdx === activeQuestions[currentQ]?.correct;
    if (isCorrect) {
      FX.play('success'); FX.vibrate('success');
      setAppState(s => ({ ...s, ryo: (s.ryo || 0) + 5, xp: (s.xp || 0) + 10 }));
      onCoinBurst?.(5);
      streakRef.current.hits += 1;
      streakRef.current.misses = 0;
      if (streakRef.current.hits >= 2) showSabio(pick(SABIO_HYPE), 'hype');
    } else {
      FX.play('error'); FX.vibrate('error');
      streakRef.current.misses += 1;
      streakRef.current.hits = 0;
      if (streakRef.current.misses >= 2) showSabio(pick(SABIO_ANIMO), 'animo');
    }
  };

  const handleNext = () => {
    setAnimating(false); setSelected(null);
    if (currentQ < activeQuestions.length - 1) {
      setCurrentQ(q => q + 1);
    } else {
      finishTest(answers);
    }
  };

  const finishTest = (finalAnswers) => {
    const total    = activeQuestions.length;
    const correct  = finalAnswers.filter((a, i) => a === activeQuestions[i]?.correct).length;
    const score    = Math.round((correct / total) * 500);
    const today    = todayStr();
    
    onConfirm?.();

    const subjectScores = {};
    activeQuestions.forEach((q, i) => {
      if (!subjectScores[q.subject]) subjectScores[q.subject] = { correct: 0, total: 0 };
      subjectScores[q.subject].total++;
      if (finalAnswers[i] === q.correct) subjectScores[q.subject].correct++;
    });

    const resultData = {
      score, correct, total, subjectScores,
      answers: finalAnswers, ts: Date.now(),
      date: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }),
    };

    setResult(resultData);
    setIcfesScreen('results');

    setAppState(s => {
      const lastDate    = s.lastIcfesDate;
      const yesterday   = new Date(Date.now() - 86400000).toDateString();
      const newStreak   = (lastDate === yesterday || lastDate === today)
        ? (lastDate === today ? s.icfesStreak : (s.icfesStreak || 0) + 1)
        : 1;

      const totalSims = (s.icfesHistory || []).length + 1;
      const newAch = (s.achievements || []).map(a => {
        if (a.unlocked) return a;
        if (a.id === 20 && totalSims >= 1)  return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 21 && totalSims >= 10) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 25 && totalSims >= 25) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 22 && score >= 300)    return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 23 && score >= 400)    return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 24 && score >= 500)    return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 32 && newStreak >= 7)  return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 26 && (subjectScores['Lectura Crítica']?.correct / subjectScores['Lectura Crítica']?.total) >= 0.8) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 27 && (subjectScores['Matemáticas']?.correct    / subjectScores['Matemáticas']?.total)    >= 0.8) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 28 && (subjectScores['Ciencias Naturales']?.correct / subjectScores['Ciencias Naturales']?.total) >= 0.8) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 29 && (subjectScores['Ciencias Sociales']?.correct  / subjectScores['Ciencias Sociales']?.total)  >= 0.8) return { ...a, unlocked: true, date: 'hoy' };
        return a;
      });

      const prevIds = (s.achievements || []).filter(a => a.unlocked).map(a => a.id);
      const newlyUnlocked = newAch.filter(a => a.unlocked && !prevIds.includes(a.id));
      const achRyo = newlyUnlocked.reduce((sum, a) => sum + (a.ryo || 0), 0);
      const achXp  = newlyUnlocked.reduce((sum, a) => sum + (a.xp  || 0), 0);
      newlyUnlocked.forEach(a => onAchievement?.(a));

      return {
        ...s,
        icfesHistory: [...(s.icfesHistory || []).slice(-49), resultData],
        icfesStreak:  newStreak,
        lastIcfesDate: today,
        xp:  (s.xp  || 0) + achXp,
        ryo: (s.ryo || 0) + achRyo,
        achievements: newAch,
      };
    });
  };

  if (loading) return <SabioLoading C={C} />;

  // ── Enrutador de vistas limpio y seguro ──
  // Si algo falla, el fallback es el dashboard
  if (loading) return <SabioLoading C={C} />;

  if (icfesScreen === 'oracle') {
    return (
      <OracleView 
        C={C} 
        isLight={isLight} 
        appState={appState} 
        onBack={() => setIcfesScreen('dashboard')} 
        pushNotif={pushNotif} 
      />
    );
  }

  if (icfesScreen === 'setup') return (
    <IcfesSetup C={C} isLight={isLight} onBeginTest={handleBeginTest} onBack={() => setIcfesScreen('dashboard')} />
  );

  if (icfesScreen === 'test') return (
    <IcfesTest C={C} isLight={isLight}
      question={activeQuestions[currentQ]} 
      questionIdx={currentQ} 
      total={activeQuestions.length}
      selected={selected} 
      animating={animating}
      sabioComment={sabioComment}
      onAnswer={handleAnswer} 
      onNext={handleNext}
      onExit={() => { if (window.confirm('¿Salir del simulacro?')) { setIcfesScreen('dashboard'); setAnswers([]); setSelected(null); setAnimating(false); setCurrentQ(0); streakRef.current = { hits: 0, misses: 0 }; setSabioComment(null); } }}
    />
  );

  if (icfesScreen === 'results') return (
    <IcfesResults C={C} isLight={isLight} result={result} activeQuestions={activeQuestions}
      onRetry={() => setIcfesScreen('setup')}
      onBack={() => setIcfesScreen('dashboard')}
      setGlobalSenseiQ={setGlobalSenseiQ}
    />
  );

  // Si no es ninguna de las anteriores, mostramos el tablero principal
  return <IcfesDashboard C={C} isLight={isLight} appState={appState} setAppState={setAppState} onStartSetup={() => setIcfesScreen('setup')} onGoOracle={() => setIcfesScreen('oracle')} onMissionReward={onCoinBurst} onGoShop={() => pushNotif('Ve a Ajustes → La Tiendita para conseguir tu Kodachi de Hielo')} />;
}

// ─────────────────────────────────────────────
//  SHOP DATA
// ─────────────────────────────────────────────
const RARITY_META = {
  'común':      { label: 'COMÚN',      color: '#94A3B8', bg: '#94A3B815', glow: '' },
  'poco común': { label: 'POCO COMÚN', color: '#60A5FA', bg: '#60A5FA15', glow: `0 0 20px #60A5FA20` },
  'raro':       { label: 'RARO',       color: '#A78BFA', bg: '#A78BFA15', glow: `0 0 24px #A78BFA25` },
  'épico':      { label: 'ÉPICO',      color: '#F472B6', bg: '#F472B615', glow: `0 0 28px #F472B630` },
  'legendario': { label: 'LEGENDARIO', color: '#FBBF24', bg: '#FBBF2415', glow: `0 0 32px #FBBF2440, 0 0 64px #FBBF2420` },
  'mítico':     { label: 'MÍTICO',     color: '#E879F9', bg: '#E879F915', glow: `0 0 40px #E879F950, 0 0 80px #E879F930` },
};

const SHOP_ITEMS = [
  // ── TÍTULOS ──────────────────────────────────────────────────
  { id:'t_iniciado',   type:'title',  name:'Iniciado',                    desc:'Apenas cogiendo el ritmo...',                      rarity:'común',      price:0    },
  { id:'t_pergamino',  type:'title',  name:'Portador del Pergamino',     desc:'Forjando tu primer pergamino...',                  rarity:'poco común', price:400  },
  { id:'t_ronin',      type:'title',  name:'El Andariego',                desc:'Camina sin rumbo, como buseta sin ruta...',        rarity:'poco común', price:999  },
  { id:'t_samurai',    type:'title',  name:'Cacique de las Letras',      desc:'Su palabra pesa más que un costal de café...',     rarity:'raro',       price:1200  },
  { id:'t_kitsune',    type:'title',  name:'Zorro de Páramo',             desc:'Astuto, con la ruana siempre lista...',            rarity:'raro',       price:1500  },
  { id:'t_sabio',      type:'title',  name:'El Sabio de la Loma',         desc:'Habla, y hasta los abuelos hacen silencio...',     rarity:'épico',      price:2000  },
  { id:'t_sensei',     type:'title',  name:'Maestro del Combo',           desc:'Resuelve dudas con audio de 4 minutos...',         rarity:'épico',      price:2300  },
  { id:'t_shogun',     type:'title',  name:'El Libertador de las Letras', desc:'Liberando mentes, un examen a la vez...',          rarity:'legendario', price:3000 },
  { id:'t_tengu',      type:'title',  name:'El Mohán de la Biblioteca',  desc:'Nadie lo ha visto... pero su racha sigue ahí.',    rarity:'legendario', price:3600 },
  { id:'t_kami',       type:'title',  name:'El Dorado del Saber',        desc:'Ya no repasa. Solo brilla.',                       rarity:'mítico',     price:6000 },
  { id:'t_izanagi',    type:'title',  name:'Eterno como un Vallenato',   desc:'Su leyenda dura más que la parranda...',           rarity:'mítico',     price:10000 },
  // ── MARCOS ───────────────────────────────────────────────────
  { id:'f_jade',      type:'frame', name:'Anillo de Esmeralda', desc:'Codiciado por todos, regalado por nadie...',  rarity:'poco común', price:650 },
  { id:'f_cafe',      type:'frame', name:'Aro de Café',         desc:'Humea como tinto recién servido...',          rarity:'poco común', price:800 },
  { id:'f_sakura',    type:'frame', name:'Corona de Heliconia', desc:'Ni el filtro le hace justicia...',            rarity:'raro',       price:2000 },
  { id:'f_indigo',    type:'frame', name:'Espiral de Añil',     desc:'Gira sin parar, como ventilador sin luz...',  rarity:'raro',       price:2599 },
  { id:'f_koi',       type:'frame', name:'Rana Dorada',         desc:'Aura de tesoro precolombino...',              rarity:'épico',      price:3500 },
  { id:'f_dragon',    type:'frame', name:'El Volcán',           desc:'Arde como arepa olvidada en el fogón...',     rarity:'épico',      price:6000 },
  { id:'f_celestial', type:'frame', name:'Corona de Estrellas', desc:'Hasta los grillos cantan de día...',          rarity:'mítico',     price:15000 },
  // ── BANNERS ──────────────────────────────────────────────────
  { id:'b_ink',    type:'banner', name:'Tinto y Carriel',     desc:'Como la primera taza del día...',            rarity:'común',      price:300,
    css:`radial-gradient(ellipse at 80% 20%, rgba(201,150,58,0.18) 0%, transparent 50%),
         repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 6px),
         linear-gradient(145deg, #2C1810 0%, #4A2818 50%, #1A0E06 100%)` },
  { id:'b_washi',  type:'banner', name:'Papel de Fique',      desc:'Huele a hecho a mano...',                     rarity:'común',      price:450,
    css:`repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 8px),
         repeating-linear-gradient(-45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 8px),
         linear-gradient(135deg, #3a3424 0%, #4d4530 100%)` },
  { id:'b_sakura', type:'banner', name:'Selva de Heliconia',  desc:'Colores que ni el filtro alcanza...',         rarity:'poco común', price:700,
    css:`radial-gradient(circle at 25% 30%, rgba(255,200,80,0.25) 0%, transparent 40%),
         radial-gradient(circle at 75% 70%, rgba(255,90,60,0.30) 0%, transparent 45%),
         linear-gradient(160deg, #1a3a1a 0%, #2d4a1a 35%, #4a1f0a 75%, #5c2a0f 100%)` },
  { id:'b_matcha', type:'banner', name:'Cafetal Verde',       desc:'Fresco de las 6am, con neblina...',           rarity:'poco común', price:1000,
    css:`radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.06) 0%, transparent 50%),
         radial-gradient(ellipse at 30% 70%, rgba(45,106,45,0.4) 0%, transparent 60%),
         radial-gradient(ellipse at 70% 40%, rgba(20,60,20,0.5) 0%, transparent 55%),
         linear-gradient(160deg, #0a1f0a 0%, #1a3a1a 50%, #0f2910 100%)` },
  { id:'b_ocean',  type:'banner', name:'Ola del Caribe',      desc:'Playa, aunque sigas en examen...',            rarity:'raro',       price:1500,
    css:`repeating-linear-gradient(170deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 30px),
         radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.18) 0%, transparent 55%),
         linear-gradient(160deg, #001540 0%, #003c6e 50%, #00204a 100%)` },
  { id:'b_storm',  type:'banner', name:'Tormenta del Páramo', desc:'El cielo antes de olvidar la sombrilla...',   rarity:'raro',       price:2000,
    css:`linear-gradient(105deg, transparent 48%, rgba(255,255,255,0.18) 49%, rgba(255,255,255,0.05) 50%, transparent 51%),
         linear-gradient(115deg, transparent 30%, rgba(192,132,252,0.12) 31%, transparent 32%),
         linear-gradient(150deg, #1a1a2e 0%, #2a1a3a 50%, #0d0d1a 100%)` },
  { id:'b_llano',  type:'banner', name:'Atardecer Llanero',   desc:'Hasta las vacas se detienen a mirar...',      rarity:'raro',       price:4000,
    css:`radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.25) 0%, transparent 60%),
         linear-gradient(180deg, #2d1b4e 0%, #8b3a5c 35%, #e8743a 65%, #ffb347 100%)` },
  { id:'b_flame',  type:'banner', name:'Fuego del Volcán',    desc:'Directo desde las entrañas de la tierra...',  rarity:'épico',      price:6000,
    css:`radial-gradient(circle at 30% 80%, rgba(255,180,40,0.35) 0%, transparent 40%),
         radial-gradient(circle at 70% 90%, rgba(255,90,0,0.4) 0%, transparent 45%),
         radial-gradient(ellipse at 50% 100%, rgba(255,60,0,0.5) 0%, transparent 60%),
         linear-gradient(180deg, #1a0500 0%, #3d0d00 40%, #8b1a00 80%, #c43900 100%)` },
  { id:'b_aurora', type:'banner', name:'Cielo de Estrellas',  desc:'Como si alguien le subiera el brillo...',     rarity:'épico',      price:8000,
    css:`radial-gradient(1.5px 1.5px at 15% 25%, rgba(255,255,255,0.9), transparent),
         radial-gradient(1px 1px at 45% 60%, rgba(255,255,255,0.7), transparent),
         radial-gradient(1.5px 1.5px at 75% 15%, rgba(255,255,255,0.85), transparent),
         radial-gradient(1px 1px at 30% 85%, rgba(255,255,255,0.6), transparent),
         radial-gradient(1.5px 1.5px at 90% 50%, rgba(255,255,255,0.8), transparent),
         linear-gradient(160deg, #001a30 0%, #003a50 50%, #00403a 100%)` },
  { id:'b_cosmos', type:'banner', name:'Universo Muisca',     desc:'El cielo que inspiró leyendas de oro...',     rarity:'legendario', price:15000,
    css:`radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,255,255,0.8), transparent),
         radial-gradient(1px 1px at 55% 70%, rgba(255,255,255,0.6), transparent),
         radial-gradient(1.5px 1.5px at 80% 20%, rgba(255,255,255,0.85), transparent),
         radial-gradient(1px 1px at 35% 85%, rgba(255,255,255,0.5), transparent),
         radial-gradient(circle at 70% 80%, rgba(251,191,36,0.15) 0%, transparent 45%),
         linear-gradient(160deg, #0a0015 0%, #2a0a4a 50%, #150030 100%)` },
  { id:'b_void',   type:'banner', name:'El Dorado Perdido',   desc:'Brilla y desaparece... como tus llaves.',     rarity:'mítico',     price:18000, animClass:'banner-shimmer',
    css:`linear-gradient(100deg, transparent 30%, rgba(251,191,36,0.25) 50%, transparent 70%),
         linear-gradient(160deg, #0d001a 0%, #1a0033 50%, #0a0010 100%)` },
  // ── OBJETOS ESPECIALES ────────────────────────────────────────
  { id:'i_freeze',     type:'item',   name:'Kodachi de Hielo',       desc:'Protege tu racha un día. Úsalo cuando no puedas practicar.', rarity:'raro',  price:300 },
  { id:'i_boost',      type:'item',   name:'Pergamino del Maestro',  desc:'Duplica los XP de tu próximo simulacro ICFES.',      rarity:'épico',      price:1000  },
];

const ACCENT_COLORS = [
  { name: 'Ciruelo', value: '#9D4E7C' }, { name: 'Jade',    value: '#2D8A5E' },
  { name: 'Índigo',  value: '#4A6FA5' }, { name: 'Crisantemo', value: '#D4853A' },
  { name: 'Shogun',  value: '#7C3D3D' }, { name: 'Loto',    value: '#7B5EA7' },
  { name: 'Bambú',   value: '#5B8C5A' }, { name: 'Granate', value: '#8B2252' },
];

// ─────────────────────────────────────────────
//  PROFILE MINI CARD
// ─────────────────────────────────────────────
function ProfileMiniCard({ C, name, code, titleItem, photoURL, frameItem, bannerItem,
  level = 1, streak = 0, ryo = 0, icfesBest = 0, icfesTotal = 0,
  friendsCount = 0, appDays = 1, isPreview = false }) {
  const bannerCss = bannerItem?.css || `linear-gradient(135deg, ${C.accent}40 0%, ${C.accent}10 100%)`;
  let titleClass = '';
  if (titleItem?.rarity === 'legendario') titleClass = 'title-legendary';
  if (titleItem?.rarity === 'mítico')     titleClass = 'title-mythic';

  return (
    <div style={{ borderRadius: 18, overflow: 'hidden',
      border: `1px solid ${isPreview ? C.accent + '60' : C.border}`,
      boxShadow: isPreview
        ? `0 0 0 1px ${C.accent}30, 0 12px 40px rgba(0,0,0,0.4)`
        : '0 4px 20px rgba(0,0,0,0.2)' }}>
      {/* Banner */}
      <div className={bannerItem?.animClass || ''} style={{ height: 85, background: bannerCss, position: 'relative' }}>
        {isPreview && (
          <div style={{ position: 'absolute', top: 10, right: 12, fontSize: 9,
            fontWeight: 800, letterSpacing: 1.5, color: '#fff',
            background: `linear-gradient(90deg, ${C.accent}, ${C.accent}80)`,
            border: `1px solid ${C.accent}`, borderRadius: 6, padding: '4px 10px' }}>
            VISTA PREVIA
          </div>
        )}
      </div>
      {/* Contenido */}
      <div style={{ padding: '0 20px 20px', background: C.bgAlt }}>
        <div style={{ marginTop: -32, marginBottom: 12, display: 'inline-block' }}>
          <Av name={name || '?'} sz={64} C={C} photoURL={photoURL} frameData={frameItem} />
        </div>
        <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: C.text,
          marginBottom: 2, lineHeight: 1.2 }}>{name || 'Usuario'}</div>
        <div className={titleClass} style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2,
          color: titleClass ? undefined : C.accent, marginBottom: 6, textTransform: 'uppercase' }}>
          {titleItem?.name || 'Iniciado'}
        </div>
        <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 14 }}>@{code}</div>

        {/* Badges principales */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11,
            fontWeight: 700, background: `${C.accent}15`, color: C.accent,
            border: `1px solid ${C.accent}30`, borderRadius: 8, padding: '4px 10px' }}>
            <PkIc n="zap" s={11} c={C.accent} /> Nv. {level}
          </div>
          {streak > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11,
              fontWeight: 700, background: '#FBBF2415', color: '#FBBF24',
              border: '1px solid #FBBF2430', borderRadius: 8, padding: '4px 10px' }}>
              <PkIc n="flame" s={11} c="#FBBF24" /> {streak} días
            </div>
          )}
          {ryo > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11,
              fontWeight: 700, background: '#34D39915', color: '#34D399',
              border: '1px solid #34D39930', borderRadius: 8, padding: '4px 10px' }}>
              <PkIc n="empanada" s={11} c="#34D399" /> {ryo}
            </div>
          )}
        </div>

        {/* Grid de estadísticas — solo si no es preview */}
        {!isPreview && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
            borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
            {[
              { icon: 'icfes',   label: 'Mejor ICFES',  val: icfesBest > 0 ? `${icfesBest}/500` : '—' },
              { icon: 'target',  label: 'Simulacros',    val: icfesTotal  || 0 },
              { icon: 'people',  label: 'Aliados',       val: friendsCount || 0 },
              { icon: 'timer',   label: 'Días en Pankey',val: appDays || 1 },
            ].map(({ icon, label, val }) => (
              <div key={label} style={{ background: C.bgAlt, padding: '10px 12px',
                borderRadius: 12, border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5,
                  marginBottom: 5, color: C.textMuted }}>
                  <PkIc n={icon} s={11} c={C.textMuted} />
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>{label.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.text }}>{val}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SHOP ITEM MODAL
// ─────────────────────────────────────────────
function ShopItemModal({ C, isLight, item, appState, user, onBuy, onEquip, onClose }) {
  if (!item) return null;
  const isOwned    = (appState.inventory || []).includes(item.id);
  const isEquipped = appState.equipped?.[item.type]?.id === item.id;
  const rarity     = RARITY_META[item.rarity] || RARITY_META['común'];
  const canAfford  = (appState.ryo || 0) >= item.price;
  const lvl        = computeLevel(appState.xp || 0).level;
  const previewFrame  = item.type === 'frame'  ? item : appState.equipped?.frame;
  const previewBanner = item.type === 'banner' ? item : appState.equipped?.banner;
  const previewTitle  = item.type === 'title'  ? item : appState.equipped?.title;

  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99998, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="fu" style={{ width: '100%', maxWidth: 380, background: C.bgAlt, border: `1px solid ${rarity.color}40`, borderRadius: 24, overflow: 'hidden', boxShadow: `0 0 0 1px ${rarity.color}20, 0 24px 80px rgba(0,0,0,0.8), ${rarity.glow}` }}>
        <div style={{ padding: '24px', background: `linear-gradient(135deg, ${rarity.color}18, transparent)`, borderBottom: `1px solid ${C.border}`, position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PkIc n="x" s={14} c={C.textMuted} /></button>
          <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 2, color: rarity.color, background: rarity.bg, border: `1px solid ${rarity.color}30`, borderRadius: 6, padding: '4px 10px', display: 'inline-block', marginBottom: 12 }}>{rarity.label}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: C.text, fontFamily: "'Fraunces', serif", lineHeight: 1.1, marginBottom: 8 }}>{item.name}</div>
          <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>{item.desc}</div>
        </div>
        {item.type !== 'item' && (
          <div style={{ padding: '20px' }}>
            <ProfileMiniCard C={C} name={user?.name} code={user?.code} titleItem={previewTitle} photoURL={appState.photoURL} frameItem={previewFrame} bannerItem={previewBanner} level={lvl} ryo={appState.ryo} isPreview={true} />
          </div>
        )}
        <div style={{ padding: '0 20px 24px' }}>
          {item.type === 'item' ? (
            <button onClick={() => { if (canAfford && !isOwned) { onBuy(item); onClose(); } }} disabled={!canAfford} style={{ width: '100%', padding: '16px', background: canAfford ? `linear-gradient(135deg, ${rarity.color}, ${rarity.color}DD)` : C.bgAlt, color: canAfford ? '#fff' : C.textMuted, border: canAfford ? 'none' : `1px solid ${C.border}`, borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: canAfford ? 'pointer' : 'not-allowed', boxShadow: canAfford ? `0 8px 24px ${rarity.color}40` : 'none', fontFamily: 'inherit' }}>
              {canAfford ? `Adquirir · ${item.price} emp.` : `Faltan ${item.price - (appState.ryo || 0)} emp.`}
            </button>
          ) : isOwned ? (
            <button onClick={() => { onEquip(item); onClose(); }} disabled={isEquipped} style={{ width: '100%', padding: '16px', background: isEquipped ? C.bgAlt : `linear-gradient(135deg, ${C.accent}, ${C.accent}DD)`, color: isEquipped ? C.textMuted : '#fff', border: isEquipped ? `1px solid ${C.border}` : 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: isEquipped ? 'default' : 'pointer', boxShadow: isEquipped ? 'none' : `0 8px 24px ${C.accent}40`, fontFamily: 'inherit' }}>
              {isEquipped ? '✓ Objeto Equipado' : 'Equipar en el Perfil'}
            </button>
          ) : (
            <button onClick={() => { if (canAfford) { onBuy(item); onClose(); } }} disabled={!canAfford} style={{ width: '100%', padding: '16px', background: canAfford ? `linear-gradient(135deg, ${rarity.color}, ${rarity.color}DD)` : C.bgAlt, color: canAfford ? '#fff' : C.textMuted, border: canAfford ? 'none' : `1px solid ${C.border}`, borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: canAfford ? 'pointer' : 'not-allowed', boxShadow: canAfford ? `0 8px 24px ${rarity.color}40` : 'none', fontFamily: 'inherit' }}>
              {canAfford ? `Adquirir · ${item.price} emp.` : `Faltan ${item.price - (appState.ryo || 0)} emp.`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────
//  DUEL SETUP — El retador arma el Duelo a Muerte
// ─────────────────────────────────────────────────────────────
const DUEL_SUBJECTS = (typeof SUBJECT_META !== 'undefined' && SUBJECT_META)
  ? Object.keys(SUBJECT_META)
  : ['Lectura Crítica', 'Matemáticas', 'Sociales y Ciudadanas', 'Ciencias Naturales', 'Inglés'];

function DuelSetup({ C, isLight, appState, user, friends, preselectRival, onClose, onCreated, pushNotif }) {
  const [rival, setRival]       = useState(preselectRival || null);
  const [count, setCount]       = useState(5);
  const [subs, setSubs]         = useState(DUEL_SUBJECTS.slice(0, 2));
  const [wager, setWager]       = useState(20);
  const [sending, setSending]   = useState(false);

  const myRyo  = appState?.ryo || 0;
  const maxBet = Math.max(10, Math.min(myRyo, 500)); // techo sano de 500

  const toggleSub = (s) =>
    setSubs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const canSend = rival && subs.length > 0 && wager >= 10 && wager <= myRyo && !sending;

  const enviarReto = async () => {
    if (!canSend) return;
    setSending(true);
    try {
      const duelId = await DuelFB.crear({
        from: { code: user.code, name: user.name || 'Retador', photo: appState?.photoURL || null },
        to:   { code: rival.code, name: rival.name || 'Rival',  photo: rival.appState?.photoURL || null },
        wager,
        config: { count, subjects: subs },
      });
      onCreated?.(duelId, rival, wager);  // el componente padre descuenta la apuesta
    } catch (e) {
      pushNotif?.('No se pudo enviar el reto. Revisa tu conexión.');
      setSending(false);
    }
  };

  const meta = (s) => (typeof SUBJECT_META !== 'undefined' && SUBJECT_META?.[s]) || { color: C.accent, short: s.slice(0, 3) };

  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99998, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 18px' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="fu" style={{ width: '100%', maxWidth: 400, maxHeight: '90vh', overflowY: 'auto', background: C.bg, borderRadius: 24, border: `1px solid ${C.border}`, padding: 22 }}>

        {/* Encabezado */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${C.amberMid}, #C0392B)`, boxShadow: `0 4px 16px ${C.amberMid}55` }}>
            <PkIc n="swords" s={24} c="#fff" />
          </div>
          <div>
            <div className="serif" style={{ fontSize: 21, fontWeight: 800, color: C.text }}>Duelo a Muerte</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>El que pierda llora y paga empanadas.</div>
          </div>
        </div>

        {/* 1. Rival */}
        <div style={{ fontSize: 12, fontWeight: 800, color: C.accent, letterSpacing: 0.5, marginBottom: 8 }}>¿A QUIÉN VAS A RETAR?</div>
        {(!friends || friends.length === 0) ? (
          <div style={{ padding: 14, borderRadius: 12, background: C.bgAlt, border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 13, marginBottom: 18 }}>
            Todavía no tienes aliados. Agrega a alguien en El Combo para poder retarlo.
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6, marginBottom: 18 }}>
            {friends.map(f => {
              const sel = rival?.code === f.code;
              return (
                <button key={f.code} onClick={() => setRival(f)} style={{
                  flexShrink: 0, width: 84, padding: '12px 6px', borderRadius: 14, cursor: 'pointer',
                  background: sel ? `${C.amberMid}1F` : C.bgAlt,
                  border: sel ? `1.5px solid ${C.amberMid}` : `1px solid ${C.border}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, fontFamily: 'inherit',
                }}>
                  <Av name={f.name || '?'} sz={42} C={C} photoURL={f.appState?.photoURL} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: sel ? C.amberMid : C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>{f.name || '???'}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* 2. Número de preguntas */}
        <div style={{ fontSize: 12, fontWeight: 800, color: C.accent, letterSpacing: 0.5, marginBottom: 8 }}>¿CUÁNTAS PREGUNTAS?</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {[3, 5, 10].map(n => (
            <button key={n} onClick={() => setCount(n)} style={{
              flex: 1, padding: '12px 0', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
              background: count === n ? `${C.amberMid}1F` : C.bgAlt,
              border: count === n ? `1.5px solid ${C.amberMid}` : `1px solid ${C.border}`,
              color: count === n ? C.amberMid : C.text, fontSize: 15, fontWeight: 800,
            }}>{n}</button>
          ))}
        </div>

        {/* 3. Materias */}
        <div style={{ fontSize: 12, fontWeight: 800, color: C.accent, letterSpacing: 0.5, marginBottom: 8 }}>MATERIAS DEL DUELO</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
          {DUEL_SUBJECTS.map(s => {
            const sel = subs.includes(s);
            const m = meta(s);
            return (
              <button key={s} onClick={() => toggleSub(s)} style={{
                padding: '9px 13px', borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit',
                background: sel ? `${m.color}22` : C.bgAlt,
                border: sel ? `1.5px solid ${m.color}` : `1px solid ${C.border}`,
                color: sel ? m.color : C.textMuted, fontSize: 12, fontWeight: 700,
              }}>{s}</button>
            );
          })}
        </div>

        {/* 4. Apuesta */}
        <div style={{ fontSize: 12, fontWeight: 800, color: C.accent, letterSpacing: 0.5, marginBottom: 8 }}>LA APUESTA</div>
        <div style={{ padding: 16, borderRadius: 16, background: C.bgAlt, border: `1px solid ${C.border}`, marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
            <PkIc n="empanada" s={26} c={C.amberMid} />
            <span className="serif" style={{ fontSize: 34, fontWeight: 800, color: C.text }}>{wager}</span>
            <span style={{ fontSize: 13, color: C.textMuted, fontWeight: 600 }}>empanadas c/u</span>
          </div>
          <input
            type="range" min={10} max={maxBet} step={10} value={Math.min(wager, maxBet)}
            onChange={e => setWager(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: C.amberMid, cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.textMuted, marginTop: 6 }}>
            <span>Mín 10</span>
            <span>Tienes {myRyo}</span>
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>
            El ganador se lleva las <b style={{ color: C.amberMid }}>{wager * 2}</b> empanadas. Empate, cada quien recupera lo suyo.
          </div>
        </div>

        {/* Botones */}
        <button disabled={!canSend} onClick={enviarReto} style={{
          width: '100%', padding: '15px', borderRadius: 16, border: 'none', cursor: canSend ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit', fontSize: 15, fontWeight: 800, color: '#fff',
          background: canSend ? `linear-gradient(135deg, ${C.amberMid}, #C0392B)` : C.bgAlt,
          opacity: canSend ? 1 : 0.5, boxShadow: canSend ? `0 6px 20px ${C.amberMid}50` : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <PkIc n="swords" s={17} c={canSend ? '#fff' : C.textMuted} />
          {sending ? 'Enviando reto...' : !rival ? 'Elige un rival' : wager > myRyo ? 'No te alcanza' : '¡Apostar y Retar!'}
        </button>
        <button onClick={onClose} style={{ width: '100%', marginTop: 10, background: 'none', border: `1px solid ${C.border}`, borderRadius: 16, padding: 13, color: C.textMuted, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          Mejor no, me arrugué
        </button>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────
//  DUEL ARENA — El simulacro del Sabio, pero en vivo contra alguien
// ─────────────────────────────────────────────────────────────
function DuelArena({ C, isLight, room, duelId, soyRetador, onFinished }) {
  const questions = room.questions || [];
  const total = questions.length;
  const PER_Q = 45;

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers]   = useState(() => new Array(total).fill(null));
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(PER_Q);
  const finishedRef = useRef(false);

  const writeLive = (ans) => {
    if (!fbOK()) return;
    const correctSoFar = ans.filter((a, i) => a === questions[i]?.correct).length;
    const responded = ans.filter(a => a !== null).length;
    const liveScore = total ? Math.round((correctSoFar / total) * 500) : 0;
    const upd = soyRetador
      ? { scoreRetador: liveScore, answeredRetador: responded }
      : { scoreRetado: liveScore, answeredRetado: responded };
    try { FB().update(FB().ref(FB().db, `duelRooms/${duelId}`), upd); } catch (e) {}
  };

  const finishDuel = (finalAnswers) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const correct = finalAnswers.filter((a, i) => a === questions[i]?.correct).length;
    const score = total ? Math.round((correct / total) * 500) : 0;
    if (fbOK()) {
      const upd = soyRetador
        ? { scoreRetador: score, correctRetador: correct, answeredRetador: total, finishedRetador: true }
        : { scoreRetado: score, correctRetado: correct, answeredRetado: total, finishedRetado: true };
      try { FB().update(FB().ref(FB().db, `duelRooms/${duelId}`), upd); } catch (e) {}
    }
    onFinished?.(score, correct, total);
  };

  const handleAnswer = (idx) => {
    if (animating) return;
    setSelected(idx >= 0 ? idx : null);
    setAnimating(true);
    const isCorrect = idx === questions[currentQ]?.correct;
    if (isCorrect) { FX.play('success'); FX.vibrate('success'); }
    else { FX.play('error'); FX.vibrate('error'); }
    setAnswers(prev => {
      const next = [...prev];
      next[currentQ] = idx;
      writeLive(next);
      return next;
    });
  };

  const handleNext = () => {
    setAnimating(false);
    setSelected(null);
    if (currentQ < total - 1) {
      setCurrentQ(q => q + 1);
      setTimeLeft(PER_Q);
    } else {
      finishDuel(answers);
    }
  };

  const forfeit = () => {
    if (window.confirm('¿Rendirte? Cuenta como terminado con tu puntaje actual y podrías perder las empanadas.')) {
      finishDuel(answers);
    }
  };

  // Cronómetro por pregunta (se pausa al responder)
  useEffect(() => {
    if (animating) return;
    if (timeLeft <= 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, animating, currentQ]);

  const q = questions[currentQ];
  if (!q) return null;

  const myCorrect   = answers.filter((a, i) => a === questions[i]?.correct).length;
  const myScoreLive = total ? Math.round((myCorrect / total) * 500) : 0;
  const oppName     = soyRetador ? (room.toName || 'Rival') : (room.fromName || 'Rival');
  const oppPhoto    = soyRetador ? room.toPhoto : room.fromPhoto;
  const oppScore    = (soyRetador ? room.scoreRetado : room.scoreRetador) || 0;
  const oppAnswered = (soyRetador ? room.answeredRetado : room.answeredRetador) || 0;
  const oppFinished = soyRetador ? room.finishedRetado : room.finishedRetador;
  const timePct     = Math.max(0, (timeLeft / PER_Q) * 100);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99996, background: C.bg, overflowY: 'auto' }}>
      {/* BARRA VS (fija arriba) */}
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: `linear-gradient(180deg, ${C.bg}, ${C.bg}F2)`, borderBottom: `1px solid ${C.border}`, padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: `${C.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <PkIc n="rana" s={16} c={C.accent} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700 }}>TÚ</div>
              <div style={{ fontSize: 17, fontWeight: 900, color: C.accent, lineHeight: 1 }}>{myScoreLive}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: C.textMuted, letterSpacing: 1 }}>VS</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: timeLeft > 10 ? C.text : '#EF4444', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>
              {String(timeLeft).padStart(2, '0')}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0, justifyContent: 'flex-end' }}>
            <div style={{ minWidth: 0, textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {oppName}{oppFinished ? ' ✓' : ''}
              </div>
              <div style={{ fontSize: 17, fontWeight: 900, color: '#EF4444', lineHeight: 1 }}>{oppScore}</div>
            </div>
            <Av name={oppName} sz={30} C={C} photoURL={oppPhoto} />
          </div>
        </div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 4, borderRadius: 99, background: C.bgAlt, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${timePct}%`, background: timeLeft > 10 ? C.amberMid : '#EF4444', transition: 'width 1s linear' }} />
          </div>
          <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, flexShrink: 0 }}>Rival: {oppAnswered}/{total}</span>
        </div>
      </div>

      {/* El simulacro del Sabio, idéntico */}
      <div style={{ padding: '16px 16px 80px' }}>
        <IcfesTest
          C={C} isLight={isLight}
          question={q} questionIdx={currentQ} total={total}
          selected={selected} animating={animating}
          onAnswer={handleAnswer} onNext={handleNext}
          onExit={forfeit}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  DUEL RESULT — Marcador final sobre 500 + reparto de empanadas
// ─────────────────────────────────────────────────────────────
function DuelResult({ C, isLight, room, soyRetador, onClose }) {
  const total      = (room.questions?.length) || room.config?.count || 0;
  const myScore    = (soyRetador ? room.scoreRetador : room.scoreRetado) || 0;
  const oppScore   = (soyRetador ? room.scoreRetado : room.scoreRetador) || 0;
  const myCorrect  = (soyRetador ? room.correctRetador : room.correctRetado) || 0;
  const oppCorrect = (soyRetador ? room.correctRetado : room.correctRetador) || 0;
  const oppName    = soyRetador ? (room.toName || 'Rival') : (room.fromName || 'Rival');
  const wager      = room.wager || 0;

  const win = myScore > oppScore;
  const tie = myScore === oppScore;
  const color  = win ? '#34D399' : tie ? C.amberMid : '#EF4444';
  const titulo = win ? '¡GANASTE!' : tie ? 'EMPATE' : 'PERDISTE';
  const frase  = win
    ? `Te llevaste ${wager * 2} empanadas. ¡Puro perrenque!`
    : tie
      ? `Quedaron iguales. Cada quien recupera sus ${wager} empanadas.`
      : `${oppName} se llevó tus empanadas. ¡La próxima es tuya!`;

  const players = [
    { name: 'Tú',    score: myScore,  correct: myCorrect,  highlight: win },
    { name: oppName, score: oppScore, correct: oppCorrect, highlight: !win && !tie },
  ];

  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99997, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 18px' }}>
      <div className="fu" style={{ width: '100%', maxWidth: 400, maxHeight: '90vh', overflowY: 'auto', background: C.bgAlt, borderRadius: 24, border: `1px solid ${color}40`, boxShadow: `0 0 0 1px ${color}25, 0 24px 80px rgba(0,0,0,0.8)`, padding: 24 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color, marginBottom: 6 }}>DUELO FINALIZADO</div>
          <div className="serif" style={{ fontSize: 34, fontWeight: 900, color, textShadow: `0 0 24px ${color}50` }}>{titulo}</div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          {players.map((p, i) => (
            <div key={i} style={{ flex: 1, background: C.bg, borderRadius: 18, border: `1px solid ${p.highlight ? color : C.border}`, padding: '16px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.text, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
              <div style={{ transform: 'scale(0.82)', transformOrigin: 'center', height: 132, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ScoreGauge score={p.score} C={C} />
              </div>
              <div style={{ marginTop: 6, fontSize: 11, color: C.textMuted }}>
                <span style={{ color: '#34D399', fontWeight: 700 }}>{p.correct} ✓</span>
                {' · '}
                <span style={{ color: '#EF4444', fontWeight: 700 }}>{Math.max(0, total - p.correct)} ✗</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: `${color}12`, border: `1px solid ${color}35`, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <PkIc n="empanada" s={26} c={color} />
          <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.5, fontWeight: 600 }}>{frase}</div>
        </div>

        <PrimaryBtn C={C} onClick={onClose}>Cerrar</PrimaryBtn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  DUEL CONTROLLER — El cerebro del duelo (se monta en la App)
// ─────────────────────────────────────────────────────────────
function DuelController({ C, isLight, user, appState, setAppState, pushNotif }) {
  const [duelId, setDuelId]       = useState(null);
  const [room, setRoom]           = useState(null);
  const [iFinished, setIFinished] = useState(false);

  const acceptedRef  = useRef(new Set());
  const genRef       = useRef(new Set());
  const paidRef      = useRef(new Set());
  const refundRef    = useRef(new Set());
  const dismissedRef = useRef(new Set());

  // Vigilar mis punteros de duelo y elegir el más reciente activo
  useEffect(() => {
    if (!fbOK() || !user?.code) return;
    const { db, ref, onValue } = window.__FB;
    const unsub = onValue(ref(db, `duels/${user.code}`), snap => {
      if (!snap.exists()) { setDuelId(null); return; }
      const pointers = Object.values(snap.val())
        .filter(d => d && d.id && d.status !== 'rejected' && !dismissedRef.current.has(d.id))
        .sort((a, b) => (b.ts || 0) - (a.ts || 0));
      setDuelId(pointers.length ? pointers[0].id : null);
    });
    return () => unsub();
  }, [user?.code]);

  // Suscribirse a la sala elegida
  useEffect(() => {
    setIFinished(false);
    if (!duelId) { setRoom(null); return; }
    const unsub = DuelFB.escuchar(duelId, data => setRoom(data));
    return () => unsub && unsub();
  }, [duelId]);

  // Reacciones a los cambios de la sala
  useEffect(() => {
    if (!room || !duelId) return;
    const soyRetador = room.fromCode === user.code;

    if (room.status === 'accepted' && soyRetador && !genRef.current.has(duelId)) {
      genRef.current.add(duelId);
      (async () => {
        let qs;
        try {
          qs = await fetchGeminiQuestions(room.config?.subjects || [], room.config?.count || 5);
        } catch (e) {
          const subs = room.config?.subjects || [];
          const filtered = ICFES_QUESTIONS.filter(q => subs.includes(q.subject));
          const pool = filtered.length ? filtered : ICFES_QUESTIONS;
          qs = [...pool].sort(() => Math.random() - 0.5).slice(0, room.config?.count || 5);
        }
        await DuelFB.iniciarConPreguntas(duelId, qs, room.fromCode, room.toCode);
      })();
    }

    if (room.status === 'rejected' && soyRetador && !refundRef.current.has(duelId)) {
      refundRef.current.add(duelId);
      setAppState(s => ({ ...s, ryo: (s.ryo || 0) + (room.wager || 0) }));
      pushNotif?.(`@${room.toName} se arrugó. Te devolvimos ${room.wager} empanadas.`);
      DuelFB.cerrarPuntero(duelId, user.code);
      dismissedRef.current.add(duelId);
      setDuelId(null);
    }

    const bothDone = room.finishedRetador && room.finishedRetado;
    if (bothDone && !paidRef.current.has(duelId)) {
      paidRef.current.add(duelId);
      const myScore  = (soyRetador ? room.scoreRetador : room.scoreRetado) || 0;
      const oppScore = (soyRetador ? room.scoreRetado : room.scoreRetador) || 0;
      const w = room.wager || 0;
      let delta = 0;
      if (myScore > oppScore) delta = w * 2;
      else if (myScore === oppScore) delta = w;
      if (delta > 0) setAppState(s => ({ ...s, ryo: (s.ryo || 0) + delta }));
    }
  }, [room, duelId, user?.code]);

  if (!room || !duelId) return null;
  const soyRetador = room.fromCode === user.code;
  const bothDone = room.finishedRetador && room.finishedRetado;

  const cerrar = () => {
    dismissedRef.current.add(duelId);
    DuelFB.cerrarPuntero(duelId, user.code);
    setDuelId(null); setRoom(null); setIFinished(false);
  };
  const aceptarReto = () => {
    if (acceptedRef.current.has(duelId)) return;
    if ((appState.ryo || 0) < (room.wager || 0)) { pushNotif?.('No te alcanzan las empanadas para aceptar este duelo.'); return; }
    acceptedRef.current.add(duelId);
    setAppState(s => ({ ...s, ryo: (s.ryo || 0) - (room.wager || 0) }));
    DuelFB.aceptar(duelId, room.toCode, room.fromCode);
  };
  const rechazarReto = () => {
    DuelFB.rechazar(duelId, room.toCode, room.fromCode);
    dismissedRef.current.add(duelId);
    DuelFB.cerrarPuntero(duelId, user.code);
    setDuelId(null); setRoom(null);
  };

  // 1) Resultado
  if (bothDone) return <DuelResult C={C} isLight={isLight} room={room} soyRetador={soyRetador} onClose={cerrar} />;

  // 2) Reto entrante
  if (room.status === 'pending' && !soyRetador) {
    return (
      <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99997, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 18px' }}>
        <div className="fu" style={{ width: '100%', maxWidth: 360, background: C.bgAlt, borderRadius: 24, border: `1px solid ${C.amberMid}50`, boxShadow: `0 0 0 1px ${C.amberMid}25, 0 24px 80px rgba(0,0,0,0.8)`, padding: 26, textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${C.amberMid}, #C0392B)`, boxShadow: `0 8px 28px ${C.amberMid}55` }}>
            <PkIc n="swords" s={36} c="#fff" />
          </div>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 2, color: C.amberMid, marginBottom: 6 }}>¡TE RETARON A DUELO!</div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 10 }}>{room.fromName} quiere medirse</div>
          <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 18 }}>
            Apostó <b style={{ color: C.amberMid }}>{room.wager}</b> empanadas en {room.config?.count || 5} preguntas. Si aceptas, también pones <b style={{ color: C.amberMid }}>{room.wager}</b> y el ganador se lleva <b style={{ color: C.amberMid }}>{(room.wager || 0) * 2}</b>.
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={rechazarReto} style={{ flex: 1, padding: '14px', borderRadius: 14, background: 'none', border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Me arrugo</button>
            <button onClick={aceptarReto} style={{ flex: 1.4, padding: '14px', borderRadius: 14, border: 'none', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', background: `linear-gradient(135deg, ${C.amberMid}, #C0392B)`, boxShadow: `0 6px 20px ${C.amberMid}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <PkIc n="swords" s={16} c="#fff" /> ¡Acepto!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3) Esperando / preparando
  if (room.status === 'pending' || room.status === 'accepted') {
    const msg = room.status === 'accepted' ? 'Generando las preguntas del duelo...' : `Esperando que ${room.toName} acepte el reto...`;
    return (
      <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99997, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="fu" style={{ width: '100%', maxWidth: 340, background: C.bgAlt, borderRadius: 24, border: `1px solid ${C.border}`, padding: 30, textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px dashed ${C.amberMid}50`, animation: 'spin 5s linear infinite' }} />
            <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: `2px solid ${C.amberMid}20`, borderTopColor: C.amberMid, animation: 'spin 2.5s linear infinite reverse' }} />
            <PkIc n="swords" s={32} c={C.amberMid} />
          </div>
          <div className="serif" style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8 }}>Duelo en preparación</div>
          <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 20 }}>{msg}</div>
          {room.status === 'pending' && soyRetador && (
            <button onClick={cerrar} style={{ width: '100%', background: 'none', border: `1px solid ${C.border}`, borderRadius: 14, padding: 12, color: C.textMuted, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ocultar (el reto sigue en pie)</button>
          )}
        </div>
      </div>
    );
  }

  // 4) Duelo activo
  if (room.status === 'active' && Array.isArray(room.questions) && room.questions.length > 0) {
    if (iFinished) {
      const myScore  = (soyRetador ? room.scoreRetador : room.scoreRetado) || 0;
      const oppScore = (soyRetador ? room.scoreRetado : room.scoreRetador) || 0;
      const oppName  = soyRetador ? (room.toName || 'tu rival') : (room.fromName || 'tu rival');
      return (
        <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99997, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="fu" style={{ width: '100%', maxWidth: 340, background: C.bgAlt, borderRadius: 24, border: `1px solid ${C.border}`, padding: 30, textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 70, height: 70, margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px dashed ${C.accent}60`, animation: 'spin 4s linear infinite' }} />
              <PkIc n="check" s={30} c={C.accent} />
            </div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8 }}>¡Terminaste!</div>
            <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 16 }}>
              Tu puntaje: <b style={{ color: C.accent }}>{myScore}</b>. Esperando a que <b style={{ color: C.text }}>{oppName}</b> termine...
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{oppName} va en {oppScore} pts</div>
          </div>
        </div>
      );
    }
    return <DuelArena key={duelId} C={C} isLight={isLight} room={room} duelId={duelId} soyRetador={soyRetador} onFinished={() => setIFinished(true)} />;
  }

  return null;
}

// ─────────────────────────────────────────────
//  PERFIL DEL ALIADO (Chat real + botón de reto)
// ─────────────────────────────────────────────
function FriendProfileModal({ C, isLight, person, user, isFriend, sent, appState, setAppState, onSendRequest, onUnirRacha, onClose, pushNotif, onChallenge }) {
  const [view, setView] = useState('profile');
  const [friendsCount, setFriendsCount] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatScrollRef = useRef(null);

  const chatId = user?.code && person?.code ? [user.code, person.code].sort().join('_') : null;

  useEffect(() => {
    if (!fbOK() || !chatId) return;
    const chatRef = window.__FB.ref(window.__FB.db, `chats/${chatId}`);
    const unsubChat = window.__FB.onValue(chatRef, snap => {
      setMessages(snap.exists() ? Object.values(snap.val()).sort((a, b) => a.ts - b.ts) : []);
    });
    window.__FB.get(window.__FB.ref(window.__FB.db, `friendships/${person.code}`)).then(snap => {
      setFriendsCount(snap.exists() ? Object.keys(snap.val()).length : 0);
    }).catch(() => setFriendsCount(0));
    return () => unsubChat();
  }, [chatId, person?.code]);

  useEffect(() => {
    if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [messages, view]);

  const handleSendChat = async () => {
    if (!chatInput.trim() || !fbOK() || !chatId) return;
    const msg = { text: chatInput.trim(), who: user.code, ts: Date.now(), time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }) };
    try { await window.__FB.push(window.__FB.ref(window.__FB.db, `chats/${chatId}`), msg); setChatInput(''); FX.play('tap'); }
    catch (e) { pushNotif?.('El viento se llevó tu mensaje. Intenta de nuevo.'); }
  };

  if (!person) return null;

  const appS     = person.appState || {};
  const equipped = appS.equipped || person.equipped || {};
  const lvl      = computeLevel(appS.xp ?? person.xp ?? 0).level;
  const history  = appS.icfesHistory || [];
  const icfesBest  = history.length ? Math.max(...history.map(h => h.score)) : 0;
  const icfesTotal = history.length;
  const appDays  = Math.max(1, Math.ceil((Date.now() - (person.ts || Date.now())) / 86400000));
  const isMe = person.code === user?.code;

  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99997, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 20px' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="fu" style={{ width: '100%', maxWidth: 380, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.8)' }}>

        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
          {view !== 'profile' ? (
            <button onClick={() => setView('profile')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, color: C.textMuted, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
              <PkIc n="left" s={14} c={C.textMuted} /> Volver
            </button>
          ) : (
            <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, letterSpacing: 1.5 }}>PERFIL DE ALIADO</div>
          )}
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <PkIc n="x" s={16} c={C.textMuted} />
          </button>
        </div>

        {view === 'profile' && (
          <div className="fi">
            <ProfileMiniCard C={C} name={person.name} code={person.code} titleItem={equipped.title} frameItem={equipped.frame} bannerItem={equipped.banner} photoURL={appS.photoURL || person.photoURL} level={lvl} streak={appS.streakDays ?? person.streakDays ?? 0} ryo={appS.ryo ?? person.ryo ?? 0} icfesBest={icfesBest} icfesTotal={icfesTotal} friendsCount={friendsCount ?? 0} appDays={appDays} />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {isMe ? (
                <div style={{ padding: '14px', borderRadius: 14, textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.accent}50`, color: C.accent, fontSize: 13, fontWeight: 700 }}>
                  Este es tu propio Pergamino
                </div>
              ) : isFriend ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <button onClick={() => setView('chat')} style={{ padding: '14px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, color: C.text, fontSize: 13, fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      <PkIc n="msg" s={20} c={C.text} /> Echar Razón
                    </button>
                    <button onClick={() => onChallenge?.(person)} style={{ padding: '14px', borderRadius: 14, background: `linear-gradient(135deg, ${C.amberMid}, #C0392B)`, border: 'none', color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: `0 4px 15px ${C.amberMid}40` }}>
                      <PkIc n="swords" s={20} c="#fff" /> Duelo a Muerte
                    </button>
                  </div>
                  <button onClick={onUnirRacha} style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, color: C.text, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
                    <PkIc n="flame" s={18} c={C.amberMid} /> Unir Racha
                  </button>
                </>
              ) : sent ? (
                <div style={{ padding: '14px', borderRadius: 14, textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 13, fontWeight: 700 }}>
                  Solicitud enviada ✓
                </div>
              ) : (
                <PrimaryBtn C={C} onClick={onSendRequest}>Forjar Alianza</PrimaryBtn>
              )}
            </div>
          </div>
        )}

        {view === 'chat' && (
          <div className="fi" style={{ display: 'flex', flexDirection: 'column', height: 450 }}>
            <div ref={chatScrollRef} style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', color: C.textMuted, fontSize: 13, marginTop: 40, fontStyle: 'italic' }}>El papiro está en blanco. ¡Echa la primera razón!</div>
              )}
              {messages.map(m => {
                const isMyMsg = m.who === user?.code;
                return (
                  <div key={m.ts} style={{ alignSelf: isMyMsg ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                    <div style={{ background: isMyMsg ? `linear-gradient(135deg, ${C.accent}30, ${C.accent}10)` : 'rgba(255,255,255,0.05)', border: `1px solid ${isMyMsg ? C.accent + '50' : C.border}`, padding: '12px 16px', borderRadius: isMyMsg ? '16px 16px 4px 16px' : '16px 16px 16px 4px', fontSize: 14, color: C.text, lineHeight: 1.5 }}>
                      {m.text}
                    </div>
                    <div style={{ fontSize: 9, color: C.textMuted, marginTop: 4, textAlign: isMyMsg ? 'right' : 'left' }}>{m.time}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: '16px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 10, background: 'rgba(0,0,0,0.2)' }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Escribe tu razón..." style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, borderRadius: 20, padding: '0 16px', color: C.text, fontSize: 14, outline: 'none', fontFamily: 'inherit', height: 44 }} onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }} />
              <button onClick={handleSendChat} style={{ width: 44, height: 44, borderRadius: '50%', background: C.accent, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 4px 15px ${C.accent}50`, opacity: chatInput.trim() ? 1 : 0.5 }}>
                <PkIc n="right" s={18} c="#000" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────
//  EL COMBO (Ex-FriendsView) — Ranking y Social
// ─────────────────────────────────────────────
function FriendsView({ C, isLight, appState, setAppState, user, pushNotif, onBack }) {
  const [searchInput, setSearchInput]   = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [requests, setRequests]         = useState([]);
  const [friends, setFriends]           = useState([]);
  const [sentCodes, setSentCodes]       = useState({});
  const [viewingProfile, setViewingProfile] = useState(null); // ✅ NEW: perfil de aliado abierto
  const [duelSetupOpen, setDuelSetupOpen]   = useState(false); // ✅ NEW: pantalla de armar duelo
  const [pendingDuel, setPendingDuel]       = useState(null);
  const [challengeTarget, setChallengeTarget] = useState(null); // rival preseleccionado al retar
  const [leaderboard, setLeaderboard]   = useState([]); 
  const [usersMap, setUsersMap]         = useState({}); 
  const [loadingRank, setLoadingRank]   = useState(true);

  useEffect(() => {
    if (!fbOK() || !user?.code) return;

    // 1. Escuchar Solicitudes y Amigos
    const reqUnsub = FB().onValue(FB().ref(FB().db, `friendRequests/${user.code}`), snap => {
      if (!snap.exists()) { setRequests([]); return; }
      const arr = Object.entries(snap.val()).filter(([, v]) => v.status === 'pending').map(([fromCode, v]) => ({ ...v, fromCode })).sort((a, b) => (b.ts || 0) - (a.ts || 0));
      setRequests(arr);
    });
    const friendsUnsub = FB().onValue(FB().ref(FB().db, `friendships/${user.code}`), snap => {
      if (!snap.exists()) { setFriends([]); return; }
      setFriends(Object.values(snap.val()).sort((a, b) => (b.ts || 0) - (a.ts || 0)));
    });

    // 2. Cargar Ranking y crear diccionario
    FB().get(FB().ref(FB().db, 'users')).then(snap => {
      if (snap.exists()) {
        const allUsers = Object.values(snap.val());
        const map = {};
        const ranked = allUsers.map(u => {
          const correctas = (u.appState?.icfesHistory || []).reduce((sum, r) => sum + (r.correct || 0), 0);
          const lvl = computeLevel(u.appState?.xp || u.xp || 0).level;
          map[u.code] = u; 
          return { ...u, correctas, lvl };
        }).sort((a, b) => b.correctas - a.correctas);
        
        setLeaderboard(ranked);
        setUsersMap(map); 
      }
      setLoadingRank(false);
    });

    return () => { reqUnsub(); friendsUnsub(); };
  }, [user?.code]);

  const handleSearch = async () => {
    const code = searchInput.trim().toUpperCase().replace('@', '').replace(/[^A-Z0-9]/g, '');
    if (!code) return;
    
    // 🔥 BLOQUEO 1: No puedes buscarte a ti mismo
    if (code === user?.code) { pushNotif('Ese eres tú, avispado. Ve a "Mi Pergamino".'); return; }
    
    setSearchLoading(true); setSearchResult(null);
    try {
      const snap = await FB().get(FB().ref(FB().db, `users/${code}`));
      if (!snap.exists()) pushNotif('Ese aparecido no existe en Pankey.');
      else setViewingProfile(snap.val()); 
    } catch(e) { pushNotif('Error buscando. Intenta de nuevo.'); }
    finally { setSearchLoading(false); setSearchInput(''); }
  };

  const sendRequest = async (toCode, toName) => {
    if (!fbOK()) return;
    try {
      await FB().update(FB().ref(FB().db, `friendRequests/${toCode}/${user.code}`), { fromCode: user.code, fromName: user.name || 'Usuario', fromPhoto: appState.photoURL || null, ts: Date.now(), status: 'pending' });
      setSentCodes(p => ({ ...p, [toCode]: true }));
      pushNotif?.(`Solicitud enviada a @${toCode} ✉️`);
    } catch(e) {}
  };

  const acceptRequest = async (req) => {
    if (!fbOK()) return;
    try {
      const lvl = computeLevel(appState.xp || 0).level;
      await FB().update(FB().ref(FB().db, `friendRequests/${user.code}/${req.fromCode}`), { status: 'accepted' });
      await FB().update(FB().ref(FB().db, `friendships/${user.code}/${req.fromCode}`), { code: req.fromCode, name: req.fromName, photoURL: req.fromPhoto || null, ts: Date.now() });
      await FB().update(FB().ref(FB().db, `friendships/${req.fromCode}/${user.code}`), { code: user.code, name: user.name, photoURL: appState.photoURL || null, ts: Date.now(), streak: appState.streakDays, level: lvl });
      pushNotif?.(`¡Ahora eres parcero de @${req.fromCode}! 🎉`);
    } catch(e) {}
  };

  const declineRequest = async (fromCode) => {
    if (!fbOK()) return;
    try { await FB().update(FB().ref(FB().db, `friendRequests/${user.code}/${fromCode}`), { status: 'declined' }); } catch(e) {}
  };

  const getRankColor = (index) => {
    if (index === 0) return { bg: '#FBBF24', text: '#78350F', shadow: '0 0 15px rgba(251, 191, 36, 0.6)' }; 
    if (index === 1) return { bg: '#94A3B8', text: '#0F172A', shadow: '0 0 15px rgba(148, 163, 184, 0.5)' }; 
    if (index === 2) return { bg: '#B45309', text: '#FFFbeb', shadow: '0 0 15px rgba(180, 83, 9, 0.6)' }; 
    return { bg: C.bgAlt, text: C.textMuted, shadow: 'none', border: `1px solid ${C.border}` };
  };

  return (
    <div className="fi" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* ── CABECERA Y BUSCADOR ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <PkIc n="left" s={18} c={C.text} />
          </button>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 24, fontWeight: 700, color: C.text }}>El Combo</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>Mídete con los más berracos.</div>
          </div>
        </div>

        {/* Barra de Búsqueda */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 14, padding: '0 14px' }}>
            <span style={{ fontSize: 16, color: C.accent, fontWeight: 800 }}>@</span>
            <input value={searchInput} onChange={e => setSearchInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,''))} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Buscar alias..." 
              style={{ flex: 1, background: 'transparent', border: 'none', color: C.text, fontSize: 14, fontWeight: 600, height: 44, outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <button onClick={handleSearch} disabled={searchLoading || !searchInput.trim()} style={{ width: 44, height: 44, borderRadius: 14, background: (!searchInput.trim() || searchLoading) ? C.bgAlt : C.accent, border: `1px solid ${(!searchInput.trim() || searchLoading) ? C.border : C.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: (!searchInput.trim() || searchLoading) ? 'default' : 'pointer', transition: 'all 0.2s' }}>
            {searchLoading ? <div style={{width:16,height:16,border:`2px solid ${C.text}`,borderTopColor:'transparent',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/> : <PkIc n="right" s={18} c={!searchInput.trim() ? C.textMuted : '#fff'} />}
          </button>
        </div>

        {/* Botón general para lanzar un duelo */}
        <button onClick={() => { setChallengeTarget(null); setDuelSetupOpen(true); }} style={{
          width: '100%', padding: '13px', borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          background: `linear-gradient(135deg, ${C.amberMid}, #C0392B)`, color: '#fff', fontSize: 14, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: `0 6px 20px ${C.amberMid}40`,
        }}>
          <PkIc n="swords" s={17} c="#fff" /> Retar a un Duelo a Muerte
        </button>
      </div>

      {/* ── SOLICITUDES PENDIENTES ── */}
      {requests.length > 0 && (
        <Card C={C} isLight={isLight} style={{ padding: '16px', background: `${C.accent}10`, border: `1px solid ${C.accent}40` }}>
          <div style={{ fontSize: 10, color: C.accent, fontWeight: 800, letterSpacing: 1.5, marginBottom: 12 }}>¡TE ESTÁN INVITANDO AL COMBO! ({requests.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {requests.map(req => {
              const liveUser = usersMap[req.fromCode] || {}; 
              return (
                <div key={req.fromCode} style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.bgAlt, padding: '8px 12px', borderRadius: 12 }}>
                  <Av name={req.fromName || '?'} sz={40} C={C} photoURL={liveUser.appState?.photoURL || req.fromPhoto} frameData={liveUser.appState?.equipped?.frame} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{req.fromName}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>@{req.fromCode}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => acceptRequest(req)} style={{ padding: '6px 12px', borderRadius: 8, background: C.accent, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>✓</button>
                    <button onClick={() => declineRequest(req.fromCode)} style={{ padding: '6px 12px', borderRadius: 8, background: 'transparent', color: C.textMuted, border: `1px solid ${C.border}`, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ── TUS PARCEROS ── */}
      <div>
        <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 800, letterSpacing: 1.5, marginBottom: 10 }}>MIS PARCEROS</div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, paddingRight: 20, scrollbarWidth: 'none' }}>
          {friends.length === 0 ? (
            <div style={{ fontSize: 13, color: C.textMuted, fontStyle: 'italic' }}>Aún no tienes aliados. ¡Envía tu @código!</div>
          ) : (
            friends.map(f => {
              const liveUser = usersMap[f.code] || {}; 
              return (
                <div key={f.code} onClick={() => setViewingProfile(liveUser.code ? liveUser : f)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 64, cursor: 'pointer' }}>
                  <Av name={f.name || '?'} sz={52} C={C} photoURL={liveUser.appState?.photoURL || f.photoURL} frameData={liveUser.appState?.equipped?.frame} style={{ border: `2px solid ${C.bgAlt}`, boxShadow: `0 4px 12px rgba(0,0,0,0.3)` }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.text, width: 64, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {f.name?.split(' ')[0]}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── TABLA DE CLASIFICACIÓN ── */}
      <div style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: C.accent, fontWeight: 800, letterSpacing: 1.5 }}>LOS MÁS BERRACOS</div>
          <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600 }}>Top Acertadas</div>
        </div>

        {loadingRank ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: C.textMuted }}>Buscando a los genios...</div>
        ) : leaderboard.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: C.textMuted }}>El tablero está vacío. ¡Sé el primero!</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {leaderboard.map((u, index) => {
              const rank = getRankColor(index);
              const bannerCss = u.appState?.equipped?.banner?.css || `linear-gradient(135deg, ${C.accent}40, ${C.accent}10)`;
              const institution = u.appState?.institution || u.institution;
              const isMe = u.code === user?.code;

              return (
                <div key={u.code} onClick={() => {
                  // 🔥 BLOQUEO 2: Si te tocas a ti mismo en el ranking, no abre modal de amigo
                  if (isMe) {
                    pushNotif('Ese eres tú. Ve a "Mi Pergamino" para ver tu perfil completo.');
                    return;
                  }
                  setViewingProfile(u);
                }} className="su" style={{
                  position: 'relative', overflow: 'hidden', borderRadius: 16, cursor: 'pointer',
                  border: isMe ? `1px solid ${C.accent}` : `1px solid ${C.border}`,
                  animationDelay: `${index * 0.05}s`,
                  boxShadow: isMe ? `0 0 15px ${C.accent}40` : '0 4px 15px rgba(0,0,0,0.2)',
                  transition: 'transform 0.15s ease', transform: 'scale(1)',
                }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                  
                  <div className={u.appState?.equipped?.banner?.animClass || ''} style={{ position: 'absolute', inset: 0, background: bannerCss, opacity: 0.8, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, rgba(15,13,12,0.95) 0%, rgba(15,13,12,0.85) 50%, rgba(15,13,12,0.4) 100%)`, pointerEvents: 'none' }} />

                  <div style={{ position: 'relative', zIndex: 1, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: rank.bg, color: rank.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, boxShadow: rank.shadow, border: rank.border, flexShrink: 0 }}>
                      {index + 1}
                    </div>

                    <Av name={u.name || '?'} sz={46} C={C} photoURL={u.appState?.photoURL || u.photoURL} frameData={u.appState?.equipped?.frame} />

                    {/* Info Central */}
                    <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: 6 }}>
                        {u.name} {isMe && <span style={{ fontSize: 9, background: C.accent, color: '#000', padding: '2px 6px', borderRadius: 4, fontWeight: 900 }}>TÚ</span>}
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        @{u.code} {u.age ? `· ${u.age} años` : ''} {institution ? `· 🎓 ${institution}` : ''}
                      </div>
                    </div>

                    {/* 🌟 STATS SÚPER MINIMALISTAS 🌟 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: C.accent, letterSpacing: 0.5 }}>
                        NV. {u.lvl}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontSize: 20, fontWeight: 900, color: '#fff', fontFamily: "'Fraunces', serif" }}>{u.correctas}</span>
                        <PkIc n="check" s={14} c={C.accent} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Perfil Popup */}
      {duelSetupOpen && (
        <DuelSetup
          C={C} isLight={isLight} appState={appState} user={user} friends={friends}
          preselectRival={challengeTarget}
          onClose={() => { setDuelSetupOpen(false); setChallengeTarget(null); }}
          pushNotif={pushNotif}
          onCreated={(duelId, rival, wager) => {
            setAppState(s => ({ ...s, ryo: Math.max(0, (s.ryo || 0) - wager) }));
            setDuelSetupOpen(false);
            setChallengeTarget(null);
            pushNotif?.(`Reto enviado a @${rival.code}. ¡Esperando que acepte!`);
          }}
        />
      )}

      {viewingProfile && (
        <FriendProfileModal
          C={C} isLight={isLight}
          person={viewingProfile}
          user={user}
          appState={appState} setAppState={setAppState}
          isFriend={friends.some(f => f.code === viewingProfile.code)}
          onChallenge={(p) => { setViewingProfile(null); setChallengeTarget(p); setDuelSetupOpen(true); }}
          sent={!!sentCodes[viewingProfile.code]}
          onSendRequest={() => sendRequest(viewingProfile.code, viewingProfile.name)}
          onUnirRacha={() => {
            if (fbOK() && user?.code && viewingProfile.code) {
              FB().update(FB().ref(FB().db, `sharedStreaks/${[user.code, viewingProfile.code].sort().join('_')}`), {
                user1: user.code, user2: viewingProfile.code,
                startDate: todayStr(), active: true, ts: Date.now(),
              });
            }
            pushNotif?.(`Racha compartida iniciada con @${viewingProfile.code} 🔥`);
          }}
          onClose={() => setViewingProfile(null)}
        />
      )}
    </div>
  );
}
// ─────────────────────────────────────────────
//  1. COLECCIÓN DUOLINGO (Caras Detalladas y Accesorios)
// ─────────────────────────────────────────────

// ── PEINADOS PRO (Con capas y volumen, cero planos) ──

const PeloCorteFade = () => (
  <g>
    {/* Base rapada (Fade oscuro) */}
    <path d="M 52 80 C 50 40, 150 40, 148 80 C 145 50, 55 50, 52 80 Z" fill="#111" />
    {/* Volumen superior texturizado */}
    <path d="M 55 55 C 50 20, 80 15, 100 20 C 120 15, 150 20, 145 55 Z" fill="#292524" />
    {/* Brillo/Mechones para dar efecto 3D */}
    <path d="M 70 30 Q 85 15, 100 25 Q 115 15, 130 30 Q 115 25, 100 35 Q 85 25, 70 30 Z" fill="#44403C" />
  </g>
);

const PeloAfroVolumen = () => (
  <g>
    {/* Sombra base (Fondo para dar profundidad) */}
    <circle cx="100" cy="35" r="32" fill="#1C1917" />
    <circle cx="65" cy="50" r="28" fill="#1C1917" />
    <circle cx="135" cy="50" r="28" fill="#1C1917" />
    {/* Capa frontal iluminada (Evita que se vea como un bloque) */}
    <circle cx="100" cy="30" r="26" fill="#292524" />
    <circle cx="75" cy="45" r="22" fill="#292524" />
    <circle cx="125" cy="45" r="22" fill="#292524" />
    <circle cx="55" cy="70" r="18" fill="#292524" />
    <circle cx="145" cy="70" r="18" fill="#292524" />
  </g>
);

const PeloLargoCapas = () => (
  <g>
    {/* Capa trasera que cae por los hombros */}
    <path d="M 52 85 C 40 140, 60 180, 80 180 C 70 140, 75 100, 100 95 C 125 100, 130 140, 120 180 C 140 180, 160 140, 148 85 Z" fill="#0F0E0E" />
    {/* Capa frontal/flequillo */}
    <path d="M 52 85 C 40 30, 160 30, 148 85 C 140 60, 100 45, 65 85 Z" fill="#1C1917" />
    {/* Mechón de luz */}
    <path d="M 65 50 Q 80 35 100 45 Q 85 45 65 50 Z" fill="#292524" />
  </g>
);
// ── GAFAS (Geometría limpia y premium) ──
const GafasPasta = () => (
  <g>
    <rect x="62" y="68" width="32" height="22" rx="6" fill="none" stroke="#1A1A1A" strokeWidth="6" />
    <rect x="106" y="68" width="32" height="22" rx="6" fill="none" stroke="#1A1A1A" strokeWidth="6" />
    <line x1="94" y1="78" x2="106" y2="78" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
  </g>
);

const GafasSolCuadradas = () => (
  <g>
    <rect x="62" y="68" width="32" height="22" rx="6" fill="#0F172A" stroke="#1A1A1A" strokeWidth="6" />
    <rect x="106" y="68" width="32" height="22" rx="6" fill="#0F172A" stroke="#1A1A1A" strokeWidth="6" />
    <line x1="94" y1="78" x2="106" y2="78" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
    {/* Brillos sutiles */}
    <line x1="68" y1="72" x2="76" y2="80" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
    <line x1="112" y1="72" x2="120" y2="80" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
  </g>
);

// ── GORROS (Dinámicos para cambiarles el color) ──
const GorroBeanie = ({ cMain, cFold }) => (
  <g>
    <path d="M 52 70 C 52 10, 148 10, 148 70 Z" fill={cMain} />
    <rect x="48" y="58" width="104" height="22" rx="6" fill={cFold} />
  </g>
);

const GorraUrbana = ({ cMain, cVisor }) => (
  <g>
    <path d="M 54 75 C 54 25, 146 25, 146 75 Z" fill={cMain} />
    <path d="M 140 75 Q 170 75 165 60" stroke={cVisor} strokeWidth="12" strokeLinecap="round" fill="none" />
    <circle cx="100" cy="35" r="4" fill="#FFFFFF" opacity="0.3" />
  </g>
);


// ─────────────────────────────────────────────
//  2. EL AVATAR DE BUSTO (Con soporte para Null en Cara)
// ─────────────────────────────────────────────
function AvatarBusto({ size = 200, piel, ropa, gafas, gorro, animar = true }) {
  return (
    <div style={{ width: size, height: size, margin: '0 auto' }}>
      {animar && (
        <style>{`@keyframes flotarBusto { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }`}</style>
      )}
      <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: 'visible', animation: animar ? 'flotarBusto 4s ease-in-out infinite' : 'none' }}>
        <defs>
          <filter id="shadowBusto" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        <g filter="url(#shadowBusto)">
          {/* Torso Base */}
          <path d="M 40 220 C 40 120, 160 120, 160 220 Z" fill={piel} />
          {/* Ropa (Camiseta que cubre el busto) */}
          {ropa && <path d="M 40 220 L 40 160 Q 100 190 160 160 L 160 220 Z" fill={ropa} />}
        </g>

        <g filter="url(#shadowBusto)">
          <circle cx="100" cy="85" r="46" fill={piel} />
          {gafas && <g>{gafas}</g>}
          {gorro && <g>{gorro}</g>}
        </g>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
//  3. EL TALLER COMPLETO (Copiar y pegar todo este bloque)
// ─────────────────────────────────────────────
function TallerAvatar({ C, appState, setAppState, onBack }) {
  const [tab, setTab] = React.useState('ropa'); 
  
  const [equipado, setEquipado] = React.useState({
    piel: { id: 'piel_blanca', value: '#F8FAFC' },
    ropa: { id: 'ropa_negra', value: '#1A1A1A' },
    gafas: null,
    gorro: null,
    fondo: { id: 'bg_d_morado', value: '#5B21B6', valueAlt: '#4C1D95' } 
  });

  const inventario = {
    piel: [
      { id: 'piel_blanca', value: '#F8FAFC' },
      { id: 'piel_negra', value: '#1E293B' }
    ],
    ropa: [
      { id: 'ropa_negra', value: '#1A1A1A' },
      { id: 'ropa_blanca', value: '#FFFFFF' },
      { id: 'ropa_amarilla', value: '#FACC15' },
      { id: 'ropa_roja', value: '#DC2626' },
      { id: 'ropa_azul', value: '#2563EB' }
    ],
    gafas: [
      { id: 'gafas_p', nombre: 'Clásicas', comp: <GafasPasta /> },
      { id: 'gafas_s', nombre: 'Oscuras', comp: <GafasSolCuadradas /> }
    ],
    gorro: [
      { id: 'gorro_b_nar', nombre: 'Beanie Naranja', comp: <GorroBeanie cMain="#F59E0B" cFold="#D97706" /> },
      { id: 'gorro_b_neg', nombre: 'Beanie Negro', comp: <GorroBeanie cMain="#334155" cFold="#1E293B" /> },
      { id: 'gorra_u_roj', nombre: 'Gorra Roja', comp: <GorraUrbana cMain="#B91C1C" cVisor="#991B1B" /> },
      { id: 'gorra_u_azu', nombre: 'Gorra Azul', comp: <GorraUrbana cMain="#1D4ED8" cVisor="#1E3A8A" /> }
    ]
  };

  const fondosOscuros = [
    { id: 'bg_d_negro', value: '#18181B', valueAlt: '#09090B' },
    { id: 'bg_d_morado', value: '#5B21B6', valueAlt: '#4C1D95' },
    { id: 'bg_d_rojo', value: '#991B1B', valueAlt: '#7F1D1D' },
    { id: 'bg_d_azul', value: '#1E40AF', valueAlt: '#1E3A8A' },
    { id: 'bg_d_verde', value: '#166534', valueAlt: '#14532D' }
  ];

  const fondosClaros = [
    { id: 'bg_l_gris', value: '#F1F5F9', valueAlt: '#E2E8F0' },
    { id: 'bg_l_rosado', value: '#FBCFE8', valueAlt: '#F9A8D4' },
    { id: 'bg_l_naranja', value: '#FFEDD5', valueAlt: '#FDBA74' },
    { id: 'bg_l_azul', value: '#BAE6FD', valueAlt: '#7DD3FC' },
    { id: 'bg_l_verde', value: '#BBF7D0', valueAlt: '#86EFAC' }
  ];

  const tabs = [
    { id: 'piel', label: 'Cuerpo' },
    { id: 'ropa', label: 'Ropa' },
    { id: 'gafas', label: 'Gafas' },
    { id: 'gorro', label: 'Gorros' },
    { id: 'fondo', label: 'Fondo' }
  ];

  const toggleItem = (categoria, item) => {
    if (categoria === 'fondo' || categoria === 'piel' || categoria === 'ropa') {
      setEquipado(prev => {
        if (categoria === 'piel') {
          const nuevosFondos = item.id === 'piel_blanca' ? fondosOscuros : fondosClaros;
          // Si cambia la piel, autoselecciona el primer fondo correspondiente
          return { ...prev, piel: item, fondo: nuevosFondos[0] };
        }
        return { ...prev, [categoria]: item };
      });
      return;
    }
    setEquipado(prev => ({ ...prev, [categoria]: prev[categoria]?.id === item.id ? null : item }));
  };

  // Función interna para pintar las cajas o círculos
  const renderizarCuadricula = () => {
    const isColorTab = tab === 'fondo' || tab === 'piel' || tab === 'ropa';
    const items = tab === 'fondo' ? (equipado.piel.id === 'piel_blanca' ? fondosOscuros : fondosClaros) : inventario[tab];

    if (!items) return null; // Previene el error de .map si items no existe

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'grid', gridTemplateColumns: isColorTab ? 'repeat(5, 1fr)' : 'repeat(3, 1fr)', gap: 16, alignContent: 'start', justifyItems: 'center' }}>
        {items.map((item) => {
          const isEquipped = equipado[tab]?.id === item.id;
          
          if (isColorTab) {
            return (
              <button key={item.id} onClick={() => toggleItem(tab, item)} style={{ width: 44, height: 44, borderRadius: '50%', background: item.value, border: isEquipped ? `4px solid ${C.accent}` : `2px solid ${C.borderStrong}`, cursor: 'pointer', transition: 'all 0.2s', boxShadow: isEquipped ? `0 4px 10px ${C.accent}40` : 'none' }} />
            );
          }

          return (
            <button key={item.id} onClick={() => toggleItem(tab, item)} style={{ width: '100%', aspectRatio: '1', borderRadius: 16, cursor: 'pointer', position: 'relative', border: isEquipped ? `2px solid ${C.accent}` : `1px solid ${C.borderStrong}`, background: isEquipped ? `${C.accent}15` : C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden', padding: 0 }}>
              <div style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ marginBottom: -8 }}>
                  <AvatarBusto size={90} animar={false} piel={equipado.piel.value} ropa={equipado.ropa.value} gafas={tab === 'gafas' ? item.comp : null} gorro={tab === 'gorro' ? item.comp : null} />
                </div>
              </div>
              <div style={{ width: '100%', height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bgAlt, fontSize: 10, color: C.text, fontWeight: 700, borderTop: `1px solid ${C.border}` }}>
                {item.nombre}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 9999, background: C.bg, display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', zIndex: 10 }}>
        <button onClick={onBack} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span style={{color: C.text, fontWeight: 'bold'}}>←</span>
        </button>
        <div style={{ textAlign: 'center' }}>
          <div className="serif" style={{ fontSize: 20, fontWeight: 800, color: C.text }}>Personalizar</div>
        </div>
        <button onClick={onBack} style={{ background: C.accent, color: '#fff', border: 'none', borderRadius: 12, padding: '8px 16px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
          Guardar
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ 
          width: 240, height: 240, borderRadius: '50%', 
          background: equipado.fondo.value, border: `4px solid ${equipado.fondo.valueAlt}`, 
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        }}>
          <div style={{ marginBottom: -10 }}>
            <AvatarBusto 
              size={220} 
              piel={equipado.piel.value}
              ropa={equipado.ropa.value}
              gafas={equipado.gafas?.comp}
              gorro={equipado.gorro?.comp}
            />
          </div>
        </div>
      </div>

      <div style={{ height: '48%', background: C.bgAlt, borderTopLeftRadius: 32, borderTopRightRadius: 32, borderTop: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, padding: '16px 12px 0', overflowX: 'auto', gap: 10 }}>
          {tabs.map(t => {
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '10px 14px', background: 'none', border: 'none', borderBottom: active ? `3px solid ${C.accent}` : '3px solid transparent', color: active ? C.accent : C.textMuted, fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* 🌟 AQUÍ SE LLAMA LA NUEVA FUNCIÓN (Reemplazó el .map() viejo y roto) 🌟 */}
        {renderizarCuadricula()}

      </div>
    </div>
  );
}
// ─────────────────────────────────────────────
//  SETTINGS TAB — ✅ XP real, achievements pagan, streak freeze
// ─────────────────────────────────────────────
function SettingsTab({ C, isLight, themeKey, setThemeKey, ambientOn, setAmbientOn, appState, setAppState, user, onLogout, onSavePhoto, partnerPhotoURL, pushNotif, onCoinBurst, onAchievement, startView = 'settings', onGoSettings }) {
  const [view, setView]           = useState(startView);
  const [saved, setSaved]         = useState(false);
  const [dailyGoal, setDailyGoal] = useState(appState.dailyGoal || 20);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [institution, setInstitution] = useState(appState.institution || '');
  const [interests, setInterests]     = useState(appState.interests || '');
  const [selectedShopItem, setSelectedShopItem] = useState(null);
  const fileInputRef = useRef(null);

  // ✅ FIXED: XP desde appState.xp (no calculado de racha+minutos)
  const lvl     = computeLevel(appState.xp || 0);
  const myTitle = appState.equipped?.title?.name || 'Iniciado';
  const myFrame = appState.equipped?.frame;
  const myBanner = appState.equipped?.banner?.css || `linear-gradient(135deg, ${C.accent}40, ${C.accent}10)`;

  const buyItem = (item) => {
    if ((appState.inventory || []).includes(item.id)) {
      if (item.type !== 'item') equipItem(item);
      else {
        // Consumable item usage
        if (item.id === 'i_freeze') useStreakFreeze();
      }
      return;
    }
    
    if ((appState.ryo || 0) < item.price) {
      FX.play('error'); FX.vibrate('error'); // ❌ Sonido de error si no tienes plata
      return;
    }

    FX.play('coin'); FX.vibrate('heavy'); // 🪙 Ca-ching de oro al comprar con éxito

    setAppState(s => ({
      ...s,
      ryo: (s.ryo || 0) - item.price,
      inventory: [...(s.inventory || []), item.id],
      ...(item.type !== 'item' ? { equipped: { ...(s.equipped || {}), [item.type]: item } } : { streakFreezes: (s.streakFreezes || 0) + 1 }),
    }));

    // Logro por comprar el primer Freeze
    if (item.id === 'i_freeze') {
      setAppState(s => {
        const newAch = (s.achievements || []).map(a => {
          if (a.unlocked) return a;
          if (a.id === 42) return { ...a, unlocked: true, date: 'hoy' };
          return a;
        });
        const prevIds = (s.achievements || []).filter(a => a.unlocked).map(a => a.id);
        const newlyUnlocked = newAch.filter(a => a.unlocked && !prevIds.includes(a.id));
        const achRyo = newlyUnlocked.reduce((sum, a) => sum + (a.ryo || 0), 0);
        const achXp  = newlyUnlocked.reduce((sum, a) => sum + (a.xp  || 0), 0);
        newlyUnlocked.forEach(a => onAchievement?.(a));
        return { ...s, achievements: newAch, ryo: (s.ryo || 0) + achRyo, xp: (s.xp || 0) + achXp };
      });
    }
    pushNotif?.(`¡${item.name} ${item.type === 'item' ? 'comprado' : 'comprado y equipado'}!`);
    onCoinBurst?.(-item.price);
  };

  const equipItem = (item) => {
    FX.play('success'); FX.vibrate('medium'); // ✨ Sonido brillante al ponerte un marco o título
    setAppState(s => ({ ...s, equipped: { ...(s.equipped || {}), [item.type]: item } }));
    pushNotif?.(`${item.name} equipado.`);
  };

  const useStreakFreeze = () => {
    if ((appState.streakFreezes || 0) <= 0) return;
    setAppState(s => ({
      ...s,
      streakFreezes: Math.max(0, (s.streakFreezes || 0) - 1),
      lastConfirmedDate: todayStr(), // Prevent streak from resetting today
    }));
    pushNotif?.('¡Congelador de Racha activado! Tu racha está protegida hoy. 🧊');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 300, ratio = Math.min(MAX/img.width, MAX/img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width  = Math.round(img.width  * ratio);
        canvas.height = Math.round(img.height * ratio);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        onSavePhoto?.(canvas.toDataURL('image/jpeg', 0.82));
        setPhotoUploading(false);
      };
      img.onerror = () => setPhotoUploading(false);
      img.src = ev.target.result;
    };
    reader.onerror = () => setPhotoUploading(false);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const unlockedAchievements = (appState.achievements || []).filter(a => a.unlocked);

  const NavHeader = ({ title, subtitle, onBack }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
      <button onClick={onBack} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <PkIc n="left" s={18} c={C.text} />
      </button>
      <div>
        <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: C.textMuted }}>{subtitle}</div>}
      </div>
    </div>
  );

  // ── VISTA: ORÁCULO ──────────────────────────────────────────
  if (view === 'oracle') return <OracleView C={C} isLight={isLight} appState={appState} user={user} pushNotif={pushNotif} onBack={() => setView('settings')} />;

  // ── VISTA: TALLER DE AVATAR (NUEVO) ─────────────────────────
  if (view === 'taller') return <TallerAvatar C={C} appState={appState} setAppState={setAppState} onBack={() => setView('profile')} />;

  // ── VISTA: AMIGOS ───────────────────────────────────────────
  if (view === 'friends') return <FriendsView C={C} isLight={isLight} appState={appState} setAppState={setAppState} user={user} pushNotif={pushNotif} onBack={() => setView('settings')} />;

  // ── VISTA: PERFIL ───────────────────────────────────────────
  if (view === 'profile') return (
    <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {startView === 'profile' ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => onGoSettings?.('inicio')} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <PkIc n="left" s={18} c={C.text} />
            </button>
            <div>
              <div className="serif" style={{ fontSize: 24, fontWeight: 800, color: C.text }}>Tu Pergamino</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>Tu identidad</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setView('shop')} style={{
              display: 'flex', alignItems: 'center', gap: 6, background: `linear-gradient(135deg, ${C.amberMid}, #C0392B)`,
              border: 'none', borderRadius: 12, padding: '10px 14px', cursor: 'pointer', fontFamily: 'inherit',
              color: '#fff', fontSize: 12, fontWeight: 800, boxShadow: `0 4px 14px ${C.amberMid}40`,
            }}>
              <PkIc n="mochila" s={16} c="#fff" /> Tiendita
            </button>
            <button onClick={() => setView('settings')} style={{
              width: 40, height: 40, borderRadius: 12, background: C.bgAlt, border: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
            }}>
              <PkIc n="settings" s={18} c={C.textMuted} />
            </button>
          </div>
        </div>
      ) : (
        <NavHeader title="Tu Pergamino" subtitle="Tu tarjeta de lector" onBack={() => setView('settings')} />
      )}

      <Card C={C} isLight={isLight} style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ height: 90, background: myBanner }} />
        <div style={{ padding: '0 20px 20px', marginTop: -32 }}>
          <div style={{ marginBottom: 12, display: 'inline-block' }}>
            <Av name={user?.name || '?'} sz={64} C={C} photoURL={appState.photoURL} frameData={myFrame} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.text, fontFamily: "'Fraunces',serif" }}>{user?.name || 'Usuario'}</div>
          <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>{myTitle}</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>@{user?.code}</div>
          {/* BOTÓN PARA ABRIR EL TALLER */}
          <button onClick={() => setView('taller')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: `linear-gradient(135deg, ${C.accent}, ${C.amberMid})`,
            border: 'none', borderRadius: 12, padding: '10px 18px',
            color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer',
            boxShadow: `0 6px 20px ${C.accent}40`, marginBottom: 16, fontFamily: 'inherit'
          }}>
            <PkIc n="eye" s={16} c="#fff" /> Forjar Avatar
          </button>

          {/* ✅ FIXED: XP bar usando appState.xp */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 6 }}>
              <span>Nivel {lvl.level}</span>
              <span>{lvl.current.toLocaleString()} / {lvl.needed.toLocaleString()} XP</span>
            </div>
            <div style={{ height: 7, borderRadius: 99, background: C.bgAlt, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${lvl.pct}%`, borderRadius: 99, background: `linear-gradient(90deg, ${C.accent}88, ${C.accent})`, transition: 'width 1s cubic-bezier(0.22,1,0.36,1)' }} />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
              {appState.streakDays > 0 && <span style={{ fontSize: 11, color: '#FBBF24', fontWeight: 700 }}>🔥 {appState.streakDays} días</span>}
              <span style={{ fontSize: 11, color: C.textMuted }}>{(appState.xp || 0).toLocaleString()} XP totales</span>
              <span style={{ fontSize: 11, color: '#FBBF24', fontWeight: 700 }}>{appState.ryo || 0} <PkIc n="empanada" s={13} c={C.amberMid}/></span>
              {appState.streakFreezes > 0 && <span style={{ fontSize: 11, color: '#38BDF8', fontWeight: 700 }}>🧊 {appState.streakFreezes} Freeze</span>}
            </div>
          </div>

          {(appState.institution || appState.interests) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {appState.institution && <div style={{ fontSize: 12, color: C.textMuted }}>🎓 {appState.institution}</div>}
              {appState.interests   && <div style={{ fontSize: 12, color: C.textMuted }}>💡 {appState.interests}</div>}
            </div>
          )}
        </div>
      </Card>

      <Card C={C} isLight={isLight} style={{ padding: '20px 22px' }}>
        <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 16, fontWeight: 700, letterSpacing: 1.5 }}>DATOS DEL ESTUDIANTE</div>
        {[
          { label: 'Institución / Colegio', val: institution, set: setInstitution, ph: 'Ej. Colegio San Juan Bosco...' },
          { label: 'Intereses',             val: interests,   set: setInterests,   ph: 'Ej. Manga, Filosofía, Física...' },
        ].map(({ label, val, set, ph }) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 5, fontWeight: 600 }}>{label}</div>
            <input value={val} onChange={e => set(e.target.value)} placeholder={ph}
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${C.border}`, color: C.text, fontSize: 15, padding: '8px 0', fontFamily: 'inherit', outline: 'none' }} />
          </div>
        ))}
        <PrimaryBtn C={C} onClick={() => { setAppState(s => ({ ...s, institution, interests, dailyGoal })); setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
          {saved ? 'Actualizado ✓' : 'Guardar Perfil'}
        </PrimaryBtn>
      </Card>

      {/* ✅ FIXED: Achievements show both Ryō and XP */}
      {unlockedAchievements.length > 0 && (
        <Card C={C} isLight={isLight} style={{ padding: '20px 22px' }}>
          <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 16, fontWeight: 700, letterSpacing: 1.5 }}>
            HONORES · {unlockedAchievements.length}/{(appState.achievements || []).length}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {unlockedAchievements.map(a => (
              <div key={a.id} style={{ background: `${C.accent}12`, border: `1px solid ${C.accent}35`, borderRadius: 14, padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: C.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, boxShadow: `0 4px 12px ${C.accent}40` }}>
                  <PkIc n={a.icon} s={18} c="#fff" />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 2 }}>{a.name}</div>
                <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 4 }}>{a.date}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {a.ryo && <span style={{ fontSize: 10, color: '#FBBF24', fontWeight: 700 }}>+{a.ryo} <PkIc n="empanada" s={13} c={C.amberMid}/></span>}
                  {a.xp  && <span style={{ fontSize: 10, color: C.accent, fontWeight: 700 }}>+{a.xp} XP</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );

  // ── VISTA: TIENDA ───────────────────────────────────────────
  if (view === 'shop') {
    const categories = [
      { type: 'title',  label: 'Apodos de Leyenda', emoji: '📜', desc: 'Tu rango y prestigio en la app.' },
      { type: 'frame',  label: 'Marcos de Avatar',  emoji: '🖼️', desc: 'Adorna tu retrato con texturas animadas.' },
      { type: 'banner', label: 'Paisajes',          emoji: '🎑', desc: 'Fondos épicos para tu tarjeta de perfil.' },
      { type: 'item',   label: 'Objetos Especiales',emoji: '🧊', desc: 'Herramientas únicas para tu camino.' },
    ];
    return (
      <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {selectedShopItem && (
          <ShopItemModal C={C} isLight={isLight} item={selectedShopItem} appState={appState} user={user} onBuy={buyItem} onEquip={equipItem} onClose={() => setSelectedShopItem(null)} />
        )}
        <NavHeader title="La Tiendita" subtitle="Invierte tus Empanadas en estética premium" onBack={() => setView(startView === 'profile' ? 'profile' : 'settings')} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `linear-gradient(135deg, ${C.amberMid}15, transparent)`, border: `1px solid ${C.amberMid}35`, borderRadius: 20, padding: '20px 24px' }}>
          <div>
            <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 800, letterSpacing: 2, marginBottom: 6 }}>TUS FONDOS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.amberMid, fontFamily: "'Fraunces', serif" }}>{appState.ryo || 0}</div>
              <PkIc n="empanada" s={28} c={C.amberMid} /></div> 
            </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, marginBottom: 4 }}>NIVEL {lvl.level}</div>
            <div style={{ fontSize: 13, color: C.accent, fontWeight: 700 }}>{(appState.xp || 0).toLocaleString()} XP</div>
            {(appState.streakFreezes || 0) > 0 && (
              <div style={{ fontSize: 11, color: '#38BDF8', fontWeight: 700, marginTop: 4 }}>🧊 {appState.streakFreezes} freeze</div>
            )}
          </div>
        </div>

        {categories.map(cat => {
          const catItems = SHOP_ITEMS.filter(i => i.type === cat.type);
          return (
            <div key={cat.type} style={{ marginTop: 8 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 20 }}>{cat.emoji}</span>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.text, fontFamily: "'Fraunces', serif" }}>{cat.label}</div>
                </div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{cat.desc}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {catItems.map((item, idx) => {
                  const isOwned    = (appState.inventory || []).includes(item.id);
                  const isEquipped = appState.equipped?.[item.type]?.id === item.id;
                  const rarity     = RARITY_META[item.rarity] || RARITY_META['común'];
                  const isConsumable = item.type === 'item';
                  return (
                    <button key={item.id} onClick={() => setSelectedShopItem(item)} className="fu" style={{ animationDelay: `${idx * 0.05}s`, background: isEquipped ? `linear-gradient(145deg, ${rarity.color}15, transparent)` : C.bgAlt, border: `1px solid ${isEquipped ? rarity.color : isOwned && !isConsumable ? rarity.color + '40' : C.border}`, borderRadius: 16, padding: '16px', display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.2s ease', boxShadow: isEquipped ? `0 8px 24px ${rarity.color}25, inset 0 2px 10px ${rarity.color}15` : '0 4px 12px rgba(0,0,0,0.05)' }}>
                      {item.type === 'frame' && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                          <Av name={user?.name || '?'} sz={48} C={C} photoURL={appState.photoURL} frameData={item} />
                        </div>
                      )}
                      {item.type === 'banner' && (
                        <div className={item.animClass || ''} style={{ height: 64, borderRadius: 10, background: item.css, marginBottom: 6, boxShadow: `inset 0 0 0 1px ${rarity.color}30` }} />
                      )}
                      {item.type === 'item' && (
                        <div style={{ fontSize: 28, textAlign: 'center', marginBottom: 4 }}>🧊</div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: rarity.color, boxShadow: rarity.glow }} />
                        {isEquipped && <PkIc n="check" s={14} c={rarity.color} />}
                      </div>
                      <div style={{ marginTop: 4 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, lineHeight: 1.2, marginBottom: 4 }} className={item.type === 'title' && (item.rarity === 'legendario' || item.rarity === 'mítico') ? (item.rarity === 'legendario' ? 'title-legendary' : 'title-mythic') : ''}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1, color: rarity.color }}>{rarity.label}</div>
                      </div>
                      <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                        {item.price === 0 ? (
                          <div style={{ fontSize: 12, color: '#34D399', fontWeight: 800 }}>GRATIS</div>
                        ) : isOwned && !isConsumable ? (
                          <div style={{ fontSize: 12, color: rarity.color, fontWeight: 700 }}>✓ En inventario</div>
                        ) : (
                          <div style={{ fontSize: 13, fontWeight: 800, color: C.amberMid }}>{item.price} <PkIc n="empanada" s={13} c={C.amberMid}/></div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

 // ── VISTA PRINCIPAL ────────────────────────────────────────────
 const ALL_THEME_OPTIONS = [
    { key: 'rupestre_dark', label: 'Rupestre', icon: 'mountain', desc: 'Piedra oscura y oro Tumbaga' },
    { key: 'sakura_dark', label: 'Macondo',     icon: 'leaf',   desc: 'Mágico y cálido como García Márquez' },
    { key: 'aizome_dark', label: 'Caribe',      icon: 'wave',   desc: 'Azul mar como Cartagena al atardecer' },
    { key: 'washi_light', label: 'Boyacá',      icon: 'mountain', desc: 'Claro y fresco como el páramo' },
    { key: 'slate_dark',  label: 'Amazonas',    icon: 'leaf',   desc: 'Verde selva, misterioso y profundo' },
    { key: 'slate_light', label: 'Valle',       icon: 'leaf',   desc: 'Luminoso como el Valle del Cauca' },
  ];

  return (
    <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Perfil mini header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 0' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}>
          <Av name={user?.name || '?'} sz={54} C={C} photoURL={appState.photoURL} frameData={myFrame} />
          {photoUploading && (
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 16, height: 16, border: `2px solid ${C.accent}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
          )}
        </div>
        <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: "'Fraunces', serif" }}>
            {user?.name || 'Usuario'}
          </div>
          <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 1 }}>{myTitle}</div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>@{user?.code}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginBottom: 3 }}>
            <PkIc n="empanadas" s={13} c={C.amberMid} />
            <span style={{ fontSize: 14, fontWeight: 800, color: C.amberMid }}>{appState.ryo || 0}</span>
          </div>
          <div style={{ fontSize: 10, color: C.textMuted }}>Nv. {lvl.level} · {(appState.xp || 0).toLocaleString()} XP</div>
        </div>
      </div>

      {/* XP bar */}
      <div style={{ background: C.bgAlt, borderRadius: 12, padding: '10px 14px', border: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.textMuted, fontWeight: 700, marginBottom: 6 }}>
          <span>Nivel {lvl.level}</span>
          <span>{lvl.current.toLocaleString()} / {lvl.needed.toLocaleString()} XP</span>
        </div>
        <div style={{ height: 5, borderRadius: 99, background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${lvl.pct}%`, borderRadius: 99, background: `linear-gradient(90deg, ${C.accent}88, ${C.accent})`, boxShadow: `0 0 8px ${C.accent}60`, transition: 'width 1.2s' }} />
        </div>
      </div>

      {/* Kodachi de Hielo: escudos que protegen tu racha automáticamente */}
      {(appState.streakFreezes || 0) > 0 ? (
        <div style={{
          background: '#38BDF810', border: '1px solid #38BDF830', borderRadius: 14,
          padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10, width: '100%',
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: '#38BDF818', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <PkIc n="snowflake" s={19} c="#38BDF8" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#38BDF8' }}>
              {appState.streakFreezes} Kodachi de Hielo
            </div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>
              Se gasta solo si faltas un día. No tienes que hacer nada.
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setView('shop')} style={{
          background: '#EF444410', border: '1px solid #EF444435', borderRadius: 14,
          padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', width: '100%', fontFamily: 'inherit', textAlign: 'left',
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: '#EF444418', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <PkIc n="snowflake" s={19} c="#EF4444" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#EF4444' }}>Tu racha está sin protección</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>Pille pues: un Kodachi de Hielo te salva si un día no puede. ¡Consíguelo!</div>
          </div>
          <PkIc n="right" s={15} c="#EF4444" />
        </button>
      )}

      {/* Temas */}
      <Card C={C} isLight={isLight} style={{ padding: '16px 18px' }}>
        <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 12, fontWeight: 700, letterSpacing: 1.5 }}>TEMA VISUAL</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ALL_THEME_OPTIONS.map(t => (
            <button key={t.key} onClick={() => setThemeKey(t.key)} style={{
              flex: 1, minWidth: 60, padding: '10px 6px', borderRadius: 11,
              background: themeKey === t.key ? C.accent : 'transparent',
              color: themeKey === t.key ? '#fff' : C.textMuted,
              border: `1px solid ${themeKey === t.key ? C.accent : C.border}`,
              fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              boxShadow: themeKey === t.key ? `0 4px 14px ${C.accent}40` : 'none',
              transition: 'all 0.2s',
            }}>
              <PkIc n={t.icon} s={16} c={themeKey === t.key ? '#fff' : C.textMuted} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Colores */}
      <Card C={C} isLight={isLight} style={{ padding: '16px 18px' }}>
        <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 12, fontWeight: 700, letterSpacing: 1.5 }}>COLOR DE ACENTO</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {ACCENT_COLORS.map(({ name, value }) => (
            <button key={value} onClick={() => setAppState(s => ({ ...s, customColor: value }))} title={name}
              style={{ width: 34, height: 34, borderRadius: '50%', background: value, cursor: 'pointer', border: `3px solid ${appState.customColor === value ? C.text : 'transparent'}`, transition: 'all 0.2s' }} />
          ))}
          {appState.customColor && (
            <button onClick={() => setAppState(s => ({ ...s, customColor: null }))} style={{ width: 34, height: 34, borderRadius: '50%', background: C.bgAlt, border: `1px solid ${C.border}`, fontSize: 13, cursor: 'pointer' }}>✕</button>
          )}
        </div>
      </Card>

      {/* Meta diaria */}
      <Card C={C} isLight={isLight} style={{ padding: '16px 18px' }}>
        <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 12, fontWeight: 700, letterSpacing: 1.5 }}>META DIARIA (minutos)</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[10, 20, 30, 45, 60].map(mins => (
            <button key={mins} onClick={() => { setDailyGoal(mins); setAppState(s => ({ ...s, dailyGoal: mins })); }} style={{
              flex: 1, padding: '9px 4px', borderRadius: 10,
              background: dailyGoal === mins ? C.accent : 'transparent',
              color: dailyGoal === mins ? '#fff' : C.textMuted,
              border: `1px solid ${dailyGoal === mins ? C.accent : C.border}`,
              fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}>{mins}</button>
          ))}
        </div>
      </Card>

      {/* Sonido ambiente */}
      <Card C={C} isLight={isLight} style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: `${C.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <PkIc n={ambientOn ? 'wave' : 'leaf'} s={19} c={C.accent} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Sonido ambiente</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>Paisaje sonoro de fondo según tu tema</div>
          </div>
          <button onClick={() => setAmbientOn?.(o => !o)} style={{
            width: 52, height: 30, borderRadius: 99, border: 'none', cursor: 'pointer', flexShrink: 0,
            background: ambientOn ? C.accent : C.border, position: 'relative', transition: 'background 0.25s',
          }}>
            <div style={{
              position: 'absolute', top: 3, left: ambientOn ? 25 : 3, width: 24, height: 24, borderRadius: '50%',
              background: '#fff', transition: 'left 0.25s cubic-bezier(0.22,1,0.36,1)', boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }} />
          </button>
        </div>
      </Card>

      <button onClick={onLogout} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 14, padding: '13px', color: C.textMuted, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
        Cerrar sesión
      </button>
    </div>
  );
}

// End of Pankey App.js — Complete v2.0 with all fixes and new featuress