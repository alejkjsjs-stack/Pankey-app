# CONTEXTO COMPLETO — App "Simu" (para pegar en ChatGPT)

> **Cómo usar este documento:** cópialo y pégalo completo en ChatGPT al inicio de la conversación.
> Resume **todo** lo que es la app, cómo está hecha, qué funciona y qué falta, para que ChatGPT
> pueda ayudarte sin más contexto.
> **No contiene llaves, contraseñas, secretos ni datos personales** — es seguro compartirlo.

---

## 0. Prompt sugerido para ChatGPT
"Eres mi asesor técnico y de producto para lanzar al mercado una app educativa colombiana llamada **Simu**.
Abajo está todo el contexto. Ayúdame a priorizar y ejecutar lo que falta para lanzarla en Google Play:
pagos, suscripción premium, seguridad, estabilidad, legal, publicación y marketing. Hazme preguntas si
te falta algo y propón pasos concretos."

---

## 1. Qué es Simu (resumen)
**Simu** es una **PWA (app web instalable) gamificada para preparar el examen ICFES Saber 11 de Colombia.**
Convierte el estudio en un juego con una racha diaria ("el fogón"), economía virtual (empanadas),
simulacros generados por IA, ranking social y un tono colombiano cercano. Está **en vivo** en:
**https://simu-icfes.vercel.app**

- **Público:** estudiantes de educación media en Colombia (grados 10–11). **Muchos son menores de edad** → esto tiene implicaciones legales de datos.
- **Propuesta de valor:** estudiar para el ICFES de forma divertida, constante y gratuita, con preguntas ilimitadas hechas por IA y refuerzo de los puntos débiles.
- **Modelo:** freemium (gratis + compras de empanadas + suscripción "Simu Pro").

---

## 2. Stack tecnológico
- **Frontend:** React 19 (Create React App). Casi todo el código vive en **un solo archivo `src/App.js` (~18.500 líneas)**, con estilos CSS-in-JS (inline) + un archivo `src/simu-ascua.css`. Íconos propios en un componente SVG llamado **`PkIc`** (sin librerías de íconos, **sin emojis** en el producto).
- **Backend (BaaS):** **Firebase** (proyecto `leemos-a-v`):
  - **Authentication** → Google Sign-In (`signInWithPopup`).
  - **Realtime Database** → datos en vivo.
  - **No hay servidor/backend propio: todo corre en el cliente.**
- **Inteligencia Artificial:** **Google Gemini** (modelo `gemini-3.1-flash-lite`) llamado **desde el cliente** para generar simulacros ICFES ilimitados y nuevos. Si la IA falla, usa un **banco local de preguntas de emergencia**.
- **Audio:** Web Audio API — efectos de sonido sintetizados + un **motor de ambiente generativo** (fondo musical infinito que nunca se repite).
- **PWA:** `manifest.json` (instalable, pantalla completa). *Ojo: no registra Service Worker → no hay caché offline real todavía.*
- **Hosting/Deploy:** **Vercel** (URL `simu-icfes.vercel.app`), deploy por Vercel CLI + GitHub Action. Repo en GitHub.

---

## 3. Arquitectura y flujo de datos (real)
1. El estudiante abre la PWA → **entra con Google** (Firebase Auth) → se crea/identifica su usuario.
2. Su progreso vive en la **Realtime Database** en tiempo real (`onValue`):
   - `users/{code}` → perfil, racha, empanadas, XP, logros, historial de simulacros, cosméticos.
   - ranking "**El Combo**" (liga social), `friendRequests` (amigos).
   - `duels` / `duelRooms` → duelos 1v1 en vivo.
   - `presence` → quién está en línea (con `onDisconnect`).
   - `sessions` → co-lectura con la pareja ("parcero").
3. Cada simulacro pide preguntas **al vuelo a Gemini** (desde el cliente); si falla, usa el banco local.

---

## 4. Funcionalidades (todo lo que ya tiene)
- **El Fogón (racha diaria):** animaciones de fuego, frases colombianas rotativas, "sellar" el día de estudio para no perder la racha.
- **5 modos de juego:**
  - **Simulacro** (ICFES completo), **Contrarreloj** (90 s), **Supervivencia** (3 vidas), **La Ruleta** (apuesta x2–x32), **Duelo Flash** (1v1 en vivo contra otro usuario).
- **Economía — empanadas (moneda virtual):**
  - **El Bazar** (tienda de cosméticos): marcos, banners, fondos, títulos, **cofres** (rarezas: común → poco común → raro → épico → legendario → mítico), **poderes/amuletos**, **Mercado del Día**, **Mercado Misterioso** (−25 %), **Ruleta del Páramo** (un tiro gratis al día).
  - **Recargas con dinero real** (packs): *El Antojo* $4.900 · *La Fritanga* $12.900 · *El Patrón* $35.000 (COP).
- **El Combo (social):** ranking/liga, amigos, duelos, presencia en vivo, retos por WhatsApp.
- **Libros / Pergaminos:** seguimiento de lectura, **co-lectura con la pareja** en vivo, ritual del "Cafetal" (enfoque/pomodoro).
- **Hábitos / Rutinas:** "planticas" que crecen con la constancia.
- **ICFES "Centro del Sabio" (hub premium):** ADN/perfil del estudiante, Plan de Batalla, **Sensei** (tutor con IA), Banco, Diagnóstico, Reporte semanal, Estudio en Vivo.
- **Simu Pro (suscripción):** energía ilimitada, **repaso inteligente** (simulacros hechos con tus puntos débiles), cofre diario doble, fuego de color exclusivo. Precio definido: **$9.900 COP/mes · $79.900/año**.
- **Audio** ambiental generativo + efectos. **Responsive:** marco de dispositivo en PC, pantalla completa en celular.

