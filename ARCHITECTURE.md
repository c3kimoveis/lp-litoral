# 🏗️ ARQUITETURA DO PROJETO

## 📐 Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                    LP CARNEIROS V2                          │
│                Docker + React + Vite                        │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Fluxo de Desenvolvimento

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│              │      │              │      │              │
│  Desenvolve  │─────▶│   Docker     │─────▶│   Browser    │
│  no VSCode   │      │  Container   │      │  localhost   │
│              │      │  (Vite Dev)  │      │   :5173      │
│              │      │              │      │              │
└──────────────┘      └──────────────┘      └──────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
   Altera           Hot Module            Atualiza
   Código           Replacement           Automático
```

## 🚀 Fluxo de Produção

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│              │      │              │      │              │
│  npm build   │─────▶│   Docker     │─────▶│   Browser    │
│  (Vite)      │      │  Container   │      │  Production  │
│              │      │   (Nginx)    │      │              │
│              │      │              │      │              │
└──────────────┘      └──────────────┘      └──────────────┘
       │                     │                     │
       │                     │                     │
       ▼                     ▼                     ▼
   Build dist/         Serve Static          Fast Load
   Otimizado           Files Gzip            Cached
```

## 📁 Estrutura de Diretórios

```
lp-carneiros-v3.0.2/
│
├── 📄 docker-compose.yml          # Config Desenvolvimento
├── 📄 docker-compose.prod.yml     # Config Produção
├── 📄 .env                        # Variáveis Docker
├── 📄 .env.example                # Template variáveis
│
├── 📁 planning/                   # Planejamento
│   ├── PLANNING.md
│   ├── PRD.md
│   └── TASK.md
│
├── 📁 src/
│   │
│   ├── 📁 react/
│   │   ├── 🐳 Dockerfile              # Multi-stage
│   │   ├── 🐳 Dockerfile.dev          # Dev only
│   │   ├── 🐳 Dockerfile.prod         # Prod only
│   │   ├── ⚙️  nginx.conf              # Nginx config
│   │   ├── 📝 .dockerignore           # Ignore files
│   │   │
│   │   └── 📁 lp-carneiros-v3.0.2/        # App React
│   │       ├── 📄 package.json
│   │       ├── 📄 vite.config.ts     # Config Vite
│   │       ├── 📄 .env               # Vars Vite
│   │       │
│   │       ├── 📁 src/
│   │       │   ├── 📄 App.tsx
│   │       │   ├── 📄 main.tsx
│   │       │   │
│   │       │   ├── 📁 components/    # Componentes
│   │       │   │   ├── LeadForm.tsx
│   │       │   │   ├── Navbar.tsx
│   │       │   │   └── ui/          # Shadcn UI
│   │       │   │
│   │       │   ├── 📁 pages/        # Páginas
│   │       │   │   ├── Index.tsx
│   │       │   │   ├── ThankYou.tsx
│   │       │   │   └── NotFound.tsx
│   │       │   │
│   │       │   ├── 📁 hooks/        # Custom hooks
│   │       │   ├── 📁 lib/          # Utils
│   │       │   └── 📁 assets/       # Images, etc
│   │       │
│   │       └── 📁 public/
│   │           └── robots.txt
│   │
│   ├── 📁 postgres/                  # (Futuro)
│   ├── 📁 redis/                     # (Futuro)
│   └── 📁 celery/                    # (Futuro)
│
├── 📚 DOCUMENTAÇÃO
│   ├── 📄 README.md                 # Visão geral
│   ├── 📄 DOCKER_GUIDE.md           # Guia completo
│   ├── 📄 SUMMARY.md                # Resumo mudanças
│   ├── 📄 EXAMPLES.md               # Exemplos práticos
│   ├── 📄 QUICK_REFERENCE.md        # Comandos rápidos
│   ├── 📄 DEPLOY_CHECKLIST.md       # Checklist deploy
│   └── 📄 ARCHITECTURE.md           # Este arquivo
│
└── 🔧 SCRIPTS
    └── 📄 docker-manager.ps1        # Script auxiliar
```

## 🐳 Arquitetura Docker

### Desenvolvimento

