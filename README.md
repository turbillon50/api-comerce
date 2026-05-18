# APICommerce — PWA SaaS for AI token reselling

PWA de primer nivel para construir una empresa SaaS que **revende tokens de IA**
empaquetados como **blends multi-proveedor** (mezclas dedicadas) con margen,
telemetría en vivo y un **agente residente con memoria persistente** que opera
el negocio.

## Estructura del repo

```
api-comerce/
├── api/                      # Diseños de origen exportados desde Google Stitch
│                             # (NO se editan — son la referencia visual)
└── app/                      # La PWA Next.js 15 (este es el proyecto a desplegar)
    ├── src/
    │   ├── app/              # App Router
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
    │   ├── lib/                # tipos, catálogo, seed, cliente OpenRouter
    │   └── store/              # Zustand + localStorage (auth, blends, wallet…)
    └── public/                 # manifest.webmanifest, sw.js, iconos
```

## Stack

- **Next.js 15** App Router + React 19 + TypeScript
- **Tailwind CSS** con design tokens del sistema *Obsidian Prism* (Stitch)
- **Zustand** con `persist` en `localStorage` (toda la "BD" en cliente, con
  ganchos para enchufar Drizzle/Postgres después)
- **PWA**: `manifest.webmanifest` + service worker (`sw.js`) con app-shell +
  stale-while-revalidate
- **OpenRouter** vía Edge routes en `/api/openrouter/*` y `/api/blend/run` —
  con fallback determinista si no hay `OPENROUTER_API_KEY`

## Cómo correrlo

```bash
cd app
cp .env.example .env.local        # opcional: pega tu OPENROUTER_API_KEY
npm install
npm run dev                       # http://localhost:3000
```

Deploy a Vercel: apunta el "Root Directory" a `app/`.

## Features clave

| Feature | Dónde vive |
|---|---|
| Landing manifiesto + pricing | `src/app/page.tsx` + `components/landing/*` |
| Registro / login con persistencia | `src/app/auth/*` |
| Dashboard con telemetría agregada | `src/app/dashboard/page.tsx` |
| **Marketplace de Blends** (mezclas multi-proveedor) | `src/app/dashboard/blends/page.tsx` |
| **Builder de Blends** con peso por modelo, rol primary/validator/fallback, cálculo automático de costo base y margen | `src/app/dashboard/blends/new/page.tsx` |
| API Keys por blend con presupuesto mensual | `src/app/dashboard/keys/page.tsx` |
| Panel de Requests live + filtros | `src/app/dashboard/requests/page.tsx` |
| Wallet (top-ups, gasto, marketplace revenue, governance) | `src/app/dashboard/wallet/page.tsx` |
| Conexión a OpenRouter + catálogo curado | `src/app/dashboard/providers/page.tsx` |
| **Agente Prism con memoria persistente** | `src/app/dashboard/agent/page.tsx` |
| Documentación OpenAI-compatible con snippets | `src/app/dashboard/docs/page.tsx` |

## ¿Qué hace especial al agente "Prism"?

- Vive en `/dashboard/agent` y se ejecuta vía `/api/agent` (edge route).
- Recibe en cada request la **memoria persistente** del usuario (`fact` /
  `preference` / `todo` / `metric`) como bloque `system`.
- Usa Claude Sonnet 4.6 vía OpenRouter por defecto; si no hay
  `OPENROUTER_API_KEY` responde con un mock determinista pero coherente.
- La memoria se persiste en `localStorage` con Zustand `persist` — la API
  para enchufar Postgres/Drizzle ya está aislada en `src/store/use-app-store.ts`.

## Siguientes pasos sugeridos

1. **Backend real**: reemplazar `localStorage` por Drizzle + Postgres (reusar
   el monorepo de `agh`). Subir el store a server actions.
2. **Auth real**: Clerk o Auth.js con cookies firmadas.
3. **Stripe Connect** para top-ups y payouts de marketplace.
4. **Streaming SSE** en `/api/blend/run` para latencia percibida.
5. **Validator shadow runs** en background para medir margen real por modelo.
