# ==========================================

# CHECKLIST DE DEPLOY - PRODUÇÃO

# ==========================================

## PRÉ-DEPLOY

### Variáveis de Ambiente

- [ ] `.env` configurado corretamente
- [ ] `.env` do Vite (src/react/lp-carneiros-v3.0.2/.env) configurado
- [ ] Variáveis sensíveis NÃO commitadas
- [ ] `VITE_API_URL` aponta para API de produção
- [ ] Portas configuradas corretamente

### Código

- [ ] Código buildado localmente sem erros (`npm run build`)
- [ ] Testes executados com sucesso
- [ ] ESLint sem erros críticos
- [ ] TypeScript sem erros
- [ ] Dependências atualizadas (`npm audit`)

### Docker

- [ ] `.dockerignore` configurado
- [ ] `Dockerfile.prod` revisado
- [ ] `nginx.conf` revisado
- [ ] `docker-compose.prod.yml` configurado

## DURANTE DEPLOY

### Build

```powershell
# 1. Parar ambiente de desenvolvimento
docker-compose down

# 2. Build de produção
docker-compose -f docker-compose.prod.yml build --no-cache

# 3. Iniciar produção
docker-compose -f docker-compose.prod.yml up -d
```

### Verificações

- [ ] Container iniciado corretamente (`docker ps`)
- [ ] Logs sem erros críticos
- [ ] Health check passando
- [ ] Aplicação acessível via browser

## PÓS-DEPLOY

### Testes

- [ ] Navegação entre páginas funcionando
- [ ] Formulários enviando dados
- [ ] Imagens carregando
- [ ] Responsividade OK em mobile
- [ ] Performance OK (Lighthouse > 90)

### Monitoramento

- [ ] Logs configurados
- [ ] Verificar uso de memória/CPU
- [ ] Testar por 15min sem erro
- [ ] Documentar quaisquer problemas

### Segurança

- [ ] HTTPS configurado (se aplicável)
- [ ] Security headers presentes (verificar dev tools)
- [ ] Sem exposição de secrets
- [ ] CORS configurado corretamente

## ROLLBACK (se necessário)

```powershell
# 1. Parar produção
docker-compose -f docker-compose.prod.yml down

# 2. Voltar para desenvolvimento
docker-compose up -d

# 3. Investigar problema
docker-compose -f docker-compose.prod.yml logs
```

## COMANDOS ÚTEIS

### Verificar Status

```powershell
docker ps
docker-compose -f docker-compose.prod.yml ps
docker stats
```

### Ver Logs

```powershell
docker-compose -f docker-compose.prod.yml logs -f react-prod
docker logs <container-id> --tail 100
```

### Entrar no Container

```powershell
docker-compose -f docker-compose.prod.yml exec react-prod sh
```

### Health Check Manual

```powershell
curl http://localhost/
# ou
Invoke-WebRequest http://localhost/
```

## TROUBLESHOOTING

### Container não inicia

1. Verificar logs: `docker-compose -f docker-compose.prod.yml logs`
2. Verificar portas em uso: `netstat -ano | findstr :80`
3. Rebuild: `docker-compose -f docker-compose.prod.yml build --no-cache`

### 404 em rotas do React

- Verificar nginx.conf (deve ter `try_files $uri $uri/ /index.html`)
- Rebuild e reiniciar

### Performance ruim

- Verificar se Gzip está habilitado
- Verificar cache headers
- Rodar Lighthouse
- Verificar bundle size

## NOTAS

Data do Deploy: ******\_\_\_\_******
Versão: ******\_\_\_\_******
Deploy por: ******\_\_\_\_******
Observações:

---

---

---