```
┌─────────────────────────────────────────────────┐
│  Docker Container: lp-carneiros-v3.0.2-dev-v1.0     │
│                                                 │
│  ┌──────────────────────────────────────┐      │
│  │   Node.js 23 Slim                    │      │
│  │                                       │      │
│  │   ┌───────────────────────────┐      │      │
│  │   │  Vite Dev Server          │      │      │
│  │   │  Port: 5173               │      │      │
│  │   │  Host: 0.0.0.0            │      │      │
│  │   │                           │      │      │
│  │   │  Features:                │      │      │
│  │   │  ✓ Hot Module Replace     │      │      │
│  │   │  ✓ Fast Refresh           │      │      │
│  │   │  ✓ Source Maps            │      │      │
│  │   └───────────────────────────┘      │      │
│  │                                       │      │
│  │   Volumes:                            │      │
│  │   • /app (bind mount - código)        │      │
│  │   • node_modules (named volume)       │      │
│  └──────────────────────────────────────┘      │
│                                                 │
│  Port Mapping: 5173:5173                        │
│  Network: app-network                           │
└─────────────────────────────────────────────────┘
```

### Produção

```
┌────────────────────────────────────────────────────────┐
│  Docker Container: lp-carneiros-v3.0.2-prod-v1.0           │
│                                                        │
│  Stage 1: Builder                                      │
│  ┌──────────────────────────────────────┐             │
│  │   Node.js 23 Slim                    │             │
│  │                                       │             │
│  │   1. npm ci (install deps)           │             │
│  │   2. npm run build                   │             │
│  │   3. Output: dist/ folder            │             │
│  └──────────────────────────────────────┘             │
│                       │                                │
│                       ▼                                │
│  Stage 2: Production                                   │
│  ┌──────────────────────────────────────┐             │
│  │   Nginx Alpine (~5MB)                │             │
│  │                                       │             │
│  │   ┌───────────────────────────┐      │             │
│  │   │  Nginx Web Server         │      │             │
│  │   │  Port: 80                 │      │             │
│  │   │                           │      │             │
│  │   │  Features:                │      │             │
│  │   │  ✓ Gzip Compression       │      │             │
│  │   │  ✓ Cache Headers          │      │             │
│  │   │  ✓ SPA Routing            │      │             │
│  │   │  ✓ Security Headers       │      │             │
│  │   │  ✓ Static File Serving    │      │             │
│  │   └───────────────────────────┘      │             │
│  │                                       │             │
│  │   Files: /usr/share/nginx/html/      │             │
│  │   Config: /etc/nginx/conf.d/         │             │
│  └──────────────────────────────────────┘             │
│                                                        │
│  Port Mapping: 80:80                                   │
│  Network: app-network                                  │
│  Health Check: ✓                                       │
└────────────────────────────────────────────────────────┘
```

## 🔌 Fluxo de Dados

### Request Flow (Produção)

```
User Browser
     │
     ▼
http://localhost/
     │
     ▼
Docker Port 80
     │
     ▼
Nginx Container
     │
     ├─── /             → index.html
     ├─── /sobre        → index.html (SPA)
     ├─── /contato      → index.html (SPA)
     └─── /assets/*     → static files (cached)
          │
          ├─── .js      → cached 1 year
          ├─── .css     → cached 1 year
          └─── images   → cached 1 year
```

### Development Flow

```
Code Change (VSCode)
     │
     ▼
File System (Windows)
     │
     ▼
Docker Volume (bind mount)
     │
     ▼
Vite Watcher (polling)
     │
     ▼
HMR (Hot Module Replacement)
     │
     ▼
WebSocket → Browser
     │
     ▼
Page Updates (no reload)
```

## 🌐 Network Architecture

```
┌─────────────────────────────────────────────┐
│        app-network (Bridge Driver)          │
│                                             │
│  ┌────────────────┐    ┌────────────────┐  │
│  │  react-dev     │    │  react-prod    │  │
│  │  Container     │    │  Container     │  │
│  │                │    │                │  │
│  │  IP: 172.x.x.2 │    │  IP: 172.x.x.3 │  │
│  └────────────────┘    └────────────────┘  │
│         │                      │            │
└─────────┼──────────────────────┼────────────┘
          │                      │
          ▼                      ▼
    Host: 5173              Host: 80
```

## 📦 Volume Strategy

### Development

