export const exampleMarkdownPitch = `
# Propuesta de Valor: ACCET (Proyecto Piloto 001)

ACCET es la primera plataforma de factoraje (factoring) impulsada por tecnología Web3 y enfocada en democratizar el acceso al capital. 

Mediante el uso de **Billeteras Keyless** y la **Filecoin Virtual Machine (FVM)**, tokenizamos facturas reales de empresas sólidas, permitiendo a cualquier inversor fondear estas facturas desde **$100 USDC**.

## 🚀 La Hoja de Ruta (Roadmap)

A continuación, la ruta de ejecución de nuestros 5 Ejes Fundamentales (Tecnológico, Legal, Financiero, Comercial, Operativo).

\`\`\`mermaid
gantt
    title Roadmap de ACCET (SSOT)
    dateFormat  YYYY-MM
    axisFormat  %Y-%m
    
    section Tecnológico
    MVP Dashboard Inversor (Completado)     :done,    des1, 2026-07, 2026-08
    Integración FVM y Smart Contracts        :active,  des2, 2026-08, 2026-10
    Graphiti y MCP Agents                    :         des3, 2026-10, 2026-12
    
    section Legal & AML
    Constitución de SPV (Venezuela)          :done,    leg1, 2026-04, 2026-06
    Contrato RBF Auditado                    :done,    leg2, 2026-06, 2026-07
    Validación KYC Didit API                 :active,  leg3, 2026-08, 2026-09
    
    section Financiero
    Ronda Pre-Semilla RBF ($100k)            :active,  fin1, 2026-07, 2026-09
    Apertura a Minoristas ($100)             :         fin2, 2026-09, 2026-11
\`\`\`

## 💰 Modelo RBF (Revenue-Based Financing)

En nuestra ronda Pre-Semilla, los inversionistas participan bajo un modelo de financiamiento basado en ingresos:
* **Ticket Mínimo:** $100 USDC
* **Retorno Esperado (Cap):** 2.5x
* **Distribución:** El 5% de los ingresos brutos de la plataforma se destina mensualmente a repagar a los inversores del RBF.

> Todo operado por Smart Contracts (ERC-3643) para asegurar cumplimiento legal y transparencia on-chain.
`;
