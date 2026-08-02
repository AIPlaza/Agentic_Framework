# 🎨 ACCET BRANDING & UI/UX PROMPT ENGINEERING GUIDE

**Documento Maestro de Instrucciones de Diseño y Marca para Agentes IA**

> **INSTRUCCIÓN SISTÉMICA PARA EL AGENTE:**
> Lee este documento íntegramente antes de generar código HTML/CSS, crear presentaciones, diseñar PDFs o realizar modificaciones visuales en el ecosistema ACCET (Pitch Decks, One-Pagers, Aplicaciones Web). El incumplimiento de estas directrices resulta en una violación directa de los estándares de "Divergencia 0" exigidos por el usuario.

---

## 1. IDENTIDAD Y TONO VISUAL
- **Tono General:** Institucional, Premium, Moderno, Financiero y de Confianza.
- **Evitar:** Diseños caricaturescos, plantillas genéricas (bootstrap por defecto), sombras densas que ensucien el layout y la presencia de colores ajenos a la marca.

## 2. PALETA DE COLORES ESTRICTA (CERO VERDE)
> [!CAUTION]
> **REGLA DE ORO:** El color Verde (ej. `#0e7c5a` o similares) está **ESTRICTAMENTE PROHIBIDO** en cualquier documento o interfaz orientada a inversores.

- **Fondo Principal / Acentos Oscuros (Avalanche Dark Blue):** `#1A1A2E` 
  - *Uso:* Footer, Hero Banners (con degradado), textos principales fuertes (h1), bordes de alto contraste.
- **Color Principal de Resalte (Sky Blue):** `#5EC8F2`
  - *Uso:* Viñetas de listas (`•`), subtítulos (`h2`, `h3`), divisores finos (`hr`), bordes sutiles y textos clave a destacar.
- **Fondos Tenues y Tarjetas (Light Blue):** `#F0F9FF` o `#E5F6FD`
  - *Uso:* Fondos de tarjetas tipo *glassmorphism* o bloques de información para diferenciarlos del blanco puro sin ensuciar la vista.
- **Texto del Cuerpo:** `#333333` (No usar negro puro `#000000` para reducir fatiga visual).
- **Textos Secundarios / Muted:** `#595959` o `#A9AEC6`.

## 3. TIPOGRAFÍA CORPORATIVA
Se requiere la importación directa de **Google Fonts** en todos los motores web:
`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400..700;1,400..700&family=Syne:wght@400..700&display=swap');`

- **Familia Primaria (Títulos y Números Grandes):** `Syne`
  - *Comportamiento:* Fuente simétrica y extendida.
  - *Restricción de Peso:* **NO USAR** `font-weight: 800` o superior, ya que deforma y estira los números excesivamente. Mantener el peso entre `600` y `700`.
- **Familia Secundaria (Cuerpo de texto, Listas, Descripciones):** `DM Sans`
  - *Comportamiento:* Altamente legible. Peso normal `400` y negritas en `700`.

## 4. EFECTOS VISUALES Y UI (EL "EFECTO NETFLIX")

### 4.1. Banners y Encabezados (Efecto Netflix)
Ningún Hero Banner debe ser de un color sólido aburrido. Debe poseer un "Efecto Netflix":
- **Estructura:** Imagen de fondo fotográfica real (relacionada con inmuebles, activos, oficinas) oscurecida por un degradado.
- **Código CSS Obligatorio (Base):**
  ```css
  background-image: 
      linear-gradient(135deg, rgba(26,26,46,1) 0%, rgba(26,26,46,0.85) 50%, rgba(26,26,46,0.6) 100%),
      url('ruta_a_la_imagen_o_base64');
  background-size: cover;
  background-position: center;
  ```
- *Razón:* Garantiza que el logo blanco y el texto superpuesto contrasten impecablemente, manteniendo la riqueza visual de una imagen real.

### 4.2. Tarjetas y Glassmorphism
- **Bordes:** Todos los contenedores tipo tarjeta (`.card`, paneles de proyecciones) deben ser suavizados: `border-radius: 12px;`.
- **Trazo / Borde:** Extremadamente fino, usando el Sky Blue con baja opacidad: `border: 1px solid rgba(94, 200, 242, 0.2);`.
- **Sombras (Drop Shadows):**
  > [!WARNING]
  > Los motores de renderizado PDF (como Chromium) exageran las sombras oscuras. **NO USAR** sombras mayores al 5% de opacidad.
  - *Correcto:* `box-shadow: 0 2px 4px rgba(0,0,0,0.03);`
  - *Incorrecto:* `box-shadow: 0 4px 15px rgba(0,0,0,0.2);` (Produce un cuadro negro tosco y barato).

## 5. LOGOTIPOS Y MARCA DE AGUA
- **Banners Oscuros:** Usar siempre el logo blanco (`logo-v1-white.png`).
- **Fondos Claros:** Usar el logo oscuro (`logo-v1-dark.png`).
- **Marca de Agua (Watermark):** 
  - Todo documento PDF renderizado desde HTML debe incluir el logo atenuado (`logo-v1-watermark.png`) fijo y centrado en la página:
    ```css
    .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 500px; opacity: 0.03; z-index: -1; pointer-events: none; }
    ```

## 6. PREVENCIÓN DE BUGS (PLAYWRIGHT & PDF RENDER)
- **Bloqueo de Imágenes (Fondo Magenta):** Chromium bloquea frecuentemente llamadas locales (`file://...`) para imágenes de fondo o logos en métodos como `set_content()`. Esto corrompe el canal alfa y quema los gradientes (ej. renderizando magentas/rosados).
  - *Solución Definitiva:* **SIEMPRE** convertir las imágenes (logos, marcas de agua, y fondos del Efecto Netflix) a **Base64** (`data:image/png;base64,...`) antes de inyectarlas en la plantilla HTML para garantizar que el PDF se construya correctamente sin tiempos de espera.
- **Timeouts de Red:** Evitar configurar motores headless con `wait_until="networkidle"` cuando se cargan scripts o fuentes de terceros que puedan quedarse colgados. Usar `wait_until="load"` acompañado de un `wait_for_timeout()` prudencial (ej. `3000ms`) para asegurar que Google Fonts cargue la tipografía `Syne` antes de "imprimir".
