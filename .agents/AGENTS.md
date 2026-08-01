# ACCET Project Global Agent Rules

These rules apply universally to all agents operating within the `Agentic_Framework` repository.

## 1. Versioning & Git Protocol
- **Strict Branching**: NEVER commit directly to `main` or a production branch unless explicitly told to do so. Always create a versioned feature or test branch (e.g., `v1.0.7-test.1`).
- **User Consent**: Do not push or pull code to/from the remote repository without first asking the user for permission. Wait for explicit "ok proceed" before executing `git push`.
- **Commit Messages**: Use Conventional Commits formatting (e.g., `feat:`, `fix:`, `style:`, `refactor:`).

## 2. Structural Organization
- Maintain a highly organized directory structure. Place components in their logical domains (e.g., `dashboard/`, `auth/`).
- Document complex logic explicitly in markdown before writing the code.
- Always review existing styling patterns (e.g., the `branding` skill) before creating new UI components.
