Understand context.md and also be aware if any history.md file is opresent to complement context

# Strict Workflow Rules
1. **Local Validation First:** DO NOT make updates to the active `accet-app` repository until the changes have been fully implemented, tested, and explicitly validated by the user in the local development environment (e.g., within the `Agentic_Framework` scaffold or test branches).
2. **Explicit GitHub Pushes:** DO NOT push code to GitHub (or any remote repository) before the user has explicitly validated the changes and granted explicit permission to push.

# Design & Methodology Rules (Divergencia 0)
Any agent operating in this framework MUST rigorously follow our "Chiaroscuro & Netflix" methodology. You MUST read the following manuals before writing any UI/UX code:
- **`ACCET_Design_Manual.md`**: The master branding guide (Avalanche Dark Blue, Syne/DM Sans fonts, strict 12px border radii, no heavy shadows, no green).
- **`Dark_Mode_Components_Guide.md`**: The hyper-detailed reference for Dark Sections (Netflix effect gradients, bg-black/20 inputs, Sky Blue glow states, pill-shaped gradients).
- NEVER use generic bootstrap styles, pure black (`#000000`), or legacy classes like `.glass-platinum`. Always enforce the pixel-perfect ACCET brand identity.