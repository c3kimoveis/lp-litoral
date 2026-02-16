# 🚀 LP Carneiros V2

Landing Page moderna desenvolvida com React + Vite + TypeScript, preparada para rodar em containers Docker tanto em desenvolvimento quanto em produção.

## � Documentação Completa

**👉 Comece aqui:** [📖 Índice da Documentação](./INDEX.md)

Este projeto possui documentação extensiva organizada por tópicos. Consulte o [INDEX.md](./INDEX.md) para navegar facilmente entre:

- Guias rápidos e comandos
- Tutoriais e exemplos práticos
- Troubleshooting detalhado
- Checklists de deploy
- Arquitetura do sistema

## �📋 Requisitos

- Docker Desktop instalado
- Docker Compose V2+
- Node.js 23+ (para desenvolvimento local opcional)

## 🏃 Quick Start

### Desenvolvimento

```powershell
# 1. Clonar o repositório
git clone <url-do-repo>
cd projeto

# 2. Copiar arquivo de variáveis de ambiente
copy .env.example .env

# 3. Iniciar ambiente de desenvolvimento
docker-compose up -d

# 4. Acessar aplicação
# http://localhost:5173
```

### Produção

```powershell
# Build e deploy em produção
docker-compose -f docker-compose.prod.yml up -d --build

# Acessar aplicação
# http://localhost:80
```

## 📁 Estrutura do Projeto

```
lp-carneiros-v3.0.2/
├── docker-compose.yml          # Config desenvolvimento
├── docker-compose.prod.yml     # Config produção
├── DOCKER_GUIDE.md            # Guia completo Docker
├── .env                       # Variáveis ambiente (não commitar)
├── .env.example              # Exemplo de variáveis
└── src/
    ├── react/
    │   ├── Dockerfile         # Multi-stage build
    │   ├── Dockerfile.dev     # Desenvolvimento
    │   ├── Dockerfile.prod    # Produção
    │   ├── nginx.conf         # Config Nginx
    │   └── projeto/   # Código React/Vite
    │       ├── src/
    │       ├── public/
    │       ├── .env           # Variáveis Vite
    │       └── vite.config.ts
    └── postgres/              # (opcional)
```

## 🛠️ Tecnologias

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **UI:** Tailwind CSS + Shadcn/ui + Radix UI
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React + Font Awesome
- **Server (Prod):** Nginx Alpine
- **Container:** Docker + Docker Compose

## 📚 Documentação

- [📖 Guia Completo Docker](./DOCKER_GUIDE.md) - Comandos, troubleshooting e boas práticas

## 🔧 Comandos Úteis

### Desenvolvimento

```powershell
# Ver logs
docker-compose logs -f react

# Entrar no container
docker-compose exec react sh

# Instalar dependência
docker-compose exec react npm install <pacote>

# Rebuild
docker-compose up -d --build

# Parar
docker-compose down
```

### Produção

```powershell
# Build
docker-compose -f docker-compose.prod.yml build --no-cache

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Logs
docker-compose -f docker-compose.prod.yml logs -f react-prod

# Parar
docker-compose -f docker-compose.prod.yml down
```

## 🌐 Ambientes

| Ambiente        | URL                   | Porta | Servidor |
| --------------- | --------------------- | ----- | -------- |
| Desenvolvimento | http://localhost:5173 | 5173  | Vite     |
| Produção        | http://localhost      | 80    | Nginx    |

## 🔐 Variáveis de Ambiente

### Arquivo raiz `.env`

```env
REACT_PROJECT_NAME=lp-carneiros-v3.0.2
REACT_PROJECT_VERSION=1.0
REACT_HOST_PORT=5173
REACT_PROD_PORT=80
```

### Arquivo `src/react/projeto/.env`

```env
VITE_PORT=5173
VITE_API_URL=http://localhost:8000/api
```

> ⚠️ **Importante:** Variáveis Vite devem começar com `VITE_` para serem expostas ao client

## 🎯 Features

### Desenvolvimento

- ✅ Hot Module Replacement (HMR)
- ✅ Source maps
- ✅ Fast Refresh
- ✅ TypeScript
- ✅ ESLint

### Produção

- ✅ Build otimizado (minify + tree-shaking)
- ✅ Code splitting automático
- ✅ Gzip compression
- ✅ Cache headers
- ✅ SPA routing (Nginx)
- ✅ Security headers
- ✅ Health checks

## 🚀 Deploy

### Build de Produção

```powershell
# Local (sem Docker)
cd src/react/projeto
npm run build
npm run preview

# Docker
docker-compose -f docker-compose.prod.yml up -d --build
```

### CI/CD

Para integração contínua, use o `Dockerfile.prod`:

```dockerfile
docker build -f src/react/Dockerfile.prod -t lp-carneiros:latest .
docker run -p 80:80 lp-carneiros:latest
```

## 🐛 Troubleshooting

Consulte o [Guia Docker](./DOCKER_GUIDE.md#troubleshooting) para soluções de problemas comuns.

## 📄 Licença

Este projeto é privado.

## 👨‍💻 Autor

Desenvolvido para Imob Lovable

---

**Dúvidas?** Consulte o [DOCKER_GUIDE.md](./DOCKER_GUIDE.md) para informações detalhadas.
