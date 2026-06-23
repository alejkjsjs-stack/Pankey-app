// ─────────────────────────────────────────────
//  GLOBAL STYLES — Premium Japanese aesthetic
// ─────────────────────────────────────────────
export const globalStyles = `
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
`;
