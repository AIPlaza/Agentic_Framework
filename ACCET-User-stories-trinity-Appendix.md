# Apéndice Histórico: Evolución Arquitectónica del "Genesis Context"
*Documento suplementario al `ACCET-User-stories-trinity.docx`*

**Fecha de Evolución:** Agosto 2026
**Decisión Estratégica:** Transición de "MkDocs Externo" a "Motor Nativo MDX"

## Contexto Original
En las sesiones fundacionales documentadas en el *User Stories Trinity*, se propuso la utilización de **MkDocs Material** junto con extensiones **Mermaid.js** y la generación del estándar **`llms.txt`** para crear un "Dashboard Revista". El objetivo era tener una documentación dinámica que sirviera como Fuente Única de Verdad (SSOT) para el inversionista y fuera fácilmente consumible por Agentes de IA mediante el protocolo MCP.

## Divergencia y Corrección
Al momento de la implementación, se evaluó que levantar un repositorio separado de MkDocs creaba las siguientes fricciones:
1. **Ruptura de la Experiencia Visual:** Los temas estándar de MkDocs no soportan nativamente las directrices de diseño cinemático *Chiaroscuro* (Deep Dark Mode, Glassmorphism, Syne/Inter) definidas en los manuales de ACCET.
2. **Desconexión del Estado:** Separar la documentación del Dashboard impide integrar fluidamente interacciones complejas como la validación KYC (Didit API), el estado de la billetera Keyless (Base) y la firma de contratos RBF dentro de la misma vista del proyecto.

## Resolución Arquitectónica (La Vía Nativa)
Se decidió pivotar hacia la **Vía Nativa**. Se mantienen los principios inmutables del *Genesis Context* (Markdown como SSOT, renderizado de líneas de tiempo con Mermaid y el endpoint `llms.txt`), pero se implementan directamente dentro de la aplicación principal de Next.js.

### Impacto en las Épicas:
- **Épica 1 (La Vitrina - Dashboard Revista):** Ahora se renderiza utilizando `react-markdown` y un componente envoltorio de `mermaid.js` directamente en el enrutador de Next.js.
- **Épica 4 (Inteligencia del Ecosistema):** El archivo `llms.txt` se genera dinámicamente mediante un *API Route* nativo de Next.js que concatena el contenido Markdown de los proyectos, eliminando la necesidad de procesos de compilación externos.

Esta evolución asegura que ACCET mantenga una UI de clase mundial (minimalismo animado con GSAP en los menús de navegación), al mismo tiempo que cimenta su estatus como una plataforma *AI-First*.
