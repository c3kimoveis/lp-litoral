# 🐳 Guia Docker - LP Carneiros V2

## 📚 Índice

- [Desenvolvimento](#desenvolvimento)
- [Produção](#produção)
- [Comandos Úteis](#comandos-úteis)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Desenvolvimento

### Iniciar ambiente de desenvolvimento

```powershell
# Subir container em modo desenvolvimento
docker-compose up -d

# Ver logs em tempo real
docker-compose logs -f react

# Parar container
docker-compose down
```

### Características do modo desenvolvimento:

- ✅ Hot Module Replacement (HMR) ativo
- ✅ Source maps habilitados
- ✅ Volume sincronizado com código local
- ✅ node_modules em volume separado (performance)
- ✅ Acesso: http://localhost:5173

### Instalar dependências

```powershell
# Entrar no container
docker-compose exec react sh

# Instalar pacote
npm install nome-do-pacote

# Ou rodar comando direto
docker-compose exec react npm install nome-do-pacote
```

---

## 🚀 Produção

### Build e deploy em produção

```powershell
# Fazer build da imagem de produção
docker-compose -f docker-compose.prod.yml build

# Subir em produção
docker-compose -f docker-compose.prod.yml up -d

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f react-prod

# Parar containers de produção
docker-compose -f docker-compose.prod.yml down
```

### Características do modo produção:

- ✅ Multi-stage build (otimizado)
- ✅ Nginx como servidor web
- ✅ Gzip compression habilitada
- ✅ Cache headers configurados
- ✅ SPA routing configurado
- ✅ Security headers
- ✅ Health check
- ✅ Acesso: http://localhost:80

### Build local para testar

```powershell
# Build apenas
docker-compose -f docker-compose.prod.yml build --no-cache

# Testar preview localmente (sem docker)
cd src/react/lp-carneiros-v3.0.2
npm run build
npm run preview
```

---

## 📋 Comandos Úteis

### Gerenciamento de containers

```powershell
# Ver containers rodando
docker ps

# Ver todos os containers
docker ps -a

# Parar todos os containers do projeto
docker-compose down

# Parar e remover volumes
docker-compose down -v

# Rebuild completo
docker-compose up -d --build --force-recreate
```

### Limpeza

```powershell
# Remover imagens não utilizadas
docker image prune -a

# Remover volumes não utilizados
docker volume prune

# Limpeza completa do Docker
docker system prune -a --volumes
```

### Debug

```powershell
# Acessar bash/sh do container
docker-compose exec react sh

# Ver logs específicos
docker-compose logs react --tail=100

# Inspecionar container
docker inspect lp-carneiros-v3.0.2-dev-v1.0

# Ver uso de recursos
docker stats
```

---

## 🔍 Troubleshooting

### Hot Reload não funciona

**Problema:** Alterações no código não refletem automaticamente

**Solução:**

```powershell
# 1. Verificar se usePolling está habilitado no vite.config.ts
# 2. Reiniciar container
docker-compose restart react
```

### Porta em uso

**Problema:** `Error: bind: address already in use`

**Solução:**

```powershell
# Ver o que está usando a porta
netstat -ano | findstr :5173

# Matar processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F

# Ou mudar porta no .env
# REACT_HOST_PORT=5174
```

### node_modules desatualizados

**Problema:** Dependências não atualizam

**Solução:**

```powershell
# Remover volume de node_modules
docker-compose down -v
docker volume rm lp-carneiros-v3.0.2_react_node_modules

# Rebuild
docker-compose up -d --build
```

### Build de produção falha

**Problema:** Erro durante `npm run build`

**Solução:**

```powershell
# Ver logs detalhados
docker-compose -f docker-compose.prod.yml build --progress=plain --no-cache

# Testar build localmente
cd src/react/lp-carneiros-v3.0.2
npm run build
```

### Variáveis de ambiente não carregam

**Problema:** `process.env.VITE_X` retorna undefined

**Solução:**

1. Verificar se variável começa com `VITE_`
2. Reiniciar dev server após adicionar nova variável
3. Passar como build arg em produção:

```yaml
# docker-compose.prod.yml
args:
  - VITE_API_URL=${VITE_API_URL}
```

---

## 📝 Estrutura de Arquivos

```
.
├── docker-compose.yml          # Desenvolvimento
├── docker-compose.prod.yml     # Produção
├── .env                        # Variáveis globais
└── src/react/
    ├── Dockerfile              # Multi-stage (dev + prod)
    ├── Dockerfile.dev          # Só desenvolvimento
    ├── Dockerfile.prod         # Só produção
    ├── nginx.conf              # Config Nginx (produção)
    ├── .dockerignore           # Arquivos ignorados no build
    └── lp-carneiros-v3.0.2/
        ├── .env                # Variáveis do Vite
        ├── vite.config.ts      # Config Vite otimizada
        └── package.json        # Scripts atualizados
```

---

## 🎯 Boas Práticas

1. **Desenvolvimento:** Use sempre `docker-compose.yml`
2. **Produção:** Use sempre `docker-compose.prod.yml`
3. **Variáveis sensíveis:** Nunca commite `.env` com dados reais
4. **Build:** Sempre faça `--no-cache` em builds de produção
5. **Volumes:** Use volumes nomeados para `node_modules`
6. **Logs:** Mantenha logs em produção para debug
7. **Health checks:** Configure para ambientes críticos

---

## 🔐 Variáveis de Ambiente

### Desenvolvimento (.env raiz)

```env
REACT_PROJECT_NAME=lp-carneiros-v3.0.2
REACT_PROJECT_VERSION=1.0
REACT_HOST_PORT=5173
```

### Vite (src/react/lp-carneiros-v3.0.2/.env)

```env
VITE_PORT=5173
VITE_API_URL=http://localhost:8000/api
```

### Produção

```env
REACT_PROD_PORT=80
```

---

## 📞 Suporte

- Documentação Vite: https://vitejs.dev/
- Documentação Docker: https://docs.docker.com/
- Documentação Nginx: https://nginx.org/en/docs/
