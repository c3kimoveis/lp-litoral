# 💡 EXEMPLOS PRÁTICOS - LP CARNEIROS V2

## 📖 Guia de Uso Diário

### Cenário 1: Começando a Desenvolver

```powershell
# 1. Clonar o projeto (se ainda não fez)
git clone <url-do-repo>
cd lp-carneiros-v3.0.2

# 2. Copiar variáveis de ambiente
copy .env.example .env
copy src\react\lp-carneiros-v3.0.2\.env.example src\react\lp-carneiros-v3.0.2\.env

# 3. Iniciar ambiente
docker-compose up -d

# 4. Ver logs
docker-compose logs -f react

# 5. Abrir browser
# http://localhost:5173
```

**Resultado:** Ambiente de desenvolvimento rodando com hot-reload ✅

---

### Cenário 2: Instalar Nova Dependência

```powershell
# Opção 1: Dentro do container
docker-compose exec react npm install lucide-react

# Opção 2: Localmente (depois rebuild)
cd src\react\lp-carneiros-v3.0.2
npm install lucide-react
# (o volume sincroniza automaticamente)

# Verificar se instalou
docker-compose exec react npm list lucide-react
```

**Resultado:** Dependência instalada e disponível ✅

---

### Cenário 3: Hot Reload Não Funciona

```powershell
# 1. Verificar logs
docker-compose logs react

# 2. Verificar vite.config.ts
# Confirme que tem:
# watch: { usePolling: true }

# 3. Reiniciar container
docker-compose restart react

# 4. Se ainda não funcionar, rebuild
docker-compose down -v
docker volume rm lp-carneiros-v3.0.2_react_node_modules
docker-compose up -d --build
```

**Resultado:** Hot-reload funcionando ✅

---

### Cenário 4: Testar Build de Produção Localmente

```powershell
# Método 1: Com Docker
docker-compose -f docker-compose.prod.yml up -d --build

# Aguardar build (pode levar alguns minutos na primeira vez)

# Acessar
# http://localhost

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f react-prod

# Parar quando terminar
docker-compose -f docker-compose.prod.yml down

# Método 2: Sem Docker (mais rápido para teste)
cd src\react\lp-carneiros-v3.0.2
npm run build
npm run preview
# http://localhost:4173
```

**Resultado:** Build de produção testado ✅

---

### Cenário 5: Alternar Entre Dev e Prod

```powershell
# Parar desenvolvimento
docker-compose down

# Iniciar produção
docker-compose -f docker-compose.prod.yml up -d

# Voltar para desenvolvimento
docker-compose -f docker-compose.prod.yml down
docker-compose up -d
```

**Resultado:** Ambientes alternados sem conflito ✅

---

### Cenário 6: Adicionar Variável de Ambiente

```powershell
# 1. Editar src\react\lp-carneiros-v3.0.2\.env
# Adicionar:
VITE_API_URL=http://localhost:8000/api
VITE_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X

# 2. Usar no código (src/algum-arquivo.tsx)
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl); // http://localhost:8000/api

# 3. Reiniciar dev server
docker-compose restart react

# 4. Para produção, passar como build arg
# Editar docker-compose.prod.yml:
# args:
#   - VITE_API_URL=${VITE_API_URL}
```

**Resultado:** Variável disponível no código ✅

---

### Cenário 7: Porta em Uso

```powershell
# 1. Ver o que está usando a porta
netstat -ano | findstr :5173

# 2. Matar processo (substitua <PID>)
taskkill /PID <PID> /F

# 3. Ou mudar porta
# Editar .env:
REACT_HOST_PORT=5174

# Editar src\react\lp-carneiros-v3.0.2\.env:
VITE_PORT=5174

# Reiniciar
docker-compose down
docker-compose up -d
```

**Resultado:** Porta liberada ou trocada ✅

---

### Cenário 8: Limpar Tudo e Começar do Zero

```powershell
# Usar script gerenciador
.\docker-manager.ps1 clean

# Ou manualmente:
docker-compose down -v
docker-compose -f docker-compose.prod.yml down -v
docker volume rm lp-carneiros-v3.0.2_react_node_modules
docker image prune -a -f
docker volume prune -f

# Reconstruir
docker-compose up -d --build
```

**Resultado:** Ambiente limpo e reconstruído ✅

---

### Cenário 9: Ver Tamanho da Build de Produção

```powershell
# Build
cd src\react\lp-carneiros-v3.0.2
npm run build

# Ver tamanho
Get-ChildItem -Path dist -Recurse | Measure-Object -Property Length -Sum

# Ver detalhes dos chunks
Get-ChildItem -Path dist\assets -Recurse | Sort-Object Length -Descending | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}}

# Análise visual
npm run build -- --mode production
# Vite mostra o tamanho de cada chunk no terminal
```

