# ACCET PRD v2: Vista Inversionista & Arquitectura Nativa "Dashboard Revista"

*Este documento actualiza el PRD original para reflejar el pivote arquitectónico hacia un motor nativo de "Content as Code" dentro de Next.js, abandonando la dependencia externa de MkDocs.*

## 1. Visión Estratégica
El módulo del Inversionista en ACCET debe ofrecer una experiencia cinemática (Dark Mode / Chiaroscuro) sin interrupciones. La narrativa del proyecto (Propuesta de Valor, Hoja de Ruta, Métricas) no residirá en un sitio estático externo (MkDocs), sino que será procesada y renderizada nativamente dentro del Dashboard del Inversionista.

## 2. El "Dashboard Revista" Nativo (Módulo C)
### 2.1. Renderizado MDX & Mermaid
- **Fuente Única de Verdad (SSOT):** Los administradores cargarán la información del proyecto en archivos Markdown estándar.
- **Renderizado Dinámico:** Next.js utilizará `react-markdown` y `remark-gfm` para presentar estos textos aplicando la paleta corporativa y tipografías (Syne/Inter).
- **Líneas de Tiempo Dinámicas:** Los bloques de código `mermaid` se renderizarán en vivo en el cliente como diagramas de flujo y hojas de ruta.

### 2.2. Ecosistema AI-First (`llms.txt`)
- Se implementará un *Route Handler* nativo (`/llms.txt`) que compilará el Markdown del proyecto activo, permitiendo a cualquier Agente (MCP o LLM externo) absorber el modelo de negocio instantáneamente en un solo prompt.

## 3. Experiencia UI/UX del Inversionista
- **Menú Lateral (Sidebar) Animado:** La navegación del inversionista se trasladará de la barra superior a un menú lateral persistente, utilizando **GSAP** para transiciones fluidas, *staggers* al cargar los ítems y micro-animaciones sofisticadas al hacer hover, garantizando un minimalismo sofisticado.
- **Rutas Principales:**
  1. `/investor/dashboard`: Panel financiero y transaccional.
  2. `/investor/roadmap`: La vista dinámica de MDX/Mermaid.
  3. `/investor/p2p`: Mercado secundario.

## 4. Requisitos Técnicos
- **Frontend:** Next.js 16 (Turbopack), Tailwind CSS, React Markdown, Mermaid.js, GSAP.
- **Infraestructura (Futura):** Los archivos Markdown podrán ser exportados a IPFS y sus CIDs resguardados mediante Smart Contracts en Filecoin Virtual Machine (FVM).