---

## 5. Identidad de marca ("Ascua")
- **Concepto:** la brasa que no se apaga; disciplina + alma colombiana (tinto, El Dorado, "hágale, berraco").
- **Paleta:** negro total `#000000` · **brasa carmesí `#FF2E4C`** · **oro `#FFCF6B`** · jade `#4B9E82` · texto `#F6F1F2`.
- **Tipografía:** **Inter** (cuerpo/UI) + **Space Grotesk** (titulares). Números gigantes con degradado de fuego = firma.
- **Voz:** español colombiano, cercano ("mijo", "parce", "berraco", "no deje morir el fogón").
- **Nombre:** la app se llama **Simu** (antes "Pankey"; ya migrada).

---

## 6. Estado actual — qué funciona y qué no
**✅ Funciona hoy (en vivo):**
- Gameplay central, los 5 modos, el fogón, el Bazar, El Combo, Libros, Hábitos.
- Login con Google + base de datos en vivo (Firebase).
- Generación de simulacros con Gemini (+ banco de respaldo).
- Audio (efectos + ambiente generativo), diseño responsive.
- Marca Simu, textos legales (borrador) y privacidad (ya sin datos personales sensibles).

**🟡 En beta / incompleto / riesgos:**
- **Pagos:** "Simu Pro" está **gratis en beta**; **no hay cobro real**. La integración de pagos (Wompi) **no está construida** (falta un backend seguro).
- **Falta "Eliminar mi cuenta"** (lo exige la ley de datos y Google Play).
- **Seguridad de la base de datos:** las **reglas de la Realtime Database no están auditadas** (si están abiertas, cualquiera podría leer/escribir datos de todos). **Falta Firebase App Check.**
- **La llave de la IA (Gemini) va en el código del cliente** (visible al inspeccionar). Firebase de producción se usa también en desarrollo.
- **Sin analítica, sin monitoreo de errores (crash reporting), sin Service Worker** (la PWA es instalable solo por el manifest).
- **Mantenibilidad:** todo en un archivo de ~18k líneas → difícil de escalar/mantener.
- **Legal:** falta revisión de un abogado y el tratamiento especial de **menores de edad**.

---

## 7. Lo que FALTA para lanzar (roadmap)
1. **Pagos y suscripción (Wompi):** backend serverless que cree el pago con firma de integridad, reciba el *webhook* y **entregue Pro/empanadas desde el servidor** (nunca desde el cliente). Cobro mensual recurrente (tarjeta tokenizada). Requiere cuenta de comercio Wompi + empresa/RUT.
2. **Funciones premium mejores:** que Simu Pro valga la pena (más beneficios/contenido exclusivo, claridad de valor).
3. **Seguridad:** auditar y **cerrar las reglas de Firebase por usuario**; activar **App Check**; **mover la llamada a Gemini a un backend** para no exponer la llave; límites de uso (rate limiting); anti-trampa en la economía.
4. **Estabilidad / base de datos:** estructura e índices para que escale; manejo de errores (ErrorBoundary); caché offline (Service Worker); rendimiento (ya se optimizaron re-renders y audio).
5. **Legal:** finalizar T&C y Privacidad + **revisión de abogado**; **tratamiento de datos de menores** (Ley 1581/2012 y Decreto 1377/2013, consentimiento del acudiente).
6. **Publicación en Google Play:** empaquetar la PWA (**TWA con Bubblewrap** o **Capacitor**), listing (nombre, descripción, screenshots, ícono), **clasificación por edad (IARC)**, **política de privacidad pública** (URL), **sección "Seguridad de los datos"** (Data safety).
7. **Marketing / viralidad:** cuenta de **Instagram y TikTok**, estrategia de contenido, campañas, embajadores en colegios, aprovechar el sistema de compartir por WhatsApp que ya existe.

---

## 8. Restricciones y datos clave (para que ChatGPT no se pierda)
- App de **un solo archivo** `App.js` (~18k líneas), React (CRA), **100 % cliente** (sin backend propio todavía).
- **Firebase** proyecto `leemos-a-v` (Auth Google + Realtime Database). Hosting en **Vercel**.
- **IA:** Gemini `gemini-3.1-flash-lite` desde el cliente.
- **País:** Colombia (examen ICFES Saber 11, pesos COP, cultura/voz paisa).
- **Público con muchos menores de edad** → cuidado legal con datos.
- **Marca Ascua** (negro/carmesí/oro, Inter + Space Grotesk, íconos PkIc, sin emojis).
- **Monetización:** freemium — gratis + packs de empanadas + suscripción Simu Pro ($9.900/mes).

---

## 9. En qué necesitamos ayuda (pídele esto a ChatGPT)
- Arquitectura concreta de **pagos con Wompi** (backend + webhook + suscripción recurrente) paso a paso.
- Diseño de **reglas de seguridad de Firebase Realtime Database** por usuario + activar App Check.
- **Estrategia de monetización y de funciones premium** que de verdad convenzan.
- **Plan de publicación en Google Play** (empaquetado, requisitos, Data safety, clasificación).
- **Estabilidad y escalabilidad** (estructura de datos, offline, errores).
- **Marketing y viralidad**: Instagram/TikTok, contenido, campañas, crecimiento en colegios.
- Mejoras de **modos de juego y diseño/UX**.
