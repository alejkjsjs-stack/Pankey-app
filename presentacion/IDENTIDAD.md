# IDENTIDAD.md — Sistema visual real de Simu

> Extraído directamente del código (`src/App.js`, `src/config/theme.js`, `src/components/Icon.js`).
> Todo lo de abajo es lo que la app usa **de verdad**; no hay nada inventado.
> Tema activo único: **`aizome_dark`** — la marca lo llama **"Ascua"**.

---

## 1. Filosofía del tema — "Ascua"

De `src/config/theme.js:1`:
> *"Tema único de Simu: **Ascua** — negro total + rojo carmesí (con estrellas de fondo). El color de acento se puede personalizar aparte (customColor)."*

Negro absoluto, brasa carmesí, y detalles en oro. Nada de fondos claros. La estética es cálida, nocturna, colombiana y "de fogón".

---

## 2. Tokens de color — `THEMES.aizome_dark`

Fuente exacta: `src/config/theme.js:4`. Se consumen en el código como `C.<token>` (p. ej. `C.bg`, `C.accent`, `C.amberMid`).

| Variable (en el código) | Hex | Uso real |
|---|---|---|
| `bg` | `#000000` | Fondo base (negro total) |
| `bgCard` | `#0E0A0C` | Fondo de tarjetas |
| `bgAlt` | `#160D11` | Fondo alterno / hojas / modales |
| `border` | `#331A22` | Borde estándar |
| `borderStrong` | `#552832` | Borde marcado |
| `text` | `#F6F1F2` | Texto principal (casi blanco cálido) |
| `textMid` | `#B9A9AF` | Texto secundario |
| `textMuted` | `#7C6E74` | Texto tenue / etiquetas |
| `accent` | `#FF2E4C` | **Brasa carmesí** — acento principal |
| `accentBg` | `#2A0E15` | Fondo tinte carmesí |
| `accentMid` | `#FF6B54` | Carmesí→coral (degradado del fuego) |
| `teal` | `#4B9E82` | Verde jade (secundario) |
| `tealBg` | `#12261F` | Fondo tinte jade |
| `tealMid` | `#5CB898` | Jade claro |
| `amber` | `#C9962F` | **Oro** (moneda/logros) |
| `amberBg` | `#2A1C0A` | Fondo tinte oro |
| `amberMid` | `#FFCF6B` | **Oro brillante** — empanadas, nivel |
| `blue` | `#5C98DE` | Azul (datos/info) |
| `blueBg` | `#141F30` | Fondo tinte azul |
| `blueMid` | `#7BB3FF` | Azul claro |
| `navBg` | `#000000` | Fondo de la barra de navegación |
| `shadow` | `rgba(0,0,0,0.7)` | Sombra base |

**Nota:** el acento (`accent`/`accentMid`) es personalizable por el usuario (`appState.customColor`, `App.js:3285`); el default es la brasa `#FF2E4C`.

### Colores por modo de juego (de `MODOS`, `App.js:12692`)
Cada modo tiene su propio color + degradado oscuro:
| Modo | Color | Degradado |
|---|---|---|
| Simulacro | `#3DA873` (verde) | `linear-gradient(160deg, #0A2416, #123A22)` |
| Contrarreloj | `#EF4444` (rojo) | `linear-gradient(160deg, #2A0A0A, #3D1010)` |
| Supervivencia | `#8B5CF6` (morado) | `linear-gradient(160deg, #1A0F2E, #241448)` |
| La Ruleta | `#D4AF37` (oro) | `linear-gradient(160deg, #241A06, #3A2A0C)` |
| Duelo Flash | `#F97316` (naranja) | `linear-gradient(160deg, #2A1204, #3D1D08)` |

---

## 3. Tipografía

Cargadas en `public/index.html` (Google Fonts) y aplicadas en `globalStyles` (`App.js:12`):

- **Cuerpo / UI:** **Inter** — `html, body, input, textarea, button` → `'Inter', system-ui, sans-serif`. Pesos cargados: 400, 500, 600, 700, 800, 900.
- **Display / titulares:** **Space Grotesk** — clase `.serif` (peso **700**) y `.serif-light` (peso **400**), con fallback `Georgia, serif`. Pesos cargados: 400, 500, 600, 700.

**Firma tipográfica de la app:**
- Números **enormes** con degradado de fuego (la racha del fogón) — el elemento más característico.
- Etiquetas/eyebrows en **MAYÚSCULAS** con `letter-spacing` (≈1–1.5), tamaños 8.5–11px.
- Pesos fuertes: **800/900** para números y titulares; 600–700 para etiquetas; 500 para cuerpo.
- `font-variant-numeric: tabular-nums` para cifras alineadas (empanadas, puntajes).
- Tamaños típicos: titulares 18–24px, cuerpo 12.5–15px, micro-etiquetas 8.5–11px.

---

## 4. Radios, sombras y espaciado (valores recurrentes)

**Radios de borde** (px):
- Pastillas / "chips": `10`–`12`
- Tarjetas y botones: `12`–`16`
- Tarjetas grandes / héroes: `18`–`20`
- Hojas inferiores (bottom sheets): `26px 26px 0 0`
- Totalmente redondo (pills, badges): `99`
- Círculos (avatares, íconos): `50%`

