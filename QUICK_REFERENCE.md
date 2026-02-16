# ⚡ COMANDOS RÁPIDOS - CHEAT SHEET

## 🚀 COMANDOS MAIS USADOS

### Desenvolvimento

```powershell
# Iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f react

# Parar
docker-compose down

# Reiniciar
docker-compose restart react

# Rebuild
docker-compose up -d --build
```

### Produção

```powershell
# Deploy
docker-compose -f docker-compose.prod.yml up -d --build

# Logs
docker-compose -f docker-compose.prod.yml logs -f react-prod

# Parar
docker-compose -f docker-compose.prod.yml down
```

### Script Gerenciador

```powershell
.\docker-manager.ps1 dev      # Inicia dev
.\docker-manager.ps1 prod     # Inicia prod
.\docker-manager.ps1 logs     # Ver logs
.\docker-manager.ps1 stop     # Parar tudo
.\docker-manager.ps1 clean    # Limpeza
```

## 🐳 DOCKER BÁSICO

```powershell
# Listar containers
docker ps                      # Rodando
docker ps -a                   # Todos

# Ver logs
docker logs <container-id>
docker logs -f <container-id>  # Follow
docker logs --tail 100 <id>    # Últimas 100 linhas

# Executar comando
docker exec -it <container-id> sh
docker-compose exec react sh

# Parar/Remover
docker stop <container-id>
docker rm <container-id>

# Imagens
docker images                  # Listar
docker rmi <image-id>          # Remover
docker image prune -a          # Remover todas não usadas

# Volumes
docker volume ls               # Listar
docker volume rm <name>        # Remover
docker volume prune            # Remover não usados

# Limpeza geral
docker system prune -a --volumes
```

## 📦 NPM NO CONTAINER

```powershell
# Instalar dependência
docker-compose exec react npm install <pacote>

# Desinstalar
docker-compose exec react npm uninstall <pacote>

# Listar
docker-compose exec react npm list

# Atualizar
docker-compose exec react npm update

# Build
docker-compose exec react npm run build

# Lint
docker-compose exec react npm run lint
```

## 🔍 DEBUG

```powershell
# Ver configuração
docker inspect <container-id>

# Ver uso de recursos
docker stats
docker stats <container-id>

# Logs do sistema
docker-compose logs --tail=100

# Entrar no container
docker-compose exec react sh
docker exec -it <container-id> sh

# Ver processos
docker top <container-id>

# Ver portas
docker port <container-id>
netstat -ano | findstr :5173
```

## 🌐 NETWORK

```powershell
# Listar redes
docker network ls

# Inspecionar rede
docker network inspect lp-carneiros-v3.0.2_app-network

# Ver IP do container
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-id>

# Testar conectividade
docker-compose exec react ping google.com
```

## 📊 PERFORMANCE

```powershell
# Tamanho de imagens
docker images

# Tamanho de volumes
docker system df
docker system df -v

# Uso de recursos
docker stats --no-stream

# Build time
Measure-Command { docker-compose build }
```

## 🔧 TROUBLESHOOTING

```powershell
# Container não inicia
docker-compose up
docker-compose logs

# Porta em uso
netstat -ano | findstr :<porta>
taskkill /PID <PID> /F

# Rebuild limpo
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d

# Resetar tudo
docker-compose down -v
docker volume rm lp-carneiros-v3.0.2_react_node_modules
docker system prune -a --volumes
docker-compose up -d --build

# Ver erros de build
docker-compose build --progress=plain
```

## 📝 GIT

```powershell
# Verificar status
git status

# Adicionar mudanças
git add .
git commit -m "feat: nova funcionalidade"

# Push
git push origin main

# Ver diff
git diff
git diff --staged

# Branches
git branch
git checkout -b feature/nova-feature
git merge feature/nova-feature
```

## 🧪 TESTES

```powershell
# Build local
cd src\react\lp-carneiros-v3.0.2
npm run build

# Preview local
npm run preview

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## 📂 ARQUIVOS

```powershell
# Ver estrutura
tree /F

# Procurar arquivo
Get-ChildItem -Recurse -Filter "*.tsx"

# Contar linhas de código
Get-ChildItem -Recurse -Include *.tsx,*.ts | Get-Content | Measure-Object -Line

# Ver tamanho de pasta
Get-ChildItem -Recurse | Measure-Object -Property Length -Sum
```

## 🔐 SEGURANÇA

```powershell
# Verificar vulnerabilidades
docker-compose exec react npm audit

# Corrigir automaticamente
docker-compose exec react npm audit fix

# Ver secrets (NÃO COMMITADOS)
cat .env
cat src\react\lp-carneiros-v3.0.2\.env

# Escanear imagem
docker scan lp-carneiros-v3.0.2-dev-v1.0
```

## 📋 ONE-LINERS ÚTEIS

```powershell
# Parar todos os containers
docker stop $(docker ps -aq)

# Remover todos os containers
docker rm $(docker ps -aq)

# Remover todas as imagens
docker rmi $(docker images -q)

# Ver containers que consumem mais memória
docker stats --no-stream --format "table {{.Name}}\t{{.MemUsage}}" | Sort-Object

# Logs últimos 5 min
docker-compose logs --since 5m

# Exportar logs
docker-compose logs > logs.txt

# Ver variáveis de ambiente do container
docker exec <container-id> env

# Copiar arquivo do container
docker cp <container-id>:/app/dist ./dist-backup
```

## 🎯 SHORTCUTS PERSONALIZADOS

### Adicionar ao PowerShell Profile

```powershell
# Editar profile
notepad $PROFILE

# Adicionar:
Set-Alias dc docker-compose
Set-Alias d docker

function dps { docker ps }
function dl { docker-compose logs -f react }
function dup { docker-compose up -d }
function ddown { docker-compose down }
function drestart { docker-compose restart }

# Recarregar
. $PROFILE
```

### Uso

```powershell
dc up -d          # ao invés de docker-compose up -d
dps               # ao invés de docker ps
dl                # ver logs
dup               # subir containers
ddown             # parar containers
drestart          # reiniciar
```

## 📞 LINKS ÚTEIS

- [Docker Docs](https://docs.docker.com/)
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Nginx Docs](https://nginx.org/en/docs/)

## 💡 DICAS FINAIS

1. **Use `docker-compose logs -f`** ao invés de entrar no container
2. **Use volumes nomeados** para node_modules (melhor performance)
3. **Sempre use `--no-cache`** em builds de produção
4. **Mantenha `.env` fora do Git** (já está no .gitignore)
5. **Use o script gerenciador** para facilitar a vida
6. **Documente mudanças** nos commits (conventional commits)
7. **Teste builds localmente** antes de fazer deploy
8. **Mantenha dependências atualizadas** (`npm outdated`)
9. **Use `.dockerignore`** para builds mais rápidos
10. **Configure CI/CD** para deploys automáticos

---

**🎊 Salve este arquivo para consulta rápida!**
