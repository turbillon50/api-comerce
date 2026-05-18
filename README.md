# APICommerce — PWA SaaS for AI token reselling

PWA de primer nivel para construir una empresa SaaS que **revende tokens de IA**
empaquetados como **blends multi-proveedor** (mezclas dedicadas) con margen,
telemetría en vivo y un **agente residente con memoria persistente** que opera
el negocio.

## Estructura del repo

```
api-comerce/
├── api/                      # Diseños de origen exportados desde Google Stitch
│                             # (visual reference only — excluido del deploy via .vercelignore)
├── public/                   # Manifest PWA, service worker, iconos
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx                  Landing manifiesto
│   │   ├── auth/{login,register}/    Registro / sign-in
│   │   ├── dashboard/                Consola de operación
│   │   │   ├── blends/{,new}/        Marketplace + builder de blends
│   │   │   ├── keys/                 Gestión de API keys
│   │   │   ├── requests/             Panel de requests en vivo
│   │   │   ├── wallet/               Wallet & governance
│   │   │   ├── providers/            Conexión a OpenRouter & catálogo
│   │   │   ├── agent/                Prism — agente con memoria
│   │   │   └── docs/                 Referencia de API + snippets
│   │   └── api/                      Edge routes (proxy a OpenRouter, agente)
│   ├── components/{ui,landing,dashboard}/
│   ├── lib/                  # tipos, catálogo, seed, cliente OpenRouter
│   └── store/                # Zustand + localStorage (auth, blends, wallet…)
├── package.json, tsconfig.json, next.config.mjs, tailwind.config.ts, postcss.config.mjs
└── vercel.json               # framework: nextjs
```

## Stack

- **Next.js 15** App Router + React 19 + TypeScript
- **Tailwind CSS** con design tokens del sistema *Obsidian Prism* (Stitch)
- **Zustand** con `persist` en `localStorage`
- **PWA**: `manifest.webmanifest` + service worker con app-shell + SWR
- **OpenRouter** vía Edge routes en `/api/openrouter/*` y `/api/blend/run` —
  con fallback determinista si no hay `OPENROUTER_API_KEY`

## Cómo correrlo

```bash
cp .env.example .env.local        # opcional: pega tu OPENROUTER_API_KEY
npm install
npm run dev                       # http://localhost:3000
```

Deploy a Vercel: el proyecto está conectado al repo y `vercel.json` declara
`framework: "nextjs"`. La carpeta `api/` con los diseños Stitch queda excluida
del deploy mediante `.vercelignore`.

## Features clave

| Feature | Dónde vive |
|---|---|
| Landing manifiesto + pricing | `src/app/page.tsx` + `src/components/landing/*` |
| Registro / login con persistencia | `src/app/auth/*` |
| Dashboard con telemetría agregada | `src/app/dashboard/page.tsx` |
| **Marketplace de Blends** | `src/app/dashboard/blends/page.tsx` |
| **Builder de Blends** con peso por modelo, rol primary/validator/fallback, cálculo automático de costo base y margen | `src/app/dashboard/blends/new/page.tsx` |
| API Keys por blend con presupuesto mensual | `src/app/dashboard/keys/page.tsx` |
| Panel de Requests live + filtros | `src/app/dashboard/requests/page.tsx` |
| Wallet (top-ups, gasto, marketplace revenue, governance) | `src/app/dashboard/wallet/page.tsx` |
| Conexión a OpenRouter + catálogo curado | `src/app/dashboard/providers/page.tsx` |
| **Agente Prism con memoria persistente** | `src/app/dashboard/agent/page.tsx` |
| Documentación OpenAI-compatible con snippets | `src/app/dashboard/docs/page.tsx` |
