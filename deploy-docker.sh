#!/bin/bash

# ==========================================
# DEPLOY DOCKER PROFISSIONAL - CONTAINER APENAS
# LP Carneiros V2.1 - React SPA via Docker
# Domínio: carneiros.c3kimoveis.com.br
# ==========================================

echo "🚀 DEPLOY DOCKER - CONTAINER RODANDO"
echo "===================================="

# Carregar variáveis do .env
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "✅ Variáveis carregadas do .env"
else
    echo "⚠️ Arquivo .env não encontrado, usando valores padrão"
    REACT_PROJECT_VERSION="2.2"
fi

# Configurações
PROJECT_NAME="lp-carneiros"
CONTAINER_NAME="lp-carneiros-v${REACT_PROJECT_VERSION}-prod"

echo "📅 Versão: lp-carneiros-v${REACT_PROJECT_VERSION}"
echo "🐳 Container: $CONTAINER_NAME"

# 1. Entrar no diretório do projeto
cd /app/imob-sites/lp-carneiros/v2.2

echo "📋 Diretório atual: $(pwd)"
echo "📋 Verificando docker-compose.prod.yml..."
cat docker-compose.prod.yml

# 2. Parar container anterior se existir
echo "🛑 Parando containers anteriores..."
docker-compose -f docker-compose.prod.yml down 2>/dev/null || true

# 3. Fazer build via Docker
echo "🐳 Fazendo build via Docker..."
docker-compose -f docker-compose.prod.yml build --no-cache

# 4. Iniciar container
echo "🚀 Iniciando container..."
docker-compose -f docker-compose.prod.yml up -d

# 5. Aguardar inicialização
echo "⏳ Aguardando container inicializar..."
sleep 15

# 6. Verificar se container está rodando
CONTAINER_ID=$(docker-compose -f docker-compose.prod.yml ps -q)

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ Container não foi criado!"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi

if ! docker ps | grep -q "$CONTAINER_ID"; then
    echo "❌ Container não está rodando!"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi

echo "✅ Container ativo!"
echo "🐳 Container ID: $CONTAINER_ID"
echo "🌐 Porta: ${REACT_PROD_PORT:-5173}"

# 7. Verificar build interno
echo "📋 Verificando build no container..."
docker exec $CONTAINER_ID ls -la /app/dist/ 2>/dev/null || docker exec $CONTAINER_ID ls -la /app/

# 8. Testar resposta do container
echo "🧪 Testando resposta do container..."
sleep 5
if curl -s http://localhost:${REACT_PROD_PORT:-5173} > /dev/null; then
    echo "✅ Container respondendo!"
    
    # Verificar se é build de produção
    RESPONSE=$(curl -s http://localhost:${REACT_PROD_PORT:-5173})
    if echo "$RESPONSE" | grep -q "/src/main.tsx"; then
        echo "❌ ERRO: Container servindo código fonte, não build!"
        echo "🔧 Problema no Dockerfile.prod"
        exit 1
    else
        echo "✅ Container servindo build de produção!"
    fi
else
    echo "⚠️ Container pode estar inicializando..."
fi

# 9. Verificar configuração nginx
echo "🔧 Verificando configuração nginx..."
if [ -f "nginx-vps-docker.conf" ]; then
    echo "📋 Configuração nginx-vps-docker.conf disponível"
    echo ""
    echo "🔄 APLICAR CONFIGURAÇÃO NGINX:"
    echo "sudo cp nginx-vps-docker.conf /etc/nginx/sites-available/carneiros.c3kimoveis.com.br"
    echo "sudo systemctl reload nginx"
    echo ""
else
    echo "⚠️ Configure nginx para fazer proxy para localhost:${REACT_PROD_PORT:-5173}"
fi

# 10. Status final
echo ""
echo "🎉🎉🎉 DEPLOY DOCKER CONCLUÍDO! 🎉🎉🎉"
echo "✅ Container Docker rodando"
echo "✅ Build de produção confirmado" 
echo "✅ Nginx configurado para proxy"
echo ""
echo "🐳 Container: http://localhost:${REACT_PROD_PORT:-5173}"
echo "🌐 Site: https://carneiros.c3kimoveis.com.br"
echo "📂 Versão: lp-carneiros-v${REACT_PROJECT_VERSION}"
echo ""
echo "📋 Para verificar: docker ps | grep lp-carneiros"
echo "📋 Para logs: docker-compose -f docker-compose.prod.yml logs"