**Sombras** (patrones que se repiten):
- Base del tema: `rgba(0,0,0,0.7)`
- Elevación de tarjeta: `0 8px 24px rgba(0,0,0,0.45)`
- Toast / flotantes: `0 8px 32px rgba(0,0,0,0.3)`
- Menús / modales: `0 16px 48px rgba(0,0,0,0.6)`
- **Glow de acento** (botones principales): `0 6px 20px {accent}50` — sombra tintada del color de acento (la "brasa" que ilumina).

**Espaciado**:
- Padding de pantalla: `18`–`20px`
- Padding de tarjeta: `13–15px` (compactas) · `18–20px` (grandes)
- Header: `10px 18px 8px`
- Gaps entre elementos: `8`–`12px`
- Barra de navegación: alto `70px`, blur `28px` (glassmorphism sobre negro)

---

## 5. Íconos — componente `PkIc` (`App.js:685`)

- SVG propio, `viewBox="0 0 24 24"`, `stroke-linecap/linejoin="round"`, grosor por defecto `1.7` (ajustable con `sw`).
- Set **relleno** (`FILLED_ICONS`, `App.js:682`): `ryo`, `flame`, `star`, `crystal`, `empanada`, `sombrero`. El resto va **a línea**.
- Si un nombre no está en `PkIc`, cae al componente `Ic` (`src/components/Icon.js`).
- Uso: `<PkIc n="empanada" s={20} c={C.amberMid} />`.

**Inventario de nombres (los que hay en `PkIc`):**
- **Navegación:** `home`, `msg`, `timer`, `book`, `settings`
- **Identidad colombiana (rellenos/firma):** `empanada`, `flame`, `sabio`, `mochila`, `sombrero`, `condor`, `tiple`, `maracas`, `pergamino`, `solandino`, `rana`
- **UI y temas:** `coffee`, `butterfly`, `wave`, `leaf`, `mountain`, `flower`, `swords`, `eye`, `scroll`, `frame`, `landscape`
- **Utilidades:** `bell`, `check`, `x`, `left`, `right`, `play`, `pause`, `refresh`, `icfes`, `people`, `target`, `snowflake`

*(Para la presentación reutilizaré estas mismas rutas SVG y la lógica relleno/línea — no dibujo íconos nuevos.)*

---

## 6. La voz de la app (español colombiano, tono de fogón)

### Frases del fogón (`FRASES_FOGON`, `App.js:12500`) — rotan cada 15s
1. "No deje morir el fogón, mijo"
2. "Échele leña o se le apaga, parce"
3. "Un tinto y a darle, que el fuego pide"
4. "Ni de fundas deje que se enfríe"
5. "Póngale la pila, avívele al fogoncito"
6. "Berraco el que mantiene la candela"
7. "Hágale, que el fuego no se cuida solo"
8. "Que no se le apague, no sea flojo"
9. "Estudie tantico y no deje morir la llama"
10. "El que estudia mantiene el fogón prendido"

Frase base cuando no hay racha: **"Prende el fogón hoy, hágale"** (`App.js:12806`).

### Saludos por hora/racha (`App.js:12625`)
- "¡Buenos días! Prende el fogón hoy."
- "Aún estás a tiempo de prender el fogón."
- "Prende una chispa antes de dormir, parce."
- "Ojo, que se te apaga el fogón esta noche."
- "¿Ya vas a sellar hoy o qué, berraco?"
- "¡Buenos días, berraco! El templo te espera."
- "¡Vas finísimo hoy, siga así!"
- "Templo sellado. Descanse tranquilo."
- "Buenas noches. No deje apagar el fuego."

### Modos de juego (`MODOS`)
- **Simulacro** — "ICFES completo"
- **Contrarreloj** — "90 segundos"
- **Supervivencia** — "3 vidas"
- **La Ruleta** — "x2 a x32"
- **Duelo Flash** — "vs rival · 3min"

### El Combo (ranking social, `App.js:12860`)
- "Vas #1 en El Combo"
- "Vas #N en El Combo · quítale el #N-1"
- "El Combo te espera"

### El Bazar (economía)
- Moneda: **empanadas**.
- Rarezas (`RAR_BY_CHEST`, `App.js:11287`): común · poco común · raro · épico · legendario · mítico.
- Cofres: madera · bronce · plata · oro · tumbaga · ancestral.
- Secciones: **Mercado del Día** (mosaico que rota cada 24h) · **Mercado Misterioso** (cartas selladas, −25%).
- Combos: "El Combo Anti-Bajón" (Cofre de Bronce + Kodachi + Escudo de Arepa) · "El Combo del Legendario" (Cofre de Tumbaga + Escudo + Pergamino).
- Recargas de dinero real: **El Antojo · La Fritanga · El Patrón** · suscripción **Simu Pro**.

### Conceptos/metáforas de marca
- **El Templo** = la app (tu espacio de estudio).
- **El fogón / la llama / la candela** = la racha diaria.
- **Sellar** = cumplir el día de estudio.
- **El Combo** = tu grupo/ranking de amigos.
- Voz: cercana, paisa/colombiana — "mijo", "parce", "berraco", "hágale", "póngale la pila".

---

## 7. Cómo se traduce esto a la presentación
- Fondo **negro total** (`#000000`) con estrellas sutiles; nunca claro.
- Acento **brasa `#FF2E4C`** + oro `#FFCF6B` para cifras/logros.
- Titulares en **Space Grotesk**, cuerpo en **Inter**; números gigantes con degradado de fuego.
- Íconos **solo** de `PkIc` (rutas reales reutilizadas).
- Copia con la **voz de fogón** ("hágale", "no deje morir el fogón").
- Que cada diapositiva se sienta **una pantalla más de Simu**, no una plantilla.