**Resultado:** Tamanho da build conhecido ✅

---

### Cenário 10: Debug de Erro em Produção

```powershell
# 1. Ver logs do Nginx
docker-compose -f docker-compose.prod.yml logs react-prod

# 2. Entrar no container
docker-compose -f docker-compose.prod.yml exec react-prod sh

# 3. Ver arquivos servidos
ls -lah /usr/share/nginx/html

# 4. Ver config Nginx
cat /etc/nginx/conf.d/default.conf

# 5. Testar Nginx manualmente
nginx -t

# 6. Ver logs dentro do container
tail -f /var/log/nginx/error.log

# 7. Fazer request direto
wget http://localhost/

# 8. Sair
exit
```

**Resultado:** Problema identificado e resolvido ✅

---

### Cenário 11: Atualizar Dependências

```powershell
# 1. Ver dependências desatualizadas
docker-compose exec react npm outdated

# 2. Atualizar específica
docker-compose exec react npm update react react-dom

# 3. Atualizar todas (cuidado!)
docker-compose exec react npm update

# 4. Ou atualizar major versions
docker-compose exec react npx npm-check-updates -u
docker-compose exec react npm install

# 5. Testar
docker-compose exec react npm run build

# 6. Se tudo OK, commit
git add package.json package-lock.json
git commit -m "chore: update dependencies"
```

**Resultado:** Dependências atualizadas ✅

---

### Cenário 12: Deploy em Servidor Remoto

```powershell
# 1. SSH no servidor
ssh user@server.com

# 2. Clonar projeto
git clone <url-do-repo>
cd lp-carneiros-v3.0.2

# 3. Configurar .env
nano .env
# Ajustar variáveis para produção

nano src/react/lp-carneiros-v3.0.2/.env
# VITE_API_URL=https://api.seudominio.com

# 4. Build e deploy
docker-compose -f docker-compose.prod.yml up -d --build

# 5. Verificar
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f react-prod

# 6. Configurar reverse proxy (Nginx/Caddy) se necessário
# Exemplo Nginx:
# server {
#     listen 80;
#     server_name seudominio.com;
#     location / {
#         proxy_pass http://localhost:80;
#     }
# }

# 7. Configurar SSL (Let's Encrypt)
# certbot --nginx -d seudominio.com
```

**Resultado:** App em produção no servidor ✅

---

### Cenário 13: CI/CD com GitHub Actions

```yaml
# Criar .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: |
          docker build -f src/react/Dockerfile.prod \
            --target production \
            -t lp-carneiros:latest \
            src/react

      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker tag lp-carneiros:latest username/lp-carneiros:latest
          docker push username/lp-carneiros:latest

      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /path/to/app
            docker-compose -f docker-compose.prod.yml pull
            docker-compose -f docker-compose.prod.yml up -d
```

**Resultado:** Deploy automático configurado ✅

---

### Cenário 14: Monitorar Performance

```powershell
# 1. Ver uso de recursos
docker stats

# 2. Ver uso específico do container
docker stats lp-carneiros-v3.0.2-dev-v1.0

# 3. Análise Lighthouse (produção)
# Abrir DevTools no Chrome
# Lighthouse > Run Audit

# 4. Bundle analyzer
cd src\react\lp-carneiros-v3.0.2
npm install -D rollup-plugin-visualizer
# Adicionar ao vite.config.ts:
# import { visualizer } from 'rollup-plugin-visualizer'
# plugins: [..., visualizer()]
npm run build
# Abrir stats.html
```

**Resultado:** Performance monitorada ✅

---

## 🎓 Dicas e Truques

### Dica 1: Alias PowerShell

```powershell
# Adicionar ao $PROFILE
function Start-Dev { docker-compose up -d }
function Stop-Dev { docker-compose down }
function Logs-Dev { docker-compose logs -f react }

# Usar:
Start-Dev
Logs-Dev
Stop-Dev
```

### Dica 2: VSCode Tasks

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Docker: Start Dev",
      "type": "shell",
      "command": "docker-compose up -d",
      "problemMatcher": []
    },
    {
      "label": "Docker: Logs",
      "type": "shell",
      "command": "docker-compose logs -f react",
      "problemMatcher": []
    }
  ]
}
```

### Dica 3: Git Hooks

```bash
# .git/hooks/pre-push
#!/bin/sh
echo "Running build test..."
cd src/react/lp-carneiros-v3.0.2
npm run build
if [ $? -ne 0 ]; then
  echo "Build failed. Push aborted."
  exit 1
fi
```

---

**💡 Mais exemplos? Consulte DOCKER_GUIDE.md**