```
┌───────────────────────────────────────┐
│  Host Machine (Windows)               │
│                                       │
│  src/react/lp-carneiros-v3.0.2/           │
│  ├── src/          ◄─────────┐        │
│  ├── public/                 │        │
│  ├── package.json            │        │
│  └── vite.config.ts          │        │
│                               │        │
└───────────────────────────────┼────────┘
                                │
                     Bind Mount │ (sync)
                                │
┌───────────────────────────────┼────────┐
│  Container                    │        │
│                               │        │
│  /app/          ◄─────────────┘        │
│  ├── src/                              │
│  ├── public/                           │
│  └── node_modules/  ◄────────┐         │
│                               │         │
│                               │         │
│                    Named Volume         │
│                    (performance)        │
│                                         │
│  react_node_modules ──────────┘         │
└─────────────────────────────────────────┘
```

### Production

```
No volumes!
All files are COPIED into the image during build.
Result: Lightweight, portable, immutable container.
```

## ⚙️ Build Process

### Development

```
1. docker-compose up -d
2. Docker pulls node:23-slim
3. Creates container
4. Mounts volumes
5. Runs: npm run dev -- --host 0.0.0.0
6. Vite starts dev server on port 5173
7. Ready! ✓
```

### Production

```
Stage 1: Build
1. docker-compose -f docker-compose.prod.yml build
2. Pull node:23-slim
3. COPY package files
4. RUN npm ci
5. COPY source code
6. RUN npm run build
   ├── Minify JS/CSS
   ├── Tree-shake unused code
   ├── Code-split vendors
   └── Output: dist/ (~2MB)

Stage 2: Nginx
7. Pull nginx:alpine (~5MB)
8. COPY dist/ → /usr/share/nginx/html/
9. COPY nginx.conf → /etc/nginx/conf.d/
10. Configure Gzip, cache, headers
11. EXPOSE 80
12. Result: ~25MB image ✓
```

## 🔐 Security Layers

```
┌─────────────────────────────────────────┐
│  Security Measures                      │
├─────────────────────────────────────────┤
│                                         │
│  1. Nginx Security Headers              │
│     ├── X-Frame-Options                 │
│     ├── X-Content-Type-Options          │
│     └── X-XSS-Protection                │
│                                         │
│  2. Docker Image                        │
│     ├── Minimal Alpine (small surface)  │
│     ├── Non-root user                   │
│     └── No unnecessary packages         │
│                                         │
│  3. Environment Variables               │
│     ├── .env not in Git                 │
│     ├── .env.example for reference      │
│     └── VITE_ prefix for client vars    │
│                                         │
│  4. Build Process                       │
│     ├── .dockerignore (no secrets)      │
│     ├── Multi-stage (clean builds)      │
│     └── npm ci (lock file integrity)    │
│                                         │
└─────────────────────────────────────────┘
```

## 📊 Performance Optimizations

### Build Optimizations

```
Vite Build:
├── Code Splitting
│   ├── react-vendor.js      (~300KB)
│   ├── ui-vendor.js         (~200KB)
│   └── main.js              (~100KB)
│
├── Minification (esbuild)
│   ├── JS minified
│   ├── CSS minified
│   └── HTML minified
│
└── Tree Shaking
    └── Unused code removed
```

### Runtime Optimizations

```
Nginx:
├── Gzip Compression
│   └── ~70% size reduction
│
├── Cache Headers
│   ├── Static assets: 1 year
│   └── index.html: no-cache
│
└── HTTP/2 Ready
    └── Multiplexing support
```

## 🔄 CI/CD Pipeline (Sugerido)

```
┌──────────────┐
│   Git Push   │
│   to main    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  GitHub      │
│  Actions     │
│  Triggers    │
└──────┬───────┘
       │
       ├─── 1. Checkout code
       ├─── 2. Build Docker image
       ├─── 3. Run tests
       ├─── 4. Security scan
       ├─── 5. Push to registry
       │
       ▼
┌──────────────┐
│  Production  │
│  Server      │
│              │
│  1. Pull     │
│  2. Deploy   │
│  3. Health   │
│     Check    │
└──────────────┘
```

## 🎯 Conclusão

Este projeto utiliza:

- ✅ **Docker Multi-Stage**: Builds otimizados
- ✅ **Vite**: Build tool moderno e rápido
- ✅ **Nginx**: Servidor web profissional
- ✅ **Volume Strategy**: Performance em dev
- ✅ **Security**: Headers e boas práticas
- ✅ **Performance**: Gzip, cache, code-split

**Resultado:** Aplicação pronta para produção! 🚀

---

Para mais detalhes, consulte os outros arquivos de documentação.
