## elysia-kickstart

Feature packed ElysiaJS boilerplate. Edge ready. Deploy with one click.

Taken inspiration from https://github.com/ethanniser/the-beth-stack.

## 📚 Features

### Core

- 🏗️ [**TypeScript**](https://www.typescriptlang.org/) - Configured to maximize type safety
- 🐉 [**ElysiaJS**](https://elysiajs.com/) - Fast and Bun friendly server framework
- 💽 [**Drizzle**](https://orm.drizzle.team/) - ORM with maximal type safety
- 🔒 [**Lucia**](https://lucia-auth.com/) - Flexible and secure authentication
  - 🔗 integrates with Drizzle to store auth data

### Development

- 📏 [**ESLint**](https://eslint.org/) - Consistent code standards
- ✨ [**Prettier**](https://prettier.io/) - Consistent code styling
- 💻 [**VS Code configurations**](https://code.visualstudio.com/) - Configurations for extensions

## 🌱 Getting started

🚀 **Option 1: Clone and deploy**

- To Railway (deployed with Docker)

  [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/UguE-M?referralCode=Q9UMnd)

- To Vercel Edge Functions (see the [Railway template](https://railway.app/template/UguE-M?referralCode=Q9UMnd) for required environment variables, as well as `RUNTIME=edge`)

  [![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2FSyhner%2Felysia-kickstart)

📋 **Option 2: Clone and run locally**

1. [Fork this repository](https://github.com/syhner/elysia-kickstart/fork) (uncheck 'Copy the `main` branch only` if you are interested in other branches / feature sets)
2. Clone your new repository
3. Install dependencies and run the development server

- with [bun](https://bun.sh/docs/installation)

  ```sh
  bun install
  bun run dev
  ```

## ⚙️ Configuration

### [Drizzle](https://orm.drizzle.team/)

- [`src/db/`](src/db/)
- [`src/lib/db.ts`](src/lib/db.ts)
- [`drizzle.config.ts`](drizzle.config.ts)

### [ESLint](https://eslint.org/)

- [`.eslintrc.json`](.eslintrc.json)

### [Lucia](https://lucia-auth.com/)

- [`src/app/api/auth/index.ts`](src/app/api/auth/index.ts)
- [`src/db/schemas.ts`](src/db/schemas/auth.ts) — store auth data (users, accounts, sessions, verification tokens) in database
- [`src/lib/auth.ts`](src/lib/auth.ts)

### [Prettier](https://prettier.io/)

- [`.eslintrc.json`](.eslintrc.json)
- [`.prettierignore`](.prettierignore)
- [`.prettierrc.json`](.prettierrc.json)

### [Tailwind CSS](https://tailwindcss.com/)

- [`src/styles/globals.css`](src/styles/globals.css)
- [`tailwind.config.js`](tailwind.config.js)

### [TypeScript](https://www.typescriptlang.org/)

- [`tsconfig.json`](tsconfig.json) - configured for maximum type-safety
- [`types/reset.d.ts`](types/reset.d.ts) - using [ts-reset](https://github.com/total-typescript/ts-reset) to increase type-safety

### [Vercel Edge Functions](https://vercel.com/features/edge-functions)

- [`api/index.tsx`](api/index.tsx)
- [`scripts/transform-paths.ts`](scripts/transform-paths.ts) - transforms all relative imports to absolute imports inside the src/ directory
- [`vercel.json`](vercel.json)

### [VS Code](https://code.visualstudio.com/)

- [`.vscode/extensions.json`](.vscode/extensions.json) - recommended workspace extensions
