import os

with open("prisma/schema.prisma") as f:
    content = f.read()

# Replace generator
content = content.replace('provider = "prisma-client-js"', 'provider = "prisma-client-js"\n  previewFeatures = ["multiSchema"]')

# Replace datasource
content = content.replace('url      = env("DATABASE_URL")', 'url      = env("DATABASE_URL")\n  schemas  = ["public", "auth"]')

# Fix FnvcTranche project relation
content = content.replace(
    "  id           String   @id @default(uuid())\n  projectId    String\n  indicatorId  String",
    "  id           String   @id @default(uuid())\n  projectId    String\n  project      Project  @relation(fields: [projectId], references: [id])\n  indicatorId  String"
)

# Add @@schema("public") to each model
new_lines = []
in_model = False
for line in content.splitlines():
    if line.startswith("model ") or line.startswith("enum "):
        in_model = True
    elif in_model and line.startswith("}"):
        new_lines.append('  @@schema("public")')
        in_model = False
    new_lines.append(line)

with open("prisma/schema.prisma", "w") as f:
    f.write("\n".join(new_lines))
