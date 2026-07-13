/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
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
@keyframes starTwinkle { 0%,100%{opacity:0.15;transform:scale(1);} 50%{opacity:0.75;transform:scale(1.7);} }
@keyframes zzz { 0%{opacity:0;transform:translate(0,0) scale(0.5);} 30%{opacity:1;} 100%{opacity:0;transform:translate(8px,-22px) scale(1.1);} }
@keyframes mordorGlow { 0%,100%{opacity:0.35;} 50%{opacity:0.68;} }
@keyframes logFlyToFire { 0%{transform:translate(0,0) rotate(0deg);opacity:1;} 60%{opacity:1;} 100%{transform:translate(var(--tx),var(--ty)) rotate(-55deg);opacity:0;} }
@keyframes ashSmoke { 0%{opacity:0;transform:translateX(-50%) scaleX(1) translateY(0);} 30%{opacity:0.35;} 100%{opacity:0;transform:translateX(-50%) scaleX(1.8) translateY(-28px);} }
@keyframes cloudDrift { 0%,100%{transform:translateX(0px);} 50%{transform:translateX(10px);} }
@keyframes ctaPulse { 0%,85%,100%{transform:scale(1);}90%{transform:scale(1.015);}95%{transform:scale(1.008);} }
@keyframes logGlow { 0%,100%{opacity:0.6;}50%{opacity:1;} }
@keyframes breathe { 0%,100%{transform:translateY(0px);}50%{transform:translateY(-2px);} }
@keyframes dotPulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.35;transform:scale(0.7);} }
@keyframes threadFlow { to { stroke-dashoffset:-40; } }
@keyframes liquidWave { 0%{transform:translateX(0);}100%{transform:translateX(-50%);} }
@keyframes selloDrop { 0%{transform:translate(-50%,-150px) rotate(-45deg) scale(1.5);opacity:0;} 55%{opacity:1;} 78%{transform:translate(-50%,6px) rotate(8deg) scale(1);} 100%{transform:translate(-50%,0) rotate(0) scale(1);opacity:1;} }
@keyframes plantPop { 0%{transform:scale(1);}45%{transform:scale(1.18);}100%{transform:scale(1);} }
@keyframes syncGlow { 0%,100%{box-shadow:0 0 0 1px rgba(74,158,255,0.28),0 0 16px rgba(74,158,255,0.12);} 50%{box-shadow:0 0 0 1px rgba(74,158,255,0.6),0 0 32px rgba(74,158,255,0.4);} }
@keyframes jardinFloat { 0%{transform:translateY(0) scale(1);opacity:0;} 20%{opacity:0.9;} 100%{transform:translateY(-40px) scale(0.4);opacity:0;} }
@keyframes moonGlowPulse { 0%,100%{opacity:0.88;} 50%{opacity:1;} }
@keyframes emberFloat { 0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0.95;} 100%{transform:translateY(-85px) translateX(16px) rotate(200deg);opacity:0;} }
@keyframes groundFlicker { 0%,100%{opacity:0.52;} 50%{opacity:0.82;} }
@keyframes parcoTap { 0%,100%{transform:scale(1) translateY(0);} 25%{transform:scale(0.9) translateY(5px);} 60%{transform:scale(1.08) translateY(-5px);} }
@keyframes fireDance { 0%,100%{transform:scaleY(1) scaleX(1) rotate(-1deg);} 28%{transform:scaleY(1.09) scaleX(0.95) rotate(1.6deg);} 55%{transform:scaleY(0.93) scaleX(1.05) rotate(-2.2deg);} 80%{transform:scaleY(1.06) scaleX(0.97) rotate(0.8deg);} }
@keyframes fireCore { 0%,100%{transform:scaleY(1) translateY(0);opacity:0.95;} 40%{transform:scaleY(1.14) translateY(-3px);opacity:1;} 70%{transform:scaleY(0.9) translateY(1px);opacity:0.85;} }
@keyframes shimmerSlide { 0%{transform:translateX(-140%) skewX(-18deg);} 55%,100%{transform:translateX(240%) skewX(-18deg);} }
@keyframes chestBeat { 0%,86%,100%{transform:scale(1);} 90%{transform:scale(1.05);} 95%{transform:scale(1.015);} }
@keyframes chestShake { 0%,100%{transform:rotate(0deg);} 15%{transform:rotate(-6deg);} 35%{transform:rotate(6deg);} 55%{transform:rotate(-5deg);} 75%{transform:rotate(4deg);} 90%{transform:rotate(-2deg);} }
@keyframes raysSpin { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }
@keyframes popIn { 0%{transform:scale(0.25);opacity:0;} 65%{transform:scale(1.14);opacity:1;} 100%{transform:scale(1);opacity:1;} }
@keyframes vsSlam { 0%{transform:scale(3.2);opacity:0;} 55%{transform:scale(0.88);opacity:1;} 75%{transform:scale(1.06);} 100%{transform:scale(1);opacity:1;} }
@keyframes urgentPulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.08);} }
@keyframes presenceBlink { 0%,100%{opacity:1;box-shadow:0 0 7px rgba(34,197,94,0.9);} 50%{opacity:0.5;box-shadow:0 0 2px rgba(34,197,94,0.4);} }
@keyframes slideUpIn { 0%{transform:translateY(28px);opacity:0;} 100%{transform:translateY(0);opacity:1;} }
@keyframes flashLive { 0%,100%{opacity:0.35;} 50%{opacity:1;} }
@keyframes goldTint { 0%,100%{opacity:0.5;} 50%{opacity:0.85;} }
@keyframes chestIdle { 0%,78%,100%{transform:rotate(0deg);} 82%{transform:rotate(-3.5deg);} 86%{transform:rotate(3deg);} 90%{transform:rotate(-2deg);} 94%{transform:rotate(1deg);} }
@keyframes comboPop { 0%{transform:scale(0.4) rotate(-8deg);opacity:0;} 55%{transform:scale(1.28) rotate(3deg);opacity:1;} 100%{transform:scale(1) rotate(0deg);opacity:1;} }
@keyframes pantallaFlash { 0%{opacity:0.55;} 100%{opacity:0;} }
@keyframes shakeX { 0%,100%{transform:translateX(0);} 20%{transform:translateX(-7px);} 40%{transform:translateX(6px);} 60%{transform:translateX(-4px);} 80%{transform:translateX(3px);} }
@keyframes qSlideIn { 0%{transform:translateX(48px);opacity:0;} 100%{transform:translateX(0);opacity:1;} }
@keyframes countZoom { 0%{transform:scale(2.8);opacity:0;} 35%{transform:scale(1);opacity:1;} 82%{transform:scale(1);opacity:1;} 100%{transform:scale(0.7);opacity:0;} }
@keyframes tensionPulse { 0%,100%{box-shadow:0 0 0 0 rgba(224,82,82,0);} 50%{box-shadow:0 0 26px 5px rgba(224,82,82,0.35);} }

/* ── EVOLUCIÓN DEL FUEGO DE LA RACHA ── */
@keyframes gradientShift { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
@keyframes smokeWisp { 0%{transform:translate(-50%,0) scaleY(0.6) rotate(-2deg);opacity:0;} 25%{opacity:0.15;} 60%{opacity:0.10;transform:translate(calc(-50% + 5px),-26px) scaleY(1.1) rotate(4deg);} 100%{transform:translate(calc(-50% - 4px),-52px) scaleY(1.5) rotate(-3deg);opacity:0;} }
@keyframes sparkBeat { 0%,100%{transform:scale(0.8);opacity:0.85;} 50%{transform:scale(1.2);opacity:1;} }
@keyframes emberTrail { 0%{transform:translateY(0) translateX(0);opacity:0.95;} 100%{transform:translateY(-95px) translateX(var(--dx,14px));opacity:0;} }
@keyframes fireRingSpin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
@keyframes fireRingSpinRev { from{transform:rotate(0deg);} to{transform:rotate(-360deg);} }
@keyframes heatWave { 0%,100%{transform:scaleX(1) skewX(0deg);} 33%{transform:scaleX(1.03) skewX(1.2deg);} 66%{transform:scaleX(0.97) skewX(-1.2deg);} }
@keyframes fireHeartbeat { 0%,88%,100%{opacity:0;} 92%{opacity:0.55;} 96%{opacity:0.2;} }
@keyframes fireBoostPop { 0%{transform:scale(1);} 35%{transform:scale(1.32);} 60%{transform:scale(0.94);} 80%{transform:scale(1.08);} 100%{transform:scale(1);} }
@keyframes fireNervous { 0%,100%{opacity:1;transform:scale(1);} 25%{opacity:0.55;transform:scale(0.93);} 50%{opacity:0.9;transform:scale(1.01);} 75%{opacity:0.5;transform:scale(0.9);} }
@keyframes brasaBlink { 0%,100%{opacity:0.35;transform:scale(0.85);} 50%{opacity:1;transform:scale(1.15);} }
@keyframes flameSparkFly { 0%{transform:translate(0,0) scale(1);opacity:1;} 100%{transform:translate(var(--fx,30px),var(--fy,-20px)) scale(0.2);opacity:0;} }
@keyframes starBlinkIn { 0%,100%{opacity:0;transform:scale(0.3) rotate(0deg);} 50%{opacity:1;transform:scale(1) rotate(180deg);} }

/* ── COFRES ── */
@keyframes chestFloat { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-4px);} }
@keyframes chestGlowPulse { 0%,100%{filter:drop-shadow(0 6px 14px var(--cglow,rgba(212,175,55,0.35)));} 50%{filter:drop-shadow(0 10px 30px var(--cglow,rgba(212,175,55,0.65)));} }
@keyframes chestOrbit { from{transform:rotate(0deg) translateX(var(--orb,42px)) rotate(0deg);} to{transform:rotate(360deg) translateX(var(--orb,42px)) rotate(-360deg);} }
@keyframes crackExpand { 0%{transform:scaleX(0);opacity:0;} 40%{opacity:1;} 100%{transform:scaleX(1);opacity:1;} }
@keyframes whiteFlash { 0%{opacity:0;} 30%{opacity:0.4;} 100%{opacity:0;} }
@keyframes rewardPop { 0%{transform:scale(0);opacity:0;} 60%{transform:scale(1.1);opacity:1;} 80%{transform:scale(0.96);} 100%{transform:scale(1);opacity:1;} }

/* ── MODOS DE JUEGO ── */
@keyframes screenFlashGreen { 0%{opacity:0.5;} 100%{opacity:0;} }
@keyframes screenFlashRed { 0%{opacity:0.5;} 100%{opacity:0;} }
@keyframes timerGain { 0%{transform:scale(1);} 40%{transform:scale(1.25);} 100%{transform:scale(1);} }
@keyframes timerLoss { 0%,100%{transform:translateX(0);} 20%{transform:translateX(-8px);} 40%{transform:translateX(7px);} 60%{transform:translateX(-5px);} 80%{transform:translateX(3px);} }
@keyframes shardFly { 0%{transform:translate(0,0) rotate(0deg);opacity:1;} 100%{transform:translate(var(--shx,0px),var(--shy,120px)) rotate(var(--shr,45deg));opacity:0;} }
@keyframes empanadaRain { 0%{transform:translateY(-40px) rotate(0deg);opacity:0;} 12%{opacity:1;} 85%{opacity:0.9;} 100%{transform:translateY(105vh) rotate(var(--er,300deg));opacity:0;} }
@keyframes riskBlink { 0%,100%{box-shadow:0 6px 20px rgba(232,184,75,0.4);} 50%{box-shadow:0 0 24px rgba(239,68,68,0.8),0 0 48px rgba(239,68,68,0.4);} }
@keyframes nivelAnuncio { 0%{transform:scale(2.4);opacity:0;} 25%{transform:scale(1);opacity:1;} 75%{transform:scale(1);opacity:1;} 100%{transform:scale(0.85);opacity:0;} }
@keyframes vsApproachL { 0%{transform:translateX(-70px);opacity:0;} 100%{transform:translateX(0);opacity:1;} }
@keyframes vsApproachR { 0%{transform:translateX(70px);opacity:0;} 100%{transform:translateX(0);opacity:1;} }
@keyframes foundFlash { 0%{opacity:0;} 20%{opacity:0.6;} 100%{opacity:0;} }
@keyframes medalDrop { 0%{transform:translateY(-60px) scale(0.4);opacity:0;} 60%{transform:translateY(4px) scale(1.1);opacity:1;} 80%{transform:translateY(-3px) scale(0.97);} 100%{transform:translateY(0) scale(1);opacity:1;} }
@keyframes podiumRise { 0%{transform:scaleY(0);} 100%{transform:scaleY(1);} }

/* ── TIENDA ── */
@keyframes neonCycle { 0%,100%{border-color:#22D3EE;box-shadow:0 0 10px #22D3EE,0 0 22px #22D3EE55;} 33%{border-color:#F0F;box-shadow:0 0 10px #F0F,0 0 22px #F0F5;} 66%{border-color:#FDE047;box-shadow:0 0 10px #FDE047,0 0 22px #FDE04755;} }
@keyframes matrixDrop { 0%{transform:translateY(-8px);opacity:0;} 15%{opacity:1;} 85%{opacity:0.7;} 100%{transform:translateY(var(--md,26px));opacity:0;} }
@keyframes auroraFlow { 0%,100%{background-position:0% 50%;filter:hue-rotate(0deg);} 50%{background-position:100% 50%;filter:hue-rotate(40deg);} }
@keyframes supernovaPulse { 0%,100%{box-shadow:0 0 12px #F472B6,0 0 30px #C084FC66;transform:scale(1);} 50%{box-shadow:0 0 26px #fff,0 0 60px #F472B6AA,0 0 90px #C084FC66;transform:scale(1.04);} }
.card-mythic-shimmer { position:relative; overflow:hidden; }
.card-mythic-shimmer::after { content:''; position:absolute; top:0; bottom:0; left:0; width:60px; background:linear-gradient(90deg,transparent,rgba(232,121,249,0.22),transparent); animation:shimmerSlide 2.8s ease-in-out infinite; pointer-events:none; }

/* ── SUPERVIVENCIA v2: corazones y olas ── */
@keyframes heartBeat { 0%,100%{transform:scale(1);} 12%{transform:scale(1.07);} 24%{transform:scale(1);} }
@keyframes heartBeatFast { 0%,100%{transform:scale(1);} 20%{transform:scale(1.12);} 40%{transform:scale(1);} }
@keyframes heartPop { 0%{transform:scale(1);opacity:1;} 45%{transform:scale(1.5);opacity:1;} 100%{transform:scale(0);opacity:0;} }
@keyframes screenShakeX { 0%,100%{transform:translateX(0);} 12%{transform:translateX(-4px);} 25%{transform:translateX(4px);} 37%{transform:translateX(-4px);} 50%{transform:translateX(4px);} 62%{transform:translateX(-3px);} 75%{transform:translateX(3px);} 87%{transform:translateX(-2px);} }
@keyframes redFlashBg { 0%{opacity:0;} 40%{opacity:0.3;} 100%{opacity:0;} }
@keyframes dangerBorder { 0%,100%{box-shadow:inset 0 0 0 2px rgba(239,68,68,0.15);} 50%{box-shadow:inset 0 0 0 3px rgba(239,68,68,0.75), inset 0 0 40px rgba(239,68,68,0.15);} }
@keyframes waveSweep { 0%{transform:translateX(-100%);} 100%{transform:translateX(100%);} }
@keyframes waveClearTxt { 0%{transform:scale(2.6);opacity:0;} 25%{transform:scale(1);opacity:1;} 78%{transform:scale(1);opacity:1;} 100%{transform:scale(0.9);opacity:0;} }
@keyframes heartFall { 0%{transform:translateY(-120px) scale(0.5);opacity:0;} 55%{transform:translateY(8px) scale(1.15);opacity:1;} 75%{transform:translateY(-5px) scale(0.95);} 100%{transform:translateY(0) scale(1);opacity:1;} }

/* ── CONTRARRELOJ v2: arco y bonus ── */
@keyframes countScale { 0%{transform:scale(1);} 50%{transform:scale(0.9);} 100%{transform:scale(1);} }
@keyframes bonusFloat { 0%{transform:translateY(0) scale(0.7);opacity:0;} 20%{transform:translateY(-14px) scale(1.1);opacity:1;} 100%{transform:translateY(-70px) scale(1);opacity:0;} }
@keyframes arcPanic { 0%,100%{filter:drop-shadow(0 0 6px rgba(239,68,68,0.5));} 50%{filter:drop-shadow(0 0 20px rgba(239,68,68,0.9));} }
@keyframes clockHands { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }

/* ── RULETA v2 ── */
@keyframes indicatorBlink { 0%,100%{opacity:1;} 50%{opacity:0.25;} }
@keyframes holdChargeFill { from{width:0%;} to{width:100%;} }
@keyframes doradoFlash { 0%{opacity:0.7;} 100%{opacity:0;} }

/* ── SALA DE ENTRENAMIENTO ── */
@keyframes modeExpand { 0%{transform:scale(0.4);opacity:0.4;border-radius:24px;} 100%{transform:scale(1);opacity:1;border-radius:0px;} }
@keyframes iconFloatWiggle { 0%,100%{transform:translateY(0) rotate(0deg);} 30%{transform:translateY(-3px) rotate(-4deg);} 65%{transform:translateY(1px) rotate(3deg);} }

/* ── INICIO v7 "El Templo del Saber" — atmósfera ── */
@keyframes twinkle { 0%,100%{opacity:0.3;} 50%{opacity:1;} }
@keyframes nieblaDrift { 0%{transform:translateX(-10px);} 100%{transform:translateX(10px);} }
@keyframes dustFloat { 0%,100%{transform:translate(0,0);} 50%{transform:translate(var(--dx,10px), var(--dy,-16px));} }
@keyframes runaBreath { 0%,100%{opacity:0.3;} 50%{opacity:0.7;} }
@keyframes runaBreathAlt { 0%,100%{opacity:0.7;} 50%{opacity:0.3;} }
@keyframes shimmerButton { 0%{background-position:200% center;} 100%{background-position:-200% center;} }
@keyframes listoPulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.08);opacity:0.75;} }
@keyframes luzRespira { 0%,100%{opacity:0.7;} 50%{opacity:1;} }
@keyframes sombraLlama { 0%,100%{transform:translateX(-50%) scaleX(0.9);} 50%{transform:translateX(-50%) scaleX(1.1);} }
.modos-cartas { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; gap:8px; scrollbar-width:none; padding:6px 2px 8px; }
.modos-cartas::-webkit-scrollbar { display:none; }

/* ── INICIO v6 "El Fogón de la Casa" ── */
@keyframes fichaRingSpin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
@keyframes coronaShine { 0%,88%,100%{filter:drop-shadow(0 0 2px #FFD75E);} 94%{filter:drop-shadow(0 0 11px #FFD75E);} }
@keyframes jugarShine { 0%{transform:translateX(-60%) skewX(-20deg);} 18%,100%{transform:translateX(420%) skewX(-20deg);} }
@keyframes retoUrge { 0%,100%{box-shadow:0 0 0 0 rgba(212,175,55,0);} 50%{box-shadow:0 0 14px 2px rgba(212,175,55,0.5);} }
@keyframes fichaBreathe { 0%,100%{transform:scale(1);} 50%{transform:scale(1.04);} }
@keyframes staggerRise { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
@keyframes palmSway { 0%,100%{transform:rotate(-1.5deg);} 50%{transform:rotate(1.5deg);} }

/* ── INICIO v5 estilo Clash Royale ── */
@keyframes arenaBrasa { 0%{transform:translateY(0) translateX(0) scale(1);opacity:0.9;} 100%{transform:translateY(-46px) translateX(var(--bx,8px)) scale(0.3);opacity:0;} }
@keyframes salaSweep { 0%{transform:translateX(-60%) skewX(-20deg);} 100%{transform:translateX(360%) skewX(-20deg);} }
@keyframes salaIcon { 0%,100%{transform:rotate(-2deg);} 50%{transform:rotate(2deg);} }
@keyframes arrowPulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.12);} }
@keyframes slotReady { 0%,100%{box-shadow:0 0 0 0 rgba(255,215,94,0);transform:translateY(0);} 50%{box-shadow:0 0 16px 2px rgba(255,215,94,0.55);transform:translateY(-3px);} }
@keyframes comboDot { 0%,100%{opacity:1;box-shadow:0 0 6px rgba(34,197,94,0.9);} 50%{opacity:0.4;box-shadow:0 0 1px rgba(34,197,94,0.3);} }
@keyframes sheetUp { 0%{transform:translateY(100%);} 100%{transform:translateY(0);} }
@keyframes checkGlow { 0%,100%{filter:drop-shadow(0 0 2px #3DA873);} 50%{filter:drop-shadow(0 0 10px #3DA873);} }

/* ── RULETA CASINO: palanca y rueda del saber ── */
@keyframes leverPull { 0%{transform:translateY(0);} 30%{transform:translateY(58px);} 58%{transform:translateY(58px);} 100%{transform:translateY(0);} }
@keyframes leverHint { 0%,88%,100%{transform:translateY(0);} 92%{transform:translateY(7px);} 96%{transform:translateY(2px);} }
@keyframes wedgeReveal { 0%{opacity:0.85;} 100%{opacity:0;} }
@keyframes potShake { 0%,100%{transform:translateX(0) scale(1);} 25%{transform:translateX(-3px) scale(1.04);} 50%{transform:translateX(3px) scale(1.04);} 75%{transform:translateX(-2px) scale(1.02);} }
@keyframes escaleraGlow { 0%,100%{box-shadow:0 0 6px rgba(212,175,55,0.4);} 50%{box-shadow:0 0 16px rgba(212,175,55,0.9);} }

/* ── ICFES TAB v3: carrusel de modos y ruleta Doble o Nada ── */
.modos-carousel { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; gap:12px; scrollbar-width:none; padding:4px 2px 8px; }
.modos-carousel::-webkit-scrollbar { display:none; }
.modos-slide { flex:0 0 88%; scroll-snap-align:center; }
@keyframes iconSweep { 0%{transform:translateX(-160%) skewX(-18deg);} 55%,100%{transform:translateX(260%) skewX(-18deg);} }
@keyframes swordsClash { 0%,100%{transform:rotate(0deg) scale(1);} 35%{transform:rotate(-10deg) scale(1.1);} 55%{transform:rotate(9deg) scale(1.1);} 75%{transform:rotate(-3deg) scale(1.02);} }
@keyframes miniArcDrain { 0%{stroke-dashoffset:0;} 85%,100%{stroke-dashoffset:63;} }
@keyframes secondHand { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
@keyframes indBlink3 { 0%,100%{opacity:1;} 16%,50%,83%{opacity:0.15;} 33%,66%{opacity:1;} }
@keyframes decisionIn { 0%{opacity:0;transform:scale(1.04);} 100%{opacity:1;transform:scale(1);} }
@keyframes goldBurst { 0%{transform:translate(0,0) scale(1);opacity:1;} 100%{transform:translate(var(--gx,40px),var(--gy,-40px)) scale(0.2);opacity:0;} }
@keyframes chevronSpin { from{transform:rotate(0deg);} to{transform:rotate(180deg);} }

/* ── BAZAR ── */
@keyframes ofertaPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.55;transform:scale(0.96);} }
@keyframes bazarHeroIn { 0%{opacity:0;transform:scale(1.06);} 100%{opacity:1;transform:scale(1);} }
.bazar-carousel { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
.bazar-carousel::-webkit-scrollbar { display:none; }
.bazar-slide { flex:0 0 100%; scroll-snap-align:center; }
.bazar-tabs { display:flex; overflow-x:auto; scrollbar-width:none; gap:6px; }
.bazar-tabs::-webkit-scrollbar { display:none; }
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
  // Greca zigzag circular (patrón del sombrero vueltiao): 22 dientes entre r36 y r40
  const N = 22;
  const zig = Array.from({ length: N * 2 + 1 }, (_, i) => {
    const a = (i / (N * 2)) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? 40 : 35.5;
    return `${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`;
  });
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
      style={{ filter: glow ? `drop-shadow(0 0 ${size * 0.12}px ${oro}70)` : 'none', display: 'block' }}>
      <defs>
        <radialGradient id="pkMedallon" cx="36%" cy="30%" r="80%">
          <stop offset="0%" stopColor={piedra} stopOpacity="1"/>
          <stop offset="72%" stopColor={piedra} stopOpacity="1"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0.55"/>
        </radialGradient>
        <linearGradient id="pkOro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={oro}/>
          <stop offset="55%" stopColor={oro}/>
          <stop offset="100%" stopColor="#8A6410"/>
        </linearGradient>
      </defs>
      {/* Disco base con profundidad */}
      <circle cx="50" cy="50" r="46" fill="url(#pkMedallon)" stroke="url(#pkOro)" strokeWidth="2.2"/>
      {/* Greca vueltiao */}
      <path d={`M${zig.join(' L')}`} fill="none" stroke={oro} strokeWidth="1.4"
        strokeLinejoin="round" opacity="0.85"/>
      {/* Anillo interior fino */}
      <circle cx="50" cy="50" r="31" fill="none" stroke={oro} strokeWidth="0.7" strokeOpacity="0.45"/>
      {/* Brillo superior (relieve) */}
      <ellipse cx="41" cy="32" rx="22" ry="12" fill="#FFFFFF" opacity="0.07"/>
      {/* Rana Dorada v3 */}
      <g transform="translate(50,53) scale(2.9) translate(-12,-12)">
        <g fill="none" stroke="url(#pkOro)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.1 6.8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0M13.9 6.8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0M7.6 6.8h.01M16.4 6.8h.01M3.8 13.2c0-2.9 3.2-5 8.2-5s8.2 2.1 8.2 5c0 3.4-3.7 6-8.2 6s-8.2-2.6-8.2-6zM8.3 14.2c1.2 1.5 6.2 1.5 7.4 0M10.7 11.4h.01M13.3 11.4h.01"/>
        </g>
      </g>
    </svg>
  );
}
function TexturaFondo({ C, isLight }) {
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
        opacity: isLight ? 0.03 : 0.04, mixBlendMode: isLight ? 'multiply' : 'overlay' }} />
      {/* Viñeta sutil para dar profundidad a los bordes — cálida en claro, oscura en noche */}
      <div style={{ position: 'absolute', inset: 0,
        background: isLight
          ? 'radial-gradient(ellipse at 50% 35%, transparent 60%, rgba(120,95,50,0.09) 100%)'
          : 'radial-gradient(ellipse at 50% 35%, transparent 55%, rgba(0,0,0,0.35) 100%)' }} />
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
    home: 'M4 11.2 12 4.4l8 6.8M6.2 9.6v9a1.4 1.4 0 0 0 1.4 1.4h8.8a1.4 1.4 0 0 0 1.4-1.4v-9M10.1 20v-5.6a1.1 1.1 0 0 1 1.1-1.1h1.6a1.1 1.1 0 0 1 1.1 1.1V20',
    msg: 'M6 3.5C5.17 3.5 4.5 4.17 4.5 5V6h15V5c0-.83-.67-1.5-1.5-1.5H6zM4.5 7.5v9.5c0 .83.67 1.5 1.5 1.5h6.5M15.5 13.5l4.2 4.2M17.5 11.5a2 2 0 1 1 2.83 2.83L13 21.5H11v-2L17.5 11.5z',
    timer: 'M6.5 2h11M6.5 22h11M7 2v1.5l4.2 5 .8.8.8-.8 4.2-5V2M7 22v-1.5l4.2-5 .8-.8.8.8 4.2 5V22M7.5 22h9',
    book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM4 19.5A2.5 2.5 0 0 0 6.5 22H20M8.5 7.5h7M8.5 10.5h4.5',
    settings: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z',
    
    // ── IDENTIDAD COLOMBIANA PREMIUM (FILLED) ──
    empanada: 'M2.5 16.2a9.5 9.5 0 0 1 19 0 1.58 1.58 0 0 1-3.17 0 1.58 1.58 0 0 1-3.16 0 1.58 1.58 0 0 1-3.17 0 1.58 1.58 0 0 1-3.17 0 1.58 1.58 0 0 1-3.16 0 1.58 1.58 0 0 1-3.17 0z',
    flame: 'M13.4 2.3c3.3 2.5 5.6 5.9 5.6 9.4a7 7 0 0 1-14 0c0-2.3 1-4.4 2.4-6 .5 1 1.3 1.9 2.3 2.4-.4-2.5 1-4.7 3.7-5.8z',
    sabio: 'M12 2l1.5 3h-3z M18 4l-1 3.5-2-1.5z M6 4l1 3.5 2-1.5z M21 10l-3.5 1 1.5 2z M3 10l3.5 1-1.5 2z M12 7a5 5 0 0 0-5 5v3c0 2.8 2.2 5 5 5s5-2.2 5-5v-3a5 5 0 0 0-5-5zm-2 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-2 5c-1 0-2-.5-2-.5l.5-1s.5.5 1.5.5 1.5-.5 1.5-.5l.5 1s-1 .5-2 .5z',
    mochila: 'M7.5 9h9l1 11.5a1 1 0 0 1-1 1.1H7.5a1 1 0 0 1-1-1.1L7.5 9z M8 9c0-2.5 1.8-4.5 4-4.5s4 2 4 4.5 M9.5 12.5l1.5 2 1-1.5 1 1.5 1.5-2 M8 16h8',
    sombrero: 'M12 4c-1 0-1.8 2-1.8 4.5 0 .4 0 .8.1 1.1C7.5 10 5 11 5 12.3c0 1 1.5 1.7 3.8 2 .9.1 2 .2 3.2.2s2.3-.1 3.2-.2c2.3-.3 3.8-1 3.8-2 0-1.3-2.5-2.3-5.3-2.7.1-.3.1-.7.1-1.1C13.8 6 13 4 12 4z M3 13.5c0 2 4 3.5 9 3.5s9-1.5 9-3.5',
    condor: 'M2 9c3-1 5 0 6 2 1-3 2.5-5 4-5s3 2 4 5c1-2 3-3 6-2-2 1.5-3 3-3.5 5l-2-1.5L13 14l-1-1.5-1 1.5-3.5-1.5L5.5 14C5 12 4 10.5 2 9z M12 14v6 M10 20h4',
    tiple: 'M9 2c1 0 1.5 1 1.5 2.5L10 11c2 1 3 2.8 3 4.8C13 19 11 21 8.5 21S4 19 4 15.8c0-2 1-3.8 3-4.8l-.5-6.5C6.5 3 7 2 8 2h1z M8.5 13.5a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6z M14 4l5 2-5 2',
    maracas: 'M6 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M8.2 11.8L11 19 M18 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M15.8 11.8L13 19 M5 9h2 M5.7 7.5l1.4 1.4 M17 9h2 M16.9 8.9l1.4-1.4',
    pergamino: 'M7.2 4.3h9.3a2.7 2.7 0 0 1 2.7 2.7v10.2a2.6 2.6 0 0 1-2.6 2.6H7.2M7.2 4.3a2.35 2.35 0 0 0-2.35 2.35v1.05h4.7V6.65A2.35 2.35 0 0 0 7.2 4.3zM7.2 19.8a2.3 2.3 0 1 1 0-4.6h9.4M10 10h6M10 13h4.5',
    solandino: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2 M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
    
    // 🐸 RANA DORADA v3 — carita amigable de frente, ojos saltones
    rana: 'M5.1 6.8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0M13.9 6.8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0M7.6 6.8h.01M16.4 6.8h.01M3.8 13.2c0-2.9 3.2-5 8.2-5s8.2 2.1 8.2 5c0 3.4-3.7 6-8.2 6s-8.2-2.6-8.2-6zM8.3 14.2c1.2 1.5 6.2 1.5 7.4 0M10.7 11.4h.01M13.3 11.4h.01',
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
    people: 'M9.2 11.6a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6zM3 20.2c.6-3.6 3-5.6 6.2-5.6s5.6 2 6.2 5.6M16.7 11.3a3.1 3.1 0 0 0 0-6M21 20.2c-.5-3-2.1-4.8-4.5-5.4',
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
    import { getAuth, signInWithPopup, GoogleAuthProvider }
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
      window.__FB = { db: getDatabase(app), ref, set, get, onValue, update, push, onDisconnect, auth, provider, signInWithPopup };
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

        // Chispas del fuego: ráfaga de crepitar brillante
        case 'sparks': {
          for (let i = 0; i < 6; i++) {
            setTimeout(() => this.shaker(0.10 - i * 0.01, 0.05, 7000 + i * 600), i * 55);
          }
          setTimeout(() => this.pluck(this._vary(1046.5, 20), 0.06, 0.7, 'triangle'), 60);
          break;
        }

        // Apertura de cofre: crujido + explosión de riqueza
        case 'chestOpen': {
          this.drum(90, 40, 0.35, 0.35);
          setTimeout(() => this.shaker(0.14, 0.25, 4500), 200);
          const arps = [523.25, 659.25, 783.99, 1046.5, 1318.5];
          arps.forEach((f, i) => setTimeout(() => this.pluck(this._vary(f, 10), 0.11, 1.8, 'triangle'), 350 + i * 80));
          break;
        }

        // Vidrio rompiéndose: estallido agudo de cristal
        case 'glass': {
          this.shaker(0.22, 0.15, 8500);
          setTimeout(() => this.shaker(0.16, 0.22, 7000), 90);
          setTimeout(() => this.shaker(0.10, 0.3, 5500), 200);
          this.drum(220, 60, 0.3, 0.25);
          break;
        }

        // Tick del reloj en modos contrarreloj
        case 'tick': {
          this.drum(this._vary(900, 40), 500, 0.08, 0.05);
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
// El fuego del Inicio crece momentáneamente cuando completas algo (misión, simulacro, cofre…)
const fireBoost = () => { try { window.dispatchEvent(new CustomEvent('pkFireBoost')); } catch (e) {} };
// Portal: saca los overlays de modos de juego al body para que tapen header y nav
function Portal({ children }) {
  if (typeof document === 'undefined') return null;
  return createPortal(children, document.body);
}
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
  aizome_dark: null, // olas suaves (Caribe)
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
  theirTimerActive: false,   // el parcero tiene el Cafetal corriendo
  habits: [],                // Sanctuario de Hábitos
  habitsDate: null,          // fecha del último reset diario de hábitos
  lastReminderSent: {},      // rate-limit de "echarle memoria" al parcero
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
  // Poderes del Bazar (se consumen al usarse)
  xpBoostActive: false,   // Tinto Doble: x2 XP próxima lectura
  duelShieldActive: false,// Escudo de Arepa: no pierdes apuesta
  repasoActive: false,    // El Repaso: cambia 1 respuesta fallida
  comodinActive: false,   // Comodín: 1 pregunta correcta automática
  simXpBoost: false,      // Pergamino del Maestro: x2 XP próximo simulacro
  ghostUntil: null,       // Modo Fantasma: oculto del ranking hasta esta fecha
  // Daily missions state
  missionsDate: null,       // ✅ NEW: date string of current missions
  missionsRewarded: [],     // ✅ NEW: IDs of missions already rewarded today
  // Centro de Mando
  retoDia: null,            // { date, wins, perfect, done } del Reto del Día
  sellos: [],               // fechas (YYYY-MM-DD) con Sello Perfecto
  cofreLastOpened: null,    // fecha (YYYY-MM-DD) del último cofre abierto
  logrosSecretos: [],       // ids de SECRET_LOGROS desbloqueados
  flashWinStreak: 0,        // victorias seguidas en Duelo Flash
  // Territorio del Saber
  contrarrelojRecord: 0,    // máximo de aciertos en Contrarreloj
  supervivenciaRecord: 0,   // cadena máxima en Supervivencia
  ruletaMaxMult: 0,         // mejor multiplicador cobrado en La Ruleta
  modeStats: {},            // aciertos/total por materia en los modos
  weakStats: {},            // aciertos/total por materia·competencia (debilidades)

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

  // ── Neón Caribe: el borde cicla cyan → magenta → amarillo ──
  if (id === 'f_neon') return (
    <div style={{ position: 'absolute', inset: -3, zIndex: 3, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #22D3EE',
        animation: 'neonCycle 4.5s ease-in-out infinite' }} />
    </div>
  );

  // ── El Hacker: lluvia de datos verde estilo Matrix ──
  if (id === 'f_matrix') {
    const drops = [12, 30, 50, 70, 88];
    return (
      <div style={{ position: 'absolute', inset: -3, zIndex: 3, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2.5px solid #22C55E',
          boxShadow: '0 0 14px #22C55E70, inset 0 0 10px #22C55E30' }} />
        <div style={{ position: 'absolute', inset: -1, borderRadius: '50%', overflow: 'hidden' }}>
          {drops.map((left, i) => (
            <div key={i} style={{ position: 'absolute', top: i % 2 ? '8%' : '52%', left: `${left}%`,
              width: 2, height: 9, borderRadius: 1,
              background: 'linear-gradient(to bottom, transparent, #4ADE80)',
              boxShadow: '0 0 4px #22C55E',
              '--md': `${20 + (i % 3) * 10}px`,
              animation: `matrixDrop ${1.1 + (i % 4) * 0.4}s linear infinite ${i * 0.35}s` }} />
          ))}
        </div>
      </div>
    );
  }

  // ── Aurora Boreal: gradiente hipnótico verde → cyan → morado → rosa ──
  if (id === 'f_aurora') return (
    <div style={{ position: 'absolute', inset: -4, zIndex: 3, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', padding: 3.5,
        backgroundImage: 'linear-gradient(120deg, #34D399, #22D3EE, #A78BFA, #F472B6, #34D399)',
        backgroundSize: '300% 300%', animation: 'auroraFlow 7s ease infinite',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude',
        filter: 'drop-shadow(0 0 10px #22D3EE60)' }} />
    </div>
  );

  // ── Supernova: anillo pulsante + partículas orbitando + destellos ──
  if (id === 'f_supernova') {
    const orbs = [0, 120, 240];
    return (
      <div style={{ position: 'absolute', inset: -5, zIndex: 3, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #F472B6',
          animation: 'supernovaPulse 2.2s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1.5px solid #C084FC66',
          animation: 'inkSpin 8s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', animation: 'inkSpinRev 6s linear infinite' }}>
          {orbs.map((deg, i) => (
            <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: 6, height: 6,
              marginLeft: -3, marginTop: -3, borderRadius: '50%',
              transform: `rotate(${deg}deg) translateY(-${r + 3}px)`,
              background: '#fff', boxShadow: '0 0 8px #F472B6, 0 0 16px #C084FC' }} />
          ))}
        </div>
        {[{ top: '2%', left: '78%' }, { top: '85%', left: '15%' }].map((p, i) => (
          <div key={`s${i}`} style={{ position: 'absolute', top: p.top, left: p.left, width: 7, height: 7,
            background: '#fff', clipPath: 'polygon(50% 0%,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0% 50%,38% 38%)',
            filter: 'drop-shadow(0 0 5px #F472B6)',
            animation: `sparkleFlash 2s ${i * 0.9}s ease-in-out infinite` }} />
        ))}
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
    fireBoost();
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
  const [themeKey, setThemeKey]   = useState('aizome_dark'); // Tema único: Caribe
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
  const nudgeSeenRef = useRef(0);
  const [partnerPhotoURL, setPartnerPhotoURL] = useState(null);
  const [fbLoaded, setFbLoaded]   = useState(false);
  const [ambientOn, setAmbientOn] = useState(saved?.ambientOn || false); // ✅ NEW: ambientación de fondo
  const [perfilStartView, setPerfilStartView] = useState('profile'); // a qué vista abrir el Perfil
  const [perfilNav, setPerfilNav] = useState(0); // nonce: fuerza re-sync de la vista del Perfil
  const [identityMenu, setIdentityMenu] = useState(false); // menú desplegable de identidad (estilo Duolingo)
  const [myRankPos, setMyRankPos] = useState(null);        // posición en el ranking (badge del header)
  const headerEmp = useCountUp(appState.ryo || 0, 900);    // empanadas del header con conteo animado (hook antes de returns condicionales)
const seenNotifsRef = useRef(new Set()); // Para no spamear al usuario con la misma noti
  // ✅ NEW: Animation states
  const [coinBurst, setCoinBurst]         = useState(null); // { amount, key }
  const [levelUpData, setLevelUpData]     = useState(null); // { newLevel }
  const [achToast, setAchToast]           = useState(null); // achievement object
  const [streakCelebration, setStreakCelebration] = useState(null); // ✅ momentazo de racha
  const prevLevelRef = useRef(computeLevel(appState.xp || 0).level);
  const achQueueRef  = useRef([]);
  const processingAch = useRef(false);

  // Tema base + color custom — aizome_dark (Caribe) es el único tema
  const baseTheme = T[themeKey] || T.aizome_dark;
  const C = appState.customColor
    ? { ...baseTheme, accent: appState.customColor, accentMid: appState.customColor }
    : baseTheme;
  const isLight = false;
  const isSakura = false;

  // El fondo del body sigue al tema (evita bordes oscuros en pantallas anchas)
  useEffect(() => {
    try { document.body.style.background = C.bg; } catch (e) {}
  }, [C.bg]);

  // El tema es único (Caribe): si quedó guardado otro, se corrige solo
  useEffect(() => {
    if (themeKey !== 'aizome_dark') setThemeKey('aizome_dark');
  }, [themeKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Navegar al Perfil abriendo una vista concreta (profile | shop | settings)
  const goPerfil = (view) => {
    setPerfilStartView(view);
    setPerfilNav(n => n + 1);
    setTab('perfil');
  };

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

  // ── Presencia en vivo (Quién Anda Aquí) ──
  useEffect(() => {
    if (!fbLoaded || !fbOK() || !user?.code) return;
    const status = tab === 'icfes' ? 'simulacro' : tab === 'books' ? 'leyendo' : 'online';
    const pRef = FB().ref(FB().db, `presence/${user.code}`);
    const write = () => {
      try {
        FB().set(pRef, { code: user.code, name: user.name || 'Parcero', status, ts: Date.now() });
        FB().onDisconnect(pRef).remove();
      } catch (e) {}
    };
    write();
    const hb = setInterval(write, 120000); // heartbeat cada 2 min
    return () => clearInterval(hb);
  }, [fbLoaded, user?.code, tab]);

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

  // Posición en el ranking (para el escudo del header)
  useEffect(() => {
    if (!fbLoaded || !user?.code) return;
    FB().get(FB().ref(FB().db, 'users')).then(snap => {
      if (!snap.exists()) return;
      const ranked = Object.values(snap.val())
        .map(u => ({ code: u.code, ghost: (u.appState?.ghostUntil || 0) > Date.now(),
          correctas: (u.appState?.icfesHistory || []).reduce((s, r) => s + (r.correct || 0), 0) }))
        .filter(u => u.code === user.code || !u.ghost)
        .sort((a, b) => b.correctas - a.correctas);
      const idx = ranked.findIndex(u => u.code === user.code);
      if (idx >= 0) setMyRankPos(idx + 1);
    }).catch(() => {});
  }, [fbLoaded, user?.code, appState.icfesHistory]);

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

  // Reset diario del jardín de hábitos: al pasar el día, lo no completado corta racha
  useEffect(() => {
    const today = todayStr();
    if (appState.habitsDate === today) return;
    setAppState(s => {
      if (!s.habits || !s.habits.length) return { ...s, habitsDate: today };
      return {
        ...s, habitsDate: today,
        habits: s.habits.map(h => ({ ...h, streak: h.completedToday ? h.streak : 0, completedToday: false })),
      };
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
      onDisconnect(ref(db, `sessions/${user.sessionId}/${amI1 ? 'user1TimerActive' : 'user2TimerActive'}`)).set(false);
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
      const theirTimer = amI1 ? !!d.user2TimerActive : !!d.user1TimerActive;

      // Recordatorio del parcero ("echarle memoria")
      if (d.nudge && d.nudge.to === user.code && d.nudge.ts && d.nudge.ts !== nudgeSeenRef.current) {
        nudgeSeenRef.current = d.nudge.ts;
        if (Date.now() - d.nudge.ts < 90000) pushNotif(`${user.partner || 'Tu parcero'} te recuerda leer hoy`);
      }

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
          theirTimerActive: theirTimer,
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
    fireBoost(); // 🔥 el fuego del Inicio celebra
    setStreakCelebration(newStreak); // ✅ ¡El momentazo!

    if (fbOK() && user?.sessionId) {
      try {
        const snap = await FB().get(FB().ref(FB().db, `sessions/${user.sessionId}`));
        const amI1 = snap.exists() ? snap.val().user1Code === user.code : true;
        await FB().update(FB().ref(FB().db, `sessions/${user.sessionId}`), {
          [amI1 ? 'user1Confirmed' : 'user2Confirmed']: true,
          [amI1 ? 'user1Progress'  : 'user2Progress']:  pct,
          [amI1 ? 'user1Page'      : 'user2Page']:      cPage,
          lastActivity: Date.now(),
        });
      } catch (e) {}
    }
    pushNotif(`¡Racha de ${newStreak} día${newStreak > 1 ? 's' : ''}! +${confirmRyo} empanadas`);
  };

  const handleReactNote = (noteId, emoji) => {
    if (!fbOK() || !user?.sessionId) return;
    try { FB().set(FB().ref(FB().db, `sessions/${user.sessionId}/notes/${noteId}/reactions/${emoji}`), true).catch(() => {}); } catch (e) {}
  };

  const handleRemindPartner = () => {
    const code = user?.partnerCode || user?.partner || 'parcero';
    const today = todayStr();
    if ((appState.lastReminderSent || {})[code] === today) { pushNotif('Ya le echaste memoria hoy'); return; }
    if (fbOK() && user?.sessionId) {
      try {
        FB().get(FB().ref(FB().db, `sessions/${user.sessionId}`)).then(snap => {
          if (!snap.exists()) return;
          const amI1 = snap.val().user1Code === user.code;
          const to = amI1 ? snap.val().user2Code : snap.val().user1Code;
          FB().update(FB().ref(FB().db, `sessions/${user.sessionId}`), { nudge: { from: user.code, to, ts: Date.now() } }).catch(() => {});
        }).catch(() => {});
      } catch (e) {}
    }
    setAppState(s => ({ ...s, lastReminderSent: { ...(s.lastReminderSent || {}), [code]: today } }));
    pushNotif(`Le echaste memoria a ${user?.partner || 'tu parcero'}`);
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
  if (screen === 'splash')     return <><style>{globalStyles}</style><Splash C={C} isLight={isLight} onDone={() => setScreen(user?.code ? 'app' : 'onboarding')} /></>;
  
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
    { id: 'tienda',  icon: 'mochila',   label: 'Tienda' },
    { id: 'inicio',  icon: 'home',      label: 'Inicio' },
    { id: 'icfes',   icon: 'rana',      label: 'ICFES' },
    { id: 'books',   icon: 'pergamino', label: 'Libros' },
    { id: 'friends', icon: 'people',    label: 'Combo' },
  ];
  // ¿Hay cofre de racha pendiente de abrir? (badge del tab Tienda)
  const _hoyStr = todayStr();
  const _sealedHoy = appState.yourConfirmed || (appState.icfesHistory || []).some(r => r.date === _hoyStr || (r.ts && new Date(r.ts).toDateString() === _hoyStr));
  const cofrePendiente = _sealedHoy && appState.cofreLastOpened !== dateKeyISO();

  return (
    <>
    <style>{globalStyles}</style>
    <div style={{ width: '100%', maxWidth: 430, height: '100dvh', display: 'flex', flexDirection: 'column', background: C.bg, color: C.text, position: 'relative', margin: '0 auto', overflow: 'hidden' }}>
      <TexturaFondo C={C} isLight={isLight} />
      {isSakura && <SakuraFalling />}
      {coinBurst && <CoinBurst key={coinBurst.key} amount={coinBurst.amount} C={C} />}
      {levelUpData && <LevelUpModal newLevel={levelUpData.newLevel} C={C} onClose={() => setLevelUpData(null)} />}
      {achToast && <AchievementToast achievement={achToast} C={C} onDone={() => { setAchToast(null); setTimeout(showNextAch, 400); }} />}
      {fbLoaded && user?.code && <DuelController C={C} isLight={isLight} user={user} appState={appState} setAppState={setAppState} pushNotif={pushNotif} />}
      {streakCelebration !== null && <StreakCelebration streak={streakCelebration} C={C} onClose={() => setStreakCelebration(null)} />}

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

      {/* ── Header compacto: solo recursos (estilo Clash Royale) ── */}
      <div style={{
        padding: '10px 18px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0, zIndex: 900, background: `linear-gradient(180deg, ${C.bg} 60%, transparent)`,
      }}>
        {/* Avatar → menú de identidad */}
        <button onClick={() => setIdentityMenu(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', borderRadius: '50%' }}>
          <Av name={user?.name || '?'} sz={38} C={C} photoURL={appState.photoURL} frameData={appState.equipped?.frame} />
        </button>
        {/* Recursos: empanadas count-up + nivel con anillo + escudo de ranking */}
        {(() => {
          const lvlH = computeLevel(appState.xp || 0);
          const R = 14, CIRC = 2 * Math.PI * R;
          return (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {/* Empanadas con count-up */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: `${C.amberMid}15`, border: `1px solid ${C.amberMid}35`, borderRadius: 12, padding: '6px 11px' }}>
                <PkIc n="empanada" s={14} c={C.amberMid} />
                <span style={{ fontSize: 13, fontWeight: 900, color: C.amberMid, fontVariantNumeric: 'tabular-nums' }}>{headerEmp.toLocaleString()}</span>
              </div>
              {/* Nivel con anillo de progreso */}
              <div style={{ position: 'relative', width: 34, height: 34 }}>
                <svg width="34" height="34" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="17" cy="17" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
                  <circle cx="17" cy="17" r={R} fill="none" stroke={C.accent} strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - lvlH.pct / 100)}
                    style={{ transition: 'stroke-dashoffset 1s ease', filter: lvlH.pct > 80 ? `drop-shadow(0 0 4px ${C.accent})` : 'none' }}/>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: C.accent }}>{lvlH.level}</div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Menú de identidad desplegable (estilo Duolingo) */}
      {identityMenu && (
        <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 9994, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }} onClick={() => setIdentityMenu(false)}>
          <div onClick={e => e.stopPropagation()} className="fu" style={{
            position: 'absolute', top: 54, right: 14, width: 232,
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
              { icon: 'solandino', label: 'Ajustes',      view: 'settings' },
            ].map(opt => (
              <button key={opt.view} onClick={() => { goPerfil(opt.view); setIdentityMenu(false); }} style={{
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
        <div style={{ display: tab === 'tienda' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }}>
          <SettingsTab startView="shop" asTab startViewNonce={tab === 'tienda' ? 1 : 0} C={C} isLight={isLight} themeKey={themeKey} setThemeKey={setThemeKey} ambientOn={ambientOn} setAmbientOn={setAmbientOn} appState={appState} setAppState={setAppState} user={user} partnerPhotoURL={partnerPhotoURL} onSavePhoto={() => {}} onLogout={() => {}} pushNotif={pushNotif} onCoinBurst={triggerCoinBurst} onAchievement={queueAchievement} onGoSettings={(dest) => setTab(dest || 'inicio')} />
        </div>
        <div style={{ display: tab === 'inicio' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '14px 20px 10px', WebkitOverflowScrolling: 'touch' }}>
          <InicioTab C={C} isLight={isLight} appState={appState} setAppState={setAppState} user={user} books={books} onGoTab={(id) => { if (id === 'perfil') goPerfil('profile'); else setTab(id); }} onGoShop={() => setTab('tienda')} onMissionReward={triggerCoinBurst} onCoinBurst={triggerCoinBurst} pushNotif={pushNotif} onConfirm={handleConfirm} />
        </div>
        <div style={{ display: tab === 'icfes' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }}>
          <IcfesTab C={C} isLight={isLight} user={user} appState={appState} setAppState={setAppState} setGlobalSenseiQ={setGlobalSenseiQ} onCoinBurst={triggerCoinBurst} onAchievement={queueAchievement} pushNotif={pushNotif} onConfirm={handleConfirm} />
        </div>
        <div style={{ display: tab === 'books' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }}>
          <PergaminosTab C={C} isLight={isLight} appState={appState} setAppState={setAppState} user={user} books={books} setBooks={setBooks} onAddBook={handleAddBook} onConfirm={handleConfirm} partnerOnline={partnerOnline} partnerPhotoURL={partnerPhotoURL} pushNotif={pushNotif} onCoinBurst={triggerCoinBurst} onAchievement={queueAchievement} notes={notes} noteText={noteText} setNoteText={setNoteText} onAddNote={handleAddNote} onReactNote={handleReactNote} onRemindPartner={handleRemindPartner} />
        </div>
        <div style={{ display: tab === 'friends' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }}>
          <FriendsView C={C} isLight={isLight} appState={appState} setAppState={setAppState} user={user} pushNotif={pushNotif} onBack={() => setTab('books')} />
        </div>
        <div style={{ display: tab === 'perfil' ? 'block' : 'none', height: '100%', overflowY: 'auto', padding: '20px 20px 100px', WebkitOverflowScrolling: 'touch' }}>
          <SettingsTab startView={perfilStartView} startViewNonce={perfilNav} C={C} isLight={isLight} themeKey={themeKey} setThemeKey={setThemeKey} ambientOn={ambientOn} setAmbientOn={setAmbientOn} appState={appState} setAppState={setAppState} user={user} partnerPhotoURL={partnerPhotoURL} onSavePhoto={(url) => { setAppState(s => ({ ...s, photoURL: url })); if (fbOK() && user?.sessionId) { try { FB().get(FB().ref(FB().db, `sessions/${user.sessionId}`)).then(snap => { if (!snap.exists()) return; const amI1 = snap.val().user1Code === user.code; FB().update(FB().ref(FB().db, `sessions/${user.sessionId}`), { [amI1 ? 'user1PhotoURL' : 'user2PhotoURL']: url }); }); } catch(_) {} } }} onLogout={() => { localStorage.removeItem(SK); setUser(null); setAppState(freshState()); setBooks([]); setScreen('onboarding'); }} pushNotif={pushNotif} onCoinBurst={triggerCoinBurst} onAchievement={queueAchievement} onGoSettings={(dest) => setTab(dest || 'inicio')} />
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
                {id === 'tienda' && cofrePendiente && (
                  <div style={{ position: 'absolute', top: -2, right: 4, minWidth: 8, height: 8, borderRadius: 99,
                    background: '#EF4444', boxShadow: '0 0 6px #EF4444', animation: 'comboDot 1.4s ease-in-out infinite' }} />
                )}
                {active && (
                  <div style={{
                    position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
                    width: 18, height: 3, borderRadius: 99, background: C.accent,
                    boxShadow: `0 0 8px ${C.accent}80`,
                    animation: 'tabPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                  }} />
                )}
              </div>
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
function Splash({ onDone, C, isLight }) {
  const [phase, setPhase] = useState(0);
  const [phrase, setPhrase] = useState({ top: '', bottom: '' });

  useEffect(() => {
    const PHRASES = [
      { top: "COLANDO EL TINTO...", bottom: "PA' DESPERTAR LAS NEURONAS" },
      { top: "ALISTANDO EL MACHETE...", bottom: "ABRIENDO CAMINO AL SABER" },
      { top: "EMPACANDO EMPANADAS...", bottom: "LA EXPEDICIÓN DA HAMBRE" },
      { top: "PRENDIENDO LA FOGATA...", bottom: "ACOMODE SU RUANA Y EMPECEMOS" },
      { top: "PONIÉNDOSE LAS PILAS...", bottom: "QUE ESE ICFES NO SE PASA SOLO" },
      { top: "ECHÁNDOLE GAFA...", bottom: "A LAS PREGUNTAS MÁS CORCHADORAS" }
    ];
    setPhrase(PHRASES[Math.floor(Math.random() * PHRASES.length)]);
    const t1 = setTimeout(() => setPhase(1), 950);
    const t2 = setTimeout(() => setPhase(2), 1650);
    const t3 = setTimeout(onDone, 4600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const oro = '#D4AF37';
  const cielo = isLight
    ? 'linear-gradient(180deg, #FDF9F0 0%, #F8EDD6 42%, #F0DAB2 76%, #E9C98D 100%)'
    : 'linear-gradient(180deg, #05070C 0%, #0C1018 40%, #191410 76%, #2B1D0E 100%)';
  const montFar  = isLight ? '#CDB88C' : '#131A15';
  const montNear = isLight ? '#8FA284' : '#0A110C';
  const luci = Array.from({ length: 7 }, (_, i) => ({
    left: 8 + (i * 13) % 84, top: 34 + (i * 17) % 38, d: (i % 5) * 0.7, s: i % 2 ? 3 : 4.5,
  }));

  return (
    <div style={{ width: '100%', height: '100dvh', background: cielo,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden' }}>

      <style>{`
        @keyframes pkFlip { 0% { transform: perspective(900px) rotateY(150deg) scale(0.35) translateY(-36px); opacity: 0; } 55% { opacity: 1; } 100% { transform: perspective(900px) rotateY(0deg) scale(1) translateY(0); opacity: 1; } }
        @keyframes pkFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-7px) rotate(1.4deg); } }
        @keyframes pkRipple { 0% { transform: scale(0.55); opacity: 0.75; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes pkShine { 0%, 58% { transform: translateX(-150%) rotate(16deg); } 100% { transform: translateX(190%) rotate(16deg); } }
        @keyframes pkSun { 0% { transform: translateX(-50%) translateY(52px) scale(0.85); opacity: 0.35; } 100% { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; } }
        @keyframes pkMist { 0%, 100% { transform: translateX(-3.5%); } 50% { transform: translateX(3.5%); } }
        @keyframes pkLuci { 0%, 100% { opacity: 0.12; transform: translateY(0); } 50% { opacity: 0.85; transform: translateY(-9px); } }
        @keyframes pkCondor { 0% { transform: translate(-40px, 10px) scale(1); opacity: 0; } 12% { opacity: 0.55; } 88% { opacity: 0.55; } 100% { transform: translate(105vw, -16px) scale(1.08); opacity: 0; } }
        @keyframes pkTitle { 0% { letter-spacing: 24px; opacity: 0; filter: blur(7px); } 100% { letter-spacing: 10px; opacity: 1; filter: blur(0); } }
        @keyframes pkLoad { 0% { width: 0%; } 14% { width: 11%; } 32% { width: 37%; } 48% { width: 52%; } 66% { width: 68%; } 82% { width: 86%; } 100% { width: 100%; } }
      `}</style>

      {/* ── Sol dorado subiendo tras las montañas ── */}
      <div style={{ position: 'absolute', bottom: 96, left: '50%', width: 110, height: 110,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #FFF3CC 0%, #F0C560 55%, transparent 72%)',
        boxShadow: `0 0 70px 30px ${isLight ? 'rgba(240,197,96,0.45)' : 'rgba(240,197,96,0.22)'}`,
        animation: 'pkSun 2.4s cubic-bezier(0.22,1,0.36,1) both', pointerEvents: 'none' }}/>

      {/* ── Cóndor cruzando el cielo ── */}
      <svg viewBox="0 0 24 24" style={{ position: 'absolute', top: '19%', left: 0, width: 36, height: 36,
        animation: 'pkCondor 4.4s ease-in-out 0.6s both', pointerEvents: 'none' }}
        fill="none" stroke={isLight ? '#5A4A28' : '#C9B98F'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.55">
        <path d="M2 9c3-1 5 0 6 2 1-3 2.5-5 4-5s3 2 4 5c1-2 3-3 6-2-2 1.5-3 3-3.5 5l-2-1.5L13 14l-1-1.5-1 1.5-3.5-1.5L5.5 14C5 12 4 10.5 2 9z"/>
      </svg>

      {/* ── Montañas: capa lejana (difuminada = profundidad) ── */}
      <svg viewBox="0 0 400 120" preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, left: '-2%', width: '104%', height: 150,
          filter: 'blur(3px)', opacity: 0.75, pointerEvents: 'none' }}>
        <path d="M0 120 L0 70 Q40 40 85 62 Q130 26 180 54 Q225 18 275 46 Q325 28 365 50 Q385 42 400 48 L400 120 Z" fill={montFar}/>
      </svg>

      {/* ── Niebla del páramo ── */}
      <div style={{ position: 'absolute', bottom: 88, left: '-6%', width: '112%', height: 46,
        background: `linear-gradient(90deg, transparent, ${isLight ? 'rgba(255,252,244,0.85)' : 'rgba(200,190,170,0.10)'}, transparent)`,
        filter: 'blur(11px)', animation: 'pkMist 7s ease-in-out infinite', pointerEvents: 'none' }}/>

      {/* ── Montañas: capa cercana ── */}
      <svg viewBox="0 0 400 120" preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, left: '-2%', width: '104%', height: 112, pointerEvents: 'none' }}>
        <path d="M0 120 L0 86 Q55 56 110 78 Q160 46 215 74 Q270 44 330 72 Q370 58 400 70 L400 120 Z" fill={montNear}/>
      </svg>

      {/* ── Luciérnagas ── */}
      {luci.map((l, i) => (
        <div key={i} style={{ position: 'absolute', left: `${l.left}%`, top: `${l.top}%`,
          width: l.s, height: l.s, borderRadius: '50%',
          background: '#FFE9A8', boxShadow: '0 0 8px #F0C560',
          animation: `pkLuci ${2.4 + l.d}s ease-in-out infinite ${l.d}s`, pointerEvents: 'none' }}/>
      ))}

      {/* ── CONTENIDO ── */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Medallón con flip 3D + flotación + destello */}
        <div style={{ position: 'relative', marginBottom: 24 }}>
          <div style={{ position: 'absolute', inset: -8, borderRadius: '50%',
            border: `2px solid ${oro}66`,
            animation: 'pkRipple 1.5s ease-out 1.2s both', pointerEvents: 'none' }}/>
          <div style={{ animation: 'pkFlip 1.35s cubic-bezier(0.34,1.4,0.64,1) both' }}>
            <div style={{ animation: 'pkFloat 3.6s 1.6s ease-in-out infinite' }}>
              <PankeyLogo size={118} C={{ accent: oro, bgAlt: isLight ? '#2E2718' : '#1A1715' }}/>
              {/* Destello que barre el medallón */}
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '-30%', bottom: '-30%', width: 34,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
                  animation: 'pkShine 3.1s ease-in-out 1.4s infinite' }}/>
              </div>
            </div>
          </div>
        </div>

        {/* Título con degradado de oro */}
        <div className="serif" style={{
          fontSize: 44, fontWeight: 800, marginBottom: 14, paddingLeft: 10,
          background: 'linear-gradient(180deg, #F7E7B0 0%, #D4AF37 55%, #9C7414 100%)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          textShadow: isLight ? 'none' : '0 6px 24px rgba(212,175,55,0.25)',
          animation: phase >= 1 ? 'pkTitle 1s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          opacity: phase >= 1 ? 1 : 0 }}>
          PANKEY
        </div>

        {/* Frases del Sabio */}
        <div style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.8s ease', minHeight: 38,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div className="serif" style={{ fontSize: 12, letterSpacing: 3, fontWeight: 600,
            color: isLight ? '#8A6410' : `${oro}DD` }}>{phrase.top}</div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2,
            color: isLight ? '#9E8A60' : '#A39C95' }}>{phrase.bottom}</div>
        </div>

        {/* Barra de carga dorada */}
        <div style={{ marginTop: 26, width: 152, height: 4, borderRadius: 99, overflow: 'hidden',
          background: isLight ? 'rgba(120,95,40,0.16)' : 'rgba(255,255,255,0.10)' }}>
          <div style={{ height: '100%', borderRadius: 99,
            background: `linear-gradient(90deg, ${oro}, #F7E7B0, ${oro})`,
            boxShadow: `0 0 10px ${oro}80`,
            animation: 'pkLoad 4.3s ease-in-out both' }}/>
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

  const handleGoogleLogin = async () => {
    setLoading(true); setError('');
    try {
      if (!fbOK()) throw new Error('Firebase no está listo.');
      const res = await window.__FB.signInWithPopup(window.__FB.auth, window.__FB.provider);
      const uid = res.user.uid;
      const googleName = res.user.displayName || '';
      const snapUid = await window.__FB.get(window.__FB.ref(window.__FB.db, `uids/${uid}`));
      if (snapUid.exists()) {
        const existingCode = snapUid.val();
        const userSnap = await window.__FB.get(window.__FB.ref(window.__FB.db, `users/${existingCode}`));
        if (userSnap.exists()) { setLoading(false); onDone(userSnap.val()); return; }
      }
      setTempUid(uid); setName(googleName); setStep('profile'); setLoading(false);
    } catch(e) { setError(`[${e.code}] ${e.message}`); setLoading(false); }
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
    const tintoDoble = !!appState.xpBoostActive;  // ☕ Tinto Doble: duplica el XP de esta sesión
    const earnedXp  = mins * 3 * (tintoDoble ? 2 : 1);     // 3 XP per minute
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
        xpBoostActive: tintoDoble ? false : s.xpBoostActive,  // el Tinto Doble se gasta
        readingMinutesToday: s.readingMinutesToday + mins,
        totalMinutesRead: newTotal,
        totalSessions: newSessions,
        achievements: newAchievements,
      };
    });
    if (tintoDoble) pushNotif?.('☕ Tinto Doble aplicado: ¡XP duplicado en esta sesión!');

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
// ═════════════════════════════════════════════════════════════
//  EL SANCTUARIO DEL LECTOR — PergaminosTab v2
//  Un espacio íntimo: presencia del parcero, libro inmersivo,
//  ritual del cafetal, jardín de hábitos y notas del libro.
// ═════════════════════════════════════════════════════════════

// ── Planta generativa del jardín de hábitos (SVG puro, evoluciona con la racha) ──
function PlantSVG({ streak = 0, color = '#4A7EB8', done = false, size = 56 }) {
  const st = streak >= 14 ? 4 : streak >= 6 ? 3 : streak >= 3 ? 2 : streak >= 1 ? 1 : 0;
  const leaf = done ? color : `${color}CC`;
  return (
    <svg width={size} height={size * 72 / 64} viewBox="0 0 64 72"
      style={{ display: 'block', filter: done ? `drop-shadow(0 0 8px ${color}88)` : 'none',
        opacity: done ? 1 : 0.82, transition: 'filter 0.4s, opacity 0.4s' }}>
      {/* Maceta */}
      <ellipse cx="32" cy="67" rx="18" ry="3.5" fill="rgba(0,0,0,0.28)" />
      <path d="M19 55 h26 l-2.6 12.5 a2 2 0 0 1-2 1.6 h-16.8 a2 2 0 0 1-2-1.6 z" fill="#6B4A2B" />
      <rect x="16.5" y="51" width="31" height="6" rx="2.5" fill="#7C5836" />
      <ellipse cx="32" cy="53.5" rx="13" ry="2.6" fill="#3A2716" />
      {st === 0 && <circle cx="32" cy="52" r="1.6" fill={`${color}99`} />}
      {/* Brote */}
      {st >= 1 && (
        <>
          <path d={st >= 2 ? "M32 53 q-1 -14 0 -24" : "M32 53 q-1 -7 0 -13"} stroke={leaf}
            strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <ellipse cx="26" cy={st >= 2 ? 42 : 44} rx="5.2" ry="3" fill={leaf} transform={`rotate(-32 26 ${st >= 2 ? 42 : 44})`} />
          <ellipse cx="38" cy={st >= 2 ? 40 : 42} rx="5.2" ry="3" fill={leaf} transform={`rotate(32 38 ${st >= 2 ? 40 : 42})`} />
        </>
      )}
      {/* Planta mediana: 2 hojas más */}
      {st >= 2 && (
        <>
          <ellipse cx="24" cy="33" rx="6" ry="3.4" fill={leaf} transform="rotate(-28 24 33)" />
          <ellipse cx="40" cy="31" rx="6" ry="3.4" fill={leaf} transform="rotate(28 40 31)" />
        </>
      )}
      {/* Flor */}
      {st === 3 && (
        <g transform="translate(32 24)">
          {[0, 60, 120, 180, 240, 300].map(a => (
            <ellipse key={a} cx="0" cy="-7" rx="3.2" ry="5.5" fill={color} transform={`rotate(${a})`} />
          ))}
          <circle cx="0" cy="0" r="3.6" fill="#FFD75E" />
        </g>
      )}
      {/* Árbol: copa con florecitas */}
      {st >= 4 && (
        <>
          <path d="M31 53 q-1 -12 0 -20" stroke="#6B4A2B" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <circle cx="32" cy="24" r="15" fill={leaf} />
          <circle cx="22" cy="20" r="8" fill={color} />
          <circle cx="42" cy="21" r="8" fill={color} />
          {[[26, 20], [37, 18], [32, 27], [40, 27], [24, 28]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.1" fill="#FFD75E" />
          ))}
        </>
      )}
    </svg>
  );
}

// ── Sección 1: El Dúo de Lectura Activa ──
function DuoReadingHeader({ C, user, partner, appState, partnerOnline, partnerPhotoURL, myReading }) {
  const partnerReading = !!appState.theirTimerActive && partnerOnline;
  const bothReading = myReading && partnerReading;
  const yourSealed = appState.yourConfirmed;
  const theirSealed = appState.theirConfirmed;
  const shared = appState.streakDays || 0;

  const miEstado = myReading
    ? { txt: 'Leyendo ahora', dot: C.tealMid, pulse: true }
    : yourSealed ? { txt: 'Leído hoy', dot: C.tealMid, pulse: false }
    : { txt: 'Sin leer hoy', dot: C.border, pulse: false };
  const suEstado = !user?.partnerConnected ? { txt: 'Sin parcero', dot: C.border, pulse: false }
    : partnerReading ? { txt: 'Leyendo ahora', dot: C.accent, pulse: true }
    : partnerOnline ? { txt: theirSealed ? 'Leyó hoy' : 'En línea', dot: C.tealMid, pulse: true }
    : { txt: 'Desconectado', dot: C.border, pulse: false };

  const Dot = ({ c, pulse }) => (
    <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, display: 'inline-block', flexShrink: 0,
      boxShadow: pulse ? `0 0 6px ${c}` : 'none', animation: pulse ? 'dotPulse 1.6s ease-in-out infinite' : 'none' }} />
  );

  return (
    <div style={{ position: 'relative', borderRadius: 22, padding: '15px 16px',
      background: `linear-gradient(135deg, ${C.accent}14 0%, rgba(255,255,255,0.02) 100%)`,
      border: `1px solid ${bothReading ? C.accent + '66' : C.accent + '2E'}`,
      animation: bothReading ? 'syncGlow 2.2s ease-in-out infinite' : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* TÚ */}
        <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
          <Av name={user?.name || 'Tú'} sz={46} C={C} photoURL={appState.photoURL} frameData={appState.equipped?.frame}
            style={{ margin: '0 auto', border: `2px solid ${myReading ? C.tealMid : C.bg}` }} />
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text, marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Tú'}</div>
          <div style={{ fontSize: 9.5, color: C.textMuted, marginTop: 3, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
            <Dot c={miEstado.dot} pulse={miEstado.pulse} />{miEstado.txt}
          </div>
        </div>
        {/* HILO */}
        <div style={{ width: 54, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="54" height="24" viewBox="0 0 54 24" style={{ display: 'block' }}>
            <path d="M2 12 H52" fill="none" stroke={bothReading ? C.accent : (myReading || partnerReading ? `${C.accent}88` : C.border)}
              strokeWidth={bothReading ? 2.4 : 1.6} strokeLinecap="round"
              strokeDasharray={bothReading ? '6 5' : (myReading || partnerReading ? 'none' : '2 4')}
              style={{ animation: bothReading ? 'threadFlow 0.9s linear infinite' : 'none',
                filter: bothReading ? `drop-shadow(0 0 3px ${C.accent})` : 'none' }} />
            <circle cx="2" cy="12" r="2.6" fill={myReading ? C.tealMid : C.border} />
            <circle cx="52" cy="12" r="2.6" fill={partnerReading ? C.accent : C.border} />
          </svg>
        </div>
        {/* PARCERO */}
        <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
          <Av name={partner} sz={46} C={C} color={C.blueMid} photoURL={partnerPhotoURL}
            style={{ margin: '0 auto', border: `2px solid ${partnerReading ? C.accent : C.bg}` }} />
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text, marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.partnerConnected ? partner : '—'}</div>
          <div style={{ fontSize: 9.5, color: C.textMuted, marginTop: 3, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
            <Dot c={suEstado.dot} pulse={suEstado.pulse} />{suEstado.txt}
          </div>
        </div>
      </div>

      {/* Racha compartida */}
      <div style={{ marginTop: 12, paddingTop: 11, borderTop: `1px solid ${C.border}`, textAlign: 'center' }}>
        {bothReading ? (
          <div style={{ fontSize: 11.5, fontWeight: 800, color: C.accent, letterSpacing: 0.3 }}>
            ✨ Sesión sincronizada · leyendo juntos
          </div>
        ) : (
          <div style={{ fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6,
            color: (yourSealed && theirSealed) ? C.tealMid : yourSealed ? C.textMid : '#E8A34A' }}>
            <PkIc n="flame" s={14} c={(yourSealed && theirSealed) ? C.tealMid : '#E8A34A'} />
            {shared > 0 ? `${shared} día${shared !== 1 ? 's' : ''} leyendo juntos` : 'Empiecen su racha juntos'}
            {!yourSealed && shared >= 0 && <span style={{ color: C.accent, fontWeight: 800 }}> · ¡séllala!</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sección 2a: Hero inmersivo del libro ──
function LibroHero({ C, book, pct, dimmed }) {
  const pal = getPalette(book?.genre);
  return (
    <div style={{ position: 'relative', height: 200, borderRadius: 24, overflow: 'hidden',
      opacity: dimmed ? 0.55 : 1, transition: 'opacity 0.5s ease',
      boxShadow: `0 16px 44px ${pal.spine}22, 0 6px 26px rgba(0,0,0,0.5)` }}>
      {/* Fondo: gradiente dominante del género */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(155deg, ${pal.from} 0%, ${pal.to} 100%)` }} />
      {/* Copia difuminada de la portada (color dominante estilo Spotify) */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: 'scale(1.6)', filter: 'blur(26px) saturate(1.35)', opacity: 0.55, pointerEvents: 'none' }}>
        <BookCover book={book} size="lg" />
      </div>
      {/* Gradiente de legibilidad */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(to bottom, transparent 0%, ${pal.from}66 58%, ${pal.from}F2 100%)` }} />
      {/* Portada flotante */}
      <div style={{ position: 'absolute', top: 22, left: 20, animation: 'coverFloat 4s ease-in-out infinite',
        filter: 'drop-shadow(0 12px 34px rgba(0,0,0,0.6))' }}>
        <BookCover book={book} size="lg" />
      </div>
      {/* Contenido */}
      <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
        <div className="serif" style={{ fontSize: 21, fontWeight: 800, color: pal.text || '#fff', lineHeight: 1.15,
          textShadow: '0 2px 12px rgba(0,0,0,0.6)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {book.title}
        </div>
        <div style={{ fontSize: 12.5, color: pal.text ? pal.text + 'B0' : 'rgba(255,255,255,0.7)', marginTop: 3 }}>{book.author || 'Autor desconocido'}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 9 }}>
          {book.genre && (
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.4, color: pal.spine, background: `${pal.spine}26`,
              border: `1px solid ${pal.spine}45`, borderRadius: 6, padding: '3px 9px' }}>{book.genre.toUpperCase()}</span>
          )}
          <span style={{ fontSize: 11, fontWeight: 800, color: pal.text || '#fff' }}>{pct}% completado</span>
        </div>
      </div>
    </div>
  );
}

// ── Sección 2b: Progreso épico + sellar pergamino ──
function ProgresoLibro({ C, appState, setAppState, book, onSeal }) {
  const pal = getPalette(book?.genre);
  const tChap = book?.totalChapters || 10;
  const tPage = book?.totalPages || 0;
  const cChap = appState.currentChapter || 1;
  const cPage = appState.currentPage || 1;
  const [expanded, setExpanded] = useState(false);
  const [wax, setWax] = useState(false);
  const sealed = appState.yourConfirmed;
  const segCount = Math.min(tChap, 16);

  const chapFrac = tPage > 0 ? (cPage / tPage) : 0;

  const doSeal = () => {
    if (sealed) return;
    setWax(true);
    setTimeout(() => setWax(false), 1400);
    onSeal?.();
  };

  return (
    <div style={{ marginTop: 14 }}>
      {/* Barra por capítulos */}
      <div onClick={() => setExpanded(e => !e)} style={{ display: 'flex', gap: 3, height: expanded ? 24 : 12,
        transition: 'height 0.3s ease', cursor: 'pointer', alignItems: 'stretch' }}>
        {Array.from({ length: segCount }).map((_, i) => {
          const isDone = i < cChap - 1;
          const isCurrent = i === cChap - 1;
          const fill = isDone ? 1 : isCurrent ? Math.max(0.12, chapFrac || 0.5) : 0;
          return (
            <div key={i} style={{ flex: 1, borderRadius: 4, background: 'rgba(255,255,255,0.10)',
              border: `1px solid ${isCurrent ? pal.spine + '99' : 'rgba(255,255,255,0.08)'}`, overflow: 'hidden', position: 'relative',
              display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ width: '100%', height: `${fill * 100}%`, background: isDone ? pal.spine : `linear-gradient(0deg, ${pal.spine}, ${pal.spine}AA)`,
                transition: 'height 0.4s ease' }} />
              {expanded && <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8, fontWeight: 800, color: isDone ? '#0A0A0A' : 'rgba(255,255,255,0.65)' }}>{i + 1}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginTop: 8, textAlign: 'center' }}>
        Capítulo {cChap}{tPage > 0 ? ` · Página ${cPage} de ${tPage}` : ` de ${tChap}`}
      </div>

      {/* Controles de capítulo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
        <button onClick={() => setAppState(s => ({ ...s, currentChapter: Math.max(1, cChap - 1), currentPage: 1 }))}
          style={{ flex: 1, height: 50, borderRadius: 14, background: `${pal.spine}22`, border: `1px solid ${pal.spine}44`,
            color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <PkIc n="left" s={15} c="#fff" /> Cap.
        </button>
        <div style={{ minWidth: 54, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: pal.spine, lineHeight: 1 }}>{cChap}</div>
          <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1 }}>DE {tChap}</div>
        </div>
        <button onClick={() => setAppState(s => ({ ...s, currentChapter: Math.min(tChap, cChap + 1), currentPage: 1 }))}
          style={{ flex: 1, height: 50, borderRadius: 14, background: `${pal.spine}22`, border: `1px solid ${pal.spine}44`,
            color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          Cap. <PkIc n="right" s={15} c="#fff" />
        </button>
      </div>

      {/* Slider de páginas */}
      {tPage > 0 && (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: 6 }}>
            <span>PÁGINA</span><span style={{ color: pal.spine, fontSize: 12 }}>{cPage}</span>
          </div>
          <input type="range" min={1} max={tPage} value={cPage}
            onChange={e => setAppState(s => ({ ...s, currentPage: parseInt(e.target.value) }))}
            style={{ width: '100%', accentColor: pal.spine, cursor: 'pointer' }} />
        </div>
      )}

      {/* Sellar pergamino */}
      <div style={{ position: 'relative', marginTop: 16 }}>
        {wax && (
          <div style={{ position: 'absolute', top: -4, left: '50%', width: 44, height: 44, borderRadius: '50%', zIndex: 3,
            background: 'radial-gradient(circle at 35% 30%, #E8743A, #A0341A)', border: '2px solid #7A2410',
            display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'selloDrop 1.2s cubic-bezier(0.34,1.4,0.6,1) both',
            boxShadow: '0 6px 18px rgba(0,0,0,0.5)' }}>
            <PkIc n="flame" s={18} c="#FFD9B0" />
          </div>
        )}
        <button onClick={doSeal} disabled={sealed} style={{ width: '100%', height: 52, borderRadius: 14, cursor: sealed ? 'default' : 'pointer',
          fontFamily: 'inherit', fontSize: 14, fontWeight: 800, border: 'none',
          background: sealed ? 'rgba(52,211,153,0.16)' : `linear-gradient(135deg, ${pal.spine}, ${pal.spine}CC)`,
          color: sealed ? '#34D399' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: sealed ? 'none' : `0 8px 22px ${pal.spine}44` }}>
          <PkIc n={sealed ? 'check' : 'flame'} s={16} c={sealed ? '#34D399' : '#fff'} />
          {sealed ? 'Pergamino sellado · Racha +1' : 'Sellar pergamino de hoy'}
        </button>
      </div>
    </div>
  );
}

// ── Sección 3: Cafetal de Enfoque como ritual ──
function CafetalRitual({ C, appState, setAppState, pushNotif, currentBook, setBooks, onCoinBurst, onAchievement, user, onReadingChange, partnerName, partnerPhoto }) {
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [goalMins, setGoalMins] = useState(appState.dailyGoal || 20);
  const [result, setResult] = useState(null);
  const intervalRef = useRef(null);
  const partnerReading = !!appState.theirTimerActive;

  const syncTimer = (active) => {
    onReadingChange?.(active);
    if (!fbOK() || !user?.sessionId) return;
    try {
      FB().get(FB().ref(FB().db, `sessions/${user.sessionId}`)).then(snap => {
        if (!snap.exists()) return;
        const amI1 = snap.val().user1Code === user.code;
        FB().update(FB().ref(FB().db, `sessions/${user.sessionId}`), { [amI1 ? 'user1TimerActive' : 'user2TimerActive']: active }).catch(() => {});
      }).catch(() => {});
    } catch (e) {}
  };

  useEffect(() => {
    if (running && !paused) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s + 1 === goalMins * 60) { try { playAlarm(); } catch (e) {} sendPushNotif('¡Sesión cumplida!', `Leíste ${goalMins} minutos.`, 'pankey-timer'); pushNotif('¡Meta cumplida! 🎉'); }
          return s + 1;
        });
      }, 1000);
    } else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [running, paused, goalMins]);

  const start = () => { FX.play('success'); setSeconds(0); setRunning(true); setPaused(false); syncTimer(true); };
  const togglePause = () => { const np = !paused; setPaused(np); FX.play('tap'); if (np) syncTimer(false); else syncTimer(true); };
  const restart = () => { FX.play('tap'); setSeconds(0); setPaused(false); };
  const abandon = () => { setRunning(false); setPaused(false); setSeconds(0); syncTimer(false); };

  const finish = () => {
    syncTimer(false);
    if (seconds < 30) { abandon(); return; }
    const mins = Math.max(1, Math.round(seconds / 60));
    const earnedRyo = mins;
    const tintoDoble = !!appState.xpBoostActive;
    const earnedXp = mins * 3 * (tintoDoble ? 2 : 1);
    const metaOk = mins >= goalMins;

    setAppState(s => {
      const newTotal = s.totalMinutesRead + mins;
      const newSessions = s.totalSessions + 1;
      const newAchievements = (s.achievements || []).map(a => {
        if (a.unlocked) return a;
        if (a.id === 4 && newTotal >= 100) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 7 && mins >= 60) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 11 && newSessions >= 100) return { ...a, unlocked: true, date: 'hoy' };
        if (a.id === 12 && newTotal >= 1000) return { ...a, unlocked: true, date: 'hoy' };
        return a;
      });
      const prevIds = (s.achievements || []).filter(a => a.unlocked).map(a => a.id);
      const newly = newAchievements.filter(a => a.unlocked && !prevIds.includes(a.id));
      newly.forEach(a => onAchievement?.(a));
      // Hábito de lectura se auto-marca con sesiones de 20+ min
      let habits = s.habits || [];
      if (mins >= 20 && habits.length) {
        habits = habits.map(h => (h.type === 'daily' && /le[ei]r|lectura|leí/i.test(h.name) && !h.completedToday)
          ? { ...h, completedToday: true, streak: (h.streak || 0) + 1, completedDates: [...(h.completedDates || []), todayStr()] } : h);
      }
      return {
        ...s,
        ryo: (s.ryo || 0) + earnedRyo + newly.reduce((x, a) => x + (a.ryo || 0), 0),
        xp: (s.xp || 0) + earnedXp + newly.reduce((x, a) => x + (a.xp || 0), 0),
        xpBoostActive: tintoDoble ? false : s.xpBoostActive,
        readingMinutesToday: s.readingMinutesToday + mins,
        totalMinutesRead: newTotal, totalSessions: newSessions, achievements: newAchievements, habits,
      };
    });
    if (currentBook) setBooks(p => p.map(b => b.id === currentBook.id ? { ...b, timeRead: (b.timeRead || 0) + mins } : b));
    onCoinBurst?.(earnedRyo);
    setRunning(false); setPaused(false); setSeconds(0);
    setResult({ mins, earnedRyo, earnedXp, metaOk, goal: goalMins });
  };

  const m = Math.floor(seconds / 60), sec = seconds % 60;
  const pct = Math.min((seconds / (goalMins * 60)) * 100, 100);
  const mm = String(m).padStart(2, '0'), ss = String(sec).padStart(2, '0');

  const Steam = ({ n = 3 }) => (
    <div style={{ position: 'absolute', top: -18, left: 0, right: 0, height: 22, pointerEvents: 'none' }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: `${35 + i * 15}%`, bottom: 0, width: 3, height: 16, borderRadius: 3,
          background: 'linear-gradient(0deg, rgba(255,255,255,0.4), transparent)',
          animation: `steamRise ${1.8 + i * 0.4}s ease-in-out ${i * 0.5}s infinite` }} />
      ))}
    </div>
  );

  // ── IDLE ──
  if (!running) {
    return (
      <div style={{ borderRadius: 20, padding: '22px 18px', textAlign: 'center',
        background: 'linear-gradient(160deg, rgba(124,61,20,0.16), rgba(124,61,20,0.04))', border: `1px solid ${C.amberMid}2E` }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: C.amberMid, display: 'flex', alignItems: 'center', gap: 7, justifyContent: 'center' }}>
          <PkIc n="coffee" s={16} c={C.amberMid} /> CAFETAL DE ENFOQUE
        </div>
        {/* Taza SVG con vapor */}
        <div style={{ position: 'relative', width: 78, height: 74, margin: '16px auto 12px' }}>
          <Steam n={3} />
          <svg width="78" height="74" viewBox="0 0 78 74">
            <path d="M14 26 h44 v20 a20 20 0 0 1-44 0 z" fill="#7C3D14" stroke="#A85A28" strokeWidth="2" />
            <path d="M58 30 h8 a9 9 0 0 1 0 18 h-8" fill="none" stroke="#A85A28" strokeWidth="3" />
            <ellipse cx="36" cy="26" rx="22" ry="5" fill="#5A2C0E" />
            <ellipse cx="36" cy="25" rx="17" ry="3.4" fill="#3A1C08" />
            <rect x="10" y="60" width="58" height="6" rx="3" fill="#5A2C0E" />
          </svg>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text, marginBottom: 14 }}>¿Cuánto tiempo le das al libro hoy?</div>
        <div style={{ display: 'flex', gap: 7, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          {[10, 20, 30, 45].map(mn => (
            <button key={mn} onClick={() => { FX.play('tap'); setGoalMins(mn); }} style={{ padding: '8px 15px', borderRadius: 99, fontFamily: 'inherit', fontSize: 13, fontWeight: 800, cursor: 'pointer',
              background: goalMins === mn ? C.amberMid : 'rgba(255,255,255,0.05)', color: goalMins === mn ? '#1A1206' : C.textMuted,
              border: `1px solid ${goalMins === mn ? C.amberMid : C.border}`, boxShadow: goalMins === mn ? `0 4px 12px ${C.amberMid}44` : 'none', transition: 'all 0.2s' }}>{mn} min</button>
          ))}
        </div>
        <button onClick={start} style={{ width: '100%', height: 50, borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          fontSize: 14, fontWeight: 800, color: '#1A1206', background: `linear-gradient(135deg, #E8A34A, ${C.amberMid})`,
          boxShadow: `0 8px 22px ${C.amberMid}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <PkIc n="play" s={16} c="#1A1206" /> Iniciar sesión de lectura
        </button>
        {result && <ResultSheet C={C} result={result} appState={appState} setAppState={setAppState} onSeal={null} onClose={() => setResult(null)} />}
      </div>
    );
  }

  // ── RUNNING / PAUSED ──
  return (
    <div style={{ borderRadius: 20, padding: '20px 18px', textAlign: 'center',
      background: 'linear-gradient(160deg, rgba(124,61,20,0.16), rgba(124,61,20,0.04))', border: `1px solid ${C.amberMid}2E` }}>
      {/* Reloj de café con liquid fill */}
      <div style={{ position: 'relative', width: 190, height: 190, margin: '4px auto 8px', borderRadius: '50%',
        overflow: 'hidden', border: `3px solid ${paused ? C.border : C.amberMid + '66'}`, background: 'rgba(0,0,0,0.3)',
        boxShadow: paused ? 'none' : `0 0 30px ${C.amberMid}33, inset 0 0 30px rgba(0,0,0,0.4)` }}>
        {/* Café que sube */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${pct}%`,
          background: paused ? 'linear-gradient(0deg, #4A5568, #2D3748)' : 'linear-gradient(0deg, #7C3D14, #A85A28)',
          transition: 'height 1s linear' }}>
          {/* Onda superior */}
          <div style={{ position: 'absolute', top: -6, left: 0, width: '200%', height: 12, opacity: paused ? 0.3 : 0.9,
            animation: paused ? 'none' : 'liquidWave 2.4s linear infinite' }}>
            <svg width="100%" height="12" viewBox="0 0 120 12" preserveAspectRatio="none">
              <path d="M0 6 Q15 0 30 6 T60 6 T90 6 T120 6 V12 H0 Z" fill={paused ? '#4A5568' : '#A85A28'} />
            </svg>
          </div>
        </div>
        {/* Vapor */}
        {!paused && <div style={{ position: 'absolute', top: 6, left: 0, right: 0, height: 30 }}><Steam n={4} /></div>}
        {/* Número */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 46, fontWeight: 800, color: '#fff', letterSpacing: 2, fontVariantNumeric: 'tabular-nums', textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>{mm}:{ss}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: 1.5, marginTop: 2 }}>{paused ? 'PAUSADO' : `META ${goalMins} MIN`}</div>
        </div>
      </div>

      {/* Estado */}
      <div style={{ fontSize: 12, color: C.textMid, fontWeight: 600, marginTop: 4 }}>
        {currentBook ? `Leyendo ${currentBook.title}` : 'Sesión de enfoque'}{currentBook ? ` · Cap. ${appState.currentChapter || 1}` : ''}
      </div>
      {partnerReading && (
        <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, marginTop: 5, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Av name={partnerName || 'Parcero'} sz={18} C={C} color={C.blueMid} photoURL={partnerPhoto} />
          {partnerName || 'Tu parcero'} también está leyendo
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.tealMid, animation: 'dotPulse 1.6s infinite' }} />
        </div>
      )}

      {/* Controles */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
        <button onClick={togglePause} style={{ height: 44, padding: '0 16px', borderRadius: 12, fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
          background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, color: C.text, display: 'flex', alignItems: 'center', gap: 6 }}>
          <PkIc n={paused ? 'play' : 'pause'} s={15} c={C.text} /> {paused ? 'Continuar' : 'Pausar'}
        </button>
        <button onClick={finish} style={{ height: 44, padding: '0 18px', borderRadius: 12, fontFamily: 'inherit', fontSize: 12.5, fontWeight: 800, cursor: 'pointer',
          background: C.tealMid, border: 'none', color: '#06231C', display: 'flex', alignItems: 'center', gap: 6 }}>
          <PkIc n="check" s={15} c="#06231C" /> Terminar
        </button>
        {!paused && (
          <button onClick={restart} style={{ width: 44, height: 44, borderRadius: 12, cursor: 'pointer', background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PkIc n="refresh" s={15} c={C.textMuted} />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Bottom sheet de resultado de sesión ──
function ResultSheet({ C, result, appState, setAppState, onClose }) {
  const minsUp = useCountUp(result.mins, 700);
  return (
    <Portal>
      <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99995, background: 'rgba(2,4,8,0.86)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onClose}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 430, background: C.bgAlt, borderRadius: '26px 26px 0 0',
          borderTop: `1px solid ${C.amberMid}44`, padding: '26px 22px calc(26px + env(safe-area-inset-bottom))', animation: 'slideUpIn 0.4s cubic-bezier(0.22,1,0.36,1) both' }}>
          <div style={{ width: 40, height: 4, borderRadius: 99, background: C.border, margin: '0 auto 20px' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: C.amberMid, lineHeight: 1 }}>{minsUp}<span style={{ fontSize: 20, color: C.textMuted }}> min</span></div>
            <div style={{ fontSize: 13, fontWeight: 700, color: result.metaOk ? C.tealMid : C.textMid, marginTop: 8 }}>
              {result.metaOk ? '¡Meta cumplida! 🎉' : `${result.mins} de ${result.goal} min. La próxima llegas.`}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <div style={{ flex: 1, borderRadius: 14, padding: '14px', background: `${C.amberMid}14`, border: `1px solid ${C.amberMid}30`, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.amberMid }}>+{result.earnedRyo}</div>
              <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: 1 }}>EMPANADAS</div>
            </div>
            <div style={{ flex: 1, borderRadius: 14, padding: '14px', background: `${C.accent}14`, border: `1px solid ${C.accent}30`, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.accent }}>+{result.earnedXp}</div>
              <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: 1 }}>XP</div>
            </div>
          </div>
          <button onClick={onClose} style={{ width: '100%', height: 48, borderRadius: 14, marginTop: 18, border: `1px solid ${C.border}`,
            background: 'transparent', color: C.text, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Cerrar</button>
        </div>
      </div>
    </Portal>
  );
}

// ── Sección 4: El libro del parcero ──
function LibroParcero({ C, isLight, appState, partner, partnerOnline, partnerPhotoURL, myBook, notes, user, onRemind, onOpenChat }) {
  const theirBook = appState.theirBook;
  if (!user?.partnerConnected) return null;
  const theirPct = appState.theirProgress || 0;
  const myPct = (() => {
    if (!myBook) return 0;
    const tPage = myBook.totalPages || 0, cPage = appState.currentPage || 1;
    const tChap = myBook.totalChapters || 10, cChap = appState.currentChapter || 1;
    return tPage > 0 ? Math.min(100, Math.round((cPage / tPage) * 100)) : Math.min(100, Math.round((cChap / tChap) * 100));
  })();
  const theirSpine = theirBook ? getPalette(theirBook.genre).spine : C.accent;
  const lastNotes = notes.slice(-2);
  const canRemind = !appState.theirConfirmed && partnerOnline;

  return (
    <div>
      <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 10, fontWeight: 800, letterSpacing: 1.5, display: 'flex', alignItems: 'center', gap: 7 }}>
        {partner.toUpperCase()} ESTÁ LEYENDO
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: partnerOnline ? C.tealMid : C.border, boxShadow: partnerOnline ? `0 0 6px ${C.tealMid}` : 'none' }} />
      </div>
      <div style={{ borderRadius: 18, padding: '14px 16px', background: C.bgAlt, border: `1px solid ${C.border}` }}>
        {theirBook ? (
          <>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, width: 44, height: 62, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.35)' }}>
                <BookCover book={theirBook} size="sm" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{theirBook.title}</div>
                <div style={{ fontSize: 11.5, color: C.textMuted, marginTop: 1 }}>{theirBook.author}</div>
                {theirBook.genre && <span style={{ display: 'inline-block', marginTop: 6, fontSize: 8.5, fontWeight: 800, letterSpacing: 1, color: theirSpine, background: `${theirSpine}1E`, border: `1px solid ${theirSpine}3A`, borderRadius: 5, padding: '2px 7px' }}>{theirBook.genre.toUpperCase()}</span>}
              </div>
            </div>
            {/* Barras comparativas */}
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[{ l: 'TÚ', pct: myPct, c: C.accent }, { l: partner.slice(0, 8).toUpperCase(), pct: theirPct, c: theirSpine }].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: C.textMuted, width: 52, letterSpacing: 0.5 }}>{r.l}</span>
                  <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 99, width: `${r.pct}%`, background: r.c, transition: 'width 0.6s ease' }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: r.c, width: 34, textAlign: 'right' }}>{r.pct}%</span>
                </div>
              ))}
            </div>
            {myPct !== theirPct && (
              <div style={{ fontSize: 10.5, color: C.textMuted, marginTop: 8, textAlign: 'center' }}>
                {myPct > theirPct ? `Vas ${myPct - theirPct}% adelante 🏃` : `${partner} va ${theirPct - myPct}% adelante`}
              </div>
            )}
            {/* Estado + recordar */}
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, fontSize: 11, fontWeight: 600, color: appState.theirConfirmed ? C.tealMid : C.textMuted }}>
                {appState.theirConfirmed ? `✓ ${partner} confirmó hoy · +1 racha` : `${partner} no ha leído hoy`}
              </div>
              {canRemind && (
                <button onClick={onRemind} style={{ flexShrink: 0, background: `${C.accent}18`, border: `1px solid ${C.accent}40`, color: C.accent,
                  borderRadius: 10, padding: '7px 12px', fontSize: 11, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>Echarle memoria →</button>
              )}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 2px' }}>
            <PkIc n="book" s={22} c={C.border} />
            <div style={{ fontSize: 12.5, color: C.textMuted }}>{partner} aún no eligió un libro.</div>
          </div>
        )}

        {/* Preview de notas */}
        {lastNotes.length > 0 && (
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
            {lastNotes.map(n => {
              const isMe = n.who === user?.code || n.who === 'you';
              return (
                <div key={n.id} style={{ fontSize: 11.5, color: C.textMid, marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <b style={{ color: isMe ? C.accent : C.tealMid }}>{isMe ? 'Tú' : (n.whoName || partner)}:</b> {n.text}
                </div>
              );
            })}
            <button onClick={onOpenChat} style={{ background: 'none', border: 'none', color: C.accent, fontSize: 11.5, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', padding: '4px 0 0' }}>Ver conversación →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sección 5: Sanctuario de Hábitos ──
const HABIT_ICONS = ['book', 'timer', 'rana', 'check', 'flame', 'coffee', 'people', 'leaf', 'flower', 'target', 'sabio', 'msg'];
const HABIT_COLORS = ['#4A7EB8', '#34D399', '#F472B6', '#FBBF24', '#A78BFA', '#38BDF8', '#E8743A', '#5EC26A'];

function AddHabitModal({ C, onAdd, onClose }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('daily');
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('book');
  const [color, setColor] = useState('#4A7EB8');
  const [time, setTime] = useState('07:00');
  const [dueDate, setDueDate] = useState('');

  const create = () => {
    if (!name.trim()) return;
    onAdd({ id: 'h' + Date.now(), name: name.trim(), type, icon, color,
      streak: 0, completedToday: false, completedDates: [],
      time: type === 'routine' ? time : null, dueDate: type === 'task' ? (dueDate || null) : null,
      xpReward: 20, createdAt: Date.now() });
    onClose();
  };

  return (
    <Portal>
      <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99995, background: 'rgba(2,4,8,0.86)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onClose}>
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 430, maxHeight: '82vh', overflowY: 'auto', background: C.bgAlt,
          borderRadius: '26px 26px 0 0', borderTop: `1px solid ${C.accent}44`, padding: '22px 20px calc(24px + env(safe-area-inset-bottom))',
          animation: 'slideUpIn 0.4s cubic-bezier(0.22,1,0.36,1) both' }}>
          <div style={{ width: 40, height: 4, borderRadius: 99, background: C.border, margin: '0 auto 18px' }} />
          <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 4 }}>Nuevo hábito</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 18 }}>Paso {step} de 2</div>

          {step === 1 ? (
            <>
              {[{ id: 'daily', t: 'Hábito diario', d: 'Se marca cada día · construye racha' },
                { id: 'task', t: 'Tarea', d: 'Con fecha límite · desaparece al terminar' },
                { id: 'routine', t: 'Rutina con hora', d: 'Aparece en tu línea del día' }].map(o => (
                <button key={o.id} onClick={() => { FX.play('tap'); setType(o.id); }} style={{ width: '100%', textAlign: 'left', marginBottom: 10, padding: '15px 16px', borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit',
                  background: type === o.id ? `${C.accent}18` : 'transparent', border: `1.5px solid ${type === o.id ? C.accent : C.border}` }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: type === o.id ? C.accent : C.text }}>{o.t}</div>
                  <div style={{ fontSize: 11.5, color: C.textMuted, marginTop: 3 }}>{o.d}</div>
                </button>
              ))}
              <button onClick={() => setStep(2)} style={{ width: '100%', height: 50, borderRadius: 14, marginTop: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 14, fontWeight: 800, color: '#fff', background: C.accent }}>Continuar →</button>
            </>
          ) : (
            <>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre del hábito…" maxLength={40}
                style={{ width: '100%', fontSize: 15, fontWeight: 600, padding: '12px 14px', borderRadius: 12, marginBottom: 16,
                  border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontFamily: 'inherit' }} />
              <div style={{ fontSize: 10, fontWeight: 800, color: C.textMuted, letterSpacing: 1, marginBottom: 8 }}>ÍCONO</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 16 }}>
                {HABIT_ICONS.map(ic => (
                  <button key={ic} onClick={() => setIcon(ic)} style={{ aspectRatio: '1', borderRadius: 11, cursor: 'pointer',
                    background: icon === ic ? `${color}22` : 'rgba(255,255,255,0.04)', border: `1.5px solid ${icon === ic ? color : C.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PkIc n={ic} s={18} c={icon === ic ? color : C.textMuted} />
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, color: C.textMuted, letterSpacing: 1, marginBottom: 8 }}>COLOR</div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                {HABIT_COLORS.map(cc => (
                  <button key={cc} onClick={() => setColor(cc)} style={{ width: 30, height: 30, borderRadius: '50%', cursor: 'pointer',
                    background: cc, border: color === cc ? '3px solid #fff' : '2px solid rgba(255,255,255,0.15)', boxShadow: color === cc ? `0 0 10px ${cc}` : 'none' }} />
                ))}
              </div>
              {type === 'routine' && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: C.textMuted, letterSpacing: 1, marginBottom: 8 }}>HORA</div>
                  <input type="time" value={time} onChange={e => setTime(e.target.value)}
                    style={{ fontSize: 15, padding: '10px 14px', borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontFamily: 'inherit', colorScheme: 'dark' }} />
                </div>
              )}
              {type === 'task' && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: C.textMuted, letterSpacing: 1, marginBottom: 8 }}>FECHA LÍMITE</div>
                  <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
                    style={{ fontSize: 15, padding: '10px 14px', borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontFamily: 'inherit', colorScheme: 'dark' }} />
                </div>
              )}
              {/* Preview */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, marginBottom: 18 }}>
                <PlantSVG streak={0} color={color} size={40} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.text, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <PkIc n={icon} s={14} c={color} />{name || 'Tu hábito'}
                  </div>
                  <div style={{ fontSize: 10.5, color: C.textMuted, marginTop: 2 }}>Así se verá tu maceta</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setStep(1)} style={{ width: 88, height: 50, borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
                  background: 'transparent', border: `1px solid ${C.border}`, color: C.textMuted }}>← Atrás</button>
                <button onClick={create} disabled={!name.trim()} style={{ flex: 1, height: 50, borderRadius: 14, border: 'none', cursor: name.trim() ? 'pointer' : 'default', fontFamily: 'inherit',
                  fontSize: 14, fontWeight: 800, color: '#fff', background: name.trim() ? C.accent : C.border, opacity: name.trim() ? 1 : 0.6 }}>Crear hábito</button>
              </div>
            </>
          )}
        </div>
      </div>
    </Portal>
  );
}

function HabitCard({ C, habit, onToggle }) {
  const [pop, setPop] = useState(false);
  const done = habit.completedToday;
  const toggle = () => {
    if (!done) { setPop(true); setTimeout(() => setPop(false), 600); FX.play('success'); FX.vibrate('light'); }
    else FX.play('tap');
    onToggle(habit.id);
  };
  return (
    <button onClick={toggle} style={{ position: 'relative', borderRadius: 16, padding: '12px 8px 10px', cursor: 'pointer', fontFamily: 'inherit',
      background: done ? `${habit.color}14` : 'rgba(255,255,255,0.03)', border: `1.5px solid ${done ? habit.color + '55' : C.border}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, overflow: 'hidden' }}>
      {/* Sparkles al completar */}
      {pop && [0, 1, 2].map(k => (
        <span key={k} style={{ position: 'absolute', top: '30%', left: `${28 + k * 22}%`, fontSize: 12, animation: `jardinFloat 0.7s ease-out ${k * 0.08}s both`, pointerEvents: 'none' }}>✨</span>
      ))}
      <div style={{ animation: pop ? 'plantPop 0.6s ease' : 'none' }}>
        <PlantSVG streak={habit.streak} color={habit.color} done={done} size={50} />
      </div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: done ? C.text : C.textMid, textAlign: 'center', lineHeight: 1.2, minHeight: 26,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', width: '100%' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, maxWidth: '100%' }}><PkIc n={habit.icon} s={11} c={habit.color} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{habit.name}</span></span>
      </div>
      {habit.streak > 0 && (
        <div style={{ fontSize: 9.5, fontWeight: 800, color: habit.color, display: 'flex', alignItems: 'center', gap: 3 }}>
          <PkIc n="flame" s={10} c={habit.color} />{habit.streak}
        </div>
      )}
    </button>
  );
}

function SanctuarioHabitos({ C, appState, setAppState, pushNotif, onCoinBurst }) {
  const [subTab, setSubTab] = useState('habitos');
  const [showAdd, setShowAdd] = useState(false);
  const habits = appState.habits || [];
  const dailies = habits.filter(h => h.type !== 'task' || !h.done);
  const routines = habits.filter(h => h.type === 'routine' && h.time).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  const allDone = dailies.length > 0 && dailies.every(h => h.completedToday);

  const addHabit = (h) => setAppState(s => ({ ...s, habits: [...(s.habits || []), h] }));

  const toggleHabit = (id) => setAppState(s => {
    const before = (s.habits || []).filter(h => h.type !== 'task').every(h => h.completedToday);
    let bonusFired = false;
    const habits = (s.habits || []).map(h => {
      if (h.id !== id) return h;
      const now = !h.completedToday;
      return { ...h, completedToday: now,
        streak: now ? (h.streak || 0) + 1 : Math.max(0, (h.streak || 0) - 1),
        completedDates: now ? [...(h.completedDates || []), todayStr()] : (h.completedDates || []).filter(d => d !== todayStr()) };
    });
    const toggled = habits.find(h => h.id === id);
    // Recompensa por racha de 7 en un hábito
    let extraRyo = 0;
    if (toggled && toggled.completedToday && toggled.streak > 0 && toggled.streak % 7 === 0) {
      extraRyo = 60; bonusFired = true;
      setTimeout(() => { pushNotif?.(`🌳 ¡${toggled.name} lleva ${toggled.streak} días! Cofre pequeño: +60 empanadas`); onCoinBurst?.(60); }, 300);
    }
    // Día perfecto (todos completados)
    const afterAll = habits.filter(h => h.type !== 'task').length > 0 && habits.filter(h => h.type !== 'task').every(h => h.completedToday);
    let xpBonus = 0;
    if (afterAll && !before) { xpBonus = 50; setTimeout(() => pushNotif?.('¡Día perfecto! +50 XP · todos tus hábitos completados'), bonusFired ? 900 : 300); }
    return { ...s, habits, ryo: (s.ryo || 0) + extraRyo, xp: (s.xp || 0) + xpBonus };
  });

  const nowHM = (() => { const d = new Date(); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; })();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ flex: 1, fontSize: 10, color: C.textMuted, fontWeight: 800, letterSpacing: 1.5 }}>SANCTUARIO DE HÁBITOS</div>
        <button onClick={() => { FX.play('tap'); setShowAdd(true); }} style={{ background: `${C.accent}18`, border: `1px solid ${C.accent}40`, color: C.accent,
          borderRadius: 10, padding: '7px 13px', fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
          + Agregar
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {[{ id: 'habitos', t: '🌱 Mis Hábitos' }, { id: 'rutina', t: '📋 Mi Rutina' }].map(t => (
          <button key={t.id} onClick={() => setSubTab(t.id)} style={{ flex: 1, padding: '9px 0', borderRadius: 11, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700,
            background: subTab === t.id ? C.accent : 'rgba(255,255,255,0.04)', color: subTab === t.id ? '#fff' : C.textMuted, border: `1px solid ${subTab === t.id ? C.accent : C.border}` }}>{t.t}</button>
        ))}
      </div>

      {habits.length === 0 ? (
        <div style={{ borderRadius: 18, padding: '30px 20px', textAlign: 'center', border: `1px dashed ${C.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <PlantSVG streak={3} color={C.accent} size={54} />
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.textMid }}>Tu jardín está vacío</div>
          <div style={{ fontSize: 12, color: C.textMuted, maxWidth: 220, lineHeight: 1.5 }}>Crea tu primer hábito y míralo crecer cada día que lo cumplas.</div>
          <button onClick={() => setShowAdd(true)} style={{ marginTop: 4, background: C.accent, border: 'none', color: '#fff', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>Crear hábito</button>
        </div>
      ) : subTab === 'habitos' ? (
        <div style={{ position: 'relative' }}>
          {allDone && [0, 1, 2, 3, 4].map(k => (
            <span key={k} style={{ position: 'absolute', top: '10%', left: `${12 + k * 19}%`, fontSize: 10, pointerEvents: 'none', animation: `jardinFloat ${2 + k * 0.4}s ease-out ${k * 0.5}s infinite` }}>✨</span>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {dailies.map(h => <HabitCard key={h.id} C={C} habit={h} onToggle={toggleHabit} />)}
          </div>
          {allDone && <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 800, color: C.tealMid, marginTop: 12 }}>🌟 Jardín completo · ¡día perfecto!</div>}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {routines.length === 0 ? (
            <div style={{ fontSize: 12.5, color: C.textMuted, textAlign: 'center', padding: '24px 0' }}>Sin rutinas con hora. Agrega una del tipo "Rutina con hora".</div>
          ) : routines.map((h, i) => {
            const isCurrent = !h.completedToday && (i === routines.length - 1 || routines[i + 1].time > nowHM) && h.time <= nowHM;
            const isPast = h.completedToday;
            return (
              <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12,
                background: isPast ? `${C.tealMid}12` : isCurrent ? `${h.color}12` : 'transparent',
                border: isCurrent ? `1.5px solid ${h.color}55` : '1px solid transparent',
                animation: isCurrent ? 'syncGlow 2.4s ease-in-out infinite' : 'none' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, width: 44, fontVariantNumeric: 'tabular-nums' }}>{h.time}</div>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: `${h.color}1E`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PkIc n={h.icon} s={15} c={h.color} />
                </div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: isPast ? C.textMuted : C.text, textDecoration: isPast ? 'line-through' : 'none' }}>{h.name}</div>
                <button onClick={() => toggleHabit(h.id)} style={{ width: 26, height: 26, borderRadius: '50%', cursor: 'pointer', flexShrink: 0,
                  background: isPast ? C.tealMid : 'transparent', border: `1.5px solid ${isPast ? C.tealMid : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isPast && <PkIc n="check" s={13} c="#06231C" />}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {showAdd && <AddHabitModal C={C} onAdd={addHabit} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

// ── Sección 6: Notas del libro (colapsable) ──
function NotasColapsable({ C, isLight, notes, user, appState, partnerPhotoURL, noteText, setNoteText, onAddNote, onReactNote, forceOpen, onConsumeForceOpen }) {
  const recent = notes.length && (Date.now() - (notes[notes.length - 1].ts || 0) < 7200000);
  const [open, setOpen] = useState(notes.length >= 5 || recent);
  const scrollRef = useRef(null);
  useEffect(() => { if (forceOpen) { setOpen(true); onConsumeForceOpen?.(); setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100); } }, [forceOpen]);
  const shown = notes.slice(-8);
  const REACTIONS = ['❤️', '😮', '💡', '🔥', '👏'];
  const [pickerFor, setPickerFor] = useState(null);

  return (
    <div ref={scrollRef}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '4px 2px' }}>
        <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 800, letterSpacing: 1.5, flex: 1, textAlign: 'left' }}>
          NOTAS DEL LIBRO {notes.length > 0 && <span style={{ color: C.accent }}>· {notes.length}</span>}
        </span>
        <PkIc n={open ? 'left' : 'right'} s={14} c={C.textMuted} sw={2} />
      </button>
      <div style={{ maxHeight: open ? 460 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <div style={{ maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, padding: '10px 2px', WebkitOverflowScrolling: 'touch' }}>
          {shown.length === 0 ? (
            <div style={{ textAlign: 'center', color: C.textMuted, fontSize: 12.5, padding: '20px 0' }}>Aún no hay notas. Escribe la primera ✍️</div>
          ) : shown.map(n => {
            const isMe = n.who === user?.code || n.who === 'you';
            const reactions = n.reactions || {};
            const reactKeys = Object.keys(reactions).filter(k => reactions[k]);
            return (
              <div key={n.id} style={{ display: 'flex', flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8 }}>
                <Av name={n.whoName || (isMe ? user?.name : '?')} sz={26} C={C} color={isMe ? C.accent : C.blueMid} photoURL={isMe ? appState.photoURL : partnerPhotoURL} style={{ flexShrink: 0 }} />
                <div style={{ maxWidth: '76%', position: 'relative' }}>
                  <div onClick={() => setPickerFor(pickerFor === n.id ? null : n.id)} style={{ cursor: 'pointer',
                    background: isMe ? `${C.accent}1E` : 'rgba(255,255,255,0.05)', border: `1px solid ${isMe ? C.accent + '2E' : C.border}`,
                    borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px', padding: '9px 12px' }}>
                    <div style={{ fontSize: 13, lineHeight: 1.5, color: C.text }}>{n.text}</div>
                  </div>
                  {reactKeys.length > 0 && (
                    <div style={{ display: 'flex', gap: 3, marginTop: 3, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                      {reactKeys.map(k => <span key={k} style={{ fontSize: 11, background: C.bgAlt, borderRadius: 8, padding: '1px 5px', border: `1px solid ${C.border}` }}>{k}</span>)}
                    </div>
                  )}
                  {pickerFor === n.id && (
                    <div style={{ position: 'absolute', bottom: '100%', [isMe ? 'right' : 'left']: 0, marginBottom: 4, display: 'flex', gap: 2, background: C.bgAlt,
                      border: `1px solid ${C.border}`, borderRadius: 99, padding: '4px 6px', zIndex: 5, boxShadow: '0 6px 18px rgba(0,0,0,0.4)' }}>
                      {REACTIONS.map(e => (
                        <button key={e} onClick={() => { onReactNote?.(n.id, e); setPickerFor(null); FX.play('tap'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, padding: '2px 3px' }}>{e}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Input compacto */}
        <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
          <input value={noteText} onChange={e => setNoteText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') onAddNote(); }}
            placeholder="Escribe una nota…" style={{ flex: 1, fontSize: 13.5, padding: '11px 14px', borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontFamily: 'inherit' }} />
          <button onClick={onAddNote} style={{ width: 44, height: 44, borderRadius: 12, background: C.accent, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <PkIc n="right" s={18} c="#fff" sw={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
//  PERGAMINOS TAB — El Sanctuario del Lector (orquestador)
// ═════════════════════════════════════════════════════════════
function PergaminosTab({ C, isLight, appState, setAppState, user, books, setBooks, onAddBook, onConfirm, partnerOnline, partnerPhotoURL, pushNotif, onCoinBurst, onAchievement, notes, noteText, setNoteText, onAddNote, onReactNote, onRemindPartner }) {
  const [showAdd, setShowAdd] = useState(false);
  const [nb, setNb] = useState({ title: '', author: '', totalChapters: 10, totalPages: 0, genre: 'Ficción' });
  const [myReading, setMyReading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const partner = user?.partner || 'Parcero';
  const currentBook = books.find(b => b.id === appState.currentBookId) || null;
  const otherBooks = books.filter(b => b.id !== appState.currentBookId);
  const myPct = (() => {
    if (!currentBook) return 0;
    const tPage = currentBook.totalPages || 0, cPage = appState.currentPage || 1;
    const tChap = currentBook.totalChapters || 10, cChap = appState.currentChapter || 1;
    return tPage > 0 ? Math.min(100, Math.round((cPage / tPage) * 100)) : Math.min(100, Math.round((cChap / tChap) * 100));
  })();

  const doAdd = () => {
    if (!nb.title.trim()) return;
    onAddBook({ ...nb, totalChapters: parseInt(nb.totalChapters) || 10, totalPages: parseInt(nb.totalPages) || 0 });
    setNb({ title: '', author: '', totalChapters: 10, totalPages: 0, genre: 'Ficción' });
    setShowAdd(false);
  };

  return (
    <div className="fi su" style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative' }}>
      {/* Atmósfera de biblioteca nocturna */}
      <div style={{ position: 'absolute', top: -20, left: -20, right: -20, height: 320, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(74,158,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 80% 40% at 20% 100%, rgba(34,197,94,0.05) 0%, transparent 55%)' }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* 1. Dúo de lectura activa */}
        <DuoReadingHeader C={C} user={user} partner={partner} appState={appState} partnerOnline={partnerOnline} partnerPhotoURL={partnerPhotoURL} myReading={myReading} />

        {/* 2. Tu libro */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ flex: 1, fontSize: 10, color: C.textMuted, fontWeight: 800, letterSpacing: 1.5 }}>TU LIBRO</div>
            <button onClick={() => setShowAdd(v => !v)} style={{ background: showAdd ? 'transparent' : `${C.accent}18`, color: showAdd ? C.textMuted : C.accent,
              border: `1px solid ${showAdd ? C.border : C.accent + '40'}`, borderRadius: 10, padding: '6px 13px', fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              {showAdd ? 'Cancelar' : '+ Añadir'}
            </button>
          </div>

          {showAdd && (
            <div style={{ borderRadius: 18, padding: '20px 18px', background: C.bgAlt, border: `1px solid ${C.border}`, marginBottom: 16, animation: 'fadeUp 0.3s ease both' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                <BookCover book={{ ...nb, title: nb.title || 'Nuevo Libro', author: nb.author || 'Autor' }} size="md" />
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                {GENRES.map(g => (
                  <button key={g} onClick={() => setNb(b => ({ ...b, genre: g }))} style={{ padding: '5px 11px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    border: `1px solid ${nb.genre === g ? C.accent : C.border}`, background: nb.genre === g ? `${C.accent}18` : 'transparent', color: nb.genre === g ? C.accent : C.textMuted, fontFamily: 'inherit' }}>{g}</button>
                ))}
              </div>
              {[{ label: 'TÍTULO *', key: 'title', ph: 'Nombre del libro…' }, { label: 'AUTOR', key: 'author', ph: 'Nombre del autor…' }].map(({ label, key, ph }) => (
                <div key={key} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 6, fontWeight: 800, letterSpacing: 1.2 }}>{label}</div>
                  <input value={nb[key]} onChange={e => setNb(b => ({ ...b, [key]: e.target.value }))} placeholder={ph}
                    style={{ width: '100%', fontSize: 15, padding: '10px 0', border: 'none', borderBottom: `1px solid ${C.border}`, background: 'transparent', color: C.text, fontFamily: 'inherit' }} />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
                {[{ label: 'CAPÍTULOS', key: 'totalChapters' }, { label: 'PÁGINAS (0=sin límite)', key: 'totalPages' }].map(({ label, key }) => (
                  <div key={key} style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 6, fontWeight: 800, letterSpacing: 1.1 }}>{label}</div>
                    <input type="number" value={nb[key]} onChange={e => setNb(b => ({ ...b, [key]: e.target.value }))}
                      style={{ width: '100%', fontSize: 20, fontWeight: 700, padding: '8px 0', textAlign: 'center', border: 'none', borderBottom: `1px solid ${C.border}`, background: 'transparent', color: C.text, fontFamily: 'inherit' }} />
                  </div>
                ))}
              </div>
              <PrimaryBtn C={C} onClick={doAdd}>Guardar en los Pergaminos</PrimaryBtn>
            </div>
          )}

          {!currentBook ? (
            <div style={{ borderRadius: 20, padding: '36px 24px', textAlign: 'center', border: `1px dashed ${C.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <PkIc n="book" s={32} c={C.textMuted} />
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textMid }}>Sin libro activo</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>Usa "+ Añadir" para empezar tu lectura</div>
            </div>
          ) : (
            <>
              <LibroHero C={C} book={currentBook} pct={myPct} dimmed={myReading} />
              <div style={{ marginTop: -2, borderRadius: '0 0 20px 20px', background: 'rgba(0,0,0,0.28)', border: `1px solid ${C.border}`, borderTop: 'none', padding: '4px 18px 20px', marginLeft: 2, marginRight: 2 }}>
                <ProgresoLibro C={C} appState={appState} setAppState={setAppState} book={currentBook} onSeal={onConfirm} />
              </div>
            </>
          )}
        </div>

        {/* 3. Cafetal de Enfoque */}
        {currentBook && (
          <CafetalRitual C={C} appState={appState} setAppState={setAppState} pushNotif={pushNotif} currentBook={currentBook} setBooks={setBooks}
            onCoinBurst={onCoinBurst} onAchievement={onAchievement} user={user} onReadingChange={setMyReading} partnerName={partner} partnerPhoto={partnerPhotoURL} />
        )}

        {/* 4. El libro del parcero */}
        <LibroParcero C={C} isLight={isLight} appState={appState} partner={partner} partnerOnline={partnerOnline} partnerPhotoURL={partnerPhotoURL}
          myBook={currentBook} notes={notes} user={user} onRemind={onRemindPartner} onOpenChat={() => setChatOpen(true)} />

        {/* 5. Sanctuario de hábitos */}
        <SanctuarioHabitos C={C} appState={appState} setAppState={setAppState} pushNotif={pushNotif} onCoinBurst={onCoinBurst} />

        {/* Biblioteca (otros libros) */}
        {otherBooks.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 10, fontWeight: 800, letterSpacing: 1.5 }}>EN LA BIBLIOTECA · {otherBooks.length}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {otherBooks.map(book => (
                <button key={book.id} onClick={() => setAppState(s => ({ ...s, currentBookId: book.id, currentChapter: 1, currentPage: 1, yourProgress: 0 }))}
                  style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', borderRadius: 14, background: C.bgAlt, border: `1px solid ${C.border}`, fontFamily: 'inherit', textAlign: 'left' }}>
                  <BookCover book={book} size="sm" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                    <div style={{ fontSize: 11.5, color: C.textMuted }}>{book.author || 'Autor desconocido'}</div>
                  </div>
                  <PkIc n="right" s={14} c={C.border} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 6. Notas del libro (colapsable) */}
        <NotasColapsable C={C} isLight={isLight} notes={notes} user={user} appState={appState} partnerPhotoURL={partnerPhotoURL}
          noteText={noteText} setNoteText={setNoteText} onAddNote={onAddNote} onReactNote={onReactNote}
          forceOpen={chatOpen} onConsumeForceOpen={() => setChatOpen(false)} />
      </div>
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
// ═════════════════════════════════════════════
//  TERRITORIO DEL SABER — Dominio, Estrella y Modos
// ═════════════════════════════════════════════
const SUBJECT_LEVELS = [
  { min: 93, name: 'Sabio',        color: '#FFD75E' },
  { min: 85, name: 'Maestro',      color: '#E8B84B' },
  { min: 74, name: 'Investigador', color: '#A78BFA' },
  { min: 62, name: 'Analista',     color: '#4FA8C9' },
  { min: 50, name: 'Rastreador',   color: '#AEB8C2' },
  { min: 35, name: 'Aprendiz',     color: '#CD7F32' },
  { min: 0,  name: 'Novato',       color: '#8A9590' },
];
const nivelMateria = (pct, t) => {
  if (!t || t < 6) return { ...SUBJECT_LEVELS[6], idx: 0, sinDatos: true };
  const i = SUBJECT_LEVELS.findIndex(l => pct >= l.min);
  return { ...SUBJECT_LEVELS[i], idx: SUBJECT_LEVELS.length - 1 - i, sinDatos: false };
};

// Acumulado por materia: simulacros clásicos + modos de juego
function dominioPorMateria(appState) {
  const acc = {};
  Object.keys(SUBJECT_META).forEach(s => { acc[s] = { c: 0, t: 0 }; });
  (appState.icfesHistory || []).forEach(r => Object.entries(r.subjectScores || {}).forEach(([s, v]) => {
    if (!acc[s]) acc[s] = { c: 0, t: 0 };
    acc[s].c += v.correct || 0; acc[s].t += v.total || 0;
  }));
  Object.entries(appState.modeStats || {}).forEach(([s, v]) => {
    if (!acc[s]) acc[s] = { c: 0, t: 0 };
    acc[s].c += v.c || 0; acc[s].t += v.t || 0;
  });
  const out = {};
  Object.entries(acc).forEach(([s, v]) => {
    const pct = v.t > 0 ? Math.round((v.c / v.t) * 100) : 0;
    out[s] = { ...v, pct, lvl: nivelMateria(pct, v.t) };
  });
  return out;
}

// Registrar respuestas de los modos (alimenta Estrella + debilidades)
function acumularRespuestas(setAppState, pares) {
  if (!pares || !pares.length) return;
  setAppState(s => {
    const modeStats = { ...(s.modeStats || {}) };
    const weakStats = { ...(s.weakStats || {}) };
    pares.forEach(({ subject, nivel, ok }) => {
      const m = modeStats[subject] || { c: 0, t: 0 };
      modeStats[subject] = { c: m.c + (ok ? 1 : 0), t: m.t + 1 };
      const k = `${subject}·${nivel || 'General'}`;
      const w = weakStats[k] || { c: 0, t: 0 };
      weakStats[k] = { c: w.c + (ok ? 1 : 0), t: w.t + 1 };
    });
    return { ...s, modeStats, weakStats };
  });
}

// Solo debilidades (el simulacro clásico ya cuenta dominio vía icfesHistory)
function acumularRespuestasWeak(setAppState, pares) {
  if (!pares || !pares.length) return;
  setAppState(s => {
    const weakStats = { ...(s.weakStats || {}) };
    pares.forEach(({ subject, nivel, ok }) => {
      const k = `${subject}·${nivel || 'General'}`;
      const w = weakStats[k] || { c: 0, t: 0 };
      weakStats[k] = { c: w.c + (ok ? 1 : 0), t: w.t + 1 };
    });
    return { ...s, weakStats };
  });
}

// La competencia más floja (≥4 intentos, bajo 65%)
function detectarDebilidad(appState) {
  const entries = Object.entries(appState.weakStats || {}).filter(([, v]) => v.t >= 4);
  if (!entries.length) return null;
  const peor = entries
    .map(([k, v]) => ({ k, pct: Math.round((v.c / v.t) * 100) }))
    .sort((a, b) => a.pct - b.pct)[0];
  if (!peor || peor.pct >= 65) return null;
  const [subject, nivel] = peor.k.split('·');
  return { subject, nivel, pct: peor.pct };
}

// Predicción del Sabio: promedio reciente + tendencia
function prediccionSabio(history) {
  if (!history || history.length < 2) return null;
  const scores = history.slice(-6).map(r => r.score || 0);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const mitad = Math.ceil(scores.length / 2);
  const avgViejo = scores.slice(0, mitad).reduce((a, b) => a + b, 0) / mitad;
  const avgNuevo = scores.slice(-mitad).reduce((a, b) => a + b, 0) / mitad;
  const centro = avg + (avgNuevo - avgViejo) * 0.6;
  return {
    lo: Math.max(0, Math.round((centro - 25) / 5) * 5),
    hi: Math.min(500, Math.round((centro + 25) / 5) * 5),
    sube: avgNuevo - avgViejo >= 5,
  };
}

// ── TU ESTRELLA DEL SABER (radar pentagonal) ──
function EstrellaSaber({ C, dominio, pred }) {
  const [viva, setViva] = useState(false);
  useEffect(() => { const t = setTimeout(() => setViva(true), 180); return () => clearTimeout(t); }, []);
  const mats = Object.keys(SUBJECT_META);
  const cx = 105, cy = 92, R = 70;
  const punto = (i, r) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const vertice = (s) => Math.max(0.08, (dominio[s]?.pct || 0) / 100);
  const poly = mats.map((s, i) => punto(i, R * (viva ? vertice(s) : 0.06)).map(n => n.toFixed(1)).join(',')).join(' ');
  const conDatos = mats.some(s => !dominio[s]?.lvl?.sinDatos);

  // Mejor y peor materia (para la estrella y la alerta en los badges)
  const conPct = mats.filter(s => !dominio[s]?.lvl?.sinDatos);
  const mejor = conPct.length >= 2 ? conPct.reduce((a, b) => (dominio[a].pct >= dominio[b].pct ? a : b)) : null;
  const peor  = conPct.length >= 2 ? conPct.reduce((a, b) => (dominio[a].pct <= dominio[b].pct ? a : b)) : null;

  const midPred = pred ? Math.round((pred.lo + pred.hi) / 2) : 0;
  const predLevel = pred ? getPerfLevel(midPred) : null;

  return (
    <div>
      {/* 1. EL RADAR */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="210" height="188" viewBox="0 0 210 188" style={{ overflow: 'visible' }}>
          {[1, 0.66, 0.33].map((f, k) => (
            <polygon key={k} points={mats.map((s, i) => punto(i, R * f).map(n => n.toFixed(1)).join(',')).join(' ')}
              fill="none" stroke={C.border} strokeWidth="1" opacity="0.7"/>
          ))}
          {mats.map((s, i) => {
            const [x2, y2] = punto(i, R);
            return <line key={s} x1={cx} y1={cy} x2={x2} y2={y2} stroke={C.border} strokeWidth="1" opacity="0.5"/>;
          })}
          <polygon points={poly} fill={`${C.accent}2E`} stroke={C.accent} strokeWidth="2" strokeLinejoin="round"
            style={{ transition: 'all 1.1s cubic-bezier(0.22,1,0.36,1)', filter: `drop-shadow(0 0 10px ${C.accent}50)` }}/>
          {mats.map((s, i) => {
            const meta = SUBJECT_META[s];
            const d = dominio[s];
            const [px, py] = punto(i, R * (viva ? vertice(s) : 0.06));
            const [lx, ly] = punto(i, R + 18);
            return (
              <g key={s}>
                <circle cx={px} cy={py} r="3.6" fill={meta.color}
                  style={{ transition: 'all 1.1s cubic-bezier(0.22,1,0.36,1)', filter: `drop-shadow(0 0 4px ${meta.color})` }}/>
                <text x={lx} y={ly} textAnchor="middle" fontSize="10" fontWeight="800" fill={meta.color}>{meta.short}</text>
                {/* La etiqueta muestra el % además de la sigla */}
                <text x={lx} y={ly + 11} textAnchor="middle" fontSize="8" fontWeight="700"
                  fill={d?.lvl?.sinDatos ? C.textMuted : meta.color} opacity="0.8">
                  {d?.lvl?.sinDatos ? '—' : `${d.pct}%`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {!conDatos && (
        <div style={{ textAlign: 'center', fontSize: 11, color: C.textMuted, marginTop: 4, marginBottom: 8 }}>
          Haz simulacros para revelar tu estrella
        </div>
      )}

      {/* 2. EL SABIO PREDICE — protagonista */}
      {pred ? (
        <div style={{ marginTop: 12, borderRadius: 18, padding: '16px 18px',
          background: `${predLevel.color}10`, border: `1px solid ${predLevel.color}30` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <PkIc n="sabio" s={16} c={predLevel.color}/>
            <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: 2, color: predLevel.color }}>EL SABIO PREDICE</span>
            {pred.sube && <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 900, color: '#3DA873' }}>↑ en ascenso</span>}
          </div>
          <div style={{ fontSize: 12, color: C.textMid, marginBottom: 12 }}>Si haces un simulacro ahora mismo:</div>
          {/* Barra de rango con los números en los extremos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: predLevel.color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{pred.lo}</span>
            <div style={{ flex: 1 }}>
              <div style={{ height: 9, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0,
                  left: `${(pred.lo / 500) * 100}%`, width: `${((pred.hi - pred.lo) / 500) * 100}%`,
                  borderRadius: 99, background: `linear-gradient(90deg, ${predLevel.color}88, ${predLevel.color})`,
                  boxShadow: `0 0 10px ${predLevel.color}66` }}/>
              </div>
              <div style={{ textAlign: 'center', fontSize: 9.5, fontWeight: 700, color: C.textMuted, marginTop: 5 }}>
                puntos de 500 · {Math.round((pred.lo / 500) * 100)}–{Math.round((pred.hi / 500) * 100)}%
              </div>
            </div>
            <span style={{ fontSize: 26, fontWeight: 900, color: predLevel.color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{pred.hi}</span>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 12, borderRadius: 18, padding: '14px 18px', textAlign: 'center',
          background: 'rgba(255,255,255,0.04)', border: `1px dashed ${C.border}` }}>
          <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>
            Completa al menos 2 simulacros y el Sabio podrá leer tu destino.
          </div>
        </div>
      )}

      {/* 3. BADGES DE NIVEL POR MATERIA (scroll horizontal) */}
      <div style={{ display: 'flex', gap: 7, marginTop: 12, overflowX: 'auto', paddingBottom: 4,
        WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        {mats.map(s => {
          const d = dominio[s]; const meta = SUBJECT_META[s];
          const esMejor = s === mejor && !d.lvl.sinDatos;
          const esPeor  = s === peor && !d.lvl.sinDatos && mejor !== peor;
          return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', borderRadius: 99,
              flexShrink: 0, background: `${meta.color}15`, border: `1px solid ${meta.color}` }}>
              <span style={{ fontSize: 10, fontWeight: 900, color: meta.color }}>{meta.short}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: meta.color }}>
                {d.lvl.sinDatos ? 'Sin datos' : `${d.lvl.name} ${d.pct}%`}
              </span>
              {esMejor && <PkIc n="star" s={10} c="#FFD75E"/>}
              {esPeor && <PkIc n="target" s={10} c="#EF4444"/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── GRÁFICA DE EVOLUCIÓN (área, tooltip, promedio nacional) ──
function EvolucionChart({ C, history }) {
  const [tip, setTip] = useState(null); // índice del punto tocado
  const items = (history || []).slice(-10);
  const data = items.map(r => r.score || 0);
  if (data.length < 2) return null;
  const W = 320, H = 118, P = 16;
  const min = Math.min(...data), max = Math.max(...data);
  // Incluir siempre el promedio nacional (300) en el rango para dar contexto
  const lo = Math.max(0, Math.min(min - 25, 280));
  const hi = Math.min(500, Math.max(max + 25, 320));
  const x = i => P + (i * (W - 2 * P)) / (data.length - 1);
  const y = v => H - P - ((v - lo) / Math.max(1, hi - lo)) * (H - 2 * P);
  const pts = data.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  // Delta contra el simulacro ANTERIOR (no contra el primero)
  const delta = data[data.length - 1] - data[data.length - 2];
  const col = '#F97316';
  const deltaCol = delta >= 0 ? '#3DA873' : '#EF4444';
  const yNac = y(300);
  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 20, padding: '14px 16px 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 800, letterSpacing: 1.8 }}>EVOLUCIÓN</span>
        <span style={{ fontSize: 9.5, color: C.textMuted, fontWeight: 600 }}>últimos {data.length}</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 900, color: deltaCol, background: `${deltaCol}16`,
          borderRadius: 99, padding: '2px 10px' }}>
          {delta >= 0 ? '+' : ''}{delta} pts vs anterior
        </span>
      </div>
      <div style={{ position: 'relative' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block', overflow: 'visible' }}
          onClick={() => setTip(null)}>
          <defs>
            <linearGradient id="evoArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={col} stopOpacity="0.16"/>
              <stop offset="100%" stopColor={col} stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* Grid horizontal sutil */}
          {[0.25, 0.5, 0.75].map(f => (
            <line key={f} x1={P} x2={W - P} y1={P + f * (H - 2 * P)} y2={P + f * (H - 2 * P)}
              stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          ))}
          {/* Promedio nacional */}
          <line x1={P} x2={W - P} y1={yNac} y2={yNac} stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="4 4"/>
          <text x={W - P} y={yNac - 4} textAnchor="end" fontSize="8" fontWeight="700" fill={C.textMuted}>Promedio Nacional · 300</text>
          {/* Área bajo la línea */}
          <polygon points={`${pts} ${x(data.length - 1).toFixed(1)},${H - P} ${x(0).toFixed(1)},${H - P}`} fill="url(#evoArea)"/>
          <polyline points={pts} fill="none" stroke={col} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Puntos: rellenos con borde blanco, tocables */}
          {data.map((v, i) => (
            <g key={i} onClick={e => { e.stopPropagation(); setTip(tip === i ? null : i); }} style={{ cursor: 'pointer' }}>
              <circle cx={x(i)} cy={y(v)} r="10" fill="transparent"/>
              <circle cx={x(i)} cy={y(v)} r={i === data.length - 1 ? 4 : 3} fill={col} stroke="#fff" strokeWidth="1.6"
                style={i === data.length - 1 ? { filter: `drop-shadow(0 0 5px ${col})` } : undefined}/>
            </g>
          ))}
        </svg>
        {/* Tooltip del punto tocado */}
        {tip !== null && (
          <div className="fi" style={{ position: 'absolute',
            left: `${Math.min(78, Math.max(4, (x(tip) / W) * 100 - 11))}%`, top: `${(y(data[tip]) / H) * 100 - 8}%`,
            transform: 'translateY(-100%)', background: C.bgAlt, border: `1px solid ${C.border}`,
            borderRadius: 10, padding: '6px 11px', boxShadow: '0 8px 22px rgba(0,0,0,0.45)', pointerEvents: 'none' }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: getPerfLevel(data[tip]).color, lineHeight: 1.1 }}>{data[tip]}</div>
            <div style={{ fontSize: 9, color: C.textMuted, whiteSpace: 'nowrap' }}>{items[tip]?.date || `#${tip + 1}`}</div>
          </div>
        )}
      </div>
      <div style={{ fontSize: 9.5, color: C.textMuted, fontWeight: 700, marginTop: 4 }}>
        {data.length} simulacros completados
      </div>
    </div>
  );
}

// ── Tarjeta compartida de pregunta rápida (modos) ──
// ── Render rico compacto para los modos (fórmulas, exponentes, negritas) ──
function richLite(text) {
  if (!text) return null;
  const clean = String(text).replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/\^4/g, '⁴').replace(/\^n/g, 'ⁿ');
  const lines = clean.split('\n');
  return lines.map((line, li) => {
    const mathParts = line.split('`');
    const rendered = mathParts.map((mp, mi) => {
      if (mi % 2 !== 0) {
        return (
          <span key={mi} style={{ fontFamily: "'Noto Serif JP', monospace", background: 'rgba(255,255,255,0.08)',
            padding: '1px 7px', borderRadius: 6, color: '#FBBF24', fontWeight: 700, fontSize: '1.04em',
            letterSpacing: 0.4, margin: '0 3px' }}>{mp}</span>
        );
      }
      const bolds = mp.split('**');
      return bolds.map((bp, bi) => bi % 2 !== 0
        ? <strong key={`${mi}-${bi}`} style={{ fontWeight: 900 }}>{bp}</strong>
        : <span key={`${mi}-${bi}`}>{bp}</span>);
    });
    return <React.Fragment key={li}>{rendered}{li < lines.length - 1 && <br/>}</React.Fragment>;
  });
}

// ── Preguntas del Sabio (Gemini) para los modos de juego ──
// Cada partida pide preguntas NUEVAS a la IA (con banco local de emergencia si falla).
function useAIQuestions({ count = 10, compact = false, dificultad = null } = {}) {
  const [ready, setReady] = useState(false);
  const poolRef = useRef([]);                 // preguntas frescas de la IA
  const fallbackRef = useRef(seededShuffle(ICFES_QUESTIONS, hashStr('modo' + Date.now())));
  const fbIdxRef = useRef(0);
  const fetchingRef = useRef(false);

  const pedir = (n, opts2 = {}) => {
    if (fetchingRef.current) return Promise.resolve();
    fetchingRef.current = true;
    return fetchGeminiQuestions(Object.keys(SUBJECT_META), n, { compact, dificultad, ...opts2 })
      .then(qs => {
        if (Array.isArray(qs)) {
          poolRef.current.push(...qs.filter(q => q && q.text && Array.isArray(q.options) && typeof q.correct === 'number'));
        }
      })
      .catch(() => {})
      .finally(() => { fetchingRef.current = false; });
  };

  useEffect(() => {
    let alive = true;
    const done = () => { if (alive) setReady(true); };
    // Máximo 14s de espera: si la IA no responde, arranca con el banco local
    const timeout = setTimeout(done, 14000);
    pedir(count).then(() => { clearTimeout(timeout); done(); });
    return () => { alive = false; clearTimeout(timeout); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Siguiente pregunta: primero IA fresca (filtrando por materia si se pide), luego banco local
  const next = (subject = null) => {
    const pool = poolRef.current;
    let idx = -1;
    if (subject) idx = pool.findIndex(q => q.subject === subject);
    if (idx < 0 && !subject && pool.length > 0) idx = 0;
    if (idx >= 0) return pool.splice(idx, 1)[0];
    // banco local de emergencia
    const fb = fallbackRef.current;
    if (subject) {
      const delSubj = fb.filter(q => q.subject === subject);
      if (delSubj.length) return delSubj[Math.floor(Math.random() * delSubj.length)];
    }
    fbIdxRef.current += 1;
    return fb[fbIdxRef.current % fb.length];
  };

  const quedan = () => poolRef.current.length;
  return { ready, next, pedirMas: pedir, quedan };
}

// Pantalla de carga de un modo mientras el Sabio teje preguntas nuevas
function ModoCargando({ color, titulo }) {
  const FRASES = ['El Sabio teje preguntas nuevas…', 'Nada de recicladas: todo fresco…', 'Afinando el nivel de dificultad…', 'Ya casi, no se me desespere…'];
  const [i, setI] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setI(x => (x + 1) % FRASES.length), 2600);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div style={{ position: 'relative', width: 84, height: 84, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `3px dashed ${color}55`, animation: 'spin 4s linear infinite' }}/>
        <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: `2px solid transparent`, borderTopColor: color, animation: 'spin 1.2s linear infinite' }}/>
        <PkIc n="rana" s={34} c={color}/>
      </div>
      <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color }}>{titulo}</div>
      <div key={i} style={{ fontSize: 13, color: 'rgba(245,242,235,0.65)', fontStyle: 'italic', animation: 'fadeUp 0.4s ease both' }}>
        {FRASES[i]}
      </div>
    </div>
  );
}

// ── Contador animado: el número sube contando ──
function useCountUp(target, duration = 1000) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const val = Number(target) || 0;
    if (val === 0) { setDisplay(0); return undefined; }
    const start = Date.now();
    let raf;
    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setDisplay(Math.floor(progress * val));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return display;
}

// ── Compartir por WhatsApp ──
const shareWhatsApp = (text) => {
  try { window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank'); } catch (e) {}
};

function PreguntaRapida({ q, sel, reveal, onPick }) {
  const meta = SUBJECT_META[q.subject] || {};
  return (
    <>
      {q.context && <IcfesVisualContext context={q.context} />}
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 15, padding: '13px 14px', marginBottom: 11 }}>
        <div style={{ display: 'inline-block', padding: '2.5px 9px', borderRadius: 99, marginBottom: 8,
          background: `${meta.color || '#888'}20`, fontSize: 10, fontWeight: 800, color: meta.color || '#aaa' }}>
          {q.subject}
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#F5F2EB', lineHeight: 1.55 }}>
          {richLite(q.text)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {q.options.map((op, i) => {
          const esC = i === q.correct, esMia = sel === i;
          let bg = 'rgba(255,255,255,0.05)', bd = 'rgba(255,255,255,0.11)', cl = '#F5F2EB';
          if (reveal) {
            if (esC) { bg = 'rgba(61,168,115,0.22)'; bd = '#3DA873'; cl = '#7EE2AE'; }
            else if (esMia) { bg = 'rgba(239,68,68,0.18)'; bd = '#EF4444'; cl = '#FCA5A5'; }
            else cl = 'rgba(245,242,235,0.4)';
          }
          return (
            <button key={i} onClick={() => onPick(i)} disabled={reveal} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%', padding: '11px 13px',
              background: bg, border: `1.5px solid ${bd}`, borderRadius: 13,
              cursor: reveal ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
              <span style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900,
                background: reveal && esC ? '#3DA873' : 'rgba(255,255,255,0.1)',
                color: reveal && esC ? '#fff' : cl }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: cl, lineHeight: 1.45, paddingTop: 1.5 }}>{richLite(op)}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

// ── Pantalla final compartida de los modos ──
function FinDeModo({ color, titulo, valor, unidad, esRecord, emp, xp, onOtra, onSalir, extra, shareText }) {
  const esNumero = typeof valor === 'number';
  const contado = useCountUp(esNumero ? valor : 0, 900);
  return (
    <div className="fi" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20 }}>
      {esRecord && (
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color: '#FFD75E', marginBottom: 10,
          animation: 'comboPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          ¡NUEVO RÉCORD!
        </div>
      )}
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: `${color}CC`, marginBottom: 6 }}>{titulo}</div>
      <div style={{ fontSize: 64, fontWeight: 900, color, lineHeight: 1, textShadow: `0 0 34px ${color}66`,
        fontVariantNumeric: 'tabular-nums',
        animation: 'popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        {esNumero ? contado : valor}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(245,242,235,0.65)', marginTop: 6 }}>{unidad}</div>
      {extra && <div style={{ fontSize: 12, color: 'rgba(245,242,235,0.55)', marginTop: 8 }}>{extra}</div>}
      {(emp > 0 || xp > 0) && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '9px 20px', borderRadius: 99,
          background: 'rgba(232,184,75,0.10)', border: '1px solid rgba(232,184,75,0.35)', margin: '18px 0 4px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 900, color: '#E8B84B' }}>
            <PkIc n="empanada" s={15} c="#E8B84B"/>+{emp}
          </span>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#A78BFA' }}>+{xp} XP</span>
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 320, marginTop: 20 }}>
        <button onClick={onOtra} style={{ flex: 1.3, padding: '15px', borderRadius: 15, border: 'none',
          background: `linear-gradient(135deg, ${color}, ${color}99)`, color: '#fff', fontSize: 14, fontWeight: 900,
          cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 6px 20px ${color}40` }}>
          Otra vez
        </button>
        <button onClick={onSalir} style={{ flex: 1, padding: '15px', borderRadius: 15,
          border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)',
          color: '#F5F2EB', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
          Salir
        </button>
      </div>
      {shareText && (
        <button onClick={() => { FX.play('tap'); shareWhatsApp(shareText); }} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', maxWidth: 320, marginTop: 10, padding: '13px', borderRadius: 15,
          border: '1px solid rgba(37,211,102,0.45)', background: 'rgba(37,211,102,0.12)',
          color: '#4ADE80', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
          <PkIc n="msg" s={15} c="#4ADE80"/> Compartir por WhatsApp
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  MODO CONTRARRELOJ — 60s, +5 por acierto, -3 por error
// ─────────────────────────────────────────────
function ModoContrarreloj({ C, appState, onTerminar, onOtra, onClose }) {
  const TOTAL = 10;              // 10 preguntas
  const T0 = 900;                // 90 segundos (en décimas)
  const NARANJA = '#F97316';
  const ai = useAIQuestions({ count: TOTAL + 2, compact: true, dificultad: 'Alta' });
  const [q, setQ] = useState(null);
  const [qi, setQi] = useState(0);
  const [tLeft, setTLeft] = useState(T0);
  const [fin, setFin] = useState(null);        // { score, rec }
  const [bonus, setBonus] = useState(null);    // { txt, key } bonus de cadena flotando
  const [revisar, setRevisar] = useState(false);
  const [abierta, setAbierta] = useState(null);
  const hitsRef = useRef(0);
  const chainRef = useRef(0);
  const answersRef = useRef([]);               // { q, sel, ok } para la revisión final
  const paresRef = useRef([]);
  const finRef = useRef(false);
  const usedRef = useRef(0);

  // Arranca cuando el Sabio entrega las preguntas nuevas
  useEffect(() => { if (ai.ready && !q && !finRef.current) setQ(ai.next()); }, [ai.ready]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (fin || !q) return undefined;
    const iv = setInterval(() => setTLeft(t => (t <= 1 ? 0 : t - 1)), 100);
    return () => clearInterval(iv);
  }, [fin, q]);

  useEffect(() => {
    if (tLeft === 0 && !fin && q) terminar();
    const secs = Math.ceil(tLeft / 10);
    if (tLeft > 0 && tLeft % 10 === 0 && secs <= 20) FX.play('tick');
    if (tLeft > 0 && tLeft % 10 === 5 && secs <= 10) FX.play('tick');
  }, [tLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  const responder = (i) => {
    if (fin || !q) return;
    const ok = i === q.correct;
    answersRef.current.push({ q, sel: i, ok });
    paresRef.current.push({ subject: q.subject, nivel: q.nivel, ok });
    if (ok) {
      hitsRef.current += 1;
      chainRef.current += 1;
      // CADENA DE ACIERTOS: 3 seguidas +5s · 5 seguidas +10s
      if (chainRef.current === 3)      { setTLeft(t => Math.min(t + 50, 999));  setBonus({ txt: '+5s',  key: Date.now() }); FX.play('coin'); FX.vibrate('success'); }
      else if (chainRef.current === 5) { setTLeft(t => Math.min(t + 100, 999)); setBonus({ txt: '+10s', key: Date.now() }); FX.play('levelUp'); FX.vibrate('success'); }
      else { FX.play('success'); FX.vibrate('light'); }
    } else {
      chainRef.current = 0;
      FX.play('error'); FX.vibrate('error');
    }
    // Transición inmediata — la explicación se guarda para el final
    if (qi + 1 >= TOTAL) { usedRef.current = T0 - tLeft; terminar(); }
    else { setQi(n => n + 1); setQ(ai.next()); }
  };

  const terminar = () => {
    if (finRef.current) return; finRef.current = true;
    if (!usedRef.current) usedRef.current = T0 - tLeft;
    const h = hitsRef.current;
    const score = Math.round((h / TOTAL) * 500);
    const rec = score > (appState.contrarrelojRecord || 0);
    setFin({ score, rec });
    if (rec) { FX.play('levelUp'); FX.vibrate('heavy'); } else { FX.play('duel'); }
    // Recompensa x1.5 por velocidad
    onTerminar({ tipo: 'contrarreloj', valor: score, pares: paresRef.current, emp: h * 6, xp: h * 12 });
  };

  const secs = Math.ceil(tLeft / 10);
  const arcColor = secs > 45 ? '#22C55E' : secs > 20 ? NARANJA : '#EF4444';
  const R = 94, CIRC = 2 * Math.PI * R;
  const pctT = tLeft / T0;
  const respondidas = answersRef.current.length;

  return (
    <Portal>
    <div style={{ position: 'fixed', inset: 0, zIndex: 99994, overflowY: 'auto', WebkitOverflowScrolling: 'touch',
      background: 'linear-gradient(180deg, #0A0600 0%, #140A02 50%, #0A0600 100%)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: 430, margin: '0 auto', padding: '20px 20px 34px', width: '100%', minHeight: '100%',
        display: 'flex', flexDirection: 'column' }}>

        {!ai.ready && !fin ? (
          <ModoCargando color={NARANJA} titulo="CONTRARRELOJ"/>
        ) : fin ? (
          <FinContrarreloj C={C} fin={fin} hits={hitsRef.current} total={TOTAL}
            secsLeft={secs} usedTenths={usedRef.current} respondidas={respondidas}
            record={Math.max(fin.score, appState.contrarrelojRecord || 0)}
            prevRecord={appState.contrarrelojRecord || 0}
            answers={answersRef.current}
            revisar={revisar} setRevisar={setRevisar} abierta={abierta} setAbierta={setAbierta}
            streakDays={appState.streakDays || 0}
            onOtra={onOtra} onClose={onClose}/>
        ) : q ? (
          <>
            {/* ── EL ARCO DEL TIEMPO ── */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, color: NARANJA, marginBottom: 8 }}>CONTRARRELOJ</div>
              <div style={{ position: 'relative', width: 220, height: 220 }}>
                <svg width="220" height="220" style={{ transform: 'rotate(-90deg)',
                  animation: secs <= 20 ? 'arcPanic 0.8s ease-in-out infinite' : 'none' }}>
                  <circle cx="110" cy="110" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="16"/>
                  <circle cx="110" cy="110" r={R} fill="none" stroke={arcColor} strokeWidth="16"
                    strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - pctT)}
                    style={{ transition: 'stroke-dashoffset 0.12s linear, stroke 0.6s ease' }}/>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center' }}>
                  <div key={secs <= 10 ? secs : 'norm'} style={{ fontSize: 62, fontWeight: 900, lineHeight: 1,
                    color: arcColor, fontVariantNumeric: 'tabular-nums',
                    textShadow: `0 0 24px ${arcColor}66`, transition: 'color 0.6s ease',
                    animation: secs <= 10 ? 'countScale 0.5s ease both' : 'none' }}>
                    {secs}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(245,242,235,0.4)', letterSpacing: 2 }}>SEGUNDOS</div>
                </div>
                {/* Bonus de cadena flotando desde el arco */}
                {bonus && (
                  <div key={bonus.key} style={{ position: 'absolute', top: 18, left: '50%', marginLeft: -20,
                    fontSize: 22, fontWeight: 900, color: '#4ADE80', textShadow: '0 0 14px rgba(74,222,128,0.7)',
                    animation: 'bonusFloat 1.2s ease-out both', pointerEvents: 'none' }}>
                    {bonus.txt}
                  </div>
                )}
              </div>
              {/* Contador de preguntas y puntos */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(245,242,235,0.7)' }}>{qi + 1}/{TOTAL}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 15, fontWeight: 900, color: '#4ADE80' }}>
                  {hitsRef.current} <PkIc n="check" s={14} c="#4ADE80"/>
                </span>
                {chainRef.current >= 2 && (
                  <span style={{ fontSize: 12, fontWeight: 900, color: NARANJA }}>
                    Cadena: {chainRef.current}
                  </span>
                )}
              </div>
            </div>

            {/* ── PREGUNTA COMPACTA ── */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 15, padding: '13px 14px', marginBottom: 11 }}>
              <div style={{ display: 'inline-block', padding: '2.5px 9px', borderRadius: 99, marginBottom: 8,
                background: `${(SUBJECT_META[q.subject] || {}).color || '#888'}20`, fontSize: 10, fontWeight: 800,
                color: (SUBJECT_META[q.subject] || {}).color || '#aaa' }}>
                {q.subject}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#F5F2EB', lineHeight: 1.5 }}>
                {richLite(q.text)}
              </div>
            </div>
            {/* Opciones en grid 2×2 para responder rápido */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {q.options.map((op, i) => (
                <button key={i} onClick={() => responder(i)} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 8, padding: '12px 11px', minHeight: 58,
                  background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.11)',
                  borderRadius: 13, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                  <span style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 900,
                    background: 'rgba(249,115,22,0.18)', color: NARANJA }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#F5F2EB', lineHeight: 1.35 }}>{richLite(op)}</span>
                </button>
              ))}
            </div>

            <button onClick={onClose} style={{ marginTop: 'auto', paddingTop: 16, background: 'none', border: 'none',
              color: 'rgba(245,242,235,0.3)', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              Abandonar
            </button>
          </>
        ) : null}
      </div>
    </div>
    </Portal>
  );
}

// ── Resultado del Contrarreloj: puntaje /500, velocidad y revisión rápida ──
function FinContrarreloj({ C, fin, hits, total, secsLeft, usedTenths, respondidas, record, prevRecord,
  answers, revisar, setRevisar, abierta, setAbierta, streakDays, onOtra, onClose }) {
  const NARANJA = '#F97316';
  const contado = useCountUp(fin.score, 1100);
  const velocidad = respondidas > 0 ? ((usedTenths / 10) / respondidas).toFixed(1) : '—';
  const maxBar = Math.max(record, fin.score, 1);
  return (
    <div className="fi" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
      <div style={{ textAlign: 'center' }}>
        {fin.rec && (
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color: '#FFD75E', marginBottom: 10,
            animation: 'comboPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
            ¡NUEVO RÉCORD!
          </div>
        )}
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: `${NARANJA}CC`, marginBottom: 6 }}>CONTRARRELOJ</div>
        <div style={{ fontSize: 64, fontWeight: 900, color: NARANJA, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
          textShadow: `0 0 34px ${NARANJA}66`, animation: 'popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          {contado}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(245,242,235,0.65)', marginTop: 4 }}>/ 500 puntos</div>

        {/* Stats de velocidad */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '16px 0 4px' }}>
          {[
            { k: 'ACIERTOS', v: `${hits}/${total}` },
            { k: 'SOBRARON', v: secsLeft > 0 ? `${secsLeft}s` : '0s' },
            { k: 'VELOCIDAD', v: `${velocidad}s/preg` },
          ].map(({ k, v }) => (
            <div key={k} style={{ padding: '9px 13px', borderRadius: 12, background: 'rgba(249,115,22,0.09)',
              border: '1px solid rgba(249,115,22,0.28)' }}>
              <div style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 1, color: 'rgba(245,242,235,0.45)' }}>{k}</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#F5F2EB', marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Comparativa: tu mejor vs este intento */}
        <div style={{ maxWidth: 320, margin: '14px auto 0', textAlign: 'left' }}>
          {[
            { label: 'Este intento', val: fin.score, color: NARANJA },
            { label: 'Tu mejor', val: record, color: '#FFD75E' },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, fontWeight: 800,
                color: 'rgba(245,242,235,0.6)', marginBottom: 3 }}>
                <span>{label}</span><span style={{ color }}>{val}</span>
              </div>
              <div style={{ height: 7, borderRadius: 99, background: 'rgba(255,255,255,0.07)' }}>
                <div style={{ height: '100%', width: `${(val / maxBar) * 100}%`, borderRadius: 99,
                  background: `linear-gradient(90deg, ${color}88, ${color})`, boxShadow: `0 0 8px ${color}55`,
                  transition: 'width 1s cubic-bezier(0.22,1,0.36,1)' }}/>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 320, margin: '18px auto 0' }}>
          <button onClick={onOtra} style={{ flex: 1.3, padding: '15px', borderRadius: 15, border: 'none',
            background: `linear-gradient(135deg, ${NARANJA}, #C2410C)`, color: '#fff', fontSize: 14, fontWeight: 900,
            cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 6px 20px ${NARANJA}40` }}>
            Otra vez
          </button>
          <button onClick={onClose} style={{ flex: 1, padding: '15px', borderRadius: 15,
            border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)',
            color: '#F5F2EB', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            Salir
          </button>
        </div>
        <button onClick={() => { FX.play('tap'); shareWhatsApp(
          `PANKEY ⚡ Contrarreloj\n${fin.score}/500 puntos · ${hits}/${total} aciertos en 90 segundos${fin.rec ? '\n¡NUEVO RÉCORD!' : ''}\n🔥 Racha: ${streakDays} día${streakDays !== 1 ? 's' : ''}\n¿Podrás superarme? → pankey.vercel.app`
        ); }} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', maxWidth: 320, margin: '10px auto 0', padding: '12px', borderRadius: 15,
          border: '1px solid rgba(37,211,102,0.45)', background: 'rgba(37,211,102,0.12)',
          color: '#4ADE80', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
          <PkIc n="msg" s={15} c="#4ADE80"/> Compartir por WhatsApp
        </button>

        {/* Revisión rápida (acordeón) — aquí sí aparecen las explicaciones */}
        <button onClick={() => { FX.play('tap'); setRevisar(!revisar); }} style={{
          width: '100%', maxWidth: 320, margin: '12px auto 0', padding: '12px', borderRadius: 15,
          border: '1px dashed rgba(255,255,255,0.22)', background: 'transparent',
          color: 'rgba(245,242,235,0.7)', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
          {revisar ? 'Ocultar revisión' : `Revisión rápida (${answers.length})`}
        </button>
      </div>

      {revisar && (
        <div className="fi" style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
          {answers.map((a, i) => {
            const open = abierta === i;
            return (
              <div key={i} style={{ borderRadius: 13, overflow: 'hidden',
                border: `1px solid ${a.ok ? 'rgba(74,222,128,0.3)' : 'rgba(239,68,68,0.3)'}`,
                background: a.ok ? 'rgba(74,222,128,0.05)' : 'rgba(239,68,68,0.05)' }}>
                <button onClick={() => setAbierta(open ? null : i)} style={{
                  width: '100%', padding: '11px 13px', background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 9, textAlign: 'left' }}>
                  <PkIc n={a.ok ? 'check' : 'x'} s={14} c={a.ok ? '#4ADE80' : '#EF4444'}/>
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: '#F5F2EB',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {i + 1}. {String(a.q.text).slice(0, 60)}
                  </span>
                  <span style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', display: 'flex' }}>
                    <PkIc n="right" s={11} c="rgba(245,242,235,0.4)"/>
                  </span>
                </button>
                {open && (
                  <div className="fi" style={{ padding: '0 13px 12px', fontSize: 12, lineHeight: 1.55, color: 'rgba(245,242,235,0.8)' }}>
                    <div style={{ marginBottom: 6 }}>{richLite(a.q.text)}</div>
                    <div style={{ fontSize: 11.5, marginBottom: 3 }}>
                      <b style={{ color: a.ok ? '#4ADE80' : '#EF4444' }}>Tu respuesta:</b> {a.sel !== null && a.q.options[a.sel] !== undefined ? richLite(a.q.options[a.sel]) : '—'}
                    </div>
                    {!a.ok && (
                      <div style={{ fontSize: 11.5, marginBottom: 5 }}>
                        <b style={{ color: '#4ADE80' }}>Correcta:</b> {richLite(a.q.options[a.q.correct])}
                      </div>
                    )}
                    {a.q.explanation && (
                      <div style={{ fontSize: 11.5, color: 'rgba(245,242,235,0.6)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 6 }}>
                        {richLite(a.q.explanation)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  MODO SUPERVIVENCIA — un error y chao
// ─────────────────────────────────────────────
function CorazonSVG({ estado, ultimo, size = 32 }) {
  // estado: 'lleno' | 'explotando' | 'roto'
  const path = 'M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11 3 12 4 12 4C12 4 13 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z';
  const anim = estado === 'explotando' ? 'heartPop 0.55s ease-out both'
    : estado === 'lleno' ? (ultimo ? 'heartBeatFast 0.7s ease-in-out infinite' : 'heartBeat 1.4s ease-in-out infinite')
    : 'none';
  return (
    <div style={{ position: 'relative', width: size, height: size, animation: anim,
      filter: estado === 'lleno' ? `drop-shadow(0 0 ${ultimo ? 14 : 7}px rgba(239,68,68,${ultimo ? 0.9 : 0.55}))` : 'none' }}>
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d={path} fill={estado === 'roto' ? '#3F3F46' : '#EF4444'}
          stroke={estado === 'roto' ? '#52525B' : '#FCA5A5'} strokeWidth="1"/>
        {estado === 'roto' && (
          <path d="M12 4.5 L10.5 9 L13 12 L10.8 16 L12 20" fill="none" stroke="#18181B" strokeWidth="1.6" strokeLinecap="round"/>
        )}
      </svg>
    </div>
  );
}

function ModoSupervivencia({ C, appState, onTerminar, onOtra, onClose, onRevive }) {
  const ROJO = '#DC2626';
  const QS_POR_OLA = 5;
  const ai = useAIQuestions({ count: 10, compact: true, dificultad: 'Media' });
  const [q, setQ] = useState(null);
  const [vidas, setVidas] = useState(3);
  const [explotando, setExplotando] = useState(null);  // índice del corazón que explota
  const [ola, setOla] = useState(1);
  const [waveClear, setWaveClear] = useState(null);    // { ola, key, xp }
  const [shakeKey, setShakeKey] = useState(0);
  const [flashKey, setFlashKey] = useState(0);
  const [muerto, setMuerto] = useState(false);         // pantalla de Game Over con revivir
  const [revivido, setRevivido] = useState(false);
  const [reviviendo, setReviviendo] = useState(false); // animación del corazón que cae
  const [fin, setFin] = useState(null);                // { rec }
  const [lb, setLb] = useState(null);                  // mejores de los amigos (Firebase)
  const correctRef = useRef(0);
  const answeredRef = useRef(0);
  const enOlaRef = useRef(0);
  const olaRef = useRef(1);
  const vidasRef = useRef(3);
  const paresRef = useRef([]);
  const finRef = useRef(false);
  const dificultadPedida = useRef({ 3: false, 5: false });

  useEffect(() => { if (ai.ready && !q && !finRef.current) setQ(ai.next()); }, [ai.ready]); // eslint-disable-line react-hooks/exhaustive-deps

  const avanzar = () => {
    // Pedir más preguntas (más difíciles) según la ola
    const o = olaRef.current;
    if (o >= 5 && !dificultadPedida.current[5]) { dificultadPedida.current[5] = true; ai.pedirMas(8, { dificultad: 'EXTREMA: preguntas de máxima dificultad ICFES, nivel olímpico' }); }
    else if (o >= 3 && !dificultadPedida.current[3]) { dificultadPedida.current[3] = true; ai.pedirMas(8, { dificultad: 'Muy alta, retadora' }); }
    else if (ai.quedan() < 3) ai.pedirMas(8, { dificultad: o >= 5 ? 'EXTREMA' : o >= 3 ? 'Muy alta' : 'Media' });
    setQ(ai.next());
  };

  const contarPregunta = () => {
    answeredRef.current += 1;
    enOlaRef.current += 1;
    if (enOlaRef.current >= QS_POR_OLA) {
      enOlaRef.current = 0;
      const xpOla = QS_POR_OLA * 10;
      setWaveClear({ ola: olaRef.current, key: Date.now(), xp: xpOla });
      olaRef.current += 1;
      setOla(olaRef.current);
      FX.play('levelUp'); FX.vibrate('success');
      setTimeout(() => setWaveClear(null), 2100);
    }
  };

  const responder = (i) => {
    if (fin || muerto || !q || explotando !== null) return;
    const ok = i === q.correct;
    paresRef.current.push({ subject: q.subject, nivel: q.nivel, ok });
    if (ok) {
      correctRef.current += 1;
      FX.play('success'); FX.vibrate('light');
      contarPregunta();
      avanzar();
    } else {
      // PERDER UNA VIDA: el corazón explota, shake, flash rojo
      const idx = vidasRef.current - 1;
      setExplotando(idx);
      setShakeKey(Date.now()); setFlashKey(Date.now());
      FX.play('error'); FX.vibrate('error');
      setTimeout(() => {
        vidasRef.current -= 1;
        setVidas(vidasRef.current);
        setExplotando(null);
        contarPregunta();
        if (vidasRef.current <= 0) {
          setMuerto(true);
          FX.play('glass'); FX.vibrate('heavy');
        } else {
          avanzar();
        }
      }, 650);
    }
  };

  const revivir = () => {
    if (revivido || (appState.ryo || 0) < 100) return;
    onRevive?.(100);
    setRevivido(true); setReviviendo(true); setMuerto(false);
    vidasRef.current = 1; setVidas(1);
    FX.play('chestOpen'); FX.vibrate('success');
    setTimeout(() => { setReviviendo(false); avanzar(); }, 1300);
  };

  const finalizar = () => {
    if (finRef.current) return; finRef.current = true;
    const olaFinal = olaRef.current;
    const correct = correctRef.current;
    const rec = olaFinal > (appState.supervivenciaRecord || 0);
    const emp = Math.min(500, Math.round(correct * 6 * Math.max(1, olaFinal / 2)));
    setFin({ rec, emp, xp: correct * 10 });
    setMuerto(false);
    if (rec) { FX.play('levelUp'); FX.vibrate('heavy'); }
    onTerminar({ tipo: 'supervivencia', valor: olaFinal, pares: paresRef.current, emp, xp: correct * 10 });
    // Leaderboard: los mejores de la comunidad
    if (fbOK()) {
      FB().get(FB().ref(FB().db, 'users')).then(snap => {
        if (!snap.exists()) return;
        const top = Object.values(snap.val())
          .map(u => ({ code: u.code, name: (u.appState?.institution ? u.code : u.code), rec: u.appState?.supervivenciaRecord || 0 }))
          .filter(u => u.code && u.rec > 0)
          .sort((a, b) => b.rec - a.rec).slice(0, 4);
        setLb(top);
      }).catch(() => {});
    }
  };

  const ultimaVida = vidas === 1 && !muerto && !fin;

  return (
    <Portal>
    <div key={shakeKey} style={{ position: 'fixed', inset: 0, zIndex: 99994, overflowY: 'auto', WebkitOverflowScrolling: 'touch',
      background: 'linear-gradient(180deg, #0D0000 0%, #180404 50%, #0D0000 100%)', display: 'flex', flexDirection: 'column',
      animation: shakeKey ? 'screenShakeX 0.4s ease both' : 'none' }}>

      {/* Borde rojo parpadeante en la última vida */}
      {ultimaVida && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5,
          animation: 'dangerBorder 1s ease-in-out infinite' }}/>
      )}
      {/* Flash rojo al perder vida */}
      {flashKey > 0 && (
        <div key={`f${flashKey}`} style={{ position: 'fixed', inset: 0, background: '#DC2626', pointerEvents: 'none',
          zIndex: 4, animation: 'redFlashBg 0.35s ease-out both' }}/>
      )}
      {/* WAVE CLEAR */}
      {waveClear && (
        <div key={waveClear.key} style={{ position: 'fixed', inset: 0, zIndex: 6, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0,
            background: `linear-gradient(90deg, transparent, ${ROJO}33, transparent)`,
            animation: 'waveSweep 0.9s ease-out both' }}/>
          <div style={{ textAlign: 'center', animation: 'waveClearTxt 2s ease both' }}>
            <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 4, color: '#F5F2EB',
              textShadow: `0 0 34px ${ROJO}` }}>
              OLA {waveClear.ola} SUPERADA
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#A78BFA', marginTop: 6 }}>+{waveClear.xp} XP</div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 430, margin: '0 auto', padding: '20px 20px 34px', width: '100%', minHeight: '100%',
        display: 'flex', flexDirection: 'column' }}>

        {!ai.ready && !fin ? (
          <ModoCargando color={ROJO} titulo="SUPERVIVENCIA"/>
        ) : fin ? (
          <div className="fi" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <FinDeModo color={ROJO} titulo="SUPERVIVENCIA" valor={olaRef.current} unidad={`ola${olaRef.current !== 1 ? 's' : ''} alcanzada${olaRef.current !== 1 ? 's' : ''} · ${correctRef.current} correctas`}
              esRecord={fin.rec} emp={fin.emp} xp={fin.xp} onOtra={onOtra} onSalir={onClose}
              extra={`Tu mejor: Ola ${Math.max(olaRef.current, appState.supervivenciaRecord || 0)}`}
              shareText={`PANKEY 💀 Supervivencia\nLlegué a la Ola ${olaRef.current} con ${correctRef.current} correctas${fin.rec ? '\n¡NUEVO RÉCORD!' : ''}\n🔥 Racha: ${appState.streakDays || 0} día${(appState.streakDays || 0) !== 1 ? 's' : ''}\n→ pankey.vercel.app`}/>
            {/* Leaderboard de la comunidad */}
            {lb && lb.length > 0 && (
              <div className="fi" style={{ width: '100%', maxWidth: 320, marginTop: 18, textAlign: 'left' }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: 'rgba(245,242,235,0.5)', marginBottom: 8 }}>
                  LOS MÁS AGUANTADORES
                </div>
                {lb.map((u, i) => (
                  <div key={u.code} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px',
                    borderRadius: 10, background: 'rgba(255,255,255,0.04)', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, fontWeight: 900, color: i === 0 ? '#FFD75E' : 'rgba(245,242,235,0.5)', width: 18 }}>#{i + 1}</span>
                    <span style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: '#F5F2EB' }}>@{u.code}</span>
                    <span style={{ fontSize: 12, fontWeight: 900, color: ROJO }}>Ola {u.rec}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : muerto ? (
          /* ── GAME OVER: ¿revivir? ── */
          <div className="fi" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: 6, color: ROJO,
              textShadow: `0 0 50px ${ROJO}CC`, animation: 'popIn 0.5s ease both', marginBottom: 8 }}>
              GAME OVER
            </div>
            <div style={{ fontSize: 13, color: 'rgba(245,242,235,0.6)', marginBottom: 26 }}>
              Caíste en la Ola {olaRef.current} con {correctRef.current} correctas
            </div>
            {!revivido && (appState.ryo || 0) >= 100 && (
              <button onClick={revivir} style={{ width: '100%', maxWidth: 300, padding: '16px', borderRadius: 16,
                border: 'none', background: 'linear-gradient(135deg, #FFD75E, #D4AF37)', color: '#1A1206',
                fontSize: 14.5, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 8px 26px rgba(212,175,55,0.4)', marginBottom: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <PkIc n="empanada" s={16} c="#1A1206"/> Revivir con 1 corazón · 100 emp
              </button>
            )}
            <button onClick={finalizar} style={{ width: '100%', maxWidth: 300, padding: '15px', borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)',
              color: '#F5F2EB', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Aceptar mi destino
            </button>
          </div>
        ) : reviviendo ? (
          /* ── RESURRECCIÓN: un corazón cae del cielo ── */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', animation: 'heartFall 1.1s cubic-bezier(0.34,1.56,0.64,1) both' }}>
              <CorazonSVG estado="lleno" ultimo size={72}/>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: 5, height: 5,
                  borderRadius: '50%', background: '#FFD75E', boxShadow: '0 0 8px #D4AF37',
                  '--sx': `${Math.round(Math.cos((i / 10) * Math.PI * 2) * 55)}px`,
                  '--sy': `${Math.round(Math.sin((i / 10) * Math.PI * 2) * 48)}px`,
                  animation: `sparkRise 0.9s ease-out ${0.5 + i * 0.05}s both` }}/>
              ))}
            </div>
            <div style={{ fontSize: 15, fontWeight: 900, color: '#FFD75E', marginTop: 20, letterSpacing: 2 }}>
              ¡SEGUNDA OPORTUNIDAD!
            </div>
          </div>
        ) : q ? (
          <>
            {/* ── CORAZONES + OLA ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {[0, 1, 2].map(i => (
                  <CorazonSVG key={i}
                    estado={explotando === i ? 'explotando' : i < vidas ? 'lleno' : 'roto'}
                    ultimo={ultimaVida && i === 0} size={32}/>
                ))}
              </div>
              <div style={{ flex: 1 }}/>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: ROJO }}>OLA {ola}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(245,242,235,0.5)', marginTop: 1 }}>
                  {correctRef.current} correctas · {ola < 3 ? 'nivel normal' : ola < 5 ? 'nivel difícil' : 'NIVEL EXTREMO'}
                </div>
              </div>
            </div>

            {/* Progreso dentro de la ola */}
            <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
              {Array.from({ length: QS_POR_OLA }, (_, i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 99,
                  background: i < enOlaRef.current ? ROJO : 'rgba(255,255,255,0.1)',
                  boxShadow: i < enOlaRef.current ? `0 0 6px ${ROJO}88` : 'none',
                  transition: 'background 0.3s ease' }}/>
              ))}
            </div>

            <PreguntaRapida C={C} q={q} sel={null} reveal={false} onPick={responder}/>
            <button onClick={() => { if (!finRef.current) finalizar(); }} style={{ marginTop: 'auto', paddingTop: 16, background: 'none', border: 'none',
              color: 'rgba(245,242,235,0.3)', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              Rendirme
            </button>
          </>
        ) : null}
      </div>
    </div>
    </Portal>
  );
}

// ─────────────────────────────────────────────
//  LA RULETA — la suerte decide, tú arriesgas
// ─────────────────────────────────────────────
function ModoRuleta({ C, appState, onTerminar, onOtra, onClose }) {
  const ORO = '#D4AF37';
  const VIOLETA = '#8B5CF6';
  const MULTS = [1, 2, 4, 8, 16, 32];
  const BASE = 25;                       // empanadas de la primera ronda (x1)
  const mats = Object.keys(SUBJECT_META); // 5 cuñas de 72°: las 5 materias y ya
  const conic = `conic-gradient(from -36deg, ${mats.map((s, i) => `${SUBJECT_META[s].color} ${i * 72}deg ${(i + 1) * 72}deg`).join(', ')})`;

  const ai = useAIQuestions({ count: 7, compact: true, dificultad: 'Alta' });
  const [fase, setFase] = useState('palanca');   // palanca | girando | pregunta | decision | fin
  const [nivel, setNivel] = useState(0);         // índice en MULTS del multiplicador EN JUEGO
  const [deg, setDeg] = useState(0);
  const [materia, setMateria] = useState(null);  // materia elegida por la rueda
  const [q, setQ] = useState(null);
  const [sel, setSel] = useState(null);
  const [reveal, setReveal] = useState(false);
  const [palancaKey, setPalancaKey] = useState(0);  // dispara la animación de la palanca
  const [flashWedge, setFlashWedge] = useState(null); // flash del color ganador
  const [fin, setFin] = useState(null);          // { emp, mult, perdio }
  const [esRecord, setEsRecord] = useState(false);
  const nivelRef = useRef(0);
  const paresRef = useRef([]);
  const finRef = useRef(false);
  const girandoRef = useRef(false);
  const tickTimers = useRef([]);

  useEffect(() => () => tickTimers.current.forEach(clearTimeout), []);

  const potActual = BASE * MULTS[nivel];          // lo que ganas si aciertas ESTA pregunta
  const potAcumulado = nivel > 0 ? BASE * MULTS[nivel - 1] : 0; // lo que ya tienes en la mesa

  // Ticks de casino sincronizados con el giro: rápidos al arrancar y
  // frenando al final, terminando justo cuando la rueda para (~3.35s de 3.5s).
  const sonarTicks = () => {
    tickTimers.current.forEach(clearTimeout); tickTimers.current = [];
    const DUR = 3350, N = 20;
    for (let k = 1; k <= N; k++) {
      const t = Math.round(DUR * Math.pow(k / N, 1.8)); // ease-in: gaps chicos al inicio, grandes al final
      tickTimers.current.push(setTimeout(() => { if (girandoRef.current) FX.play('tick'); }, t));
    }
  };

  // ¡LA PALANCA! Se tira como en los casinos y la rueda arranca
  const tirarPalanca = () => {
    if (fase !== 'palanca' || girandoRef.current) return;
    girandoRef.current = true;
    setPalancaKey(Date.now());
    FX.play('duelStart'); FX.vibrate('heavy');
    setTimeout(() => {
      setFase('girando');
      sonarTicks();
      const i = Math.floor(Math.random() * 5);
      const land = 360 - (i * 72 + 36);
      setDeg(d => d - (d % 360) + 1800 + land);
      setTimeout(() => {
        const s = mats[i];
        setMateria(s);
        setFlashWedge({ color: SUBJECT_META[s].color, key: Date.now() });
        FX.play('conjure'); FX.vibrate('medium');
        setTimeout(() => {
          setQ(ai.next(s)); setSel(null); setReveal(false);
          setFase('pregunta');
          girandoRef.current = false;
        }, 1100);
      }, 3600);
    }, 420);
  };

  const responder = (i) => {
    if (reveal || !q) return;
    const ok = i === q.correct;
    setSel(i); setReveal(true);
    paresRef.current.push({ subject: q.subject, nivel: q.nivel, ok });
    if (ok) {
      FX.play('coin'); FX.vibrate('success');
      setTimeout(() => {
        if (nivelRef.current >= MULTS.length - 1) cobrar(); // x32: tope, cobra automático
        else setFase('decision');
      }, 1100);
    } else {
      // Falló: pierde TODO lo acumulado
      FX.play('error'); FX.vibrate('heavy');
      setTimeout(() => {
        FX.play('glass');
        terminar({ emp: 0, mult: MULTS[nivelRef.current], perdio: true });
      }, 1000);
    }
  };

  const cobrar = () => {
    const m = MULTS[nivelRef.current];
    terminar({ emp: BASE * m, mult: m, perdio: false });
  };

  const apostar = () => {
    nivelRef.current += 1;
    setNivel(nivelRef.current);
    setMateria(null);
    setFase('palanca');
    FX.play('duel'); FX.vibrate('medium');
  };

  const terminar = ({ emp, mult, perdio }) => {
    if (finRef.current) return; finRef.current = true;
    const aciertos = paresRef.current.filter(p => p.ok).length;
    const rec = !perdio && mult > (appState.ruletaMaxMult || 0);
    setEsRecord(rec);
    setFin({ emp, mult, perdio });
    setFase('fin');
    if (!perdio && emp > 0) { FX.play('levelUp'); FX.vibrate('heavy'); }
    onTerminar({ tipo: 'ruleta', valor: perdio ? 0 : mult, pares: paresRef.current, emp, xp: aciertos * 10 });
  };

  const metaQ = q ? (SUBJECT_META[q.subject] || {}) : {};
  const finContado = useCountUp(fase === 'fin' && fin ? fin.emp : 0, 1200);
  const siguienteMult = MULTS[Math.min(nivel + 1, MULTS.length - 1)];

  return (
    <Portal>
    <div style={{ position: 'fixed', inset: 0, zIndex: 99994, overflowY: 'auto', WebkitOverflowScrolling: 'touch',
      background: 'linear-gradient(180deg, #120B04 0%, #241505 45%, #0F0A03 100%)', display: 'flex', flexDirection: 'column' }}>

      {/* Flash del color de la cuña ganadora */}
      {flashWedge && (
        <div key={flashWedge.key} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 4,
          background: `radial-gradient(circle at 50% 38%, ${flashWedge.color}66, transparent 65%)`,
          animation: 'wedgeReveal 1.2s ease-out both' }}/>
      )}

      <div style={{ maxWidth: 430, margin: '0 auto', padding: '20px 20px 34px', width: '100%', minHeight: '100%',
        display: 'flex', flexDirection: 'column' }}>

        {!ai.ready && fase !== 'fin' ? (
          <ModoCargando color={ORO} titulo="LA RULETA DEL SABER"/>
        ) : (
        <>
        {/* ── Header: título + pote en juego ── */}
        {fase !== 'fin' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2.5, color: ORO }}>LA RULETA DEL SABER</div>
              <div style={{ fontSize: 10.5, color: 'rgba(245,242,235,0.5)', marginTop: 2 }}>
                {nivel === 0 ? 'Tira la palanca y que el páramo decida' : `Apostaste x${MULTS[nivel]} · sin miedo, parce`}
              </div>
            </div>
            <div key={nivel} style={{ textAlign: 'right', animation: nivel > 0 ? 'potShake 0.5s ease both' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                <PkIc n="empanada" s={16} c="#E8B84B"/>
                <span style={{ fontSize: 27, fontWeight: 900, color: '#E8B84B', lineHeight: 1,
                  textShadow: '0 0 18px rgba(232,184,75,0.55)' }}>{potActual}</span>
              </div>
              <div style={{ fontSize: 9, fontWeight: 800, color: 'rgba(245,242,235,0.45)' }}>
                EN JUEGO · x{MULTS[nivel]}
              </div>
            </div>
          </div>
        )}

        {/* ── Escalera de multiplicadores x1 → x32 ── */}
        {fase !== 'fin' && (
          <div style={{ display: 'flex', gap: 5, marginBottom: 16 }}>
            {MULTS.map((m, i) => (
              <div key={m} style={{ flex: 1, textAlign: 'center', padding: '5px 0', borderRadius: 8,
                fontSize: 10.5, fontWeight: 900,
                background: i === nivel ? 'rgba(212,175,55,0.24)' : i < nivel ? 'rgba(212,175,55,0.10)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${i === nivel ? ORO : i < nivel ? 'rgba(212,175,55,0.35)' : 'rgba(255,255,255,0.08)'}`,
                color: i <= nivel ? ORO : 'rgba(245,242,235,0.35)',
                animation: i === nivel && nivel >= 3 ? 'escaleraGlow 1.2s ease-in-out infinite' : 'none' }}>
                x{m}
              </div>
            ))}
          </div>
        )}

        {/* ══ LA RUEDA + LA PALANCA ══ */}
        {(fase === 'palanca' || fase === 'girando') && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>

              {/* La rueda con marco de Tumbaga */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                {/* Puntero */}
                <div style={{ position: 'absolute', top: -8, left: '50%', marginLeft: -13, zIndex: 3,
                  width: 0, height: 0, borderLeft: '13px solid transparent', borderRight: '13px solid transparent',
                  borderTop: `20px solid ${ORO}`, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.6))',
                  animation: fase === 'girando' ? 'indicatorBlink 0.5s ease-in-out infinite' : 'none' }}/>
                {/* Greca vueltiao girando alrededor (marca colombiana) */}
                <div style={{ position: 'absolute', inset: -14, borderRadius: '50%', pointerEvents: 'none',
                  border: '2px dashed rgba(212,175,55,0.45)', animation: 'fireRingSpinRev 22s linear infinite' }}/>
                <div style={{ position: 'relative', width: 258, height: 258 }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%',
                    border: `6px solid ${ORO}`,
                    boxShadow: `0 0 40px rgba(212,175,55,0.4), inset 0 0 26px rgba(0,0,0,0.5), 0 14px 40px rgba(0,0,0,0.55)`,
                    background: conic,
                    transform: `rotate(${deg}deg)`,
                    transition: fase === 'girando' ? 'transform 3.5s cubic-bezier(0.13,0.73,0.09,1)' : 'none' }}>
                    {mats.map((s, i) => (
                      <div key={s} style={{ position: 'absolute', top: '50%', left: '50%', width: 44, marginLeft: -22,
                        textAlign: 'center', fontSize: 14, fontWeight: 900, color: '#0F0A04',
                        textShadow: '0 1px 0 rgba(255,255,255,0.25)',
                        transform: `rotate(${i * 72}deg) translateY(-96px)` }}>
                        {SUBJECT_META[s].short}
                      </div>
                    ))}
                  </div>
                  {/* Medallón central: rana sobre Tumbaga */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', width: 74, height: 74, marginTop: -37, marginLeft: -37,
                    borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #3A2A08, #1A1206)',
                    border: `3.5px solid ${ORO}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
                    <div style={{ animation: fase === 'girando' ? 'inkSpinRev 3.5s cubic-bezier(0.13,0.73,0.09,1)' : 'none' }}>
                      <PkIc n="rana" s={34} c={ORO}/>
                    </div>
                  </div>
                </div>
              </div>

              {/* ¡LA PALANCA DE CASINO! */}
              <button onClick={tirarPalanca} disabled={fase !== 'palanca'} style={{
                background: 'none', border: 'none', cursor: fase === 'palanca' ? 'pointer' : 'default',
                fontFamily: 'inherit', padding: '0 2px', WebkitTapHighlightColor: 'transparent',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ position: 'relative', width: 42, height: 158 }}>
                  {/* Base metálica */}
                  <div style={{ position: 'absolute', bottom: 0, left: '50%', marginLeft: -17, width: 34, height: 24,
                    borderRadius: '8px 8px 5px 5px',
                    background: 'linear-gradient(180deg, #4A3A18, #241A08)',
                    border: `1.5px solid ${ORO}66`, boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.12), 0 4px 10px rgba(0,0,0,0.5)' }}/>
                  {/* Riel */}
                  <div style={{ position: 'absolute', top: 8, bottom: 20, left: '50%', marginLeft: -4, width: 8,
                    borderRadius: 99, background: 'linear-gradient(180deg, #6B5518, #33270C)',
                    border: '1px solid rgba(212,175,55,0.4)', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.6)' }}/>
                  {/* Brazo + bola: baja y regresa al tirar */}
                  <div key={palancaKey || 'lv'} style={{ position: 'absolute', top: 0, left: '50%', marginLeft: -14,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    animation: palancaKey ? 'leverPull 0.9s cubic-bezier(0.34,1.2,0.5,1) both'
                      : fase === 'palanca' ? 'leverHint 3.5s ease-in-out infinite' : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%',
                      background: 'radial-gradient(circle at 34% 28%, #FF8A80, #DC2626 55%, #7F1D1D)',
                      border: `2px solid ${ORO}`, boxShadow: '0 0 14px rgba(220,38,38,0.6), inset 0 2px 3px rgba(255,255,255,0.35)' }}/>
                    <div style={{ width: 6, height: 52, borderRadius: 99,
                      background: 'linear-gradient(180deg, #E8CB7A, #8A6410)', marginTop: -2 }}/>
                  </div>
                </div>
                <span style={{ fontSize: 9.5, fontWeight: 900, letterSpacing: 1.2, whiteSpace: 'nowrap',
                  color: fase === 'palanca' ? ORO : 'rgba(245,242,235,0.35)',
                  animation: fase === 'palanca' ? 'presenceBlink 2s ease-in-out infinite' : 'none' }}>
                  {fase === 'palanca' ? '¡TIRA!' : '…'}
                </span>
              </button>
            </div>

            {/* Estado bajo la rueda */}
            <div style={{ marginTop: 18, textAlign: 'center', minHeight: 44 }}>
              {fase === 'girando' ? (
                <div className="fi" style={{ fontSize: 13.5, fontWeight: 800, color: 'rgba(245,242,235,0.7)' }}>
                  La rueda decide tu materia…
                </div>
              ) : nivel === 0 ? (
                <div style={{ fontSize: 12.5, color: 'rgba(245,242,235,0.55)', lineHeight: 1.6, maxWidth: 300 }}>
                  Tira la palanca. La rueda elige la materia, tú respondes.
                  Acierta y decide: <b style={{ color: '#22C55E' }}>cobrar</b> o <b style={{ color: ORO }}>apostar al doble</b>.
                </div>
              ) : (
                <div style={{ fontSize: 13, fontWeight: 800, color: ORO }}>
                  Vas por {potActual} empanadas. Si fallas, pierdes {potAcumulado}. ¡Sin miedo!
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ LA PREGUNTA ══ */}
        {fase === 'pregunta' && q && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <span style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 99,
                background: `${metaQ.color}22`, border: `1.5px solid ${metaQ.color}`,
                fontSize: 12, fontWeight: 900, color: metaQ.color,
                animation: 'popIn 0.4s ease both' }}>
                La rueda eligió: {q.subject} · por {potActual} emp
              </span>
            </div>
            <PreguntaRapida C={C} q={q} sel={sel} reveal={reveal} onPick={responder}/>
          </>
        )}

        {/* ══ LA DECISIÓN: cobrar o apostar al doble ══ */}
        {fase === 'decision' && (
          <div className="fi" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 2.5, color: '#7EE2AE', marginBottom: 8 }}>¡CORRECTO, PARCE!</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
              <span style={{ fontSize: 52, fontWeight: 900, color: '#E8B84B', lineHeight: 1,
                textShadow: '0 0 30px rgba(232,184,75,0.55)' }}>{potActual}</span>
              <PkIc n="empanada" s={22} c="#E8B84B"/>
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(245,242,235,0.65)', marginTop: 6, marginBottom: 22 }}>
              empanadas ganadas en esta ronda
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, width: '100%', maxWidth: 320 }}>
              {/* COBRAR Y RETIRARSE */}
              <button onClick={cobrar} style={{ padding: '16px', borderRadius: 16, border: 'none',
                background: 'linear-gradient(135deg, #22C55E, #15803D)', color: '#fff', fontSize: 14.5, fontWeight: 900,
                cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(34,197,94,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <PkIc n="empanada" s={16} c="#fff"/> Cobrar {potActual} y retirarse
              </button>
              {/* APOSTAR AL DOBLE */}
              <button onClick={apostar} style={{ padding: '16px', borderRadius: 16, border: 'none',
                position: 'relative', overflow: 'hidden',
                background: `linear-gradient(135deg, ${ORO}, #8A6410)`, color: '#1A1206', fontSize: 14.5, fontWeight: 900,
                cursor: 'pointer', fontFamily: 'inherit',
                animation: siguienteMult >= 8 ? 'riskBlink 0.9s ease-in-out infinite' : 'none',
                boxShadow: '0 6px 20px rgba(212,175,55,0.4)' }}>
                Apostar x{siguienteMult} → {BASE * siguienteMult} emp
              </button>
            </div>
            <div style={{ fontSize: 11, fontWeight: 800, marginTop: 14,
              color: siguienteMult >= 8 ? '#EF4444' : 'rgba(245,242,235,0.45)',
              animation: siguienteMult >= 8 ? 'presenceBlink 1.4s ease-in-out infinite' : 'none' }}>
              {siguienteMult >= 8 ? `Pille bien: si falla, pierde las ${potActual} de una` : 'Si fallas la siguiente, pierdes todo lo acumulado'}
            </div>
          </div>
        )}

        {/* ══ FIN: cobró o lo perdió todo ══ */}
        {fase === 'fin' && fin && (
          <div className="fi" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
            {/* Lluvia de empanadas perdidas */}
            {fin.perdio && (
              <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 4, overflow: 'hidden' }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} style={{ position: 'absolute', top: 0, left: `${6 + (i * 8) % 88}%`,
                    '--er': `${(i % 2 ? 1 : -1) * (200 + i * 30)}deg`,
                    animation: `empanadaRain ${1.6 + (i % 5) * 0.35}s ease-in ${i * 0.1}s both` }}>
                    <PkIc n="empanada" s={16 + (i % 3) * 5} c="#E8B84B"/>
                  </div>
                ))}
              </div>
            )}
            {/* Chispas doradas al cobrar */}
            {!fin.perdio && fin.emp > 0 && (
              <div style={{ position: 'absolute', top: '32%', left: '50%', pointerEvents: 'none' }}>
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} style={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%',
                    background: '#FFD75E', boxShadow: '0 0 8px #FBBF24',
                    '--gx': `${Math.round(Math.cos((i / 10) * Math.PI * 2) * 95)}px`,
                    '--gy': `${Math.round(Math.sin((i / 10) * Math.PI * 2) * 85)}px`,
                    animation: `goldBurst 1.1s ease-out ${i * 0.05}s both` }}/>
                ))}
              </div>
            )}

            {esRecord && !fin.perdio && (
              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color: '#FFD75E', marginBottom: 10,
                animation: 'comboPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                ¡NUEVO RÉCORD DE MULTIPLICADOR!
              </div>
            )}
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: `${ORO}CC`, marginBottom: 6 }}>
              LA RULETA DEL SABER
            </div>
            {fin.perdio ? (
              <>
                <div style={{ fontSize: 34, fontWeight: 900, color: '#EF4444', lineHeight: 1.15,
                  textShadow: '0 0 34px rgba(239,68,68,0.6)', animation: 'popIn 0.6s ease both', maxWidth: 300 }}>
                  EL PÁRAMO TE LO QUITÓ TODO
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(245,242,235,0.65)', marginTop: 10 }}>
                  Caíste apostando x{fin.mult}. Así es el juego, parce.
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 62, fontWeight: 900, color: '#E8B84B', lineHeight: 1,
                    textShadow: '0 0 34px rgba(232,184,75,0.55)', fontVariantNumeric: 'tabular-nums',
                    animation: 'popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>+{finContado}</span>
                  <PkIc n="empanada" s={26} c="#E8B84B"/>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: ORO, marginTop: 8 }}>
                  Te retiraste en x{fin.mult}{fin.mult === 32 ? ' · ¡LA CIMA!' : ''}
                </div>
              </>
            )}
            <div style={{ fontSize: 12, color: 'rgba(245,242,235,0.5)', marginTop: 8 }}>
              Tu mejor multiplicador: x{Math.max(fin.perdio ? 0 : fin.mult, appState.ruletaMaxMult || 0)}
            </div>

            <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 320, marginTop: 22 }}>
              <button onClick={onOtra} style={{ flex: 1.3, padding: '15px', borderRadius: 15, border: 'none',
                background: `linear-gradient(135deg, ${ORO}, #8A6410)`, color: '#1A1206', fontSize: 14, fontWeight: 900,
                cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 20px rgba(212,175,55,0.4)' }}>
                Otra ronda
              </button>
              <button onClick={onClose} style={{ flex: 1, padding: '15px', borderRadius: 15,
                border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)',
                color: '#F5F2EB', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                Salir
              </button>
            </div>
            <button onClick={() => { FX.play('tap'); shareWhatsApp(
              fin.perdio
                ? `PANKEY 🎰 La Ruleta del Saber\nEl páramo me quitó todo apostando x${fin.mult} 😤\n🔥 Racha: ${appState.streakDays || 0} día${(appState.streakDays || 0) !== 1 ? 's' : ''}\n¿Tú sí aguantas? → pankey.vercel.app`
                : `PANKEY 🎰 La Ruleta del Saber\nMe retiré en x${fin.mult} con ${fin.emp} empanadas${esRecord ? ' — ¡NUEVO RÉCORD!' : ''}\n🔥 Racha: ${appState.streakDays || 0} día${(appState.streakDays || 0) !== 1 ? 's' : ''}\n¿Llegas al x32? → pankey.vercel.app`
            ); }} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', maxWidth: 320, marginTop: 10, padding: '12px', borderRadius: 15,
              border: '1px solid rgba(37,211,102,0.45)', background: 'rgba(37,211,102,0.12)',
              color: '#4ADE80', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              <PkIc n="msg" s={15} c="#4ADE80"/> Compartir por WhatsApp
            </button>
          </div>
        )}

        {(fase === 'palanca' || fase === 'pregunta') && (
          <button onClick={() => { if (nivelRef.current > 0 && fase === 'palanca') cobrarAnterior(); else onClose(); }}
            style={{ marginTop: 'auto', paddingTop: 14, background: 'none', border: 'none',
            color: 'rgba(245,242,235,0.3)', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {nivelRef.current > 0 && fase === 'palanca' ? `Arrepentirse y cobrar ${potAcumulado}` : 'Salir de la ruleta'}
          </button>
        )}
        </>
        )}
      </div>
    </div>
    </Portal>
  );

  // Se arrepintió antes de girar: cobra lo del nivel anterior
  function cobrarAnterior() {
    const m = MULTS[Math.max(0, nivelRef.current - 1)];
    terminar({ emp: BASE * m, mult: m, perdio: false });
  }
}

function IcfesDashboard({ C, isLight, appState, setAppState, onStartSetup, onGoOracle, onMissionReward, onGoShop, onModo, onFlash, onPracticeWeak }) {
  const [expandiendo, setExpandiendo] = useState(null); // tarjeta de modo expandiéndose full-screen
  const [modoIdx, setModoIdx]         = useState(0);    // slide activo del carrusel de modos
  const [estrellaOpen, setEstrellaOpen] = useState(false); // Estrella del Saber colapsada por defecto
  const [rachaModal, setRachaModal]   = useState(false);   // historia de la racha ICFES
  const [expandedExp, setExpandedExp] = useState(null);    // expedición expandida (acordeón)
  const [chestOpen, setChestOpen]     = useState(false);

  const history    = appState.icfesHistory || [];
  const hasHistory = history.length > 0;
  const best       = hasHistory ? Math.max(...history.map(r => r.score)) : 0;
  const streak     = appState.icfesStreak || 0;
  const total      = history.length;
  const recentFive = history.slice(-5).reverse();
  const bestLevel  = getPerfLevel(best);
  const dominio    = dominioPorMateria(appState);
  const pred       = prediccionSabio(history);
  const debilidad  = detectarDebilidad(appState);
  const todayMissions = generateDailyMissions(todayStr());
  const missionsReady = todayMissions.filter(m => getMissionProgress(m, appState) >= m.target && !(appState.missionsRewarded || []).includes(m.id)).length;

  // ¿Sin puntos débiles? (todas las competencias con datos van arriba del 60%)
  const sinDebiles = !debilidad && Object.values(appState.weakStats || {}).some(v => v.t >= 4);

  const MODE_COLORS = {
    simulacro: '#4A9EFF',
    contrarreloj: '#F97316',
    supervivencia: '#EF4444',
    ruleta: '#D4AF37',
    duelo: '#DC2626',
  };

  // ── Los 5 modos con su identidad visual (brief) ──
  const MODOS = [
    { id: 'simulacro', nombre: 'Simulacro Oficial', desc: 'El simulacro completo. Como el día del examen.',
      color: MODE_COLORS.simulacro,
      grad: 'linear-gradient(145deg, #0D1B2A 0%, #1A3A5C 60%, #0A1525 100%)',
      glow: 'radial-gradient(circle at 80% 20%, rgba(74,158,255,0.25), transparent 55%)',
      dif: 4, rec: '40–250 emp',
      record: best > 0 ? `Mejor: ${best}/500` : 'Sin jugar',
      icono: (
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 8, padding: 2 }}>
          <PkIc n="pergamino" s={20} c="#4A9EFF"/>
          <div style={{ position: 'absolute', top: 0, bottom: 0, width: 12, pointerEvents: 'none',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
            animation: 'iconSweep 3s ease-in-out infinite' }}/>
        </div>
      ),
      accion: () => onStartSetup?.() },
    { id: 'contrarreloj', nombre: 'Contrarreloj', desc: '10 preguntas. 90 segundos. Sin piedad.',
      color: MODE_COLORS.contrarreloj,
      grad: 'linear-gradient(145deg, #1A0800 0%, #3D1500 60%, #200A00 100%)',
      glow: 'radial-gradient(circle at 80% 20%, rgba(249,115,22,0.3), transparent 55%)',
      dif: 3, rec: 'x1.5 emp',
      record: (appState.contrarrelojRecord || 0) > 0 ? `Mejor: ${appState.contrarrelojRecord}` : 'Sin jugar',
      icono: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="13" r="8"/><path d="M12 13V9" style={{ transformOrigin: '12px 13px', animation: 'secondHand 2.4s linear infinite' }}/>
          <path d="M9 2h6"/>
        </svg>
      ),
      extra: (
        /* mini-arco "90s" que se vacía en loop */
        <div style={{ position: 'absolute', right: 14, bottom: 58, width: 30, height: 30, opacity: 0.9 }}>
          <svg width="30" height="30" viewBox="0 0 30 30" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="15" cy="15" r="10" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3"/>
            <circle cx="15" cy="15" r="10" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round"
              strokeDasharray="63" style={{ animation: 'miniArcDrain 4s linear infinite' }}/>
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 7.5, fontWeight: 900, color: '#F97316' }}>90s</div>
        </div>
      ),
      accion: () => onModo?.('contrarreloj') },
    { id: 'supervivencia', nombre: 'Supervivencia', desc: '3 vidas. Preguntas infinitas. ¿Cuánto aguantas?',
      color: MODE_COLORS.supervivencia,
      grad: 'linear-gradient(145deg, #1A0000 0%, #3D0000 60%, #200000 100%)',
      glow: 'radial-gradient(circle at 80% 20%, rgba(239,68,68,0.3), transparent 55%)',
      dif: 5, rec: 'emp × ola/2',
      record: (appState.supervivenciaRecord || 0) > 0 ? `Mejor: Ola ${appState.supervivenciaRecord}` : 'Sin jugar',
      icono: (
        <div style={{ animation: 'heartBeat 1.2s ease-in-out infinite', filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.6))' }}>
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11 3 12 4 12 4C12 4 13 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" fill="#EF4444" stroke="#FCA5A5" strokeWidth="1"/></svg>
        </div>
      ),
      extra: (
        /* 3 corazones pequeños visibles en la tarjeta */
        <div style={{ position: 'absolute', right: 16, bottom: 62, display: 'flex', gap: 4 }}>
          {[0, 1, 2].map(i => (
            <svg key={i} width="13" height="13" viewBox="0 0 24 24" style={{ animation: `heartBeat 1.2s ease-in-out infinite ${i * 0.18}s` }}>
              <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11 3 12 4 12 4C12 4 13 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" fill="#EF4444"/>
            </svg>
          ))}
        </div>
      ),
      accion: () => onModo?.('supervivencia') },
    { id: 'ruleta', nombre: 'La Ruleta del Saber', desc: 'Tira la palanca, responde y apuesta: del x2 al x32.',
      color: MODE_COLORS.ruleta,
      grad: 'linear-gradient(145deg, #170F03 0%, #33240A 60%, #120C04 100%)',
      glow: 'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.3), transparent 55%)',
      dif: 2, rec: 'hasta x32',
      record: (appState.ruletaMaxMult || 0) > 0 ? `Mejor: x${appState.ruletaMaxMult}` : 'Sin jugar',
      icono: (
        <div style={{ width: 22, height: 22, borderRadius: '50%', animation: 'raysSpin 30s linear infinite',
          border: '1.5px solid #D4AF37',
          background: `conic-gradient(${Object.values(SUBJECT_META).map((m, i) => `${m.color} ${i * 72}deg ${(i + 1) * 72}deg`).join(', ')})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1A1206', border: '1px solid #D4AF37' }}/>
        </div>
      ),
      accion: () => onModo?.('ruleta') },
    { id: 'duelo', nombre: 'Duelo Flash', desc: '5 preguntas contra un rival en vivo. 3 minutos.',
      color: MODE_COLORS.duelo,
      grad: 'linear-gradient(145deg, #1A0A00 0%, #2D1500 40%, #1A0000 100%)',
      glow: 'radial-gradient(circle at 80% 20%, rgba(220,38,38,0.25), transparent 55%)',
      dif: 3, rec: '30 emp + 60 XP',
      record: 'Rival en vivo',
      icono: (
        <div style={{ animation: 'swordsClash 2s ease-in-out infinite' }}>
          <PkIc n="swords" s={20} c="#FF7B4D"/>
        </div>
      ),
      accion: () => onFlash?.() },
  ];

  // Días con simulacro en las últimas 2 semanas (para la historia de la racha)
  const dias14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (13 - i));
    const ds = d.toDateString();
    return { dia: d.getDate(), hecho: history.some(r => r.ts && new Date(r.ts).toDateString() === ds) };
  });

  return (
    <div className="fi" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ══ 1. HEADER COMPACTO DE STATS (sticky) ══ */}
      <div style={{ position: 'sticky', top: 0, zIndex: 30, margin: '0 -4px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'stretch',
          maxHeight: 64, borderRadius: 18, padding: '9px 4px',
          background: 'rgba(8,12,20,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${C.border}` }}>
          <button onClick={() => { FX.play('tap'); setRachaModal(true); }} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center',
            borderRight: '1px solid rgba(255,255,255,0.08)', padding: '2px 0' }}>
            <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 800, letterSpacing: 1.5, marginBottom: 3,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <PkIc n="flame" s={10} c="#F97316"/> RACHA
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#F97316', lineHeight: 1 }}>
              {streak}<span style={{ fontSize: 10, fontWeight: 700, opacity: 0.7 }}> días</span>
            </div>
          </button>
          <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '2px 0' }}>
            <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 800, letterSpacing: 1.5, marginBottom: 3,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <PkIc n="star" s={10} c={hasHistory ? bestLevel.color : C.textMuted}/> MEJOR
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: hasHistory ? bestLevel.color : C.textMuted, lineHeight: 1 }}>
              {hasHistory ? best : '—'}<span style={{ fontSize: 10, fontWeight: 700, opacity: 0.7 }}>{hasHistory ? ' pts' : ''}</span>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '2px 0' }}>
            <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 800, letterSpacing: 1.5, marginBottom: 3,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <PkIc n="icfes" s={10} c={C.accent}/> PRUEBAS
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.accent, lineHeight: 1 }}>
              {total}<span style={{ fontSize: 10, fontWeight: 700, opacity: 0.7 }}> total</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 2. ¿CÓMO ENTRENAS HOY? — el héroe ══ */}
      <div style={{ marginTop: -6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10, padding: '0 2px' }}>
          <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: C.text }}>¿Cómo entrenas hoy?</div>
          {streak > 0 && (
            <span style={{ fontSize: 11, fontWeight: 800, color: '#F97316' }}>{streak} día{streak !== 1 ? 's' : ''} de racha</span>
          )}
        </div>

        {/* Carrusel horizontal con snap */}
        <div className="modos-carousel" onScroll={e => {
          const w = e.currentTarget.clientWidth * 0.88 + 12;
          const idx = Math.min(MODOS.length - 1, Math.round(e.currentTarget.scrollLeft / w));
          if (idx !== modoIdx) setModoIdx(idx);
        }}>
          {MODOS.map((m, idx) => (
            <button key={m.id} className="modos-slide" onClick={() => {
              FX.play('duel'); FX.vibrate('medium');
              setExpandiendo(m);
              setTimeout(() => { m.accion(); setTimeout(() => setExpandiendo(null), 500); }, 430);
            }} style={{
              position: 'relative', height: 180, border: 'none', borderRadius: 24, overflow: 'hidden',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', padding: 0,
              background: m.grad, boxShadow: '0 12px 32px rgba(0,0,0,0.4)' }}>
              {/* Capa 2: textura sutil a 45° */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
                background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 9px)' }}/>
              {/* Capa 3: glow radial */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: m.glow }}/>
              {/* Línea de acento a la izquierda */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                background: m.color, borderRadius: '24px 0 0 24px', boxShadow: `0 0 10px ${m.color}` }}/>

              {/* Ícono superior izquierda */}
              <div style={{ position: 'absolute', top: 16, left: 18, width: 48, height: 48, borderRadius: 14,
                background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {m.icono}
              </div>
              {/* Badge de récord superior derecha */}
              <div style={{ position: 'absolute', top: 20, right: 16, padding: '4px 10px', borderRadius: 20,
                background: 'rgba(0,0,0,0.4)', fontSize: 10, fontWeight: 900, color: m.color, whiteSpace: 'nowrap' }}>
                {m.record}
              </div>
              {/* Detalle especial del modo */}
              {m.extra || null}

              {/* Contenido inferior */}
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 18px 18px' }}>
                <div className="serif" style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.15 }}>{m.nombre}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 3,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 9.5, fontWeight: 900,
                    color: '#E8B84B', background: 'rgba(60,35,5,0.65)', border: '1px solid rgba(232,184,75,0.35)',
                    borderRadius: 99, padding: '3.5px 10px' }}>
                    <PkIc n="empanada" s={10} c="#E8B84B"/>{m.rec}
                  </span>
                  <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
                    {[0, 1, 2, 3, 4].map(i => (
                      <span key={i} style={{ width: 6, height: 6, borderRadius: '50%',
                        background: i < m.dif ? '#fff' : 'rgba(255,255,255,0.22)' }}/>
                    ))}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
        {/* Dots de navegación */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 2 }}>
          {MODOS.map((m, i) => (
            <div key={m.id} style={{ width: modoIdx === i ? 20 : 6, height: 6, borderRadius: 99,
              background: modoIdx === i ? '#fff' : 'rgba(255,255,255,0.25)',
              boxShadow: modoIdx === i ? '0 0 8px rgba(255,255,255,0.5)' : 'none',
              transition: 'width 0.3s ease, background 0.3s ease' }}/>
          ))}
        </div>
      </div>

      {/* ══ 3. TU ESTRELLA DEL SABER (colapsable) ══ */}
      <div style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 22, overflow: 'hidden' }}>
        <button onClick={() => { FX.play('tap'); setEstrellaOpen(o => !o); }} style={{
          width: '100%', padding: '15px 18px', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10 }}>
          <PkIc n="star" s={15} c={C.accent}/>
          <span style={{ flex: 1, textAlign: 'left', fontSize: 11, color: C.textMid, fontWeight: 800, letterSpacing: 1.8 }}>
            TU ESTRELLA DEL SABER
          </span>
          {pred && !estrellaOpen && (
            <span style={{ fontSize: 10.5, fontWeight: 900, color: getPerfLevel(Math.round((pred.lo + pred.hi) / 2)).color }}>
              {pred.lo}–{pred.hi}
            </span>
          )}
          <span style={{ display: 'flex', transform: estrellaOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
          </span>
        </button>
        <div style={{ maxHeight: estrellaOpen ? 560 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
          <div style={{ padding: '0 16px 16px' }}>
            <EstrellaSaber C={C} dominio={dominio} pred={pred}/>
          </div>
        </div>
      </div>

      {/* ══ 4. DEBILIDAD DEL DÍA ══ */}
      {debilidad ? (
        <div style={{ borderRadius: 18, padding: '16px 17px',
          background: 'linear-gradient(135deg, rgba(239,68,68,0.08), transparent)',
          border: '1px solid rgba(239,68,68,0.3)', borderLeft: '4px solid #EF4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <PkIc n="target" s={14} c="#EF4444"/>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: '#EF4444' }}>PUNTO DÉBIL DETECTADO</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 4 }}>
            {debilidad.subject} · {debilidad.nivel}
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5, marginBottom: 12 }}>
            Solo {debilidad.pct}% de aciertos en tus últimas sesiones. El Sabio recomienda practicarlo ya.
          </div>
          <button onClick={() => { FX.play('duel'); onPracticeWeak?.([debilidad.subject]); }} style={{
            width: '100%', padding: '13px', borderRadius: 13, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            background: 'linear-gradient(135deg, #EF4444, #B91C1C)', color: '#fff', fontSize: 13, fontWeight: 900,
            boxShadow: '0 6px 18px rgba(239,68,68,0.35)' }}>
            Practicar este punto ahora →
          </button>
        </div>
      ) : sinDebiles ? (
        <div style={{ borderRadius: 18, padding: '14px 17px', display: 'flex', alignItems: 'center', gap: 11,
          background: 'linear-gradient(135deg, rgba(61,168,115,0.08), transparent)',
          border: '1px solid rgba(61,168,115,0.3)', borderLeft: '4px solid #3DA873' }}>
          <PkIc n="check" s={18} c="#3DA873"/>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#3DA873' }}>
            ¡Sin puntos débiles detectados! Eres consistente.
          </div>
        </div>
      ) : null}

      {/* ══ 5. EVOLUCIÓN ══ */}
      <EvolucionChart C={C} history={history}/>

      {/* ══ 6. ÚLTIMAS EXPEDICIONES ══ */}
      <div>
        <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 800, letterSpacing: 1.8, marginBottom: 10 }}>
          ÚLTIMAS EXPEDICIONES
        </div>
        {hasHistory ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentFive.slice(0, 3).map((r, i) => {
              const lv = getPerfLevel(r.score);
              const pct = Math.round((r.score / 500) * 100);
              const abierta = expandedExp === i;
              return (
                <div key={i} className="su" style={{ animationDelay: `${i * .06}s`,
                  background: `rgba(255,255,255,${C.glassOpacity || '0.045'})`, border: `1px solid ${abierta ? lv.color + '45' : C.border}`,
                  borderRadius: 18, overflow: 'hidden', transition: 'border 0.3s ease' }}>
                  <button onClick={() => { FX.play('tap'); setExpandedExp(abierta ? null : i); }} style={{
                    width: '100%', padding: '13px 16px', background: 'none', border: 'none',
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                      <div style={{ width: 46, height: 46, borderRadius: '50%', flexShrink: 0, position: 'relative',
                        background: `conic-gradient(${lv.color} ${pct}%, rgba(255,255,255,0.06) ${pct}%)`,
                        boxShadow: `0 0 14px ${lv.color}25` }}>
                        <div style={{ position: 'absolute', inset: 4.5, borderRadius: '50%', background: C.bgAlt,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, fontWeight: 900, color: lv.color }}>
                          {r.score}
                        </div>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4A9EFF', flexShrink: 0 }}/>
                          <span style={{ fontSize: 11, fontWeight: 800, color: '#4A9EFF' }}>Simulacro</span>
                          <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 800, color: C.textMid }}>{r.date}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ fontSize: 12.5, fontWeight: 700, color: C.text }}>{lv.label}</span>
                          <span style={{ fontSize: 10.5, color: C.textMuted }}>{r.correct}/{r.total}</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, borderRadius: 99,
                            background: `linear-gradient(90deg,${lv.color}88,${lv.color})`,
                            boxShadow: `0 0 6px ${lv.color}60`, transition: 'width 1s' }}/>
                        </div>
                      </div>
                    </div>
                  </button>
                  {/* Acordeón: desglose por materia */}
                  <div style={{ maxHeight: abierta ? 260 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                    <div style={{ padding: '2px 16px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {Object.entries(r.subjectScores || {}).map(([s, v]) => {
                        const meta = SUBJECT_META[s] || {};
                        const sp = v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0;
                        return (
                          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                            <span style={{ fontSize: 10, fontWeight: 900, color: meta.color || C.text, width: 22 }}>{meta.short || s.slice(0, 2)}</span>
                            <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.07)' }}>
                              <div style={{ height: '100%', width: `${sp}%`, borderRadius: 99, background: meta.color || C.accent }}/>
                            </div>
                            <span style={{ fontSize: 10.5, fontWeight: 800, color: meta.color || C.textMid, width: 52, textAlign: 'right' }}>
                              {v.correct}/{v.total} · {sp}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Estado vacío */
          <div style={{ borderRadius: 18, padding: '26px 20px', textAlign: 'center',
            background: 'rgba(255,255,255,0.03)', border: `1px dashed ${C.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, opacity: 0.6 }}>
              <PkIc n="pergamino" s={38} c={C.textMuted}/>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.textMid, marginBottom: 4 }}>
              Aún no has completado ningún simulacro
            </div>
            <div style={{ fontSize: 11.5, color: C.textMuted, marginBottom: 16 }}>Tu historia empieza con el primero.</div>
            <button onClick={onStartSetup} style={{ padding: '12px 26px', borderRadius: 13, border: 'none',
              cursor: 'pointer', fontFamily: 'inherit', background: `linear-gradient(135deg, ${C.accent}, ${C.accentMid || C.accent})`,
              color: '#fff', fontSize: 13, fontWeight: 900, boxShadow: `0 6px 18px ${C.accent}40` }}>
              Hacer el primero →
            </button>
          </div>
        )}
      </div>

      {/* ── Morral de Misiones + protección de racha (secundarios) ── */}
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

      {(appState.streakDays || 0) >= 2 && (appState.streakFreezes || 0) === 0 && (
        <button onClick={onGoShop} style={{
          display: 'flex', alignItems: 'center', gap: 12, width: '100%', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
          background: 'linear-gradient(135deg, #38BDF815, transparent)', border: '1px solid #38BDF835',
          borderRadius: 16, padding: '12px 16px', marginTop: -12,
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

      {/* ══ 7. ORÁCULO ══ */}
      <button onClick={onGoOracle} style={{
        width: '100%', padding: '15px 20px', borderRadius: 16, cursor: 'pointer',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%)',
        border: `1px solid ${C.accent}50`, color: C.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        boxShadow: '0 8px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)', fontFamily: 'inherit' }}>
        <PkIc n="eye" s={19} c={C.accent} />
        <span style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: 1.5 }}>CONSULTAR AL ORÁCULO · TU VOCACIÓN</span>
      </button>

      {/* ── MODAL: Historia de la racha ICFES ── */}
      {rachaModal && (
        <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99996, background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(14px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={() => setRachaModal(false)}>
          <div onClick={e => e.stopPropagation()} className="fu" style={{ width: '100%', maxWidth: 340,
            background: C.bgAlt, border: '1px solid rgba(249,115,22,0.35)', borderRadius: 24, padding: '24px 22px',
            boxShadow: '0 24px 70px rgba(0,0,0,0.7), 0 0 40px rgba(249,115,22,0.12)' }}>
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                <PkIc n="flame" s={38} c="#F97316"/>
              </div>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2.5, color: '#F97316', marginBottom: 6 }}>RACHA ICFES</div>
              <div style={{ fontSize: 44, fontWeight: 900, color: C.text, lineHeight: 1 }}>{streak}</div>
              <div style={{ fontSize: 11.5, color: C.textMuted, marginTop: 4 }}>
                día{streak !== 1 ? 's' : ''} seguido{streak !== 1 ? 's' : ''} practicando el ICFES
              </div>
            </div>
            <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.5, color: C.textMuted, marginBottom: 8 }}>ÚLTIMAS 2 SEMANAS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 16 }}>
              {dias14.map((d, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 9, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 9.5, fontWeight: 800,
                  background: d.hecho ? 'rgba(249,115,22,0.22)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${d.hecho ? 'rgba(249,115,22,0.55)' : C.border}`,
                  color: d.hecho ? '#F97316' : C.textMuted }}>
                  {d.hecho ? <PkIc n="flame" s={11} c="#F97316"/> : d.dia}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '10px 6px', borderRadius: 12,
                background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 1, color: C.textMuted, marginBottom: 3 }}>PRUEBAS TOTALES</div>
                <div style={{ fontSize: 17, fontWeight: 900, color: C.accent }}>{total}</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', padding: '10px 6px', borderRadius: 12,
                background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 1, color: C.textMuted, marginBottom: 3 }}>MEJOR PUNTAJE</div>
                <div style={{ fontSize: 17, fontWeight: 900, color: hasHistory ? bestLevel.color : C.textMuted }}>{hasHistory ? best : '—'}</div>
              </div>
            </div>
            <button onClick={() => setRachaModal(false)} style={{ width: '100%', padding: '13px', borderRadius: 13,
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              background: 'linear-gradient(135deg, #F97316, #C2410C)', color: '#fff', fontSize: 13.5, fontWeight: 900 }}>
              ¡A seguir la racha!
            </button>
          </div>
        </div>
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

      {/* Expansión full-screen al elegir un modo */}
      {expandiendo && (
        <Portal>
          <div style={{ position: 'fixed', inset: 0, zIndex: 99993, background: expandiendo.grad,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'modeExpand 0.45s cubic-bezier(0.22,1,0.36,1) both' }}>
            <div style={{ textAlign: 'center', animation: 'popIn 0.4s ease 0.1s both' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14, transform: 'scale(1.9)' }}>{expandiendo.icono}</div>
              <div className="serif" style={{ fontSize: 26, fontWeight: 800, color: '#F5F2EB',
                textShadow: `0 0 30px ${expandiendo.color}` }}>{expandiendo.nombre}</div>
            </div>
          </div>
        </Portal>
      )}
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
function IcfesTest({ C, isLight, question, questionIdx, total, selected, animating, sabioComment, combo, hitsCount = 0, answeredCount = 0, onAnswer, onExit, onNext, repasoDisponible, comodinDisponible, onUsarRepaso, onUsarComodin }) {
  const meta    = SUBJECT_META[question.subject] || { color: C.accent, bg: C.bgAlt };
  const pct     = (questionIdx / total) * 100;
  const LETTERS = ['A', 'B', 'C', 'D'];
  // La barra cuenta tu historia: verde si vas bien, naranja regular, rojo mal
  const ratio = answeredCount > 0 ? hitsCount / answeredCount : 1;
  const barColor = answeredCount === 0 ? meta.color : ratio >= 0.7 ? '#3DA873' : ratio >= 0.45 ? '#F59E0B' : '#EF4444';
  const fallo = animating && selected !== question.correct;
  
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

      {/* Flash de pantalla al responder */}
      {animating && (
        <div key={`fl${questionIdx}`} style={{ position: 'fixed', inset: 0, zIndex: 9989, pointerEvents: 'none',
          background: fallo
            ? 'radial-gradient(ellipse at center, rgba(239,68,68,0.20), transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(61,168,115,0.22), transparent 70%)',
          animation: 'pantallaFlash 0.6s ease-out both' }}/>
      )}

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

      {/* Barra de progreso superior — el color cuenta cómo vas */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onExit} style={{ background: 'none', border: 'none', color: C.textMuted, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          <PkIc n="left" s={13} c={C.textMuted} /> Salir
        </button>
        <div style={{ flex: 1, height: 6, borderRadius: 99, background: C.bgAlt, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${barColor}88, ${barColor})`, transition: 'width 0.5s, background 0.6s', boxShadow: `0 0 8px ${barColor}60` }} />
        </div>
        {combo && combo.mult > 1 ? (
          <span key={combo.n} style={{ fontSize: 11, fontWeight: 900, whiteSpace: 'nowrap',
            color: combo.mult >= 3 ? '#FF6A00' : '#E8B84B',
            background: combo.mult >= 3 ? 'rgba(255,106,0,0.14)' : 'rgba(232,184,75,0.14)',
            border: `1.5px solid ${combo.mult >= 3 ? '#FF6A00' : '#E8B84B'}`,
            borderRadius: 99, padding: '4px 10px',
            animation: 'comboPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
            boxShadow: `0 0 14px ${combo.mult >= 3 ? 'rgba(255,106,0,0.4)' : 'rgba(232,184,75,0.35)'}` }}>
            x{combo.mult} {combo.mult >= 3 ? 'MEGA' : ''} COMBO
          </span>
        ) : (
          <span style={{ fontSize: 12, color: C.text, fontWeight: 800 }}>{questionIdx + 1}/{total}</span>
        )}
      </div>

      {/* Contenido con transición entre preguntas */}
      <div key={questionIdx} style={{ display: 'flex', flexDirection: 'column', gap: 16,
        animation: 'qSlideIn 0.4s cubic-bezier(0.22,1,0.36,1) both' }}>

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

      {/* Enunciado de la Pregunta — tiembla sutil si fallas */}
      <div style={{ animation: fallo ? 'shakeX 0.45s ease' : 'none' }}>
      <Card key={question.id} C={C} isLight={isLight} className="fu" style={{ padding: '20px 22px', borderLeft: `4px solid ${meta.color}` }}>
        <div style={{ fontSize: 15, lineHeight: 1.7, color: C.text, fontWeight: 500 }}>
          {/* AQUÍ APLICAMOS EL TRADUCTOR */}
          {renderRichText(question.text)}
        </div>
      </Card>
      </div>

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

          {/* 🔄 EL REPASO: cambia esta respuesta fallida (una vez por test) */}
          {repasoDisponible && selected !== question.correct && (
            <button onClick={onUsarRepaso} style={{
              width: '100%', marginTop: 14, padding: '13px', borderRadius: 14, position: 'relative', zIndex: 1,
              border: '1.5px dashed rgba(96,165,250,0.55)', background: 'rgba(96,165,250,0.10)',
              color: '#60A5FA', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              animation: 'chestBeat 2.4s ease-in-out infinite' }}>
              <PkIc n="refresh" s={15} c="#60A5FA"/> Usar El Repaso: cambiar mi respuesta
            </button>
          )}
          <div style={{ marginTop: 20, position: 'relative', zIndex: 1 }}>
            <PrimaryBtn C={C} onClick={onNext}>{questionIdx < total - 1 ? 'Siguiente Desafío →' : 'Ver Resultados de la Expedición'}</PrimaryBtn>
          </div>
        </div>
      )}

      {/* 🐸 LA PREGUNTA DE COMODÍN: marca esta pregunta como correcta */}
      {comodinDisponible && !animating && (
        <button onClick={onUsarComodin} style={{
          width: '100%', padding: '12px', borderRadius: 14, marginTop: 4,
          border: '1.5px dashed rgba(212,175,55,0.55)', background: 'rgba(212,175,55,0.10)',
          color: '#D4AF37', fontSize: 12.5, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <PkIc n="rana" s={15} c="#D4AF37"/> Usar Comodín: esta pregunta cuenta como correcta
        </button>
      )}
      </div>
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

async function fetchGeminiQuestions(subjects, count, opts = {}) {
  if (!GEMINI_API_KEY) throw new Error("Falta la Llave Maestra de IA.");
  const subjectList = subjects.join(', ');
  const dificultad = opts.dificultad || 'Alta';

  // Instrucción visual: los modos rápidos piden preguntas compactas sin contextos largos
  const reglaVisual = opts.compact
    ? `🚨 MODO RÁPIDO 🚨
Estas preguntas son para un modo CONTRARRELOJ: deben ser CORTAS y directas.
- "context" SIEMPRE debe ser null. PROHIBIDO incluir textos largos, tablas o gráficas.
- El enunciado ("text") máximo 35 palabras. Las opciones máximo 10 palabras cada una.
- Deben poder responderse en menos de 10 segundos por alguien preparado.`
    : `🚨 REGLA VISUAL DE VIDA O MUERTE 🚨
ES OBLIGATORIO que AL MENOS LA MITAD de las preguntas tengan el campo "context" con datos visuales. NUNCA devuelvas todas las preguntas con "context": null. ¡Invéntate tablas, gráficas, textos o avisos!`;

  // ¡El nuevo cerebro ESTRICTO del examinador!
  const prompt = `Eres un examinador experto del ICFES Saber 11 de Colombia.
Tu ÚNICA tarea es generar exactamente ${count} preguntas de examen NUEVAS y ORIGINALES (nunca repitas preguntas típicas de banco).
Distribución de materias: ${subjectList}
Dificultad: ${dificultad}. Formato ICFES real, análisis crítico y pensamiento profundo.

${reglaVisual}

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

// ═════════════════════════════════════════════
//  CENTRO DE MANDO — Constantes, helpers y capas
// ═════════════════════════════════════════════
const dateKeyISO = (offsetDays = 0) => {
  const d = new Date(); d.setDate(d.getDate() + offsetDays);
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const hashStr = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
};

function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = (Math.abs(seed) % 2147483646) + 1;
  const rnd = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Reto del Día: 3 preguntas fijas por fecha, dificultad creciente
function retoQuestionsFor(dk) {
  const shuffled = seededShuffle(ICFES_QUESTIONS, hashStr('reto-' + dk));
  const r1 = shuffled.find(q => q.subject === 'Lectura Crítica' || q.subject === 'Inglés');
  const r2 = shuffled.find(q => (q.subject === 'Ciencias Sociales' || q.subject === 'Ciencias Naturales') && q !== r1);
  const r3 = shuffled.find(q => q.subject === 'Matemáticas' && q !== r1 && q !== r2);
  const picked = [r1, r2, r3].filter(Boolean);
  for (const q of shuffled) { if (picked.length >= 3) break; if (!picked.includes(q)) picked.push(q); }
  return picked.slice(0, 3);
}
const RETO_TIME    = [15, 30, 45];
const RETO_NOMBRES = ['Calentamiento', 'El Corchazo', 'El Jefe Final'];

// Niveles del Fuego de Racha (efecto CSS puro) — evoluciona de NATURALEZA, no solo de tamaño
const FIRE_LEVELS = [
  { min: 50, id: 6, name: 'Fuego Ancestral',  frase: 'Tumbaga eterna',  main: '#FFF8DC', deep: '#D4AF37', halo: 'rgba(255,235,160,0.60)', h: 104, parts: 12, glowR: 130 },
  { min: 30, id: 5, name: 'Fuego Legendario', frase: 'Inmortal',        main: '#FFE9A8', deep: '#D4AF37', halo: 'rgba(255,215,94,0.50)',  h: 96,  parts: 10, glowR: 120 },
  { min: 14, id: 4, name: 'Hoguera',          frase: 'Imparable',       main: '#FBBF24', deep: '#D4AF37', halo: 'rgba(251,191,36,0.42)',  h: 82,  parts: 7,  glowR: 80 },
  { min: 7,  id: 3, name: 'Fuego Estable',    frase: 'En candela',      main: '#FBBF24', deep: '#F59E0B', halo: 'rgba(245,158,11,0.35)',  h: 68,  parts: 5,  glowR: 60 },
  { min: 3,  id: 2, name: 'Llama Joven',      frase: 'Va prendiendo',   main: '#F59E0B', deep: '#E8743A', halo: 'rgba(232,116,58,0.28)',  h: 52,  parts: 3,  glowR: 40 },
  { min: 1,  id: 1, name: 'Chispa',           frase: 'Apenas prende',   main: '#E8743A', deep: '#B45309', halo: 'rgba(232,116,58,0.18)',  h: 30,  parts: 1,  glowR: 20 },
  { min: 0,  id: 0, name: 'Ceniza Muerta',    frase: 'Prende esto ya',  main: '#6B7280', deep: '#374151', halo: 'rgba(107,114,128,0.08)', h: 26,  parts: 0,  glowR: 0 },
];
const fireLevelFor = (streak) => FIRE_LEVELS.find(l => streak >= l.min) || FIRE_LEVELS[FIRE_LEVELS.length - 1];

// Niveles del Cofre de la Racha
const CHEST_LEVELS = [
  { min: 30, id: 'tumbaga', name: 'Cofre de Tumbaga', c1: '#FFE9A8', c2: '#D4AF37', c3: '#7A5A10', emp: [1200, 2400], xp: [600, 1000], rarezaItem: 'legendario', itemChance: 0.55 },
  { min: 14, id: 'oro',     name: 'Cofre de Oro',     c1: '#FFE082', c2: '#E8B428', c3: '#8A6212', emp: [600, 1100],  xp: [300, 600],  rarezaItem: 'épico',      itemChance: 0.42 },
  { min: 7,  id: 'plata',   name: 'Cofre de Plata',   c1: '#E8ECEF', c2: '#AEB8C2', c3: '#525E6A', emp: [280, 500],   xp: [160, 320],  rarezaItem: 'raro',       itemChance: 0.30 },
  { min: 3,  id: 'bronce',  name: 'Cofre de Bronce',  c1: '#E8A05C', c2: '#B06A2E', c3: '#5E3512', emp: [120, 220],   xp: [90, 160],   rarezaItem: 'poco común', itemChance: 0.20 },
  { min: 0,  id: 'madera',  name: 'Cofre de Madera',  c1: '#B08050', c2: '#7A4E28', c3: '#42280F', emp: [50, 110],    xp: [40, 90],    rarezaItem: null,         itemChance: 0 },
];
const chestLevelFor = (streak) => CHEST_LEVELS.find(l => streak >= l.min) || CHEST_LEVELS[CHEST_LEVELS.length - 1];

// Logros secretos — no se listan en ninguna parte: solo aparecen al caer
const SECRET_LOGROS = {
  noctambulo: { id: 'noctambulo', name: 'El Noctámbulo',   desc: 'Sello Perfecto pasadas las 11 de la noche. La luna fue testigo.', icon: 'eye',    ryo: 100, xp: 200 },
  impoluta:   { id: 'impoluta',   name: 'Racha Impoluta',  desc: '7 Sellos Perfectos seguidos en el Reto del Día. Ni una sola grieta.', icon: 'target', ryo: 300, xp: 600 },
  goliat:     { id: 'goliat',     name: 'David vs Goliat', desc: 'Le ganaste un Duelo Flash a alguien 3+ niveles arriba tuyo.',     icon: 'swords', ryo: 200, xp: 400 },
  maraton:    { id: 'maraton',    name: 'Maratón',         desc: 'Leíste 60 minutos en un solo día. Las páginas te temen.',         icon: 'timer',  ryo: 150, xp: 300 },
  hattrick:   { id: 'hattrick',   name: 'Hat Trick',       desc: 'Ganaste 3 Duelos Flash seguidos. Imparable, parce.',              icon: 'flame',  ryo: 250, xp: 500 },
};

const GHOST_NAMES = ['El Mohán', 'La Madremonte', 'El Sombrerón', 'La Patasola', 'El Hojarasquín'];

// ─────────────────────────────────────────────
//  GRECA DIVIDER — zigzag del sombrero vueltiao
// ─────────────────────────────────────────────
function GrecaDivider({ isLight }) {
  const c = isLight ? 'rgba(140,110,45,0.45)' : 'rgba(212,175,55,0.35)';
  const pts = Array.from({ length: 13 }, (_, i) => `${i * 10} ${i % 2 === 0 ? 7 : 1}`).join(' L');
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, padding: '1px 0' }}>
      <div style={{ width: 26, height: 1, background: c, opacity: 0.5 }}/>
      <svg width="120" height="8" viewBox="0 0 120 8">
        <path d={`M${pts}`} fill="none" stroke={c} strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
      <div style={{ width: 26, height: 1, background: c, opacity: 0.5 }}/>
    </div>
  );
}

// ─────────────────────────────────────────────
//  EL ALTAR DEL TEMPLO — base de piedra precolombina para la llama
// ─────────────────────────────────────────────
function AltarDelTemplo({ lvl, off }) {
  const glow = off ? 'rgba(148,163,184,0.15)' : `${lvl.main}26`;
  return (
    <div style={{ position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)',
      width: 210, pointerEvents: 'none' }}>
      {/* Runas laterales que respiran alternadas */}
      {[0, 1].map(i => (
        <svg key={i} viewBox="0 0 24 24" width="22" height="22" fill="none"
          stroke={off ? '#64748B' : lvl.main} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: 'absolute', bottom: 26, [i === 0 ? 'left' : 'right']: 4,
            animation: `${i === 0 ? 'runaBreath' : 'runaBreathAlt'} 3s ease-in-out infinite` }}>
          <path d={PETROGLIFOS_MARCA[i]}/>
        </svg>
      ))}
      <svg viewBox="0 0 210 58" width="210" height="58" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="altarPiedra" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A5568"/>
            <stop offset="100%" stopColor="#2D3748"/>
          </linearGradient>
        </defs>
        <ellipse cx="105" cy="54" rx="96" ry="6" fill="rgba(0,0,0,0.4)"/>
        <rect x="5" y="40" width="200" height="15" rx="4" fill="url(#altarPiedra)"/>
        <rect x="35" y="26" width="140" height="15" rx="4" fill="url(#altarPiedra)"/>
        <rect x="60" y="15" width="90" height="12" rx="4" fill="url(#altarPiedra)"/>
        <rect x="60" y="15" width="90" height="12" rx="4" fill={glow}/>
        <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" fill="none">
          <path d="M20 47 q4 -4 8 0 q4 4 8 0"/>
          <path d="M174 47 q4 -4 8 0 q4 4 8 0"/>
          <circle cx="105" cy="47.5" r="3.4"/>
          <path d="M105 42.5 v-2 M105 52.5 v2 M100 47.5 h-2 M110 47.5 h2"/>
          <path d="M50 33 h4 M56 30 v6"/>
          <path d="M160 33 h-4 M154 30 v6"/>
        </g>
        <g fill="rgba(255,255,255,0.07)">
          <rect x="5" y="40" width="200" height="2" rx="1"/>
          <rect x="35" y="26" width="140" height="2" rx="1"/>
          <rect x="60" y="15" width="90" height="2" rx="1"/>
        </g>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
//  CAPA 5 — FUEGO DE RACHA (CSS puro, evoluciona)
// ─────────────────────────────────────────────
function FuegoRacha({ streak, C, week, sealed, isLight, enAltar = false }) {
  const lvl = fireLevelFor(streak);
  const off = lvl.id === 0;
  const spark = lvl.id === 1;
  const legendary = lvl.id >= 5;   // Legendario y Ancestral
  const ancestral = lvl.id === 6;
  const numColor = off ? C.textMuted : (isLight && lvl.id <= 2 ? lvl.deep : lvl.main);

  // Interactividad: chispas al tocar + boost al completar algo + nervios si peligra
  const [burst, setBurst] = useState(null);   // { key } → chispas disparadas
  const [boost, setBoost] = useState(null);   // key → crece momentáneamente
  const nervous = !sealed && streak > 0 && new Date().getHours() >= 18;

  useEffect(() => {
    const onBoost = () => {
      setBoost(Date.now());
      setBurst({ key: Date.now() });
      setTimeout(() => setBoost(null), 1100);
      setTimeout(() => setBurst(null), 1200);
    };
    window.addEventListener('pkFireBoost', onBoost);
    return () => window.removeEventListener('pkFireBoost', onBoost);
  }, []);

  const tocarFuego = () => {
    if (off) { FX.play('tap'); FX.vibrate('light'); return; }
    FX.play('sparks'); FX.vibrate('medium');
    setBurst({ key: Date.now() });
    setTimeout(() => setBurst(null), 1200);
  };

  // Partículas ascendentes según nivel
  const parts = Array.from({ length: lvl.parts }, (_, i) => i);
  // Chispas del burst (12-15 en todas direcciones)
  const burstSparks = burst ? Array.from({ length: 14 }, (_, i) => {
    const ang = (i / 14) * Math.PI * 2 + (burst.key % 7) * 0.13;
    const dist = 55 + (i % 4) * 22;
    return { x: Math.round(Math.cos(ang) * dist), y: Math.round(Math.sin(ang) * dist) - 20, d: (i % 5) * 0.04 };
  }) : [];

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
      {/* Tinte dorado del fondo (Legendario+) */}
      {legendary && (
        <div style={{ position: 'absolute', inset: -28, borderRadius: 32, pointerEvents: 'none',
          background: `radial-gradient(circle at 50% 38%, rgba(212,175,55,${ancestral ? 0.22 : 0.16}), transparent 65%)`,
          animation: 'goldTint 4s ease-in-out infinite' }}/>
      )}

      {/* Escenario del fuego (tocable) */}
      <div onClick={tocarFuego} style={{ position: 'relative', width: 170, height: lvl.h + 34, cursor: 'pointer',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center', WebkitTapHighlightColor: 'transparent' }}>

        {/* El Altar del Templo bajo la llama */}
        {enAltar && <AltarDelTemplo lvl={lvl} off={off}/>}
        {/* Sombra de la llama sobre la plataforma */}
        {enAltar && !off && (
          <div style={{ position: 'absolute', bottom: 4, left: '50%', width: 60, height: 8, borderRadius: '50%',
            background: `radial-gradient(ellipse, ${lvl.main}66 0%, transparent 70%)`,
            animation: 'sombraLlama 2.2s ease-in-out infinite', pointerEvents: 'none' }}/>
        )}

        {/* Glow radial grande detrás de la llama */}
        {!off && lvl.glowR > 0 && (
          <div style={{ position: 'absolute', bottom: -lvl.glowR * 0.35, left: '50%', transform: 'translateX(-50%)',
            width: lvl.glowR * 2, height: lvl.glowR * 2, borderRadius: '50%', pointerEvents: 'none',
            background: `radial-gradient(circle at center, ${lvl.halo} 0%, transparent 62%)`,
            opacity: lvl.id >= 4 ? 0.9 : 0.7,
            animation: 'groundFlicker 2.4s ease-in-out infinite' }}/>
        )}

        {/* Halo en el suelo */}
        <div style={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)',
          width: lvl.h * 2.2, height: lvl.h * 1.1, borderRadius: '50%',
          background: `radial-gradient(ellipse at center, ${lvl.halo} 0%, transparent 68%)`,
          filter: 'blur(7px)', animation: off ? 'none' : 'groundFlicker 2.2s ease-in-out infinite',
          opacity: isLight ? 0.7 : 1,
          pointerEvents: 'none' }}/>

        {/* Anillo de luz giratorio (Legendario+) */}
        {legendary && (
          <div style={{ position: 'absolute', bottom: lvl.h * 0.16, left: '50%', marginLeft: -(lvl.h * 0.78),
            width: lvl.h * 1.56, height: lvl.h * 1.56, borderRadius: '50%', pointerEvents: 'none',
            border: '1.5px solid transparent', borderTopColor: '#FFE9A8AA', borderRightColor: '#D4AF3744',
            animation: 'fireRingSpin 6s linear infinite' }}/>
        )}
        {/* Segundo halo exterior punteado (Ancestral) */}
        {ancestral && (
          <div style={{ position: 'absolute', bottom: lvl.h * 0.02, left: '50%', marginLeft: -(lvl.h * 0.95),
            width: lvl.h * 1.9, height: lvl.h * 1.9, borderRadius: '50%', pointerEvents: 'none',
            border: '1.5px dashed rgba(212,175,55,0.5)',
            animation: 'fireRingSpinRev 16s linear infinite' }}/>
        )}

        {/* Contenedor de la llama: recibe boost y nervios */}
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end',
          justifyContent: 'center', transformOrigin: '50% 100%',
          animation: boost ? 'fireBoostPop 1s cubic-bezier(0.34,1.56,0.64,1) both'
            : nervous && !off ? 'fireNervous 0.9s ease-in-out infinite' : 'none' }}>

          {/* ── DÍA 0: ceniza muerta ── */}
          {off && (
            <>
              <div style={{ width: 42, height: 26, borderRadius: '50% 50% 46% 46% / 70% 70% 34% 34%',
                background: 'radial-gradient(circle at 40% 30%, #4B5563, #1F2937)', opacity: 0.3 }}/>
              {/* Hilito de humo */}
              <div style={{ position: 'absolute', bottom: 24, left: '50%', width: 8, height: 46,
                background: 'linear-gradient(to top, rgba(156,163,175,0.5), transparent)',
                borderRadius: '50%', filter: 'blur(3px)',
                animation: 'smokeWisp 4.5s ease-out infinite', pointerEvents: 'none' }}/>
              <div style={{ position: 'absolute', bottom: 24, left: '50%', width: 6, height: 38,
                background: 'linear-gradient(to top, rgba(156,163,175,0.4), transparent)',
                borderRadius: '50%', filter: 'blur(2.5px)',
                animation: 'smokeWisp 4.5s ease-out infinite 2.2s', pointerEvents: 'none' }}/>
            </>
          )}

          {/* ── DÍAS 1-2: chispa pulsante ── */}
          {spark && (
            <div style={{ width: 16, height: 16, borderRadius: '50%', marginBottom: 8,
              background: 'radial-gradient(circle at 40% 35%, #FFC53D, #E8743A 70%)',
              boxShadow: '0 0 14px #E8743A99',
              animation: 'sparkBeat 1.5s ease-in-out infinite' }}/>
          )}

          {/* ── DÍAS 3+: llama con capas ── */}
          {!off && !spark && (
            <>
              {/* Capa roja exterior (Hoguera+) */}
              {lvl.id >= 4 && (
                <div style={{ position: 'absolute', bottom: 0, left: '50%', marginLeft: -lvl.h * 0.44,
                  width: lvl.h * 0.88, height: lvl.h * 1.06,
                  background: `linear-gradient(to top, #B91C1C 4%, #EF4444 45%, transparent 92%)`,
                  borderRadius: '48% 52% 24% 26% / 72% 74% 26% 28%',
                  filter: 'blur(5px)', transformOrigin: '50% 100%',
                  animation: 'fireDance 3.1s ease-in-out infinite', opacity: 0.8 }}/>
              )}
              {/* Llama exterior */}
              <div style={{ width: lvl.h * 0.76, height: lvl.h,
                background: `linear-gradient(to top, ${lvl.deep} 8%, ${lvl.main} 52%, #FFE9A8 88%)`,
                borderRadius: '48% 52% 24% 26% / 72% 74% 26% 28%',
                filter: 'blur(4px)', transformOrigin: '50% 100%',
                animation: 'fireDance 2.6s ease-in-out infinite',
                opacity: 0.95 }}/>
              {/* Llama media */}
              <div style={{ position: 'absolute', bottom: 2, left: '50%', marginLeft: -lvl.h * 0.21,
                width: lvl.h * 0.42, height: lvl.h * 0.62,
                background: `linear-gradient(to top, ${lvl.main}, #FFF3C4)`,
                borderRadius: '46% 54% 30% 30% / 68% 70% 30% 32%',
                filter: 'blur(3px)', transformOrigin: '50% 100%',
                animation: 'fireDance 1.9s ease-in-out infinite reverse' }}/>
              {/* Núcleo blanco (Estable+) */}
              {lvl.id >= 3 && (
                <div style={{ position: 'absolute', bottom: 3, left: '50%', marginLeft: -lvl.h * 0.10,
                  width: lvl.h * 0.20, height: lvl.h * 0.34,
                  background: 'linear-gradient(to top, #FFF8E1, #FFFDF4)',
                  borderRadius: '50% 50% 34% 34% / 66% 66% 34% 34%',
                  filter: 'blur(2px)', transformOrigin: '50% 100%',
                  animation: 'fireCore 1.3s ease-in-out infinite', opacity: 0.92 }}/>
              )}
              {/* Shimmer dorado deslizante (Hoguera+) */}
              {lvl.id >= 4 && (
                <div style={{ position: 'absolute', bottom: 0, left: '50%', marginLeft: -lvl.h * 0.38,
                  width: lvl.h * 0.76, height: lvl.h, overflow: 'hidden', pointerEvents: 'none',
                  borderRadius: '48% 52% 24% 26% / 72% 74% 26% 28%' }}>
                  <div style={{ position: 'absolute', top: 0, bottom: 0, width: '35%',
                    background: 'linear-gradient(110deg, transparent, rgba(255,248,220,0.35), transparent)',
                    animation: 'shimmerSlide 2.6s ease-in-out infinite' }}/>
                </div>
              )}
              {/* Ondas de calor (Ancestral) */}
              {ancestral && (
                <div style={{ position: 'absolute', bottom: lvl.h * 0.55, left: '50%', marginLeft: -lvl.h * 0.5,
                  width: lvl.h, height: lvl.h * 0.7, borderRadius: '50%', pointerEvents: 'none',
                  backdropFilter: 'blur(1px)', WebkitBackdropFilter: 'blur(1px)',
                  animation: 'heatWave 2.2s ease-in-out infinite' }}/>
              )}
              {/* Pulso de luz cada 5 segundos (Ancestral) */}
              {ancestral && (
                <div style={{ position: 'absolute', bottom: -14, left: '50%', marginLeft: -110,
                  width: 220, height: 220, borderRadius: '50%', pointerEvents: 'none',
                  background: 'radial-gradient(circle, rgba(255,248,220,0.5) 0%, transparent 60%)',
                  animation: 'fireHeartbeat 5s ease-in-out infinite' }}/>
              )}
            </>
          )}

          {/* Brasas parpadeantes en la base (Hoguera+) */}
          {lvl.id >= 4 && [0, 1, 2, 3].map(i => (
            <div key={`br${i}`} style={{ position: 'absolute', bottom: 1 + (i % 2) * 4,
              left: `${32 + i * 11}%`, width: 5, height: 5, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #FFE9A8, #E8743A)',
              boxShadow: '0 0 7px #F59E0B', pointerEvents: 'none',
              animation: `brasaBlink ${1.4 + (i % 3) * 0.6}s ease-in-out infinite ${i * 0.4}s` }}/>
          ))}

          {/* Chispas laterales ocasionales (Estable+) */}
          {lvl.id >= 3 && [0, 1].map(i => (
            <div key={`sf${i}`} style={{ position: 'absolute', bottom: lvl.h * 0.5, left: '50%',
              width: 3.5, height: 3.5, borderRadius: '50%', background: '#FFD75E',
              boxShadow: `0 0 6px ${lvl.main}`, pointerEvents: 'none',
              '--fx': `${i % 2 ? 42 : -46}px`, '--fy': `${-14 - i * 10}px`,
              animation: `flameSparkFly ${2.6 + i}s ease-out infinite ${i * 1.3}s` }}/>
          ))}

          {/* Destellos tipo estrella dentro del fuego (Legendario+) */}
          {legendary && [0, 1, 2].map(i => (
            <div key={`st${i}`} style={{ position: 'absolute', bottom: lvl.h * (0.3 + i * 0.2),
              left: `${42 + (i % 3) * 8}%`, width: 7, height: 7, pointerEvents: 'none',
              background: '#fff',
              clipPath: 'polygon(50% 0%,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0% 50%,38% 38%)',
              filter: 'drop-shadow(0 0 5px #FFF8DC)',
              animation: `starBlinkIn ${2.2 + i * 0.9}s ease-in-out infinite ${i * 0.8}s` }}/>
          ))}
        </div>

        {/* Partículas ascendentes (con drift y trails según nivel) */}
        {parts.map(i => {
          const conTrail = lvl.id >= 6 || (lvl.id >= 5 && i % 3 === 0);
          const dorada = legendary && i % 2 === 0;
          return conTrail ? (
            <div key={i} style={{ position: 'absolute', bottom: 10 + (i % 3) * 7,
              left: `${32 + (i * 9) % 40}%`, width: 2.5, height: 14, borderRadius: 99,
              background: `linear-gradient(to top, transparent, ${dorada ? '#FFF8DC' : lvl.main})`,
              boxShadow: `0 0 5px ${dorada ? '#FFE9A8' : lvl.main}`, pointerEvents: 'none',
              '--dx': `${(i % 2 ? 1 : -1) * (8 + (i % 4) * 6)}px`,
              animation: `emberTrail ${1.7 + (i % 4) * 0.45}s ease-out infinite ${(i * 0.37) % 2}s` }}/>
          ) : (
            <div key={i} style={{ position: 'absolute', bottom: 8 + (i % 3) * 6,
              left: `${34 + (i * 11) % 36}%`,
              width: i % 2 ? 2.5 : 3.5, height: i % 2 ? 2.5 : 3.5, borderRadius: '50%',
              background: dorada ? '#FFF8DC' : i % 3 === 0 ? '#FFD75E' : lvl.main,
              boxShadow: `0 0 6px ${lvl.main}`,
              animation: `emberFloat ${1.6 + (i % 4) * 0.5}s ease-out infinite ${(i * 0.45) % 2}s`,
              pointerEvents: 'none' }}/>
          );
        })}

        {/* Chispas del toque / boost (fuegos artificiales) */}
        {burstSparks.map((s, i) => (
          <div key={`${burst.key}-${i}`} style={{ position: 'absolute', bottom: lvl.h * 0.45, left: '50%',
            width: i % 2 ? 4 : 6, height: i % 2 ? 4 : 6, borderRadius: '50%',
            background: i % 3 === 0 ? '#FFF3C4' : lvl.main === '#6B7280' ? '#F59E0B' : lvl.main,
            boxShadow: `0 0 8px ${legendary ? '#FFE9A8' : '#F59E0B'}`, pointerEvents: 'none',
            '--spx': `${s.x}px`, '--spy': `${s.y}px`,
            animation: `streakSpark 0.9s ease-out ${s.d}s both` }}/>
        ))}
      </div>

      {/* Número: runa iluminada del altar (enAltar) o texto flotante */}
      <div style={enAltar ? {
        position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
        marginTop: 30, padding: '7px 26px 9px', borderRadius: 13,
        background: off ? 'rgba(51,65,85,0.35)' : `${lvl.main}14`,
        border: `1px solid ${off ? 'rgba(71,85,105,0.3)' : lvl.main + '2E'}`,
        boxShadow: off ? 'none' : `0 4px 18px ${lvl.halo}, inset 0 1px 0 rgba(255,255,255,0.06)`,
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
      } : { display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
          <span style={{ fontSize: enAltar ? 32 : 42, fontWeight: 900, lineHeight: 1,
            color: numColor,
            textShadow: off ? 'none' : isLight ? `0 2px 10px ${lvl.halo}` : `0 0 24px ${lvl.halo}` }}>{streak}</span>
          <span style={{ fontSize: enAltar ? 11 : 13, fontWeight: 800, color: off ? C.textMuted : `${numColor}CC` }}>
            {streak === 1 ? 'día' : 'días'}
          </span>
        </div>
        <div style={{ fontSize: enAltar ? 8 : 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase',
          color: numColor, marginTop: 4, opacity: 0.92 }}>
          {lvl.frase}
        </div>
        {/* Puntos de la semana */}
        <div style={{ display: 'flex', gap: enAltar ? 5 : 7, marginTop: enAltar ? 7 : 10 }}>
          {week.map((on, i) => (
            <div key={i} style={{ width: enAltar ? 7 : 9, height: enAltar ? 7 : 9, borderRadius: '50%',
              background: on ? (off ? C.textMuted : numColor) : 'transparent',
              border: on ? 'none' : `1.5px solid ${C.borderStrong || C.border}`,
              boxShadow: on && !off ? `0 0 6px ${lvl.halo}` : 'none' }}/>
          ))}
        </div>
      </div>

      {!enAltar && !sealed && streak > 0 && (
        <div style={{ marginTop: 9, fontSize: 11, fontWeight: 700, color: '#E8743A',
          display: 'flex', alignItems: 'center', gap: 5, position: 'relative' }}>
          <PkIc n="flame" s={11} c="#E8743A"/> Sella hoy o el fuego se apaga
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  CAPA 6 — LOGRO SECRETO (overlay cinematográfico)
// ─────────────────────────────────────────────
function LogroSecretoOverlay({ logro, onClose }) {
  useEffect(() => { FX.play('levelUp'); FX.vibrate('heavy'); }, []);
  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99998,
      background: 'rgba(2,4,8,0.93)', backdropFilter: 'blur(14px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 340 }}>
        <div style={{ position: 'absolute', top: -50, left: '50%', width: 360, height: 360, marginLeft: -180,
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(212,175,55,0.20) 12deg, transparent 26deg, transparent 46deg, rgba(212,175,55,0.15) 60deg, transparent 74deg, transparent 100deg, rgba(212,175,55,0.20) 114deg, transparent 128deg, transparent 150deg, rgba(212,175,55,0.16) 164deg, transparent 178deg, transparent 205deg, rgba(212,175,55,0.20) 220deg, transparent 234deg, transparent 262deg, rgba(212,175,55,0.15) 276deg, transparent 290deg, transparent 316deg, rgba(212,175,55,0.18) 330deg, transparent 344deg)',
          borderRadius: '50%', animation: 'raysSpin 9s linear infinite', pointerEvents: 'none' }}/>
        <div style={{ position: 'relative', animation: 'popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <div style={{ width: 96, height: 96, borderRadius: '50%', margin: '0 auto 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'radial-gradient(circle at 35% 30%, #FFE9A8, #D4AF37 55%, #8A6410)',
            boxShadow: '0 0 44px rgba(212,175,55,0.55), inset 0 2px 8px rgba(255,255,255,0.4)' }}>
            <PkIc n={logro.icon} s={44} c="#3A2A08"/>
          </div>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3.5, color: '#D4AF37', marginBottom: 8 }}>
            LOGRO SECRETO DESBLOQUEADO
          </div>
          <div className="serif" style={{ fontSize: 28, fontWeight: 800, color: '#F5F2EB', marginBottom: 10 }}>
            {logro.name}
          </div>
          <div style={{ fontSize: 13.5, color: 'rgba(245,242,235,0.75)', lineHeight: 1.6, marginBottom: 16 }}>
            {logro.desc}
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '8px 18px',
            borderRadius: 99, background: 'rgba(212,175,55,0.12)',
            border: '1px solid rgba(212,175,55,0.35)', marginBottom: 22 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 800, color: '#D4AF37' }}>
              <PkIc n="empanada" s={14} c="#D4AF37"/>+{logro.ryo}
            </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#A78BFA' }}>+{logro.xp} XP</span>
          </div>
          <button onClick={onClose} style={{ display: 'block', width: '100%', padding: '14px',
            borderRadius: 14, border: 'none',
            background: 'linear-gradient(135deg, #D4AF37, #A8821E)', color: '#1A1206',
            fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 6px 24px rgba(212,175,55,0.4)' }}>
            ¡Qué chimba!
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  CAPA 2 — QUIÉN ANDA AQUÍ (presencia en vivo)
// ─────────────────────────────────────────────
const PRESENCE_LABELS = {
  simulacro: 'en un simulacro',
  leyendo:   'leyendo',
  duelo:     'en un Duelo Flash',
  reto:      'en el Reto del Día',
  online:    'en línea',
};

function PresenciaViva({ C, user }) {
  const [pres, setPres] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!fbOK()) return;
    const unsub = FB().onValue(FB().ref(FB().db, 'presence'), snap => {
      if (!snap.exists()) { setPres([]); return; }
      const now = Date.now();
      const list = Object.values(snap.val())
        .filter(p => p && p.code && p.code !== user?.code && p.ts && (now - p.ts) < 5 * 60 * 1000)
        .sort((a, b) => (b.ts || 0) - (a.ts || 0));
      setPres(list);
    });
    return () => unsub && unsub();
  }, [user?.code]);

  const mins = ts => Math.max(0, Math.round((Date.now() - ts) / 60000));
  const n = pres.length;

  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
      <button onClick={() => { if (n > 0) { setOpen(o => !o); FX.play('tap'); } }} style={{
        width: '100%', padding: '11px 14px', background: 'none', border: 'none',
        cursor: n > 0 ? 'pointer' : 'default', fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', gap: 9, textAlign: 'left' }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', flexShrink: 0,
          background: n > 0 ? '#22C55E' : C.textMuted,
          animation: n > 0 ? 'presenceBlink 2s ease-in-out infinite' : 'none' }}/>
        <span style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: n > 0 ? C.text : C.textMuted }}>
          {n > 0
            ? `${n} parcero${n > 1 ? 's' : ''} estudiando ahora mismo`
            : 'Nadie estudiando ahorita — sé el primero'}
        </span>
        {n > 0 && (
          <span style={{ display: 'flex', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.25s' }}>
            <PkIc n="right" s={11} c={C.textMuted}/>
          </span>
        )}
      </button>
      {open && n > 0 && (
        <div className="fi" style={{ borderTop: `1px solid ${C.border}66`, padding: '4px 0' }}>
          {pres.slice(0, 6).map(p => (
            <div key={p.code} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 14px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', flexShrink: 0,
                animation: 'presenceBlink 2.4s ease-in-out infinite' }}/>
              <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>@{p.code}</span>
              <span style={{ flex: 1, fontSize: 11.5, color: C.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {PRESENCE_LABELS[p.status] || 'en línea'}
              </span>
              <span style={{ fontSize: 10.5, color: C.textMuted, whiteSpace: 'nowrap' }}>
                {mins(p.ts) === 0 ? 'ahora' : `hace ${mins(p.ts)} min`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  CAPA 3 — COFRE DE LA RACHA (recompensa misteriosa)
// ─────────────────────────────────────────────
function CofreSVG({ lv, open, size = 96 }) {
  return (
    <svg width={size} height={size * 0.84} viewBox="0 0 100 84" style={{ overflow: 'visible', display: 'block' }}>
      <rect x="10" y="36" width="80" height="42" rx="7" fill={lv.c2}/>
      <rect x="13" y="39" width="74" height="36" rx="5" fill={lv.c3} opacity="0.38"/>
      <rect x="22" y="36" width="7" height="42" rx="2.5" fill={lv.c1} opacity="0.55"/>
      <rect x="71" y="36" width="7" height="42" rx="2.5" fill={lv.c1} opacity="0.55"/>
      {open && <ellipse cx="50" cy="38" rx="32" ry="13" fill="#FFE9A8" opacity="0.9" style={{ filter: 'blur(6px)' }}/>}
      <g style={{ transform: open ? 'rotate(-36deg)' : 'rotate(0deg)', transformOrigin: '10px 36px',
        transition: 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <path d="M10 36 L10 26 Q10 10 30 10 L70 10 Q90 10 90 26 L90 36 Z" fill={lv.c1}/>
        <path d="M10 36 L10 26 Q10 10 30 10 L70 10 Q90 10 90 26 L90 36 Z" fill={lv.c2} opacity="0.42"/>
        <rect x="22" y="10" width="7" height="26" rx="2.5" fill={lv.c1}/>
        <rect x="71" y="10" width="7" height="26" rx="2.5" fill={lv.c1}/>
        <rect x="8" y="32" width="84" height="7" rx="3.5" fill={lv.c1}/>
      </g>
      {!open && <>
        <rect x="42" y="34" width="16" height="16" rx="4" fill={lv.c1}/>
        <rect x="45.5" y="38" width="9" height="8.5" rx="2" fill={lv.c3}/>
      </>}
    </svg>
  );
}

// ─────────────────────────────────────────────
//  SHOW DE APERTURA — cofre comprado en la tienda
//  (tiembla → grieta de luz → explosión → flash → recompensa)
// ─────────────────────────────────────────────
function ChestShopShow({ chest, premio, onClose }) {
  const lv = CHEST_SHOP_COLORS[chest.rarity] || CHEST_SHOP_COLORS['común'];
  const [stage, setStage] = useState('shake'); // shake | crack | explode | open

  useEffect(() => {
    FX.play('duelStart'); FX.vibrate('medium');
    const t1 = setTimeout(() => { setStage('crack'); FX.play('chestOpen'); FX.vibrate('heavy'); }, 500);
    const t2 = setTimeout(() => { setStage('explode'); FX.play('sparks'); FX.vibrate('heavy'); }, 1300);
    const t3 = setTimeout(() => { setStage('open'); FX.play(premio.item ? 'levelUp' : 'success'); }, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Portal>
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99997,
      background: 'rgba(2,4,8,0.94)', backdropFilter: 'blur(14px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={stage === 'open' ? onClose : undefined}>
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', textAlign: 'center', maxWidth: 340, width: '100%' }}>

        {/* Rayos giratorios al abrir */}
        {(stage === 'explode' || stage === 'open') && (
          <div style={{ position: 'absolute', top: -60, left: '50%', width: 380, height: 380, marginLeft: -190,
            background: `conic-gradient(from 0deg, transparent 0deg, ${lv.c2}30 12deg, transparent 26deg, transparent 60deg, ${lv.c2}24 74deg, transparent 88deg, transparent 130deg, ${lv.c2}30 144deg, transparent 158deg, transparent 200deg, ${lv.c2}26 214deg, transparent 228deg, transparent 270deg, ${lv.c2}30 284deg, transparent 298deg, transparent 330deg, ${lv.c2}24 344deg, transparent 358deg)`,
            borderRadius: '50%', animation: 'raysSpin 10s linear infinite', pointerEvents: 'none' }}/>
        )}

        {/* Flash blanco de la explosión */}
        {stage === 'explode' && (
          <div style={{ position: 'fixed', inset: 0, background: '#fff', pointerEvents: 'none',
            animation: 'whiteFlash 0.7s ease-out both', zIndex: 5 }}/>
        )}

        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color: lv.c1, marginBottom: 22, position: 'relative' }}>
          {chest.name.toUpperCase()}
        </div>

        <div style={{ position: 'relative', display: 'inline-block',
          animation: stage === 'shake' ? 'chestShake 0.45s ease-in-out infinite'
            : stage === 'crack' ? 'chestShake 0.35s ease-in-out infinite' : 'none',
          filter: `drop-shadow(0 12px 46px ${lv.c2}${stage === 'shake' ? '55' : '99'})` }}>
          <CofreSVG lv={lv} open={stage === 'open'} size={150}/>
          {stage === 'crack' && (
            <div style={{ position: 'absolute', top: '41%', left: '4%', right: '4%', height: 5,
              borderRadius: 99, background: '#FFFDF4',
              boxShadow: `0 0 26px #FFF3C4, 0 0 52px ${lv.c1}`, pointerEvents: 'none',
              animation: 'crackExpand 0.7s cubic-bezier(0.22,1,0.36,1) both' }}/>
          )}
          {(stage === 'explode' || stage === 'open') && Array.from({ length: 26 }, (_, i) => (
            <div key={i} style={{
              position: 'absolute', top: '32%', left: '50%', width: i % 2 ? 4 : 7, height: i % 2 ? 4 : 7,
              borderRadius: '50%', background: i % 3 === 0 ? '#FFF3C4' : i % 3 === 1 ? lv.c1 : lv.c2,
              boxShadow: `0 0 9px ${lv.c1}`,
              '--sx': `${Math.round(Math.cos((i / 26) * Math.PI * 2) * (60 + (i % 5) * 26))}px`,
              '--sy': `${Math.round(Math.sin((i / 26) * Math.PI * 2) * (48 + (i % 4) * 24)) - 40}px`,
              animation: `sparkRise ${0.75 + (i % 5) * 0.16}s ease-out ${i * 0.02}s both`,
              pointerEvents: 'none' }}/>
          ))}
          {stage === 'open' && premio.item && Array.from({ length: 12 }, (_, i) => (
            <div key={`cf${i}`} style={{
              position: 'absolute', top: '20%', left: '50%', width: 5, height: 9, borderRadius: 2,
              background: ['#F472B6', '#C084FC', '#FBBF24', '#34D399'][i % 4],
              '--sx': `${Math.round(Math.cos((i / 12) * Math.PI * 2) * (70 + (i % 3) * 30))}px`,
              '--sy': `${Math.round(Math.sin((i / 12) * Math.PI * 2) * 55) - 60}px`,
              animation: `sparkRise ${1 + (i % 4) * 0.2}s ease-out ${0.15 + i * 0.04}s both`,
              pointerEvents: 'none' }}/>
          ))}
        </div>

        {stage !== 'open' && (
          <div style={{ marginTop: 22, fontSize: 12.5, fontWeight: 800, letterSpacing: 1.5,
            color: 'rgba(245,242,235,0.6)', position: 'relative' }}>
            {stage === 'shake' ? 'Algo se mueve adentro…' : stage === 'crack' ? '¡Se está abriendo!' : '…'}
          </div>
        )}

        {stage === 'open' && (
          <div className="fi" style={{ marginTop: 24, position: 'relative', animation: 'rewardPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.15s both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 10 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 26, fontWeight: 900, color: lv.c1 }}>
                <PkIc n="empanada" s={24} c={lv.c1}/>+{premio.emp}
              </span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#A78BFA' }}>+{premio.xp} XP</span>
            </div>
            {premio.item && (
              <div style={{ margin: '0 auto 14px', maxWidth: 260, padding: '10px 16px', borderRadius: 14,
                background: 'rgba(212,175,55,0.10)', border: '1px solid rgba(212,175,55,0.4)' }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: '#D4AF37', marginBottom: 3 }}>
                  ¡CAYÓ UN TESORO!
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#F5F2EB' }}>{premio.item.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(245,242,235,0.6)', marginTop: 2 }}>
                  {premio.item.rarity} · ya está en tu mochila
                </div>
              </div>
            )}
            <button onClick={onClose} style={{ width: '100%', padding: '14px', borderRadius: 14,
              border: 'none', background: `linear-gradient(135deg, ${lv.c1}, ${lv.c2})`, color: '#1A1206',
              fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit' }}>
              ¡A la mochila!
            </button>
          </div>
        )}
      </div>
    </div>
    </Portal>
  );
}

function CofreRacha({ C, isLight, appState, setAppState, onMissionReward, onGoShop }) {
  const dk = dateKeyISO();
  const today = todayStr();
  const streak = appState.streakDays || 0;
  const lv = chestLevelFor(streak);
  const sealed = appState.yourConfirmed ||
    (appState.icfesHistory || []).some(r => r.date === today || (r.ts && new Date(r.ts).toDateString() === today));
  const openedToday = appState.cofreLastOpened === dk;
  const canOpen = sealed && !openedToday;

  const [modal, setModal]   = useState(false);
  const [stage, setStage]   = useState('closed'); // closed | crack | explode | open
  const [taps, setTaps]     = useState(0);        // golpes al cofre (3 para abrir)
  const [premio, setPremio] = useState(null);
  const next = [...CHEST_LEVELS].reverse().find(c => c.min > streak);
  const nivelesAsc = [...CHEST_LEVELS].reverse(); // madera → tumbaga
  const nivelIdx = nivelesAsc.findIndex(c => c.id === lv.id);
  const tituloColor = canOpen ? (isLight ? lv.c3 : lv.c1) : C.text;

  // 4 slots estilo Clash Royale: nivel actual + próximos niveles de cofre
  const startIdx = Math.max(0, Math.min(nivelIdx, nivelesAsc.length - 4));
  const slots = Array.from({ length: 4 }, (_, i) => {
    const gi = startIdx + i;
    const n = nivelesAsc[gi];
    if (!n) return { estado: 'bloqueado', nombre: '', cc: nivelesAsc[nivelesAsc.length - 1] };
    const cc = { c1: n.c1, c2: n.c2, c3: n.c3 };
    const nombre = n.name.replace('Cofre de ', '').replace('Cofre ', '');
    if (gi === nivelIdx) return { estado: canOpen ? 'listo' : 'pasado', nombre, cc, faltan: null };
    if (gi < nivelIdx) return { estado: 'pasado', nombre, cc, faltan: null };
    return { estado: 'proximo', nombre, cc, faltan: Math.max(0, n.min - streak) };
  });

  // Apertura escenificada: grieta de luz → explosión + flash → recompensa
  const abrir = () => {
    const rr = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    const emp = rr(lv.emp[0], lv.emp[1]);
    const xp  = rr(lv.xp[0], lv.xp[1]);
    let item = null;
    if (lv.rarezaItem && Math.random() < lv.itemChance) {
      const pool = SHOP_ITEMS.filter(i => i.rarity === lv.rarezaItem && i.type !== 'chest' && !(appState.inventory || []).includes(i.id));
      if (pool.length) item = pool[Math.floor(Math.random() * pool.length)];
    }
    setPremio({ emp, xp, item });
    setStage('crack');
    FX.play('chestOpen'); FX.vibrate('heavy');
    setTimeout(() => { setStage('explode'); FX.play('sparks'); FX.vibrate('heavy'); }, 750);
    setTimeout(() => {
      setStage('open');
      FX.play(item ? 'levelUp' : 'success');
      setAppState(s => ({
        ...s,
        ryo: (s.ryo || 0) + emp,
        xp:  (s.xp || 0) + xp,
        cofreLastOpened: dk,
        inventory: item ? [...(s.inventory || []), item.id] : (s.inventory || []),
      }));
      onMissionReward?.(emp);
      fireBoost();
    }, 1450);
  };

  // Interacción: 3 golpes al cofre para abrirlo
  const golpear = () => {
    if (!canOpen || stage !== 'closed') return;
    const n = taps + 1;
    setTaps(n);
    if (n === 1)      { FX.play('tap');  FX.vibrate('light'); }
    else if (n === 2) { FX.play('duel'); FX.vibrate('medium'); }
    else              { FX.play('duelStart'); FX.vibrate('heavy'); setTimeout(abrir, 620); }
  };

  const cerrarModal = () => { setModal(false); setStage('closed'); setTaps(0); setPremio(null); };

  return (
    <>
      {/* ── MIS COFRES: vitrina flotante del templo (sin card) ── */}
      <div style={{ padding: '0 2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.8, color: C.textMuted, flex: 1 }}>MIS COFRES</span>
          {canOpen ? (
            <button onClick={() => { FX.play('tap'); setModal(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 11, fontWeight: 800, color: lv.c1, padding: 0 }}>
              Abrir ahora →
            </button>
          ) : (
            <button onClick={() => { FX.play('tap'); onGoShop?.(); }} style={{ background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 11, fontWeight: 800, color: C.accent, padding: 0 }}>
              Ver Bazar →
            </button>
          )}
        </div>

        {/* Los cofres flotan libres en el espacio del templo */}
        <div style={{ display: 'flex', gap: 6 }}>
          {slots.map((slot, i) => (
            <button key={i} onClick={() => { FX.play('tap'); setModal(true); }}
              style={{ flex: 1, height: 96, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                padding: '6px 2px 2px', position: 'relative',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
              {slot.estado === 'bloqueado' ? (
                <>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" style={{ opacity: 0.4, marginBottom: 14 }}>
                    <rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                  </svg>
                  <span style={{ fontSize: 7.5, fontWeight: 700, color: C.textMuted, textAlign: 'center', lineHeight: 1.2 }}>Anterior primero</span>
                </>
              ) : slot.estado === 'proximo' ? (
                <>
                  <div style={{ width: 54, height: 50, borderRadius: 12, border: `1.5px dashed ${slot.cc.c2}45`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                    <div style={{ opacity: 0.35, filter: 'grayscale(0.6)' }}>
                      <CofreSVG lv={slot.cc} open={false} size={36}/>
                    </div>
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 800, color: C.textMuted, lineHeight: 1.1 }}>{slot.nombre}</span>
                  {slot.faltan != null && <span style={{ fontSize: 7.5, fontWeight: 700, color: `${C.textMuted}BB` }}>{slot.faltan}d más</span>}
                </>
              ) : (
                <>
                  <div style={{ position: 'relative',
                    animation: `chestFloat 3s ease-in-out infinite ${i * 0.8}s`, willChange: 'transform' }}>
                    <div style={{
                      filter: slot.estado === 'listo' ? `drop-shadow(0 0 10px ${slot.cc.c2}99)` : `drop-shadow(0 3px 6px rgba(0,0,0,0.4))`,
                      animation: slot.estado === 'listo' ? 'chestIdle 3.5s ease-in-out infinite' : 'none' }}>
                      <CofreSVG lv={slot.cc} open={false} size={44}/>
                    </div>
                    {/* Chispas del cofre listo */}
                    {slot.estado === 'listo' && [0, 1, 2].map(k => (
                      <div key={k} style={{ position: 'absolute', bottom: 4, left: `${22 + k * 24}%`,
                        width: 3, height: 3, borderRadius: '50%', background: slot.cc.c1,
                        boxShadow: `0 0 5px ${slot.cc.c2}`, pointerEvents: 'none',
                        animation: `emberFloat ${1.8 + k * 0.5}s ease-out infinite ${k * 0.6}s` }}/>
                    ))}
                    {/* La luz del cofre ilumina el piso */}
                    <div style={{ position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)',
                      width: 42, height: 7, borderRadius: '50%', pointerEvents: 'none',
                      background: `radial-gradient(ellipse, ${slot.cc.c2}${slot.estado === 'listo' ? '55' : '22'} 0%, transparent 70%)` }}/>
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 800, color: slot.estado === 'listo' ? slot.cc.c1 : C.textMuted, lineHeight: 1.1 }}>
                    {slot.nombre}
                  </span>
                  {slot.estado === 'listo' && (
                    <span style={{ position: 'absolute', top: 0, right: 4, fontSize: 7, fontWeight: 900, letterSpacing: 0.5,
                      color: '#1A1206', background: `linear-gradient(135deg, ${slot.cc.c1}, ${slot.cc.c2})`,
                      borderRadius: 99, padding: '2px 6px', boxShadow: `0 0 8px ${slot.cc.c2}`,
                      animation: 'listoPulse 1.5s ease-in-out infinite' }}>
                      ¡LISTO!
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        {/* Progreso al siguiente cofre */}
        <div style={{ marginTop: 8 }}>
          {openedToday ? (
            <div style={{ fontSize: 10, color: C.textMuted, textAlign: 'center' }}>
              {premio ? `Hoy salieron +${premio.emp} empanadas · vuelve mañana` : 'Ya abriste el cofre de hoy · vuelve mañana'}
            </div>
          ) : !sealed ? (
            <div style={{ fontSize: 10, color: C.textMuted, textAlign: 'center' }}>
              Sella tu racha (lee o haz un simulacro) para cargar el cofre de hoy
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8.5, fontWeight: 700, color: C.textMuted, marginBottom: 4 }}>
                <span>{next ? `Racha: ${streak} días` : `${lv.name} · nivel máximo`}</span>
                {next && <span style={{ color: next.c2 }}>{next.min - streak} para {next.name}</span>}
              </div>
              <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #FBBF24, #D4AF37)',
                  width: next ? `${Math.min(100, ((streak - (nivelesAsc[nivelIdx]?.min || 0)) / Math.max(1, next.min - (nivelesAsc[nivelIdx]?.min || 0))) * 100)}%` : '100%' }}/>
              </div>
            </>
          )}
        </div>
      </div>


      {/* ── Overlay de apertura (Portal → escapa del stacking context del Inicio) ── */}
      {modal && (
        <Portal>
        <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99995,
          background: 'rgba(2,4,8,0.94)', backdropFilter: 'blur(14px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={stage === 'open' || !canOpen ? cerrarModal : undefined}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', textAlign: 'center', maxWidth: 340, width: '100%' }}>

            {(stage === 'open' || stage === 'explode') && (
              <div style={{ position: 'absolute', top: -60, left: '50%', width: 380, height: 380, marginLeft: -190,
                background: `conic-gradient(from 0deg, transparent 0deg, ${lv.c2}30 12deg, transparent 26deg, transparent 50deg, ${lv.c2}24 64deg, transparent 78deg, transparent 104deg, ${lv.c2}30 118deg, transparent 132deg, transparent 158deg, ${lv.c2}26 172deg, transparent 186deg, transparent 212deg, ${lv.c2}30 226deg, transparent 240deg, transparent 268deg, ${lv.c2}24 282deg, transparent 296deg, transparent 322deg, ${lv.c2}28 336deg, transparent 350deg)`,
                borderRadius: '50%', animation: 'raysSpin 10s linear infinite', pointerEvents: 'none' }}/>
            )}

            {/* Flash blanco de la explosión */}
            {stage === 'explode' && (
              <div style={{ position: 'fixed', inset: 0, background: '#fff', pointerEvents: 'none',
                animation: 'whiteFlash 0.7s ease-out both', zIndex: 5 }}/>
            )}

            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color: lv.c1, marginBottom: 6, position: 'relative' }}>
              {lv.name.toUpperCase()}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(245,242,235,0.6)', marginBottom: 22, position: 'relative' }}>
              Racha de {streak} día{streak !== 1 ? 's' : ''}
            </div>

            <div key={taps} onClick={golpear} style={{ position: 'relative', display: 'inline-block',
              cursor: canOpen && stage === 'closed' ? 'pointer' : 'default',
              animation: stage === 'open' || stage === 'explode' ? 'none'
                : stage === 'crack' ? 'chestShake 0.4s ease-in-out infinite'
                : taps > 0 ? `chestShake ${0.6 - taps * 0.08}s ease-in-out`
                : canOpen ? 'chestFloat 2s ease-in-out infinite' : 'none',
              transform: stage === 'closed' ? `scale(${1 + taps * 0.045})` : 'scale(1)',
              transition: 'transform 0.25s ease, filter 0.3s ease',
              filter: `drop-shadow(0 12px ${40 + taps * 14}px ${lv.c2}${taps >= 2 || stage !== 'closed' ? '99' : '55'})`,
              WebkitTapHighlightColor: 'transparent' }}>
              <CofreSVG lv={lv} open={stage === 'open'} size={150}/>
              {/* Partículas orbitando en reposo */}
              {canOpen && stage === 'closed' && taps === 0 && [0, 1, 2, 3].map(i => (
                <div key={`ob${i}`} style={{ position: 'absolute', top: '44%', left: '50%', width: 5, height: 5,
                  borderRadius: '50%', background: lv.c1, boxShadow: `0 0 8px ${lv.c2}`, pointerEvents: 'none',
                  '--orb': `${86 + i * 9}px`,
                  animation: `chestOrbit ${5 + i * 1.6}s linear infinite ${i * 0.9}s` }}/>
              ))}
              {/* Grieta de luz que crece con los golpes */}
              {stage === 'closed' && taps > 0 && (
                <div style={{ position: 'absolute', top: '41%', left: '12%', right: '12%', height: 3,
                  borderRadius: 99, background: '#FFF3C4', opacity: 0.25 + taps * 0.25,
                  boxShadow: `0 0 ${8 + taps * 8}px ${lv.c1}`, pointerEvents: 'none' }}/>
              )}
              {/* Grieta de luz que se expande antes de reventar */}
              {stage === 'crack' && (
                <div style={{ position: 'absolute', top: '41%', left: '4%', right: '4%', height: 5,
                  borderRadius: 99, background: '#FFFDF4', transformOrigin: '50% 50%',
                  boxShadow: `0 0 26px #FFF3C4, 0 0 52px ${lv.c1}`, pointerEvents: 'none',
                  animation: 'crackExpand 0.7s cubic-bezier(0.22,1,0.36,1) both' }}/>
              )}
              {/* EXPLOSIÓN de partículas (26 disparadas radialmente) */}
              {(stage === 'explode' || stage === 'open') && Array.from({ length: 26 }, (_, i) => (
                <div key={i} style={{
                  position: 'absolute', top: '32%', left: '50%', width: i % 2 ? 4 : 7, height: i % 2 ? 4 : 7,
                  borderRadius: '50%', background: i % 3 === 0 ? '#FFF3C4' : i % 3 === 1 ? lv.c1 : lv.c2,
                  boxShadow: `0 0 9px ${lv.c1}`,
                  '--sx': `${Math.round(Math.cos((i / 26) * Math.PI * 2) * (60 + (i % 5) * 26))}px`,
                  '--sy': `${Math.round(Math.sin((i / 26) * Math.PI * 2) * (48 + (i % 4) * 24)) - 40}px`,
                  animation: `sparkRise ${0.75 + (i % 5) * 0.16}s ease-out ${i * 0.02}s both`,
                  pointerEvents: 'none' }}/>
              ))}
              {/* Confeti extra si cayó un ítem raro */}
              {stage === 'open' && premio?.item && Array.from({ length: 12 }, (_, i) => (
                <div key={`cf${i}`} style={{
                  position: 'absolute', top: '20%', left: '50%', width: 5, height: 9, borderRadius: 2,
                  background: ['#F472B6', '#C084FC', '#FBBF24', '#34D399'][i % 4],
                  '--sx': `${Math.round(Math.cos((i / 12) * Math.PI * 2) * (70 + (i % 3) * 30))}px`,
                  '--sy': `${Math.round(Math.sin((i / 12) * Math.PI * 2) * 55) - 60}px`,
                  animation: `sparkRise ${1 + (i % 4) * 0.2}s ease-out ${0.15 + i * 0.04}s both`,
                  pointerEvents: 'none' }}/>
              ))}
            </div>

            {stage === 'closed' && (
              <div style={{ marginTop: 24, position: 'relative' }}>
                {canOpen ? (
                  <>
                    <div style={{ fontSize: 14.5, fontWeight: 900, color: '#F5F2EB', marginBottom: 10 }}>
                      {taps === 0 ? 'Dale 3 golpes pa’ abrirlo' : taps === 1 ? '¡Eso! Otro más' : taps === 2 ? '¡Uno más y revienta!' : '…'}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 9 }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} style={{ width: 12, height: 12, borderRadius: '50%',
                          background: i < taps ? lv.c1 : 'rgba(255,255,255,0.10)',
                          border: `1.5px solid ${i < taps ? lv.c2 : 'rgba(255,255,255,0.22)'}`,
                          boxShadow: i < taps ? `0 0 8px ${lv.c2}` : 'none',
                          transition: 'all 0.2s ease' }}/>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: 13, color: 'rgba(245,242,235,0.65)', lineHeight: 1.6, padding: '0 10px' }}>
                    {openedToday
                      ? 'Ya reclamaste el cofre de hoy. Mañana se recarga con la racha.'
                      : 'El cofre se carga cuando sellas tu racha del día: lee o completa un simulacro.'}
                  </div>
                )}
                <button onClick={cerrarModal} style={{ marginTop: 16, background: 'none', border: 'none',
                  color: 'rgba(245,242,235,0.5)', fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit', padding: 8 }}>
                  Cerrar
                </button>
              </div>
            )}

            {stage === 'open' && premio && (
              <div className="fi" style={{ marginTop: 24, position: 'relative', animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.25s both' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 10 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 26, fontWeight: 900, color: lv.c1 }}>
                    <PkIc n="empanada" s={24} c={lv.c1}/>+{premio.emp}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#A78BFA' }}>+{premio.xp} XP</span>
                </div>
                {premio.item && (
                  <div style={{ margin: '0 auto 14px', maxWidth: 260, padding: '10px 16px', borderRadius: 14,
                    background: 'rgba(212,175,55,0.10)', border: '1px solid rgba(212,175,55,0.4)' }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: '#D4AF37', marginBottom: 3 }}>
                      ¡CAYÓ UN TESORO!
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#F5F2EB' }}>{premio.item.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(245,242,235,0.6)', marginTop: 2 }}>
                      {premio.item.rarity} · ya está en tu mochila
                    </div>
                  </div>
                )}
                <button onClick={cerrarModal} style={{ width: '100%', padding: '14px', borderRadius: 14,
                  border: 'none', background: `linear-gradient(135deg, ${lv.c1}, ${lv.c2})`, color: '#1A1206',
                  fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit' }}>
                  ¡A la mochila!
                </button>
              </div>
            )}
          </div>
        </div>
        </Portal>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
//  CAPA 1 — RETO DEL DÍA (3 rondas progresivas)
// ─────────────────────────────────────────────
function RetoDelDia({ C, appState, setAppState, onClose, onMissionReward, unlockSecret }) {
  const dk = dateKeyISO();
  const [qs] = useState(() => retoQuestionsFor(dk));
  const jugado = appState.retoDia?.date === dk && appState.retoDia?.done;

  const [phase, setPhase]   = useState(jugado ? 'result' : 'intro'); // intro | trans | round | result
  const [round, setRound]   = useState(0);
  const [tLeft, setTLeft]   = useState(RETO_TIME[0] * 10);
  const [sel, setSel]       = useState(null);
  const [reveal, setReveal] = useState(false);
  const [wins, setWins]     = useState(jugado ? (appState.retoDia.wins || 0) : 0);
  const [failed, setFailed] = useState(jugado ? !appState.retoDia.perfect : false);
  const [gano, setGano]     = useState({ emp: 0, xp: 0 });
  const [stats, setStats]   = useState(null);
  const [ayerPct, setAyerPct] = useState(null);
  const timerRef = useRef(null);
  const perfectFinal = !failed && wins === 3;

  // Stats de ayer (para picar la curiosidad en el intro)
  useEffect(() => {
    if (!fbOK()) return;
    FB().get(FB().ref(FB().db, `retoStats/${dateKeyISO(-1)}`)).then(s => {
      if (s.exists()) {
        const v = s.val();
        if ((v.played || 0) > 0) setAyerPct(Math.round(100 * (v.perfect || 0) / v.played));
      }
    }).catch(() => {});
  }, []);

  // Stats de hoy al llegar al resultado
  useEffect(() => {
    if (phase !== 'result' || stats || !fbOK()) return;
    FB().get(FB().ref(FB().db, `retoStats/${dk}`)).then(s => {
      if (s.exists()) setStats(s.val());
    }).catch(() => {});
  }, [phase]);

  // Cronómetro por ronda (décimas de segundo)
  useEffect(() => {
    if (phase !== 'round' || reveal) return;
    timerRef.current = setInterval(() => {
      setTLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        const sNew = Math.ceil((t - 1) / 10), sOld = Math.ceil(t / 10);
        if (sNew !== sOld && sNew <= 5 && sNew >= 1) { FX.play('tap'); FX.vibrate('light'); }
        return t - 1;
      });
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [phase, round, reveal]);

  useEffect(() => {
    if (phase === 'round' && tLeft === 0 && !reveal) resolver(null);
  }, [tLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  const empezar = () => {
    FX.play('duelStart'); FX.vibrate('medium');
    setPhase('trans');
    setTimeout(() => setPhase('round'), 1700);
  };

  const resolver = (idx) => {
    if (reveal || phase !== 'round') return;
    clearInterval(timerRef.current);
    setSel(idx); setReveal(true);
    const ok = idx === qs[round].correct;
    if (ok) { FX.play('success'); FX.vibrate('success'); } else { FX.play('error'); FX.vibrate('error'); }
    setTimeout(() => {
      if (ok && round < 2) {
        setWins(round + 1);
        setRound(round + 1);
        setSel(null); setReveal(false);
        setTLeft(RETO_TIME[round + 1] * 10);
        setPhase('trans');
        FX.play('conjure');
        setTimeout(() => setPhase('round'), 1700);
      } else {
        terminar(ok ? round + 1 : round, ok && round === 2);
      }
    }, 2100);
  };

  const terminar = async (finalWins, perfect) => {
    setWins(finalWins); setFailed(!perfect);
    const empR = [15, 25, 40], xpR = [30, 50, 80];
    let emp = 0, xp = 0;
    for (let i = 0; i < finalWins; i++) { emp += empR[i]; xp += xpR[i]; }
    if (perfect) { emp += 50; xp += 100; }
    setGano({ emp, xp });
    const nuevosSellos = perfect ? [...(appState.sellos || []), dk] : (appState.sellos || []);
    setAppState(s => ({
      ...s,
      ryo: (s.ryo || 0) + emp,
      xp:  (s.xp || 0) + xp,
      retoDia: { date: dk, wins: finalWins, perfect, done: true },
      sellos: perfect ? [...(s.sellos || []), dk] : (s.sellos || []),
    }));
    if (emp > 0) onMissionReward?.(emp);
    if (perfect) { FX.play('levelUp'); FX.vibrate('heavy'); }

    // Estadística global del día
    if (fbOK()) {
      try {
        const rf = FB().ref(FB().db, `retoStats/${dk}`);
        const snap = await FB().get(rf);
        const cur = snap.exists() ? snap.val() : {};
        const upd = { played: (cur.played || 0) + 1, perfect: (cur.perfect || 0) + (perfect ? 1 : 0) };
        await FB().set(rf, upd);
        setStats(upd);
      } catch (e) {}
    }

    // Logros secretos
    const hora = new Date().getHours();
    if (perfect && (hora >= 23 || hora < 4)) unlockSecret('noctambulo');
    if (perfect) {
      const set = new Set(nuevosSellos);
      let consec = 0;
      for (let i = 0; i < 8; i++) { if (set.has(dateKeyISO(-i))) consec++; else break; }
      if (consec >= 7) unlockSecret('impoluta');
    }
    setPhase('result');
  };

  const compartir = () => {
    const marks = [0, 1, 2].map(i => i < wins ? '✅' : (i === wins && failed ? '❌' : '⬜')).join('');
    const pct = stats && stats.played > 0 ? Math.round(100 * (stats.perfect || 0) / stats.played) : null;
    const lines = [
      'PANKEY — Reto del Día', marks,
      perfectFinal
        ? `¡SELLO PERFECTO!${pct !== null ? ` Solo el ${pct}% lo logró hoy.` : ''}`
        : `Caí en la ronda ${wins + 1}.`,
      '¿Vos podés? → https://pankey.vercel.app',
    ];
    window.open('https://wa.me/?text=' + encodeURIComponent(lines.join('\n')), '_blank');
  };

  const fondo = { position: 'fixed', inset: 0, zIndex: 99994, overflowY: 'auto', WebkitOverflowScrolling: 'touch',
    background: 'linear-gradient(180deg, #06090F 0%, #0D1220 55%, #0A0E18 100%)' };

  // ══ INTRO ══
  if (phase === 'intro') {
    const sellosTotal = (appState.sellos || []).length;
    return (
      <div className="fi" style={fondo}>
        <div style={{ maxWidth: 430, margin: '0 auto', padding: '26px 22px 40px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          <button onClick={onClose} style={{ alignSelf: 'flex-end', background: 'rgba(255,255,255,0.07)', border: 'none',
            width: 36, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer' }}>
            <PkIc n="x" s={16} c="rgba(245,242,235,0.7)"/>
          </button>

          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <div style={{ width: 84, height: 84, borderRadius: 26, margin: '0 auto 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #D4AF37, #8A6410)',
              boxShadow: '0 10px 36px rgba(212,175,55,0.4)', animation: 'chestBeat 3s ease-in-out infinite' }}>
              <PkIc n="target" s={40} c="#1A1206"/>
            </div>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3.5, color: '#D4AF37', marginBottom: 6 }}>RETO DEL DÍA</div>
            <div className="serif" style={{ fontSize: 27, fontWeight: 800, color: '#F5F2EB', marginBottom: 10 }}>
              3 rondas. Un sello.
            </div>
            <div style={{ fontSize: 13.5, color: 'rgba(245,242,235,0.68)', lineHeight: 1.65, maxWidth: 300, margin: '0 auto' }}>
              Cada ronda sube la dificultad y el tiempo corre. Falla una y se acabó el reto de hoy.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, margin: '26px 0 0' }}>
            {qs.map((q, i) => {
              const meta = SUBJECT_META[q.subject] || {};
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px',
                  background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 15 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 11, flexShrink: 0,
                    background: `${meta.color || '#888'}22`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 900, color: meta.color || '#888' }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#F5F2EB' }}>{RETO_NOMBRES[i]}</div>
                    <div style={{ fontSize: 11, color: 'rgba(245,242,235,0.55)', marginTop: 1 }}>{q.subject}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 800,
                    color: 'rgba(245,242,235,0.6)' }}>
                    <PkIc n="timer" s={12} c="rgba(245,242,235,0.6)"/>{RETO_TIME[i]}s
                  </div>
                </div>
              );
            })}
          </div>

          {ayerPct !== null && (
            <div style={{ marginTop: 16, textAlign: 'center', fontSize: 12.5, fontWeight: 700, color: '#E8743A' }}>
              Ayer solo el {ayerPct}% logró el Sello Perfecto
            </div>
          )}
          {sellosTotal > 0 && (
            <div style={{ marginTop: 8, textAlign: 'center', fontSize: 12, color: 'rgba(245,242,235,0.55)' }}>
              Llevas <b style={{ color: '#D4AF37' }}>{sellosTotal}</b> Sello{sellosTotal !== 1 ? 's' : ''} Perfecto{sellosTotal !== 1 ? 's' : ''}
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: 22 }}/>
          <button onClick={empezar} style={{ width: '100%', padding: '17px', borderRadius: 18, border: 'none',
            background: 'linear-gradient(135deg, #D4AF37, #A8821E)', color: '#1A1206',
            fontSize: 16, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 10px 32px rgba(212,175,55,0.4)', animation: 'ctaPulse 4s ease-in-out infinite 1.5s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
            <PkIc n="play" s={17} c="#1A1206"/> ¡Que empiece el reto!
          </button>
        </div>
      </div>
    );
  }

  // ══ TRANSICIÓN entre rondas ══
  if (phase === 'trans') {
    const meta = SUBJECT_META[qs[round].subject] || {};
    return (
      <div style={{ ...fondo, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', animation: 'vsSlam 0.7s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 4, color: meta.color || '#D4AF37', marginBottom: 10 }}>
            RONDA {round + 1} DE 3
          </div>
          <div className="serif" style={{ fontSize: 40, fontWeight: 800, color: '#F5F2EB', marginBottom: 14 }}>
            {RETO_NOMBRES[round]}
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 99,
            background: `${meta.color || '#888'}1A`, border: `1px solid ${meta.color || '#888'}55` }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: meta.color || '#F5F2EB' }}>{qs[round].subject}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(245,242,235,0.6)' }}>· {RETO_TIME[round]}s</span>
          </div>
        </div>
      </div>
    );
  }

  // ══ RONDA ══
  if (phase === 'round') {
    const q = qs[round];
    const meta = SUBJECT_META[q.subject] || {};
    const max = RETO_TIME[round] * 10;
    const secs = Math.ceil(tLeft / 10);
    const frac = tLeft / max;
    const urgente = secs <= 5;
    const ringColor = frac > 0.5 ? '#2D8A5E' : frac > 0.25 ? '#F59E0B' : '#EF4444';
    const circ = 2 * Math.PI * 24;

    return (
      <div style={fondo}>
        <div style={{ maxWidth: 430, margin: '0 auto', padding: '20px 20px 40px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header de ronda */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2.5, color: meta.color || '#D4AF37' }}>
                RONDA {round + 1}/3 · {RETO_NOMBRES[round].toUpperCase()}
              </div>
              <div style={{ display: 'flex', gap: 5, marginTop: 7 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ height: 4, flex: 1, borderRadius: 99,
                    background: i < round ? '#2D8A5E' : i === round ? (meta.color || '#D4AF37') : 'rgba(255,255,255,0.12)' }}/>
                ))}
              </div>
            </div>
            {/* Anillo de tiempo */}
            <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0,
              animation: urgente && !reveal ? 'urgentPulse 0.5s ease-in-out infinite' : 'none' }}>
              <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5"/>
                <circle cx="28" cy="28" r="24" fill="none" stroke={ringColor} strokeWidth="5"
                  strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - frac)}
                  style={{ transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s' }}/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 900, color: urgente ? '#EF4444' : '#F5F2EB' }}>
                {secs}
              </div>
            </div>
          </div>

          {/* Pregunta */}
          <div style={{ background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 18, padding: '16px 17px', marginBottom: 14 }}>
            <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 99, marginBottom: 10,
              background: `${meta.color || '#888'}1E`, fontSize: 10.5, fontWeight: 800, color: meta.color || '#aaa' }}>
              {q.subject} · {q.nivel}
            </div>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: '#F5F2EB', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {q.text}
            </div>
          </div>

          {/* Opciones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {q.options.map((op, i) => {
              const esCorrecta = i === q.correct;
              const esMia = sel === i;
              let bg = 'rgba(255,255,255,0.05)', bd = 'rgba(255,255,255,0.1)', cl = '#F5F2EB';
              if (reveal) {
                if (esCorrecta) { bg = 'rgba(45,138,94,0.22)'; bd = '#2D8A5E'; cl = '#7EE2AE'; }
                else if (esMia) { bg = 'rgba(239,68,68,0.18)'; bd = '#EF4444'; cl = '#FCA5A5'; }
                else { cl = 'rgba(245,242,235,0.4)'; }
              }
              return (
                <button key={i} onClick={() => resolver(i)} disabled={reveal} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 11, width: '100%', padding: '13px 14px',
                  background: bg, border: `1.5px solid ${bd}`, borderRadius: 14, cursor: reveal ? 'default' : 'pointer',
                  fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.2s' }}>
                  <span style={{ width: 24, height: 24, borderRadius: 8, flexShrink: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900,
                    background: reveal && esCorrecta ? '#2D8A5E' : 'rgba(255,255,255,0.1)',
                    color: reveal && esCorrecta ? '#fff' : cl }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: cl, lineHeight: 1.5, paddingTop: 2 }}>{op}</span>
                </button>
              );
            })}
          </div>

          {reveal && (
            <div className="fi" style={{ marginTop: 13, padding: '12px 14px', borderRadius: 13,
              background: sel === q.correct ? 'rgba(45,138,94,0.12)' : 'rgba(239,68,68,0.10)',
              border: `1px solid ${sel === q.correct ? 'rgba(45,138,94,0.35)' : 'rgba(239,68,68,0.3)'}` }}>
              <div style={{ fontSize: 12, fontWeight: 900, marginBottom: 4,
                color: sel === q.correct ? '#2D8A5E' : '#EF4444' }}>
                {sel === q.correct ? '¡CORRECTO!' : sel === null ? 'SE ACABÓ EL TIEMPO' : 'INCORRECTO'}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(245,242,235,0.7)', lineHeight: 1.55 }}>{q.explanation}</div>
            </div>
          )}

          {!reveal && (
            <button onClick={() => terminar(wins, false)} style={{ marginTop: 'auto', paddingTop: 18,
              background: 'none', border: 'none', color: 'rgba(245,242,235,0.35)', fontSize: 12,
              fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              Rendirse
            </button>
          )}
        </div>
      </div>
    );
  }

  // ══ RESULTADO ══
  const pctHoy = stats && stats.played > 0 ? Math.round(100 * (stats.perfect || 0) / stats.played) : null;
  const sellosTotal = (appState.sellos || []).length;
  return (
    <div className="fi" style={fondo}>
      <div style={{ maxWidth: 430, margin: '0 auto', padding: '26px 22px 40px', minHeight: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>

        {perfectFinal ? (
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <div style={{ position: 'absolute', top: -60, left: '50%', width: 300, height: 300, marginLeft: -150,
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(212,175,55,0.16) 15deg, transparent 30deg, transparent 55deg, rgba(212,175,55,0.13) 70deg, transparent 85deg, transparent 115deg, rgba(212,175,55,0.16) 130deg, transparent 145deg, transparent 175deg, rgba(212,175,55,0.13) 190deg, transparent 205deg, transparent 235deg, rgba(212,175,55,0.16) 250deg, transparent 265deg, transparent 295deg, rgba(212,175,55,0.13) 310deg, transparent 325deg)',
              borderRadius: '50%', animation: 'raysSpin 10s linear infinite', pointerEvents: 'none' }}/>
            <div style={{ position: 'relative', width: 110, height: 110, borderRadius: '50%', margin: '0 auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'radial-gradient(circle at 35% 30%, #FFE9A8, #D4AF37 55%, #7A5A10)',
              boxShadow: '0 0 48px rgba(212,175,55,0.55), inset 0 3px 10px rgba(255,255,255,0.45)',
              animation: 'popIn 0.65s cubic-bezier(0.34,1.56,0.64,1) both' }}>
              <PkIc n="check" s={52} c="#3A2A08"/>
            </div>
          </div>
        ) : (
          <div style={{ width: 96, height: 96, borderRadius: '50%', marginBottom: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(239,68,68,0.12)', border: '2px solid rgba(239,68,68,0.4)',
            animation: 'popIn 0.5s ease both' }}>
            <PkIc n="x" s={42} c="#EF4444"/>
          </div>
        )}

        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3.5,
          color: perfectFinal ? '#D4AF37' : '#EF4444', marginBottom: 8 }}>
          {perfectFinal ? 'SELLO PERFECTO DEL DÍA' : 'EL RETO TE GANÓ HOY'}
        </div>
        <div className="serif" style={{ fontSize: 26, fontWeight: 800, color: '#F5F2EB', marginBottom: 16 }}>
          {perfectFinal ? 'Las 3 rondas, parce' : `Caíste en la ronda ${Math.min(wins + 1, 3)}`}
        </div>

        {/* Marcas de rondas */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          {[0, 1, 2].map(i => {
            const won = i < wins;
            const lost = i === wins && failed;
            return (
              <div key={i} style={{ width: 46, height: 46, borderRadius: 15, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: won ? 'rgba(212,175,55,0.15)' : lost ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.05)',
                border: `1.5px solid ${won ? '#D4AF37' : lost ? '#EF4444' : 'rgba(255,255,255,0.12)'}` }}>
                <PkIc n={won ? 'check' : lost ? 'x' : 'timer'} s={20}
                  c={won ? '#D4AF37' : lost ? '#EF4444' : 'rgba(245,242,235,0.3)'}/>
              </div>
            );
          })}
        </div>

        {(gano.emp > 0 || gano.xp > 0) && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '9px 20px',
            borderRadius: 99, background: 'rgba(212,175,55,0.10)', border: '1px solid rgba(212,175,55,0.3)',
            marginBottom: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 900, color: '#D4AF37' }}>
              <PkIc n="empanada" s={15} c="#D4AF37"/>+{gano.emp}
            </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#A78BFA' }}>+{gano.xp} XP</span>
          </div>
        )}

        {pctHoy !== null && (
          <div style={{ fontSize: 13, color: 'rgba(245,242,235,0.7)', lineHeight: 1.6, maxWidth: 280, marginBottom: 8 }}>
            Solo el <b style={{ color: '#D4AF37' }}>{pctHoy}%</b> de los parceros logró el Sello hoy.
            {perfectFinal && <> Y tú eres de ese {pctHoy}%.</>}
          </div>
        )}
        <div style={{ fontSize: 12, color: 'rgba(245,242,235,0.5)', marginBottom: 24 }}>
          {perfectFinal
            ? `Llevas ${sellosTotal} Sello${sellosTotal !== 1 ? 's' : ''} Perfecto${sellosTotal !== 1 ? 's' : ''}. Mañana hay más.`
            : 'Mañana a medianoche hay revancha con preguntas nuevas.'}
        </div>

        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <button onClick={compartir} style={{ flex: 1.3, padding: '15px', borderRadius: 15, border: 'none',
            background: 'linear-gradient(135deg, #25D366, #128C4A)', color: '#fff', fontSize: 14, fontWeight: 900,
            cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8, boxShadow: '0 6px 20px rgba(37,211,102,0.3)' }}>
            <PkIc n="msg" s={16} c="#fff"/> Presumir
          </button>
          <button onClick={onClose} style={{ flex: 1, padding: '15px', borderRadius: 15,
            border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)',
            color: '#F5F2EB', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            Listo
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  CAPA 4 — DUELO FLASH (matchmaking + fantasma)
// ─────────────────────────────────────────────
function DueloFlash({ C, user, appState, setAppState, onClose, onRematch, onMissionReward, unlockSecret, pushNotif, onConfirm }) {
  const [phase, setPhase]     = useState('search'); // search | found | vs | play | result
  const [rival, setRival]     = useState(null);
  const [roomId, setRoomId]   = useState(null);
  const [room, setRoom]       = useState(null);
  const [qs, setQs]           = useState([]);
  const [qi, setQi]           = useState(0);
  const [sel, setSel]         = useState(null);
  const [reveal, setReveal]   = useState(false);
  const [myScore, setMyScore] = useState(0);
  const [gScore, setGScore]   = useState(0);
  const [gProg, setGProg]     = useState(0);
  const [tGlobal, setTGlobal] = useState(180);
  const [done, setDone]       = useState(false);
  const [resultado, setResultado] = useState(null); // { win, tie, emp, xp, rs }
  const ghostTimers = useRef([]);
  const createdRef  = useRef(false);
  const startedRef  = useRef(false);
  const endedRef    = useRef(false);
  const meCode = user?.code;
  const myLevel = computeLevel(appState.xp || 0).level;

  const lanzarVS = () => {
    setPhase('found'); FX.play('success'); FX.vibrate('medium');
    setTimeout(() => { setPhase('vs'); FX.play('duelStart'); FX.vibrate('heavy'); }, 1300);
    setTimeout(() => setPhase('play'), 3900);
  };

  const arrancarGhost = (ghost) => {
    if (startedRef.current) return; startedRef.current = true;
    const qset = seededShuffle(ICFES_QUESTIONS, hashStr(`ghost-${Date.now()}`)).slice(0, 5);
    setQs(qset); setRival(ghost); setRoomId(null);
    let acum = 3000;
    qset.forEach((q, i) => {
      acum += 7000 + Math.random() * 15000;
      const t = setTimeout(() => {
        const ok = Math.random() < ghost.acc;
        setGScore(s => s + (ok ? 1 : 0));
        setGProg(i + 1);
      }, acum);
      ghostTimers.current.push(t);
    });
    lanzarVS();
  };

  const arrancarReal = (id) => {
    if (startedRef.current) return; startedRef.current = true;
    setQs(seededShuffle(ICFES_QUESTIONS, hashStr(id)).slice(0, 5));
    setRoomId(id);
    lanzarVS();
  };

  // ── Matchmaking ──
  useEffect(() => {
    if (phase !== 'search') return undefined;
    let unsubQ = null, unsubM = null, ghostTO = null;

    if (fbOK() && meCode) {
      const qRef = FB().ref(FB().db, `flashQueue/${meCode}`);
      try {
        FB().set(qRef, { code: meCode, name: user?.name || 'Parcero', xp: appState.xp || 0, ts: Date.now() });
        FB().onDisconnect(qRef).remove();
      } catch (e) {}

      unsubM = FB().onValue(FB().ref(FB().db, `flashMatch/${meCode}`), snap => {
        const v = snap.exists() ? snap.val() : null;
        if (v && v.roomId && v.ts && Date.now() - v.ts < 60000) arrancarReal(v.roomId);
      });

      unsubQ = FB().onValue(FB().ref(FB().db, 'flashQueue'), snap => {
        if (!snap.exists() || createdRef.current || startedRef.current) return;
        const now = Date.now();
        const others = Object.values(snap.val())
          .filter(p => p && p.code && p.code !== meCode && p.ts && now - p.ts < 25000);
        if (!others.length) return;
        const rq = others.sort((a, b) => (a.ts || 0) - (b.ts || 0))[0];
        if (String(meCode) < String(rq.code)) {
          createdRef.current = true;
          const id = `${meCode}__${rq.code}__${now}`;
          const data = {
            id, ts: now,
            a: { code: meCode, name: user?.name || 'Parcero', xp: appState.xp || 0 },
            b: { code: rq.code, name: rq.name || 'Rival', xp: rq.xp || 0 },
            scores: { [meCode]: 0, [rq.code]: 0 },
            prog: { [meCode]: 0, [rq.code]: 0 },
          };
          (async () => {
            try {
              await FB().set(FB().ref(FB().db, `flashRooms/${id}`), data);
              await FB().set(FB().ref(FB().db, `flashMatch/${rq.code}`), { roomId: id, ts: now });
              await FB().set(FB().ref(FB().db, `flashMatch/${meCode}`), { roomId: id, ts: now });
              await FB().set(FB().ref(FB().db, `flashQueue/${meCode}`), null);
              await FB().set(FB().ref(FB().db, `flashQueue/${rq.code}`), null);
            } catch (e) { createdRef.current = false; }
          })();
        }
      });
    }

    ghostTO = setTimeout(async () => {
      let ghost = { code: '__ghost', name: GHOST_NAMES[Math.floor(Math.random() * GHOST_NAMES.length)], ghost: true, acc: 0.5, xp: appState.xp || 0 };
      if (fbOK()) {
        try {
          const snap = await FB().get(FB().ref(FB().db, 'users'));
          if (snap.exists()) {
            const pool = Object.values(snap.val()).filter(u => u && u.code && u.code !== meCode);
            if (pool.length) {
              const u = pool[Math.floor(Math.random() * pool.length)];
              const hist = u.appState?.icfesHistory || [];
              const tot = hist.reduce((s, r) => s + (r.total || 10), 0);
              const cor = hist.reduce((s, r) => s + (r.correct || 0), 0);
              ghost = {
                code: '__ghost', ghost: true,
                name: `Fantasma de @${u.code}`,
                acc: tot > 0 ? Math.min(0.85, Math.max(0.3, cor / tot)) : 0.5,
                xp: u.appState?.xp || 0,
              };
            }
          }
        } catch (e) {}
      }
      arrancarGhost(ghost);
    }, 8000);

    return () => {
      clearTimeout(ghostTO);
      unsubQ && unsubQ(); unsubM && unsubM();
      if (fbOK() && meCode) { try { FB().set(FB().ref(FB().db, `flashQueue/${meCode}`), null); } catch (e) {} }
    };
  }, [phase === 'search']); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sala real en vivo ──
  useEffect(() => {
    if (!roomId || !fbOK()) return undefined;
    const unsub = FB().onValue(FB().ref(FB().db, `flashRooms/${roomId}`), snap => {
      if (!snap.exists()) return;
      const r = snap.val();
      setRoom(r);
      const el = r.a?.code === meCode ? r.b : r.a;
      if (el) setRival(prev => prev || { code: el.code, name: el.name, ghost: false, xp: el.xp || 0 });
    });
    return () => unsub && unsub();
  }, [roomId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Reloj global de 3 minutos ──
  useEffect(() => {
    if (phase !== 'play') return undefined;
    const iv = setInterval(() => setTGlobal(t => (t <= 1 ? 0 : t - 1)), 1000);
    return () => clearInterval(iv);
  }, [phase]);

  const rivalScore = rival?.ghost ? gScore : ((room?.scores || {})[rival?.code] ?? 0);
  const rivalProg  = rival?.ghost ? gProg : ((room?.prog || {})[rival?.code] ?? 0);
  const rivalDone  = rival?.ghost ? gProg >= 5 : !!(room?.fin || {})[rival?.code];

  const finalizar = () => {
    if (endedRef.current) return; endedRef.current = true;
    ghostTimers.current.forEach(clearTimeout);
    const rs = rival?.ghost ? gScore : ((room?.scores || {})[rival?.code] ?? 0);
    const win = myScore > rs, tie = myScore === rs;
    const emp = win ? 30 : tie ? 15 : 0;
    const xpG = win ? 60 : tie ? 30 : 12;
    const newStreakW = win ? (appState.flashWinStreak || 0) + 1 : 0;
    setAppState(s => ({
      ...s,
      ryo: (s.ryo || 0) + emp,
      xp: (s.xp || 0) + xpG,
      flashWinStreak: win ? (s.flashWinStreak || 0) + 1 : 0,
      duelosGanados: (s.duelosGanados || 0) + (win ? 1 : 0),
    }));
    if (emp > 0) onMissionReward?.(emp);
    if (win) { FX.play('levelUp'); FX.vibrate('success'); }
    else if (tie) { FX.play('success'); }
    else { FX.play('error'); FX.vibrate('medium'); }
    if (win && newStreakW >= 3) unlockSecret('hattrick');
    if (win && rival && computeLevel(rival.xp || 0).level >= myLevel + 3) unlockSecret('goliat');
    if (roomId && fbOK()) { try { FB().set(FB().ref(FB().db, `flashMatch/${meCode}`), null); } catch (e) {} }
    setResultado({ win, tie, emp, xp: xpG, rs });
    setPhase('result');
    onConfirm?.();  // completar el duelo sella la racha del día
    fireBoost();
    otorgarBotinSesion(appState, setAppState, pushNotif, onMissionReward);
  };

  useEffect(() => {
    if (phase === 'play' && ((done && rivalDone) || tGlobal === 0)) finalizar();
  }, [done, rivalDone, tGlobal, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => ghostTimers.current.forEach(clearTimeout), []);

  const responder = (idx) => {
    if (reveal || done || phase !== 'play') return;
    setSel(idx); setReveal(true);
    const ok = idx === qs[qi].correct;
    const ns = myScore + (ok ? 1 : 0);
    setMyScore(ns);
    if (ok) { FX.play('success'); FX.vibrate('light'); } else { FX.play('error'); FX.vibrate('error'); }
    if (roomId && fbOK()) {
      try {
        FB().update(FB().ref(FB().db, `flashRooms/${roomId}`), {
          [`scores/${meCode}`]: ns,
          [`prog/${meCode}`]: qi + 1,
          ...(qi === 4 ? { [`fin/${meCode}`]: true } : {}),
        });
      } catch (e) {}
    }
    setTimeout(() => {
      setSel(null); setReveal(false);
      if (qi < 4) setQi(qi + 1); else setDone(true);
    }, 850);
  };

  const abandonar = () => {
    ghostTimers.current.forEach(clearTimeout);
    if (phase === 'play' && !endedRef.current) {
      setAppState(s => ({ ...s, flashWinStreak: 0 }));
    }
    if (fbOK() && meCode) {
      try { FB().set(FB().ref(FB().db, `flashQueue/${meCode}`), null); } catch (e) {}
      try { FB().set(FB().ref(FB().db, `flashMatch/${meCode}`), null); } catch (e) {}
    }
    onClose();
  };

  const fondo = { position: 'fixed', inset: 0, zIndex: 99994, overflowY: 'auto', WebkitOverflowScrolling: 'touch',
    background: 'linear-gradient(180deg, #140505 0%, #1E0A08 50%, #120607 100%)' };

  // ══ BUSCANDO ══
  if (phase === 'search') {
    return (
      <Portal>
      <div className="fi" style={{ ...fondo, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: 24 }}>
          {/* Dos siluetas girando/acercándose con las espadas al centro */}
          <div style={{ position: 'relative', width: 210, height: 130, margin: '0 auto 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ position: 'absolute', left: '50%', top: '50%', width: 120, height: 120,
                marginLeft: -60, marginTop: -60, borderRadius: '50%',
                border: '2px solid rgba(232,116,58,0.4)',
                animation: `groundFlicker ${1.6 + i * 0.5}s ease-in-out infinite ${i * 0.4}s`,
                transform: `scale(${1 + i * 0.22})` }}/>
            ))}
            {/* Tu silueta */}
            <div style={{ position: 'relative', animation: 'vsApproachL 1.4s ease-in-out infinite alternate' }}>
              <Av name={user?.name || 'Tú'} sz={62} C={C} photoURL={appState.photoURL} frameData={appState.equipped?.frame}/>
            </div>
            <div style={{ position: 'relative', zIndex: 2, animation: 'urgentPulse 1.2s ease-in-out infinite' }}>
              <PkIc n="swords" s={30} c="#E8743A"/>
            </div>
            {/* Silueta misteriosa del rival */}
            <div style={{ position: 'relative', width: 62, height: 62, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2A2D45, #14162A)',
              border: '2px dashed rgba(165,180,252,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'vsApproachR 1.4s ease-in-out infinite alternate' }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: 'rgba(165,180,252,0.6)' }}>?</span>
            </div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color: '#E8743A', marginBottom: 8 }}>DUELO FLASH</div>
          <div className="serif" style={{ fontSize: 24, fontWeight: 800, color: '#F5F2EB', marginBottom: 10 }}>
            Buscando rival…
          </div>
          <div style={{ fontSize: 12.5, color: 'rgba(245,242,235,0.6)', lineHeight: 1.6, maxWidth: 270, margin: '0 auto 26px' }}>
            5 preguntas · 3 minutos · marcador en vivo. Si nadie aparece, te enfrentas a un fantasma del más allá.
          </div>
          <button onClick={abandonar} style={{ padding: '12px 28px', borderRadius: 13,
            border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)',
            color: 'rgba(245,242,235,0.75)', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancelar
          </button>
        </div>
      </div>
      </Portal>
    );
  }

  // ══ ¡RIVAL ENCONTRADO! ══
  if (phase === 'found') {
    return (
      <Portal>
      <div style={{ ...fondo, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'fixed', inset: 0, background: '#E8743A', pointerEvents: 'none',
          animation: 'foundFlash 0.9s ease-out both' }}/>
        <div style={{ textAlign: 'center', animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: 3, color: '#F5F2EB',
            textShadow: '0 0 40px rgba(232,116,58,0.8)' }}>
            ¡RIVAL ENCONTRADO!
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#E8743A', marginTop: 10 }}>
            {rival?.name || 'Rival'}
          </div>
        </div>
      </div>
      </Portal>
    );
  }

  // ══ VS ══
  if (phase === 'vs') {
    return (
      <Portal>
      <div style={{ ...fondo, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: 24 }}>
          <div style={{ textAlign: 'center', animation: 'slideUpIn 0.5s ease both' }}>
            <Av name={user?.name || 'Tú'} sz={74} C={C} photoURL={appState.photoURL} frameData={appState.equipped?.frame}/>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#F5F2EB', marginTop: 10 }}>{(user?.name || 'Tú').split(' ')[0]}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2D8A5E' }}>Nv.{myLevel}</div>
          </div>
          <div className="serif" style={{ fontSize: 52, fontWeight: 900, color: '#E8743A',
            textShadow: '0 0 34px rgba(232,116,58,0.6)', animation: 'vsSlam 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.3s both' }}>
            VS
          </div>
          <div style={{ textAlign: 'center', animation: 'slideUpIn 0.5s ease 0.15s both' }}>
            <div style={{ width: 74, height: 74, borderRadius: '50%', margin: '0 auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: rival?.ghost ? 'linear-gradient(135deg, #3A3D5C, #1E2038)' : 'linear-gradient(135deg, #E8743A, #C0392B)',
              border: '2px solid rgba(255,255,255,0.2)' }}>
              <PkIc n={rival?.ghost ? 'eye' : 'sombrero'} s={34} c={rival?.ghost ? '#A5B4FC' : '#fff'}/>
            </div>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#F5F2EB', marginTop: 10, maxWidth: 110,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rival?.name || 'Rival'}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#E8743A' }}>Nv.{computeLevel(rival?.xp || 0).level}</div>
          </div>
        </div>
      </div>
      </Portal>
    );
  }

  // ══ JUGANDO ══
  if (phase === 'play') {
    const q = qs[qi];
    if (!q) return null;
    const meta = SUBJECT_META[q.subject] || {};
    const mm = Math.floor(tGlobal / 60), ss = String(tGlobal % 60).padStart(2, '0');

    return (
      <Portal>
      <div style={fondo}>
        <div style={{ maxWidth: 430, margin: '0 auto', padding: '72px 20px 40px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Marcador en vivo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ flex: 1, padding: '9px 13px', borderRadius: 13, background: 'rgba(45,138,94,0.12)',
              border: '1px solid rgba(45,138,94,0.4)' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#7EE2AE' }}>TÚ</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#2D8A5E', lineHeight: 1.1 }}>{myScore}</div>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 900, color: tGlobal <= 30 ? '#EF4444' : 'rgba(245,242,235,0.8)',
                animation: tGlobal <= 30 ? 'urgentPulse 1s ease-in-out infinite' : 'none' }}>
                {mm}:{ss}
              </div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(245,242,235,0.4)' }}>{qi + 1}/5</div>
            </div>
            <div style={{ flex: 1, padding: '9px 13px', borderRadius: 13, background: 'rgba(232,116,58,0.10)',
              border: '1px solid rgba(232,116,58,0.4)', textAlign: 'right' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#F8B08A', display: 'flex', alignItems: 'center',
                justifyContent: 'flex-end', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8743A',
                  animation: 'flashLive 1.4s ease-in-out infinite' }}/>
                {(rival?.name || 'RIVAL').length > 13 ? (rival?.name || 'RIVAL').slice(0, 13) + '…' : (rival?.name || 'RIVAL')}
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#E8743A', lineHeight: 1.1 }}>{rivalScore}</div>
            </div>
          </div>

          {/* Barra VS de tira-y-afloja: se inclina hacia el que va ganando */}
          <div style={{ position: 'relative', height: 10, borderRadius: 99, overflow: 'hidden',
            background: 'rgba(255,255,255,0.08)', margin: '4px 0 6px' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0,
              width: `${(myScore + rivalScore) === 0 ? 50 : (myScore / (myScore + rivalScore)) * 100}%`,
              background: 'linear-gradient(90deg, #2D8A5E, #4ADE80)',
              boxShadow: '0 0 10px rgba(74,222,128,0.5)',
              transition: 'width 0.7s cubic-bezier(0.22,1,0.36,1)' }}/>
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0,
              width: `${(myScore + rivalScore) === 0 ? 50 : (rivalScore / (myScore + rivalScore)) * 100}%`,
              background: 'linear-gradient(90deg, #E8743A, #C0392B)',
              boxShadow: '0 0 10px rgba(232,116,58,0.5)',
              transition: 'width 0.7s cubic-bezier(0.22,1,0.36,1)' }}/>
            <div style={{ position: 'absolute', top: -2, bottom: -2, width: 3, borderRadius: 99, background: '#F5F2EB',
              left: `calc(${(myScore + rivalScore) === 0 ? 50 : (myScore / (myScore + rivalScore)) * 100}% - 1.5px)`,
              boxShadow: '0 0 8px rgba(255,255,255,0.8)',
              transition: 'left 0.7s cubic-bezier(0.22,1,0.36,1)' }}/>
          </div>

          {/* Progreso del rival en vivo */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, marginBottom: 14 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{ width: 7, height: 7, borderRadius: '50%',
                background: i < rivalProg ? '#E8743A' : 'rgba(255,255,255,0.14)' }}/>
            ))}
          </div>

          {done ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#F5F2EB', marginBottom: 8 }}>¡Terminaste!</div>
              <div style={{ fontSize: 12.5, color: 'rgba(245,242,235,0.6)' }}>
                Esperando a {rival?.name || 'tu rival'}… ({rivalProg}/5)
              </div>
            </div>
          ) : (
            <>
              <div style={{ background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 16, padding: '14px 15px', marginBottom: 12 }}>
                <div style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 99, marginBottom: 8,
                  background: `${meta.color || '#888'}1E`, fontSize: 10, fontWeight: 800, color: meta.color || '#aaa' }}>
                  {q.subject}
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#F5F2EB', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                  {q.text}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {q.options.map((op, i) => {
                  const esCorrecta = i === q.correct, esMia = sel === i;
                  let bg = 'rgba(255,255,255,0.05)', bd = 'rgba(255,255,255,0.1)', cl = '#F5F2EB';
                  if (reveal) {
                    if (esCorrecta) { bg = 'rgba(45,138,94,0.22)'; bd = '#2D8A5E'; cl = '#7EE2AE'; }
                    else if (esMia) { bg = 'rgba(239,68,68,0.18)'; bd = '#EF4444'; cl = '#FCA5A5'; }
                    else cl = 'rgba(245,242,235,0.4)';
                  }
                  return (
                    <button key={i} onClick={() => responder(i)} disabled={reveal} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%', padding: '11px 13px',
                      background: bg, border: `1.5px solid ${bd}`, borderRadius: 13,
                      cursor: reveal ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                      <span style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900,
                        background: reveal && esCorrecta ? '#2D8A5E' : 'rgba(255,255,255,0.1)',
                        color: reveal && esCorrecta ? '#fff' : cl }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: cl, lineHeight: 1.45, paddingTop: 1 }}>{op}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <button onClick={abandonar} style={{ marginTop: 'auto', paddingTop: 16, background: 'none', border: 'none',
            color: 'rgba(245,242,235,0.3)', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Abandonar duelo
          </button>
        </div>
      </div>
      </Portal>
    );
  }

  // ══ RESULTADO: podio 1er / 2do puesto ══
  const r = resultado || { win: false, tie: false, emp: 0, xp: 0, rs: rivalScore };
  const yoPrimero = r.win || r.tie;
  const Medalla = ({ oro, delay }) => (
    <div style={{ width: 30, height: 30, borderRadius: '50%', margin: '0 auto 6px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: oro
        ? 'radial-gradient(circle at 35% 30%, #FFE9A8, #D4AF37 60%, #8A6410)'
        : 'radial-gradient(circle at 35% 30%, #F1F5F9, #AEB8C2 60%, #64748B)',
      boxShadow: oro ? '0 0 16px rgba(212,175,55,0.6)' : '0 0 10px rgba(174,184,194,0.4)',
      animation: `medalDrop 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}s both` }}>
      <span style={{ fontSize: 13, fontWeight: 900, color: oro ? '#3A2A08' : '#1E293B' }}>{oro ? '1' : '2'}</span>
    </div>
  );
  const Podio = ({ nombre, score, color, primero, delay, foto, frame }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 120 }}>
      <Medalla oro={primero} delay={delay + 0.35}/>
      {foto !== undefined
        ? <Av name={nombre} sz={48} C={C} photoURL={foto} frameData={frame}/>
        : (
          <div style={{ width: 48, height: 48, borderRadius: '50%',
            background: 'linear-gradient(135deg, #3A3D5C, #1E2038)', border: '2px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PkIc n="sombrero" s={22} c="#A5B4FC"/>
          </div>
        )}
      <div style={{ fontSize: 11.5, fontWeight: 900, color: '#F5F2EB', marginTop: 6, maxWidth: 110,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nombre}</div>
      <div style={{ fontSize: 30, fontWeight: 900, color, lineHeight: 1.1 }}>{score}</div>
      <div style={{ width: '100%', height: primero ? 54 : 28, marginTop: 8, borderRadius: '8px 8px 0 0',
        background: primero
          ? 'linear-gradient(180deg, rgba(212,175,55,0.4), rgba(212,175,55,0.08))'
          : 'linear-gradient(180deg, rgba(174,184,194,0.25), rgba(174,184,194,0.05))',
        border: `1px solid ${primero ? 'rgba(212,175,55,0.5)' : 'rgba(174,184,194,0.3)'}`, borderBottom: 'none',
        transformOrigin: '50% 100%', animation: `podiumRise 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s both` }}/>
    </div>
  );
  return (
    <Portal>
    <div className="fi" style={{ ...fondo, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: 24, maxWidth: 340, width: '100%' }}>
        <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 4, marginBottom: 14,
          color: r.win ? '#D4AF37' : r.tie ? '#2E86AB' : '#EF4444' }}>
          {r.win ? '¡VICTORIA!' : r.tie ? 'EMPATE' : 'DERROTA'}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 14, marginBottom: 16 }}>
          {yoPrimero ? (
            <>
              <Podio nombre={(user?.name || 'Tú').split(' ')[0]} score={myScore} color="#2D8A5E" primero delay={0.1}
                foto={appState.photoURL} frame={appState.equipped?.frame}/>
              <Podio nombre={rival?.name || 'Rival'} score={r.rs} color="#E8743A" primero={false} delay={0.25}/>
            </>
          ) : (
            <>
              <Podio nombre={rival?.name || 'Rival'} score={r.rs} color="#E8743A" primero delay={0.1}/>
              <Podio nombre={(user?.name || 'Tú').split(' ')[0]} score={myScore} color="#2D8A5E" primero={false} delay={0.25}
                foto={appState.photoURL} frame={appState.equipped?.frame}/>
            </>
          )}
        </div>

        {(r.emp > 0 || r.xp > 0) && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '8px 18px', borderRadius: 99,
            background: 'rgba(212,175,55,0.10)', border: '1px solid rgba(212,175,55,0.3)', marginBottom: 12 }}>
            {r.emp > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 900, color: '#D4AF37' }}>
                <PkIc n="empanada" s={14} c="#D4AF37"/>+{r.emp}
              </span>
            )}
            <span style={{ fontSize: 13, fontWeight: 800, color: '#A78BFA' }}>+{r.xp} XP</span>
          </div>
        )}
        {(appState.flashWinStreak || 0) >= 2 && r.win && (
          <div style={{ fontSize: 12, fontWeight: 800, color: '#E8743A', marginBottom: 10 }}>
            {appState.flashWinStreak} victorias seguidas
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button onClick={onRematch} style={{ flex: 1.3, padding: '15px', borderRadius: 15, border: 'none',
            background: 'linear-gradient(135deg, #E8743A, #C0392B)', color: '#fff', fontSize: 14, fontWeight: 900,
            cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, boxShadow: '0 6px 20px rgba(232,116,58,0.35)' }}>
            <PkIc n="swords" s={16} c="#fff"/> Otro duelo
          </button>
          <button onClick={onClose} style={{ flex: 1, padding: '15px', borderRadius: 15,
            border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)',
            color: '#F5F2EB', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            Listo
          </button>
        </div>
        <button onClick={() => { FX.play('tap'); shareWhatsApp(
          `PANKEY ⚔️ Duelo Flash\n${r.win ? `Le gané ${myScore}–${r.rs} a ${rival?.name || 'mi rival'}` : r.tie ? `Empaté ${myScore}–${r.rs} con ${rival?.name || 'mi rival'}` : `Caí ${myScore}–${r.rs} ante ${rival?.name || 'mi rival'}, pero vuelvo`}\n🔥 Racha: ${appState.streakDays || 0} día${(appState.streakDays || 0) !== 1 ? 's' : ''}\n¿Podrás conmigo? → pankey.vercel.app`
        ); }} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', marginTop: 10, padding: '13px', borderRadius: 15,
          border: '1px solid rgba(37,211,102,0.45)', background: 'rgba(37,211,102,0.12)',
          color: '#4ADE80', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
          <PkIc n="msg" s={15} c="#4ADE80"/> Compartir por WhatsApp
        </button>
      </div>
    </div>
    </Portal>
  );
}

// ═════════════════════════════════════════════
//  INICIO TAB v5 — CENTRO DE MANDO
// ═════════════════════════════════════════════
function InicioTab({ C, isLight, appState, setAppState, user, books, onGoTab, onGoShop, onMissionReward, pushNotif, onConfirm, onCoinBurst }) {
  const lvl         = computeLevel(appState.xp || 0);
  const [rankInfo, setRankInfo]   = useState(null);
  const [retoOpen, setRetoOpen]   = useState(false);
  const [flashOpen, setFlashOpen] = useState(false);
  const [flashKey, setFlashKey]   = useState(0);
  const [modo, setModo]           = useState(null);    // overlay activo
  const [modoKey, setModoKey]     = useState(0);
  const [modoSel, setModoSel]     = useState(1);       // carta seleccionada
  const [btnFade, setBtnFade]     = useState(false);   // transición del botón JUGAR
  const [logroShow, setLogroShow] = useState(null);
  const [ahora, setAhora]         = useState(Date.now());
  const [fuegoStats, setFuegoStats] = useState(false);
  const [jugarPress, setJugarPress] = useState(false);
  const logrosRef = useRef([]);
  logrosRef.current = appState.logrosSecretos || [];
  const lpTimer = useRef(null);
  const primeraSel = useRef(true);
  const today = todayStr();
  const dk    = dateKeyISO();

  useEffect(() => { const iv = setInterval(() => setAhora(Date.now()), 1000); return () => clearInterval(iv); }, []);
  useEffect(() => () => clearTimeout(lpTimer.current), []);

  // Transición del botón JUGAR al cambiar de modo (fade out → in)
  useEffect(() => {
    if (primeraSel.current) { primeraSel.current = false; return; }
    setBtnFade(true);
    const t = setTimeout(() => setBtnFade(false), 150);
    return () => clearTimeout(t);
  }, [modoSel]);

  // Salvaguarda: si se abre un overlay, el botón JUGAR no puede quedar "pegado"
  useEffect(() => { if (modo || flashOpen || retoOpen) setJugarPress(false); }, [modo, flashOpen, retoOpen]);

  // ── Ranking social ──
  useEffect(() => {
    if (!fbOK() || !user?.code) return;
    FB().get(FB().ref(FB().db, 'users')).then(snap => {
      if (!snap.exists()) return;
      const ranked = Object.values(snap.val())
        .map(u => ({ code: u.code, ghost: (u.appState?.ghostUntil || 0) > Date.now(),
          correctas: (u.appState?.icfesHistory || []).reduce((s, r) => s + (r.correct || 0), 0) }))
        .filter(u => u.code === user?.code || !u.ghost)
        .sort((a, b) => b.correctas - a.correctas);
      const myIdx = ranked.findIndex(u => u.code === user.code);
      if (myIdx === -1) return;
      setRankInfo({ pos: myIdx + 1, total: ranked.length,
        aheadGap: myIdx > 0 ? ranked[myIdx - 1].correctas - ranked[myIdx].correctas : null,
        aheadName: myIdx > 0 ? ranked[myIdx - 1].code : null });
    }).catch(() => {});
  }, [user?.code]);

  const streak = appState.streakDays || 0;
  const fire   = fireLevelFor(streak);
  const sealed = appState.yourConfirmed ||
    (appState.icfesHistory || []).some(r => r.date === today || (r.ts && new Date(r.ts).toDateString() === today));
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const ds = d.toDateString();
    return (appState.icfesHistory || []).some(r => r.date === ds || (r.ts && new Date(r.ts).toDateString() === ds)) || (ds === today && appState.yourConfirmed);
  });

  // ── Saludo dinámico según hora + racha ──
  const hora = new Date().getHours();
  const enPeligro = !sealed && streak > 0 && hora >= 18;
  const saludo = (() => {
    if (streak === 0) return hora < 12 ? '¡Buenos días! Prende el fogón hoy.' : hora < 18 ? 'Aún estás a tiempo de prender el fogón.' : 'Prende una chispa antes de dormir, parce.';
    if (enPeligro) return 'Ojo, que se te apaga el fogón esta noche.';
    if (!sealed && hora >= 12) return '¿Ya vas a sellar hoy o qué, berraco?';
    if (hora < 12) return '¡Buenos días, berraco! El templo te espera.';
    if (hora < 18) return sealed ? '¡Vas finísimo hoy, siga así!' : 'Buenas tardes. Séllela cuando pueda.';
    return sealed ? 'Templo sellado. Descanse tranquilo.' : 'Buenas noches. No deje apagar el fuego.';
  })();

  // ── Logros secretos ──
  const unlockSecret = (id) => {
    const logro = SECRET_LOGROS[id];
    if (!logro || logrosRef.current.includes(id)) return;
    logrosRef.current = [...logrosRef.current, id];
    setAppState(s => ({ ...s, logrosSecretos: [...(s.logrosSecretos || []), id], ryo: (s.ryo || 0) + logro.ryo, xp: (s.xp || 0) + logro.xp }));
    setTimeout(() => setLogroShow(logro), 650);
  };
  useEffect(() => { if ((appState.readingMinutesToday || 0) >= 60) unlockSecret('maraton'); }, [appState.readingMinutesToday]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cierre común de modos ──
  const finalizarModo = ({ tipo, valor, pares, emp, xp }) => {
    acumularRespuestas(setAppState, pares);
    setAppState(s => {
      const upd = { ...s, ryo: (s.ryo || 0) + (emp || 0), xp: (s.xp || 0) + (xp || 0) };
      if (tipo === 'contrarreloj' && valor > (s.contrarrelojRecord || 0)) upd.contrarrelojRecord = valor;
      if (tipo === 'supervivencia' && valor > (s.supervivenciaRecord || 0)) upd.supervivenciaRecord = valor;
      if (tipo === 'ruleta' && valor > (s.ruletaMaxMult || 0)) upd.ruletaMaxMult = valor;
      return upd;
    });
    if (emp > 0) onCoinBurst?.(emp);
    onConfirm?.(); fireBoost();
    otorgarBotinSesion(appState, setAppState, pushNotif, onCoinBurst);
  };

  // ── Reto del Día ──
  const jugadoHoy   = appState.retoDia?.date === dk && appState.retoDia?.done;
  const retoPerfect = jugadoHoy && appState.retoDia.perfect;
  const retoQs      = retoQuestionsFor(dk);
  const meta1       = SUBJECT_META[retoQs[0]?.subject] || {};
  const [ayerPct, setAyerPct] = useState(null);
  useEffect(() => {
    if (!fbOK()) return;
    FB().get(FB().ref(FB().db, `retoStats/${dateKeyISO(-1)}`)).then(s => {
      if (s.exists()) { const v = s.val(); if ((v.played || 0) > 0) setAyerPct(Math.round(100 * (v.perfect || 0) / v.played)); }
    }).catch(() => {});
  }, []);
  const msFin = (() => { const d = new Date(); d.setHours(24, 0, 0, 0); return Math.max(0, d.getTime() - ahora); })();
  const cuenta = `${String(Math.floor(msFin / 3600000)).padStart(2, '0')}:${String(Math.floor((msFin % 3600000) / 60000)).padStart(2, '0')}`;

  // ── Datos ──
  const icfesHist = appState.icfesHistory || [];
  const bestIcfes = icfesHist.length ? Math.max(...icfesHist.map(r => r.score || 0)) : 0;
  const totalMin  = appState.totalMinutesRead || 0;
  const empanadasCount = useCountUp(appState.ryo || 0, 900);

  // ── Los 5 modos (cartas) ──
  const lanzarModo = (id) => {
    if (id === 'simulacro') { onGoTab('icfes'); return; }
    if (id === 'duelo') { setFlashKey(k => k + 1); setFlashOpen(true); return; }
    setModoKey(k => k + 1); setModo(id);
  };
  const MODOS = [
    { id: 'simulacro',    nom: 'Simulacro',     det: 'ICFES completo', color: '#3DA873', grad: 'linear-gradient(160deg, #0A2416, #123A22)', ic: 'rana',
      rec: bestIcfes > 0 ? `Récord ${bestIcfes}` : 'Nuevo', anim: 'kanjiGlow 3s ease-in-out infinite' },
    { id: 'contrarreloj', nom: 'Contrarreloj',  det: '90 segundos',    color: '#EF4444', grad: 'linear-gradient(160deg, #2A0A0A, #3D1010)', ic: 'timer',
      rec: (appState.contrarrelojRecord || 0) > 0 ? `Récord ${appState.contrarrelojRecord}` : 'Nuevo', anim: 'clockHands 3s linear infinite' },
    { id: 'supervivencia',nom: 'Supervivencia', det: '3 vidas',        color: '#8B5CF6', grad: 'linear-gradient(160deg, #1A0F2E, #241448)', ic: 'mountain',
      rec: (appState.supervivenciaRecord || 0) > 0 ? `Ola ${appState.supervivenciaRecord}` : 'Nuevo', anim: 'heartBeat 1.4s ease-in-out infinite' },
    { id: 'ruleta',       nom: 'La Ruleta',     det: 'x2 a x32',       color: '#D4AF37', grad: 'linear-gradient(160deg, #241A06, #3A2A0C)', ic: 'solandino',
      rec: (appState.ruletaMaxMult || 0) > 0 ? `x${appState.ruletaMaxMult}` : 'Nuevo', anim: 'raysSpin 9s linear infinite' },
    { id: 'duelo',        nom: 'Duelo Flash',   det: 'vs rival · 3min',color: '#F97316', grad: 'linear-gradient(160deg, #2A1204, #3D1D08)', ic: 'swords',
      rec: (appState.duelosGanados || 0) > 0 ? `${appState.duelosGanados} ganados` : 'En vivo', anim: 'swordsClash 2.2s ease-in-out infinite' },
  ];
  const sel = MODOS[modoSel];

  // Long-press del fuego → panel de stats
  const fuegoDown = () => { lpTimer.current = setTimeout(() => { setFuegoStats(true); FX.vibrate('medium'); }, 380); };
  const fuegoUp = () => { clearTimeout(lpTimer.current); setFuegoStats(false); };

  // ── Atmósfera: estrellas, niebla y polvo (deterministas, estables) ──
  const estrellas = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    left: 4 + (i * 7.31) % 92, top: (i * 13.7) % 38,
    s: 1.5 + (i % 3) * 0.5, o: 0.4 + (i % 4) * 0.08,
    dur: 3 + (i % 5), del: (i * 0.73) % 5,
  })), []);
  const nieblas = useMemo(() => [
    { w: '85%', h: 52, b: '4%',  l: '-5%', dur: 9,  del: 0 },
    { w: '70%', h: 44, b: '14%', l: '25%', dur: 12, del: 2.5 },
    { w: '95%', h: 58, b: '0%',  l: '5%',  dur: 10, del: 5 },
  ], []);
  const polvo = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    left: 18 + (i * 9.5) % 64, top: 12 + (i * 11) % 70,
    s: 2 + (i % 3), dx: (i % 2 ? 1 : -1) * (8 + (i % 4) * 4), dy: -(10 + (i % 3) * 5),
    dur: 4 + (i % 5), del: (i * 0.6) % 4, o: 0.2 + (i % 3) * 0.1,
  })), []);

  return (
    <div className="fi" style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

      {/* ══ CAPA 1 — EL CIELO DEL PÁRAMO ══ */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 120% 60% at 50% 0%, #1A2744 0%, #0D1525 40%, #060C14 100%)' }}>
        {estrellas.map((e, i) => (
          <div key={i} style={{ position: 'absolute', left: `${e.left}%`, top: `${e.top}%`,
            width: e.s, height: e.s, borderRadius: '50%', background: `rgba(255,255,255,${e.o})`,
            animation: `twinkle ${e.dur}s ease-in-out infinite ${e.del}s` }}/>
        ))}
      </div>

      {/* ══ CAPA 2 — EL TEMPLO (suelo + piedra + niebla) ══ */}
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, height: '45%', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 140% 80% at 50% 100%, #1A3A1A 0%, #0D1A0D 40%, transparent 70%)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.55,
          background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 14px)' }}/>
        {nieblas.map((n, i) => (
          <div key={i} style={{ position: 'absolute', bottom: n.b, left: n.l, width: n.w, height: n.h,
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 60%)',
            animation: `nieblaDrift ${n.dur}s ease-in-out infinite alternate ${n.del}s`, willChange: 'transform' }}/>
        ))}
      </div>

      {/* ══ CAPA 3 — LUZ AMBIENTAL (rebote en el suelo) ══ */}
      {fire.id > 0 && (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, height: 130, pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(ellipse 300px 100px at 50% 100%, ${fire.halo} 0%, transparent 60%)`,
          animation: `luzRespira ${fire.id >= 5 ? 2 : 3}s ease-in-out infinite` }}/>
      )}

      {/* ══ CONTENIDO ══ */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 15, flex: 1 }}>

        {/* ── 1. IDENTIDAD (texto flotante, sin card) ── */}
        <div style={{ animation: 'staggerRise 0.5s ease both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <button onClick={() => { FX.play('tap'); onGoTab('perfil'); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 }}>
              <Av name={user?.name || '?'} sz={46} C={C} photoURL={appState.photoURL} frameData={appState.equipped?.frame}/>
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="serif" style={{ fontSize: 17, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name || 'Explorador'}
              </div>
              <div className={appState.equipped?.title?.rarity === 'legendario' ? 'title-legendary' : appState.equipped?.title?.rarity === 'mítico' ? 'title-mythic' : ''}
                style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase',
                  color: appState.equipped?.title?.rarity ? (RARITY_META[appState.equipped.title.rarity] || {}).color : C.accent }}>
                {appState.equipped?.title?.name || 'Iniciado'}
              </div>
            </div>
            {/* El escudo del combo, al costado derecho */}
            {rankInfo && (
              <button onClick={() => onGoTab('friends')} style={{ position: 'relative', width: 34, height: 37, flexShrink: 0,
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: rankInfo.pos === 1 ? 'coronaShine 4s ease-in-out infinite' : 'none' }}>
                <svg viewBox="0 0 24 26" width="34" height="37">
                  <path d="M12 1 L22 5 L22 13 Q22 22 12 25 Q2 22 2 13 L2 5 Z"
                    fill={rankInfo.pos === 1 ? '#3A2A08' : '#1A2333'}
                    stroke={rankInfo.pos === 1 ? '#FFD75E' : '#AEB8C2'} strokeWidth="1.5"/>
                </svg>
                <span style={{ position: 'absolute', fontSize: 12.5, fontWeight: 900, color: rankInfo.pos === 1 ? '#FFD75E' : '#E5E9F0' }}>{rankInfo.pos}</span>
                {rankInfo.pos === 1 && <span style={{ position: 'absolute', top: -7, fontSize: 12 }}>👑</span>}
              </button>
            )}
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 600, marginTop: 7, marginLeft: 2,
            color: enPeligro ? '#EF4444' : C.textMid, animation: enPeligro ? 'luzRespira 1.6s ease-in-out infinite' : 'fadeIn 0.6s ease both' }}>
            {saludo}
          </div>
        </div>

        {/* ── 2. COFRES FLOTANTES (sin card contenedora) ── */}
        <div style={{ animation: 'staggerRise 0.5s ease 0.08s both' }}>
          <CofreRacha C={C} isLight={isLight} appState={appState} setAppState={setAppState} onMissionReward={onMissionReward} onGoShop={onGoShop}/>
        </div>

        {/* ── 3. LA LLAMA SOBRE EL ALTAR ── */}
        <div onPointerDown={fuegoDown} onPointerUp={fuegoUp} onPointerLeave={fuegoUp}
          style={{ position: 'relative', animation: 'staggerRise 0.6s ease 0.16s both', margin: '0 0 2px' }}>
          {/* Luz primaria: la llama ilumina hacia arriba */}
          {fire.id > 0 && (
            <div style={{ position: 'absolute', top: '-8%', left: '50%', transform: 'translateX(-50%)',
              width: 240, height: 300, pointerEvents: 'none',
              background: `radial-gradient(ellipse 200px 300px at 50% 45%, ${fire.halo} 0%, transparent 70%)`,
              animation: `luzRespira ${fire.id >= 5 ? 2 : 3}s ease-in-out infinite` }}/>
          )}
          <FuegoRacha streak={streak} C={C} week={last7} sealed={sealed} isLight={isLight} enAltar/>
          {/* Polvo de oro cuando la racha está sellada */}
          {streak > 0 && sealed && polvo.map((p, i) => (
            <div key={i} style={{ position: 'absolute', left: `${p.left}%`, top: `${p.top}%`,
              width: p.s, height: p.s, borderRadius: '50%', background: '#FBBF24',
              opacity: p.o, pointerEvents: 'none',
              '--dx': `${p.dx}px`, '--dy': `${p.dy}px`,
              animation: `dustFloat ${p.dur}s ease-in-out infinite ${p.del}s` }}/>
          ))}
          {/* Panel de stats (long-press) */}
          {fuegoStats && (
            <div className="fi" style={{ position: 'absolute', inset: 0, borderRadius: 20, zIndex: 5,
              background: 'rgba(10,20,32,0.82)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,215,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, padding: 18 }}>
                {[
                  { label: 'RACHA ACTUAL', val: `${streak}d`, c: '#FBBF24' },
                  { label: 'SELLOS TOTALES', val: (appState.sellos || []).length, c: '#D4AF37' },
                  { label: 'KODACHIS', val: appState.streakFreezes || 0, c: '#38BDF8' },
                  { label: 'SIMULACROS', val: icfesHist.length, c: C.accent },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: 1, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── 4. PANEL DE STATS (recursos del templo) ── */}
        <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: 16, overflow: 'hidden',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          animation: 'staggerRise 0.5s ease 0.24s both' }}>
          {[
            { ic: 'star',   c: bestIcfes > 0 ? getPerfLevel(bestIcfes).color : C.textMuted, val: bestIcfes > 0 ? bestIcfes : '—', label: 'MEJOR', tab: 'icfes' },
            { ic: 'book',   c: '#3DA873', val: totalMin >= 60 ? `${Math.round(totalMin / 60)}h` : `${totalMin}m`, label: 'LEÍDO', tab: 'books' },
            { ic: 'swords', c: '#F97316', val: appState.duelosGanados || 0, label: 'DUELOS', tab: 'friends' },
          ].map((s) => (
            <button key={s.label} onClick={() => { FX.play('tap'); onGoTab(s.tab); }} style={{
              flex: 1, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '10px 0',
              borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 3 }}>
                <PkIc n={s.ic} s={11} c={s.c}/>
                <span style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: 0.8, color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.val}</div>
            </button>
          ))}
          <button onClick={() => { FX.play('tap'); FX.vibrate('light'); setRetoOpen(true); }} style={{
            flex: 1.1, background: jugadoHoy ? 'none' : 'rgba(212,175,55,0.10)', border: 'none',
            cursor: 'pointer', fontFamily: 'inherit', padding: '10px 0',
            animation: jugadoHoy ? 'none' : 'retoUrge 2s ease-in-out infinite' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 3 }}>
              <PkIc n="target" s={11} c={jugadoHoy && retoPerfect ? '#3DA873' : '#FBBF24'}/>
              <span style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: 0.8, color: jugadoHoy && retoPerfect ? '#3DA873' : '#FBBF24' }}>RETO</span>
            </div>
            {jugadoHoy ? (
              <div style={{ fontSize: 14, fontWeight: 900, color: retoPerfect ? '#3DA873' : '#EF4444', lineHeight: 1 }}>
                {retoPerfect ? '✓' : `R${Math.min((appState.retoDia?.wins || 0) + 1, 3)}`}
              </div>
            ) : (
              <div style={{ fontSize: 12, fontWeight: 900, color: '#FBBF24', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{cuenta}</div>
            )}
          </button>
        </div>

        {/* ── 5. EL COMBO VIVO ── */}
        <div style={{ animation: 'staggerRise 0.5s ease 0.3s both' }}>
          <PresenciaViva C={C} user={user}/>
        </div>
        {rankInfo && rankInfo.pos > 1 && rankInfo.aheadGap !== null && rankInfo.aheadGap <= 8 && (
          <button onClick={() => onGoTab('friends')} style={{ padding: '9px 14px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
            textAlign: 'left', border: 'none', borderLeft: `3px solid ${C.accent}`, background: `linear-gradient(90deg, ${C.accent}12, transparent)`,
            display: 'flex', alignItems: 'center', gap: 8 }}>
            <PkIc n="star" s={13} c={C.accent}/>
            <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: C.text }}>
              Estás a {rankInfo.aheadGap} acierto{rankInfo.aheadGap !== 1 ? 's' : ''} de quitarle el #{rankInfo.pos - 1} a @{rankInfo.aheadName}.
            </span>
          </button>
        )}

        {/* ── 6. RETO DEL DÍA (banner slim, solo si no lo has hecho) ── */}
        {!jugadoHoy && (
          <button onClick={() => { FX.play('tap'); FX.vibrate('light'); setRetoOpen(true); }} style={{
            border: 'none', borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
            padding: '13px 15px', borderLeft: '4px solid #FBBF24',
            background: 'linear-gradient(135deg, rgba(251,191,36,0.08), transparent)',
            boxShadow: 'inset 0 0 0 1px rgba(251,191,36,0.28)',
            display: 'flex', alignItems: 'center', gap: 12,
            animation: 'staggerRise 0.5s ease 0.34s both' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: `${meta1.color || '#FBBF24'}1C`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PkIc n="target" s={20} c={meta1.color || '#FBBF24'}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>Reto del Día · 3 rondas</div>
              <div style={{ fontSize: 10.5, color: C.textMuted, marginTop: 1 }}>
                {ayerPct !== null ? `Ayer solo el ${ayerPct}% lo logró` : `Empieza en ${retoQs[0]?.subject || 'sorpresa'}`}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 9, fontWeight: 800,
                color: '#E8B84B', background: 'rgba(232,184,75,0.14)', border: '1px solid rgba(232,184,75,0.35)', borderRadius: 99, padding: '2px 8px' }}>
                <PkIc n="empanada" s={9} c="#E8B84B"/>+150 · Sello
              </span>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#FBBF24' }}>Ir →</span>
            </div>
          </button>
        )}

        {/* ── 7. CARTAS DE MODO (carrusel snap) ── */}
        <div style={{ animation: 'staggerRise 0.5s ease 0.38s both' }}>
          <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.5, color: C.textMuted, marginBottom: 4, marginLeft: 2 }}>
            ¿A QUÉ LE VAS HOY?
          </div>
          <div className="modos-cartas">
            {MODOS.map((m, i) => {
              const activo = modoSel === i;
              return (
                <button key={m.id} onClick={() => { if (!activo) { FX.play('nav'); FX.vibrate('light'); setModoSel(i); } }} style={{
                  flexShrink: 0, width: 80, height: 88, borderRadius: 14, scrollSnapAlign: 'start',
                  cursor: 'pointer', fontFamily: 'inherit', padding: '10px 4px 8px',
                  background: m.grad,
                  border: activo ? `1.5px solid ${m.color}` : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: activo ? `0 0 20px ${m.color}50` : 'none',
                  opacity: activo ? 1 : 0.7,
                  transform: activo ? 'scale(1)' : 'scale(0.92)',
                  transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border 0.3s ease, box-shadow 0.3s ease',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ animation: activo ? m.anim : 'none', color: m.color, display: 'flex' }}>
                    <PkIc n={m.ic} s={26} c={activo ? m.color : `${m.color}99`}/>
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: activo ? '#fff' : 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 1.15 }}>{m.nom}</span>
                  <span style={{ fontSize: 8.5, fontWeight: 700, color: activo ? m.color : C.textMuted }}>{m.rec}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empuja el botón JUGAR al fondo cuando hay poco contenido */}
        <div style={{ flex: 1 }}/>

        {/* ══ BOTÓN JUGAR — la puerta del templo (sticky) ══ */}
        <div style={{ position: 'sticky', bottom: 4, zIndex: 50, paddingTop: 6 }}>
          {/* Latido del glow (respiración del botón) */}
          <div style={{ position: 'absolute', inset: '6px 2px 0', borderRadius: 18, pointerEvents: 'none',
            boxShadow: `0 10px 30px ${sel.color}55`, animation: 'luzRespira 2s ease-in-out infinite' }}/>
          <button
            onPointerDown={() => setJugarPress(true)}
            onPointerUp={() => setJugarPress(false)}
            onPointerLeave={() => setJugarPress(false)}
            onPointerCancel={() => setJugarPress(false)}
            onClick={() => { setJugarPress(false); FX.play('duelStart'); FX.vibrate('heavy'); lanzarModo(sel.id); }}
            style={{
              position: 'relative', width: '100%', height: 62, border: 'none', borderRadius: 18, cursor: 'pointer',
              fontFamily: 'inherit', overflow: 'hidden',
              backgroundImage: `linear-gradient(135deg, ${sel.color}CC 0%, ${sel.color} 50%, ${sel.color}CC 100%)`,
              backgroundSize: '200% 100%',
              animation: 'shimmerButton 3s linear infinite',
              transform: jugarPress ? 'scale(0.97)' : 'scale(1)',
              boxShadow: `0 0 0 1px rgba(255,255,255,0.12), 0 8px 24px ${sel.color}70, inset 0 -1px 0 rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)`,
              transition: 'transform 0.12s ease, background 0.3s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11 }}>
            <div style={{ opacity: btnFade ? 0 : 1, transition: 'opacity 0.15s ease',
              display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                <PkIc n={sel.ic} s={20} c={sel.color}/>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 19, fontWeight: 900, color: '#fff', letterSpacing: 2, lineHeight: 1 }}>JUGAR</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.72)', marginTop: 2 }}>· {sel.nom} · {sel.det}</div>
              </div>
              <div style={{ marginLeft: 6, animation: 'arrowPulse 1s ease-in-out infinite', display: 'flex' }}>
                <PkIc n="right" s={18} c="#fff"/>
              </div>
            </div>
          </button>
        </div>

        {/* ══ OVERLAYS ══ */}
        {retoOpen && (
          <Portal>
            <RetoDelDia C={C} appState={appState} setAppState={setAppState}
              onClose={() => setRetoOpen(false)} onMissionReward={onMissionReward} unlockSecret={unlockSecret}/>
          </Portal>
        )}
        {modo === 'contrarreloj' && (
          <ModoContrarreloj key={`cr${modoKey}`} C={C} appState={appState}
            onTerminar={finalizarModo} onOtra={() => setModoKey(k => k + 1)} onClose={() => setModo(null)}/>
        )}
        {modo === 'supervivencia' && (
          <ModoSupervivencia key={`sv${modoKey}`} C={C} appState={appState}
            onTerminar={finalizarModo} onOtra={() => setModoKey(k => k + 1)} onClose={() => setModo(null)}
            onRevive={(costo) => setAppState(s => ({ ...s, ryo: Math.max(0, (s.ryo || 0) - costo) }))}/>
        )}
        {modo === 'ruleta' && (
          <ModoRuleta key={`rl${modoKey}`} C={C} appState={appState}
            onTerminar={finalizarModo} onOtra={() => setModoKey(k => k + 1)} onClose={() => setModo(null)}/>
        )}
        {flashOpen && (
          <DueloFlash key={flashKey} C={C} user={user} appState={appState} setAppState={setAppState}
            onClose={() => setFlashOpen(false)} onRematch={() => setFlashKey(k => k + 1)}
            onMissionReward={onMissionReward} unlockSecret={unlockSecret} pushNotif={pushNotif} onConfirm={onConfirm}/>
        )}
        {logroShow && <LogroSecretoOverlay logro={logroShow} onClose={() => setLogroShow(null)}/>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  ICFES TAB — Orquestador principal (Estructura Corregida)
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
//  CUENTA REGRESIVA — preparándose para la batalla
// ─────────────────────────────────────────────
function CuentaRegresiva({ onGo }) {
  const [n, setN] = useState(3);
  const [frase] = useState(() => {
    const F = ['Respira, parce. El páramo te acompaña.', 'La rana ya está lista. ¿Y tú?', 'Cada pregunta es una trocha nueva.', 'Con calma y con toda, como el café.'];
    return F[Math.floor(Math.random() * F.length)];
  });
  useEffect(() => {
    FX.play('duelStart'); FX.vibrate('medium');
    const iv = setInterval(() => {
      setN(x => {
        if (x <= 1) { clearInterval(iv); setTimeout(onGo, 800); return 0; }
        FX.play('tap'); FX.vibrate('light');
        return x - 1;
      });
    }, 900);
    return () => clearInterval(iv);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99993,
      background: 'linear-gradient(180deg, #081009 0%, #101E14 50%, #06100A 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg, #3DA873, #1F6B45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(61,168,115,0.4)' }}>
          <PkIc n="sabio" s={24} c="#fff"/>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: 'rgba(245,242,235,0.85)', maxWidth: 230, lineHeight: 1.5 }}>
          {frase}
        </div>
      </div>
      <div key={n} style={{ fontSize: n === 0 ? 54 : 110, fontWeight: 900, lineHeight: 1,
        color: n === 0 ? '#3DA873' : '#F5F2EB',
        textShadow: `0 0 50px ${n === 0 ? 'rgba(61,168,115,0.7)' : 'rgba(245,242,235,0.3)'}`,
        animation: 'countZoom 0.88s cubic-bezier(0.22,1,0.36,1) both' }}>
        {n === 0 ? '¡DALE!' : n}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  RESULTADOS SHOW — revelación progresiva
// ─────────────────────────────────────────────
function ResultadosShow({ result, appState, onDetalle, onRetry, onBack }) {
  const [fase, setFase] = useState(0);
  const [scoreAnim, setScoreAnim] = useState(0);
  const timersRef = useRef([]);
  const lvl = getPerfLevel(result.score);
  const prevBest = result.prevBest || 0;
  const esRecord = result.score > prevBest && prevBest > 0;
  const primerSim = prevBest === 0;
  const levelUps = result.levelUps || [];

  // Fase 0: oscuridad + redoble de tambora
  useEffect(() => {
    const drumIv = setInterval(() => {
      try { FX.init(); if (FX.ctx) FX.drum(140 + Math.random() * 50, 55, 0.24, 0.12); } catch (e) {}
    }, 150);
    const t = setTimeout(() => { clearInterval(drumIv); setFase(1); }, 1500);
    timersRef.current.push(t);
    return () => { clearInterval(drumIv); timersRef.current.forEach(clearTimeout); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fase 1: conteo del puntaje
  useEffect(() => {
    if (fase !== 1) return undefined;
    const dur = 1500, start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setScoreAnim(Math.round(eased * result.score));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        FX.play('coin'); FX.vibrate('medium');
        timersRef.current.push(setTimeout(() => setFase(2), 550));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fases 2→3→4
  useEffect(() => {
    if (fase === 2) {
      if (esRecord) { FX.play('levelUp'); FX.vibrate('heavy'); }
      timersRef.current.push(setTimeout(() => setFase(3), esRecord ? 1500 : 850));
    }
    if (fase === 3) {
      if (levelUps.length) FX.play('success');
      timersRef.current.push(setTimeout(() => setFase(4), 1100));
    }
  }, [fase]); // eslint-disable-line react-hooks/exhaustive-deps

  const saltar = () => { if (fase < 4) { setScoreAnim(result.score); setFase(4); } };

  const compartir = () => {
    const sub = Object.entries(result.subjectScores || {})
      .map(([s, v]) => `${SUBJECT_META[s]?.short || s}: ${v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0}%`)
      .join(' | ');
    const lines = [
      'PANKEY · Simulacro ICFES',
      `${result.score}/500${esRecord ? ' · ¡NUEVO RÉCORD!' : ''}`,
      sub,
      (appState.streakDays || 0) > 0 ? `Racha: ${appState.streakDays} días` : '',
      '¿Vos podés? → https://pankey.vercel.app',
    ].filter(Boolean);
    window.open('https://wa.me/?text=' + encodeURIComponent(lines.join('\n')), '_blank');
  };

  return (
    <div onClick={saltar} style={{ position: 'fixed', inset: 0, zIndex: 99993, overflowY: 'auto', WebkitOverflowScrolling: 'touch',
      background: 'linear-gradient(180deg, #06090F 0%, #0B1210 55%, #080D0A 100%)' }}>
      {/* Tinte según el nivel */}
      {fase >= 1 && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 28%, ${lvl.color}1E 0%, transparent 60%)`,
          transition: 'opacity 0.8s', opacity: 1 }}/>
      )}
      <div style={{ maxWidth: 430, margin: '0 auto', padding: '30px 22px 40px', minHeight: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>

        {fase === 0 && (
          <div className="fi">
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 4, color: 'rgba(245,242,235,0.55)', marginBottom: 14 }}>
              LA EXPEDICIÓN TERMINÓ
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: '#C9963A',
                  animation: `flashLive 0.9s ease-in-out infinite ${i * 0.22}s` }}/>
              ))}
            </div>
          </div>
        )}

        {fase >= 1 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color: 'rgba(245,242,235,0.5)', marginBottom: 6 }}>
              TU PUNTAJE
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 84, fontWeight: 900, lineHeight: 1, color: lvl.color,
                textShadow: `0 0 44px ${lvl.color}66` }}>
                {scoreAnim}
              </span>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'rgba(245,242,235,0.45)' }}>/500</span>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: lvl.color, marginBottom: 16 }}>{lvl.label}</div>
          </>
        )}

        {fase >= 2 && (
          <div className="fi" style={{ marginBottom: 18, position: 'relative' }}>
            {esRecord && Array.from({ length: 16 }, (_, i) => (
              <div key={i} style={{ position: 'absolute', top: 8, left: '50%', width: i % 2 ? 5 : 7, height: i % 2 ? 5 : 7,
                borderRadius: i % 3 === 0 ? '50%' : 2,
                background: i % 3 === 0 ? '#FFD75E' : i % 3 === 1 ? lvl.color : '#F5F2EB',
                '--sx': `${Math.round(Math.cos((i / 16) * Math.PI * 2) * (55 + (i % 4) * 26))}px`,
                '--sy': `${Math.round(Math.sin((i / 16) * Math.PI * 2) * (44 + (i % 3) * 22)) - 30}px`,
                animation: `sparkRise ${0.9 + (i % 5) * 0.16}s ease-out ${i * 0.03}s both`,
                pointerEvents: 'none' }}/>
            ))}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 20px', borderRadius: 99,
              background: esRecord ? 'rgba(255,215,94,0.12)' : 'rgba(255,255,255,0.05)',
              border: `1.5px solid ${esRecord ? '#FFD75E' : 'rgba(255,255,255,0.14)'}`,
              animation: esRecord ? 'comboPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' : 'none' }}>
              {esRecord ? (
                <>
                  <PkIc n="trophy" s={16} c="#FFD75E"/>
                  <span style={{ fontSize: 13.5, fontWeight: 900, color: '#FFD75E' }}>
                    ¡NUEVO RÉCORD! Antes: {prevBest}
                  </span>
                </>
              ) : primerSim ? (
                <span style={{ fontSize: 12.5, fontWeight: 800, color: 'rgba(245,242,235,0.75)' }}>
                  Tu primera marca queda en la historia
                </span>
              ) : (
                <span style={{ fontSize: 12.5, fontWeight: 800, color: 'rgba(245,242,235,0.6)' }}>
                  Tu récord sigue en {prevBest} — cerquita
                </span>
              )}
            </div>
          </div>
        )}

        {fase >= 3 && (
          <div className="fi" style={{ width: '100%', maxWidth: 330, marginBottom: 14 }}>
            {Object.entries(result.subjectScores || {}).map(([s, v]) => {
              const meta = SUBJECT_META[s] || {};
              const pct = v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0;
              return (
                <div key={s} style={{ marginBottom: 9 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: meta.color || '#aaa' }}>{s}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 900, color: meta.color || '#aaa' }}>{v.correct}/{v.total} · {pct}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: fase >= 3 ? `${pct}%` : '0%', borderRadius: 99,
                      background: `linear-gradient(90deg, ${meta.color}99, ${meta.color})`,
                      boxShadow: `0 0 8px ${meta.color}60`,
                      transition: 'width 1s cubic-bezier(0.22,1,0.36,1)' }}/>
                  </div>
                </div>
              );
            })}
            {levelUps.map((lu, i) => (
              <div key={lu.subject} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, margin: '8px 4px 0',
                padding: '6px 14px', borderRadius: 99, background: `${lu.color}14`, border: `1.5px solid ${lu.color}`,
                animation: `comboPop 0.55s cubic-bezier(0.34,1.56,0.64,1) ${0.3 + i * 0.18}s both` }}>
                <PkIc n="star" s={13} c={lu.color}/>
                <span style={{ fontSize: 11.5, fontWeight: 900, color: lu.color }}>
                  {SUBJECT_META[lu.subject]?.short}: ¡{lu.de} → {lu.a}!
                </span>
              </div>
            ))}
          </div>
        )}

        {fase >= 4 ? (
          <div className="fi" style={{ width: '100%', maxWidth: 330, display: 'flex', flexDirection: 'column', gap: 9 }}>
            <button onClick={e => { e.stopPropagation(); compartir(); }} style={{ padding: '15px', borderRadius: 15, border: 'none',
              background: 'linear-gradient(135deg, #25D366, #128C4A)', color: '#fff', fontSize: 14, fontWeight: 900,
              cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 6px 20px rgba(37,211,102,0.3)' }}>
              <PkIc n="msg" s={16} c="#fff"/> Presumir por WhatsApp
            </button>
            <div style={{ display: 'flex', gap: 9 }}>
              <button onClick={e => { e.stopPropagation(); onDetalle(); }} style={{ flex: 1, padding: '13px', borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.06)',
                color: '#F5F2EB', fontSize: 12.5, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                Ver detalle
              </button>
              <button onClick={e => { e.stopPropagation(); onRetry(); }} style={{ flex: 1, padding: '13px', borderRadius: 14,
                border: '1px solid rgba(201,150,58,0.4)', background: 'rgba(201,150,58,0.10)',
                color: '#C9963A', fontSize: 12.5, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                Otra expedición
              </button>
            </div>
            <button onClick={e => { e.stopPropagation(); onBack(); }} style={{ padding: '11px', borderRadius: 14, border: 'none',
              background: 'none', color: 'rgba(245,242,235,0.45)', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit' }}>
              Volver al Territorio
            </button>
          </div>
        ) : (
          <div style={{ position: 'fixed', bottom: 18, left: 0, right: 0, textAlign: 'center',
            fontSize: 10.5, fontWeight: 700, color: 'rgba(245,242,235,0.3)' }}>
            toca para saltar
          </div>
        )}
      </div>
    </div>
  );
}

function IcfesTab({ C, isLight, user, appState, setAppState, setGlobalSenseiQ, onCoinBurst, onAchievement, onConfirm, pushNotif }) {
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
  const [modo, setModo]           = useState(null);        // contrarreloj | supervivencia | ruleta
  const [modoKey, setModoKey]     = useState(0);
  const [flashOpen, setFlashOpen] = useState(false);
  const [flashKey, setFlashKey]   = useState(0);
  const [verDetalle, setVerDetalle] = useState(false);
  const [combo, setCombo]         = useState(null);        // { n, mult }
  const [usedRepaso, setUsedRepaso]   = useState(false);   // El Repaso: 1 por test
  const [usedComodin, setUsedComodin] = useState(false);   // Comodín: 1 por test
  const [logroShow, setLogroShow] = useState(null);
  const logrosRef = useRef([]);
  logrosRef.current = appState.logrosSecretos || [];

  const unlockSecret = (id) => {
    const logro = SECRET_LOGROS[id];
    if (!logro || logrosRef.current.includes(id)) return;
    logrosRef.current = [...logrosRef.current, id];
    setAppState(s => ({
      ...s,
      logrosSecretos: [...(s.logrosSecretos || []), id],
      ryo: (s.ryo || 0) + logro.ryo,
      xp: (s.xp || 0) + logro.xp,
    }));
    setTimeout(() => setLogroShow(logro), 650);
  };

  // Cierre común de los modos de juego: acumula stats, paga, guarda récords y SELLA LA RACHA
  const finalizarModo = ({ tipo, valor, pares, emp, xp }) => {
    acumularRespuestas(setAppState, pares);
    setAppState(s => {
      const upd = { ...s, ryo: (s.ryo || 0) + (emp || 0), xp: (s.xp || 0) + (xp || 0) };
      if (tipo === 'contrarreloj' && valor > (s.contrarrelojRecord || 0)) upd.contrarrelojRecord = valor;
      if (tipo === 'supervivencia' && valor > (s.supervivenciaRecord || 0)) upd.supervivenciaRecord = valor;
      if (tipo === 'ruleta' && valor > (s.ruletaMaxMult || 0)) upd.ruletaMaxMult = valor;
      return upd;
    });
    if (emp > 0) onCoinBurst?.(emp);
    onConfirm?.();  // completar cualquier modo activa la racha (igual que el simulacro)
    fireBoost();
    otorgarBotinSesion(appState, setAppState, pushNotif, onCoinBurst);
  };
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
      setSabioComment(null); setCombo(null);
      setUsedRepaso(false); setUsedComodin(false);
      setIcfesScreen('countdown');
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
      streakRef.current.hits += 1;
      streakRef.current.misses = 0;
      const h = streakRef.current.hits;
      const mult = h >= 5 ? 3 : h >= 3 ? 2 : 1;
      setCombo(mult > 1 ? { n: h, mult } : null);
      FX.play('success'); FX.vibrate('success');
      setAppState(s => ({ ...s, ryo: (s.ryo || 0) + 5 * mult, xp: (s.xp || 0) + 10 * mult }));
      onCoinBurst?.(5 * mult);
      if (h >= 2) showSabio(pick(SABIO_HYPE), 'hype');
    } else {
      FX.play('error'); FX.vibrate('error');
      streakRef.current.misses += 1;
      streakRef.current.hits = 0;
      setCombo(null);
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

  // 🔄 EL REPASO: deshace tu respuesta fallida y te deja elegir de nuevo (1 vez por test)
  const usarRepaso = () => {
    if (!appState.repasoActive || usedRepaso || !animating) return;
    if (selected === activeQuestions[currentQ]?.correct) return;
    setUsedRepaso(true);
    setAppState(s => ({ ...s, repasoActive: false }));
    const na = [...answers]; na[currentQ] = -1; setAnswers(na);
    setSelected(null); setAnimating(false);
    FX.play('conjure'); FX.vibrate('medium');
    pushNotif?.('El Repaso activado: elige de nuevo, esta vez con calma.');
  };

  // 🐸 COMODÍN: la pregunta actual se marca correcta automáticamente (1 vez por test)
  const usarComodin = () => {
    if (!appState.comodinActive || usedComodin || animating) return;
    setUsedComodin(true);
    setAppState(s => ({ ...s, comodinActive: false }));
    FX.play('chestOpen'); FX.vibrate('success');
    handleAnswer(activeQuestions[currentQ].correct);
    pushNotif?.('La rana Pankey susurró la respuesta. Comodín gastado.');
  };

  const finishTest = (finalAnswers) => {
    const total    = activeQuestions.length;
    const correct  = finalAnswers.filter((a, i) => a === activeQuestions[i]?.correct).length;
    const score    = Math.round((correct / total) * 500);
    const today    = todayStr();

    onConfirm?.();
    fireBoost(); // el fuego del Inicio celebra el simulacro completado

    const subjectScores = {};
    activeQuestions.forEach((q, i) => {
      if (!subjectScores[q.subject]) subjectScores[q.subject] = { correct: 0, total: 0 };
      subjectScores[q.subject].total++;
      if (finalAnswers[i] === q.correct) subjectScores[q.subject].correct++;
    });

    // Para el show de resultados: récord previo + subidas de nivel por materia
    const prevBest = (appState.icfesHistory || []).reduce((m, r) => Math.max(m, r.score || 0), 0);
    const domPrev  = dominioPorMateria(appState);

    const resultData = {
      score, correct, total, subjectScores, prevBest,
      answers: finalAnswers, ts: Date.now(),
      date: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }),
    };

    const domPost = dominioPorMateria({ ...appState, icfesHistory: [...(appState.icfesHistory || []), resultData] });
    resultData.levelUps = Object.keys(SUBJECT_META)
      .filter(s => !domPost[s].lvl.sinDatos && domPost[s].lvl.idx > domPrev[s].lvl.idx)
      .map(s => ({ subject: s, de: domPrev[s].lvl.name, a: domPost[s].lvl.name, color: domPost[s].lvl.color }));

    // Alimentar el detector de debilidades
    acumularRespuestasWeak(setAppState, activeQuestions.map((q, i) => ({
      subject: q.subject, nivel: q.nivel, ok: finalAnswers[i] === q.correct,
    })));

    setResult(resultData);
    setVerDetalle(false);
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

      // 📜 Pergamino del Maestro: duplica el XP ganado en este simulacro
      const bonoPergamino = s.simXpBoost ? correct * 10 : 0;
      if (s.simXpBoost) setTimeout(() => pushNotif?.(`Pergamino del Maestro: +${bonoPergamino} XP extra en este simulacro.`), 900);

      return {
        ...s,
        icfesHistory: [...(s.icfesHistory || []).slice(-49), resultData],
        icfesStreak:  newStreak,
        lastIcfesDate: today,
        xp:  (s.xp  || 0) + achXp + bonoPergamino,
        ryo: (s.ryo || 0) + achRyo,
        simXpBoost: s.simXpBoost ? false : s.simXpBoost,
        achievements: newAch,
      };
    });
  };

  if (loading) return <SabioLoading C={C} />;

  // ── Overlays de modos de juego (viven sobre cualquier pantalla del tab) ──
  const overlays = (
    <>
      {modo === 'contrarreloj' && (
        <ModoContrarreloj key={`cr${modoKey}`} C={C} appState={appState}
          onTerminar={finalizarModo} onOtra={() => setModoKey(k => k + 1)} onClose={() => setModo(null)}/>
      )}
      {modo === 'supervivencia' && (
        <ModoSupervivencia key={`sv${modoKey}`} C={C} appState={appState}
          onTerminar={finalizarModo} onOtra={() => setModoKey(k => k + 1)} onClose={() => setModo(null)}
          onRevive={(costo) => setAppState(s => ({ ...s, ryo: Math.max(0, (s.ryo || 0) - costo) }))}/>
      )}
      {modo === 'ruleta' && (
        <ModoRuleta key={`rl${modoKey}`} C={C} appState={appState}
          onTerminar={finalizarModo} onOtra={() => setModoKey(k => k + 1)} onClose={() => setModo(null)}/>
      )}
      {flashOpen && (
        <DueloFlash key={`fl${flashKey}`} C={C} user={user} appState={appState} setAppState={setAppState}
          onClose={() => setFlashOpen(false)} onRematch={() => setFlashKey(k => k + 1)}
          onMissionReward={onCoinBurst} unlockSecret={unlockSecret} pushNotif={pushNotif} onConfirm={onConfirm}/>
      )}
      {logroShow && <LogroSecretoOverlay logro={logroShow} onClose={() => setLogroShow(null)}/>}
    </>
  );

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
    <><IcfesSetup C={C} isLight={isLight} onBeginTest={handleBeginTest} onBack={() => setIcfesScreen('dashboard')} />{overlays}</>
  );

  if (icfesScreen === 'countdown') return (
    <CuentaRegresiva C={C} onGo={() => setIcfesScreen('test')} />
  );

  if (icfesScreen === 'test') return (
    <IcfesTest C={C} isLight={isLight}
      question={activeQuestions[currentQ]}
      questionIdx={currentQ}
      total={activeQuestions.length}
      selected={selected}
      animating={animating}
      sabioComment={sabioComment}
      combo={combo}
      hitsCount={answers.filter((a, i) => a !== -1 && a === activeQuestions[i]?.correct).length}
      answeredCount={answers.filter(a => a !== -1).length}
      onAnswer={handleAnswer}
      onNext={handleNext}
      repasoDisponible={!!appState.repasoActive && !usedRepaso}
      comodinDisponible={!!appState.comodinActive && !usedComodin}
      onUsarRepaso={usarRepaso}
      onUsarComodin={usarComodin}
      onExit={() => { if (window.confirm('¿Salir del simulacro?')) { setIcfesScreen('dashboard'); setAnswers([]); setSelected(null); setAnimating(false); setCurrentQ(0); streakRef.current = { hits: 0, misses: 0 }; setSabioComment(null); setCombo(null); } }}
    />
  );

  if (icfesScreen === 'results') {
    if (verDetalle) return (
      <IcfesResults C={C} isLight={isLight} result={result} activeQuestions={activeQuestions}
        onRetry={() => { setVerDetalle(false); setIcfesScreen('setup'); }}
        onBack={() => { setVerDetalle(false); setIcfesScreen('dashboard'); }}
        setGlobalSenseiQ={setGlobalSenseiQ}
      />
    );
    return (
      <ResultadosShow C={C} result={result} appState={appState}
        onDetalle={() => setVerDetalle(true)}
        onRetry={() => setIcfesScreen('setup')}
        onBack={() => setIcfesScreen('dashboard')}
      />
    );
  }

  // Tablero principal del Territorio
  return (
    <>
      <IcfesDashboard C={C} isLight={isLight} appState={appState} setAppState={setAppState}
        onStartSetup={() => setIcfesScreen('setup')}
        onGoOracle={() => setIcfesScreen('oracle')}
        onMissionReward={onCoinBurst}
        onGoShop={() => pushNotif('Ve a Ajustes → La Tiendita para conseguir tu Kodachi de Hielo')}
        onModo={(m) => { FX.play('duel'); FX.vibrate('medium'); setModoKey(k => k + 1); setModo(m); }}
        onFlash={() => { FX.play('duel'); FX.vibrate('medium'); setFlashKey(k => k + 1); setFlashOpen(true); }}
        onPracticeWeak={(subs) => handleBeginTest(subs, 10)}
      />
      {overlays}
    </>
  );
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

// Colores de cofre por rareza (para los cofres comprables de la tienda)
const CHEST_SHOP_COLORS = {
  'común':      { c1: '#B08050', c2: '#7A4E28', c3: '#42280F' },  // madera
  'poco común': { c1: '#E8A05C', c2: '#B06A2E', c3: '#5E3512' },  // bronce
  'raro':       { c1: '#E8ECEF', c2: '#AEB8C2', c3: '#525E6A' },  // plata
  'épico':      { c1: '#FFE082', c2: '#E8B428', c3: '#8A6212' },  // oro
  'legendario': { c1: '#FFE9A8', c2: '#D4AF37', c3: '#7A5A10' },  // tumbaga
  'mítico':     { c1: '#F5D0FE', c2: '#C084FC', c3: '#581C87' },  // ancestral
};

const SHOP_ITEMS = [
  // ── COFRES (recompensa aleatoria según tipo) ─────────────────
  { id:'c_wooden',    type:'chest', name:'Cofre de Madera',   desc:'Recompensa modesta pero segura.',                 rarity:'común',      price:100,  rewards: { minRyo: 60,   maxRyo: 180,   xpBonus: 40,   itemChance: 0 } },
  { id:'c_bronze',    type:'chest', name:'Cofre de Bronce',   desc:'Algo bueno puede salir de aquí...',               rarity:'poco común', price:300,  rewards: { minRyo: 220,  maxRyo: 480,   xpBonus: 90,   itemChance: 0.22 } },
  { id:'c_silver',    type:'chest', name:'Cofre de Plata',    desc:'La suerte empieza a brillar.',                    rarity:'raro',       price:600,  rewards: { minRyo: 480,  maxRyo: 980,   xpBonus: 180,  itemChance: 0.35 } },
  { id:'c_gold',      type:'chest', name:'Cofre de Oro',      desc:'Fortuna de verdad. Casi siempre cae algo bueno.', rarity:'épico',      price:1200, rewards: { minRyo: 950,  maxRyo: 2100,  xpBonus: 380,  itemChance: 0.55 } },
  { id:'c_tumbaga',   type:'chest', name:'Cofre de Tumbaga',  desc:'Reliquia ancestral. Aquí viene algo legendario.', rarity:'legendario', price:3000, rewards: { minRyo: 2400, maxRyo: 5200,  xpBonus: 800,  itemChance: 0.8 } },
  { id:'c_ancestral', type:'chest', name:'Cofre Ancestral',   desc:'Los dioses Muiscas bendicen al que lo abre.',     rarity:'mítico',     price:8000, rewards: { minRyo: 6500, maxRyo: 14000, xpBonus: 1600, itemChance: 0.98 } },
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
  { id:'t_fantasma',   type:'title',  name:'El Fantasma',                desc:'Aparece y desaparece... pero su racha sigue.',     rarity:'raro',       price:1400 },
  { id:'t_berr',       type:'title',  name:'Berraco Certificado',        desc:'Lo dice el título: este no se rinde.',             rarity:'épico',      price:2500 },
  { id:'t_leyenda',    type:'title',  name:'Leyenda del ICFES',          desc:'500/500. Dicen que es imposible.',                 rarity:'legendario', price:4000 },
  { id:'t_dios',       type:'title',  name:'Dios del Saber',             desc:'Ya no estudia. El conocimiento le estudia a él.',  rarity:'mítico',     price:12000 },
  // ── MARCOS ───────────────────────────────────────────────────
  { id:'f_jade',      type:'frame', name:'Anillo de Esmeralda', desc:'Codiciado por todos, regalado por nadie...',  rarity:'poco común', price:650 },
  { id:'f_cafe',      type:'frame', name:'Aro de Café',         desc:'Humea como tinto recién servido...',          rarity:'poco común', price:800 },
  { id:'f_sakura',    type:'frame', name:'Corona de Heliconia', desc:'Ni el filtro le hace justicia...',            rarity:'raro',       price:2000 },
  { id:'f_indigo',    type:'frame', name:'Espiral de Añil',     desc:'Gira sin parar, como ventilador sin luz...',  rarity:'raro',       price:2599 },
  { id:'f_koi',       type:'frame', name:'Rana Dorada',         desc:'Aura de tesoro precolombino...',              rarity:'épico',      price:3500 },
  { id:'f_dragon',    type:'frame', name:'El Volcán',           desc:'Arde como arepa olvidada en el fogón...',     rarity:'épico',      price:6000 },
  { id:'f_celestial', type:'frame', name:'Corona de Estrellas', desc:'Hasta los grillos cantan de día...',          rarity:'mítico',     price:15000 },
  { id:'f_neon',      type:'frame', name:'Neón Caribe',         desc:'Brilla como letrero de rumba.',               rarity:'raro',       price:1800 },
  { id:'f_matrix',    type:'frame', name:'El Hacker',           desc:'Lluvia de datos, estilo película.',           rarity:'épico',      price:4500 },
  { id:'f_aurora',    type:'frame', name:'Aurora Boreal',       desc:'Los cielos del sur no tienen nada que envidiar.', rarity:'legendario', price:9000 },
  { id:'f_supernova', type:'frame', name:'Supernova',           desc:'El poder de una estrella explotando.',        rarity:'mítico',     price:20000 },
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
  { id:'b_neon_city', type:'banner', name:'Ciudad de Neón',   desc:'Medellín a las 2am.',   rarity:'épico',      price:5000,
    css:`radial-gradient(circle at 30% 80%, rgba(0,255,255,0.15) 0%, transparent 50%),
         radial-gradient(circle at 70% 60%, rgba(255,0,128,0.1) 0%, transparent 40%),
         linear-gradient(180deg, #0a0020 0%, #1a0040 40%, #2a0060 100%)` },
  { id:'b_gold_rush', type:'banner', name:'Fiebre del Oro',   desc:'El Dorado fue real.',   rarity:'legendario', price:12000, animClass:'banner-shimmer',
    css:`linear-gradient(135deg, #1a0f00 0%, #3d2800 30%, #6b4500 50%, #3d2800 70%, #1a0f00 100%)` },
  { id:'b_cosmos_v2', type:'banner', name:'Vacío Estelar',    desc:'Más allá del tiempo.',  rarity:'mítico',     price:25000,
    css:`radial-gradient(circle at 50% 50%, rgba(100,50,200,0.2) 0%, transparent 50%),
         radial-gradient(2px 2px at 20% 30%, white 50%, transparent 50%),
         radial-gradient(1.5px 1.5px at 60% 70%, white 50%, transparent 50%),
         radial-gradient(1px 1px at 80% 20%, white 50%, transparent 50%),
         radial-gradient(2px 2px at 40% 90%, white 50%, transparent 50%),
         linear-gradient(180deg, #020010 0%, #0a0030 50%, #020010 100%)` },
  // ── PODERES (OBJETOS ESPECIALES) ─────────────────────────────
  { id:'i_freeze',     type:'item',   name:'Kodachi de Hielo',       desc:'Protege tu racha un día. Se gasta solo si faltas.',            rarity:'raro',       price:300 },
  { id:'i_boost',      type:'item',   name:'Pergamino del Maestro',  desc:'Duplica los XP de tu próximo simulacro ICFES.',                rarity:'épico',      price:1000 },
  { id:'i_tinto',      type:'item',   name:'Tinto Doble',            desc:'Duplica el XP de tu próxima sesión de lectura.',               rarity:'poco común', price:400 },
  { id:'i_repaso',     type:'item',   name:'El Repaso',              desc:'Cambia UNA respuesta fallida en tu próximo simulacro.',        rarity:'poco común', price:350 },
  { id:'i_arepa',      type:'item',   name:'Escudo de Arepa',        desc:'Si pierdes un duelo, no pierdes tus empanadas apostadas.',     rarity:'raro',       price:600 },
  { id:'i_comodin',    type:'item',   name:'La Pregunta de Comodín', desc:'Una pregunta de tu próximo simulacro se marca correcta.',      rarity:'raro',       price:800 },
  { id:'i_ghost',      type:'item',   name:'Modo Fantasma',          desc:'Desapareces del ranking general por 48 horas.',                rarity:'épico',      price:1200 },
];

// Ícono de cada poder (PkIc, cero emojis)
const PODER_ICONS = {
  i_freeze: 'snowflake', i_boost: 'pergamino', i_tinto: 'coffee', i_repaso: 'refresh',
  i_arepa: 'empanada', i_comodin: 'rana', i_ghost: 'eye',
};

// Efecto que aplica cada poder al comprarse (se consume al usarse)
const ITEM_EFFECTS = {
  i_freeze:  s => ({ streakFreezes: (s.streakFreezes || 0) + 1 }),
  i_boost:   () => ({ simXpBoost: true }),
  i_tinto:   () => ({ xpBoostActive: true }),
  i_arepa:   () => ({ duelShieldActive: true }),
  i_repaso:  () => ({ repasoActive: true }),
  i_ghost:   () => ({ ghostUntil: Date.now() + 48 * 3600 * 1000 }),
  i_comodin: () => ({ comodinActive: true }),
};
// ¿Está activo ese poder ahora mismo? (para no vender doble)
const PODER_ACTIVO = {
  i_boost:   s => !!s.simXpBoost,
  i_tinto:   s => !!s.xpBoostActive,
  i_arepa:   s => !!s.duelShieldActive,
  i_repaso:  s => !!s.repasoActive,
  i_ghost:   s => (s.ghostUntil || 0) > Date.now(),
  i_comodin: s => !!s.comodinActive,
};

// Botín aleatorio al terminar una sesión de juego (empanadas extra siempre;
// a veces un poder gratis o un "cofre sorpresa" con recompensa gorda).
function otorgarBotinSesion(appState, setAppState, pushNotif, onCoinBurst) {
  const r = Math.random();
  const extra = 25 + Math.floor(Math.random() * 75);
  let ryoExtra = extra, xpExtra = 0, poderId = null;
  let mensaje = `Botín de sesión: +${extra} empanadas`;
  if (r < 0.16) {
    const cand = ['i_tinto', 'i_repaso', 'i_arepa', 'i_comodin', 'i_boost']
      .filter(id => !(PODER_ACTIVO[id] && PODER_ACTIVO[id](appState)));
    if (cand.length) {
      poderId = cand[Math.floor(Math.random() * cand.length)];
      const it = SHOP_ITEMS.find(x => x.id === poderId);
      mensaje = `¡Botín! Ganaste el poder «${it?.name}» + ${extra} empanadas`;
    }
  } else if (r < 0.22) {
    const bonus = 250 + Math.floor(Math.random() * 500);
    ryoExtra += bonus; xpExtra = 100 + Math.floor(Math.random() * 200);
    mensaje = `¡Cofre sorpresa! +${ryoExtra} empanadas y +${xpExtra} XP`;
  }
  // Pequeño retraso para que el botín no encime su suma/sonido con el 'coin' de la recompensa base
  setTimeout(() => {
    setAppState(s => {
      let upd = { ...s, ryo: (s.ryo || 0) + ryoExtra, xp: (s.xp || 0) + xpExtra };
      if (poderId) upd = { ...upd, ...(ITEM_EFFECTS[poderId]?.(upd) || {}) };
      return upd;
    });
    pushNotif?.(mensaje);   // el toast anuncia el botín; sin sonido de coin extra (evita el triple)
  }, 900);
}

// Ítems bloqueados por logro: candado visible + precio reducido al desbloquear
const SHOP_UNLOCKS = {
  t_leyenda:   { desc: 'Completa 25 simulacros para desbloquear', check: s => (s.icfesHistory || []).length >= 25, price: 2000 },
  f_supernova: { desc: 'Alcanza 30 días de racha para desbloquear', check: s => (s.streakDays || 0) >= 30, price: 10000 },
};

// Bundles: packs temáticos con su propia sección en el escaparate
const SHOP_BUNDLES = [
  { id: 'bd_aspirante', name: 'El Kit del Aspirante',   desc: 'Cofre de Plata + Kodachi de Hielo + Tinto Doble',
    price: 1200, rarity: 'raro', items: ['c_silver', 'i_freeze', 'i_tinto'] },
  { id: 'bd_leyenda',   name: 'El Combo del Legendario', desc: 'Cofre de Tumbaga + Escudo de Arepa + Pergamino del Maestro',
    price: 8000, rarity: 'legendario', items: ['c_tumbaga', 'i_arepa', 'i_boost'] },
];

// Oferta del día: 1 ítem aleatorio con 30% de descuento, cambia cada 24h
function ofertaDelDia() {
  const pool = SHOP_ITEMS.filter(i => i.price > 0 && !SHOP_UNLOCKS[i.id]);
  const idx = hashStr('oferta-' + dateKeyISO()) % pool.length;
  const item = pool[idx];
  return { item, precio: Math.round(item.price * 0.7) };
}

// Preview visual de un ítem del Bazar (60×60, con su animación activa).
// Vive a nivel de módulo para que React NO lo remonte en cada re-render
// (el countdown de la oferta reiniciaba las animaciones cada segundo).
function BazarPreview({ item, size = 60, C, user, appState }) {
  const rc = (RARITY_META[item.rarity] || {}).color || '#888';
  if (item.type === 'frame') return <Av name={user?.name || '?'} sz={size - 8} C={C} photoURL={appState.photoURL} frameData={item}/>;
  if (item.type === 'banner') return (
    <div className={item.animClass || ''} style={{ width: size, height: Math.round(size * 0.66), borderRadius: 9,
      background: item.css, boxShadow: `inset 0 0 0 1px ${rc}40` }}/>
  );
  if (item.type === 'chest') {
    const cc = CHEST_SHOP_COLORS[item.rarity] || CHEST_SHOP_COLORS['común'];
    return (
      <div style={{ '--cglow': `${cc.c2}77`, animation: 'chestFloat 2.4s ease-in-out infinite, chestGlowPulse 2.8s ease-in-out infinite' }}>
        <CofreSVG lv={cc} open={false} size={size - 12}/>
      </div>
    );
  }
  if (item.type === 'item') return (
    <div style={{ width: size - 8, height: size - 8, borderRadius: '50%', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: `${rc}16`, border: `1.5px solid ${rc}45`,
      boxShadow: `0 0 14px ${rc}33`, animation: 'breathe 2.6s ease-in-out infinite' }}>
      <PkIc n={PODER_ICONS[item.id] || 'star'} s={Math.round(size * 0.42)} c={rc}/>
    </div>
  );
  // título
  return (
    <div className={item.rarity === 'mítico' ? 'title-mythic' : item.rarity === 'legendario' ? 'title-legendary' : ''}
      style={{ width: size, textAlign: 'center', fontSize: 9.5, fontWeight: 900, fontStyle: 'italic',
        fontFamily: "'Fraunces', serif", color: rc, lineHeight: 1.25 }}>
      «{item.name}»
    </div>
  );
}

const ACCENT_COLORS = [
  { name: 'Ciruelo', value: '#9D4E7C' }, { name: 'Jade',    value: '#2D8A5E' },
  { name: 'Índigo',  value: '#4A6FA5' }, { name: 'Crisantemo', value: '#D4853A' },
  { name: 'Shogun',  value: '#7C3D3D' }, { name: 'Loto',    value: '#7B5EA7' },
  { name: 'Bambú',   value: '#5B8C5A' }, { name: 'Granate', value: '#8B2252' },
];

// ─────────────────────────────────────────────
//  PANEL DEL CREADOR — usuario admin de pruebas
//  Entra con uno de estos códigos y aparece el panel en Ajustes.
// ─────────────────────────────────────────────
const ADMIN_CODES = ['PANKEYDEV', 'ADMINSITO', 'ALEJK15'];

function AdminPanel({ C, appState, setAppState, pushNotif }) {
  const [vals, setVals] = useState({});
  const campos = [
    { k: 'ryo',           label: 'Empanadas' },
    { k: 'xp',            label: 'XP' },
    { k: 'streakDays',    label: 'Racha lectura (días)' },
    { k: 'icfesStreak',   label: 'Racha ICFES (días)' },
    { k: 'streakFreezes', label: 'Kodachis de Hielo' },
  ];
  const fijar = (k, label) => {
    const v = parseInt(vals[k]);
    if (isNaN(v) || v < 0) { pushNotif?.('Escribe un número válido.'); return; }
    FX.play('coin');
    setAppState(s => ({ ...s, [k]: v, ...(k === 'streakDays' && v > 0 ? { lastConfirmedDate: todayStr() } : {}) }));
    pushNotif?.(`${label} → ${v}`);
    fireBoost();
  };
  const accion = (nombre, cambios) => {
    FX.play('success');
    setAppState(s => ({ ...s, ...(typeof cambios === 'function' ? cambios(s) : cambios) }));
    pushNotif?.(nombre);
  };
  const RACHAS_FUEGO = [0, 1, 3, 7, 14, 30, 55];

  return (
    <Card C={C} isLight={false} style={{ padding: '18px', border: '1.5px dashed rgba(212,175,55,0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <PkIc n="settings" s={15} c="#D4AF37"/>
        <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: 2, color: '#D4AF37' }}>PANEL DEL CREADOR</span>
      </div>
      <div style={{ fontSize: 10.5, color: C.textMuted, marginBottom: 14 }}>
        Solo tú ves esto. Modifica el perfil para probar la app.
      </div>

      {/* Editores numéricos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {campos.map(({ k, label }) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted }}>{label}</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: C.text }}>{(appState[k] || 0).toLocaleString()}</div>
            </div>
            <input type="number" inputMode="numeric" placeholder="valor" value={vals[k] ?? ''}
              onChange={e => setVals(p => ({ ...p, [k]: e.target.value }))}
              style={{ width: 90, padding: '9px 10px', borderRadius: 10, border: `1px solid ${C.border}`,
                background: 'rgba(255,255,255,0.05)', color: C.text, fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}/>
            <button onClick={() => fijar(k, label)} style={{ padding: '9px 13px', borderRadius: 10, border: 'none',
              background: 'linear-gradient(135deg, #D4AF37, #8A6410)', color: '#1A1206',
              fontSize: 11.5, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
              Fijar
            </button>
          </div>
        ))}
      </div>

      {/* Vista rápida del fuego: salta a cualquier nivel de racha */}
      <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.2, color: C.textMuted, marginBottom: 6 }}>
        VER NIVELES DEL FUEGO (racha lectura)
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {RACHAS_FUEGO.map(n => (
          <button key={n} onClick={() => accion(`Racha → ${n} días`, s => ({ streakDays: n, lastConfirmedDate: n > 0 ? todayStr() : null, yourConfirmed: n > 0 }))}
            style={{ padding: '7px 13px', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit',
              background: (appState.streakDays || 0) === n ? 'rgba(249,115,22,0.25)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${(appState.streakDays || 0) === n ? '#F97316' : C.border}`,
              color: (appState.streakDays || 0) === n ? '#F97316' : C.textMid, fontSize: 12, fontWeight: 800 }}>
            {n}
          </button>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.2, color: C.textMuted, marginBottom: 6 }}>
        ACCIONES RÁPIDAS
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        {[
          { txt: '+1.000 emp', fn: s => ({ ryo: (s.ryo || 0) + 1000 }) },
          { txt: '+1.000 XP', fn: s => ({ xp: (s.xp || 0) + 1000 }) },
          { txt: 'Recargar cofre del día', fn: s => ({ cofreLastOpened: null, yourConfirmed: true, lastConfirmedDate: todayStr() }) },
          { txt: 'Reset misiones de hoy', fn: () => ({ missionsRewarded: [] }) },
          { txt: 'Desbloquear TODA la tienda', fn: s => ({ inventory: [...new Set([...(s.inventory || []), ...SHOP_ITEMS.filter(i => i.type !== 'chest' && i.type !== 'item').map(i => i.id)])] }) },
          { txt: 'Vaciar inventario', fn: () => ({ inventory: ['t_iniciado'], equipped: { title: null, frame: null, banner: null } }) },
          { txt: 'Activar todos los poderes', fn: s => ({ xpBoostActive: true, duelShieldActive: true, repasoActive: true, comodinActive: true, simXpBoost: true, ghostUntil: Date.now() + 48 * 3600 * 1000, streakFreezes: (s.streakFreezes || 0) + 1 }) },
          { txt: 'Apagar poderes', fn: () => ({ xpBoostActive: false, duelShieldActive: false, repasoActive: false, comodinActive: false, simXpBoost: false, ghostUntil: null }) },
          { txt: 'Reset récords de modos', fn: () => ({ contrarrelojRecord: 0, supervivenciaRecord: 0, ruletaMaxMult: 0 }) },
          { txt: 'Borrar historial ICFES', fn: () => ({ icfesHistory: [], modeStats: {}, weakStats: {}, icfesStreak: 0, lastIcfesDate: null }) },
        ].map(({ txt, fn }) => (
          <button key={txt} onClick={() => accion(txt, fn)} style={{ padding: '10px 8px', borderRadius: 11,
            border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.04)', color: C.textMid,
            fontSize: 10.5, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1.3 }}>
            {txt}
          </button>
        ))}
      </div>
    </Card>
  );
}

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
  const esCofre = item.type === 'chest';
  const esPoder = item.type === 'item';
  const poderActivo = esPoder && PODER_ACTIVO[item.id]?.(appState);
  const cc = esCofre ? (CHEST_SHOP_COLORS[item.rarity] || CHEST_SHOP_COLORS['común']) : null;

  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99998, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="fu" style={{ width: '100%', maxWidth: 380, maxHeight: '92vh', overflowY: 'auto', background: C.bgAlt, border: `1px solid ${rarity.color}40`, borderRadius: 24, boxShadow: `0 0 0 1px ${rarity.color}20, 0 24px 80px rgba(0,0,0,0.8), ${rarity.glow}` }}>
        <div style={{ padding: '24px', background: `linear-gradient(135deg, ${rarity.color}18, transparent)`, borderBottom: `1px solid ${C.border}`, position: 'relative', borderRadius: '24px 24px 0 0' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PkIc n="x" s={14} c={C.textMuted} /></button>
          <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 2, color: rarity.color, background: rarity.bg, border: `1px solid ${rarity.color}30`, borderRadius: 6, padding: '4px 10px', display: 'inline-block', marginBottom: 12 }}>{rarity.label}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: C.text, fontFamily: "'Fraunces', serif", lineHeight: 1.1, marginBottom: 8 }}>{item.name}</div>
          <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>{item.desc}</div>
        </div>

        {/* ── PREVIEW GRANDE: el objeto en todo su esplendor ── */}
        {(item.type === 'frame' || item.type === 'banner' || esCofre || esPoder) && (
          <div style={{ padding: '26px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            background: `radial-gradient(circle at 50% 45%, ${rarity.color}22 0%, transparent 68%)` }}>
            {item.type === 'frame' && (
              <Av name={user?.name || '?'} sz={110} C={C} photoURL={appState.photoURL} frameData={item} />
            )}
            {item.type === 'banner' && (
              <div className={item.animClass || ''} style={{ width: '100%', height: 110, borderRadius: 16, background: item.css,
                boxShadow: `0 8px 30px ${rarity.color}40, inset 0 0 0 1px ${rarity.color}45` }} />
            )}
            {esCofre && (
              <div style={{ '--cglow': `${cc.c2}88`, animation: 'chestFloat 2s ease-in-out infinite, chestGlowPulse 2.4s ease-in-out infinite' }}>
                <CofreSVG lv={cc} open={false} size={110}/>
              </div>
            )}
            {esPoder && (
              <div style={{ width: 104, height: 104, borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: `${rarity.color}14`, border: `2px solid ${rarity.color}55`,
                boxShadow: `0 0 30px ${rarity.color}44`, animation: 'breathe 2.6s ease-in-out infinite' }}>
                <PkIc n={PODER_ICONS[item.id] || 'star'} s={46} c={rarity.color}/>
              </div>
            )}
          </div>
        )}

        {esCofre && (
          <div style={{ padding: '0 24px 8px', display: 'flex', gap: 8 }}>
            {[
              { k: 'Empanadas', v: `${item.rewards.minRyo}–${item.rewards.maxRyo}` },
              { k: 'XP', v: `+${item.rewards.xpBonus}` },
              { k: 'Tesoro', v: item.rewards.itemChance > 0 ? `${Math.round(item.rewards.itemChance * 100)}%` : '—' },
            ].map(({ k, v }) => (
              <div key={k} style={{ flex: 1, textAlign: 'center', padding: '10px 6px', borderRadius: 12,
                background: `${rarity.color}10`, border: `1px solid ${rarity.color}28` }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1, color: C.textMuted, marginBottom: 3 }}>{k.toUpperCase()}</div>
                <div style={{ fontSize: 13.5, fontWeight: 900, color: rarity.color }}>{v}</div>
              </div>
            ))}
          </div>
        )}

        {item.type !== 'item' && !esCofre && (
          <div style={{ padding: '0 20px 20px' }}>
            <ProfileMiniCard C={C} name={user?.name} code={user?.code} titleItem={previewTitle} photoURL={appState.photoURL} frameItem={previewFrame} bannerItem={previewBanner} level={lvl} ryo={appState.ryo} isPreview={true} />
          </div>
        )}
        <div style={{ padding: '16px 20px 24px' }}>
          {esCofre ? (
            <button onClick={() => { if (canAfford) { onBuy(item); onClose(); } }} disabled={!canAfford} style={{ width: '100%', padding: '16px', background: canAfford ? `linear-gradient(135deg, ${cc.c1}, ${cc.c2})` : C.bgAlt, color: canAfford ? '#1A1206' : C.textMuted, border: canAfford ? 'none' : `1px solid ${C.border}`, borderRadius: 14, fontSize: 15, fontWeight: 900, cursor: canAfford ? 'pointer' : 'not-allowed', boxShadow: canAfford ? `0 8px 24px ${rarity.color}40` : 'none', fontFamily: 'inherit' }}>
              {canAfford ? `¡Comprar y abrir! · ${item.price.toLocaleString()} emp.` : `Faltan ${(item.price - (appState.ryo || 0)).toLocaleString()} emp.`}
            </button>
          ) : esPoder ? (
            <button onClick={() => { if (canAfford && !poderActivo) { onBuy(item); onClose(); } }} disabled={!canAfford || poderActivo} style={{ width: '100%', padding: '16px', background: poderActivo ? C.bgAlt : canAfford ? `linear-gradient(135deg, ${rarity.color}, ${rarity.color}DD)` : C.bgAlt, color: poderActivo ? '#4ADE80' : canAfford ? '#fff' : C.textMuted, border: canAfford && !poderActivo ? 'none' : `1px solid ${C.border}`, borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: canAfford && !poderActivo ? 'pointer' : 'not-allowed', boxShadow: canAfford && !poderActivo ? `0 8px 24px ${rarity.color}40` : 'none', fontFamily: 'inherit' }}>
              {poderActivo ? '✓ Poder activo' : canAfford ? (
                item.__original ? `Activar · ${item.price.toLocaleString()} emp. (antes ${item.__original.toLocaleString()})` : `Activar poder · ${item.price.toLocaleString()} emp.`
              ) : `Faltan ${(item.price - (appState.ryo || 0)).toLocaleString()} emp.`}
            </button>
          ) : isOwned ? (
            <button onClick={() => { onEquip(item); onClose(); }} disabled={isEquipped} style={{ width: '100%', padding: '16px', background: isEquipped ? C.bgAlt : `linear-gradient(135deg, ${C.accent}, ${C.accent}DD)`, color: isEquipped ? C.textMuted : '#fff', border: isEquipped ? `1px solid ${C.border}` : 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: isEquipped ? 'default' : 'pointer', boxShadow: isEquipped ? 'none' : `0 8px 24px ${C.accent}40`, fontFamily: 'inherit' }}>
              {isEquipped ? '✓ Objeto Equipado' : 'Equipar en el Perfil'}
            </button>
          ) : (
            <button onClick={() => { if (canAfford) { onBuy(item); onClose(); } }} disabled={!canAfford} style={{ width: '100%', padding: '16px', background: canAfford ? `linear-gradient(135deg, ${rarity.color}, ${rarity.color}DD)` : C.bgAlt, color: canAfford ? '#fff' : C.textMuted, border: canAfford ? 'none' : `1px solid ${C.border}`, borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: canAfford ? 'pointer' : 'not-allowed', boxShadow: canAfford ? `0 8px 24px ${rarity.color}40` : 'none', fontFamily: 'inherit' }}>
              {canAfford
                ? item.__original
                  ? `Adquirir · ${item.price.toLocaleString()} emp. (antes ${item.__original.toLocaleString()})`
                  : `Adquirir · ${item.price.toLocaleString()} emp.`
                : `Faltan ${(item.price - (appState.ryo || 0)).toLocaleString()} emp.`}
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
      else if (myScore < oppScore && w > 0) {
        // 🛡️ Escudo de Arepa: la derrota no se lleva tus empanadas
        setAppState(s => {
          if (!s.duelShieldActive) return s;
          setTimeout(() => pushNotif?.(`Tu Escudo de Arepa protegió tus ${w} empanadas apostadas.`), 500);
          return { ...s, ryo: (s.ryo || 0) + w, duelShieldActive: false };
        });
      }
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
        })
        // 👻 Modo Fantasma: los perfiles ocultos no aparecen en el ranking (tú sí te ves a ti mismo)
        .filter(u => u.code === user?.code || !((u.appState?.ghostUntil || 0) > Date.now()))
        .sort((a, b) => b.correctas - a.correctas);
        
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
function SettingsTab({ C, isLight, themeKey, setThemeKey, ambientOn, setAmbientOn, appState, setAppState, user, onLogout, onSavePhoto, partnerPhotoURL, pushNotif, onCoinBurst, onAchievement, startView = 'settings', startViewNonce = 0, onGoSettings, asTab = false }) {
  const [view, setView]           = useState(startView);

  // Re-sincronizar la vista cuando navegan desde afuera (Inicio/menú) — el tab vive siempre montado
  useEffect(() => { setView(startView); }, [startView, startViewNonce]);
  const [saved, setSaved]         = useState(false);
  const [dailyGoal, setDailyGoal] = useState(appState.dailyGoal || 20);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [institution, setInstitution] = useState(appState.institution || '');
  const [interests, setInterests]     = useState(appState.interests || '');
  const [selectedShopItem, setSelectedShopItem] = useState(null);
  const [chestShow, setChestShow] = useState(null); // { chest, premio } → show de apertura
  const [bazarCat, setBazarCat] = useState('chest'); // categoría activa del Bazar
  const [heroIdx, setHeroIdx] = useState(0);         // slide activo del escaparate
  const [bundleConfirm, setBundleConfirm] = useState(null); // pack pendiente de confirmar
  const [, setBazarTick] = useState(0);              // tick del countdown de la oferta
  const fileInputRef = useRef(null);

  // Countdown de la Oferta del Día (solo late cuando el Bazar está abierto)
  useEffect(() => {
    if (view !== 'shop') return undefined;
    const iv = setInterval(() => setBazarTick(t => t + 1), 1000);
    return () => clearInterval(iv);
  }, [view]);

  // ✅ FIXED: XP desde appState.xp (no calculado de racha+minutos)
  const lvl     = computeLevel(appState.xp || 0);
  const myTitle = appState.equipped?.title?.name || 'Iniciado';
  const myFrame = appState.equipped?.frame;
  const myBanner = appState.equipped?.banner?.css || `linear-gradient(135deg, ${C.accent}40, ${C.accent}10)`;

  // Comprar un cofre: se descuenta y se abre INMEDIATAMENTE con el show completo
  const RARITY_RANK = ['común', 'poco común', 'raro', 'épico', 'legendario', 'mítico'];
  const buyChest = (chest) => {
    if ((appState.ryo || 0) < chest.price) { FX.play('error'); FX.vibrate('error'); return; }
    FX.play('coin'); FX.vibrate('heavy');
    const rw = chest.rewards || {};
    const rr = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    const emp = rr(rw.minRyo || 10, rw.maxRyo || 50);
    const xp  = rw.xpBonus || 0;
    let item = null;
    if ((rw.itemChance || 0) > 0 && Math.random() < rw.itemChance) {
      const maxRank = RARITY_RANK.indexOf(chest.rarity);
      const pool = SHOP_ITEMS.filter(i =>
        i.type !== 'chest' && i.type !== 'item' && i.price > 0 &&
        RARITY_RANK.indexOf(i.rarity) <= maxRank &&
        !(appState.inventory || []).includes(i.id));
      if (pool.length) item = pool[Math.floor(Math.random() * pool.length)];
    }
    setAppState(s => ({
      ...s,
      ryo: (s.ryo || 0) - chest.price + emp,
      xp:  (s.xp || 0) + xp,
      inventory: item ? [...(s.inventory || []), item.id] : (s.inventory || []),
    }));
    setChestShow({ chest, premio: { emp, xp, item } });
    fireBoost();
  };

  const buyItem = (item) => {
    if (item.type === 'chest') { buyChest(item); return; }

    // Candado por logro: no se puede comprar sin cumplir la condición
    const unlock = SHOP_UNLOCKS[item.id];
    if (unlock && !unlock.check(appState)) { FX.play('error'); pushNotif?.(unlock.desc); return; }

    // ── PODERES: se compran, aplican su efecto y se pueden recomprar al gastarse ──
    if (item.type === 'item') {
      if (item.id !== 'i_freeze' && PODER_ACTIVO[item.id]?.(appState)) {
        FX.play('error'); pushNotif?.('Ese poder ya está activo. Úsalo antes de comprar otro.');
        return;
      }
      if ((appState.ryo || 0) < item.price) { FX.play('error'); FX.vibrate('error'); return; }
      FX.play('coin'); FX.vibrate('heavy');
      setAppState(s => ({ ...s, ryo: (s.ryo || 0) - item.price, ...(ITEM_EFFECTS[item.id]?.(s) || {}) }));
      if (item.id === 'i_freeze') desbloquearLogroFreeze();
      pushNotif?.(`¡${item.name} activado!`);
      onCoinBurst?.(-item.price);
      return;
    }

    if ((appState.inventory || []).includes(item.id)) { equipItem(item); return; }

    if ((appState.ryo || 0) < item.price) {
      FX.play('error'); FX.vibrate('error'); // ❌ Sonido de error si no tienes plata
      return;
    }

    FX.play('coin'); FX.vibrate('heavy'); // 🪙 Ca-ching de oro al comprar con éxito

    setAppState(s => ({
      ...s,
      ryo: (s.ryo || 0) - item.price,
      inventory: [...(s.inventory || []), item.id],
      equipped: { ...(s.equipped || {}), [item.type]: item },
    }));

    pushNotif?.(`¡${item.name} comprado y equipado!`);
    onCoinBurst?.(-item.price);
  };

  // Logro por comprar el primer Kodachi de Hielo
  const desbloquearLogroFreeze = () => {
    {
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

  // ── VISTA: TIENDA — "El Bazar del Páramo" ────────────────────
  if (view === 'shop') {
    const RARITY_ORDER = ['mítico', 'legendario', 'épico', 'raro', 'poco común', 'común'];
    const rankOf = (r) => RARITY_ORDER.indexOf(r);
    const oferta = ofertaDelDia();

    // ZONA 1 — EL ESCAPARATE: oferta del día + los 3 más raros + bundles
    const rarest = SHOP_ITEMS
      .filter(i => !SHOP_UNLOCKS[i.id] && i.price > 0 && i.id !== oferta.item.id)
      .sort((a, b) => rankOf(a.rarity) - rankOf(b.rarity) || b.price - a.price)
      .slice(0, 3);
    const slides = [
      { tipo: 'oferta', item: oferta.item, precio: oferta.precio },
      ...rarest.map(item => ({ tipo: 'item', item })),
      ...SHOP_BUNDLES.map(b => ({ tipo: 'bundle', bundle: b })),
    ];
    const slideColor = (s) => (RARITY_META[(s.item || s.bundle).rarity] || RARITY_META['común']).color;
    const heroColor = slideColor(slides[Math.min(heroIdx, slides.length - 1)]);

    // Countdown de la oferta (hasta medianoche)
    const msFin = (() => { const d = new Date(); d.setHours(24, 0, 0, 0); return d.getTime() - Date.now(); })();
    const hh = Math.floor(msFin / 3600000), mm2 = Math.floor((msFin % 3600000) / 60000), ss2 = Math.floor((msFin % 60000) / 1000);
    const cuenta = `${String(hh).padStart(2, '0')}:${String(mm2).padStart(2, '0')}:${String(ss2).padStart(2, '0')}`;

    // ZONA 2 — CATEGORÍAS
    const CATS = [
      { id: 'chest',  label: 'Cofres' },
      { id: 'frame',  label: 'Marcos' },
      { id: 'title',  label: 'Títulos' },
      { id: 'banner', label: 'Paisajes' },
      { id: 'item',   label: 'Poderes' },
    ];
    const catColor = (cid) => {
      const its = SHOP_ITEMS.filter(i => i.type === cid);
      const best = its.reduce((m, i) => Math.min(m, rankOf(i.rarity)), 99);
      return (RARITY_META[RARITY_ORDER[best]] || RARITY_META['común']).color;
    };

    // ZONA 3 — LISTA de la categoría activa, mítico → común
    const listItems = SHOP_ITEMS
      .filter(i => i.type === bazarCat)
      .sort((a, b) => rankOf(a.rarity) - rankOf(b.rarity) || b.price - a.price);

    const abrirItem = (item, precioOverride = null) => {
      FX.play('tap');
      const un = SHOP_UNLOCKS[item.id];
      if (un && !un.check(appState)) { FX.play('error'); pushNotif?.(un.desc); return; }
      const final = un && un.check(appState) && !(appState.inventory || []).includes(item.id)
        ? { ...item, price: un.price, __original: item.price, __desbloqueado: true }
        : precioOverride !== null
        ? { ...item, price: precioOverride, __original: item.price, __oferta: true }
        : item;
      setSelectedShopItem(final);
    };

    const comprarBundle = (b) => {
      if ((appState.ryo || 0) < b.price) { FX.play('error'); FX.vibrate('error'); pushNotif?.('No te alcanzan las empanadas para este pack.'); return; }
      FX.play('coin'); FX.vibrate('heavy');
      let chestPremio = null, chestItem = null;
      let efectos = {};
      b.items.forEach(id => {
        const it = SHOP_ITEMS.find(x => x.id === id);
        if (!it) return;
        if (it.type === 'chest') {
          const rw = it.rewards || {};
          const rr = (a, c) => a + Math.floor(Math.random() * (c - a + 1));
          chestPremio = { emp: rr(rw.minRyo || 10, rw.maxRyo || 50), xp: rw.xpBonus || 0, item: null };
          chestItem = it;
        } else if (ITEM_EFFECTS[id]) {
          efectos = { ...efectos, __fns: [...(efectos.__fns || []), ITEM_EFFECTS[id]] };
        }
      });
      setAppState(s => {
        let upd = { ...s, ryo: (s.ryo || 0) - b.price + (chestPremio ? chestPremio.emp : 0), xp: (s.xp || 0) + (chestPremio ? chestPremio.xp : 0) };
        (efectos.__fns || []).forEach(fn => { upd = { ...upd, ...fn(upd) }; });
        return upd;
      });
      if (chestItem && chestPremio) setChestShow({ chest: chestItem, premio: chestPremio });
      pushNotif?.(`¡${b.name} adquirido! Poderes activados.`);
      fireBoost();
    };

    return (
      <div className="fi" style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '-20px -20px 0' }}>
        {chestShow && (
          <ChestShopShow chest={chestShow.chest} premio={chestShow.premio} onClose={() => setChestShow(null)} />
        )}
        {selectedShopItem && (
          <ShopItemModal C={C} isLight={isLight} item={selectedShopItem} appState={appState} user={user} onBuy={buyItem} onEquip={equipItem} onClose={() => setSelectedShopItem(null)} />
        )}

        {/* ── Confirmación de compra de pack ── */}
        {bundleConfirm && (() => {
          const b = bundleConfirm;
          const rmeta = RARITY_META[b.rarity] || RARITY_META['común'];
          const alcanza = (appState.ryo || 0) >= b.price;
          return (
            <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 99998, background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(14px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
              onClick={() => setBundleConfirm(null)}>
              <div onClick={e => e.stopPropagation()} className="fu" style={{ width: '100%', maxWidth: 350,
                background: C.bgAlt, border: `1.5px solid ${rmeta.color}50`, borderRadius: 24, padding: '24px 22px',
                boxShadow: `0 24px 70px rgba(0,0,0,0.7), 0 0 34px ${rmeta.color}22` }}>
                <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 2, color: rmeta.color, background: rmeta.bg,
                  border: `1px solid ${rmeta.color}30`, borderRadius: 6, padding: '4px 10px', display: 'inline-block', marginBottom: 12 }}>
                  PACK TEMÁTICO · {rmeta.label}
                </div>
                <div className="serif" style={{ fontSize: 21, fontWeight: 800, color: C.text, marginBottom: 6 }}>{b.name}</div>
                <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5, marginBottom: 16 }}>{b.desc}</div>

                {/* Contenido del pack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
                  {b.items.map(id => {
                    const it = SHOP_ITEMS.find(x => x.id === id);
                    if (!it) return null;
                    const rc = (RARITY_META[it.rarity] || {}).color || '#888';
                    return (
                      <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px',
                        borderRadius: 14, background: `${rc}0C`, border: `1px solid ${rc}28` }}>
                        <div style={{ width: 46, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <BazarPreview item={it} size={46} C={C} user={user} appState={appState}/>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{it.name}</div>
                          <div style={{ fontSize: 10.5, color: C.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.desc}</div>
                        </div>
                        {it.price > 0 && (
                          <span style={{ fontSize: 10.5, fontWeight: 800, color: C.textMuted, textDecoration: 'line-through', flexShrink: 0 }}>
                            {it.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Total y confirmación */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: C.textMuted }}>TOTAL DEL PACK</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 19, fontWeight: 900, color: C.amberMid }}>
                    <PkIc n="empanada" s={16} c={C.amberMid}/>{b.price.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 9 }}>
                  <button onClick={() => setBundleConfirm(null)} style={{ flex: 1, padding: '14px', borderRadius: 13,
                    border: `1px solid ${C.border}`, background: 'transparent', color: C.textMid,
                    fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Cancelar
                  </button>
                  <button onClick={() => { if (alcanza) { comprarBundle(b); setBundleConfirm(null); } }} disabled={!alcanza}
                    style={{ flex: 1.4, padding: '14px', borderRadius: 13, border: 'none',
                    background: alcanza ? `linear-gradient(135deg, ${rmeta.color}, ${rmeta.color}BB)` : C.bgAlt,
                    color: alcanza ? '#fff' : C.textMuted, fontSize: 13, fontWeight: 900,
                    cursor: alcanza ? 'pointer' : 'not-allowed',
                    boxShadow: alcanza ? `0 6px 18px ${rmeta.color}40` : 'none', fontFamily: 'inherit' }}>
                    {alcanza ? '¡Confirmar compra!' : `Faltan ${(b.price - (appState.ryo || 0)).toLocaleString()} emp`}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ══ ZONA 1 — EL ESCAPARATE ══ */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Fondo con crossfade según el ítem activo */}
          <div style={{ position: 'absolute', inset: 0,
            background: `radial-gradient(circle at 50% 30%, ${heroColor}30 0%, transparent 75%)`,
            transition: 'background 0.7s ease' }}/>

          {/* Header del bazar */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10, padding: '18px 20px 4px' }}>
            {!asTab && (
              <button onClick={() => setView(startView === 'profile' ? 'profile' : 'settings')} style={{
                background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, borderRadius: '50%',
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <PkIc n="left" s={17} c={C.text}/>
              </button>
            )}
            <div style={{ flex: 1 }}>
              <div className="serif" style={{ fontSize: 21, fontWeight: 800, color: C.text }}>El Bazar del Páramo</div>
              <div style={{ fontSize: 10.5, color: C.textMuted, fontWeight: 700, letterSpacing: 0.5 }}>Tesoros, poderes y cofres del más allá</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 99,
              background: `${C.amberMid}14`, border: `1px solid ${C.amberMid}35`, flexShrink: 0 }}>
              <PkIc n="empanada" s={14} c={C.amberMid}/>
              <span style={{ fontSize: 14, fontWeight: 900, color: C.amberMid }}>{(appState.ryo || 0).toLocaleString()}</span>
            </div>
          </div>

          {/* Carrusel con snap */}
          <div className="bazar-carousel" style={{ position: 'relative' }}
            onScroll={e => {
              const w = e.currentTarget.clientWidth || 1;
              const idx = Math.round(e.currentTarget.scrollLeft / w);
              if (idx !== heroIdx) setHeroIdx(idx);
            }}>
            {slides.map((s, i) => {
              const obj = s.item || s.bundle;
              const rc = slideColor(s);
              const rmeta = RARITY_META[obj.rarity] || RARITY_META['común'];
              return (
                <div key={i} className="bazar-slide" style={{ padding: '14px 20px 10px' }}>
                  <button onClick={() => {
                    if (s.tipo === 'bundle') { FX.play('tap'); setBundleConfirm(s.bundle); }
                    else abrirItem(s.item, s.tipo === 'oferta' ? s.precio : null);
                  }} style={{
                    position: 'relative', width: '100%', height: 230, border: `1.5px solid ${rc}55`, borderRadius: 24,
                    cursor: 'pointer', fontFamily: 'inherit', overflow: 'hidden', textAlign: 'left',
                    background: s.item?.type === 'banner'
                      ? s.item.css
                      : `linear-gradient(150deg, ${rc}30 0%, #0B0F1A 55%, ${rc}14 100%)`,
                    boxShadow: `0 12px 38px ${rc}30`,
                    animation: heroIdx === i ? 'bazarHeroIn 0.5s ease both' : 'none' }}>
                    {/* Overlay si el fondo es el propio banner */}
                    {s.item?.type === 'banner' && (
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,6,12,0.25), rgba(4,6,12,0.72))' }}/>
                    )}
                    {/* Shimmer para míticos */}
                    {obj.rarity === 'mítico' && (
                      <div style={{ position: 'absolute', top: 0, bottom: 0, width: 70, pointerEvents: 'none',
                        background: `linear-gradient(90deg, transparent, ${rc}33, transparent)`,
                        animation: 'shimmerSlide 2.6s ease-in-out infinite' }}/>
                    )}

                    {/* Badge de OFERTA con timer */}
                    {s.tipo === 'oferta' && (
                      <div style={{ position: 'absolute', top: 12, left: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ padding: '4px 11px', borderRadius: 99, background: '#EF4444', color: '#fff',
                          fontSize: 10, fontWeight: 900, letterSpacing: 1.5,
                          animation: 'ofertaPulse 1.1s ease-in-out infinite', boxShadow: '0 0 14px rgba(239,68,68,0.6)' }}>
                          OFERTA −30%
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#FCA5A5', fontVariantNumeric: 'tabular-nums' }}>{cuenta}</span>
                      </div>
                    )}
                    {s.tipo === 'bundle' && (
                      <div style={{ position: 'absolute', top: 12, left: 14, padding: '4px 11px', borderRadius: 99,
                        background: `${rc}25`, border: `1px solid ${rc}66`, color: rc,
                        fontSize: 10, fontWeight: 900, letterSpacing: 1.5 }}>
                        PACK TEMÁTICO
                      </div>
                    )}

                    {/* Contenido central */}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', paddingTop: s.tipo === 'oferta' || s.tipo === 'bundle' ? 16 : 0 }}>
                      {s.tipo === 'bundle' ? (
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                          {s.bundle.items.map(id => {
                            const it = SHOP_ITEMS.find(x => x.id === id);
                            return it ? <BazarPreview key={id} item={it} size={54} C={C} user={user} appState={appState}/> : null;
                          })}
                        </div>
                      ) : s.item.type === 'title' ? (
                        <div className={s.item.rarity === 'mítico' ? 'title-mythic' : s.item.rarity === 'legendario' ? 'title-legendary' : ''}
                          style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                            color: rc, textAlign: 'center', padding: '0 26px', lineHeight: 1.2 }}>
                          «{s.item.name}»
                        </div>
                      ) : s.item.type === 'frame' ? (
                        <Av name={user?.name || '?'} sz={96} C={C} photoURL={appState.photoURL} frameData={s.item}/>
                      ) : s.item.type === 'chest' ? (
                        <div style={{ '--cglow': `${rc}88`, animation: 'chestFloat 2s ease-in-out infinite, chestGlowPulse 2.4s ease-in-out infinite' }}>
                          <CofreSVG lv={CHEST_SHOP_COLORS[s.item.rarity] || CHEST_SHOP_COLORS['común']} open={false} size={92}/>
                        </div>
                      ) : s.item.type === 'item' ? (
                        <BazarPreview item={s.item} size={104} C={C} user={user} appState={appState}/>
                      ) : (
                        <div style={{ width: '68%', height: 86 }}/>
                      )}
                    </div>

                    {/* Nombre + rareza + precio */}
                    <div style={{ position: 'absolute', left: 16, right: 16, bottom: 12 }}>
                      <div style={{ fontSize: 17, fontWeight: 900, color: '#F5F2EB', fontFamily: "'Fraunces', serif" }}>
                        {obj.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }}>
                        <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: rc,
                          textShadow: `0 0 12px ${rc}` }}>
                          {s.tipo === 'bundle' ? s.bundle.desc.toUpperCase().slice(0, 34) + '…' : rmeta.label}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 15, fontWeight: 900, color: C.amberMid }}>
                          {s.tipo === 'oferta' && (
                            <span style={{ fontSize: 11.5, color: 'rgba(245,242,235,0.45)', textDecoration: 'line-through', fontWeight: 700 }}>
                              {s.item.price.toLocaleString()}
                            </span>
                          )}
                          <PkIc n="empanada" s={14} c={C.amberMid}/>
                          {(s.tipo === 'oferta' ? s.precio : s.tipo === 'bundle' ? s.bundle.price : s.item.price).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Dots de navegación */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: 6, padding: '2px 0 12px' }}>
            {slides.map((s, i) => (
              <div key={i} style={{ width: heroIdx === i ? 18 : 6, height: 6, borderRadius: 99,
                background: heroIdx === i ? slideColor(s) : 'rgba(255,255,255,0.18)',
                boxShadow: heroIdx === i ? `0 0 8px ${slideColor(s)}` : 'none',
                transition: 'all 0.3s ease' }}/>
            ))}
          </div>
        </div>

        {/* ══ ZONA 2 — TABS DE CATEGORÍA (sticky) ══ */}
        <div style={{ position: 'sticky', top: 0, zIndex: 20, padding: '10px 20px 8px',
          background: `${C.bg}F2`, backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          borderBottom: `1px solid ${C.border}66` }}>
          <div className="bazar-tabs">
            {CATS.map(cat => {
              const activo = bazarCat === cat.id;
              const cc = catColor(cat.id);
              return (
                <button key={cat.id} onClick={() => { FX.play('tap'); setBazarCat(cat.id); }} style={{
                  flexShrink: 0, padding: '9px 16px', borderRadius: 12, border: 'none',
                  background: activo ? `${cc}16` : 'transparent',
                  color: activo ? cc : C.textMuted, fontSize: 13, fontWeight: 800,
                  cursor: 'pointer', fontFamily: 'inherit', position: 'relative' }}>
                  {cat.label}
                  {activo && (
                    <div style={{ position: 'absolute', bottom: 0, left: '25%', right: '25%', height: 3,
                      borderRadius: 99, background: cc, boxShadow: `0 0 8px ${cc}`,
                      animation: 'tabPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}/>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ ZONA 3 — LISTA VERTICAL DE ÍTEMS ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, padding: '14px 20px 10px' }}>
          {listItems.map((item, idx) => {
            const rc = (RARITY_META[item.rarity] || {}).color || '#888';
            const rmeta = RARITY_META[item.rarity] || RARITY_META['común'];
            const isOwned = (appState.inventory || []).includes(item.id);
            const isEquipped = appState.equipped?.[item.type]?.id === item.id;
            const un = SHOP_UNLOCKS[item.id];
            const bloqueado = un && !un.check(appState);
            const desbloqueado = un && un.check(appState) && !isOwned;
            const esOferta = oferta.item.id === item.id;
            const activo = item.type === 'item' && PODER_ACTIVO[item.id]?.(appState);
            return (
              <button key={item.id} onClick={() => abrirItem(item, esOferta ? oferta.precio : null)}
                className="fu" style={{
                animationDelay: `${Math.min(idx * 0.04, 0.4)}s`,
                display: 'flex', alignItems: 'center', gap: 13, width: '100%', minHeight: 90,
                padding: '13px 15px', borderRadius: 18, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                border: `1px solid ${isEquipped ? rc : `${rc}30`}`,
                /* gradiente MUY sutil del color de la rareza */
                background: `linear-gradient(120deg, ${rc}0E 0%, ${C.bgAlt} 60%)`,
                opacity: bloqueado ? 0.72 : 1,
                boxShadow: isEquipped ? `0 6px 20px ${rc}22` : '0 4px 12px rgba(0,0,0,0.12)' }}>
                {/* IZQUIERDA: preview animado */}
                <div style={{ width: 60, height: 60, flexShrink: 0, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', position: 'relative', filter: bloqueado ? 'grayscale(0.9)' : 'none' }}>
                  <BazarPreview item={item} C={C} user={user} appState={appState}/>
                  {bloqueado && (
                    <div style={{ position: 'absolute', inset: -4, borderRadius: 14, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', background: 'rgba(4,6,12,0.55)' }}>
                      <PkIc n="settings" s={0} c="transparent"/>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round">
                        <rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                      </svg>
                    </div>
                  )}
                </div>
                {/* CENTRO: nombre + desc + rareza */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span className={item.type === 'title' && item.rarity === 'mítico' ? 'title-mythic' : item.type === 'title' && item.rarity === 'legendario' ? 'title-legendary' : ''}
                      style={{ fontSize: 14, fontWeight: 800, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </span>
                    {esOferta && !bloqueado && (
                      <span style={{ fontSize: 8, fontWeight: 900, letterSpacing: 1, color: '#fff', background: '#EF4444',
                        borderRadius: 5, padding: '2px 6px', animation: 'ofertaPulse 1.1s ease-in-out infinite', flexShrink: 0 }}>
                        OFERTA
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2, overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {bloqueado ? un.desc : item.desc}
                  </div>
                  <span style={{ display: 'inline-block', marginTop: 4, fontSize: 8.5, fontWeight: 900, letterSpacing: 1.2,
                    color: rc, background: rmeta.bg, border: `1px solid ${rc}30`, borderRadius: 5, padding: '2px 7px' }}>
                    {rmeta.label}{desbloqueado ? ' · DESBLOQUEADO' : ''}
                  </span>
                </div>
                {/* DERECHA: precio / estado */}
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  {bloqueado ? (
                    <PkIc n="x" s={0} c="transparent"/>
                  ) : isOwned && item.type !== 'item' && item.type !== 'chest' ? (
                    <span style={{ fontSize: 12, fontWeight: 800, color: rc }}>{isEquipped ? '✓ Equipado' : '✓ Tuyo'}</span>
                  ) : activo ? (
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: '#4ADE80' }}>✓ Activo</span>
                  ) : item.price === 0 ? (
                    <span style={{ fontSize: 12, fontWeight: 900, color: '#34D399' }}>GRATIS</span>
                  ) : (
                    <div>
                      {(esOferta || desbloqueado) && (
                        <div style={{ fontSize: 10, color: 'rgba(245,242,235,0.4)', textDecoration: 'line-through', fontWeight: 700 }}>
                          {item.price.toLocaleString()}
                        </div>
                      )}
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13.5, fontWeight: 900, color: C.amberMid }}>
                        <PkIc n="empanada" s={13} c={C.amberMid}/>
                        {(esOferta ? oferta.precio : desbloqueado ? un.price : item.price).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

 // ── VISTA PRINCIPAL ────────────────────────────────────────────
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

      {/* ── Panel del Creador (solo códigos admin) ── */}
      {ADMIN_CODES.includes(user?.code) && (
        <AdminPanel C={C} appState={appState} setAppState={setAppState} pushNotif={pushNotif}/>
      )}

      <button onClick={onLogout} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 14, padding: '13px', color: C.textMuted, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
        Cerrar sesión
      </button>
    </div>
  );
}

// End of Pankey App.js — Complete v2.0 with all fixes and new featuress